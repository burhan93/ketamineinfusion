'use client';
/** Body of the cookie preferences popup: per-category switches. */
import { useEffect, useState } from 'react';
import { useSite, type ConsentPrefs } from './SiteProvider';

const CATEGORIES: { key: keyof ConsentPrefs; id: string; title: string; text: string }[] = [
  { key: 'preferences', id: 'cc-pref', title: 'Preferences', text: 'Remembers settings you choose, such as display options.' },
  { key: 'statistics', id: 'cc-stat', title: 'Statistics', text: 'Anonymous visit statistics that help us improve the website.' },
  { key: 'marketing', id: 'cc-mkt', title: 'Marketing', text: 'Embedded maps and advertising measurement from third parties such as Google and Meta.' },
];

export default function ConsentPreferences() {
  const { consent, gpc, saveConsent } = useSite();
  const [prefs, setPrefs] = useState<ConsentPrefs>({ preferences: false, statistics: false, marketing: false });

  // Sync switches with the saved choice whenever it changes.
  useEffect(() => {
    setPrefs({
      preferences: !!consent?.preferences,
      statistics: !!consent?.statistics,
      marketing: !!consent?.marketing && !gpc,
    });
  }, [consent, gpc]);

  return (
    <>
      <h2 id="consent-modal-title">Cookie Preferences</h2>
      <p>Choose which cookies Balanced Ketamine may use on this device. Necessary cookies are always on because the site cannot work without them.</p>
      <div className="consent-cat">
        <h3>Necessary</h3>
        <label className="switch"><input type="checkbox" checked disabled readOnly /><span className="switch__track" aria-hidden="true" />Always on</label>
        <p>Security, page navigation and remembering your cookie choice.</p>
      </div>
      {CATEGORIES.map((c) => (
        <div className="consent-cat" key={c.key}>
          <h3 id={c.id}>{c.title}</h3>
          <label className="switch">
            <input type="checkbox" name={c.key} aria-labelledby={c.id}
                   checked={prefs[c.key]} disabled={c.key === 'marketing' && gpc}
                   onChange={(e) => setPrefs((p) => ({ ...p, [c.key]: e.target.checked }))} />
            <span className="switch__track" aria-hidden="true" />On/Off
          </label>
          <p>{c.text}</p>
        </div>
      ))}
      <p className="consent-gpc" hidden={!gpc}>Your browser sends a Global Privacy Control signal, so marketing cookies stay off.</p>
      <div className="consent-modal-actions">
        <button className="btn btn--purple" type="button" data-consent="save" onClick={() => saveConsent(prefs)}>Save Preferences</button>
        <button className="btn btn--blue" type="button" data-consent="accept"
                onClick={() => saveConsent({ preferences: true, statistics: true, marketing: true })}>Accept All</button>
        <button className="btn btn--ghost" type="button" data-consent="reject" onClick={() => saveConsent({})}>Necessary Only</button>
      </div>
    </>
  );
}
