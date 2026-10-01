import { siteConfig } from '@/config/site';
import type { Cta } from './types';

/**
 * CTA strategy
 * - Primary conversion everywhere: Request a Demo (/request-demo).
 * - Secondary, exploratory: Explore the platform / relevant detail page.
 * - Existing users: Login (external, the Funda360 application).
 */
export const ctas = {
  requestDemo: { label: 'Request a Demo', href: '/request-demo' },
  explorePlatform: { label: 'Explore the platform', href: '/platform' },
  exploreFunda360: { label: 'Explore Funda360', href: '/platform' },
  exploreAi: { label: 'See how Funda360 approaches AI', href: '/ai' },
  exploreSolutions: { label: 'Find your solution', href: '/solutions' },
  readInsights: { label: 'Read insights', href: '/resources' },
  aboutFunda360: { label: 'About Funda360', href: '/about' },
  login: { label: 'Login', href: siteConfig.appLoginUrl, external: true },
} satisfies Record<string, Cta>;

/** Closing CTA block reused at the bottom of most pages. */
export const closingCta = {
  heading: 'See Funda360 with your own school in mind',
  body: 'Book a walkthrough with the Funda360 team. We will look at how your school works today and show you the parts of the platform that matter most to you.',
  primary: ctas.requestDemo,
  secondary: ctas.explorePlatform,
};
