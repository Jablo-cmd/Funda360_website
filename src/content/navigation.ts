import { ctas } from './ctas';
import { capabilityPages } from './platform';
import { solutionPages } from './solutions';
import type { NavItem, NavLink } from './types';

/** Primary navigation, in the order defined by the site architecture. */
export const primaryNav: NavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Platform overview', href: '/platform', description: 'All twelve capability areas' },
      ...capabilityPages.map((page) => ({ label: page.navLabel, href: `/platform/${page.slug}`, description: page.seo.description })),
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'All solutions', href: '/solutions', description: 'Find the view that fits you' },
      ...solutionPages.map((page) => ({ label: page.navLabel, href: `/solutions/${page.slug}`, description: page.summary })),
    ],
  },
  { label: 'AI & Intelligence', href: '/ai' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

/** Header actions, rendered after the primary navigation. */
export const headerActions = {
  primary: { label: 'Request a Demo', href: ctas.requestDemo.href } satisfies NavLink,
  login: { label: 'Login', href: ctas.login.href, external: true } satisfies NavLink,
};

export type FooterColumn = { heading: string; links: NavLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Platform overview', href: '/platform' },
      ...capabilityPages.map((page) => ({ label: page.navLabel, href: `/platform/${page.slug}` })),
      { label: 'AI & Intelligence', href: '/ai' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'All solutions', href: '/solutions' },
      ...solutionPages.map((page) => ({ label: page.navLabel, href: `/solutions/${page.slug}` })),
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Funda360', href: '/about' },
      { label: 'Resources & insights', href: '/resources' },
      { label: 'Request a demo', href: '/request-demo' },
      { label: 'Login to Funda360', href: ctas.login.href, external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
    ],
  },
];
