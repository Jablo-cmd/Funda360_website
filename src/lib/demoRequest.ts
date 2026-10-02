import { siteConfig } from '@/config/site';
import type { DemoRequest, DemoRequestErrors } from './demoValidation';

export { emptyDemoRequest, validateDemoRequest } from './demoValidation';
export type { DemoRequest, DemoRequestErrors, DemoRequestField } from './demoValidation';

/**
 * Request a Demo: browser-side submission.
 *
 * The site is a static export, so submissions go to a separate server-side
 * endpoint (server/demo-request, deployed on its own) whose public URL is
 * NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT. The endpoint re-validates every field,
 * applies spam protection and rate limits, and holds all delivery secrets.
 * Nothing secret is ever sent to or stored in the browser.
 */

export type SubmitMeta = {
  /** Stable per filled-in form; lets the endpoint ignore accidental duplicates. */
  requestId: string;
  /** Milliseconds between the first interaction and submit (bots submit instantly). */
  elapsedMs: number;
  /** Cloudflare Turnstile token, when Turnstile is enabled. */
  turnstileToken?: string;
};

export type SubmitResult =
  | { status: 'success' }
  | { status: 'not-configured' }
  | { status: 'invalid'; errors: DemoRequestErrors }
  | { status: 'error'; message: string };

const TIMEOUT_MS = 15000;

export async function submitDemoRequest(data: DemoRequest, meta: SubmitMeta): Promise<SubmitResult> {
  // Silently accept honeypot submissions without sending them anywhere.
  if (data.website) return { status: 'success' };

  if (!siteConfig.demoRequestEndpoint) return { status: 'not-configured' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(siteConfig.demoRequestEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ...meta }),
      signal: controller.signal,
      credentials: 'omit',
    });
    const body = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: DemoRequestErrors };
    if (response.ok && body.ok) return { status: 'success' };

    switch (body.error) {
      case 'validation':
        return body.fields && Object.keys(body.fields).length ? { status: 'invalid', errors: body.fields } : { status: 'error', message: 'Some details could not be accepted. Check the form and try again.' };
      case 'not-configured':
        return { status: 'not-configured' };
      case 'too-fast':
        return { status: 'error', message: 'Please take a moment to check your details, then send your request again.' };
      case 'rate-limited':
        return { status: 'error', message: 'Several requests were sent from your connection in a short time. Please wait a few minutes and try again.' };
      case 'verification':
        return { status: 'error', message: 'We could not confirm that this request came from a person. Complete the security check and try again.' };
      default:
        return { status: 'error', message: 'We could not send your request. Your details are still in the form, so please try again in a moment.' };
    }
  } catch {
    return { status: 'error', message: 'We could not reach the server. Check your connection and try again. Your details are still in the form.' };
  } finally {
    clearTimeout(timer);
  }
}

/** A random request id (crypto.randomUUID where available). */
export function newRequestId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
