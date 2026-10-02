/**
 * End-to-end test of Request a Demo: real browser -> built site -> endpoint
 * (server/demo-request/node-server.ts) -> a local webhook receiver.
 *
 *   NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT=http://localhost:8787 npm run build
 *   node scripts/qa-demo-e2e.mjs
 *
 * Checks: success confirmation, exactly one delivery with the right payload,
 * no secrets in the browser bundle, the delivery-failure path keeps the
 * person's details and lets them retry without creating a duplicate.
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

const SITE_PORT = 3300;
const ENDPOINT_PORT = 8787;
const SINK_PORT = 8790;
const SITE = `http://localhost:${SITE_PORT}`;
const SECRET = 'e2e-webhook-secret-not-real';
const failures = [];
const fail = (msg) => failures.push(msg);

// Webhook receiver that records deliveries; can be switched to fail.
const received = [];
let sinkStatus = 200;
const sink = createServer((req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    if (sinkStatus === 200) received.push({ headers: req.headers, body: JSON.parse(body) });
    res.writeHead(sinkStatus).end();
  });
}).listen(SINK_PORT);

const children = [];
function start(cmd, args, env) {
  const child = spawn(cmd, args, { env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  children.push(child);
  return child;
}
async function waitFor(url) {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(url, { method: 'OPTIONS' });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`timed out waiting for ${url}`);
}

start('node', ['server/demo-request/node-server.ts'], {
  PORT: String(ENDPOINT_PORT),
  ALLOWED_ORIGINS: SITE,
  DEMO_REQUEST_WEBHOOK_URL: `http://localhost:${SINK_PORT}/hook`,
  DEMO_REQUEST_WEBHOOK_SECRET: SECRET,
});
start('npx', ['next', 'start', '-p', String(SITE_PORT)], {});

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' });
try {
  await waitFor(`http://localhost:${ENDPOINT_PORT}/`);
  await waitFor(SITE);

  // No delivery secret may ever reach the browser bundle.
  const chunks = join('.next', 'static');
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  for (const file of walk(chunks).filter((f) => f.endsWith('.js'))) {
    const text = readFileSync(file, 'utf8');
    if (/RESEND_API_KEY|WEBHOOK_SECRET|TURNSTILE_SECRET/.test(text)) fail(`secret variable name found in browser bundle ${file}`);
  }

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${SITE}/request-demo`, { waitUntil: 'networkidle' });
  await page.locator('header[data-hydrated]').waitFor();
  if (await page.locator('.form-status[data-notice="endpoint"]').count()) fail('"not connected" notice shown although an endpoint is configured');

  async function fillForm() {
    await page.getByLabel('Full name (required)').fill('Test Person');
    await page.getByLabel('School or organisation (required)').fill('Example Primary School');
    await page.getByLabel('Work email address (required)').fill('test.person@example.org');
    await page.getByLabel('Your role (required)').selectOption('principal');
    await page.getByLabel('Number of learners or schools (required)').selectOption('300-700');
    await page.getByLabel('Attendance').check();
    await page.getByLabel(/I agree that Funda360 may contact me/).check();
    await page.waitForTimeout(3200);
  }

  // 1. Delivery fails: the person sees an error, keeps their details, and can retry.
  sinkStatus = 500;
  await fillForm();
  await page.getByRole('button', { name: 'Request a demo' }).click();
  const error = page.locator('.form-status[role="alert"]');
  await error.waitFor({ timeout: 10000 });
  // Optional visual record: QA_SCREENSHOTS=<dir>.
  const shot = (name) => (process.env.QA_SCREENSHOTS ? page.screenshot({ path: join(process.env.QA_SCREENSHOTS, `${name}.png`), fullPage: false }) : null);
  // The result must be brought into view (allow for smooth scrolling), not left off-screen above the button.
  const inView = async (locator, label) => {
    await page.waitForTimeout(1200);
    const box = await locator.boundingBox();
    if (!box || box.y < 0 || box.y > 844 * 0.6) fail(`${label} is not scrolled into view (top at ${box?.y})`);
  };
  await inView(error, 'error message');
  await shot('demo-error');
  if ((await page.getByLabel('Full name (required)').inputValue()) !== 'Test Person') fail('form data lost after a failed delivery');

  // 2. Retry succeeds; double-clicking must still deliver once.
  sinkStatus = 200;
  await page.getByRole('button', { name: 'Request a demo' }).dblclick();
  const success = page.locator('.form-status[data-status="success"]');
  await success.waitFor({ timeout: 10000 });
  if (!(await success.evaluate((el) => el === document.activeElement))) fail('success confirmation not focused');
  await inView(success, 'success confirmation');
  await shot('demo-success');
  if (await page.locator('form[data-form="demo-request"]').count()) fail('form still shown after success');
  await page.waitForTimeout(500);
  if (received.length !== 1) fail(`expected exactly 1 delivery, got ${received.length}`);
  const delivery = received[0];
  if (delivery) {
    if (delivery.body.organisation !== 'Example Primary School') fail('wrong organisation delivered');
    if (delivery.body.role?.label !== 'Principal or deputy principal') fail('role label missing in delivery');
    if (!/^sha256=[0-9a-f]{64}$/.test(delivery.headers['x-funda360-signature'] ?? '')) fail('webhook signature missing');
    if ('website' in delivery.body) fail('honeypot field forwarded');
  }

  // 3. "Send another request" brings back an empty form.
  await page.getByRole('button', { name: 'Send another request' }).click();
  if ((await page.getByLabel('Full name (required)').inputValue()) !== '') fail('form not reset for another request');
} catch (error) {
  fail(String(error));
} finally {
  await browser.close();
  sink.close();
  for (const child of children) {
    try {
      process.kill(-child.pid, 'SIGTERM');
    } catch {
      // Already exited.
    }
  }
}

if (failures.length) {
  console.error(`✗ Demo end-to-end failed:\n - ${failures.join('\n - ')}`);
  process.exit(1);
}
console.log('✓ Demo end-to-end: failure keeps details, retry delivers exactly once, success confirmation, no secrets in the bundle.');
