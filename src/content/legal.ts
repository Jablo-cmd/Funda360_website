import { siteConfig } from '@/config/site';

/**
 * Legal pages. The final policy text must come from the company's legal and
 * compliance owner (see MARKETING_WEBSITE_AUDIT.md: CONFIRM). Until then these
 * pages state, accurately, what the website does today. Both are noindex.
 */
export const legalPages = {
  privacy: {
    heading: 'Privacy policy',
    status: 'The full privacy policy for this website is being finalised with our legal and compliance advisers. Until it is published, this page summarises what the website does today.',
    facts: [
      'This website does not set analytics or advertising cookies and does not load third-party trackers or fonts.',
      'Information you enter in the Request a Demo form (name, organisation, email, optional phone number, role, size, interests and optional message) is sent over an encrypted connection to the Funda360 team and used only to respond to your request.',
      ...(siteConfig.turnstileSiteKey
        ? ['To keep out automated spam, the Request a Demo page uses Cloudflare Turnstile, which loads a script from Cloudflare on that page only.']
        : []),
      'The Funda360 application has its own privacy controls and pages for parents and learners, separate from this website.',
      siteConfig.contactEmail
        ? `For privacy questions, email ${siteConfig.contactEmail}.`
        : 'For privacy questions, contact the Funda360 team through the Request a Demo page.',
    ],
  },
  terms: {
    heading: 'Terms of use',
    status: 'The full terms of use for this website are being finalised with our legal advisers and will be published here.',
    facts: [
      'Product information on this website describes Funda360 as it is today; roadmap items are labelled as such.',
      'Product screenshots show real Funda360 screens with a fictional demo school.',
    ],
  },
};
