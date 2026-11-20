'use client';
/** FOOTER (shared across all pages): nav bar, socials, legal links row, copyright. */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialLinks from './SocialLinks';
import { ConsentButton } from './Triggers';
import { FOOTER_NAV, LEGAL_NAV, ext, samePath } from '@/lib/site';

export default function Footer() {
  const pathname = usePathname();
  const current = (href: string) => (samePath(href, pathname) ? 'page' : undefined);
  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <div className="container site-footer__inner">
          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {FOOTER_NAV.map((l) => (
                <li key={l.label}><Link href={l.href} aria-current={current(l.href)}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <SocialLinks />
        </div>
      </div>

      {/* Legal & compliance links */}
      <nav className="footer-legal" aria-label="Legal">
        <ul>
          {LEGAL_NAV.map((l) => (
            <li key={l.label}><Link href={l.href} aria-current={current(l.href)}>{l.label}</Link></li>
          ))}
          <li><ConsentButton>Manage Cookie Consent</ConsentButton></li>
        </ul>
      </nav>
      <p className="site-footer__copy">
        © <span data-year>{new Date().getFullYear()}</span> Balanced Ketamine – Ketamine Infusion Kansas City. All Rights Reserved. Powered By:{' '}
        <a href="https://www.kbizzsolutions.com/" {...ext}>K Business Solutions Inc.</a>
      </p>
    </footer>
  );
}
