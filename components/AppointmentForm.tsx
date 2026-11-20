'use client';
/**
 * Appointment request form with client-side validation (port of main.js §4).
 * Used inline on the homepage (dark variant) and in the popup (light variant).
 * TODO: replace the success branch with a real submission (fetch to form endpoint / CRM).
 */
import { useRef, useState, type CSSProperties, type FormEvent } from 'react';

type Field = 'name' | 'phone' | 'email' | 'message';
const FIELDS: Field[] = ['name', 'phone', 'email', 'message'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  idPrefix: string;
  variant?: 'dark' | 'light';
  messagePlaceholder: string;
  messageStyle?: CSSProperties;
};

export default function AppointmentForm({ idPrefix, variant = 'dark', messagePlaceholder, messageStyle }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState('');
  // Fields the user has typed in. Blur-validation only runs for these, so an untouched
  // field never shows an error (and shifts the layout) just because focus moved to Submit.
  const dirty = useRef<Set<Field>>(new Set());

  const getInput = (f: Field) =>
    formRef.current?.elements.namedItem(f) as HTMLInputElement | HTMLTextAreaElement | null;

  function validate(f: Field): boolean {
    const input = getInput(f);
    if (!input) return true;
    const value = input.value.trim();
    let ok = input.checkValidity() && value.length > 0;
    if (f === 'email' && value) ok = ok && EMAIL_RE.test(value);
    setErrors((prev) => ({ ...prev, [f]: !ok }));
    return ok;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const invalid = FIELDS.filter((f) => !validate(f));
    if (invalid.length) {
      getInput(invalid[0])?.focus();
      setStatus('Please correct the highlighted fields.');
      return;
    }
    setStatus('Thank you! Your request has been received. Our team will contact you shortly.');
    formRef.current?.reset();
    dirty.current.clear();
    setErrors({});
  }

  const fieldProps = (f: Field) => ({
    id: `${idPrefix}-${f}`,
    name: f,
    className: 'form__input',
    required: true,
    'aria-invalid': errors[f] ? true : false,
    onBlur: () => { if (dirty.current.has(f)) validate(f); },
    onInput: () => { dirty.current.add(f); if (errors[f]) validate(f); },
  });
  const wrap = (f: Field) => `form__field${errors[f] ? ' has-error' : ''}`;

  return (
    <form ref={formRef} className={`form${variant === 'light' ? ' form--light' : ''} js-validate`}
          action="#" method="post" noValidate onSubmit={onSubmit}>
      <div className={wrap('name')}>
        <label className="sr-only" htmlFor={`${idPrefix}-name`}>Name (required)</label>
        <input {...fieldProps('name')} type="text" placeholder="Name: *" autoComplete="name" maxLength={100} />
        <span className="form__error" role="alert">Please enter your name.</span>
      </div>
      <div className={wrap('phone')}>
        <label className="sr-only" htmlFor={`${idPrefix}-phone`}>Phone (required)</label>
        <input {...fieldProps('phone')} type="tel" placeholder="Phone: * 999-999-9999" autoComplete="tel" inputMode="tel"
               pattern="^\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$" />
        <span className="form__error" role="alert">Please enter a valid 10-digit phone number.</span>
      </div>
      <div className={wrap('email')}>
        <label className="sr-only" htmlFor={`${idPrefix}-email`}>Email address (required)</label>
        <input {...fieldProps('email')} type="email" placeholder="Email Address: *" autoComplete="email" />
        <span className="form__error" role="alert">Please enter a valid email address.</span>
      </div>
      <div className={wrap('message')}>
        <label className="sr-only" htmlFor={`${idPrefix}-message`}>Message (required)</label>
        <textarea {...fieldProps('message')} maxLength={2000} placeholder={messagePlaceholder} style={messageStyle} />
        <span className="form__error" role="alert">Please add a short message.</span>
      </div>
      <button className="form__submit" type="submit">Request An Appointment</button>
      <p className="form__status" aria-live="polite">{status}</p>
    </form>
  );
}
