# Request a Demo endpoint

The marketing site is a static export on GitHub Pages, so it cannot run
server code. Demo requests are sent from the browser to this small,
separately deployed endpoint. It validates the request again, applies
spam protection, and delivers it to the Funda360 team. All credentials
live only in this endpoint's environment; none are ever sent to the
browser or committed to the repository.

```
Browser form (static site) --HTTPS POST JSON--> endpoint --> webhook and/or email
  NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT              (this folder)  (secrets live here only)
```

| File | Purpose |
| --- | --- |
| `handler.ts` | The endpoint: a Web-standard `Request -> Response` handler with no dependencies |
| `worker.ts` | Cloudflare Workers entry point (recommended host) |
| `node-server.ts` | Node adapter for self-hosting or local testing (Node 22.18+). Rate limits by the TCP address; client-sent `CF-Connecting-IP` / `X-Forwarded-For` are ignored unless `TRUST_PROXY=1` (exactly one trusted reverse proxy) |
| `handler.test.ts`, `node-server.test.ts` | Unit tests and a Node-adapter spoofing test (`npm test`) |
| `wrangler.toml` | Cloudflare Worker configuration (committed, no secrets) |

Validation rules are shared with the browser form (`src/lib/demoValidation.ts`),
so the server never accepts something the form would reject.

## What it does

1. **Origin check and CORS:** only origins in `ALLOWED_ORIGINS` may submit.
2. **Request checks:** POST only, JSON only, body of 16 KB or less.
3. **Honeypot:** a hidden field that people leave empty. Bots that fill it get a normal-looking success and nothing is delivered.
4. **Timing check:** forms completed in under 3 seconds are rejected. The person is asked to check their details and send again.
5. **Rate limit:** 5 requests per client address per 10 minutes. This is per instance, so also add a platform rate-limiting rule.
6. **Server-side validation:** the same rules as the form. Field errors are returned and shown next to the fields.
7. **Optional Cloudflare Turnstile:** required when `TURNSTILE_SECRET_KEY` is set.
8. **Duplicate protection:** each filled-in form has a request id. The endpoint claims the id before delivering (a concurrent copy gets `409 in-progress`) and never delivers the same id twice. The id is also sent downstream (`X-Request-Id` header, and a Resend `Idempotency-Key`), so receivers can de-duplicate across instances.
9. **Delivery:** to a webhook, by email through Resend, or both. Success is reported only if at least one destination accepted the request. Otherwise the person sees an error and their details stay in the form.
10. **Logging:** only operational events (delivered, rejected and the reason, provider status codes). No personal data is logged.

Responses are `{ "ok": true }`, or `{ "ok": false, "error": "<code>" }` with one of these codes: `validation` (with `fields`), `too-fast`, `in-progress`, `rate-limited`, `verification`, `not-configured`, `delivery`, `forbidden`, `bad-request`.

## Configuration

| Variable | Where | Required | Notes |
| --- | --- | --- | --- |
| `ALLOWED_ORIGINS` | endpoint (var) | yes | `https://funda360.aurisnexus.co.za`. Comma-separate to add a preview origin |
| `DEMO_REQUEST_WEBHOOK_URL` | endpoint (secret) | one delivery option | CRM, form service or automation webhook. Receives the JSON shown below |
| `DEMO_REQUEST_WEBHOOK_SECRET` | endpoint (secret) | recommended with webhook | Body signed as `X-Funda360-Signature: sha256=<hex HMAC>` |
| `RESEND_API_KEY` | endpoint (secret) | one delivery option | Email delivery through Resend |
| `DEMO_REQUEST_EMAIL_TO` | endpoint (var) | with email | CONFIRM: the inbox that receives demo requests (comma-separated) |
| `DEMO_REQUEST_EMAIL_FROM` | endpoint (var, in `wrangler.toml`) | with email | `Funda360 Website <demo@funda360.aurisnexus.co.za>` (domain verified in Resend) |
| `TURNSTILE_SECRET_KEY` | endpoint (secret) | optional, recommended | Pair it with the site key below |
| `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` | site build (public) | yes | The endpoint's HTTPS URL. Public by design; not a secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | site build (public) | with Turnstile | Turnstile site key |
| `NEXT_PUBLIC_CONTACT_EMAIL` | site build (public) | optional | CONFIRM: shown as an alternative if submission fails |

Site build values are GitHub repository **variables** (Settings > Secrets and
variables > Actions > Variables). The Pages workflow already passes them to the build.

Webhook payload:

```json
{
  "requestId": "…", "submittedAt": "2026-10-02T10:00:00.000Z", "source": "funda360-website", "origin": "https://funda360.aurisnexus.co.za",
  "contact": { "name": "…", "email": "…", "phone": null },
  "organisation": "…",
  "role": { "value": "principal", "label": "Principal or deputy principal" },
  "size": { "value": "300-700", "label": "One school, 300 to 700 learners" },
  "interests": [{ "value": "attendance", "label": "Attendance" }],
  "message": null,
  "consent": { "contactAboutRequest": true }
}
```

## Deploy (Cloudflare Workers)

The endpoint also exposes `GET /healthz` as a non-sensitive deployment/readiness probe. It returns `{ "ok": true, "service": "funda360-demo-request" }` and never exposes delivery credentials.

### Recommended: from GitHub (no command line)

`.github/workflows/demo-request.yml` deploys the Worker, copies the delivery
settings from GitHub to the Worker as Worker secrets (never printed; blank
values are skipped), checks `/healthz`, and can send one labelled test request.

1. **Resend:**
   1. Add and verify the sending domain, for example `funda360.aurisnexus.co.za`, by adding the DNS records Resend shows.
   2. Create an API key with **Sending access**, restricted to that domain.
2. **GitHub > Settings > Secrets and variables > Actions > Secrets:**
   - `CLOUDFLARE_API_TOKEN` (the "Edit Cloudflare Workers" token template)
   - `CLOUDFLARE_ACCOUNT_ID`
   - `RESEND_API_KEY`
   - `DEMO_REQUEST_EMAIL_TO`: the inbox that receives requests, kept out of the repository
3. **From address:** already set in `wrangler.toml` as `Funda360 Website <demo@funda360.aurisnexus.co.za>`. No mailbox is needed for it; replies go to the requester.
4. **Run the workflow:** Actions > **Deploy Funda360 Demo Request Worker** > Run workflow, with **send_test** ticked.
   - The run summary shows the Worker URL.
   - A test email titled "Funda360 demo request: Deployment check (not a real request)" should arrive.
5. **Connect the site:** set the variable `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` to the Worker URL and re-run the Pages workflow. Its live verification then checks the endpoint's CORS.

### Manual alternative

```bash
cd server/demo-request
npx wrangler login
npx wrangler secret put RESEND_API_KEY        # also DEMO_REQUEST_EMAIL_TO (and optional webhook/Turnstile secrets)
npx wrangler deploy                           # note the https://… URL it prints
```

Then:

1. Optionally give the Worker a custom route, for example `https://demo-api.funda360.aurisnexus.co.za` (CONFIRM the hostname).
2. Add a Cloudflare rate-limiting rule for the route, for example 10 requests per minute per IP.
3. Set the GitHub repository variable `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` to the Worker URL, plus `NEXT_PUBLIC_TURNSTILE_SITE_KEY` if Turnstile is used. Re-run the Pages workflow.
4. Verify in production: submit a test request on `/request-demo/` and confirm it arrives exactly once. The "not connected yet" notice must no longer appear.

Any host that runs Web-standard handlers (Deno Deploy, Bun, Vercel or Netlify
functions, a Node server behind HTTPS with `node-server.ts`) works the same way.

## Test

```bash
npm test                                                   # unit tests for the handler
NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT=http://localhost:8787 npm run build
npm run qa:demo                                            # browser -> site -> endpoint -> local webhook, end to end
```
