'use client';
/**
 * First-visit cookie banner – compact card in the bottom-left corner
 * (Accept All / Necessary Only, with Preferences as a text link).
 */
import Link from 'next/link';
import { useSite } from './SiteProvider';

export default function ConsentBanner({ visible }: { visible: boolean }) {
  const { saveConsent, openConsentPrefs } = useSite();
  return (
    <section className="consent-banner" id="consent-banner" aria-labelledby="consent-title" hidden={!visible}>
      <h2 id="consent-title">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5zm-3.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5.5 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></svg>
        We value your privacy
      </h2>
      <p>We use cookies to run this site and, with your OK, to measure visits and show maps. <Link href="/cookie-policy/">Cookie Policy</Link></p>
      <div className="consent-actions">
        <button className="btn btn--purple" type="button" data-consent="accept"
                onClick={() => saveConsent({ preferences: true, statistics: true, marketing: true })}>Accept All</button>
        <button className="btn btn--blue" type="button" data-consent="reject" onClick={() => saveConsent({})}>Necessary Only</button>
      </div>
      <button className="consent-banner__prefs" type="button" data-consent="manage" onClick={openConsentPrefs}>Manage preferences</button>
    </section>
  );
}
