import type { MetadataRoute } from 'next';
import { DOMAIN, LAST_UPDATED } from '@/lib/site';

export const dynamic = 'force-static';

/** XML sitemap – add inner pages here as they are built. */
export default function sitemap(): MetadataRoute.Sitemap {
  const legal = ['privacy-policy', 'hipaa-notice', 'accessibility', 'cookie-policy', 'terms-of-use'];
  return [
    { url: `${DOMAIN}/`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 1, images: [`${DOMAIN}/images/hero-ketamine-infusion.webp`] },
    ...legal.map((slug) => ({
      url: `${DOMAIN}/${slug}/`, lastModified: slug === 'privacy-policy' ? '2026-11-23' : LAST_UPDATED, changeFrequency: 'yearly' as const, priority: 0.3,
    })),
  ];
}
