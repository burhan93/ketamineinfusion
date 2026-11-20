import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/cgi-bin/' },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
