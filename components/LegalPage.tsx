/**
 * Template for compliance pages: visible breadcrumbs + H1 + TL;DR summary,
 * sticky table of contents, document body and contact box.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import JsonLd from './JsonLd';
import type { LegalPageData } from '@/lib/legal';
import { DOMAIN, LAST_UPDATED, LAST_UPDATED_LABEL, PHONE_TEL } from '@/lib/site';

/** Per-page metadata (title, description, canonical, Open Graph, Twitter). */
export function legalMetadata(page: LegalPageData): Metadata {
  const path = `/${page.slug}/`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article', url: path, title: page.title, description: page.description,
      modifiedTime: LAST_UPDATED, images: ['/images/hero-ketamine-infusion.webp'],
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: ['/images/hero-ketamine-infusion.webp'] },
  };
}

export default function LegalPage({ page }: { page: LegalPageData }) {
  const url = `${DOMAIN}/${page.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': url + '#webpage', url, name: page.title, description: page.description,
        inLanguage: 'en-US', isPartOf: { '@id': DOMAIN + '/#website' }, about: { '@id': DOMAIN + '/#clinic' },
        publisher: { '@id': DOMAIN + '/#clinic' }, datePublished: LAST_UPDATED, dateModified: LAST_UPDATED,
        breadcrumb: { '@id': url + '#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN + '/' },
          { '@type': 'ListItem', position: 2, name: page.name, item: url },
        ],
      },
      {
        '@type': ['MedicalClinic', 'LocalBusiness'], '@id': DOMAIN + '/#clinic', name: 'Balanced Ketamine',
        url: DOMAIN + '/', telephone: '+1-913-871-9888',
        address: {
          '@type': 'PostalAddress', streetAddress: '6700 W 121st St, Ste 300 A1', addressLocality: 'Overland Park',
          addressRegion: 'KS', postalCode: '66209', addressCountry: 'US',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* PAGE HEADER: visible breadcrumbs + H1 + TL;DR summary */}
      <section className="page-head" aria-labelledby="page-title">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-current="page">{page.name}</span></li>
            </ol>
          </nav>
          <span className="kicker">{page.kicker}</span>
          <h1 id="page-title">{page.h1}</h1>
          <p className="lead">{page.lead}</p>
          <p className="page-meta">Effective and last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time> · Balanced Ketamine, Overland Park, KS</p>
        </div>
      </section>

      {/* CONTENT: sticky table of contents + document */}
      <section className="section">
        <div className="container legal">
          <nav className="legal-toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              {page.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ol>
          </nav>
          <article className="prose">
            {page.sections.map((s) => (
              <Fragment key={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.body}
              </Fragment>
            ))}
            <aside className="legal-contact" aria-labelledby="contact-box-title">
              <h2 id="contact-box-title">{page.contactTitle}</h2>
              {page.contact}
              <a className="btn btn--purple" href={PHONE_TEL}>Call (913) 871-9888</a>
            </aside>
          </article>
        </div>
      </section>
    </>
  );
}
