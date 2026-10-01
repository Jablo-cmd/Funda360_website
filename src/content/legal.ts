import type { SeoFields } from './types';

/**
 * Legal pages are placeholders. Their final text must come from the company's
 * legal/compliance owner; nothing here is legal advice or final policy.
 */
export const legalPages = {
  privacy: {
    seo: {
      title: 'Privacy Policy',
      description: 'The Funda360 website privacy policy. Placeholder pending legal review.',
    } satisfies SeoFields,
    heading: 'Privacy policy',
    placeholder:
      'The final privacy policy for this website will be supplied by the Funda360 legal and compliance owner before launch. It must cover the Request a Demo form, analytics (if any) and cookies (if any), in line with POPIA.',
  },
  terms: {
    seo: {
      title: 'Terms of Use',
      description: 'Terms of use for the Funda360 website. Placeholder pending legal review.',
    } satisfies SeoFields,
    heading: 'Terms of use',
    placeholder: 'The final website terms of use will be supplied by the Funda360 legal owner before launch.',
  },
};
