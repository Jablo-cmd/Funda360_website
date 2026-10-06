import { describeDemoRequest, normaliseDemoRequest, validateDemoRequest, type DemoRequest } from '../../src/lib/demoValidation.ts';

/**
 * Funda360 Request a Demo endpoint.
 *
 * A Web-standard (Request -> Response) handler with no dependencies, so it
 * runs unchanged on Cloudflare Workers (see worker.ts), Deno, Bun or Node 18+.
 * The marketing site is a static export and cannot run server code itself;
 * this endpoint is deployed separately and its public URL is set as
 * NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT when the site is built.
 *
 * Secrets (delivery credentials) exist only in this endpoint's environment.
 * See server/demo-request/README.md for configuration.
 */

export type DemoEndpointEnv = {
  /** Comma-separated origins allowed to submit, e.g. "https://funda360.aurisnexus.co.za". Required. */
  ALLOWED_ORIGINS?: string;
  /** Delivery option 1: a webhook (CRM, form service, automation) that receives the request as JSON. */
  DEMO_REQUEST_WEBHOOK_URL?: string;
  /** Optional shared secret; the body is signed with HMAC-SHA256 in the X-Funda360-Signature header. */
  DEMO_REQUEST_WEBHOOK_SECRET?: string;
  /** Delivery option 2: email through the Resend API. All three values are required to enable it. */
  RESEND_API_KEY?: string;
  DEMO_REQUEST_EMAIL_TO?: string;
  DEMO_REQUEST_EMAIL_FROM?: string;
  /** Optional Cloudflare Turnstile secret. When set, a valid token is required. */
  TURNSTILE_SECRET_KEY?: string;
};

type Deps = {
  fetch: typeof fetch;
  now: () => number;
  /** Logs operational events only; never personal data. */
  log: (event: string, detail?: Record<string, unknown>) => void;
};

const MAX_BODY_BYTES = 16 * 1024;
const MIN_ELAPSED_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const DUPLICATE_TTL_MS = 60 * 60 * 1000;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

/**
 * Best-effort, per-instance memory. Serverless platforms run several
 * instances, so these are a first line of defence only: configure the
 * platform's rate limiting as well, and use X-Request-Id downstream to
 * de-duplicate (the Resend call also sends it as an Idempotency-Key).
 */
const recentByClient = new Map<string, number[]>();
/** Request ids that were delivered (timestamp) or are being delivered right now ('pending'). */
const seenRequestIds = new Map<string, number | 'pending'>();
const MAX_TRACKED_CLIENTS = 5000;

/** Test hook: clears the in-memory rate-limit and duplicate state. */
export function resetEndpointState() {
  recentByClient.clear();
  seenRequestIds.clear();
}

type ErrorCode = 'bad-request' | 'forbidden' | 'validation' | 'too-fast' | 'rate-limited' | 'verification' | 'not-configured' | 'delivery' | 'in-progress';

/**
 * Entry point. Unexpected errors become a generic 500 (with CORS headers so
 * the form can show its own message); nothing internal is exposed.
 */
export async function handleDemoRequest(request: Request, env: DemoEndpointEnv, deps: Partial<Deps> = {}): Promise<Response> {
  try {
    return await handle(request, env, deps);
  } catch (error) {
    (deps.log ?? ((event, detail) => console.error(JSON.stringify({ event, ...detail }))))('demo_request_error', { type: error instanceof Error ? error.name : typeof error });
    const origin = request.headers.get('Origin') ?? '';
    const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim().replace(/\/$/, ''));
    return new Response(JSON.stringify({ ok: false, error: 'delivery' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin', ...(origin && allowed.includes(origin) ? { 'Access-Control-Allow-Origin': origin } : {}) },
    });
  }
}

async function handle(request: Request, env: DemoEndpointEnv, deps: Partial<Deps>): Promise<Response> {
  const d: Deps = { fetch: deps.fetch ?? fetch, now: deps.now ?? Date.now, log: deps.log ?? ((event, detail) => console.log(JSON.stringify({ event, ...detail }))) };

  const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim().replace(/\/$/, '')).filter(Boolean);
  const origin = request.headers.get('Origin') ?? '';
  const originAllowed = allowed.includes(origin);
  const cors: Record<string, string> = originAllowed ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : { Vary: 'Origin' };

  const json = (status: number, body: Record<string, unknown>, extra: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...cors, ...extra } });
  const fail = (status: number, error: ErrorCode, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) => json(status, { ok: false, error, ...extra }, headers);

  if (request.method === 'OPTIONS') {
    if (!originAllowed) return new Response(null, { status: 403, headers: cors });
    return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' } });
  }
  if (request.method !== 'POST') return fail(405, 'bad-request', {}, { Allow: 'POST, OPTIONS' });

  // Browsers always send Origin on cross-origin POSTs; anything else is not our form.
  if (!originAllowed) return fail(403, 'forbidden');
  if (!(request.headers.get('Content-Type') ?? '').toLowerCase().startsWith('application/json')) return fail(415, 'bad-request');
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return fail(413, 'bad-request');

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return fail(413, 'bad-request');
  let parsed: Record<string, unknown>;
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return fail(400, 'bad-request');
    parsed = value as Record<string, unknown>;
  } catch {
    return fail(400, 'bad-request');
  }

  const data = normaliseDemoRequest(parsed);
  const requestId = typeof parsed.requestId === 'string' && REQUEST_ID_PATTERN.test(parsed.requestId) ? parsed.requestId : '';
  const elapsedMs = typeof parsed.elapsedMs === 'number' ? parsed.elapsedMs : 0;
  const now = d.now();

  // Honeypot: report success so bots learn nothing, but deliver nothing.
  if (data.website) {
    d.log('demo_request_dropped', { reason: 'honeypot' });
    return json(200, { ok: true });
  }

  // Rate limit per client address (best effort; see note above).
  const client = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ?? 'unknown';
  // Keep memory bounded: drop clients whose window has passed once the map grows.
  if (recentByClient.size > MAX_TRACKED_CLIENTS) {
    for (const [key, times] of recentByClient) if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) recentByClient.delete(key);
    if (recentByClient.size > MAX_TRACKED_CLIENTS) recentByClient.clear();
  }
  const recent = (recentByClient.get(client) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    d.log('demo_request_rejected', { reason: 'rate-limited' });
    return fail(429, 'rate-limited', {}, { 'Retry-After': String(Math.ceil(RATE_LIMIT.windowMs / 1000)) });
  }
  recent.push(now);
  recentByClient.set(client, recent);

  if (elapsedMs < MIN_ELAPSED_MS) {
    d.log('demo_request_rejected', { reason: 'too-fast' });
    return fail(422, 'too-fast');
  }

  const errors = validateDemoRequest(data);
  if (Object.keys(errors).length > 0) return fail(422, 'validation', { fields: errors });

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof parsed.turnstileToken === 'string' ? parsed.turnstileToken : '';
    const verified = token ? await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, client, d) : false;
    if (!verified) {
      d.log('demo_request_rejected', { reason: 'verification' });
      return fail(403, 'verification');
    }
  }

  // Duplicate (double click, retry after a lost response): acknowledge without delivering twice.
  for (const [id, at] of seenRequestIds) if (at !== 'pending' && now - at > DUPLICATE_TTL_MS) seenRequestIds.delete(id);
  const seen = requestId ? seenRequestIds.get(requestId) : undefined;
  if (seen === 'pending') return fail(409, 'in-progress');
  if (seen !== undefined) return json(200, { ok: true });

  const webhookReady = Boolean(env.DEMO_REQUEST_WEBHOOK_URL);
  const emailReady = Boolean(env.RESEND_API_KEY && env.DEMO_REQUEST_EMAIL_TO && env.DEMO_REQUEST_EMAIL_FROM);
  if (!webhookReady && !emailReady) {
    d.log('demo_request_not_configured');
    return fail(503, 'not-configured');
  }

  const submission = buildSubmission(data, requestId || `srv-${now.toString(36)}`, new Date(now).toISOString(), origin);
  // Claim the id before delivering so a concurrent copy of the same request is not delivered too.
  if (requestId) seenRequestIds.set(requestId, 'pending');
  const results = await Promise.all([
    webhookReady ? deliverWebhook(submission, env, d) : Promise.resolve(null),
    emailReady ? deliverEmail(submission, env, d) : Promise.resolve(null),
  ]);
  // Succeed if at least one configured destination accepted it; the person must not resubmit.
  if (!results.some((r) => r === true)) {
    if (requestId) seenRequestIds.delete(requestId);
    return fail(502, 'delivery');
  }

  if (requestId) seenRequestIds.set(requestId, now);
  d.log('demo_request_delivered', { webhook: results[0], email: results[1] });
  return json(200, { ok: true });
}

export type DemoSubmission = ReturnType<typeof buildSubmission>;

function buildSubmission(data: DemoRequest, requestId: string, submittedAt: string, origin: string) {
  const labels = describeDemoRequest(data);
  return {
    requestId,
    submittedAt,
    source: 'funda360-website',
    origin,
    contact: { name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim() || null },
    organisation: data.organisation.trim(),
    role: { value: data.role, label: labels.role },
    size: { value: data.size, label: labels.size },
    interests: data.interests.map((value, i) => ({ value, label: labels.interests[i] })),
    message: data.message.trim() || null,
    consent: { contactAboutRequest: true },
  };
}

async function deliverWebhook(submission: DemoSubmission, env: DemoEndpointEnv, d: Deps): Promise<boolean> {
  const body = JSON.stringify(submission);
  const headers: Record<string, string> = { 'Content-Type': 'application/json', 'X-Request-Id': submission.requestId };
  if (env.DEMO_REQUEST_WEBHOOK_SECRET) headers['X-Funda360-Signature'] = `sha256=${await hmacSha256Hex(env.DEMO_REQUEST_WEBHOOK_SECRET, body)}`;
  try {
    const response = await d.fetch(env.DEMO_REQUEST_WEBHOOK_URL as string, { method: 'POST', headers, body });
    if (!response.ok) d.log('demo_request_webhook_failed', { status: response.status });
    return response.ok;
  } catch {
    d.log('demo_request_webhook_failed', { status: 'network' });
    return false;
  }
}

async function deliverEmail(submission: DemoSubmission, env: DemoEndpointEnv, d: Deps): Promise<boolean> {
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').slice(0, 150);
  const text = [
    'New Funda360 demo request',
    '',
    `Name: ${submission.contact.name}`,
    `Email: ${submission.contact.email}`,
    `Phone: ${submission.contact.phone ?? 'Not given'}`,
    `School or organisation: ${submission.organisation}`,
    `Role: ${submission.role.label}`,
    `Size: ${submission.size.label}`,
    `Interested in: ${submission.interests.map((i) => i.label).join(', ')}`,
    '',
    'Message:',
    submission.message ?? 'None',
    '',
    `Consent to be contacted about this request: yes`,
    `Submitted: ${submission.submittedAt}`,
    `Request ID: ${submission.requestId}`,
  ].join('\n');
  try {
    const response = await d.fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `demo-${submission.requestId}` },
      body: JSON.stringify({
        from: env.DEMO_REQUEST_EMAIL_FROM,
        to: (env.DEMO_REQUEST_EMAIL_TO as string).split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: submission.contact.email,
        subject: oneLine(`Funda360 demo request: ${submission.organisation}`),
        text,
      }),
    });
    if (!response.ok) d.log('demo_request_email_failed', { status: response.status });
    return response.ok;
  } catch {
    d.log('demo_request_email_failed', { status: 'network' });
    return false;
  }
}

async function verifyTurnstile(token: string, secret: string, ip: string, d: Deps): Promise<boolean> {
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== 'unknown') form.set('remoteip', ip);
    const response = await d.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

async function hmacSha256Hex(secret: string, body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
