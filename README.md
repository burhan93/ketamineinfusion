# Balanced Ketamine – Homepage

Static homepage (HTML, CSS, vanilla JS) for **Balanced Ketamine**, a ketamine infusion clinic in Overland Park, KS (Kansas City metro).
Layout cloned section by section from https://ketamineinfusionkansascity.com/ with rewritten copy.

## Structure

```
index.html              Homepage (header, 14 sections, footer, appointment popup, a11y tools)
assets/css/style.css    Design tokens, components, 9 responsive breakpoints
assets/js/main.js       Mobile nav, dropdowns, FAQ accordion, modal, form validation,
                        YouTube click-to-load, scroll reveal, accessibility toolbar
assets/images/          WebP images (from reference site) + favicons
robots.txt, sitemap.xml
```

Preview: open `index.html` in a browser. Nav links use root-relative slugs (`/about-us/` …) for inner pages that are not built yet, so they only resolve once deployed.

## Section order (matches reference)

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
14. Contact details + Google Map

## Images (all marked `<!-- IMAGE (reference asset) -->` in index.html)

All photos, icons, the logo and the award badge come from the current site and were converted to WebP.
Replace any of them by overwriting the file in `assets/images/` with the same name and dimensions.

| File | Used in |
|---|---|
| ketamine-logo.webp | Header logo |
| hero-ketamine-infusion(.webp / -960.webp) | Hero background, OG image |
| advance-care-image.webp | Financing banner |
| migraine-icon / depression-icon / headache-icon.webp | Feature strip icons |
| kansas-top-doctors-2023.webp | Award badge |
| balanced-ketamine-welcome-cover.webp | What is ketamine |
| ketamine-modern-treatment.webp | History |
| chronic-pain / depression / ptsd / bipolar-disorder / migraine / inflammatory-pain.webp | Condition cards |
| img-drRazaJafri.webp | Team |
| free-consultation-image.webp | Appointment section |
| depression-and-anxiety-cover.webp, risks-of-ketamine-infusions-cover.webp | CTA cards |
| ketamine-how-it-works.webp | What to expect |
| family-cta-bg(.webp / -960.webp) | Parallax background (CSS) |
| icon-02.webp | Contact calendar icon |

## Before launch (TODO)

- [ ] Replace placeholder domain `https://www.balancedketamine.com/` (canonical, OG/Twitter, JSON-LD, sitemap, robots).
- [ ] Confirm NAP, hours, prices, fax number and Dr. Raza Jafri's credentials/title (schema + team caption).
- [ ] Connect both forms (`form.js-validate`, `action="#"`) to the real form handler / CRM.
- [ ] Move PDFs (patient packet, referral form, "what is ketamine") to the new site and update links.
- [ ] Add inner pages to `sitemap.xml` as they are built.
