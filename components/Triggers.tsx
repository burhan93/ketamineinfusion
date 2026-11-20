'use client';
/**
 * Small client triggers used inside otherwise static (server-rendered) markup:
 *  - AppointmentLink: opens the appointment popup (falls back to /appointment-request/ without JS)
 *  - ConsentButton:   opens cookie preferences
 *  - ConsentStatus:   shows the saved cookie choice (cookie policy page)
 */
import type { ReactNode } from 'react';
import { useSite } from './SiteProvider';
import { APPOINTMENT_URL } from '@/lib/site';

export function AppointmentLink({ className, children }: { className?: string; children: ReactNode }) {
  const { openAppointment } = useSite();
  return (
    <a className={className} href={APPOINTMENT_URL} data-modal-open="appointment-modal"
       onClick={(e) => { e.preventDefault(); openAppointment(); }}>
      {children}
    </a>
  );
}

export function ConsentButton({ className, children }: { className?: string; children: ReactNode }) {
  const { openConsentPrefs } = useSite();
  return (
    <button className={className} type="button" data-consent="manage" onClick={openConsentPrefs}>{children}</button>
  );
}

export function ConsentStatus() {
  const { consent } = useSite();
  const onOff = (v: boolean) => (v ? 'on' : 'off');
  return (
    <p data-consent-status aria-live="polite">
      {consent
        ? `Your current choice (saved ${new Date(consent.date).toLocaleDateString()}): necessary – on; preferences – ${onOff(consent.preferences)}; statistics – ${onOff(consent.statistics)}; marketing – ${onOff(consent.marketing)}.`
        : 'You have not made a cookie choice on this device yet.'}
    </p>
  );
}
