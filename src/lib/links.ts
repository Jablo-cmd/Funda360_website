import { capabilityPages, platformAreas } from '@/content/platform';
import { solutionPages } from '@/content/solutions';

/**
 * Descriptive anchor text for internal links, so links read as
 * "Explore attendance management" rather than "Learn more".
 */
export function linkLabelFor(href: string): string {
  const [path, hash] = href.split('#');
  const capability = capabilityPages.find((p) => `/platform/${p.slug}` === path);
  if (capability) return `Explore ${capability.navLabel}`;
  const solution = solutionPages.find((p) => `/solutions/${p.slug}` === path);
  if (solution) return `Funda360 for ${solution.navLabel}`;
  if (path === '/platform' && hash) {
    const area = platformAreas.find((a) => a.id === hash);
    if (area) return `Explore ${area.title}`;
    if (hash === 'portals') return 'Explore the parent and learner portals';
  }
  const fixed: Record<string, string> = {
    '/platform': 'Explore the Funda360 platform',
    '/ai': 'Explore AI & Intelligence',
    '/solutions': 'Explore solutions',
    '/resources': 'Read insights',
    '/security': 'How Funda360 protects school information',
    '/about': 'About Funda360',
    '/request-demo': 'Request a Demo',
  };
  return fixed[path] ?? 'Explore';
}

/** Capability page summary for cards (title + one line). */
export function capabilityCard(href: string) {
  const page = capabilityPages.find((p) => `/platform/${p.slug}` === href);
  if (!page) return null;
  const area = platformAreas.find((a) => a.href === href);
  return { title: page.navLabel, description: area?.summary ?? page.hero.intro, href };
}
