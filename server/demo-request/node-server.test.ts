import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';

// The Node adapter must rate-limit by the real connection address, even when
// a client forges CF-Connecting-IP or X-Forwarded-For headers.

const PORT = 8799;
const ORIGIN = 'https://funda360.aurisnexus.co.za';
let server: ReturnType<typeof spawn>;

before(async () => {
  server = spawn(process.execPath, ['server/demo-request/node-server.ts'], {
    env: { ...process.env, PORT: String(PORT), ALLOWED_ORIGINS: ORIGIN, DEMO_REQUEST_WEBHOOK_URL: '', RESEND_API_KEY: '', TRUST_PROXY: '' },
    stdio: 'ignore',
  });
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`http://localhost:${PORT}/`, { method: 'OPTIONS' });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error('node-server did not start');
});

after(() => server.kill());

test('forged client address headers do not bypass the rate limit', async () => {
  const statuses: number[] = [];
  for (let i = 0; i < 6; i++) {
    const res = await fetch(`http://localhost:${PORT}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': `198.51.100.${i}`, 'X-Forwarded-For': `192.0.2.${i}` },
      body: JSON.stringify({ name: 'x', elapsedMs: 0 }),
    });
    statuses.push(res.status);
  }
  // Five requests reach the timing check (422); the sixth is rate limited.
  assert.deepEqual(statuses, [422, 422, 422, 422, 422, 429]);
});
