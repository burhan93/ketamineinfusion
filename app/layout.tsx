/**
 * Root layout: shared <head> defaults, font, header, footer, popups,
 * cookie consent, accessibility tools and scroll-reveal for every page.
 */
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import A11yTools from '@/components/A11yTools';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import RevealObserver from '@/components/RevealObserver';
import ScrollProgress from '@/components/ScrollProgress';
import SiteProvider from '@/components/SiteProvider';
import { DOMAIN, SITE_NAME } from '@/lib/site';

// Self-hosted Montserrat (same weights as before) – exposed as --font-montserrat for globals.css.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),   // TODO: placeholder domain
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  icons: {
    icon: [{ url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: { siteName: SITE_NAME, locale: 'en_US' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#57008d',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={montserrat.variable}>
      <head>
        {/* Enables .js-only styles (scroll reveal) before first paint */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <ScrollProgress />
        <SiteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {/* Accessibility tools (equivalent of the reference's a11y widget) */}
          <A11yTools />
          <BackToTop />
          <RevealObserver />
        </SiteProvider>
      </body>
    </html>
  );
}
