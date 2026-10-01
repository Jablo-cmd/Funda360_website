import { ctas } from './ctas';
import type { ProductShotKey } from './screenshots';
import type { Feature, SeoFields } from './types';

export const homePage = {
  seo: {
    title: 'Funda360',
    description:
      'Funda360 is a connected school management platform for learners, academics, attendance, finance and communication. Smarter Schools. Better Outcomes.',
  } satisfies SeoFields,

  // 1. Hero
  hero: {
    brand: 'FUNDA360',
    heading: 'Smarter Schools. Better Outcomes.',
    intro:
      'Funda360 is a connected school management platform. It brings learner records, academics, attendance, fees and communication together in one place, so school teams can manage daily work, understand what is happening and act where attention is needed.',
    primary: ctas.requestDemo,
    secondary: ctas.explorePlatform,
    shot: 'dashboard' as ProductShotKey,
  },

  // 2. Introduction
  introduction: {
    id: 'introduction',
    heading: 'What is Funda360?',
    body: [
      'Funda360 is a web-based school management platform for schools and the people who lead, fund and support them.',
      'Administrators, teachers, finance teams, leadership, parents and learners each work in their own part of the platform, and all of them rely on the same connected school information.',
    ],
  },

  // 3. Problem
  problem: {
    id: 'problem',
    heading: 'School information is fragmented',
    intro: 'Most schools already collect a great deal of information. The difficulty is that it lives in too many places.',
    items: [
      { title: 'Spread across systems', description: 'Learner details, marks, registers and fees sit in separate spreadsheets, files and tools.' },
      { title: 'Captured more than once', description: 'The same information is typed again for each new purpose.' },
      { title: 'Hard to see the whole picture', description: 'Leadership waits for reports to be assembled before it can understand what is happening.' },
      { title: 'Noticed too late', description: 'Patterns in attendance or performance become visible only after the moment to help has passed.' },
    ] satisfies Feature[],
  },

  // 4. Connected platform
  connected: {
    id: 'connected-platform',
    heading: 'One connected platform',
    intro:
      'In Funda360 the learner record sits at the centre. Classes, assessments, attendance, fees and communication all connect to it, so information captured once is available wherever it is needed, to the people allowed to see it.',
    link: { label: 'How the platform connects', href: '/platform#how-it-connects' },
  },

  // 5. Manage → Understand → Act
  framework: {
    id: 'manage-understand-act',
    heading: 'Manage → Understand → Act',
    intro: 'Funda360 is designed around three steps.',
    steps: [
      { title: 'Manage', description: 'Run daily school work in one platform: learners, classes, attendance, assessments, fees and communication.' },
      { title: 'Understand', description: 'See what is happening through role-based dashboards and reports built from the same records.' },
      { title: 'Act', description: 'Identify where attention may be needed and follow up, with alerts today and intelligence on the roadmap.' },
    ] satisfies Feature[],
  },

  // 6. Capabilities: rendered from platformAreas
  capabilities: {
    id: 'capabilities',
    heading: 'Platform capabilities',
    intro: 'Everything a school needs to run, connected.',
    link: ctas.explorePlatform,
  },

  // 7. Product UI showcase
  showcase: {
    id: 'product',
    heading: 'Inside Funda360',
    intro: 'A look at the platform school teams use every day.',
    shots: ['dashboard', 'learnerManagement', 'academicPerformance', 'attendance', 'analytics', 'reporting'] as ProductShotKey[],
  },

  // 8. AI & Intelligence
  ai: {
    id: 'ai',
    heading: 'AI & Intelligence',
    intro:
      'Funda360 connects school information so that people can understand what is happening and identify where attention may be needed. The connected foundation, dashboards and attendance alerts are available today; AI-driven insights are on our roadmap.',
    link: ctas.exploreAi,
  },

  // 9. Solutions: rendered from solutionPages
  solutions: {
    id: 'solutions',
    heading: 'Solutions for every audience',
    intro: 'The same platform, shaped around the people who use it.',
  },

  // 10. Trust & security
  trust: {
    id: 'trust',
    heading: 'Built on a secure foundation',
    intro: 'School information is sensitive. Funda360 is built to protect it.',
    items: [
      { title: 'Each school’s data kept separate', description: 'Every school’s information is isolated from other schools, enforced in the database.' },
      { title: 'Role-based access', description: 'People see and do only what their role allows.' },
      { title: 'Protection for sensitive records', description: 'Medical, behaviour and safeguarding information has its own access controls.' },
      { title: 'Audit trail', description: 'Sensitive actions are recorded.' },
      { title: 'Multi-factor authentication', description: 'An additional sign-in check for accounts that need it.' },
      { title: 'Consent and privacy', description: 'Consent records and privacy controls designed with South African privacy law (POPIA) in mind.' },
    ] satisfies Feature[],
    note: 'Funda360 does not currently claim third-party security certification.',
  },

  // 11. Impact / outcomes (qualitative only: no unverified statistics)
  impact: {
    id: 'impact',
    heading: 'What connected information makes possible',
    intro: 'The outcomes Funda360 is designed to support.',
    items: [
      { title: 'More time for teaching', description: 'Less time spent re-capturing and reconciling information.' },
      { title: 'Earlier support for learners', description: 'Attendance and performance patterns become visible sooner.' },
      { title: 'Better-informed leadership', description: 'Decisions based on current information, not last term’s spreadsheet.' },
      { title: 'Closer partnership with families', description: 'Parents can see results, homework and attendance, and talk to the school.' },
    ] satisfies Feature[],
    // TODO(content): add verified case studies or impact evidence when available. Do not add statistics without a source.
  },

  // 12. Resources: rendered from articles
  resources: {
    id: 'insights',
    heading: 'Insights',
    intro: 'Thinking on school information, leadership and technology.',
    link: ctas.readInsights,
  },

  // 13. Closing CTA: uses closingCta
};
