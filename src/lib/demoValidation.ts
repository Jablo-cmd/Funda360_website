import { interestOptions, roleOptions, sizeOptions } from '../content/demo.ts';

/**
 * Request a Demo: data shape and validation shared by the browser form and
 * the server endpoint (server/demo-request). Keep this module free of
 * framework and path-alias imports so the endpoint can run it unchanged.
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

export const MESSAGE_MAX = 2000;
// One address only: no spaces, separators or display-name characters.
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]"'\\]+@[^\s@,;:<>()[\]"'\\]+\.[^\s@,;:<>()[\]"'\\]+$/;
// Digits with optional leading +, spaces, brackets and hyphens; 9 to 15 digits.
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

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
  else if (data.email.trim().length > 254 || !EMAIL_PATTERN.test(data.email.trim())) errors.email = 'Enter an email address in the format name@example.com.';

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

/**
 * Coerce untrusted JSON into a DemoRequest. Unknown keys are dropped and wrong
 * types become empty values, so validateDemoRequest() reports them as missing.
 */
export function normaliseDemoRequest(input: unknown): DemoRequest {
  const source = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const text = (key: string, max: number) => (typeof source[key] === 'string' ? (source[key] as string).slice(0, max) : '');
  const interests = Array.isArray(source.interests) ? source.interests.filter((v): v is string => typeof v === 'string').slice(0, interestOptions.length) : [];
  return {
    name: text('name', 500),
    organisation: text('organisation', 500),
    email: text('email', 500),
    phone: text('phone', 100),
    role: text('role', 100),
    size: text('size', 100),
    interests: [...new Set(interests)],
    // One character over the limit is kept so validation can report it.
    message: text('message', MESSAGE_MAX + 1),
    consent: source.consent === true,
    website: text('website', 500),
  };
}

/** Human-readable labels for delivery (email/webhook), so recipients never see raw option values. */
export function describeDemoRequest(data: DemoRequest) {
  const label = (options: { value: string; label: string }[], value: string) => options.find((o) => o.value === value)?.label ?? value;
  return {
    role: label(roleOptions, data.role),
    size: label(sizeOptions, data.size),
    interests: data.interests.map((i) => label(interestOptions, i)),
  };
}
