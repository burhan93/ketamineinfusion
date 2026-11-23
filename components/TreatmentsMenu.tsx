'use client';
/**
 * Treatments mega menu.
 * Desktop: service list (icon + title + summary) on the left; a preview panel on the right
 *          cross-fades to the hovered/focused service's photo, description and CTAs.
 *          Arrow keys / Home / End move through the list.
 * ≤1024px: compact list with icons + summaries inside the mobile menu (preview hidden).
 * Opening/closing is handled by the parent nav item (CSS :hover / :focus-within / .is-open).
 */
import Link from 'next/link';
import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { AppointmentLink } from './Triggers';
import { Mobile } from './Icons';
import { PHONE_DISPLAY, PHONE_TEL, TREATMENTS } from '@/lib/site';

/** Icon for items without a reference image (Results) – matches the blue condition icons. */
const ResultsIcon = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
    <path d="M6 40h36" stroke="#14b7f8" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 32l9-9 7 6 13-14" stroke="#14b7f8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M31 13h9v9" stroke="#14b7f8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TreatmentsMenu({ id }: { id: string }) {
  const [active, setActive] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const current = TREATMENTS[active];

  function onKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    const last = TREATMENTS.length - 1;
    const keys: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    linkRefs.current[keys[e.key]]?.focus();   // onFocus updates the preview
  }

  return (
    <div className="mega-menu" id={id}>
      <div className="mega-menu__main">
        <p className="mega-menu__kicker">Ketamine Infusion Treatments</p>
        <ul className="mega-menu__list" onKeyDown={onKeyDown}>
          {TREATMENTS.map((t, i) => (
            <li key={t.href} style={{ '--i': i } as CSSProperties}>
              <Link
                href={t.href}
                className={`mega-menu__link${i === active ? ' is-active' : ''}`}
                ref={(el) => { linkRefs.current[i] = el; }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="mega-menu__icon">
                  {t.icon ? (
                    // IMAGE (reference asset): condition icon
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.icon.src} width={t.icon.width} height={t.icon.height} alt="" loading="lazy" decoding="async" />
                  ) : <ResultsIcon />}
                </span>
                <span className="mega-menu__text">
                  <span className="mega-menu__title">{t.title}</span>
                  <span className="mega-menu__summary">{t.summary}</span>
                </span>
                <svg className="mega-menu__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mega-menu__help">
          <span className="mega-menu__help-icon" aria-hidden="true"><Mobile /></span>
          <span>
            Not sure which treatment is right for you?{' '}
            <a href={PHONE_TEL}>Call {PHONE_DISPLAY}</a> and our team will help you decide.
          </span>
        </p>
      </div>

      {/* Preview panel (desktop). Images are stacked and cross-faded so switching is instant. */}
      <div className="mega-menu__preview">
        <div className="mega-menu__media">
          {TREATMENTS.map((t, i) => (
            // IMAGE (reference asset): preview photo – replace with a service-specific photo if available
            // eslint-disable-next-line @next/next/no-img-element
            <img key={t.href} src={t.image.src} width={t.image.width} height={t.image.height}
                 alt={i === active ? t.image.alt : ''} aria-hidden={i !== active}
                 className={i === active ? 'is-active' : undefined} loading="lazy" decoding="async" />
          ))}
          {/* caption overlay */}
          <span className="mega-menu__badge" aria-hidden="true">Ketamine Infusion Therapy</span>
        </div>
        <div className="mega-menu__body" key={current.href}>
          <h3 className="mega-menu__heading">{current.title}</h3>
          <p>{current.description}</p>
          <div className="mega-menu__actions">
            <Link className="btn btn--purple btn--caps" href={current.href} tabIndex={-1}>Learn More</Link>
            <AppointmentLink className="btn btn--blue btn--caps">Request An Appointment</AppointmentLink>
          </div>
        </div>
      </div>
    </div>
  );
}
