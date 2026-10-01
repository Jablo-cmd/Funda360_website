import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { capabilityPages } from '@/content/platform';
import { articles, categories } from '@/content/resources';
import { solutionPages } from '@/content/solutions';

export const dynamic = 'force-static';

/**
 * Sitemap of every indexable page. Utility pages (/login, legal placeholders)
 * and draft articles are deliberately excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly', lastModified?: string) => ({
    url: absoluteUrl(path),
    priority,
    changeFrequency,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/platform', 0.9),
    ...capabilityPages.map((p) => entry(`/platform/${p.slug}`, 0.8)),
    entry('/ai', 0.8),
    entry('/solutions', 0.8),
    ...solutionPages.map((p) => entry(`/solutions/${p.slug}`, 0.8)),
    entry('/about', 0.6),
    entry('/resources', 0.7, 'weekly'),
    ...categories.map((c) => entry(`/resources/category/${c.slug}`, 0.5, 'weekly')),
    ...articles.filter((a) => a.status === 'published').map((a) => entry(`/resources/${a.slug}`, 0.6, 'monthly', a.updatedAt ?? a.publishedAt)),
    entry('/request-demo', 0.9),
  ];
}
