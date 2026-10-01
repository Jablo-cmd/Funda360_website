import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

export const dynamic = 'force-static';

/**
 * Crawling is disallowed until NEXT_PUBLIC_ALLOW_INDEXING=true, so preview
 * and staging builds of the skeleton never reach search results.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/login'] },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
