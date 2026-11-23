'use client';
/**
 * HEADER (shared across all pages) – port of the static header + main.js §1.
 * Desktop: info bar + purple nav bar with hover/focus dropdowns.
 * ≤1024px: logo + hours, sticky Book/Call bar and collapsible MENU.
 * All widths: the info row scrolls away and the nav bar (desktop) / Book-Call + MENU (mobile) stay pinned.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AppointmentLink } from './Triggers';
import SocialLinks from './SocialLinks';
import TreatmentsMenu from './TreatmentsMenu';
import { Calendar, Caret, ClockBadge, Mobile, PhoneBadge, PinBadge } from './Icons';
import { ADDRESS_LINE, HOURS, MAIN_NAV, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, ext, samePath, type NavChild } from '@/lib/site';

const MOBILE_MQ = '(max-width: 1024px)';

function SubLink({ item }: { item: NavChild }) {
  return item.external
    ? <a href={item.href} {...ext}>{item.label}</a>
    : <Link href={item.href}>{item.label}</Link>;
}

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [stuck, setStuck] = useState(false);   // nav bar pinned to the top (adds shadow)
  const headerTopRef = useRef<HTMLDivElement>(null);

  // Close menus on route change.
  useEffect(() => {
    setNavOpen(false);
    setOpenSub(null);
    // Drop focus from the clicked menu link so :focus-within doesn't keep a dropdown open.
    const el = document.activeElement as HTMLElement | null;
    if (el?.closest('.main-nav')) el.blur();
  }, [pathname]);

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.main-nav__item.has-sub')) setOpenSub(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenSub(null); };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  // Sticky mobile header: offset = info row height so Book/Call + MENU stay pinned.
  useEffect(() => {
    const set = () => {
      if (headerTopRef.current) {
        document.documentElement.style.setProperty('--header-top-offset', headerTopRef.current.offsetHeight + 'px');
      }
    };
    set();
    window.addEventListener('resize', set, { passive: true });
    window.addEventListener('load', set);
    document.fonts?.ready.then(set);
    return () => { window.removeEventListener('resize', set); window.removeEventListener('load', set); };
  }, []);

  // "Stuck" state once the info row has scrolled away and the nav bar is pinned.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const h = headerTopRef.current?.offsetHeight ?? 0;
      setStuck(window.scrollY > h);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header className={`site-header${stuck ? ' is-stuck' : ''}`}>
      <div className="header-top" ref={headerTopRef}>
        <div className="container container--wide header-top__inner">
          <Link className="site-logo" href="/" aria-label="Balanced Ketamine – home">
            {/* IMAGE (reference asset): brand logo – replace with SVG/WebP master if available */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ketamine-logo.webp" width={263} height={75} alt="Balanced Ketamine logo – Comfort and Healing for Those in Need" />
          </Link>

          <a className="header-info header-info--address" href={MAPS_URL} {...ext}>
            <PinBadge className="header-info__icon" />
            <span>{ADDRESS_LINE}</span>
          </a>

          <div className="header-info header-info--hours">
            <ClockBadge className="header-info__icon" />
            <span>{HOURS}</span>
          </div>

          <a className="header-info header-info--phone" href={PHONE_TEL}>
            <PhoneBadge className="header-info__icon" />
            <span>Call To Request An Appointment<br />{PHONE_DISPLAY}</span>
          </a>

          <SocialLinks />
        </div>
      </div>

      <div className="header-sticky">
        {/* Mobile-only quick actions (Book Now / Call Us) */}
        <div className="mobile-actions">
          <AppointmentLink><Calendar />Book Now</AppointmentLink>
          <a href={PHONE_TEL}><Mobile />Call Us</a>
        </div>

        <div className="nav-bar">
          <div className="container container--wide nav-bar__inner">
            <button className="nav-toggle" type="button" aria-expanded={navOpen} aria-controls="main-nav"
                    onClick={() => setNavOpen((o) => !o)}>
              Menu <span className="nav-toggle__bars" aria-hidden="true" />
            </button>

            <nav className={`main-nav${navOpen ? ' is-open' : ''}`} id="main-nav" aria-label="Main">
              <ul className="main-nav__list">
                {MAIN_NAV.map((item, i) => {
                  const isOpen = openSub === i;
                  const current = samePath(item.href, pathname) ? 'page' : undefined;
                  if (!item.children) {
                    return (
                      <li className="main-nav__item" key={item.label}>
                        {item.external
                          ? <a className="main-nav__link" href={item.href} {...ext}>{item.label}</a>
                          : <Link className="main-nav__link" href={item.href!} aria-current={current}>{item.label}</Link>}
                      </li>
                    );
                  }
                  const toggle = () => setOpenSub(isOpen ? null : i);
                  return (
                    <li className={`main-nav__item has-sub${item.mega ? ' main-nav__item--mega' : ''}${isOpen ? ' is-open' : ''}`} key={item.label}>
                      {item.href ? (
                        // Parent link: navigates on desktop; on mobile, first tap opens the submenu.
                        <Link className="main-nav__link" href={item.href} aria-current={current}
                              onClick={(e) => {
                                if (window.matchMedia(MOBILE_MQ).matches && !isOpen) { e.preventDefault(); toggle(); }
                              }}>
                          {item.label}
                        </Link>
                      ) : (
                        <button className="main-nav__link" type="button" aria-expanded={isOpen} onClick={toggle}
                                aria-controls={item.mega ? 'treatments-menu' : undefined}>
                          {item.label} <Caret />
                        </button>
                      )}
                      {item.mega ? (
                        <TreatmentsMenu id="treatments-menu" />
                      ) : (
                        <ul className="sub-menu">
                          {item.children.map((c) => <li key={c.label}><SubLink item={c} /></li>)}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <AppointmentLink className="nav-cta"><Calendar />Request An Appointment</AppointmentLink>
          </div>
        </div>
      </div>
    </header>
  );
}
