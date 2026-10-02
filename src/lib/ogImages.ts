import { capabilityPages } from '@/content/platform';
import { articles, getCategory } from '@/content/resources';
import { solutionPages } from '@/content/solutions';
import type { OgInput } from './og';

/**
 * Registry of social-sharing images, served at /og/<key>.png.
 * Keys derive from the page path (see ogKeyForPath), so every page gets its
 * own card automatically when an entry exists, and the global card otherwise.
 */
export type OgEntry = OgInput & { alt: string };

const entries: Record<string, OgEntry> = {
  home: {
    eyebrow: 'School management platform',
    title: 'The operating platform for modern schools.',
    subtitle: 'Learners, academics, attendance, fees, communication and reporting in one connected system.',
    alt: 'Funda360: the operating platform for modern schools.',
  },
  platform: {
    eyebrow: 'Platform',
    title: 'One connected platform for the whole school',
    subtitle: 'Twelve capability areas built on the same learner, class and school records.',
    alt: 'The Funda360 school management platform.',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'Built for everyone responsible for a school',
    subtitle: 'School teams, principals and owners, education groups and funders.',
    alt: 'Funda360 solutions for school teams, leadership, education groups and funders.',
  },
  ai: {
    eyebrow: 'AI & Intelligence',
    title: 'Intelligence starts with connected school information',
    subtitle: 'Available today: dashboards, reports and attendance alerts. AI insights are on the roadmap.',
    accent: 'insight',
    alt: 'Funda360 AI and school intelligence: available today and on the roadmap.',
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Insights for schools and school leaders',
    subtitle: 'School management, attendance, assessment, school finance, communication and AI in education.',
    alt: 'Funda360 resources and insights for schools.',
  },
  about: {
    eyebrow: 'About Funda360',
    title: 'Connecting the information schools already collect',
    subtitle: 'Funda360 is built by Auris Nexus Technologies.',
    alt: 'About Funda360.',
  },
  security: {
    eyebrow: 'Security & data protection',
    title: 'How Funda360 protects school information',
    subtitle: 'Separate data per school, role-based access, audit logging and multi-factor authentication.',
    alt: 'Funda360 security and data protection.',
  },
  'request-demo': {
    eyebrow: 'Request a demo',
    title: 'See Funda360 with your school in mind',
    subtitle: 'A walkthrough of the parts of the platform that matter most to you.',
    alt: 'Request a Funda360 demo.',
  },
};

for (const page of capabilityPages) {
  entries[`platform-${page.slug}`] = {
    eyebrow: `Platform · ${page.navLabel}`,
    title: page.hero.heading,
    subtitle: page.capabilities.intro,
    alt: `Funda360 ${page.navLabel}: ${page.hero.heading}`,
  };
}

for (const page of solutionPages) {
  entries[`solutions-${page.slug}`] = {
    eyebrow: `Funda360 for ${page.navLabel}`,
    title: page.tagline,
    subtitle: page.summary,
    alt: `Funda360 for ${page.navLabel}: ${page.tagline}`,
  };
}

for (const article of articles) {
  entries[`resources-${article.slug}`] = {
    eyebrow: getCategory(article.category)?.name ?? 'Insight',
    title: article.title,
    alt: article.title,
  };
}

export const ogEntries = entries;

export function ogKeyForPath(path: string): string {
  if (path === '/') return 'home';
  return path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');
}

/** The image for a page: its own card when one exists, otherwise the global card. */
export function ogImageFor(path: string): { key: string; entry: OgEntry } {
  const key = ogKeyForPath(path);
  if (entries[key]) return { key, entry: entries[key] };
  // Category pages use the resources card.
  if (key.startsWith('resources-category-')) return { key: 'resources', entry: entries.resources };
  return { key: 'home', entry: entries.home };
}
