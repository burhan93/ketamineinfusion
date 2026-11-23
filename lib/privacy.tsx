/**
 * Website Privacy Policy content – rendered by <LegalPage> at /privacy-policy/.
 * Covers personal information collected through the website and general communications.
 * Protected health information is covered separately by the HIPAA Notice of Privacy Practices.
 * Template text – have it reviewed by your attorney / compliance officer before launch.
 */
import Link from 'next/link';
import type { LegalPageData } from './legal';
import { ConsentButton } from '@/components/Triggers';
import { EMAIL, FAX_DISPLAY, PHONE_DISPLAY, PHONE_TEL } from './site';

export const PRIVACY_PAGE: LegalPageData = {
  slug: 'privacy-policy',
  name: 'Privacy Policy',
  title: 'Website Privacy Policy | Balanced Ketamine Kansas City',
  description: 'How Balanced Ketamine collects, uses and protects personal information on this website, who we share it with, and the privacy choices and rights you have.',
  kicker: 'Your Privacy',
  h1: 'Privacy Policy',
  updated: { iso: '2026-11-23', label: 'November 23, 2026' },
  lead: (
    <>
      This Privacy Policy explains how Balanced Ketamine (“we”, “us”) handles personal information collected through this
      website and our general communications. In short: <strong>we collect only what we need to respond to you and run the
      site, we never sell your personal information</strong>, analytics and advertising tools run only with your consent,
      and your medical information is protected under our <Link href="/hipaa-notice/">HIPAA Notice of Privacy Practices</Link>.
    </>
  ),
  contactTitle: 'Questions about your privacy?',
  contact: (
    <p>
      <strong>Balanced Ketamine – Privacy Officer</strong><br />
      6700 W 121st St, Ste 300 A1, Overland Park, KS 66209<br />
      Phone: <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> · Fax: {FAX_DISPLAY}<br />
      Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
      Office hours: Monday–Friday, 8:00am–4:30pm
    </p>
  ),
  sections: [
    {
      id: 'scope',
      title: 'What does this Privacy Policy cover?',
      body: (
        <>
          <p>This policy applies to personal information we collect when you visit this website, submit an appointment request, sign up for our newsletter, follow us on social media or contact us by phone, text or email about general enquiries.</p>
          <div className="answer"><p>Once you become a patient, your <strong>protected health information</strong> (medical records, treatment and billing details) is governed by our <Link href="/hipaa-notice/">HIPAA Notice of Privacy Practices</Link>. Where that notice and this policy differ, the HIPAA notice applies to your health information.</p></div>
          <p>Our use of cookies and similar technologies is described in more detail in our <Link href="/cookie-policy/">Cookie Policy</Link>. Use of this website is also subject to our <Link href="/terms-of-use/">Terms of Use</Link>.</p>
        </>
      ),
    },
    {
      id: 'collect',
      title: 'What information do we collect?',
      body: (
        <>
          <div className="table-wrap"><table>
            <thead><tr><th scope="col">Type</th><th scope="col">Examples</th><th scope="col">How we get it</th></tr></thead>
            <tbody>
              <tr><td>Contact details</td><td>Name, phone number, email address</td><td>Appointment request forms, phone calls and emails you send us</td></tr>
              <tr><td>Request details</td><td>Your message, how you heard about us, your contact consent and the date you gave it</td><td>Appointment request forms</td></tr>
              <tr><td>Newsletter details</td><td>Email address and subscription preferences</td><td>Newsletter sign-up (handled by our email provider)</td></tr>
              <tr><td>Device and usage data</td><td>IP address, browser and device type, pages viewed, referring website, approximate location</td><td>Automatically through server logs and, with your consent, analytics tools</td></tr>
              <tr><td>Cookie and consent choices</td><td>Your cookie preferences and accessibility settings</td><td>Stored in your browser (see our <Link href="/cookie-policy/">Cookie Policy</Link>)</td></tr>
              <tr><td>Information from others</td><td>Referral details from your physician or provider</td><td>Sent to us directly by your healthcare provider</td></tr>
            </tbody>
          </table></div>
          <p>Please <strong>do not</strong> send diagnoses, medications or other health information through website forms or ordinary email. Our team will collect medical information securely when we speak with you.</p>
        </>
      ),
    },
    {
      id: 'use',
      title: 'How do we use your information?',
      body: (
        <ul>
          <li>To respond to appointment requests and questions, and to schedule consultations;</li>
          <li>To contact you by phone, text message or email about your request, as you agreed when submitting the form;</li>
          <li>To send newsletters or updates you have signed up for (you can unsubscribe at any time);</li>
          <li>To operate, secure and improve this website, and to understand which pages are helpful;</li>
          <li>To measure the effectiveness of our advertising, only if you have accepted marketing cookies;</li>
          <li>To comply with legal obligations and protect the rights, safety and property of our patients, staff and clinic.</li>
        </ul>
      ),
    },
    {
      id: 'share',
      title: 'Do we sell or share your personal information?',
      body: (
        <>
          <div className="answer"><p><strong>We do not sell your personal information</strong>, and we do not share it with third parties for their own marketing.</p></div>
          <p>We share information only with service providers that help us run the website and our practice, and only as needed for that service:</p>
          <ul>
            <li><strong>Website hosting and form handling</strong> – to deliver this site and the appointment requests you send;</li>
            <li><strong>Email newsletter provider</strong> – to send newsletters you subscribed to;</li>
            <li><strong>Analytics (Google)</strong> – aggregated visit statistics, only with your consent;</li>
            <li><strong>Advertising measurement (Meta)</strong> – only with your consent to marketing cookies;</li>
            <li><strong>Embedded content (Google Maps, YouTube)</strong> – loaded only when you allow it or press play.</li>
          </ul>
          <p>We may also disclose information when required by law, to respond to legal process, to protect against fraud or harm, or as part of a merger or transfer of our practice, in which case this policy will continue to apply to your information.</p>
          <p>If you apply for financing through a partner such as Advance Care or CareCredit, you do so on their website and under their own privacy policies.</p>
        </>
      ),
    },
    {
      id: 'health',
      title: 'How is my health information protected?',
      body: (
        <p>Health information you share as a patient is protected health information under the Health Insurance Portability and Accountability Act (HIPAA). We use and disclose it only as described in our <Link href="/hipaa-notice/">HIPAA Notice of Privacy Practices</Link>, which also explains your rights to access, amend and restrict it. We do not use website cookies, pixels or analytics to collect information about your health, symptoms or treatment.</p>
      ),
    },
    {
      id: 'communications',
      title: 'How do I stop texts, emails or calls?',
      body: (
        <ul>
          <li><strong>Text messages:</strong> reply STOP to any message. Reply HELP for help. Message and data rates may apply.</li>
          <li><strong>Emails and newsletters:</strong> use the unsubscribe link at the bottom of any email.</li>
          <li><strong>Phone calls:</strong> tell our team, or call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> and ask to be removed from non-essential calls.</li>
        </ul>
      ),
    },
    {
      id: 'rights',
      title: 'What privacy choices and rights do I have?',
      body: (
        <>
          <p>Depending on where you live, you may have the right to:</p>
          <ul>
            <li>Know what personal information we hold about you and receive a copy;</li>
            <li>Correct inaccurate information;</li>
            <li>Ask us to delete information, subject to legal and medical record-keeping requirements;</li>
            <li>Opt out of targeted advertising and of any “sale” or “sharing” of personal information as defined by state law;</li>
            <li>Not be treated differently for exercising these rights.</li>
          </ul>
          <p>To make a request, contact our Privacy Officer using the details below. We will verify your identity before acting on it and respond within the time required by applicable law. You may also use an authorized agent.</p>
          <p>You can change cookie choices at any time, and we honor <strong>Global Privacy Control</strong> browser signals as an opt-out of targeted advertising:</p>
          <p><ConsentButton className="btn btn--purple">Manage Cookie Consent</ConsentButton></p>
        </>
      ),
    },
    {
      id: 'retention',
      title: 'How long do we keep information?',
      body: (
        <p>We keep website enquiries and contact details only as long as needed to respond to you, provide services and meet legal, accounting and record-keeping requirements. Medical records are kept for the periods required by Kansas and federal law. When information is no longer needed, we delete or de-identify it.</p>
      ),
    },
    {
      id: 'security',
      title: 'How do we keep information secure?',
      body: (
        <p>We use reasonable administrative, technical and physical safeguards designed to protect personal information, and we require our service providers to do the same. No website or internet transmission is completely secure, which is one reason we ask you not to send health information through web forms or ordinary email.</p>
      ),
    },
    {
      id: 'children',
      title: 'Does this website collect information from children?',
      body: (
        <p>This website is intended for adults. We do not knowingly collect personal information online from children under 13. If you believe a child has sent us personal information, please contact us and we will delete it.</p>
      ),
    },
    {
      id: 'links',
      title: 'What about links to other websites?',
      body: (
        <p>Our website links to other sites, such as social media, video platforms, newsletter tools and financing partners. We are not responsible for their privacy practices, so please review their policies before sharing information with them.</p>
      ),
    },
    {
      id: 'changes',
      title: 'Can this policy change?',
      body: (
        <p>We may update this Privacy Policy when our practices or the law change. The effective date at the top of the page shows when it was last updated, and significant changes will be highlighted on this website.</p>
      ),
    },
  ],
};
