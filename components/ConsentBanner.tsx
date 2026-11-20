'use client';
/** First-visit cookie banner (Accept All / Necessary Only / Preferences). */
import Link from 'next/link';
import { useSite } from './SiteProvider';

export default function ConsentBanner({ visible }: { visible: boolean }) {
  const { saveConsent, openConsentPrefs } = useSite();
  return (
    <section className="consent-banner" id="consent-banner" aria-labelledby="consent-title" hidden={!visible}>
      <div>
        <h2 id="consent-title">We value your privacy</h2>
        <p>We use necessary cookies to run this site. With your permission we also use statistics and marketing cookies (such as Google Maps) to understand visits and show embedded content. You can change your choice at any time. Read our <Link href="/cookie-policy/">Cookie Policy</Link>.</p>
      </div>
      <div className="consent-actions">
        <button className="btn btn--purple" type="button" data-consent="accept"
                onClick={() => saveConsent({ preferences: true, statistics: true, marketing: true })}>Accept All</button>
        <button className="btn btn--blue" type="button" data-consent="reject" onClick={() => saveConsent({})}>Necessary Only</button>
        <button className="btn btn--ghost" type="button" data-consent="manage" onClick={openConsentPrefs}>Preferences</button>
      </div>
    </section>
  );
}
