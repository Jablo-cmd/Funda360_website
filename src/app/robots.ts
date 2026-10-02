import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

export const dynamic = 'force-static';

/**
 * Production (indexing enabled): allow everything except the login hand-off,
 * and point crawlers at the sitemap.
 * Every other build (local, preview, CI): disallow everything.
 * See siteConfig.allowIndexing for the exact gate.
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
