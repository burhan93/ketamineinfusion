/**
 * Content of the compliance pages (HIPAA notice, accessibility, cookie policy, terms).
 * Rendered by <LegalPage>. Legal texts are templates – have them reviewed before launch.
 */
import type { ReactNode } from 'react';
import { ConsentButton, ConsentStatus } from '@/components/Triggers';

export type LegalSection = { id: string; title: string; body: ReactNode };
export type LegalPageData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: ReactNode;
  contactTitle: string;
  contact: ReactNode;
  sections: LegalSection[];
  /** Effective / last-updated date; defaults to LAST_UPDATED in lib/site.ts. */
  updated?: { iso: string; label: string };
};

export const LEGAL_PAGES = {
  "hipaa-notice": {
    slug: "hipaa-notice",
    name: "HIPAA Notice of Privacy Practices",
    title: "HIPAA Notice of Privacy Practices | Balanced Ketamine",
    description: "How Balanced Ketamine in Overland Park, KS uses and protects your health information under HIPAA, your privacy rights as a patient, and how to file a complaint.",
    kicker: "Patient Privacy",
    h1: "HIPAA Notice of Privacy Practices",
    lead: (
      <>
        This notice describes how medical information about you may be used and disclosed and how you can get access to this information. <strong>Please review it carefully.</strong> In short: Balanced Ketamine uses your protected health information (PHI) to treat you, get paid and run our clinic; we share it for other reasons only when the law allows or you authorize it in writing; and you have the right to see, copy and correct your records.
      </>
    ),
    contactTitle: "Questions or complaints about your privacy?",
    contact: (
      <>
        <p><strong>Balanced Ketamine – Privacy Officer</strong><br />
        6700 W 121st St, Ste 300 A1, Overland Park, KS 66209<br />
        Phone: <a href="tel:+19138719888">(913) 871-9888</a> · Fax: (913) 871-1477<br />
        Office hours: Monday–Friday, 8:00am–4:30pm</p>
      </>
    ),
    sections: [
      {
        id: "who",
        title: "Who follows this notice?",
        body: (
          <>
            <p>This notice applies to Balanced Ketamine, a ketamine infusion clinic located at 6700 W 121st St, Ste 300 A1, Overland Park, Kansas 66209, and to all of our physicians, nurses, staff, volunteers and business associates who handle your protected health information (PHI). PHI is information that identifies you and relates to your past, present or future physical or mental health, the care you receive, or payment for that care.</p>
            <p>We are required by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its Privacy, Security and Breach Notification Rules (45 CFR Parts 160 and 164) to:</p>
            <ul>
              <li>Keep your PHI private and secure;</li>
              <li>Give you this notice of our legal duties and privacy practices;</li>
              <li>Follow the terms of the notice currently in effect; and</li>
              <li>Notify you promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
            </ul>
          </>
        ),
      },
      {
        id: "tpo",
        title: "How do we use and share your health information?",
        body: (
          <>
            <div className="answer"><p>We most often use and share your PHI for three purposes – <strong>treatment, payment and health care operations</strong> – without needing your written authorization.</p></div>
            <h3>Treatment</h3>
            <p>We use your information to provide, coordinate and manage your care. For example, our physician reviews your medical history and current medications before an infusion, and we may share records with your primary care physician, psychiatrist, therapist or the provider who referred you.</p>
            <h3>Payment</h3>
            <p>We use and share information to bill and collect payment from you, your health plan or a third-party financing company you choose. For example, we may give your insurer information about a treatment to confirm coverage or obtain prior authorization.</p>
            <h3>Health care operations</h3>
            <p>We use information to run our clinic, improve the quality of care and train staff. For example, we may review records to evaluate the safety of our infusion protocols, or share information with accountants, IT vendors or legal advisers who sign a Business Associate Agreement promising to protect it.</p>
            <h3>Appointment reminders and treatment information</h3>
            <p>We may contact you by phone, text, email or mail to remind you of appointments or to share information about treatment options or health-related services that may interest you. You can ask us to use a different method or address at any time.</p>
          </>
        ),
      },
      {
        id: "other-uses",
        title: "When can we share information without your authorization?",
        body: (
          <>
            <p>The law allows or requires us to share your PHI in the following situations, subject to specific conditions:</p>
            <ul>
              <li><strong>As required by law</strong> – when federal, state or local law requires it.</li>
              <li><strong>Public health and safety</strong> – to report disease, injury, adverse reactions to medications, or suspected abuse, neglect or domestic violence, and to prevent or reduce a serious threat to anyone’s health or safety.</li>
              <li><strong>Health oversight</strong> – to agencies for audits, investigations, inspections and licensure.</li>
              <li><strong>Lawsuits and legal actions</strong> – in response to a court or administrative order, or to a subpoena when legal requirements are met.</li>
              <li><strong>Law enforcement</strong> – for limited purposes, such as identifying a suspect or responding to a valid warrant.</li>
              <li><strong>Coroners, medical examiners and funeral directors</strong> – as needed to carry out their duties.</li>
              <li><strong>Organ and tissue donation</strong> – to organizations that handle donation and transplantation.</li>
              <li><strong>Research</strong> – when an institutional review board or privacy board has approved the use under HIPAA rules.</li>
              <li><strong>Specialized government functions</strong> – for military, national security and protective services, as authorized by law.</li>
              <li><strong>Workers’ compensation</strong> – for claims, as permitted by state law.</li>
              <li><strong>Family and friends involved in your care</strong> – unless you object, we may share information relevant to their involvement, such as with the driver who takes you home after an infusion. In an emergency, we use professional judgment.</li>
              <li><strong>Business associates</strong> – with vendors who perform services for us and are contractually bound to protect your information.</li>
            </ul>
          </>
        ),
      },
      {
        id: "authorization",
        title: "When do we need your written permission?",
        body: (
          <>
            <p>We will not use or share your PHI for the following purposes unless you give us written authorization:</p>
            <ul>
              <li>Most uses and disclosures of <strong>psychotherapy notes</strong>;</li>
              <li><strong>Marketing</strong> purposes, including the use of patient testimonials, photos or videos;</li>
              <li><strong>Sale</strong> of your PHI (we do not sell PHI); and</li>
              <li>Any other use or disclosure not described in this notice.</li>
            </ul>
            <p>You may revoke an authorization at any time by writing to our Privacy Officer. Revocation does not affect information already shared while the authorization was in effect.</p>
            <p>Some types of information, such as substance use disorder treatment records from federally assisted programs (42 CFR Part 2), HIV/AIDS test results and certain mental health information, may have extra protection under federal, Kansas or Missouri law. When those laws are stricter than HIPAA, we follow them.</p>
          </>
        ),
      },
      {
        id: "rights",
        title: "What are your rights over your health information?",
        body: (
          <>
            <div className="answer"><p>You have the right to see and get copies of your records, ask us to correct them, limit what we share, choose how we contact you, get a list of certain disclosures, and get a paper copy of this notice.</p></div>
            <div className="table-wrap"><table>
              <thead><tr><th scope="col">Your right</th><th scope="col">What it means and how to use it</th></tr></thead>
              <tbody>
                <tr><td>Access and copies</td><td>Ask to see or get an electronic or paper copy of your medical and billing records. We respond within 30 days and may charge a reasonable, cost-based fee.</td></tr>
                <tr><td>Amendment</td><td>Ask us in writing to correct information you believe is incorrect or incomplete. We may say “no” but will explain why in writing within 60 days.</td></tr>
                <tr><td>Confidential communications</td><td>Ask us to contact you in a specific way (for example, a mobile phone only) or at a different address. We will agree to all reasonable requests.</td></tr>
                <tr><td>Restrictions</td><td>Ask us not to use or share certain information for treatment, payment or operations. We are not required to agree, except that if you pay for a service in full out of pocket, you may ask us not to share it with your health insurer, and we will agree unless the law requires it.</td></tr>
                <tr><td>Accounting of disclosures</td><td>Ask for a list of the times we shared your information in the six years before your request, other than for treatment, payment, operations and certain other exceptions. One list per year is free.</td></tr>
                <tr><td>Paper copy of this notice</td><td>Request a paper copy at any time, even if you agreed to receive it electronically.</td></tr>
                <tr><td>Personal representative</td><td>If someone has medical power of attorney or is your legal guardian, that person can exercise your rights. We will confirm their authority first.</td></tr>
                <tr><td>Breach notification</td><td>Be notified if a breach of your unsecured PHI occurs.</td></tr>
              </tbody>
            </table></div>
            <p>To exercise any of these rights, contact our Privacy Officer using the details at the bottom of this page.</p>
          </>
        ),
      },
      {
        id: "website",
        title: "Is the website contact form secure for health information?",
        body: (
          <>
            <p>No. The appointment request forms on this website are intended for contact details only. Please <strong>do not</strong> include diagnoses, medications or other health information in a web form or email. Submitting a request does not create a physician–patient relationship. Our team will call you to collect medical information through secure channels. For details about cookies and online tracking, see our <a href="/cookie-policy/">Cookie Policy</a>.</p>
          </>
        ),
      },
      {
        id: "complaints",
        title: "How do you file a privacy complaint?",
        body: (
          <>
            <p>If you believe your privacy rights have been violated, you can file a complaint with us or with the U.S. Department of Health and Human Services. <strong>We will not retaliate against you for filing a complaint.</strong></p>
            <ol>
              <li><strong>With Balanced Ketamine:</strong> contact our Privacy Officer by phone at (913) 871-9888 or in writing at 6700 W 121st St, Ste 300 A1, Overland Park, KS 66209.</li>
              <li><strong>With the Office for Civil Rights:</strong> write to the U.S. Department of Health and Human Services, 200 Independence Avenue S.W., Washington, D.C. 20201, call 1-877-696-6775, or visit <a href="https://www.hhs.gov/ocr/complaints/" target="_blank" rel="noopener">hhs.gov/ocr/complaints</a>.</li>
            </ol>
          </>
        ),
      },
      {
        id: "changes",
        title: "Can this notice change?",
        body: (
          <>
            <p>We can change the terms of this notice, and the changes will apply to all information we hold about you. The current notice is always available in our office and on this page, and the effective date appears at the top.</p>
            <p><strong>Effective date:</strong> November 20, 2026.</p>
          </>
        ),
      },
    ],
  },
  "accessibility": {
    slug: "accessibility",
    name: "Accessibility Statement",
    title: "Accessibility Statement | Balanced Ketamine Kansas City",
    description: "Balanced Ketamine is committed to an accessible website and clinic for every patient. Read our WCAG 2.2 AA goals, site features and how to request help.",
    kicker: "Accessibility",
    h1: "Accessibility Statement",
    lead: (
      <>
        Balanced Ketamine wants every patient to be able to learn about ketamine infusion therapy and request care, whatever their ability. Our goal is for this website to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong>. If anything on the site is hard to use, call <a href="tel:+19138719888">(913) 871-9888</a> and we will help you directly.
      </>
    ),
    contactTitle: "Need help or found a barrier?",
    contact: (
      <>
        <p>Tell us the page address and the problem you experienced, and we will respond as soon as possible.</p>
        <p><strong>Balanced Ketamine – Accessibility Coordinator</strong><br />
        6700 W 121st St, Ste 300 A1, Overland Park, KS 66209<br />
        Phone: <a href="tel:+19138719888">(913) 871-9888</a><br />
        Office hours: Monday–Friday, 8:00am–4:30pm</p>
      </>
    ),
    sections: [
      {
        id: "commitment",
        title: "What is our accessibility commitment?",
        body: (
          <>
            <div className="answer"><p>We aim to conform to WCAG 2.2 Level AA, the standard referenced by the Americans with Disabilities Act (ADA) guidance and Section 1557 of the Affordable Care Act. We test new pages before publishing and review the site regularly.</p></div>
            <p>Accessibility is an ongoing effort. As we add pages, videos and documents, we check them against the same standard and fix problems we find.</p>
          </>
        ),
      },
      {
        id: "features",
        title: "Which accessibility features does this website include?",
        body: (
          <>
            <ul>
              <li><strong>Keyboard navigation</strong> – every menu, button, form, accordion and popup works with a keyboard, with a visible focus outline.</li>
              <li><strong>Skip link</strong> – a “Skip to main content” link appears as the first item when you press Tab.</li>
              <li><strong>Accessibility tools</strong> – the purple button at the edge of the screen lets you enlarge or reduce text, switch to grayscale, high or negative contrast, use a light background, underline links or switch to a more readable font. Your choices are remembered on your device.</li>
              <li><strong>Screen reader support</strong> – semantic headings, landmarks, descriptive link text, form labels, ARIA attributes and alternative text for meaningful images.</li>
              <li><strong>Readable design</strong> – text colors chosen for contrast, resizable text up to 200% without loss of content, and layouts that adapt to phones, tablets and zoomed screens.</li>
              <li><strong>Reduced motion</strong> – animations are turned off if your device is set to reduce motion.</li>
              <li><strong>Touch-friendly controls</strong> – buttons and links sized for easy tapping on mobile devices.</li>
            </ul>
          </>
        ),
      },
      {
        id: "limitations",
        title: "Are there known limitations?",
        body: (
          <>
            <p>Despite our efforts, some content may not yet be fully accessible:</p>
            <div className="table-wrap"><table>
              <thead><tr><th scope="col">Content</th><th scope="col">Limitation</th><th scope="col">Alternative</th></tr></thead>
              <tbody>
                <tr><td>Embedded YouTube videos</td><td>Captions are generated by YouTube and may contain errors.</td><td>Call us for a summary or transcript of any video.</td></tr>
                <tr><td>Google Maps embed</td><td>Third-party map controls may be hard to use with assistive technology.</td><td>Our full address and a text link to directions are listed beside the map.</td></tr>
                <tr><td>PDF forms (patient packet, referral form)</td><td>Older PDFs may not be fully tagged for screen readers.</td><td>We can complete forms with you by phone or provide another format.</td></tr>
                <tr><td>Third-party financing websites</td><td>We do not control the accessibility of partner sites.</td><td>Our staff can explain financing options by phone.</td></tr>
              </tbody>
            </table></div>
          </>
        ),
      },
      {
        id: "clinic",
        title: "Is the clinic itself accessible?",
        body: (
          <>
            <p>Our Overland Park clinic is designed to welcome patients with disabilities. Please tell us when you book if you need any of the following and we will arrange it at no cost to you:{/* TODO: confirm physical-access details with the clinic */}</p>
            <ul>
              <li>Help with building access, mobility needs or seating in the infusion suite;</li>
              <li>A qualified sign language interpreter or other auxiliary aids;</li>
              <li>Written materials in large print or another accessible format;</li>
              <li>Language assistance services for patients with limited English proficiency;</li>
              <li>Accommodation for a service animal.</li>
            </ul>
          </>
        ),
      },
      {
        id: "nondiscrimination",
        title: "Does Balanced Ketamine discriminate on any basis?",
        body: (
          <>
            <p>No. Balanced Ketamine complies with applicable federal civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability or sex (including sexual orientation and gender identity). We do not exclude people or treat them differently because of these characteristics.</p>
            <p>If you believe we have failed to provide these services or discriminated in another way, you can contact us using the details below, or file a civil rights complaint with the U.S. Department of Health and Human Services Office for Civil Rights at <a href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf" target="_blank" rel="noopener">ocrportal.hhs.gov</a> or 1-800-368-1019 (TDD 1-800-537-7697).</p>
          </>
        ),
      },
      {
        id: "feedback",
        title: "How do I report an accessibility problem?",
        body: (
          <>
            <ol>
              <li>Note the web page address (URL) and what you were trying to do.</li>
              <li>Describe the problem and the assistive technology or browser you were using, if any.</li>
              <li>Call <a href="tel:+19138719888">(913) 871-9888</a> or write to us at the address below.</li>
            </ol>
            <p>This statement was last reviewed on November 20, 2026.</p>
          </>
        ),
      },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    name: "Cookie Policy (US)",
    title: "Cookie Policy (US) | Balanced Ketamine Kansas City",
    description: "See which cookies and tracking tools the Balanced Ketamine website uses, why we use them, how consent works, and how to change your cookie choices at any time.",
    kicker: "Privacy & Cookies",
    h1: "Cookie Policy (US)",
    lead: (
      <>
        This Cookie Policy explains how Balanced Ketamine (“we”, “us”) uses cookies and similar technologies on this website. In short: necessary cookies are always on; <strong>statistics and marketing cookies are only used if you agree</strong>, and you can change your choice at any time. We do not sell your personal information, and we never use cookies to collect health information.
      </>
    ),
    contactTitle: "Questions about cookies or your data?",
    contact: (
      <>
        <p><strong>Balanced Ketamine – Privacy Officer</strong><br />
        6700 W 121st St, Ste 300 A1, Overland Park, KS 66209<br />
        Phone: <a href="tel:+19138719888">(913) 871-9888</a> · Fax: (913) 871-1477<br />
        Office hours: Monday–Friday, 8:00am–4:30pm</p>
      </>
    ),
    sections: [
      {
        id: "what",
        title: "What are cookies?",
        body: (
          <>
            <div className="answer"><p>Cookies are small text files a website stores in your browser. Similar technologies include local storage, pixels and scripts. They help a site work, remember your settings and, with your permission, measure visits or show embedded content.</p></div>
          </>
        ),
      },
      {
        id: "manage",
        title: "How can I change my cookie choices?",
        body: (
          <>
            <p>When you first visit, a banner lets you <strong>Accept All</strong>, choose <strong>Necessary Only</strong>, or set <strong>Preferences</strong> by category. You can change your choice at any time:</p>
            <p><ConsentButton className="btn btn--purple">Manage Cookie Consent</ConsentButton></p>
            <ConsentStatus />
            <p>You can also block or delete cookies in your browser settings. Blocking necessary cookies may stop parts of the site from working.</p>
          </>
        ),
      },
      {
        id: "categories",
        title: "Which categories of cookies do we use?",
        body: (
          <>
            <div className="table-wrap"><table>
              <thead><tr><th scope="col">Category</th><th scope="col">Purpose</th><th scope="col">Consent needed?</th></tr></thead>
              <tbody>
                <tr><td>Necessary</td><td>Make the site work securely and remember your cookie choice.</td><td>No – always on</td></tr>
                <tr><td>Preferences</td><td>Remember settings you choose, such as display options.</td><td>Yes</td></tr>
                <tr><td>Statistics</td><td>Count visits and see how pages are used so we can improve the site. Data is aggregated.</td><td>Yes</td></tr>
                <tr><td>Marketing</td><td>Embedded third-party content (Google Maps) and advertising measurement (Meta). These providers may track you across websites.</td><td>Yes</td></tr>
              </tbody>
            </table></div>
          </>
        ),
      },
      {
        id: "list",
        title: "Which specific cookies and storage items are used?",
        body: (
          <>
            <p>The list below reflects the tools this website may use. Third-party cookies are set only after you consent to the matching category.</p>
            <div className="table-wrap"><table>
              <thead><tr><th scope="col">Name</th><th scope="col">Provider</th><th scope="col">Category</th><th scope="col">Purpose</th><th scope="col">Expiry</th></tr></thead>
              <tbody>
                <tr><td>bk-consent</td><td>Balanced Ketamine (local storage)</td><td>Necessary</td><td>Stores your cookie choice.</td><td>Until cleared</td></tr>
                <tr><td>bk-a11y</td><td>Balanced Ketamine (local storage)</td><td>Necessary</td><td>Remembers accessibility tool settings you selected.</td><td>Until cleared</td></tr>
                <tr><td>_ga, _ga_*</td><td>Google Analytics (via Google Tag Manager)</td><td>Statistics</td><td>Distinguishes visitors and sessions for aggregated statistics.</td><td>Up to 2 years</td></tr>
                <tr><td>_fbp, fr</td><td>Meta Platforms (Meta Pixel)</td><td>Marketing</td><td>Measures the effectiveness of advertising.</td><td>Up to 3 months</td></tr>
                <tr><td>NID, AEC and related</td><td>Google (Google Maps embed)</td><td>Marketing</td><td>Delivers the interactive map and remembers map preferences.</td><td>Up to 6 months</td></tr>
                <tr><td>VISITOR_INFO1_LIVE, YSC</td><td>YouTube (only after you press play)</td><td>Marketing</td><td>Plays embedded videos. We use YouTube’s privacy-enhanced mode, and no video loads until you click it.</td><td>Session – 6 months</td></tr>
              </tbody>
            </table></div>
          </>
        ),
      },
      {
        id: "health",
        title: "Do cookies collect my health information?",
        body: (
          <>
            <p>No. We do not use cookies, pixels or analytics to collect information about your health, symptoms, treatments or appointments, and we do not place tracking technologies on patient-only areas. Please do not enter health information in website forms. How we protect medical information is explained in our <a href="/hipaa-notice/">HIPAA Notice of Privacy Practices</a>.</p>
          </>
        ),
      },
      {
        id: "gpc",
        title: "Do you honor Global Privacy Control and “Do Not Sell or Share” requests?",
        body: (
          <>
            <p>Yes. We do not sell personal information. If your browser sends a <strong>Global Privacy Control (GPC)</strong> signal, we treat it as a request to opt out of the sale or sharing of personal information and of targeted advertising, and marketing cookies stay switched off. Residents of states with consumer privacy laws (such as California, Colorado, Connecticut, Virginia and others) may also contact us to exercise rights to access, delete or correct personal information, or to opt out. We will not discriminate against you for exercising these rights.</p>
          </>
        ),
      },
      {
        id: "third-parties",
        title: "How do third parties use cookies?",
        body: (
          <>
            <p>Google, Meta and YouTube process data under their own privacy policies. You can learn more and set preferences with each provider:</p>
            <ul>
              <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google cookie policy</a> and <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out</a></li>
              <li><a href="https://www.facebook.com/privacy/policies/cookies/" target="_blank" rel="noopener">Meta cookie policy</a></li>
              <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener">Digital Advertising Alliance opt-out</a></li>
            </ul>
          </>
        ),
      },
      {
        id: "updates",
        title: "When was this policy last updated?",
        body: (
          <>
            <p>We review this Cookie Policy whenever we add or remove tracking tools. It was last updated on November 20, 2026.</p>
          </>
        ),
      },
    ],
  },
  "terms-of-use": {
    slug: "terms-of-use",
    name: "Terms of Use",
    title: "Website Terms of Use | Balanced Ketamine Kansas City",
    description: "Read the terms that govern use of the Balanced Ketamine website, including medical disclaimers, appointment requests, content ownership and liability limits.",
    kicker: "Legal",
    h1: "Website Terms of Use",
    lead: (
      <>
        These Terms of Use govern your use of the Balanced Ketamine website. By using the site you agree to them. Most importantly: <strong>the content on this site is general information, not medical advice</strong>; requesting an appointment online does not make you a patient; and if you are in crisis, call <a href="tel:911">911</a> or the Suicide &amp; Crisis Lifeline at <a href="tel:988">988</a>.
      </>
    ),
    contactTitle: "Questions about these terms?",
    contact: (
      <>
        <p><strong>Balanced Ketamine</strong><br />
        6700 W 121st St, Ste 300 A1, Overland Park, KS 66209<br />
        Phone: <a href="tel:+19138719888">(913) 871-9888</a><br />
        Office hours: Monday–Friday, 8:00am–4:30pm</p>
      </>
    ),
    sections: [
      {
        id: "acceptance",
        title: "Who do these terms apply to?",
        body: (
          <>
            <p>These terms apply to everyone who visits or uses this website, operated by Balanced Ketamine, a ketamine infusion clinic in Overland Park, Kansas. If you do not agree with these terms, please do not use the site. Your use of the site is also governed by our <a href="/privacy-policy/">Privacy Policy</a>, <a href="/hipaa-notice/">HIPAA Notice of Privacy Practices</a> and <a href="/cookie-policy/">Cookie Policy</a>.</p>
          </>
        ),
      },
      {
        id: "emergency",
        title: "What should I do in a medical or mental health emergency?",
        body: (
          <>
            <div className="answer"><p>Do not use this website or our contact forms for emergencies. Call <a href="tel:911">911</a>, go to the nearest emergency room, or call or text <a href="tel:988">988</a> to reach the Suicide &amp; Crisis Lifeline, available 24 hours a day.</p></div>
          </>
        ),
      },
      {
        id: "medical",
        title: "Is the information on this website medical advice?",
        body: (
          <>
            <p>No. Content on this site – including articles, videos, FAQs and descriptions of ketamine infusion therapy – is provided for general educational purposes only. It is not a substitute for professional diagnosis or treatment. Always ask your physician or another qualified health provider about a medical condition or treatment.</p>
            <p>Ketamine is FDA-approved as an anesthetic. Its use at lower doses for depression, anxiety, PTSD, chronic pain and similar conditions is considered “off-label”. Treatment decisions are made only after an in-person evaluation by our medical team. Individual results vary, and patient testimonials describe personal experiences that are not a guarantee of outcomes.</p>
          </>
        ),
      },
      {
        id: "appointments",
        title: "Does an online appointment request make me a patient?",
        body: (
          <>
            <p>No. Submitting a form, sending an email or calling us does not create a physician–patient relationship. That relationship begins only after you complete our intake process and are accepted for care. Please do not send protected health information through website forms; our team will collect it securely.</p>
            <p>Prices shown on the website (for example, per-infusion and treatment-series ranges) are estimates and may change. Your final cost depends on your treatment plan and insurance, and will be confirmed before treatment.</p>
          </>
        ),
      },
      {
        id: "use",
        title: "What are the rules for using this website?",
        body: (
          <>
            <p>You agree to use the site lawfully and not to:</p>
            <ul>
              <li>Submit false information or impersonate another person;</li>
              <li>Attempt to gain unauthorized access to the site, its servers or any connected systems;</li>
              <li>Introduce viruses, malware or other harmful code;</li>
              <li>Scrape, copy or harvest content or personal information by automated means;</li>
              <li>Use the site in a way that could damage, disable or overburden it.</li>
            </ul>
          </>
        ),
      },
      {
        id: "ip",
        title: "Who owns the content on this website?",
        body: (
          <>
            <p>All text, logos, graphics, photographs, videos and other content on this site are owned by or licensed to Balanced Ketamine and are protected by U.S. copyright and trademark laws. You may view and print pages for personal, non-commercial use. Any other use requires our prior written permission.</p>
          </>
        ),
      },
      {
        id: "links",
        title: "Are you responsible for third-party websites?",
        body: (
          <>
            <p>The site links to third-party websites and services, including financing providers (such as Advance Care and CareCredit), YouTube, Google Maps, Facebook and newsletter tools. We do not control and are not responsible for their content, policies or practices. Use of those services is governed by their own terms.</p>
          </>
        ),
      },
      {
        id: "disclaimer",
        title: "What warranties and limits of liability apply?",
        body: (
          <>
            <p>The site is provided “as is” and “as available”. To the fullest extent permitted by law, Balanced Ketamine disclaims all warranties, express or implied, including warranties of accuracy, merchantability and fitness for a particular purpose. We do not guarantee that the site will be uninterrupted or error-free.</p>
            <p>To the fullest extent permitted by law, Balanced Ketamine and its physicians, staff and partners will not be liable for any indirect, incidental, special or consequential damages arising from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited under applicable law.</p>
            <p>You agree to indemnify and hold harmless Balanced Ketamine from claims arising from your misuse of the site or violation of these terms.</p>
          </>
        ),
      },
      {
        id: "law",
        title: "Which law governs these terms?",
        body: (
          <>
            <p>These terms are governed by the laws of the State of Kansas, without regard to conflict-of-law rules. Any dispute will be resolved in the state or federal courts located in Johnson County, Kansas, and you consent to their jurisdiction.</p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Can these terms change?",
        body: (
          <>
            <p>We may update these terms at any time by posting a new version on this page. Continued use of the site after changes means you accept the updated terms. These terms are effective as of November 20, 2026.</p>
          </>
        ),
      },
    ],
  },
} satisfies Record<string, LegalPageData>;
