import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { handleDemoRequest, resetEndpointState, type DemoEndpointEnv } from './handler.ts';

// Run with: npm test  (Node 22.18+ runs TypeScript directly)

const ORIGIN = 'https://funda360.aurisnexus.co.za';
const valid = {
  name: 'Test Person',
  organisation: 'Example Primary School',
  email: 'test.person@example.org',
  phone: '',
  role: 'principal',
  size: '300-700',
  interests: ['attendance', 'finance'],
  message: 'We use spreadsheets today.',
  consent: true,
  website: '',
  requestId: 'req-12345678',
  elapsedMs: 45000,
};

type Call = { url: string; init: RequestInit };
function fakeFetch(status = 200, json: unknown = {}) {
  const calls: Call[] = [];
  const fn = (async (url: string, init: RequestInit) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify(json), { status });
  }) as unknown as typeof fetch;
  return { fn, calls };
}

const quiet = () => {};
const webhookEnv: DemoEndpointEnv = { ALLOWED_ORIGINS: ORIGIN, DEMO_REQUEST_WEBHOOK_URL: 'https://hooks.example.org/demo', DEMO_REQUEST_WEBHOOK_SECRET: 's3cret' };

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://demo.example.org/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': `198.51.100.${Math.floor(Math.random() * 250)}`, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

beforeEach(() => resetEndpointState());

test('delivers a valid request to the webhook with a signature and request id', async () => {
  const f = fakeFetch();
  const res = await handleDemoRequest(post(valid), webhookEnv, { fetch: f.fn, log: quiet });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.equal(f.calls.length, 1);
  const headers = f.calls[0].init.headers as Record<string, string>;
  assert.equal(headers['X-Request-Id'], 'req-12345678');
  assert.match(headers['X-Funda360-Signature'], /^sha256=[0-9a-f]{64}$/);
  const sent = JSON.parse(String(f.calls[0].init.body));
  assert.equal(sent.role.label, 'Principal or deputy principal');
  assert.equal(sent.contact.email, 'test.person@example.org');
  assert.equal(sent.website, undefined);
});

test('sends email through Resend with an idempotency key and reply-to', async () => {
  const f = fakeFetch();
  const env = { ALLOWED_ORIGINS: ORIGIN, RESEND_API_KEY: 'key', DEMO_REQUEST_EMAIL_TO: 'sales@example.org', DEMO_REQUEST_EMAIL_FROM: 'Website <web@example.org>' };
  const res = await handleDemoRequest(post(valid), env, { fetch: f.fn, log: quiet });
  assert.equal(res.status, 200);
  assert.equal(f.calls[0].url, 'https://api.resend.com/emails');
  const headers = f.calls[0].init.headers as Record<string, string>;
  assert.equal(headers['Idempotency-Key'], 'demo-req-12345678');
  // Resend rejects requests without a User-Agent (Cloudflare Workers send none by default).
  assert.match(headers['User-Agent'], /^funda360-demo-request\//);
  const body = JSON.parse(String(f.calls[0].init.body));
  assert.equal(body.reply_to, 'test.person@example.org');
  assert.deepEqual(body.to, ['sales@example.org']);
  assert.ok(!/[\r\n]/.test(body.subject));
});

test('rejects origins that are not allowed', async () => {
  const res = await handleDemoRequest(post(valid, { Origin: 'https://evil.example' }), webhookEnv, { fetch: fakeFetch().fn, log: quiet });
  assert.equal(res.status, 403);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), null);
});

test('answers CORS preflight only for allowed origins', async () => {
  const ok = await handleDemoRequest(new Request('https://demo.example.org/', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), webhookEnv);
  assert.equal(ok.status, 204);
  assert.match(ok.headers.get('Access-Control-Allow-Methods') ?? '', /POST/);
  const bad = await handleDemoRequest(new Request('https://demo.example.org/', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } }), webhookEnv);
  assert.equal(bad.status, 403);
});

test('returns field errors from server-side validation', async () => {
  const res = await handleDemoRequest(post({ ...valid, email: 'not-an-email', role: 'hacker', consent: 'yes' }), webhookEnv, { fetch: fakeFetch().fn, log: quiet });
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.equal(body.error, 'validation');
  assert.ok(body.fields.email && body.fields.role && body.fields.consent);
});

test('silently drops honeypot submissions without delivering', async () => {
  const f = fakeFetch();
  const res = await handleDemoRequest(post({ ...valid, website: 'http://spam.example' }), webhookEnv, { fetch: f.fn, log: quiet });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});

test('rejects submissions made faster than a person could fill the form', async () => {
  const f = fakeFetch();
  const res = await handleDemoRequest(post({ ...valid, elapsedMs: 400 }), webhookEnv, { fetch: f.fn, log: quiet });
  assert.equal(res.status, 422);
  assert.equal((await res.json()).error, 'too-fast');
  assert.equal(f.calls.length, 0);
});

test('does not deliver the same request id twice', async () => {
  const f = fakeFetch();
  const first = await handleDemoRequest(post(valid, { 'CF-Connecting-IP': '203.0.113.9' }), webhookEnv, { fetch: f.fn, log: quiet });
  const second = await handleDemoRequest(post(valid, { 'CF-Connecting-IP': '203.0.113.9' }), webhookEnv, { fetch: f.fn, log: quiet });
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(f.calls.length, 1);
});

test('rate limits repeated submissions from one client', async () => {
  const f = fakeFetch();
  const statuses: number[] = [];
  for (let i = 0; i < 6; i++) {
    const res = await handleDemoRequest(post({ ...valid, requestId: `req-rate-${i}0000` }, { 'CF-Connecting-IP': '203.0.113.50' }), webhookEnv, { fetch: f.fn, log: quiet });
    statuses.push(res.status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
});

test('reports not-configured when no delivery destination is set', async () => {
  const res = await handleDemoRequest(post(valid), { ALLOWED_ORIGINS: ORIGIN }, { fetch: fakeFetch().fn, log: quiet });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, 'not-configured');
});

test('reports a delivery failure when the destination rejects the request, and allows a retry', async () => {
  const failing = fakeFetch(500);
  const res = await handleDemoRequest(post(valid), webhookEnv, { fetch: failing.fn, log: quiet });
  assert.equal(res.status, 502);
  assert.equal((await res.json()).error, 'delivery');
  const working = fakeFetch();
  const retry = await handleDemoRequest(post(valid), webhookEnv, { fetch: working.fn, log: quiet });
  assert.equal(retry.status, 200);
  assert.equal(working.calls.length, 1);
});

test('requires a valid Turnstile token when Turnstile is enabled', async () => {
  const env = { ...webhookEnv, TURNSTILE_SECRET_KEY: 'ts' };
  const missing = await handleDemoRequest(post(valid), env, { fetch: fakeFetch().fn, log: quiet });
  assert.equal(missing.status, 403);
  const rejected = await handleDemoRequest(post({ ...valid, requestId: 'req-ts-000001', turnstileToken: 'bad' }), env, { fetch: fakeFetch(200, { success: false }).fn, log: quiet });
  assert.equal(rejected.status, 403);
  const accepted = await handleDemoRequest(post({ ...valid, requestId: 'req-ts-000002', turnstileToken: 'good' }), env, { fetch: fakeFetch(200, { success: true }).fn, log: quiet });
  assert.equal(accepted.status, 200);
});

test('rejects non-JSON, oversized and malformed bodies', async () => {
  const text = await handleDemoRequest(post('name=x', { 'Content-Type': 'text/plain' }), webhookEnv, { log: quiet });
  assert.equal(text.status, 415);
  const big = await handleDemoRequest(post({ ...valid, message: 'x'.repeat(20000) }), webhookEnv, { log: quiet });
  assert.equal(big.status, 413);
  const broken = await handleDemoRequest(post('{"name":'), webhookEnv, { log: quiet });
  assert.equal(broken.status, 400);
  const get = await handleDemoRequest(new Request('https://demo.example.org/', { headers: { Origin: ORIGIN } }), webhookEnv, { log: quiet });
  assert.equal(get.status, 405);
});

test('delivers concurrent copies of the same request only once', async () => {
  let release: () => void = () => {};
  const gate = new Promise<void>((r) => (release = r));
  const calls: string[] = [];
  const slowFetch = (async (url: string) => {
    calls.push(String(url));
    await gate;
    return new Response('{}', { status: 200 });
  }) as unknown as typeof fetch;
  const headers = { 'CF-Connecting-IP': '203.0.113.77' };
  const first = handleDemoRequest(post({ ...valid, requestId: 'req-concurrent-1' }, headers), webhookEnv, { fetch: slowFetch, log: quiet });
  await new Promise((r) => setTimeout(r, 10));
  const second = await handleDemoRequest(post({ ...valid, requestId: 'req-concurrent-1' }, headers), webhookEnv, { fetch: slowFetch, log: quiet });
  assert.equal(second.status, 409);
  assert.equal((await second.json()).error, 'in-progress');
  release();
  assert.equal((await first).status, 200);
  assert.equal(calls.length, 1);
});

test('turns unexpected errors into a generic 500 with CORS and no internals', async () => {
  const throwingFetch = (() => {
    throw new TypeError('secret internal detail');
  }) as unknown as typeof fetch;
  const env = { ...webhookEnv, TURNSTILE_SECRET_KEY: 'ts' };
  // verifyTurnstile catches fetch errors, so break the request body reader instead.
  const broken = post(valid);
  Object.defineProperty(broken, 'text', { value: () => Promise.reject(new Error('stream failed: secret')) });
  const res = await handleDemoRequest(broken, env, { fetch: throwingFetch, log: quiet });
  assert.equal(res.status, 500);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  const text = await res.text();
  assert.ok(!text.includes('secret'));
  assert.deepEqual(JSON.parse(text), { ok: false, error: 'delivery' });
});

test('rejects email values that could address more than one recipient', async () => {
  for (const email of ['a@b.co,evil@x.org', '"Name" <a@b.co>', 'a;b@c.de']) {
    const res = await handleDemoRequest(post({ ...valid, email, requestId: `req-mail-${email.length}000` }), webhookEnv, { fetch: fakeFetch().fn, log: quiet });
    assert.equal(res.status, 422, email);
    assert.ok((await res.json()).fields.email);
  }
});

test('calls the global fetch unbound (Cloudflare Workers reject fetch called as a method)', async () => {
  const original = globalThis.fetch;
  const calls: string[] = [];
  // Mimic Workers: throw if fetch is invoked with a `this` other than the global object.
  globalThis.fetch = function (this: unknown, input: RequestInfo | URL) {
    if (this !== undefined && this !== globalThis) throw new TypeError('Illegal invocation');
    calls.push(String(input));
    return Promise.resolve(new Response('{}', { status: 200 }));
  } as typeof fetch;
  try {
    const res = await handleDemoRequest(post({ ...valid, requestId: 'req-unbound-01' }), webhookEnv, { log: quiet });
    assert.equal(res.status, 200);
    assert.deepEqual(calls, ['https://hooks.example.org/demo']);
  } finally {
    globalThis.fetch = original;
  }
});
