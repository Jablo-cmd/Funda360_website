import type { Faq, Feature } from './types';

/**
 * Security & data protection page. Every statement is verified against the
 * Funda360 application (database-enforced tenant isolation, role-based access,
 * separate access controls for sensitive records, audit and record-access
 * logging, MFA, consent records). Items needing confirmation are marked.
 */
export const securityPage = {
  hero: {
    eyebrow: 'Security & data protection',
    heading: 'How Funda360 protects school information',
    intro:
      'School information is sensitive. Funda360 is designed so that each school’s information stays separate, each person sees only what their role allows, and sensitive actions leave a record.',
  },
  controls: {
    heading: 'Protection built into the platform',
    intro: 'These controls are part of the Funda360 platform today.',
    items: [
      {
        title: 'Each school’s data kept separate',
        description: 'Funda360 is a multi-school platform. Every school’s information is isolated from other schools, and the isolation is enforced in the database itself, not only in the screens.',
      },
      {
        title: 'Role-based access',
        description: 'Teachers, finance, admissions, leadership, parents and learners each see only what their role allows. Guardians see their own children; learners see their own information.',
      },
      {
        title: 'Sensitive records protected separately',
        description: 'Medical, behaviour and safeguarding information has its own, stricter access controls.',
      },
      {
        title: 'Audit trail',
        description: 'Sensitive actions are recorded in an audit log, and access to learner records is logged.',
      },
      {
        title: 'Secure sign-in',
        description: 'Email verification, account activation, password recovery and multi-factor authentication, which some privileged roles are required to use.',
      },
      {
        title: 'Consent and privacy',
        description: 'Consent records with an audit trail, and privacy pages where guardians manage discretionary consent, designed with South Africa’s POPIA in mind.',
      },
    ] satisfies Feature[],
  },
  claims: {
    heading: 'What we do and do not claim',
    intro: 'We would rather be precise than impressive.',
    items: [
      { title: 'No third-party certification claimed', description: 'Funda360 does not currently claim SOC 2, ISO 27001 or similar certification.' },
      { title: 'Compliance is shared', description: 'The platform provides privacy and consent controls; how a school uses them is part of its own POPIA compliance.' },
      { title: 'Hosting and data-processing terms', description: 'Ask the Funda360 team for current hosting, data-location and data-processing details for your school.', availability: 'confirm' },
    ] satisfies Feature[],
  },
  website: {
    heading: 'About this website',
    body: 'This marketing website does not set analytics or advertising cookies and loads no third-party trackers. Information you enter in the Request a Demo form is used only to respond to your request.',
  },
  faqs: [
    {
      question: 'Can one school see another school’s information?',
      answer: 'No. Each school’s information is isolated from other schools, and this is enforced by the platform’s database.',
    },
    {
      question: 'Who can see a learner’s information?',
      answer: 'Only people whose role allows it: for example the learner’s teachers within their classes, authorised school staff, the learner’s own guardians and the learner. Medical, behaviour and safeguarding information has stricter access.',
    },
    {
      question: 'Is Funda360 POPIA compliant?',
      answer:
        'Funda360 includes consent records and privacy controls designed with POPIA in mind. Compliance also depends on how each school uses the platform, and Funda360 does not claim third-party certification.',
    },
  ] satisfies Faq[],
};
