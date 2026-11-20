/**
 * FAQ content – rendered by <FaqAccordion> AND used to build the FAQPage schema,
 * so the visible answers and structured data always stay in sync.
 * `a` = plain-text answer for schema; `body` = visible answer.
 */
import type { FaqItem } from '@/components/FaqAccordion';

export const faqItems: FaqItem[] = [
  {
    q: "How much does ketamine infusion therapy cost in Kansas City?",
    a: "At Balanced Ketamine, a single infusion costs $300–$680 depending on the condition being treated and the length of the session. A full treatment series costs $1,800–$3,700. You can pay per session or for the whole series, and financing is available through Advance Care and CareCredit.",
    body: (
      <>
        <p>At Balanced Ketamine, a single infusion costs $300–$680 depending on the condition being treated and the length of the session. A full treatment series costs $1,800–$3,700. You can pay per session or for the whole series, and financing is available through Advance Care and CareCredit.</p>
      </>
    ),
  },
  {
    q: "How long does a ketamine infusion take?",
    a: "Plan on roughly 90 minutes in the clinic. The infusion itself runs about 40 minutes, followed by around 40 minutes of monitoring while the effects wear off. You need a driver to take you home afterward.",
    body: (
      <>
        <p>Plan on roughly 90 minutes in the clinic. The infusion itself runs about 40 minutes, followed by around 40 minutes of monitoring while the effects wear off. You need a driver to take you home afterward.</p>
      </>
    ),
  },
  {
    q: "Does the doctor prescribe pain medications?",
    a: "Yes, when it is medically appropriate. Opioids are prescribed conservatively, prior medical records are reviewed first, and every prescription decision is based on your history and a full evaluation.",
    body: (
      <>
        <p>Yes, when it is medically appropriate. Opioids are prescribed conservatively, prior medical records are reviewed first, and every prescription decision is based on your history and a full evaluation.</p>
      </>
    ),
  },
  {
    q: "What insurance do you accept?",
    a: "Coverage varies by plan. Review our list of in-network carriers or call (913) 871-9888 with your insurance details and our team will verify your benefits. Self-pay rates are also available.",
    body: (
      <>
        <p>Coverage varies by plan. Review our list of in-network carriers or call <a href="tel:+19138719888">(913) 871-9888</a> with your insurance details and our team will verify your benefits. Self-pay rates are also available.</p>
      </>
    ),
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. We partner with CareCredit, which offers flexible payment plans once you are approved, and Advance Care for medical financing. We also accept major credit cards and cash.",
    body: (
      <>
        <p>Yes. We partner with CareCredit, which offers flexible payment plans once you are approved, and Advance Care for medical financing. We also accept major credit cards and cash.</p>
      </>
    ),
  },
  {
    q: "What treatments do you offer besides medications?",
    a: "Beyond medication management we offer interventional options including medial branch blocks, steroid injections, nerve ablations, prolotherapy and trigger point injections. Call (913) 871-9888 to confirm whether a specific procedure is available.",
    body: (
      <>
        <p>Beyond medication management we offer interventional options, including:</p>
                      <ul style={{ listStyle: 'disc', paddingLeft: '22px', marginBottom: '1em' }}>
                        <li>Medial branch blocks (MBBs)</li><li>Steroid injections</li><li>Nerve ablations</li><li>Prolotherapy</li><li>Trigger point injections</li>
                      </ul>
                      <p>Call <a href="tel:+19138719888">(913) 871-9888</a> to confirm whether a specific procedure is available.</p>
      </>
    ),
  },
  {
    q: "Is a urine drug screen (UDS) required?",
    a: "Yes. Every new patient gives a urine sample at the first appointment. It is a routine clinic protocol that confirms which medications are currently in your system so treatment can be planned safely.",
    body: (
      <>
        <p>Yes. Every new patient gives a urine sample at the first appointment. It is a routine clinic protocol that confirms which medications are currently in your system so treatment can be planned safely.</p>
      </>
    ),
  },
  {
    q: "Do I need a referral?",
    a: "Yes, a referral is needed before your appointment is scheduled. Your primary care provider or current specialist can fax it to (913) 871-1477. If you do not have a provider, contact us and we will help with next steps.",
    body: (
      <>
        <p>Yes, a referral is needed before your appointment is scheduled. Your primary care provider or current specialist can fax it to <a href="tel:+19138711477">(913) 871-1477</a>. If you do not have a provider, contact us and we will help with next steps.</p>
      </>
    ),
  },
  {
    q: "What conditions do you treat?",
    a: "We treat depression, anxiety, PTSD, bipolar depression and a wide range of pain conditions, including back and neck pain, arthritis, migraine, neuropathy, fibromyalgia and post-surgical pain. Call (913) 871-9888 to confirm your condition.",
    body: (
      <>
        <p>We treat depression, anxiety, PTSD, bipolar depression and a wide range of pain conditions, including back and neck pain, arthritis, migraine, neuropathy, fibromyalgia and post-surgical pain. Call <a href="tel:+19138719888">(913) 871-9888</a> to confirm your condition.</p>
      </>
    ),
  },
  {
    q: "What should I expect at my first visit?",
    a: "A new patient visit lasts about 45–60 minutes. The physician reviews your medical history and imaging, completes a physical exam, discusses treatment options with you and collects a urine drug screen sample.",
    body: (
      <>
        <p>A new patient visit lasts about 45–60 minutes. The physician reviews your medical history and imaging, completes a physical exam, discusses treatment options with you and collects a urine drug screen sample.</p>
      </>
    ),
  },
  {
    q: "Do you offer telehealth visits?",
    a: "Yes, telehealth consultations are available for patients who live farther away. Complete the patient packet beforehand. Because a urine drug screen is still required, we may ask you to visit the clinic for testing.",
    body: (
      <>
        <p>Yes, telehealth consultations are available for patients who live farther away. Complete the patient packet beforehand. Because a urine drug screen is still required, we may ask you to visit the clinic for testing.</p>
      </>
    ),
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Bring your insurance card, a photo ID, your medical records and imaging results, a current medication list and your completed new patient packet.",
    body: (
      <>
        <ul style={{ listStyle: 'disc', paddingLeft: '22px' }}>
                        <li>Insurance card</li><li>Photo ID</li><li>Medical records and imaging results</li><li>Current medication list</li><li>Completed new patient packet</li>
                      </ul>
      </>
    ),
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};
