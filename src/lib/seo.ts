import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site';
import { platformAreas } from '@/content/platform';
import type { RouteSeo } from '@/content/seo';
import { ogImageFor } from './ogImages';

/** Metadata input: a RouteSeo entry, or the same shape for dynamic pages (articles, categories). */
export type PageSeo = Pick<RouteSeo, 'path' | 'title' | 'description'> &
  Partial<Pick<RouteSeo, 'socialTitle' | 'noIndex' | 'lastModified'>> & {
    /** Open Graph type. Articles use "article". */
    ogType?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };

/**
 * Complete metadata for a page: unique full title, description, canonical
 * URL, robots, Open Graph and X/Twitter fields.
 *
 * Social images come from the /og/<key>.png registry (src/lib/ogImages.ts).
 */
export function pageMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const socialTitle = seo.socialTitle ?? seo.title;
  const indexable = siteConfig.allowIndexing && !seo.noIndex;
  const og = ogImageFor(seo.path);
  const image = { url: absoluteUrl(`/og/${og.key}.png`), width: 1200, height: 630, alt: og.entry.alt, type: 'image/png' };

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: seo.ogType ?? 'website',
      images: [image],
      ...(seo.ogType === 'article' ? { publishedTime: seo.publishedTime, modifiedTime: seo.modifiedTime, authors: seo.authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: seo.description,
      images: [{ url: image.url, alt: image.alt }],
    },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/*                                                                     */
/* One entity graph with stable @ids, so pages reference the same      */
/* company, website and product instead of re-declaring them:          */
/*   Auris Nexus Technologies (Organization) → develops →              */
/*   Funda360 (SoftwareApplication, brand "Funda360")                  */
/* ------------------------------------------------------------------ */

export const schemaIds = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  software: `${siteConfig.url}/#software`,
  brand: `${siteConfig.url}/#brand`,
};

const logoUrl = absoluteUrl('/brand/funda360-logo.png');

/** Site-wide entities, emitted once in the root layout. */
export function siteGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': schemaIds.organization,
        name: siteConfig.developer,
        ...(siteConfig.developerUrl ? { url: siteConfig.developerUrl } : {}),
        ...(siteConfig.socialProfiles.length ? { sameAs: siteConfig.socialProfiles } : {}),
        brand: { '@id': schemaIds.brand },
      },
      {
        '@type': 'Brand',
        '@id': schemaIds.brand,
        name: siteConfig.name,
        slogan: siteConfig.tagline,
        logo: logoUrl,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': schemaIds.software,
        name: siteConfig.name,
        url: absoluteUrl('/'),
        image: logoUrl,
        description: siteConfig.description,
        applicationCategory: 'EducationalApplication',
        applicationSubCategory: 'School management system',
        operatingSystem: 'Web browser',
        inLanguage: siteConfig.language,
        brand: { '@id': schemaIds.brand },
        creator: { '@id': schemaIds.organization },
        publisher: { '@id': schemaIds.organization },
        // Only capabilities available today; roadmap items are excluded.
        featureList: platformAreas.filter((a) => a.availability === 'available').map((a) => a.title),
        // Intentionally no offers or aggregateRating: pricing and reviews are not published.
      },
      {
        '@type': 'WebSite',
        '@id': schemaIds.website,
        name: siteConfig.name,
        url: absoluteUrl('/'),
        inLanguage: siteConfig.language,
        description: siteConfig.description,
        publisher: { '@id': schemaIds.organization },
        about: { '@id': schemaIds.software },
      },
    ],
  };
}

export type PageSchemaType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

/** The page entity, linked to the website, the product and its breadcrumb. */
export function webPageJsonLd(page: {
  path: string;
  title: string;
  description: string;
  type?: PageSchemaType;
  dateModified?: string;
  hasBreadcrumb?: boolean;
  /** Optional ordered list of linked pages (capabilities, solutions, articles). */
  items?: { name: string; path: string }[];
}) {
  const url = absoluteUrl(page.path);
  return {
    '@context': 'https://schema.org',
    '@type': page.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: siteConfig.language,
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.software },
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
    ...(page.hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(page.items?.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: page.items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              url: absoluteUrl(item.path),
            })),
          },
        }
      : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const last = crumbs[crumbs.length - 1];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(last.path)}#breadcrumb`,
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
  section?: string;
}) {
  const url = absoluteUrl(article.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/og/${ogImageFor(article.path).key}.png`),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    ...(article.section ? { articleSection: article.section } : {}),
    // The Funda360 team is part of the company; it is represented honestly as an organisation author.
    author: { '@type': 'Organization', name: article.authorName, parentOrganization: { '@id': schemaIds.organization } },
    publisher: { '@id': schemaIds.organization },
    about: { '@id': schemaIds.software },
    isPartOf: { '@id': schemaIds.website },
    inLanguage: siteConfig.language,
  };
}
