'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { demoPage, interestOptions, roleOptions, sizeOptions } from '@/content/demo';
import { emptyDemoRequest, submitDemoRequest, validateDemoRequest, type DemoRequest, type DemoRequestErrors, type DemoRequestField, type SubmitResult } from '@/lib/demoRequest';

type Status = { kind: 'idle' } | { kind: 'submitting' } | SubmitResultStatus;
type SubmitResultStatus = { kind: SubmitResult['status']; message?: string };

/** Order used for the error summary (matches visual/DOM order). */
const FIELD_ORDER: DemoRequestField[] = ['name', 'organisation', 'email', 'phone', 'role', 'size', 'interests', 'message', 'consent'];

/** The element to focus for each field from the error summary. */
const FIELD_TARGET: Record<DemoRequestField, string> = {
  name: 'demo-name',
  organisation: 'demo-organisation',
  email: 'demo-email',
  phone: 'demo-phone',
  role: 'demo-role',
  size: 'demo-size',
  interests: `demo-interest-${interestOptions[0].value}`,
  message: 'demo-message',
  consent: 'demo-consent',
};

/**
 * Request a Demo form.
 *
 * Accessibility:
 * - every control has a visible <label>; groups use <fieldset>/<legend>
 * - required fields say "(required)" in the label and carry `required`
 * - errors are linked with aria-describedby and aria-invalid
 * - on a failed submit, an error summary receives focus and links to each field
 * - submission results are announced in a focused status region
 */
export function DemoRequestForm() {
  const [data, setData] = useState<DemoRequest>(emptyDemoRequest);
  const [errors, setErrors] = useState<DemoRequestErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof DemoRequest>(key: K, value: DemoRequest[K]) {
    const next = { ...data, [key]: value };
    setData(next);
    // Once the user has tried to submit, keep errors in sync as they fix them.
    if (submitted) setErrors(validateDemoRequest(next));
  }

  function toggleInterest(value: string, checked: boolean) {
    update('interests', checked ? [...data.interests, value] : data.interests.filter((v) => v !== value));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validateDemoRequest(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'idle' });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus({ kind: 'submitting' });
    const result = await submitDemoRequest(data);
    setStatus({ kind: result.status, message: result.status === 'error' ? result.message : undefined });
    if (result.status === 'success') {
      setData(emptyDemoRequest);
      setSubmitted(false);
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const describedBy = (field: DemoRequestField, hint = false) => [hint ? `demo-${field}-hint` : null, errors[field] ? `demo-${field}-error` : null].filter(Boolean).join(' ') || undefined;

  const errorEntries = FIELD_ORDER.filter((f) => errors[f]).map((f) => [f, errors[f] as string] as const);

  return (
    <>
      {status.kind === 'success' || status.kind === 'not-configured' || status.kind === 'error' ? (
        <div ref={statusRef} tabIndex={-1} className="form-status" role={status.kind === 'error' ? 'alert' : 'status'} data-status={status.kind}>
          {status.kind === 'success' ? (
            <>
              <h2>Thank you, your request has been sent</h2>
              <p>The Funda360 team will contact you to arrange your demo.</p>
            </>
          ) : null}
          {status.kind === 'not-configured' ? (
            <>
              <h2>Your details are valid, but online submission is not connected yet</h2>
              {/* PHASE 1 INTEGRATION BOUNDARY: set NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT (see src/lib/demoRequest.ts). */}
              <p>This website is in preview and demo requests cannot be sent from this form yet. Your information has not been stored or sent anywhere.</p>
            </>
          ) : null}
          {status.kind === 'error' ? (
            <>
              <h2>Your request was not sent</h2>
              <p>{status.message}</p>
            </>
          ) : null}
        </div>
      ) : null}

      {errorEntries.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} className="error-summary" role="alert" aria-labelledby="error-summary-heading">
          <h2 id="error-summary-heading">There {errorEntries.length === 1 ? 'is a problem' : `are ${errorEntries.length} problems`} with your request</h2>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${FIELD_TARGET[field]}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form className="form" noValidate onSubmit={onSubmit} aria-describedby="demo-form-required-note" data-form="demo-request">
        <p id="demo-form-required-note" className="hint">
          Fields marked (required) must be completed.
        </p>

        <div className="form__row">
          <TextField
            id="demo-name"
            field="name"
            label="Full name"
            required
            autoComplete="name"
            value={data.name}
            error={errors.name}
            describedBy={describedBy('name')}
            onChange={(v) => update('name', v)}
          />

          <TextField
            id="demo-organisation"
            field="organisation"
            label="School or organisation"
            required
            autoComplete="organization"
            value={data.organisation}
            error={errors.organisation}
            describedBy={describedBy('organisation')}
            onChange={(v) => update('organisation', v)}
          />
        </div>

        <div className="form__row">
          <TextField
            id="demo-email"
            field="email"
            label="Work email address"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            error={errors.email}
            describedBy={describedBy('email')}
            onChange={(v) => update('email', v)}
          />

          <TextField
            id="demo-phone"
            field="phone"
            label="Phone number (optional)"
            type="tel"
            autoComplete="tel"
            hint="Include your country code if you are outside South Africa."
            value={data.phone}
            error={errors.phone}
            describedBy={describedBy('phone', true)}
            onChange={(v) => update('phone', v)}
          />
        </div>

        <div className="form__row form__row--end">
          <div className="field">
            <label htmlFor="demo-role">Your role (required)</label>
            <select id="demo-role" name="role" required value={data.role} aria-invalid={Boolean(errors.role)} aria-describedby={describedBy('role')} onChange={(e) => update('role', e.target.value)}>
              <option value="">Select your role</option>
              {roleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <FieldError field="role" error={errors.role} />
          </div>

          <div className="field">
            <label htmlFor="demo-size">Number of learners or schools (required)</label>
            <select id="demo-size" name="size" required value={data.size} aria-invalid={Boolean(errors.size)} aria-describedby={describedBy('size')} onChange={(e) => update('size', e.target.value)}>
              <option value="">Select a size</option>
              {sizeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <FieldError field="size" error={errors.size} />
          </div>
        </div>

        <fieldset className="field" aria-describedby={describedBy('interests', true)} aria-invalid={Boolean(errors.interests) || undefined}>
          <legend>What are you interested in? (required)</legend>
          <p id="demo-interests-hint" className="hint">
            Select all that apply.
          </p>
          <div className="choice-grid">
            {interestOptions.map((o) => {
              const id = `demo-interest-${o.value}`;
              return (
                <div key={o.value} className="choice">
                  <input id={id} type="checkbox" name="interests" value={o.value} checked={data.interests.includes(o.value)} onChange={(e) => toggleInterest(o.value, e.target.checked)} />
                  <label htmlFor={id}>{o.label}</label>
                </div>
              );
            })}
          </div>
          <FieldError field="interests" error={errors.interests} />
        </fieldset>

        <div className="field">
          <label htmlFor="demo-message">Message (optional)</label>
          <p id="demo-message-hint" className="hint">
            Tell us anything that will help us prepare, such as the systems you use today.
          </p>
          <textarea
            id="demo-message"
            name="message"
            rows={6}
            maxLength={2000}
            value={data.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message', true)}
            onChange={(e) => update('message', e.target.value)}
          />
          <FieldError field="message" error={errors.message} />
        </div>

        <div className="field">
          <div className="choice">
            <input
              id="demo-consent"
              type="checkbox"
              name="consent"
              required
              checked={data.consent}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy('consent', true)}
              onChange={(e) => update('consent', e.target.checked)}
            />
            <label htmlFor="demo-consent">I agree that Funda360 may contact me about this request (required)</label>
          </div>
          <p id="demo-consent-hint" className="hint">
            {demoPage.privacyNote} <Link href="/privacy">Read the privacy policy</Link>.
          </p>
          <FieldError field="consent" error={errors.consent} />
        </div>

        {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="demo-website">Leave this field empty</label>
          <input id="demo-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update('website', e.target.value)} />
        </div>

        <div className="form__submit">
          <button type="submit" className="cta cta--primary" disabled={status.kind === 'submitting'} aria-disabled={status.kind === 'submitting'}>
            {status.kind === 'submitting' ? 'Sending request…' : 'Request a demo'}
          </button>
        </div>
      </form>
    </>
  );
}

function FieldError({ field, error }: { field: DemoRequestField; error?: string }) {
  if (!error) return null;
  return (
    <p id={`demo-${field}-error`} className="error">
      {error}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  field: DemoRequestField;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  error?: string;
  describedBy?: string;
};

function TextField({ id, field, label, value, onChange, type = 'text', required, autoComplete, hint, error, describedBy }: TextFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? ' (required)' : ''}
      </label>
      {hint ? (
        <p id={`demo-${field}-hint`} className="hint">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={field}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />
      <FieldError field={field} error={error} />
    </div>
  );
}
