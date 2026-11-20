'use client';
/** Google Map that loads only after marketing-cookie consent. */
import { useSite } from './SiteProvider';
import { MAPS_EMBED, MAPS_URL, ext } from '@/lib/site';

const TITLE = 'Map to Balanced Ketamine, 6700 W 121st St, Overland Park, KS';

export default function ConsentMap() {
  const { consent, saveConsent } = useSite();
  const allowed = !!consent?.marketing;
  return (
    <div className={`map${allowed ? ' is-loaded' : ''}`}>
      <div className="map__placeholder">
        <p>The map is provided by Google and uses marketing cookies.</p>
        <p>
          <button className="btn btn--purple" type="button" data-consent="map"
                  onClick={() => saveConsent({
                    preferences: consent?.preferences ?? false,
                    statistics: consent?.statistics ?? false,
                    marketing: true,
                  })}>
            Accept &amp; Load Map
          </button>
        </p>
        <p><a href={MAPS_URL} {...ext}>Open directions in Google Maps</a></p>
      </div>
      {allowed && (
        <iframe title={TITLE} src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      )}
    </div>
  );
}
