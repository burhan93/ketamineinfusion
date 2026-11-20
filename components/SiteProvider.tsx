'use client';
/**
 * Global client state:
 *  - Appointment popup (opened by every "Request An Appointment" CTA)
 *  - Cookie consent (banner, preferences popup, GPC, consent-gated third parties)
 * Port of main.js §3 and §9.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import Modal from './Modal';
import AppointmentForm from './AppointmentForm';
import ConsentBanner from './ConsentBanner';
import ConsentPreferences from './ConsentPreferences';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

export type ConsentPrefs = { preferences: boolean; statistics: boolean; marketing: boolean };
export type Consent = ConsentPrefs & { v: number; date: string };

const CONSENT_KEY = 'bk-consent';
const CONSENT_VERSION = 1;

type SiteContextValue = {
  consent: Consent | null;
  gpc: boolean;
  saveConsent: (prefs: Partial<ConsentPrefs>) => void;
  openAppointment: () => void;
  openConsentPrefs: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

export default function SiteProvider({ children }: { children: ReactNode }) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [loaded, setLoaded] = useState(false);   // consent read from storage (client only)
  const [gpc, setGpc] = useState(false);

  // Read the stored choice once on the client.
  useEffect(() => {
    setGpc((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true);
    try {
      const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Consent | null;
      if (stored && stored.v === CONSENT_VERSION) setConsent(stored);
    } catch { /* storage unavailable */ }
    setLoaded(true);
  }, []);

  const saveConsent = useCallback((prefs: Partial<ConsentPrefs>) => {
    const next: Consent = {
      v: CONSENT_VERSION,
      preferences: !!prefs.preferences,
      statistics: !!prefs.statistics,
      marketing: !!prefs.marketing && !gpc,
      date: new Date().toISOString(),
    };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(next)); } catch { /* storage blocked */ }
    setConsent(next);
    setPrefsOpen(false);
  }, [gpc]);

  // Third-party loaders. Google Maps is handled declaratively by <ConsentMap>.
  useEffect(() => {
    if (!consent) return;
    // TODO (statistics): load Google Tag Manager here only when consent.statistics is true.
    // TODO (marketing): load Meta Pixel here only when consent.marketing is true.
  }, [consent]);

  const value = useMemo<SiteContextValue>(() => ({
    consent,
    gpc,
    saveConsent,
    openAppointment: () => setAppointmentOpen(true),
    openConsentPrefs: () => setPrefsOpen(true),
  }), [consent, gpc, saveConsent]);

  return (
    <SiteContext.Provider value={value}>
      {children}

      {/* APPOINTMENT POPUP (opened by every "Request An Appointment" CTA) */}
      <Modal id="appointment-modal" open={appointmentOpen} onClose={() => setAppointmentOpen(false)}
             labelledBy="modal-title" closeLabel="Close appointment form">
        <h2 id="modal-title">Request An Appointment</h2>
        <p>Send us your details and our team will call you back during office hours (Mon–Fri, 8:00am–4:30pm). Prefer to talk now? Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.</p>
        <AppointmentForm idPrefix="m" variant="light"
          messagePlaceholder="Please do not include protected health information (PHI). Submitting this request does not create a physician–patient relationship."
          messageStyle={{ minHeight: '120px' }} />
      </Modal>

      {/* COOKIE CONSENT – banner (first visit) + preferences popup. Policy: /cookie-policy/ */}
      <ConsentBanner visible={loaded && !consent} />
      <Modal id="consent-modal" open={prefsOpen} onClose={() => setPrefsOpen(false)}
             labelledBy="consent-modal-title" closeLabel="Close cookie preferences">
        <ConsentPreferences />
      </Modal>
    </SiteContext.Provider>
  );
}
