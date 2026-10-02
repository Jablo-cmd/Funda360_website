import { ctas } from './ctas';
import type { ProductShotKey } from './screenshots';
import type { Feature } from './types';

export const homePage = {

  // 1. Hero
  hero: {
    /** Brand tagline, shown as the eyebrow above the H1. */
    brand: 'Smarter Schools. Better Outcomes.',
    heading: 'The operating platform for modern schools.',
    intro:
      'Funda360 is a connected school management platform that brings learner management, academics, attendance, fees, communication and reporting into one system, so school teams can manage the day, understand what is happening and act where it matters.',
    /** Who it is for, in one line under the hero actions. */
    audience: 'For school teams, principals and owners, education groups and the funders who support them.',
    primary: ctas.requestDemo,
    secondary: ctas.exploreFunda360,
    shot: 'dashboard' as ProductShotKey,
    phoneShot: 'parentPortal' as ProductShotKey,
    /** Modules shown under the hero; the last one is the intelligence layer. */
    modules: ['Learners', 'Academics', 'Attendance', 'Finance', 'Communication', 'Reporting'],
  },

  // 2. Introduction
  introduction: {
    id: 'introduction',
    heading: 'What is Funda360?',
    body: [
      'Funda360 is web-based school management software for schools and the people who lead, fund and support them. It runs in the browser on computers, tablets and phones.',
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
    center: { title: 'The learner record', note: 'At the centre of every school process' },
    /** Eight connected areas, laid out around the learner record (row by row). */
    nodes: [
      { id: 'learner-management', label: 'Admissions & enrolment', href: '/platform/learner-management' },
      { id: 'academics-curriculum', label: 'Classes & timetables', href: '/platform/academics-assessments' },
      { id: 'assessments-results', label: 'Assessments & report cards', href: '/platform/academics-assessments' },
      { id: 'attendance', label: 'Attendance', href: '/platform/attendance' },
      { id: 'fees-finance', label: 'Fees & finance', href: '/platform/finance' },
      { id: 'communication', label: 'Messages & notices', href: '/platform/communication' },
      { id: 'portals', label: 'Parent & learner portals', href: '/platform#portals' },
      { id: 'performance-analytics', label: 'Dashboards & reports', href: '/platform/analytics', insight: true },
    ],
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
    /** Visual story: one real screen per step (presentation detail for the steps above). */
    story: [
      { step: 'manage', shot: 'detailRegister' as ProductShotKey, caption: 'A teacher takes the daily register.', link: { label: 'Explore Attendance', href: '/platform/attendance' } },
      { step: 'understand', shot: 'detailTrend' as ProductShotKey, caption: 'The same registers become a school-wide trend.', link: { label: 'Explore Analytics & Reporting', href: '/platform/analytics' } },
      { step: 'act', shot: 'detailAttention' as ProductShotKey, caption: 'A learner record shows what needs attention.', link: { label: 'Explore AI & Intelligence', href: '/ai' } },
    ],
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
    /** Product tour tabs: real screens with short explanations. */
    tour: [
      { id: 'dashboard', label: 'Dashboard', shot: 'dashboard' as ProductShotKey, title: 'The school at a glance', body: 'Leadership sees learners, staff, classes, attendance and fee collection on one dashboard, built from the records teams work in every day.', link: { label: 'Analytics & Reporting', href: '/platform/analytics' } },
      { id: 'learners', label: 'Learners', shot: 'learnerManagement' as ProductShotKey, title: 'One record for every learner', body: 'Enrolment, guardians, documents, consent, finances and attendance in a single profile, with gaps flagged for attention.', link: { label: 'Learner Management', href: '/platform/learner-management' } },
      { id: 'assessments', label: 'Assessments', shot: 'academicPerformance' as ProductShotKey, title: 'Results captured once', body: 'Teachers capture marks per assessment; averages and ranges are calculated as they go and flow into report cards.', link: { label: 'Academics & Assessments', href: '/platform/academics-assessments' } },
      { id: 'attendance', label: 'Attendance', shot: 'analytics' as ProductShotKey, title: 'From registers to trends', body: 'Daily registers roll up into an attendance report with a trend line, an attention threshold and alerts.', link: { label: 'Attendance', href: '/platform/attendance' } },
      { id: 'finance', label: 'Finance', shot: 'finance' as ProductShotKey, title: 'A clear collection position', body: 'Billed, collected, outstanding and overdue amounts, the collection rate and balance ageing for the year.', link: { label: 'Fees & Finance', href: '/platform/finance' } },
      { id: 'messages', label: 'Messages', shot: 'communication' as ProductShotKey, title: 'Conversations that stay with the school', body: 'Staff and guardians message each other inside Funda360, with group conversations for teams.', link: { label: 'Communication', href: '/platform/communication' } },
      { id: 'report-cards', label: 'Report cards', shot: 'reporting' as ProductShotKey, title: 'Governed report cards', body: 'Report cards move through review and approval before they are published to families.', link: { label: 'Academics & Assessments', href: '/platform/academics-assessments' } },
    ],
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

  // 11. Differentiation (factual, no unverified outcomes or statistics)
  different: {
    id: 'why-funda360',
    heading: 'What makes Funda360 different',
    intro: 'Designed with South African schools in mind, and precise about what it does.',
    items: [
      { title: 'One record, not bolted-together tools', description: 'Learner, academic, attendance, fee and communication records live in one platform, so information captured once is used everywhere it is needed.' },
      { title: 'Built from the daily work', description: 'Dashboards and reports read from the registers, marks and payments teams already capture, with no spreadsheets to assemble.' },
      { title: 'Security enforced in the platform', description: 'Each school’s data is kept separate and role-based access is enforced in the database, not only hidden in the screens.' },
      { title: 'Honest about what is available', description: 'Every capability on this site is labelled as available today, on the roadmap or still to be confirmed.' },
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
