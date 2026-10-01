/**
 * Site-wide configuration.
 *
 * Everything that differs between environments (local, staging, production)
 * is read from NEXT_PUBLIC_* environment variables here and nowhere else.
 * See .env.example for the full list.
 */

function stripTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export const siteConfig = {
  name: 'Funda360',
  tagline: 'Smarter Schools. Better Outcomes.',
  /** One-sentence product definition reused in metadata and structured data. */
  description:
    'Funda360 is a connected school management platform that brings learner, academic, attendance, finance and communication information together so school teams can manage daily work, understand what is happening and act where attention is needed.',
  /** Company that develops Funda360. Confirm public wording before launch. */
  developer: 'Auris Nexus Technologies',
  locale: 'en_ZA',
  language: 'en-ZA',

  /** Canonical origin of the marketing site (no trailing slash). */
  url: stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  /**
   * The Login CTA points to the existing Funda360 application.
   * The marketing site never authenticates anyone itself.
   */
  appLoginUrl: process.env.NEXT_PUBLIC_APP_LOGIN_URL || 'https://funda360.aurisnexus.co.za/login',

  /** Request a Demo submission endpoint. Empty = not yet connected (Phase 1). */
  demoRequestEndpoint: process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT || '',

  /**
   * Search engines are told to stay away until this is explicitly enabled,
   * so preview/staging deployments of the skeleton are never indexed.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
} as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
