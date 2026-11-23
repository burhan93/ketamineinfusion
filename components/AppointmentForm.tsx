'use client';
/**
 * Appointment request form with client-side validation.
 * Used inline on the homepage (shown in a white card) and in the popup.
 *
 * Accessibility / readability:
 *  - visible labels above every field (placeholders are only examples)
 *  - 16px+ text, 54px-tall fields, large checkbox and full-width button
 *  - errors use text + icon + colour, are linked with aria-describedby
 *
 * TODO: replace the success branch with a real submission (fetch to form endpoint / CRM)
 *       and store the consent text + timestamp with each submission.
 */
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
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
  /** 'card' = white card on a coloured section (homepage); 'plain' = already on white (popup). */
  variant?: 'card' | 'plain';
  /** Help text shown under the Message label. */
  messageHint: string;
  messageStyle?: CSSProperties;
};

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
);
const StatusIcon = ({ ok }: { ok: boolean }) => ok
  ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" /></svg>
  : <ErrorIcon />;

export default function AppointmentForm({ idPrefix, variant = 'card', messageHint, messageStyle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [source, setSource] = useState('');
  // Fields the user has typed in. Blur-validation only runs for these, so an untouched
  // field never shows an error (and shifts the layout) just because focus moved to Submit.
  const dirty = useRef<Set<Field>>(new Set());

  // Keep the error summary in sync while the user fixes fields; hide it when all are fixed.
  useEffect(() => {
    if (!status || status.ok) return;
    const count = Object.values(errors).filter(Boolean).length;
    if (count === 0) setStatus(null);
    else setStatus({ ok: false, text: `Please check the ${count === 1 ? 'highlighted field' : `${count} highlighted fields`} above.` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const showOther = source === 'Other';
  const activeFields: Field[] = ['name', 'phone', 'email', 'source', ...(showOther ? ['sourceOther' as Field] : []), 'message', 'consent'];
  const getInput = (f: Field) => formRef.current?.elements.namedItem(f) as Control | null;
  const id = (f: Field) => `${idPrefix}-${f}`;

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
      setStatus({ ok: false, text: `Please check the ${invalid.length === 1 ? 'highlighted field' : `${invalid.length} highlighted fields`} above.` });
      return;
    }
    setStatus({ ok: true, text: 'Thank you! Your request has been received. Our team will call you during office hours.' });
    formRef.current?.reset();
    setSource('');
    dirty.current.clear();
    setErrors({});
  }

  const fieldProps = (f: Field, required = true) => ({
    id: id(f),
    name: f,
    className: 'form__input',
    required,
    'aria-invalid': errors[f] ? true : false,
    'aria-describedby': `${id(f)}-error`,
    onBlur: () => { if (dirty.current.has(f)) validate(f); },
    onInput: () => { dirty.current.add(f); if (errors[f]) validate(f); },
  });
  const wrap = (f: Field, extra = '') => `form__field${extra ? ' ' + extra : ''}${errors[f] ? ' has-error' : ''}`;
  const label = (f: Field, text: string, required = true) => (
    <label className="form__label" htmlFor={id(f)}>
      {text}{required && <span className="form__req" aria-hidden="true"> *</span>}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  );
  const error = (f: Field, text: string) => (
    <span className="form__error" id={`${id(f)}-error`} role="alert"><ErrorIcon />{text}</span>
  );

  return (
    <form ref={formRef} className={`form form--${variant} js-validate`} action="#" method="post" noValidate onSubmit={onSubmit}>
      <p className="form__intro">Fields marked <span className="form__req">*</span> are required.</p>

      <div className={wrap('name')}>
        {label('name', 'Full name')}
        <input {...fieldProps('name')} type="text" placeholder="e.g. Jane Smith" autoComplete="name" maxLength={100} />
        {error('name', 'Please enter your name.')}
      </div>

      <div className="form__row">
        <div className={wrap('phone')}>
          {label('phone', 'Phone number')}
          <input {...fieldProps('phone')} type="tel" placeholder="(913) 555-0123" autoComplete="tel" inputMode="tel"
                 pattern="^\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" />
          {error('phone', 'Please enter a 10-digit phone number.')}
        </div>
        <div className={wrap('email')}>
          {label('email', 'Email address')}
          <input {...fieldProps('email')} type="email" placeholder="name@example.com" autoComplete="email" />
          {error('email', 'Please enter a valid email address.')}
        </div>
      </div>

      {/* How did you hear about us? */}
      <div className={wrap('source')}>
        {label('source', 'How did you hear about us?', SOURCE_REQUIRED)}
        <select {...fieldProps('source', SOURCE_REQUIRED)} value={source}
                className={`form__input form__select${source ? '' : ' is-placeholder'}`}
                onChange={(e) => {
                  setSource(e.target.value);
                  dirty.current.add('source');
                  validate('source');
                }}>
          <option value="" disabled>Please choose one</option>
          {REFERRAL_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {error('source', 'Please tell us how you heard about us.')}
      </div>
      {showOther && (
        <div className={wrap('sourceOther', 'form__field--reveal')}>
          {label('sourceOther', 'Please tell us where')}
          <input {...fieldProps('sourceOther')} type="text" placeholder="e.g. a community event" maxLength={120} autoFocus />
          {error('sourceOther', 'Please tell us where you heard about us.')}
        </div>
      )}

      <div className={wrap('message')}>
        {label('message', 'Message')}
        <p className="form__hint" id={`${id('message')}-hint`}>{messageHint}</p>
        <textarea {...fieldProps('message')} aria-describedby={`${id('message')}-hint ${id('message')}-error`}
                  maxLength={2000} placeholder="e.g. The best time to call me is weekday mornings." style={messageStyle} />
        {error('message', 'Please add a short message.')}
      </div>

      {/* Required consent before submitting */}
      <div className={wrap('consent', 'form__field--consent')}>
        <label className="form__consent" htmlFor={id('consent')}>
          <input id={id('consent')} name="consent" type="checkbox" required value="yes"
                 aria-invalid={errors.consent ? true : false} aria-describedby={`${id('consent')}-error`}
                 onChange={() => { dirty.current.add('consent'); validate('consent'); }} />
          <span className="form__checkbox" aria-hidden="true" />
          <span className="form__consent-text">
            <strong>I agree to be contacted</strong> by Balanced Ketamine by phone, text message or email about this request
            (message and data rates may apply; reply STOP to opt out). I understand this form is not for emergencies or
            protected health information, and that submitting it does not create a physician–patient relationship.
            I have read the <a href="/privacy-policy/" {...ext}>Privacy Policy</a>,{' '}
            <a href="/hipaa-notice/" {...ext}>HIPAA Notice</a> and <a href="/terms-of-use/" {...ext}>Terms of Use</a>.
            <span className="form__req" aria-hidden="true"> *</span>
          </span>
        </label>
        {error('consent', 'Please tick the box to agree before sending.')}
      </div>

      <button className="form__submit" type="submit">
        Request An Appointment
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </button>
      <p className={`form__status${status ? (status.ok ? ' is-success' : ' is-error') : ''}`} aria-live="polite">
        {status && <><StatusIcon ok={status.ok} />{status.text}</>}
      </p>
    </form>
  );
}
