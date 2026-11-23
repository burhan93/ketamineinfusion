/**
 * HOMEPAGE – section structure cloned from ketamineinfusionkansascity.com.
 * Static markup is server-rendered; interactive parts are client components.
 * Images marked "IMAGE (reference asset)" come from the current site.
 */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { preload } from 'react-dom';
import AppointmentForm from '@/components/AppointmentForm';
import ConsentMap from '@/components/ConsentMap';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import YouTube from '@/components/YouTube';
import { AppointmentLink } from '@/components/Triggers';
import { faqItems, faqSchema } from '@/lib/faq';
import { clinicGraph } from '@/lib/schema';

const TITLE = 'Ketamine Infusion Therapy Kansas City | Balanced Ketamine';
const DESCRIPTION = 'Physician-led ketamine infusion therapy in Overland Park for depression, anxiety, PTSD and chronic pain. Serving the Kansas City metro. Book a consultation.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Ketamine Infusion Therapy in Kansas City | Balanced Ketamine',
    description: 'Physician-led ketamine infusions in Overland Park, KS for depression, anxiety, PTSD and chronic pain. Sessions from $300.',
    images: [{ url: '/images/hero-ketamine-infusion.webp', width: 1920, height: 843, alt: 'Nurse preparing an IV ketamine infusion for a smiling patient' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketamine Infusion Therapy in Kansas City | Balanced Ketamine',
    description: 'Physician-led ketamine infusions in Overland Park, KS for depression, anxiety, PTSD and chronic pain.',
    images: ['/images/hero-ketamine-infusion.webp'],
  },
};

export default function HomePage() {
  // Preload the LCP hero image (responsive).
  preload('/images/hero-ketamine-infusion.webp', {
    as: 'image', fetchPriority: 'high',
    imageSrcSet: '/images/hero-ketamine-infusion-960.webp 960w, /images/hero-ketamine-infusion.webp 1920w',
    imageSizes: '100vw',
  });

  return (
    <>
      <JsonLd data={clinicGraph} />
      <JsonLd data={faqSchema} />
      {/* ===================================================================
               01. HERO
               =================================================================== */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__bg">
              {/* IMAGE (reference asset): hero banner – replace with real clinic photo if desired */}
              <img src="/images/hero-ketamine-infusion.webp" srcSet="/images/hero-ketamine-infusion-960.webp 960w, /images/hero-ketamine-infusion.webp 1920w" sizes="100vw" width="1920" height="843" fetchPriority="high" alt="Nurse starting an IV ketamine infusion for a smiling patient at Balanced Ketamine in Overland Park" />
            </div>
            <div className="hero__inner">
              <div className="hero__box">
                <h1 className="hero__title" id="hero-title">Hope, One Step Closer! Ketamine Infusion Therapy in Kansas City</h1>
                {/* TL;DR summary for readers and AI overviews */}
                <p className="hero__text">Balanced Ketamine is a physician-led infusion clinic at 6700 W 121st St, Ste 300 A1 in Overland Park, KS. We treat depression, anxiety, PTSD and chronic pain for patients from Kansas City, MO, Leawood, Mission Hills, Prairie Village, Lenexa, Olathe, Shawnee and nearby communities.</p>
                <AppointmentLink className="btn btn--purple">Request An Appointment</AppointmentLink>
              </div>
            </div>
          </section>

          {/* ===================================================================
               02. PRICING + FINANCING + FEATURE STRIP
               =================================================================== */}
          <section className="pricing" aria-labelledby="pricing-title">
            <div className="container row">
              <h2 className="sr-only" id="pricing-title">How much does ketamine infusion therapy cost?</h2>
              <div className="pricing__grid">
                <div className="price-card reveal">
                  <p className="price-line">Infusion Sessions: $300–$680 each</p>
                  <p className="price-line">Full Treatment Series: $1,800–$3,700</p>
                  <p>Choose the option that suits you – pay as you go per session, or save by booking a complete series. Financing is available.</p>
                </div>
                <a className="financing-link reveal" href="https://advancecarecard.com/" target="_blank" rel="noopener" aria-label="Apply for Advance Care medical financing (opens in a new tab)">
                  {/* IMAGE (reference asset): Advance Care financing banner */}
                  <img src="/images/advance-care-image.webp" width="645" height="202" loading="lazy" decoding="async" alt="Advance Care medical financing – interest-free options, instant approvals, generous credit limits and no prepayment penalty" />
                </a>
              </div>
            </div>

            <div className="container container--feature">
              <div className="features" role="list">
                <article className="feature reveal" role="listitem">
                  {/* IMAGE (reference asset): line icon */}
                  <img src="/images/migraine-icon.webp" width="50" height="50" loading="lazy" alt="Head outline icon representing depression" />
                  <h3>Ketamine for Depression</h3>
                  <p>Depression can feel like a weight you carry everywhere. Ketamine is frequently considered after standard antidepressants fall short, and it can restore a sense of lightness and hope to everyday life. Many patients report better mood and energy far sooner than they did with conventional medication.</p>
                </article>
                <article className="feature reveal" role="listitem">
                  <img src="/images/depression-icon.webp" width="50" height="50" loading="lazy" alt="Head with racing thoughts icon representing anxiety" />
                  <h3>Ketamine for Anxiety</h3>
                  <p>Anxiety can crowd out every other thought and make ordinary moments feel overwhelming. Ketamine takes a different route by quieting overactive brain circuits so patients feel calmer. Many say they feel less stuck in a cycle of worry and better able to enjoy life with balance and peace.</p>
                </article>
                <article className="feature reveal" role="listitem">
                  <img src="/images/headache-icon.webp" width="50" height="50" loading="lazy" alt="Head with pain lines icon representing chronic pain" />
                  <h3>Ketamine for Chronic Pain</h3>
                  <p>Long-term pain affects your body and your emotional health alike. Ketamine can calm nerve pain and ease the stress and fatigue that come with it. For people who have tried many options without relief, it may open the door to moving, sleeping and living more comfortably again.</p>
                </article>
              </div>
            </div>
          </section>

          {/* ===================================================================
               03. WELCOME / WHAT IS KETAMINE / HISTORY
               =================================================================== */}
          <section className="section welcome" aria-labelledby="welcome-title">
            <div className="container">
              <div className="welcome__intro reveal">
                <div>
                  <span className="kicker">Welcome to Balanced Ketamine</span>
                  <h2 className="h-display" id="welcome-title">Ketamine Infusion in Kansas City</h2>
                  <p className="lead">Balanced Ketamine is a leading Kansas City mental health clinic offering ketamine infusion therapy, an innovative treatment for mood disorders and chronic pain. Our care blends evidence-based medicine with genuine compassion and integrity, so every patient feels safe, heard and supported.</p>
                  <p className="reviewed-by">Medically reviewed by <strong>Dr. Raza Jafri</strong> · Last updated <time dateTime="2026-11-20">November 20, 2026</time></p>
                </div>
                <div className="welcome__badge">
                  {/* IMAGE (reference asset): award badge */}
                  <img src="/images/kansas-top-doctors-2023.webp" width="200" height="300" loading="lazy" alt="Kansas Top Doctors 2023 award badge" />
                </div>
              </div>

              <div className="split row reveal">
                <div className="media-frame">
                  {/* IMAGE (reference asset): clinician with IV bag */}
                  <img src="/images/balanced-ketamine-welcome-cover.webp" width="615" height="450" loading="lazy" decoding="async" alt="Clinician in scrubs checking an IV ketamine infusion bag" />
                </div>
                <div>
                  <h3 className="h-blue">What is Ketamine Infusion Therapy?</h3>
                  {/* Direct answer block (≈55 words) */}
                  <p>Ketamine infusion therapy is a medical treatment in which a low, carefully controlled dose of ketamine is given through an IV over about 40 minutes. Ketamine was first used in the 1960s as an anesthetic, including for injured soldiers in the Vietnam War, and is now used at sub-anesthetic doses to treat depression, anxiety, PTSD and chronic pain.</p>
                  <div className="btn-group">
                    <a className="btn btn--purple" href="/what-to-expect/">Read Details</a>
                    <a className="btn btn--blue" href="https://www.ketamineinfusionkansascity.com/wp-content/uploads/what-is-ketamine-official.pdf" target="_blank" rel="noopener">Download Our PDF</a>
                  </div>
                </div>
              </div>

              <div className="split split--top split--reverse-mobile row reveal">
                <div>
                  <h3 className="h-blue">Ketamine is not just a modern treatment</h3>
                  <h4 className="h-sub">It has a place in history</h4>
                  <p>Ketamine was first synthesized in 1962 by American chemist Calvin Stevens. It was developed as a safer anesthetic alternative to phencyclidine (PCP), which had produced serious side effects in patients.</p>
                  <p>The compound was patented in Belgium in 1963. Human trials began in 1964, when researcher Dr. Edward Domino observed that its main side effect was a brief, dream-like state. His wife, Toni Domino, coined the term “dissociative anesthetic” to describe it, and formal documented use in people and animals followed in 1966.</p>
                </div>
                <div className="media-frame">
                  {/* IMAGE (reference asset): physician and nurse preparing treatment */}
                  <img src="/images/ketamine-modern-treatment.webp" width="615" height="502" loading="lazy" decoding="async" alt="Balanced Ketamine physician and nurse preparing a patient's ketamine treatment" />
                </div>
              </div>

              <p className="welcome__history reveal">The U.S. Food and Drug Administration (FDA) approved ketamine in 1970, and it was soon used on Vietnam War battlefields for fast pain control and emergency procedures. In the decades that followed it became a standard anesthetic in emergency rooms, intensive care units and operating rooms. Research in the late 1990s and 2000s revealed rapid antidepressant effects, and in 2019 the FDA approved esketamine, a ketamine-derived nasal spray, for treatment-resistant depression.</p>
            </div>
          </section>

          {/* ===================================================================
               04. CONDITIONS WE TREAT (services grid)
               =================================================================== */}
          <section className="section section--grey" aria-labelledby="conditions-title">
            <div className="container">
              <div className="section-head row reveal">
                <span className="kicker">Benefits of Ketamine Infusion Therapy</span>
                <h2 className="h-section" id="conditions-title">How Does Ketamine Therapy Work? What Does It Treat?</h2>
                <p>Ketamine infusions have a growing range of clinical uses and have helped many people whose symptoms did not respond to other treatments. Below are some of the most common conditions we treat in Kansas City.</p>
              </div>

              <div className="conditions">
                <article className="condition-card reveal">
                  {/* IMAGE (reference asset): condition icon */}
                  <img src="/images/chronic-pain.webp" width="65" height="84" loading="lazy" alt="Person holding lower back icon for chronic pain" />
                  <h3><a href="/ketamine-for-chronic-pain/">Ketamine for Chronic Pain</a></h3>
                  <p>People living with persistent pain conditions such as complex regional pain syndrome (CRPS) have shown meaningful improvement with ketamine infusions. Ketamine blocks NMDA receptors that amplify pain signals in the brain and spinal cord, which is why it can work when other pain medications have not.</p>
                </article>
                <article className="condition-card reveal">
                  <img src="/images/depression.webp" width="83" height="82" loading="lazy" alt="Head with lightning bolt icon for depression and anxiety" />
                  <h3><a href="/ketamine-for-depression-and-anxiety/">Ketamine for Depression and Anxiety</a></h3>
                  <p>Depression is linked to weakened communication between brain cells. Controlled doses of ketamine boost glutamate signaling and support healthier mood pathways, often easing symptoms within hours to days rather than the weeks typical of standard antidepressants.</p>
                </article>
                <article className="condition-card reveal">
                  <img src="/images/ptsd.webp" width="62" height="87" loading="lazy" alt="Brain icon for post-traumatic stress disorder" />
                  <h3><a href="/ketamine-for-post-traumatic-stress-disorder/">Ketamine for Post-Traumatic Stress Disorder (PTSD)</a></h3>
                  <p>PTSD often comes with intense anxiety and depressive symptoms. By helping the brain form new connections and restoring healthier signaling, IV ketamine has been shown to reduce the severity of PTSD symptoms for many patients.</p>
                </article>
                <article className="condition-card reveal">
                  <img src="/images/bipolar-disorder.webp" width="92" height="73" loading="lazy" alt="Two faces icon for bipolar disorder" />
                  <h3><a href="/ketamine-for-bipolar-disorders/">Ketamine for Bipolar Disorder</a></h3>
                  <p>The depressive phases of bipolar disorder can be difficult to treat. Patients have responded well to ketamine infusions, which may rapidly lift mood and reduce suicidal thoughts when given alongside ongoing psychiatric care.</p>
                </article>
                <article className="condition-card reveal">
                  <img src="/images/migraine.webp" width="78" height="90" loading="lazy" alt="Head with lightning icon for migraine headaches" />
                  <h3><a href="/ketamine-for-migraines/">Ketamine for Migraine Headaches</a></h3>
                  <p>Migraine is notoriously hard to control. By acting on the NMDA receptor, ketamine targets the brain regions involved in pain processing and has provided relief for some patients who found little benefit from other therapies.</p>
                </article>
                <article className="condition-card reveal">
                  <img src="/images/inflammatory-pain.webp" width="85" height="85" loading="lazy" alt="Foot icon for nerve pain and inflammatory pain" />
                  <h3><a href="/ketamine-for-chronic-pain/">Ketamine for Nerve Pain and Inflammatory Pain</a></h3>
                  <p>Inflammation is the body’s normal defense against infection, but when the immune system targets healthy tissue it can cause ongoing pain, as in rheumatoid arthritis. IV ketamine can help reduce nerve and inflammatory pain and the distress that comes with it.</p>
                </article>
              </div>
            </div>
          </section>

          {/* ===================================================================
               05. HOW DOES IT WORK? + OVERVIEW VIDEO
               =================================================================== */}
          <section className="section how" aria-labelledby="how-title">
            <div className="container">
              <div className="split row reveal">
                <div>
                  <h2 className="h-section" id="how-title">How Does Ketamine Infusion Therapy Work?</h2>
                  <p>Ketamine works differently from most psychiatric medications. Instead of slowly adjusting serotonin levels, it acts on the brain’s glutamate system. It blocks NMDA receptors, which triggers a surge of glutamate that activates AMPA receptors – pathways tied to mood regulation – while also dampening the signals that keep pain switched on.</p>
                  <p>This activity prompts synaptogenesis: the growth of new connections between brain cells in areas weakened by chronic stress, depression and pain. Research suggests these strengthened pathways can persist well after the infusion itself, which is why a short series of treatments often produces lasting benefit.</p>
                </div>
                <div>
                  {/* VIDEO (reference asset): YouTube "Balanced Ketamine Overview" – click-to-load facade */}
                  <YouTube id="DdG5gDbjvak" title="Balanced Ketamine Overview" />
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================
               06. MEET OUR SPECIALISTS (E-E-A-T)
               =================================================================== */}
          <section className="section team" aria-labelledby="team-title" style={{ paddingTop: '0' }}>
            <div className="container">
              <div className="section-head row reveal">
                <span className="kicker">Our Team</span>
                <h2 className="h-section" id="team-title">Meet Our Specialists</h2>
                <p>Our team is committed to helping every patient regain their natural balance and to moving mental health care beyond medication-only approaches toward holistic, integrated psychiatry.</p>
              </div>
              <div className="team__grid row reveal">
                <figure className="team__member" style={{ margin: '0' }}>
                  <div className="team__photo">
                    {/* IMAGE (reference asset): Dr. Raza Jafri headshot */}
                    <img src="/images/img-drRazaJafri.webp" width="464" height="372" loading="lazy" alt="Dr. Raza Jafri, physician at Balanced Ketamine in Overland Park, Kansas" />
                  </div>
                  <figcaption className="team__name">Dr. Raza Jafri
                    {/* TODO: add verified credentials/title, e.g. "MD, Board-Certified ..." */}
                  </figcaption>
                </figure>
                <YouTube id="DU5tXaOWSHk" title="Dr. Jafri | Balanced Ketamine" />
              </div>
            </div>
          </section>

          {/* ===================================================================
               07. REQUEST AN APPOINTMENT (form + contact info)
               =================================================================== */}
          <section className="appointment" id="request-appointment" aria-labelledby="appt-title">
            <div className="appointment__form-col">
              <div className="appointment__form-wrap">
                <h2 className="appointment__title" id="appt-title">Request An Appointment</h2>
                {/* TODO: connect AppointmentForm to the form handler/CRM endpoint */}
                <AppointmentForm idPrefix="appt" variant="card"
                  messageHint="Please don’t include medical details or other confidential information – we’ll discuss those with you privately by phone." />
              </div>
            </div>
            <div className="appointment__media">
              {/* IMAGE (reference asset): consultation photo */}
              <img src="/images/free-consultation-image.webp" width="615" height="502" loading="lazy" decoding="async" alt="Balanced Ketamine clinician during a patient consultation" />
              <div className="appointment__info">
                <p>Interested in ketamine infusion therapy in Kansas City? Visit our Overland Park clinic.</p>
                <ul className="info-list">
                  <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                    <span>6700 W 121st St Ste 300 A1, Overland Park, KS 66209, United States</span></li>
                  <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" /></svg>
                    <span>Monday-Friday 8:00am to 4:30pm</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===================================================================
               08. WHAT TO EXPECT / RISKS cards
               =================================================================== */}
          <section className="section section--grey" aria-label="Learn more about ketamine infusions">
            <div className="container">
              <div className="cta-cards row">
                <article className="cta-card reveal">
                  {/* IMAGE (reference asset) */}
                  <img src="/images/depression-and-anxiety-cover.webp" width="550" height="366" loading="lazy" decoding="async" alt="Caregiver holding a patient's hand for reassurance on infusion day" />
                  <h3>The Day of Your Ketamine Infusion in Kansas City</h3>
                  <a className="btn btn--blue btn--caps" href="/what-to-expect/">What to Expect</a>
                </article>
                <article className="cta-card reveal">
                  <img src="/images/risks-of-ketamine-infusions-cover.webp" width="630" height="420" loading="lazy" decoding="async" alt="Man raising his arms in an open field, feeling relief" />
                  <h3>What are the risks of Ketamine infusions?</h3>
                  <a className="btn btn--blue btn--caps" href="/frequently-asked-questions/">Frequently Asked Questions</a>
                </article>
              </div>
            </div>
          </section>

          {/* ===================================================================
               09. PATIENT REFERRAL / IS KETAMINE RIGHT FOR ME?
               =================================================================== */}
          <section className="split-cta" aria-label="Referrals and eligibility">
            <div className="split-cta__col split-cta__col--purple">
              <div className="split-cta__inner reveal">
                <h2>Patient Referral</h2>
                <p>We welcome the chance to partner with you in caring for patients whose symptoms have not improved with other treatments.</p>
                <a className="btn btn--blue btn--caps" href="https://www.ketamineinfusionkansascity.com/wp-content/uploads/request-for-ketamine-infusion-treatment.pdf" target="_blank" rel="noopener">Refer a Patient</a>
              </div>
            </div>
            <div className="split-cta__col split-cta__col--blue">
              <div className="split-cta__inner reveal">
                <h2>Is Ketamine Right for Me?</h2>
                <p>If you live with severe depression and traditional treatments have not brought relief, you may be a candidate for ketamine infusion therapy.</p>
                <AppointmentLink className="btn btn--purple btn--caps">Request An Appointment</AppointmentLink>
              </div>
            </div>
          </section>

          {/* ===================================================================
               10. PARALLAX STATEMENT (background image = reference asset family-cta-bg)
               =================================================================== */}
          <section className="parallax" aria-label="Our mission">
            <p className="reveal">Rebuild your mental health and resilience with personalized ketamine infusion therapy in Kansas City</p>
          </section>

          {/* ===================================================================
               11. PATIENT REVIEWS (video testimonials) + WHAT TO EXPECT + STEPS
               =================================================================== */}
          <section className="section section--grey" aria-labelledby="reviews-title">
            <div className="container">
              <div className="section-head row reveal">
                <span className="kicker">Our Reviews</span>
                <h2 className="h-section" id="reviews-title">What Our Patients Say</h2>
              </div>

              {/* VIDEOS (reference assets): patient testimonials */}
              <div className="reviews__featured reveal">
                <YouTube id="cOIwUW193pY" title="Kansas Patient Shares Ketamine Therapy Success" />
              </div>
              <div className="reviews__pair row reveal">
                <YouTube id="aJ_eLqRJ1CU" title="Andrea – Patient Testimonial | Balanced Ketamine" />
                <YouTube id="pfMDDkL-Vqo" title="Parker – Patient Testimonial | Balanced Ketamine" className="video--purple" />
              </div>

              {/* What to expect */}
              <div className="section-head row reveal" style={{ marginTop: '32px' }}>
                <span className="kicker">What to Expect From</span>
                <h2 className="h-section">Your Ketamine Infusion Therapy</h2>
              </div>
              <div className="split split--top row expect reveal">
                <div>
                  <p>Whether you come to us for pain, a mood disorder or another condition, the basics of your treatment day are the same. Please avoid all food and drinks other than water for six hours before your appointment. Arriving calm and unhurried also helps you get the most from your infusion.</p>
                  <p>Your comfort matters to us. Our team will settle you into a private infusion suite, and you are welcome to bring a blanket, pillow or anything else that helps you relax.</p>
                  <p>Before the infusion starts, you will receive anti-nausea medication to reduce possible side effects. Our clinical team, including an anesthesiologist, monitors you throughout the session to make sure you are tolerating the treatment well.</p>
                </div>
                <div className="expect__media">
                  {/* IMAGE (reference asset) */}
                  <img src="/images/ketamine-how-it-works.webp" width="548" height="364" loading="lazy" decoding="async" alt="IV drip chamber in front of a patient monitor during a ketamine infusion" />
                </div>
              </div>
              <div className="expect reveal">
                <h3 className="sr-only">How is a ketamine IV infusion given?</h3>
                <p>How is ketamine IV therapy given? A small IV catheter is placed in a vein, and a precisely measured dose of ketamine flows slowly into your bloodstream over roughly forty minutes. Afterward we monitor you for about another forty minutes while the dissociative effects fade.</p>
                <p>Once monitoring is complete you can go home, but you must arrange for someone to drive you. Ketamine can leave you feeling foggy for several hours, so driving yourself is not safe.</p>
              </div>

              {/* Steps */}
              <div className="section-head row reveal" style={{ marginTop: '32px' }}>
                <span className="kicker">Ketamine Infusion Kansas City</span>
                <h2 className="h-section">Steps to Begin Ketamine Treatment</h2>
              </div>
            </div>
            <div className="container container--feature">
              <ol className="steps row">
                <li className="step reveal">
                  <h3 className="step__title">Contact Us</h3>
                  <div className="step__body">
                    <p>Call, email or message us through the website to let us know you are interested in treatment. Our team will answer your questions and walk you through what comes next.</p>
                    <div className="step__num" aria-hidden="true"><span>1</span></div>
                  </div>
                </li>
                <li className="step reveal">
                  <h3 className="step__title">Verify Insurance</h3>
                  <div className="step__body">
                    <p>Share your insurance details so we can check your coverage. Self-pay pricing is available if you prefer to pay out of pocket.</p>
                    <div className="step__num" aria-hidden="true"><span>2</span></div>
                  </div>
                </li>
                <li className="step reveal">
                  <h3 className="step__title">Obtain Referral</h3>
                  <div className="step__body">
                    <p>Ask your primary care physician (PCP) or current provider for a referral and have them fax it to our office at <a href="tel:+19138711477">(913) 871-1477</a>.</p>
                    <div className="step__num" aria-hidden="true"><span>3</span></div>
                  </div>
                </li>
                <li className="step reveal">
                  <h3 className="step__title">Book Your Consultation</h3>
                  <div className="step__body">
                    <p>Pick a consultation time that fits your schedule, either in the office or by televisit. A provider will review your medical history, current symptoms and goals for treatment.</p>
                    <div className="step__num" aria-hidden="true"><span>4</span></div>
                  </div>
                </li>
                <li className="step reveal">
                  <h3 className="step__title">Prepare for the Visit</h3>
                  <div className="step__body">
                    <p>Bring previous medical records and recent imaging, or fax them ahead of time, and complete the <a href="https://www.ketamineinfusionkansascity.com/wp-content/uploads/New-Patient-Packet-2023.pdf" target="_blank" rel="noopener">patient packet</a>. A urine sample is required for all new patients.</p>
                    <div className="step__num" aria-hidden="true"><span>5</span></div>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* ===================================================================
               12. FAQ ACCORDION (mirrors FAQPage schema in <head>)
               =================================================================== */}
          <section className="section faq" aria-labelledby="faq-title">
            <div className="container">
              <h2 className="h-section text-center row" id="faq-title" style={{ paddingBottom: '0' }}>Frequently Asked Questions</h2>
              <FaqAccordion items={faqItems} />
            </div>
          </section>

          {/* ===================================================================
               13. GET IN TOUCH
               =================================================================== */}
          <section className="section touch" aria-labelledby="touch-title" style={{ paddingBottom: '0' }}>
            <div className="container text-center reveal" style={{ maxWidth: '1250px' }}>
              <h2 className="h-section" id="touch-title">Get In Touch Now</h2>
              <p>If you are struggling with depression or chronic pain and want to learn whether ketamine infusion therapy could help, <a href="/contact-us/">get in touch now</a>. At Balanced Ketamine, each treatment plan is shaped around your condition, history and goals. Request an appointment or talk with our team about ketamine for pain and mood relief today.</p>
            </div>
          </section>

          {/* ===================================================================
               14. CONTACT DETAILS + MAP
               =================================================================== */}
          <section className="section contact-split" aria-labelledby="contact-title">
            <div className="contact-split__info">
              <div className="contact-split__inner reveal">
                <h2 id="contact-title">Balanced Ketamine</h2>
                <address className="contact-grid" style={{ fontStyle: 'normal' }}>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                    <a href="https://www.google.com/maps/place/Balanced+Ketamine/@38.906004,-94.6672698,17z" target="_blank" rel="noopener">6700 W 121st St Ste 300 A1, Overland Park, KS 66209, United States</a>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H8a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-4 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4-4H8V4h8v14z" /></svg>
                    <a href="tel:+19138719888">Call To Request An Appointment<br />(913) 871-9888</a>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" /></svg>
                    <span>Monday-Friday<br />8:00am to 4:30pm</span>
                  </div>
                  <div className="contact-item">
                    {/* IMAGE (reference asset): calendar icon */}
                    <img src="/images/icon-02.webp" width="59" height="59" loading="lazy" alt="" />
                    <AppointmentLink className="u">Request Your<br />Appointment Online</AppointmentLink>
                  </div>
                  <div className="contact-item contact-item--wide">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    <a href="https://ketamineinfusionkansascity.us22.list-manage.com/subscribe?u=0a1bbfcc859fb22338413c288&amp;id=19660ab76c" target="_blank" rel="noopener">Join The Mailing List</a>
                  </div>
                </address>
              </div>
            </div>
            {/* Google Map loads only after marketing-cookie consent */}
            <ConsentMap />
          </section>
    </>
  );
}
