import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';

export type PageSeo = {
  /** Page title without the "| Funda360" suffix (the root layout adds it). */
  title: string;
  description: string;
  /** Route path, e.g. "/platform/attendance". Used for the canonical URL. */
  path: string;
  /** Open Graph type. Articles use "article". */
  ogType?: 'website' | 'article';
  /** Exclude the page from search engines (utility and draft pages). */
  noIndex?: boolean;
  /** Article-only Open Graph fields. */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/**
 * Builds the complete metadata object for a page: unique title, meta
 * description, canonical URL, Open Graph and Twitter card fields.
 *
 * Open Graph images are a Phase 2 (design) deliverable: add
 * `src/app/opengraph-image.*` (or per-route images) and Next.js will
 * attach them automatically.
 */
export function pageMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const fullTitle = seo.path === '/' ? `${siteConfig.name} | ${siteConfig.tagline}` : `${seo.title} | ${siteConfig.name}`;

  return {
    title: seo.path === '/' ? { absolute: fullTitle } : seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: seo.ogType ?? 'website',
      ...(seo.ogType === 'article'
        ? { publishedTime: seo.publishedTime, modifiedTime: seo.modifiedTime, authors: seo.authors }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: seo.description,
    },
    robots: seo.noIndex || !siteConfig.allowIndexing ? { index: false, follow: !seo.noIndex } : { index: true, follow: true },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD) builders                                  */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.developer,
    url: siteConfig.url,
    brand: { '@type': 'Brand', name: siteConfig.name },
    // TODO(content): add logo URL and official social profiles (sameAs) once confirmed.
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    description: siteConfig.description,
  };
}

export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'School management system',
    operatingSystem: 'Web browser',
    description: siteConfig.description,
    url: absoluteUrl('/platform'),
    publisher: { '@type': 'Organization', name: siteConfig.developer },
    // Intentionally no offers/aggregateRating: pricing and reviews are not published.
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Organization', name: article.authorName },
    publisher: { '@type': 'Organization', name: siteConfig.developer },
    inLanguage: siteConfig.language,
  };
}
