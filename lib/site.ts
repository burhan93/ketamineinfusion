/**
 * Site-wide constants (NAP, URLs, navigation). Single source of truth for
 * header, footer, schema and pages.
 * TODO: replace the placeholder DOMAIN before launch.
 */
export const DOMAIN = 'https://www.balancedketamine.com';
export const SITE_NAME = 'Balanced Ketamine';
export const LAST_UPDATED = '2026-11-20';
export const LAST_UPDATED_LABEL = 'November 20, 2026';

export const PHONE_DISPLAY = '(913) 871-9888';
export const PHONE_TEL = 'tel:+19138719888';
export const FAX_DISPLAY = '(913) 871-1477';
// Published on the current site – TODO: update if the email domain changes with the new domain.
export const EMAIL = 'info@ketamineinfusionkansascity.com';
export const ADDRESS_LINE = '6700 W 121st St Ste 300 A1, Overland Park, KS 66209, United States';
export const HOURS = 'Monday-Friday 8:00am to 4:30pm';
export const MAPS_URL = 'https://www.google.com/maps/place/Balanced+Ketamine/@38.906004,-94.6672698,17z';
export const MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3104.7862087072594!2d-94.6672698!3d38.906004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0eb7cf7ab1cd5%3A0xf2c3f4e4af30cc7d!2sBalanced%20Ketamine!5e0!3m2!1sen!2s!4v1634108587150!5m2!1sen!2s';

export const FACEBOOK_URL = 'https://www.facebook.com/ketaminekansas';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCwnC_gvtQHK8G7uaF1FDCLQ/videos';
export const NEWSLETTER_URL =
  'https://ketamineinfusionkansascity.us22.list-manage.com/subscribe?u=0a1bbfcc859fb22338413c288&id=19660ab76c';

// PDFs still hosted on the current site – TODO: move to /public and update.
export const PDF_PATIENT_PACKET = 'https://www.ketamineinfusionkansascity.com/wp-content/uploads/New-Patient-Packet-2023.pdf';
export const PDF_REFERRAL = 'https://www.ketamineinfusionkansascity.com/wp-content/uploads/request-for-ketamine-infusion-treatment.pdf';
export const PDF_WHAT_IS_KETAMINE = 'https://www.ketamineinfusionkansascity.com/wp-content/uploads/what-is-ketamine-official.pdf';
export const APPOINTMENT_URL = '/appointment-request/';

export type NavChild = { label: string; href: string; external?: boolean };
export type NavItem = {
  label: string;
  href?: string;          // parent link (omitted → parent is a toggle button)
  external?: boolean;
  children?: NavChild[];
  mega?: boolean;         // show as a mega menu with images + descriptions
};

/** Main navigation – order and labels match the reference site. */
export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/about-us/',
    children: [
      { label: 'About Balanced Ketamine', href: '/about-us/' },
      { label: 'Patient Testimonials', href: '/testimonials/' },
    ],
  },
  {
    label: 'Treatments',
    mega: true,   // rendered as the interactive <TreatmentsMenu> (see TREATMENTS below)
    children: [
      { label: 'Ketamine Infusion Therapy for Chronic Pain', href: '/ketamine-for-chronic-pain/' },
      { label: 'Ketamine Infusion Therapy for Depression and Anxiety', href: '/ketamine-for-depression-and-anxiety/' },
      { label: 'Ketamine Infusion Therapy for PTSD', href: '/ketamine-for-post-traumatic-stress-disorder/' },
      { label: 'Ketamine Infusion Therapy for Bipolar Disorders', href: '/ketamine-for-bipolar-disorders/' },
      { label: 'Ketamine Infusion Therapy for Migraine', href: '/ketamine-for-migraines/' },
      { label: 'Results of Ketamine Infusions', href: '/results-of-ketamine-infusions/' },
    ],
  },
  {
    label: 'What To Expect', href: '/what-to-expect/',
    children: [
      { label: 'Your Infusion Day', href: '/what-to-expect/' },
      { label: 'FAQs', href: '/frequently-asked-questions/' },
      { label: 'Refer a Patient (PDF)', href: PDF_REFERRAL, external: true },
    ],
  },
  { label: 'Contact Us', href: '/contact-us/' },
  {
    label: 'Media',
    children: [
      { label: 'Educational Videos', href: '/educational-videos/' },
      { label: 'Informational TikToks', href: '/informational-tiktoks/' },
      { label: 'Newsletter Sign-up', href: NEWSLETTER_URL, external: true },
      { label: 'Blogs', href: '/blog/' },
    ],
  },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'Patient Packet', href: PDF_PATIENT_PACKET, external: true },
];

export const FOOTER_NAV: NavChild[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Treatments', href: '/ketamine-for-depression-and-anxiety/' },
  { label: 'What to Expect', href: '/what-to-expect/' },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'FAQs', href: '/frequently-asked-questions/' },
  { label: 'Contact Us', href: '/contact-us/' },
  { label: 'Blogs', href: '/blog/' },
];

export const LEGAL_NAV: NavChild[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'HIPAA Notice of Privacy Practices', href: '/hipaa-notice/' },
  { label: 'Accessibility Statement', href: '/accessibility/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' },
  { label: 'Terms of Use', href: '/terms-of-use/' },
];

/** Props for links that open in a new tab. */
export const ext = { target: '_blank', rel: 'noopener' } as const;

/** Compare paths regardless of trailing slash (`/hipaa-notice` vs `/hipaa-notice/`). */
export const samePath = (a?: string | null, b?: string | null) =>
  !!a && !!b && (a.replace(/\/+$/, '') || '/') === (b.replace(/\/+$/, '') || '/');

/**
 * Treatments mega menu content.
 * icon  = condition icon shown in the list (reference asset)
 * image = photo shown in the preview panel (reference asset – replace with service-specific photos if available)
 */
export type Treatment = {
  title: string;
  href: string;
  summary: string;        // one line, shown in the list
  description: string;    // 1–2 sentences, shown in the preview panel
  icon?: { src: string; width: number; height: number };
  image: { src: string; width: number; height: number; alt: string };
};

export const TREATMENTS: Treatment[] = [
  {
    title: 'Chronic Pain',
    href: '/ketamine-for-chronic-pain/',
    summary: 'Relief for CRPS, neuropathy and long-term nerve pain.',
    description: 'Low-dose IV ketamine blocks the NMDA receptors that keep pain signals amplified, helping many patients with CRPS, fibromyalgia and nerve pain when other medications have not worked.',
    icon: { src: '/images/chronic-pain.webp', width: 65, height: 84 },
    image: { src: '/images/ketamine-how-it-works.webp', width: 548, height: 364, alt: 'IV drip chamber during a ketamine infusion for chronic pain' },
  },
  {
    title: 'Depression & Anxiety',
    href: '/ketamine-for-depression-and-anxiety/',
    summary: 'Fast-acting help for treatment-resistant depression and anxiety.',
    description: 'Ketamine works on the brain’s glutamate system rather than serotonin, so many patients notice improvement within hours to days – often after several antidepressants have failed.',
    icon: { src: '/images/depression.webp', width: 83, height: 82 },
    image: { src: '/images/depression-and-anxiety-cover.webp', width: 550, height: 366, alt: 'Caregiver holding a patient’s hand for reassurance' },
  },
  {
    title: 'PTSD',
    href: '/ketamine-for-post-traumatic-stress-disorder/',
    summary: 'Easing the anxiety and hyperarousal that follow trauma.',
    description: 'By encouraging new connections between brain cells, IV ketamine can ease the intrusive memories, hypervigilance and low mood that come with post-traumatic stress disorder.',
    icon: { src: '/images/ptsd.webp', width: 62, height: 87 },
    image: { src: '/images/ketamine-modern-treatment.webp', width: 615, height: 502, alt: 'Balanced Ketamine physician and nurse preparing a PTSD treatment' },
  },
  {
    title: 'Bipolar Disorders',
    href: '/ketamine-for-bipolar-disorders/',
    summary: 'Rapid support during bipolar depressive episodes.',
    description: 'Given alongside ongoing psychiatric care, ketamine infusions may quickly lift mood and reduce suicidal thoughts during the depressive phase of bipolar disorder.',
    icon: { src: '/images/bipolar-disorder.webp', width: 92, height: 73 },
    image: { src: '/images/balanced-ketamine-welcome-cover.webp', width: 615, height: 450, alt: 'Clinician checking an IV ketamine infusion bag' },
  },
  {
    title: 'Migraine',
    href: '/ketamine-for-migraines/',
    summary: 'Another option for frequent, hard-to-treat migraines.',
    description: 'Ketamine acts on pain-processing pathways in the brain and has helped some patients with chronic or refractory migraine who found little relief from standard therapies.',
    icon: { src: '/images/migraine.webp', width: 78, height: 90 },
    image: { src: '/images/free-consultation-image.webp', width: 615, height: 502, alt: 'Clinician discussing migraine treatment with a patient' },
  },
  {
    title: 'Results of Ketamine Infusions',
    href: '/results-of-ketamine-infusions/',
    summary: 'What patients can expect from a treatment series.',
    description: 'See how quickly patients typically respond, how long the benefits can last, and how booster infusions help maintain improvement after an initial series.',
    // no reference icon for this item – an inline SVG is used instead
    image: { src: '/images/risks-of-ketamine-infusions-cover.webp', width: 630, height: 420, alt: 'Man raising his arms in an open field, feeling relief' },
  },
];
