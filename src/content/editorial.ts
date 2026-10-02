import type { SeoPath } from './seo';

/**
 * Editorial briefs for the first content cluster.
 *
 * These are briefs for writers, not pages: nothing here is rendered or
 * published. When an article is written, add it to src/content/resources.ts
 * as `status: 'draft'`, carry over `relatedPages` and `relatedSolutions`
 * from the brief, and set `status: 'published'` only after editorial and
 * product review. Every published article must link
 * article -> capability page -> solution page -> Request a Demo
 * (the article template always ends with the Request a Demo banner;
 * scripts/qa.mjs checks the capability and solution links).
 *
 * Rules for every article:
 * - No statistics, research findings, customer stories, quotes or outcomes
 *   unless a verifiable, citable source is supplied and linked.
 * - Describe Funda360 only as the current-state register in the application
 *   repository describes it (see MARKETING_WEBSITE_AUDIT.md, product claims).
 * - Roadmap items are named as roadmap, never as available.
 */

type SolutionSlug = 'schools' | 'school-leadership' | 'education-groups' | 'funders';

export type EditorialBrief = {
  title: string;
  /** Planned URL slug under /resources/. Keep stable once published. */
  slug: string;
  cluster: string;
  category: string;
  primaryIntent: string;
  /** Capability or AI page the article must link to. */
  capability: SeoPath;
  solutions: SolutionSlug[];
  outline: string[];
  /** Claims the article must not make. */
  mustNot: string[];
  /** An existing draft in resources.ts that can be developed into this article. */
  existingDraft?: string;
};

export const editorialBriefs: EditorialBrief[] = [
  {
    title: 'What is a school management system?',
    slug: 'what-is-a-school-management-system',
    cluster: 'School management',
    category: 'connected-data',
    primaryIntent: 'what is a school management system',
    capability: '/platform',
    solutions: ['schools', 'school-leadership'],
    outline: [
      'A plain definition: one system for learner records, academics, attendance, fees and communication.',
      'How it differs from separate spreadsheets and single-purpose tools.',
      'Who uses it in a school, role by role.',
      'What “connected” means in practice: information captured once and reused.',
      'How to judge whether a school is ready to move to one.',
    ],
    mustNot: ['Claim adoption figures or time savings without a cited source.', 'Compare named competitors.'],
    existingDraft: 'why-school-data-fragmentation-matters',
  },
  {
    title: 'What should school management software include?',
    slug: 'what-should-school-management-software-include',
    cluster: 'School management',
    category: 'connected-data',
    primaryIntent: 'school management software features',
    capability: '/platform',
    solutions: ['schools', 'education-groups'],
    outline: [
      'Core areas: learners and admissions, academics and assessment, attendance, fees, communication, reporting.',
      'Security essentials: separate data per school, role-based access, audit trail, multi-factor sign-in.',
      'Questions to ask any vendor about what is live today versus planned.',
      'Checklist a school can use when comparing systems.',
    ],
    mustNot: ['Imply Funda360 has transport, library, boarding or payroll modules for marketing purposes (CONFIRM first).', 'Present roadmap items as available.'],
  },
  {
    title: 'Digital school attendance management',
    slug: 'digital-school-attendance-management',
    cluster: 'Attendance',
    category: 'teaching-learning',
    primaryIntent: 'school attendance management',
    capability: '/platform/attendance',
    solutions: ['schools', 'school-leadership'],
    outline: [
      'Moving from paper registers to digital class registers.',
      'Present, absent and late: what is recorded and by whom.',
      'Keeping guardians informed (in-app notifications; other channels depend on configuration).',
      'Reports and dashboards leadership can use.',
    ],
    mustNot: ['Say SMS, email or WhatsApp alerts are sent automatically.', 'Quote national absenteeism statistics without a cited source.'],
  },
  {
    title: 'Improving attendance tracking in schools',
    slug: 'improving-attendance-tracking-in-schools',
    cluster: 'Attendance',
    category: 'teaching-learning',
    primaryIntent: 'improve school attendance tracking',
    capability: '/platform/attendance',
    solutions: ['school-leadership'],
    outline: [
      'From registers to patterns: what to look for.',
      'Agreeing who follows up and how.',
      'Using alerts as prompts for a conversation, not conclusions.',
      'Reviewing trends regularly, not only at term end.',
    ],
    mustNot: ['Promise attendance improvements or outcomes.'],
    existingDraft: 'using-attendance-information-well',
  },
  {
    title: 'School fee management software explained',
    slug: 'school-fee-management-software-explained',
    cluster: 'Finance',
    category: 'school-operations',
    primaryIntent: 'school fee management software',
    capability: '/platform/finance',
    solutions: ['schools', 'school-leadership'],
    outline: [
      'What fee management covers: fee structures, charges, payments, allocations, statements, ageing.',
      'Bank reconciliation: importing bank statements and confirming matches (a person confirms each match).',
      'What leadership needs to see about collections.',
      'What fee management software is not: a general ledger or payroll system.',
      'Online payments: depend on a payment provider being activated for the school.',
    ],
    mustNot: ['Claim automatic reconciliation or automatic matching.', 'Claim live online payments or accounting-package integrations.', 'Quote collection-rate improvements.'],
  },
  {
    title: 'Digital academic and assessment management',
    slug: 'digital-academic-and-assessment-management',
    cluster: 'Academics',
    category: 'teaching-learning',
    primaryIntent: 'academic and assessment management',
    capability: '/platform/academics-assessments',
    solutions: ['schools', 'school-leadership'],
    outline: [
      'Academic structure: years, terms, grades, classes, subjects and timetables.',
      'Capturing assessment results once and reusing them.',
      'Governed report cards: review, approval, publication and PDFs.',
      'Homework: from publishing an assignment to marking submissions.',
    ],
    mustNot: ['Describe Funda360 as a full learning management system, video classroom or AI tutor.'],
  },
  {
    title: 'Practical uses of AI in school management',
    slug: 'practical-uses-of-ai-in-school-management',
    cluster: 'AI in education',
    category: 'ai-in-education',
    primaryIntent: 'AI in school management',
    capability: '/ai',
    solutions: ['school-leadership', 'education-groups'],
    outline: [
      'Where AI could genuinely help school administration and leadership.',
      'Why reliable, connected records come first.',
      'What Funda360 offers today (dashboards, reports, alerts) and what is on the roadmap.',
    ],
    mustNot: ['Present any Funda360 AI capability as available; all AI features are roadmap.', 'Cite AI accuracy or impact figures without a source.'],
  },
  {
    title: 'Responsible AI in education',
    slug: 'responsible-ai-in-education',
    cluster: 'AI in education',
    category: 'ai-in-education',
    primaryIntent: 'responsible AI in education',
    capability: '/ai',
    solutions: ['school-leadership', 'funders'],
    outline: [
      'Questions to ask before adopting AI: data, explanation, access, human decision, privacy.',
      'Learner privacy and existing access rules.',
      'Keeping people responsible for decisions.',
    ],
    mustNot: ['Claim regulatory compliance or certification.'],
    existingDraft: 'responsible-ai-in-schools',
  },
];
