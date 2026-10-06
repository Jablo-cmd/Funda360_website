/**
 * Site-wide configuration.
 *
 * Everything that differs between environments (local, preview, production)
 * is read from environment variables here and nowhere else.
 * See .env.example and MARKETING_WEBSITE_AUDIT.md (Robots + indexing).
 */

function stripTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

/**
 * Personal data is only ever posted over HTTPS (plain http is allowed for
 * localhost testing). Anything else is treated as not configured.
 */
function secureEndpoint(value: string): string {
  return /^https:\/\/[^/\s]+/.test(value) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(value) ? value : '';
}

const url = stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

/** A real, public origin: https and not a local address. */
const isPublicOrigin = /^https:\/\//.test(url) && !/\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|$)/.test(url);

/**
 * Indexing gate. Search engines may index the site only when BOTH:
 *  - NEXT_PUBLIC_ALLOW_INDEXING=true (set only by the production deploy), and
 *  - NEXT_PUBLIC_SITE_URL is a public https origin.
 * Every other build (local, preview, CI) is noindex with robots.txt "Disallow: /".
 */
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' && isPublicOrigin;

export const siteConfig = {
  name: 'Funda360',
  tagline: 'Smarter Schools. Better Outcomes.',
  /** One-sentence product definition reused in metadata and structured data. */
  description:
    'Funda360 is a connected school management platform that brings learner management, academics, attendance, fees, communication, reporting and intelligence into one system, so school teams can manage daily work, understand what is happening and act where attention is needed.',
  /** Company that develops Funda360. */
  developer: 'Auris Nexus Technologies',
  /**
   * Company website and verified social profiles, used in structured data.
   * CONFIRM: leave empty until the official URLs are confirmed. Never guess.
   */
  developerUrl: process.env.NEXT_PUBLIC_DEVELOPER_URL || '',
  socialProfiles: (process.env.NEXT_PUBLIC_SOCIAL_PROFILES || '').split(',').map((s) => s.trim()).filter(Boolean),
  locale: 'en_ZA',
  language: 'en-ZA',

  /** Canonical origin of the marketing site (no trailing slash). */
  url,

  /**
   * Static export (GitHub Pages) serves every page at a trailing-slash URL
   * (e.g. /platform/). Canonical URLs and the sitemap must match the served
   * URL exactly, so they follow the same setting as next.config.ts.
   */
  trailingSlash: process.env.STATIC_EXPORT === '1',

  /**
   * The Login CTA points to the existing Funda360 application.
   * The marketing site never authenticates anyone itself.
   */
  appLoginUrl: process.env.NEXT_PUBLIC_APP_LOGIN_URL || 'https://app.funda360.aurisnexus.co.za/login',

  /**
   * Public URL of the Request a Demo endpoint (server/demo-request, deployed
   * separately). Empty = not yet connected. Never a secret: delivery
   * credentials live only in the endpoint's own environment.
   */
  demoRequestEndpoint: secureEndpoint(process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT || ''),

  /** Cloudflare Turnstile site key (public). Set together with TURNSTILE_SECRET_KEY on the endpoint. */
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',

  /**
   * Public contact address offered as an alternative when online submission
   * is unavailable. CONFIRM: leave empty until an address is confirmed.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',

  allowIndexing,

  /**
   * Search engine ownership verification tokens (public meta tag values).
   * Only rendered on indexable production builds. DNS verification needs none.
   */
  searchVerification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
  },

  /**
   * Draft articles are visible on non-indexed previews (for editorial review)
   * and hidden on the indexed production site. Override with
   * NEXT_PUBLIC_SHOW_DRAFT_CONTENT=true|false.
   */
  showDraftContent:
    process.env.NEXT_PUBLIC_SHOW_DRAFT_CONTENT !== undefined ? process.env.NEXT_PUBLIC_SHOW_DRAFT_CONTENT === 'true' : !allowIndexing,
};

/**
 * Absolute URL for a site path, matching the URL the host actually serves
 * (trailing slash on static export; files such as /sitemap.xml unchanged).
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  let normalised = path.startsWith('/') ? path : `/${path}`;
  const [pathname, suffix = ''] = normalised.split(/(?=[#?])/);
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  if (siteConfig.trailingSlash && pathname !== '/' && !pathname.endsWith('/') && !isFile) {
    normalised = `${pathname}/${suffix}`;
  }
  // The home page is the bare origin unless the host serves trailing-slash URLs (matches Next.js canonical output).
  if (normalised === '/') return siteConfig.trailingSlash ? `${siteConfig.url}/` : siteConfig.url;
  return `${siteConfig.url}${normalised}`;
}
