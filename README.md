# Balanced Ketamine – Website (Next.js)

Website for **Balanced Ketamine**, a ketamine infusion clinic in Overland Park, KS (Kansas City metro).
Built with **Next.js 16 (App Router) + React 19 + TypeScript**, exported as a fully static site.
Layout cloned section by section from https://ketamineinfusionkansascity.com/ with rewritten copy.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out (upload anywhere: Vercel, Netlify, S3, cPanel…)
npm run start      # preview ./out locally
npm run typecheck
```

### Deploying to Vercel

`vercel.json` pins the Next.js preset, `npm ci` / `npm run build`, trailing-slash URLs,
security headers and image caching. Import the GitHub repo at vercel.com → it builds automatically
on every push to `main`. Node ≥ 20.9 is required (`engines` in `package.json`).

## Structure

```
app/
  layout.tsx             Root layout: font, header, footer, popups, consent, a11y tools
  globals.css            Design tokens + all styles (9 breakpoints) – unchanged from the static build
  page.tsx               Homepage (14 sections, metadata, JSON-LD)
  hipaa-notice/          /hipaa-notice/   HIPAA Notice of Privacy Practices
  accessibility/         /accessibility/  Accessibility Statement
  cookie-policy/         /cookie-policy/  Cookie Policy (US)
  terms-of-use/          /terms-of-use/   Website Terms of Use
  sitemap.ts, robots.ts  → /sitemap.xml, /robots.txt
components/
  Header, Footer, SocialLinks, Icons          shared chrome
  SiteProvider                                appointment popup + cookie-consent state
  Modal, AppointmentForm                      accessible popup, validated form
  ConsentBanner, ConsentPreferences, ConsentMap, Triggers (AppointmentLink, ConsentButton, ConsentStatus)
  FaqAccordion, YouTube, A11yTools, RevealObserver, LegalPage, JsonLd
  TreatmentsMenu                              Treatments mega menu (content: TREATMENTS in lib/site.ts)
lib/
  site.ts                NAP, URLs, navigation menus (single source of truth)
  schema.ts              Homepage MedicalClinic/Physician/WebSite JSON-LD
  faq.tsx                FAQ content → accordion AND FAQPage schema (always in sync)
  legal.tsx              Content of the four compliance pages
public/images/           WebP images (from the reference site) + favicons
```

Static markup is rendered on the server; only interactive parts are client components
(`'use client'`). Header and footer exist once and are shared by every page.

## Section order (homepage, matches reference)

1. Hero + appointment CTA
2. Pricing card + Advance Care financing + 3-feature strip
3. Welcome / What is ketamine infusion therapy / History
4. Conditions grid (6 cards)
5. How does it work + overview video
6. Meet our specialists (Dr. Raza Jafri + video)
7. Request an appointment form + clinic info
8. What to expect / Risks cards
9. Patient referral / Is ketamine right for me?
10. Parallax statement
11. Patient video reviews, what to expect, 5 steps to begin
12. FAQ accordion (FAQPage schema)
13. Get in touch
14. Contact details + consent-gated Google Map

## Compliance pages & cookie consent

- Legal pages are linked from the footer's legal row on every page (plus Privacy Policy and "Manage Cookie Consent").
- Each has visible breadcrumbs + BreadcrumbList/WebPage schema, a TL;DR summary, a table of contents and an effective date.
- **Cookie consent** (`components/SiteProvider.tsx`): banner on first visit (Accept All / Necessary Only / Preferences),
  choice stored in `localStorage` (`bk-consent`), Global Privacy Control honoured (marketing stays off).
  The Google Map only loads after marketing consent. Add Google Tag Manager / Meta Pixel in the marked effect in `SiteProvider`.
- The legal texts are templates written for this clinic – **have them reviewed by your attorney/compliance officer before launch.**

## Images

All photos, icons, the logo and the award badge come from the current site (WebP) and are marked
`{/* IMAGE (reference asset) */}` in the code. Replace a file in `public/images/` with the same name and dimensions.
Images use plain `<img>` with width/height, `srcset` and lazy loading exactly as in the original build
(the static export does not use the Next.js image optimizer).

## Before launch (TODO)

- [ ] Replace placeholder domain `https://www.balancedketamine.com` in `lib/site.ts` (canonical, OG, schema, sitemap, robots).
- [ ] Confirm NAP, hours, prices, fax number and Dr. Raza Jafri's credentials/title (`lib/schema.ts` + team caption).
- [ ] Connect `components/AppointmentForm.tsx` to the real form handler / CRM.
- [ ] Move PDFs (patient packet, referral form, "what is ketamine") into `public/` and update `lib/site.ts`.
- [ ] Build the inner pages linked from the navigation and add them to `app/sitemap.ts`.
- [ ] Legal review of HIPAA notice, accessibility statement, cookie policy and terms; confirm Privacy Officer contact and effective date.
- [ ] Confirm clinic physical-access details on the accessibility page (marked TODO).
- [ ] Keep the cookie table in `lib/legal.tsx` in sync with the trackers actually installed.
