import { siteConfig } from '@/config/site';
import { interestOptions, roleOptions, sizeOptions } from '@/content/demo';

/**
 * Request a Demo: data shape, validation and the submission integration boundary.
 *
 * Validation is a pure function so the same rules can run in the browser now
 * and on the server later (CRM webhook, form service or Edge Function).
 */

export type DemoRequest = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  role: string;
  size: string;
  interests: string[];
  message: string;
  consent: boolean;
  /** Honeypot field: real people leave it empty. */
  website: string;
};

export type DemoRequestField = Exclude<keyof DemoRequest, 'website'>;
export type DemoRequestErrors = Partial<Record<DemoRequestField, string>>;

export const emptyDemoRequest: DemoRequest = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  role: '',
  size: '',
  interests: [],
  message: '',
  consent: false,
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits with optional leading +, spaces, brackets and hyphens; 9 to 15 digits.
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const MESSAGE_MAX = 2000;

const validValues = (options: { value: string }[]) => new Set(options.map((o) => o.value));
const ROLES = validValues(roleOptions);
const SIZES = validValues(sizeOptions);
const INTERESTS = validValues(interestOptions);

export function validateDemoRequest(data: DemoRequest): DemoRequestErrors {
  const errors: DemoRequestErrors = {};

  if (!data.name.trim()) errors.name = 'Enter your name.';
  else if (data.name.trim().length > 120) errors.name = 'Name must be 120 characters or fewer.';

  if (!data.organisation.trim()) errors.organisation = 'Enter your school or organisation.';
  else if (data.organisation.trim().length > 160) errors.organisation = 'Organisation must be 160 characters or fewer.';

  if (!data.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Enter an email address in the format name@example.com.';

  if (data.phone.trim()) {
    const digits = data.phone.replace(/\D/g, '');
    if (!PHONE_PATTERN.test(data.phone.trim()) || digits.length < 9 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number, for example 012 345 6789 or +27 12 345 6789.';
    }
  }

  if (!ROLES.has(data.role)) errors.role = 'Select your role.';
  if (!SIZES.has(data.size)) errors.size = 'Select the number of learners or schools.';

  if (data.interests.length === 0) errors.interests = 'Select at least one area of interest.';
  else if (data.interests.some((i) => !INTERESTS.has(i))) errors.interests = 'Select from the listed areas of interest.';

  if (data.message.length > MESSAGE_MAX) errors.message = `Message must be ${MESSAGE_MAX} characters or fewer.`;

  if (!data.consent) errors.consent = 'Confirm that we may contact you about your request.';

  return errors;
}

export type SubmitResult =
  | { status: 'success' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string };

/**
 * INTEGRATION BOUNDARY.
 *
 * Phase 1 has no backend. When NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT is set, the
 * request is POSTed there as JSON. Choose and implement the receiving service
 * (CRM, form service, Supabase Edge Function, etc.) in a later phase. It must
 * re-run validateDemoRequest() server-side and apply rate limiting.
 */
export async function submitDemoRequest(data: DemoRequest): Promise<SubmitResult> {
  // Silently accept honeypot submissions without sending them anywhere.
  if (data.website) return { status: 'success' };

  if (!siteConfig.demoRequestEndpoint) return { status: 'not-configured' };

  const { website: _honeypot, ...payload } = data;
  try {
    const response = await fetch(siteConfig.demoRequestEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'funda360-website', submittedAt: new Date().toISOString() }),
    });
    if (!response.ok) return { status: 'error', message: 'We could not send your request. Please try again.' };
    return { status: 'success' };
  } catch {
    return { status: 'error', message: 'We could not reach the server. Check your connection and try again.' };
  }
}
