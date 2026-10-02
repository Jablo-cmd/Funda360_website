/**
 * SEO source of truth: keyword map, per-route metadata and content plan.
 *
 * Every indexable route has ONE primary search intent and a few secondary
 * intents. Copy on the page should cover these naturally; never stuff
 * keywords. Titles are written in full here (no automatic suffix) so each
 * can balance brand and search intent on its own terms.
 *
 * `lastModified` is the date the page's substantive content last changed;
 * update it when you change a page's copy. It feeds sitemap.xml.
 */

export type RouteSeo = {
  path: string;
  /** Full <title>. Keep under ~60 characters. */
  title: string;
  /** Meta description. Aim for 120–160 characters. */
  description: string;
  /** Shorter, punchier title for social cards (Open Graph / X). Falls back to `title`. */
  socialTitle?: string;
  primaryIntent: string;
  secondaryIntents: string[];
  /** ISO date of the last substantive content change. */
  lastModified: string;
  /** Utility or placeholder pages are kept out of search results and the sitemap. */
  noIndex?: boolean;
};

const UPDATED = '2026-10-02';

export const routeSeo = {
  '/': {
    path: '/',
    title: 'Funda360 | School Management Platform for Modern Schools',
    description:
      'Funda360 is a connected school management platform: learner records, academics, attendance, fees, communication and reporting in one system for schools.',
    socialTitle: 'Funda360: the operating platform for modern schools',
    primaryIntent: 'school management platform',
    secondaryIntents: ['school management system', 'school management system South Africa', 'school software', 'school information management system'],
    lastModified: UPDATED,
  },
  '/platform': {
    path: '/platform',
    title: 'School Management Software Platform | Funda360',
    description:
      'Explore Funda360 school management software: learners, academics, assessments, attendance, fees, communication, analytics, reporting and roles in one connected platform.',
    socialTitle: 'The Funda360 school management platform',
    primaryIntent: 'school management software',
    secondaryIntents: ['school administration system', 'school ERP software', 'education management software', 'school management software South Africa'],
    lastModified: UPDATED,
  },
  '/platform/learner-management': {
    path: '/platform/learner-management',
    title: 'Learner Management System for Schools | Funda360',
    description:
      'Keep every learner’s profile, enrolment, guardians, documents and admissions in one record. Funda360 learner management for schools, with role-based access.',
    socialTitle: 'Learner management: every learner, one complete record',
    primaryIntent: 'learner management system',
    secondaryIntents: ['student information system', 'learner information system', 'school admissions software', 'learner records'],
    lastModified: UPDATED,
  },
  '/platform/academics-assessments': {
    path: '/platform/academics-assessments',
    title: 'Academic & Assessment Management | Funda360',
    description:
      'Classes, subjects, timetables, homework, assessments and governed report cards in one academic management system. Results are captured once and flow into report cards.',
    socialTitle: 'From timetable to report card, in one place',
    primaryIntent: 'assessment management system',
    secondaryIntents: ['academic management system', 'digital report cards', 'school gradebook', 'school timetable software'],
    lastModified: UPDATED,
  },
  '/platform/attendance': {
    path: '/platform/attendance',
    title: 'School Attendance Management Software | Funda360',
    description:
      'Digital class registers, attendance trends and reports, and automatic in-app guardian notifications. Funda360 attendance management helps schools notice patterns early.',
    socialTitle: 'School attendance management, connected to every learner',
    primaryIntent: 'school attendance management',
    secondaryIntents: ['attendance management system', 'digital attendance register', 'school attendance software South Africa', 'attendance tracking'],
    lastModified: UPDATED,
  },
  '/platform/finance': {
    path: '/platform/finance',
    title: 'School Fee Management Software | Funda360',
    description:
      'Fee structures, charges, payments, statements, ageing and human-confirmed bank reconciliation. Funda360 school fee management keeps the finance office and leadership aligned.',
    socialTitle: 'School fees, clearly accounted for',
    primaryIntent: 'school fee management',
    secondaryIntents: ['school finance software', 'school fee management software South Africa', 'school billing', 'school bank reconciliation'],
    lastModified: UPDATED,
  },
  '/platform/communication': {
    path: '/platform/communication',
    title: 'School Communication Platform & Parent Portal | Funda360',
    description:
      'Messaging, announcements, notifications and parent and learner portals, built on current guardian and class records. School communication that reaches the right people.',
    socialTitle: 'School communication and parent portals, connected',
    primaryIntent: 'school communication platform',
    secondaryIntents: ['parent portal', 'learner portal', 'parent-school communication', 'school messaging'],
    lastModified: UPDATED,
  },
  '/platform/analytics': {
    path: '/platform/analytics',
    title: 'School Analytics, Dashboards & Reporting | Funda360',
    description:
      'Role-based school dashboards and standard reports for learners, staff, academics, attendance and finance, with CSV exports and report-card PDFs.',
    socialTitle: 'See what is happening across your school',
    primaryIntent: 'school analytics and reporting',
    secondaryIntents: ['school dashboard', 'school reporting software', 'school performance reporting', 'school data'],
    lastModified: UPDATED,
  },
  '/ai': {
    path: '/ai',
    title: 'AI in Education & School Intelligence | Funda360',
    description:
      'How Funda360 approaches responsible school intelligence: what is available today, what is on the roadmap, and why people always make the decisions.',
    socialTitle: 'Responsible school intelligence, starting with connected information',
    primaryIntent: 'school intelligence',
    secondaryIntents: ['AI in education', 'responsible AI in schools', 'school data intelligence', 'learner data'],
    lastModified: UPDATED,
  },
  '/solutions': {
    path: '/solutions',
    title: 'School Management Solutions by Role | Funda360',
    description:
      'Funda360 for school teams, principals and owners, education groups and funders. See how one connected school management platform serves each role.',
    socialTitle: 'Funda360 for everyone responsible for a school',
    primaryIntent: 'school management solutions',
    secondaryIntents: ['school software for principals', 'school software for education groups'],
    lastModified: UPDATED,
  },
  '/solutions/schools': {
    path: '/solutions/schools',
    title: 'School Administration Software for School Teams | Funda360',
    description:
      'One workspace per role for administrators, teachers, finance and admissions staff. Funda360 school administration software runs the school day on shared records.',
    socialTitle: 'Run your school from one connected platform',
    primaryIntent: 'school administration software',
    secondaryIntents: ['school administration software South Africa', 'school management system for schools', 'teacher workspace'],
    lastModified: UPDATED,
  },
  '/solutions/school-leadership': {
    path: '/solutions/school-leadership',
    title: 'School Leadership Dashboard for Principals & Owners | Funda360',
    description:
      'Attendance, assessment and fee-collection visibility for principals and school owners, with governed report cards, role-based access and an audit trail.',
    socialTitle: 'Visibility across your school’s operations and performance',
    primaryIntent: 'school leadership dashboard',
    secondaryIntents: ['principal dashboard', 'school performance reporting', 'school oversight'],
    lastModified: UPDATED,
  },
  '/solutions/education-groups': {
    path: '/solutions/education-groups',
    title: 'Multi-School Management Platform for Education Groups | Funda360',
    description:
      'Run every school in your group on one consistent platform, with each school’s information kept securely separate. Group-level reporting is on the roadmap.',
    socialTitle: 'One consistent platform across every school in your group',
    primaryIntent: 'multi-school management',
    secondaryIntents: ['education group software', 'school group management', 'multi-tenant school system'],
    lastModified: UPDATED,
  },
  '/solutions/funders': {
    path: '/solutions/funders',
    title: 'Reliable School Information for Education Funders | Funda360',
    description:
      'How Funda360 helps the schools you support keep reliable attendance, academic and operational records, with privacy built in. Programme-level reporting is on the roadmap.',
    socialTitle: 'Stronger school information for the programmes you support',
    primaryIntent: 'education programme information',
    secondaryIntents: ['school data for funders', 'education programme monitoring'],
    lastModified: UPDATED,
  },
  '/about': {
    path: '/about',
    title: 'About Funda360 | Built by Auris Nexus Technologies',
    description:
      'Why Funda360 exists, how it connects fragmented school information, and how Auris Nexus Technologies builds it with privacy and honesty about the product.',
    socialTitle: 'About Funda360',
    primaryIntent: 'about Funda360',
    secondaryIntents: ['Auris Nexus Technologies', 'school management software company South Africa'],
    lastModified: UPDATED,
  },
  '/security': {
    path: '/security',
    title: 'Security & Data Protection for School Information | Funda360',
    description:
      'How Funda360 protects school information: each school’s data kept separate, role-based access, audit logging, multi-factor authentication and consent records.',
    socialTitle: 'How Funda360 protects school information',
    primaryIntent: 'school data protection',
    secondaryIntents: ['POPIA school software', 'school data security', 'role-based access'],
    lastModified: UPDATED,
  },
  '/resources': {
    path: '/resources',
    title: 'School Management Insights & Resources | Funda360',
    description:
      'Practical insights on school management systems, attendance, assessment, school finance, parent communication and the responsible use of AI in schools.',
    socialTitle: 'Funda360 insights for schools',
    primaryIntent: 'school management resources',
    secondaryIntents: ['school management insights', 'education technology articles'],
    lastModified: UPDATED,
  },
  '/request-demo': {
    path: '/request-demo',
    title: 'Request a Demo of Funda360 School Management Software',
    description:
      'Book a Funda360 walkthrough focused on your school, group or programme. Tell us what matters to you and the Funda360 team will arrange a demo.',
    socialTitle: 'See Funda360 in action',
    primaryIntent: 'school management software demo',
    secondaryIntents: ['school management system demo', 'Funda360 demo'],
    lastModified: UPDATED,
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Funda360',
    description: 'The Funda360 website privacy policy. The final policy is pending legal review; this page explains what the website does today.',
    primaryIntent: 'Funda360 privacy policy',
    secondaryIntents: [],
    lastModified: UPDATED,
    noIndex: true,
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use | Funda360',
    description: 'Terms of use for the Funda360 website. The final terms are pending legal review.',
    primaryIntent: 'Funda360 terms of use',
    secondaryIntents: [],
    lastModified: UPDATED,
    noIndex: true,
  },
  '/login': {
    path: '/login',
    title: 'Login | Funda360',
    description: 'Sign in to the Funda360 application.',
    primaryIntent: 'Funda360 login',
    secondaryIntents: [],
    lastModified: UPDATED,
    noIndex: true,
  },
} satisfies Record<string, RouteSeo>;

export type SeoPath = keyof typeof routeSeo;

export function seoFor(path: SeoPath): RouteSeo {
  return routeSeo[path];
}

/**
 * Content plan: the first editorial cluster, shown on /resources while no
 * article is published. Briefs (target intent, required links, what must not
 * be claimed) are in src/content/editorial.ts. Write, review and publish the
 * articles through src/content/resources.ts.
 */
export const contentClusters = [
  {
    cluster: 'School management',
    supports: '/platform',
    topics: ['What is a school management system?', 'What should school management software include?'],
  },
  {
    cluster: 'Attendance',
    supports: '/platform/attendance',
    topics: ['Digital school attendance management', 'Improving attendance tracking in schools'],
  },
  {
    cluster: 'Finance',
    supports: '/platform/finance',
    topics: ['School fee management software explained'],
  },
  {
    cluster: 'Academics',
    supports: '/platform/academics-assessments',
    topics: ['Digital academic and assessment management'],
  },
  {
    cluster: 'AI in education',
    supports: '/ai',
    topics: ['Practical uses of AI in school management', 'Responsible AI in education'],
  },
] as const;
