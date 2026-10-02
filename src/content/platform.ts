import type { ProductShotKey } from './screenshots';
import type { Availability, Faq, Feature, Section, Workflow } from './types';

/* ------------------------------------------------------------------ */
/* Platform overview: the twelve capability areas                      */
/* ------------------------------------------------------------------ */

export type PlatformArea = {
  id: string;
  title: string;
  summary: string;
  /** Detail page, where one exists. Areas without one are explained on /platform. */
  href?: string;
  highlights: string[];
  availability: Availability;
};

export const platformAreas: PlatformArea[] = [
  {
    id: 'learner-management',
    title: 'Learner Management',
    summary: 'One record for every learner, from application and enrolment through to alumni.',
    href: '/platform/learner-management',
    highlights: ['Learner profiles and enrolment history', 'Guardians and emergency contacts', 'Admissions and documents'],
    availability: 'available',
  },
  {
    id: 'educator-management',
    title: 'Educator Management',
    summary: 'Staff records, departments, leave and staff attendance in the same system as the classes they teach.',
    highlights: ['Employee records and departments', 'Leave requests and staff attendance', 'Staff login provisioning'],
    availability: 'available',
  },
  {
    id: 'academics-curriculum',
    title: 'Academics & Curriculum',
    summary: 'Academic years, terms, grades, classes, subjects, teaching assignments and timetables.',
    href: '/platform/academics-assessments',
    highlights: ['Classes, subjects and teaching assignments', 'Timetables with conflict detection', 'Homework and assignments'],
    availability: 'available',
  },
  {
    id: 'assessments-results',
    title: 'Assessments & Results',
    summary: 'Capture assessments and results, then produce governed report cards.',
    href: '/platform/academics-assessments',
    highlights: ['Assessments and gradebook', 'Report-card review and approval workflow', 'Individual and bulk PDF report cards'],
    availability: 'available',
  },
  {
    id: 'attendance',
    title: 'Attendance',
    summary: 'Daily class registers, attendance reporting and alerts when attendance needs attention.',
    href: '/platform/attendance',
    highlights: ['Present, absent and late registers', 'Attendance reports and trends', 'Attendance alerts'],
    availability: 'available',
  },
  {
    id: 'fees-finance',
    title: 'Fees & Finance',
    summary: 'A fee ledger with charges, payments, statements, collections and bank reconciliation.',
    href: '/platform/finance',
    highlights: ['Fee structures, charges and payments', 'Statements and ageing', 'Bank-statement reconciliation'],
    availability: 'available',
  },
  {
    id: 'communication',
    title: 'Communication',
    summary: 'Messaging, announcements and notifications between the school, parents and learners.',
    href: '/platform/communication',
    highlights: ['Direct and group messaging', 'Announcements', 'Notification preferences'],
    availability: 'available',
  },
  {
    id: 'school-administration',
    title: 'School Administration',
    summary: 'School setup, users, onboarding and the academic calendar that everything else depends on.',
    highlights: ['School onboarding and profile', 'User and account management', 'Academic-year transitions'],
    availability: 'available',
  },
  {
    id: 'performance-analytics',
    title: 'Performance Analytics',
    summary: 'Role-based dashboards that summarise what is happening across the school.',
    href: '/platform/analytics',
    highlights: ['Leadership, finance, HR and admissions dashboards', 'Attendance trends', 'Key indicators per area'],
    availability: 'available',
  },
  {
    id: 'reporting',
    title: 'Reporting',
    summary: 'Learner, staff, academic, assessment, attendance and finance reports with exports.',
    href: '/platform/analytics',
    highlights: ['Standard reports per area', 'CSV exports', 'Report-card PDFs'],
    availability: 'available',
  },
  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    summary: 'Each person sees and does only what their role allows, enforced by the platform itself.',
    highlights: ['Detailed role catalogue', 'Separate access to sensitive records', 'Audit trail for sensitive actions'],
    availability: 'available',
  },
  {
    id: 'ai-intelligence',
    title: 'AI & Intelligence',
    summary: 'Connected school information today; intelligence that helps identify where attention may be needed is on the roadmap.',
    href: '/ai',
    highlights: ['Connected data foundation (available)', 'Attendance alerts (available)', 'Learner attention insights (roadmap)'],
    availability: 'roadmap',
  },
];

/**
 * The twelve areas grouped into four connected clusters that follow the
 * Manage → Understand → Act story (used on Home and /platform).
 */
export const platformGroups = [
  { id: 'people', step: 'Manage · People', title: 'People and records', intro: 'Who is in the school, and who may see what.', areaIds: ['learner-management', 'educator-management', 'roles-permissions'] },
  { id: 'teaching', step: 'Manage · Teaching', title: 'Teaching and learning', intro: 'The academic year, from timetable to report card.', areaIds: ['academics-curriculum', 'assessments-results', 'attendance'] },
  { id: 'operations', step: 'Manage · Operations', title: 'School operations', intro: 'The work that keeps the school running.', areaIds: ['fees-finance', 'communication', 'school-administration'] },
  { id: 'insight', step: 'Understand → Act', title: 'Insight', intro: 'What the connected information tells you.', areaIds: ['performance-analytics', 'reporting', 'ai-intelligence'] },
] as const;

/** Extra detail for areas that have no dedicated page, shown on /platform. */
export const platformAreaDetails: Record<string, Feature[]> = {
  'educator-management': [
    { title: 'Employee records', description: 'Staff profiles, departments and employment lifecycle, including termination and reactivation.' },
    { title: 'Leave and staff attendance', description: 'Leave requests and staff attendance recorded alongside the rest of school operations.' },
    { title: 'Staff access', description: 'Provision logins for staff in the roles they hold, such as class teacher, subject teacher or finance.' },
    {
      title: 'Payroll',
      description: 'Payroll processing is not part of the current platform.',
      availability: 'roadmap',
    },
  ],
  'school-administration': [
    { title: 'School onboarding', description: 'A guided setup for a new school and its profile.' },
    { title: 'Users and accounts', description: 'Create and manage user accounts, with email verification, account activation and password recovery.' },
    { title: 'Academic calendar', description: 'Academic years and terms, including a protected switch to the next academic year.' },
  ],
  'roles-permissions': [
    { title: 'Role-based access', description: 'A detailed catalogue of school roles, from principal and teachers to finance, admissions, parents and learners.' },
    { title: 'Enforced in the platform', description: 'Access rules are enforced in the database, not only in the screens people see.' },
    { title: 'Sensitive information', description: 'Medical, behaviour and safeguarding information has its own access controls.' },
    { title: 'Accountability', description: 'Sensitive actions are recorded in an audit log; multi-factor authentication is supported.' },
  ],
};

export const platformOverview = {
  hero: {
    eyebrow: 'Platform',
    heading: 'One connected platform for the whole school',
    intro:
      'Funda360 is school management software that brings the core work of a school into one system. Each area works on its own, and because they share the same learner, class and school records, information captured once can be used everywhere it is needed.',
  },
  connected: {
    id: 'how-it-connects',
    heading: 'How the platform connects',
    intro:
      'The learner record sits at the centre. Classes, assessments, attendance, fees and communication all refer back to it, so leadership can see a complete picture without assembling spreadsheets.',
    points: [
      'A learner is enrolled once and appears in the right classes, registers and fee accounts.',
      'Attendance and conduct can flow into report cards.',
      'Parents and learners see published results, homework and attendance in their own portals.',
      'Dashboards and reports read from the same records the school works in every day.',
    ],
    /** Short titles for the points above, in the same order. */
    pointTitles: ['Enrol once', 'Into report cards', 'Shared with families', 'Reported from the source'],
  } satisfies Section & { points: string[]; pointTitles: string[] },
  areasSection: {
    id: 'capabilities',
    heading: 'Platform capabilities',
    intro: 'Twelve areas, one platform. Select an area to see it in more detail.',
  } satisfies Section,
  portals: {
    id: 'portals',
    heading: 'Portals for parents and learners',
    intro:
      'Parents and learners sign in to their own portals to see the information the school has chosen to share with them: timetables, homework, results, report cards, attendance, documents, announcements and messages.',
    items: [
      { title: 'Parents', description: 'Their children’s attendance, homework, results, report cards, fees, messages and consent choices, where the school shares them.' },
      { title: 'Learners', description: 'Timetable, homework and submissions, results, report cards, attendance, documents and announcements.' },
    ] satisfies Feature[],
  } satisfies Section & { items: Feature[] },
  faqs: [
    {
      question: 'Do we have to use every part of Funda360?',
      answer:
        'The platform is designed so that schools can start with the areas they need most. Talk to the Funda360 team about the right starting point for your school.',
    },
    {
      question: 'Who can see which information?',
      answer:
        'Access is role-based. Teachers, finance staff, leadership, parents and learners each see only what their role allows, and the rules are enforced by the platform itself.',
    },
    {
      question: 'Is Funda360 a mobile app?',
      answer:
        'Funda360 is a responsive web application that works in the browser on phones, tablets and computers. Native mobile apps are not currently available.',
    },
  ] satisfies Faq[],
};

/* ------------------------------------------------------------------ */
/* Platform detail pages                                               */
/* ------------------------------------------------------------------ */

export type CapabilityPageContent = {
  slug: string;
  navLabel: string;
  hero: { eyebrow: string; heading: string; intro: string };
  problem: { heading: string; body: string; points: string[] };
  capabilities: { heading: string; intro: string; items: Feature[] };
  workflows: { heading: string; intro: string; items: Workflow[] };
  shots: ProductShotKey[];
  outcomes: { heading: string; items: Feature[] };
  /** Slugs of related capability pages, plus optional other links. */
  related: { label: string; href: string; description: string }[];
  faqs: Faq[];
  /** Category definition in plain language: answers "what is …?" for search visitors. */
  overview: { heading: string; body: string[] };
  /** Who uses this capability and how. */
  users: { role: string; description: string }[];
  /** Audience solutions this capability matters most to (solution slugs). */
  solutions: string[];
};

export const capabilityPages: CapabilityPageContent[] = [
  {
    slug: 'learner-management',
    navLabel: 'Learner Management',
    overview: {
      heading: 'What is a learner management system?',
      body: [
        'A learner management system, often called a student information system, is a school’s central record of every learner: who they are, where they are enrolled, who their guardians are and what the school needs to know about them.',
        'In Funda360 that record is the foundation for everything else. Classes, attendance, assessments, fees and communication all refer back to the same learner, so information captured at admission is available wherever it is needed, to the people allowed to see it.',
      ],
    },
    users: [
      { role: 'Admissions staff', description: 'Review online applications and required documents, then convert accepted applications into enrolled learners.' },
      { role: 'School administrators', description: 'Maintain learner records, guardians, documents and status changes, and import existing learner lists.' },
      { role: 'Teachers', description: 'See the learners in their classes, with the context their role allows.' },
      { role: 'Guardians', description: 'See their own child’s information in the parent portal.' },
    ],
    solutions: ['schools', 'school-leadership', 'education-groups'],
    hero: {
      eyebrow: 'Platform · Learner Management',
      heading: 'Every learner, one complete record',
      intro:
        'Funda360 keeps each learner’s profile, enrolment history, guardians, documents and school journey together, so the people responsible for that learner work from the same information.',
    },
    problem: {
      heading: 'When learner information lives in many places',
      body: 'Learner details are often spread across admission forms, class lists, spreadsheets, files and messages. Keeping them consistent takes time, and important information can be hard to find when it is needed.',
      points: [
        'Contact details and guardians are updated in one place but not another.',
        'Admission information is re-captured when a learner is enrolled.',
        'Sensitive information is either too hard to reach or too widely visible.',
      ],
    },
    capabilities: {
      heading: 'What Learner Management includes',
      intro: 'The learner record is the centre of Funda360. Everything else connects to it.',
      items: [
        { title: 'Learner registry and profiles', description: 'A searchable registry with a full profile for each learner.' },
        { title: 'Enrolment history', description: 'Enrolment by year, grade and class, with promotion and status changes over time.' },
        { title: 'Guardians and relationships', description: 'Guardians linked to learners, with emergency contacts.' },
        { title: 'Medical information', description: 'Medical details held under separate, stricter access controls.' },
        { title: 'Learner documents', description: 'Documents stored securely against the learner record.' },
        { title: 'Admissions', description: 'Applications, configurable requirements, an online application form and conversion of accepted applications into enrolled learners.' },
        { title: 'Behaviour and safeguarding', description: 'Behaviour incidents and safeguarding records with role-appropriate visibility.' },
        { title: 'Bulk import and alumni', description: 'CSV import for getting started, and an alumni view for learners who have left.' },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How schools typically use Learner Management.',
      items: [
        {
          title: 'From application to enrolled learner',
          steps: [
            'A family submits an application through the school’s online application form.',
            'The admissions team reviews the application and required documents.',
            'An accepted application is converted into a learner, guardian and enrolment record, without re-capturing.',
          ],
        },
        {
          title: 'Keeping a learner record current',
          steps: [
            'Staff update contact details, guardians or documents on the learner profile.',
            'The change is immediately visible to everyone whose role allows it.',
            'Guardians can see their own child’s information in the parent portal.',
          ],
        },
      ],
    },
    shots: ['learnerManagement', 'learnerDirectory', 'parentPortal'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'Less duplicate capturing', description: 'Information captured at admission carries through to enrolment.' },
        { title: 'The right information for the right people', description: 'Sensitive details are protected by role.' },
        { title: 'A foundation for everything else', description: 'Classes, attendance, results and fees all build on the same learner record.' },
      ],
    },
    related: [
      { label: 'Academics & Assessments', href: '/platform/academics-assessments', description: 'Classes, assessments and report cards for every learner.' },
      { label: 'Attendance', href: '/platform/attendance', description: 'Daily registers connected to each learner record.' },
      { label: 'Communication', href: '/platform/communication', description: 'Reach guardians linked to each learner.' },
    ],
    faqs: [
      {
        question: 'Can we import our existing learner list?',
        answer: 'Yes. Funda360 supports learner import from a CSV file. The Funda360 team can advise on preparing your data.',
      },
      {
        question: 'Can parents apply online?',
        answer: 'Yes. Schools can use a public application form, and families can resume an application they started.',
      },
    ],
  },
  {
    slug: 'academics-assessments',
    navLabel: 'Academics & Assessments',
    overview: {
      heading: 'What is academic and assessment management?',
      body: [
        'Academic management is how a school organises teaching: academic years, terms, grades, classes, subjects, teaching assignments and timetables. Assessment management is what follows: setting assessments, capturing results and turning them into report cards.',
        'Funda360 keeps both in one academic management system, so marks captured by teachers flow into governed report cards without re-typing.',
      ],
    },
    users: [
      { role: 'Teachers', description: 'See today’s lessons, take registers, publish homework, capture marks and write report-card comments.' },
      { role: 'Heads of department', description: 'Review report cards for their subjects before approval.' },
      { role: 'Principals and deputies', description: 'Approve and publish report cards and follow academic and assessment reports.' },
      { role: 'Parents and learners', description: 'See published results, homework and report cards in their portals.' },
    ],
    solutions: ['schools', 'school-leadership'],
    hero: {
      eyebrow: 'Platform · Academics & Assessments',
      heading: 'From timetable to report card, in one place',
      intro:
        'Funda360 connects the academic structure of your school with the work of teaching and assessment, so results flow into report cards without re-capturing.',
    },
    problem: {
      heading: 'The academic year has many moving parts',
      body: 'Timetables, mark sheets, homework and report cards are often managed separately. Bringing them together at the end of each term is slow and leaves room for errors.',
      points: [
        'Marks are captured in one place and re-typed into report cards.',
        'Timetable clashes are discovered after the timetable is published.',
        'Report cards go out without a clear review and approval step.',
      ],
    },
    capabilities: {
      heading: 'What Academics & Assessments includes',
      intro: 'The academic structure and the teaching work that depends on it.',
      items: [
        { title: 'Academic structure', description: 'Academic years, terms, grades, classes and subjects.' },
        { title: 'Teaching assignments', description: 'Which teacher teaches which subject to which class.' },
        { title: 'Timetables', description: 'Draft and published timetables with conflict detection.' },
        { title: 'Teacher workspace', description: 'A teacher’s view of today’s lessons, registers, homework to mark and upcoming assessments.' },
        { title: 'Homework and assignments', description: 'Publish assignments, collect submissions, mark, return and track what is missing.' },
        { title: 'Assessments and gradebook', description: 'Create assessments and capture results per class.' },
        { title: 'Report cards', description: 'Grading scales, templates and a review workflow from draft through teacher and head-of-department review to approval and publication.' },
        { title: 'Report-card PDFs', description: 'Individual and bulk PDF report cards, including attendance and conduct snapshots.' },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How academic work moves through Funda360.',
      items: [
        {
          title: 'Setting up the academic year',
          steps: [
            'Leadership sets up the academic year, terms, grades, classes and subjects.',
            'Teaching assignments link teachers to classes and subjects.',
            'The timetable is built, checked for conflicts and published.',
          ],
        },
        {
          title: 'From assessment to published report card',
          steps: [
            'Teachers capture assessment results for their classes.',
            'Report cards are generated using the school’s grading scale and template.',
            'Report cards move through teacher and head-of-department review to approval.',
            'Approved report cards are published to parents and learners and can be printed as PDFs.',
          ],
        },
      ],
    },
    shots: ['academicPerformance', 'reporting'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'Results captured once', description: 'Marks feed the gradebook and report cards directly.' },
        { title: 'Governed report cards', description: 'A clear review and approval path before anything is published.' },
        { title: 'Teachers see their day', description: 'Lessons, registers and marking in one workspace.' },
      ],
    },
    related: [
      { label: 'Attendance', href: '/platform/attendance', description: 'Attendance snapshots appear on report cards.' },
      { label: 'Analytics & Reporting', href: '/platform/analytics', description: 'Academic and assessment reports.' },
      { label: 'Learner Management', href: '/platform/learner-management', description: 'The learner records behind every class.' },
    ],
    faqs: [
      {
        question: 'Can we use our own grading scale and report-card layout?',
        answer: 'Funda360 supports configurable grading scales and report-card templates. Discuss your specific requirements with the Funda360 team.',
      },
      {
        question: 'Can parents see results before report cards are approved?',
        answer: 'No. Report cards are visible to parents and learners only once they have been published.',
      },
    ],
  },
  {
    slug: 'attendance',
    navLabel: 'Attendance',
    overview: {
      heading: 'What is school attendance management?',
      body: [
        'School attendance management is the daily work of recording which learners are present, absent or late, and using that record to notice patterns and follow up with families.',
        'In Funda360 teachers take digital class registers, and every mark is connected to the learner’s record. Attendance then appears in reports and on the leadership dashboard, flows into report cards and reaches guardians through in-app notifications.',
      ],
    },
    users: [
      { role: 'Teachers', description: 'Take the daily register for their own classes.' },
      { role: 'Principals and management', description: 'Record across the school, follow trends and see where attendance needs attention.' },
      { role: 'Guardians', description: 'Receive in-app notifications about their child’s attendance and see it in the parent portal.' },
      { role: 'Learners', description: 'See their own attendance in the learner portal.' },
    ],
    solutions: ['schools', 'school-leadership', 'funders'],
    hero: {
      eyebrow: 'Platform · Attendance',
      heading: 'Know who is in class, and notice patterns early',
      intro:
        'Teachers capture daily registers in Funda360. Because attendance is connected to every learner record, leadership can follow trends and see where attendance needs attention.',
    },
    problem: {
      heading: 'Attendance only helps if someone can act on it',
      body: 'Paper registers and separate spreadsheets record who was absent, but they rarely make patterns visible in time for anyone to respond.',
      points: [
        'Registers are captured but not consolidated.',
        'Repeated absence is noticed late.',
        'Attendance has to be re-captured for report cards.',
      ],
    },
    capabilities: {
      heading: 'What Attendance includes',
      intro: 'Daily capture, reporting and alerts.',
      items: [
        { title: 'Daily class registers', description: 'Present, absent and late, captured by class.' },
        { title: 'Role-appropriate capture', description: 'Teachers record their own classes; management can record across the school.' },
        { title: 'Attendance reports', description: 'Attendance reporting with trend charts and CSV export.' },
        { title: 'Dashboard overview', description: 'Attendance summaries on the leadership dashboard.' },
        { title: 'Guardian notifications', description: 'Guardians receive an in-app notification when their child is marked present, absent or late.' },
        { title: 'Absence alerts', description: 'Guardians are alerted after three consecutive school days of absence.' },
        { title: 'Attention flags', description: 'Learners below the attendance threshold are flagged on their profile and in the attendance report.' },
        { title: 'Parent and learner visibility', description: 'Guardians and learners can see attendance in their portals.' },
        { title: 'Report-card snapshots', description: 'Attendance is carried into report cards automatically.' },
        { title: 'Staff attendance', description: 'Staff attendance is recorded in Educator Management.' },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How attendance moves through the school day.',
      items: [
        {
          title: 'Taking the register',
          steps: [
            'A teacher opens today’s register from their workspace.',
            'Each learner is marked present, absent or late.',
            'The register is saved and immediately reflected in reports and the dashboard.',
          ],
        },
        {
          title: 'Following up on attendance',
          steps: [
            'Leadership reviews attendance trends on the dashboard or in the attendance report.',
            'Learners below the attendance threshold are flagged, and guardians are alerted after three consecutive absences.',
            'Staff follow up with guardians using Funda360 messaging.',
          ],
        },
      ],
    },
    shots: ['attendance', 'analytics', 'parentPortal'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'One source of attendance', description: 'Registers, reports, dashboards and report cards use the same data.' },
        { title: 'Earlier visibility', description: 'Trends and alerts make patterns easier to notice.' },
        { title: 'Families stay informed', description: 'Guardians can see attendance in the parent portal.' },
      ],
    },
    related: [
      { label: 'Analytics & Reporting', href: '/platform/analytics', description: 'Attendance trends alongside other indicators.' },
      { label: 'Communication', href: '/platform/communication', description: 'Follow up with guardians.' },
      { label: 'AI & Intelligence', href: '/ai', description: 'How Funda360 approaches identifying where attention is needed.' },
    ],
    faqs: [
      {
        question: 'Can teachers take attendance on a phone?',
        answer: 'Funda360 is a responsive web application, so registers can be captured in the browser on phones, tablets and computers.',
      },
    ],
  },
  {
    slug: 'finance',
    navLabel: 'Fees & Finance',
    overview: {
      heading: 'What is school fee management?',
      body: [
        'School fee management is how a school bills learner accounts, records payments, applies discounts and bursaries, and keeps track of what is outstanding.',
        'Funda360 keeps a fee ledger for every learner account, connected to the same learner records the rest of the school uses, so the finance office and leadership work from one set of numbers.',
      ],
    },
    users: [
      { role: 'Finance office and bursars', description: 'Set up fee structures, raise charges, record payments, produce statements and reconcile the bank statement.' },
      { role: 'Principals and owners', description: 'Follow the collection position and ageing from the finance overview.' },
      { role: 'Parents', description: 'See fee information for their children in the parent portal.' },
    ],
    solutions: ['schools', 'school-leadership'],
    hero: {
      eyebrow: 'Platform · Fees & Finance',
      heading: 'School fees, clearly accounted for',
      intro:
        'Funda360 keeps a fee ledger for every learner account, from charges and payments to statements, collections and reconciliation, connected to the same learner records the rest of the school uses.',
    },
    problem: {
      heading: 'Fee information is hard to keep consistent',
      body: 'When fees are tracked in a separate accounting tool or spreadsheet, the finance office, leadership and families can each see a different picture.',
      points: [
        'Statements take time to prepare.',
        'Matching bank payments to learner accounts is manual.',
        'Leadership lacks a timely view of collections.',
      ],
    },
    capabilities: {
      heading: 'What Fees & Finance includes',
      intro: 'A fee ledger built for schools.',
      items: [
        { title: 'Fee structures and charges', description: 'Define fee structures and raise charges against learner accounts.' },
        { title: 'Payments and allocations', description: 'Record payments and allocate them to charges.' },
        { title: 'Adjustments, discounts and bursaries', description: 'Discounts, waivers, bursary-style adjustments and refunds with a clear record.' },
        { title: 'Statements', description: 'Learner account statements.' },
        { title: 'Ageing and collections', description: 'Ageing and collection reporting with a finance overview.' },
        { title: 'Bank reconciliation', description: 'Import bank-statement CSV files and confirm matches to payments.' },
        { title: 'Finance exports', description: 'CSV reporting for further analysis.' },
        {
          title: 'Online payments',
          description: 'The platform is built to support online payment providers. Availability depends on provider activation for each school.',
          availability: 'confirm',
        },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How the finance office works in Funda360.',
      items: [
        {
          title: 'Billing and collection',
          steps: [
            'The finance team sets up fee structures for the year.',
            'Charges are raised against learner accounts.',
            'Payments are recorded and allocated; statements reflect the current balance.',
          ],
        },
        {
          title: 'Reconciling the bank statement',
          steps: [
            'The finance team imports the bank statement as a CSV file.',
            'Each bank line is shown alongside the unreconciled payments it could match.',
            'A person matches and confirms each line; unmatched lines stay visible until resolved.',
          ],
        },
      ],
    },
    shots: ['finance'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'A single fee ledger', description: 'Every charge, payment and adjustment in one place.' },
        { title: 'Clearer collections', description: 'Leadership can see the collection position from the finance overview.' },
        { title: 'Human-confirmed reconciliation', description: 'Bank lines and payments are reconciled in one workspace, and a person always confirms each match.' },
      ],
    },
    related: [
      { label: 'Analytics & Reporting', href: '/platform/analytics', description: 'Finance indicators on the dashboard.' },
      { label: 'Learner Management', href: '/platform/learner-management', description: 'Fee accounts linked to learner records.' },
      { label: 'School Leadership', href: '/solutions/school-leadership', description: 'Financial visibility for owners and leadership.' },
    ],
    faqs: [
      {
        question: 'Can parents pay fees online?',
        answer:
          'Funda360 includes the architecture for online payments, but live online payment depends on a payment provider being activated for your school. Ask the Funda360 team about current options.',
      },
      {
        question: 'Does Funda360 replace our accounting system?',
        answer: 'Funda360 manages school fees and learner accounts. It is not a general-ledger accounting or payroll system.',
      },
    ],
  },
  {
    slug: 'communication',
    navLabel: 'Communication',
    overview: {
      heading: 'What is a school communication platform?',
      body: [
        'A school communication platform gives staff, parents and learners one place to message each other, receive announcements and be notified about what matters, instead of scattered personal channels and outdated contact lists.',
        'In Funda360 communication runs on current learner, guardian and class records, and parents and learners each have their own portal.',
      ],
    },
    users: [
      { role: 'Teachers and staff', description: 'Message colleagues and guardians, individually or in groups.' },
      { role: 'Leadership', description: 'Make announcements to staff, guardians or everyone.' },
      { role: 'Parents', description: 'Message staff and see announcements, notifications and their children’s information in the parent portal.' },
      { role: 'Learners', description: 'See announcements, homework and notifications in the learner portal.' },
    ],
    solutions: ['schools', 'school-leadership'],
    hero: {
      eyebrow: 'Platform · Communication',
      heading: 'School communication, connected to the right people',
      intro:
        'Messages, announcements and notifications in Funda360 use the same learner, guardian and class records as the rest of the platform, so communication reaches the people it is meant for.',
    },
    problem: {
      heading: 'Communication is scattered across channels',
      body: 'Schools communicate through many separate channels. Contact lists drift out of date, and important conversations are hard to find later.',
      points: [
        'Contact groups are maintained by hand.',
        'Conversations with families are spread across personal devices.',
        'There is no shared record of what was communicated.',
      ],
    },
    capabilities: {
      heading: 'What Communication includes',
      intro: 'Messaging, announcements and notifications.',
      items: [
        { title: 'Direct and group messaging', description: 'Conversations between staff, and between staff and guardians, with attachments.' },
        { title: 'Role-aware rules', description: 'Staff can message anyone in the school; guardians can message staff.' },
        { title: 'Announcements', description: 'School announcements to defined audiences.' },
        { title: 'In-app notifications', description: 'Notifications for events such as homework and attendance.' },
        { title: 'Notification preferences', description: 'Each person chooses channels and quiet hours.' },
        {
          title: 'Email, SMS and WhatsApp delivery',
          description: 'Delivery architecture is in place; external channels depend on provider configuration for each school.',
          availability: 'confirm',
        },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How communication works in Funda360.',
      items: [
        {
          title: 'Talking to a guardian',
          steps: [
            'A teacher starts a conversation with a learner’s guardian.',
            'The guardian receives a notification and replies from the parent portal.',
            'The conversation remains available to both, with read status.',
          ],
        },
        {
          title: 'Making an announcement',
          steps: ['A staff member writes an announcement and chooses its audience.', 'The announcement appears for the chosen audience in their portal or workspace.'],
        },
      ],
    },
    shots: ['communication'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'Up-to-date audiences', description: 'Communication uses current learner and guardian records.' },
        { title: 'A shared record', description: 'Conversations live in the school’s system, not on personal devices.' },
        { title: 'Respect for preferences', description: 'People control how and when they are notified.' },
      ],
    },
    related: [
      { label: 'Learner Management', href: '/platform/learner-management', description: 'Guardians linked to every learner.' },
      { label: 'Attendance', href: '/platform/attendance', description: 'Follow up on attendance with families.' },
      { label: 'Schools', href: '/solutions/schools', description: 'How school teams use Funda360 day to day.' },
    ],
    faqs: [
      {
        question: 'Will parents receive SMS or WhatsApp messages?',
        answer:
          'Funda360 supports in-app notifications today. Email, SMS and WhatsApp delivery depend on provider configuration for each school; the Funda360 team can confirm what is available for you.',
      },
    ],
  },
  {
    slug: 'analytics',
    navLabel: 'Analytics & Reporting',
    overview: {
      heading: 'What are school analytics and reporting?',
      body: [
        'School analytics and reporting turn the records a school keeps every day into summaries leadership can act on: who is enrolled, how attendance is trending, how classes are performing and what the fee collection position is.',
        'Because Funda360 records daily school work in one place, its dashboards and reports read from the same data, with no separate spreadsheets to assemble.',
      ],
    },
    users: [
      { role: 'Principals and leadership', description: 'Follow learners, staff, attendance and fee collection on the leadership dashboard.' },
      { role: 'Finance', description: 'Use the finance dashboard and collection reporting.' },
      { role: 'HR', description: 'Use staff reports and the HR dashboard.' },
      { role: 'Admissions', description: 'Follow applications on the admissions dashboard.' },
    ],
    solutions: ['school-leadership', 'education-groups', 'funders'],
    hero: {
      eyebrow: 'Platform · Analytics & Reporting',
      heading: 'See what is happening across your school',
      intro:
        'Because Funda360 records daily school work in one place, dashboards and reports can summarise it without anyone assembling spreadsheets.',
    },
    problem: {
      heading: 'Reports that arrive too late to help',
      body: 'When information lives in separate systems, reporting means collecting and combining files by hand. By the time a report is ready, the moment to act may have passed.',
      points: ['Leadership waits for reports to be compiled.', 'Different reports disagree.', 'Trends are difficult to see.'],
    },
    capabilities: {
      heading: 'What Analytics & Reporting includes',
      intro: 'Dashboards for each role and standard reports for each area.',
      items: [
        { title: 'Role-based dashboards', description: 'Dashboards for leadership, finance, HR and admissions, each showing what matters to that role.' },
        { title: 'Learner and staff reports', description: 'Reports on learners and employees.' },
        { title: 'Academic and assessment reports', description: 'Reports on academic structure and assessment results.' },
        { title: 'Attendance reports', description: 'Attendance reports with trend charts.' },
        { title: 'Finance indicators', description: 'Finance overview with collection and ageing indicators.' },
        { title: 'Exports', description: 'CSV exports for further analysis and report-card PDFs.' },
        {
          title: 'Cross-area and multi-school analytics',
          description: 'Broader analytics across areas and across schools is planned.',
          availability: 'roadmap',
        },
      ],
    },
    workflows: {
      heading: 'Key workflows',
      intro: 'How leadership uses analytics and reporting.',
      items: [
        {
          title: 'A weekly leadership review',
          steps: [
            'Leadership opens the dashboard for a summary of attendance, learners and finance.',
            'Where something stands out, they open the relevant report.',
            'They export the data if it needs to be shared or analysed further.',
          ],
        },
      ],
    },
    shots: ['dashboard', 'analytics'],
    outcomes: {
      heading: 'What this means for your school',
      items: [
        { title: 'Faster answers', description: 'Reports are generated from live school records.' },
        { title: 'One version of the truth', description: 'Every report reads from the same data.' },
        { title: 'Informed decisions', description: 'Leadership can see trends rather than snapshots.' },
      ],
    },
    related: [
      { label: 'AI & Intelligence', href: '/ai', description: 'The next step beyond dashboards and reports.' },
      { label: 'School Leadership', href: '/solutions/school-leadership', description: 'Oversight for principals and owners.' },
      { label: 'Attendance', href: '/platform/attendance', description: 'Attendance trends and alerts.' },
    ],
    faqs: [
      {
        question: 'Can we export our data?',
        answer: 'Yes. Reports can be exported as CSV files, and report cards can be produced as PDFs.',
      },
      {
        question: 'Can a group see analytics across several schools?',
        answer: 'Cross-school analytics is on the roadmap. Each school currently has its own dashboards and reports.',
      },
    ],
  },
];

export function getCapabilityPage(slug: string): CapabilityPageContent {
  const page = capabilityPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown capability page: ${slug}`);
  return page;
}
