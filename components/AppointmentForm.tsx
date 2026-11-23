'use client';
/**
 * Appointment request form with client-side validation (port of main.js §4).
 * Used inline on the homepage (dark variant) and in the popup (light variant).
 * Fields: name, phone, email, "How did you hear about us?" (+ "Other" detail),
 *         message and a required consent checkbox.
 * TODO: replace the success branch with a real submission (fetch to form endpoint / CRM)
 *       and store the consent text + timestamp with each submission.
 */
import { useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ext } from '@/lib/site';

type Field = 'name' | 'phone' | 'email' | 'source' | 'sourceOther' | 'message' | 'consent';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Set to false to make "How did you hear about us?" optional. */
const SOURCE_REQUIRED = true;

export const REFERRAL_SOURCES = [
  'Google or other search engine',
  'Doctor or healthcare provider referral',
  'Friend or family member',
  'Facebook',
  'YouTube',
  'TikTok',
  'Instagram',
  'Online review site',
  'Advertisement',
  'Other',
] as const;

type Props = {
  idPrefix: string;
  variant?: 'dark' | 'light';
  messagePlaceholder: string;
  messageStyle?: CSSProperties;
};

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function AppointmentForm({ idPrefix, variant = 'dark', messagePlaceholder, messageStyle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  // Fields the user has typed in. Blur-validation only runs for these, so an untouched
  // field never shows an error (and shifts the layout) just because focus moved to Submit.
  const dirty = useRef<Set<Field>>(new Set());

  const showOther = source === 'Other';
  const activeFields: Field[] = ['name', 'phone', 'email', 'source', ...(showOther ? ['sourceOther' as Field] : []), 'message', 'consent'];
  const getInput = (f: Field) => formRef.current?.elements.namedItem(f) as Control | null;

  function validate(f: Field): boolean {
    const input = getInput(f);
    if (!input) return true;
    let ok: boolean;
    if (f === 'consent') {
      ok = (input as HTMLInputElement).checked;
    } else if (f === 'source' && !SOURCE_REQUIRED) {
      ok = true;
    } else {
      const value = input.value.trim();
      ok = input.checkValidity() && value.length > 0;
      if (f === 'email' && value) ok = ok && EMAIL_RE.test(value);
    }
    setErrors((prev) => ({ ...prev, [f]: !ok }));
    return ok;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const invalid = activeFields.filter((f) => !validate(f));
    if (invalid.length) {
      getInput(invalid[0])?.focus();
      setStatus('Please correct the highlighted fields.');
      return;
    }
    setStatus('Thank you! Your request has been received. Our team will contact you shortly.');
    formRef.current?.reset();
    setSource('');
    dirty.current.clear();
    setErrors({});
  }

  const fieldProps = (f: Field, required = true) => ({
    id: `${idPrefix}-${f}`,
    name: f,
    className: 'form__input',
    required,
    'aria-invalid': errors[f] ? true : false,
    'aria-describedby': `${idPrefix}-${f}-error`,
    onBlur: () => { if (dirty.current.has(f)) validate(f); },
    onInput: () => { dirty.current.add(f); if (errors[f]) validate(f); },
  });
  const wrap = (f: Field, extra = '') => `form__field${extra ? ' ' + extra : ''}${errors[f] ? ' has-error' : ''}`;
  const errorProps = (f: Field) => ({ className: 'form__error', id: `${idPrefix}-${f}-error`, role: 'alert' as const });

  return (
    <form ref={formRef} className={`form${variant === 'light' ? ' form--light' : ''} js-validate`}
          action="#" method="post" noValidate onSubmit={onSubmit}>
      <div className={wrap('name')}>
        <label className="sr-only" htmlFor={`${idPrefix}-name`}>Name (required)</label>
        <input {...fieldProps('name')} type="text" placeholder="Name: *" autoComplete="name" maxLength={100} />
        <span {...errorProps('name')}>Please enter your name.</span>
      </div>
      <div className={wrap('phone')}>
        <label className="sr-only" htmlFor={`${idPrefix}-phone`}>Phone (required)</label>
        <input {...fieldProps('phone')} type="tel" placeholder="Phone: * 999-999-9999" autoComplete="tel" inputMode="tel"
               pattern="^\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" />
        <span {...errorProps('phone')}>Please enter a valid 10-digit phone number.</span>
      </div>
      <div className={wrap('email')}>
        <label className="sr-only" htmlFor={`${idPrefix}-email`}>Email address (required)</label>
        <input {...fieldProps('email')} type="email" placeholder="Email Address: *" autoComplete="email" />
        <span {...errorProps('email')}>Please enter a valid email address.</span>
      </div>

      {/* How did you hear about us? */}
      <div className={wrap('source', 'form__field--select')}>
        <label className="sr-only" htmlFor={`${idPrefix}-source`}>How did you hear about us?{SOURCE_REQUIRED ? ' (required)' : ''}</label>
        <select {...fieldProps('source', SOURCE_REQUIRED)} value={source}
                className={`form__input form__select${source ? '' : ' is-placeholder'}`}
                onChange={(e) => {
                  setSource(e.target.value);
                  dirty.current.add('source');
                  validate('source');
                }}>
          <option value="" disabled>How did you hear about us?{SOURCE_REQUIRED ? ' *' : ''}</option>
          {REFERRAL_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span {...errorProps('source')}>Please tell us how you heard about us.</span>
      </div>
      {showOther && (
        <div className={wrap('sourceOther')}>
          <label className="sr-only" htmlFor={`${idPrefix}-sourceOther`}>Please specify how you heard about us (required)</label>
          <input {...fieldProps('sourceOther')} type="text" placeholder="Please specify: *" maxLength={120} autoFocus />
          <span {...errorProps('sourceOther')}>Please tell us where you heard about us.</span>
        </div>
      )}

      <div className={wrap('message')}>
        <label className="sr-only" htmlFor={`${idPrefix}-message`}>Message (required)</label>
        <textarea {...fieldProps('message')} maxLength={2000} placeholder={messagePlaceholder} style={messageStyle} />
        <span {...errorProps('message')}>Please add a short message.</span>
      </div>

      {/* Required consent before submitting */}
      <div className={wrap('consent', 'form__field--consent')}>
        <label className="form__consent" htmlFor={`${idPrefix}-consent`}>
          <input id={`${idPrefix}-consent`} name="consent" type="checkbox" required value="yes"
                 aria-invalid={errors.consent ? true : false} aria-describedby={`${idPrefix}-consent-error`}
                 onChange={() => { dirty.current.add('consent'); validate('consent'); }} />
          <span className="form__checkbox" aria-hidden="true" />
          <span className="form__consent-text">
            I agree that Balanced Ketamine may contact me by phone, text message or email about this request
            (message and data rates may apply; reply STOP to opt out). I understand this form is not for emergencies or
            protected health information, and that submitting it does not create a physician–patient relationship.
            I have read the <a href="/privacy-policy/" {...ext}>Privacy Policy</a>,{' '}
            <a href="/hipaa-notice/" {...ext}>HIPAA Notice</a> and <a href="/terms-of-use/" {...ext}>Terms of Use</a>. *
          </span>
        </label>
        <span {...errorProps('consent')}>Please accept to continue.</span>
      </div>

      <button className="form__submit" type="submit">Request An Appointment</button>
      <p className="form__status" aria-live="polite">{status}</p>
    </form>
  );
}
