import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { categories, categoryIsIndexable, publishedArticles } from '@/content/resources';
import { routeSeo } from '@/content/seo';

export const dynamic = 'force-static';

/**
 * Every indexable URL, at the exact URL the host serves, with the date its
 * content last changed. Excluded: noindex utility and placeholder pages
 * (/login, /privacy, /terms), draft articles and categories without a
 * published article. Priority/changefreq are omitted: search engines ignore
 * them and they invite manipulation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.values(routeSeo)
    .filter((r) => !('noIndex' in r && r.noIndex))
    .map((r) => ({ url: absoluteUrl(r.path), lastModified: r.lastModified }));

  const articles = publishedArticles();
  const categoryRoutes = categories
    .filter((c) => categoryIsIndexable(c.slug))
    .map((c) => {
      const latest = articles.filter((a) => a.category === c.slug).map((a) => a.updatedAt ?? a.publishedAt).sort().pop();
      return { url: absoluteUrl(`/resources/category/${c.slug}`), lastModified: latest };
    });
  const articleRoutes = articles.map((a) => ({ url: absoluteUrl(`/resources/${a.slug}`), lastModified: a.updatedAt ?? a.publishedAt }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
