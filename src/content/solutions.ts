import type { ProductShotKey } from './screenshots';
import type { Availability, Faq, Feature, SeoFields } from './types';

/**
 * Solutions by audience. Each audience gets a deliberately different page
 * structure (see `sections`) instead of one duplicated template.
 */

export type SolutionSection =
  | { kind: 'challenges'; heading: string; intro?: string; items: Feature[] }
  | { kind: 'roles'; heading: string; intro?: string; items: { role: string; description: string; href?: string }[] }
  | { kind: 'dayInLife'; heading: string; intro?: string; items: { time: string; description: string }[] }
  | { kind: 'questions'; heading: string; intro?: string; items: { question: string; answer: string; href?: string }[] }
  | { kind: 'capabilities'; heading: string; intro?: string; items: (Feature & { href?: string })[] }
  | { kind: 'shots'; heading: string; intro?: string; shots: ProductShotKey[] }
  | { kind: 'considerations'; heading: string; intro?: string; items: Feature[] };

export type SolutionPageContent = {
  slug: string;
  navLabel: string;
  audience: string;
  summary: string;
  seo: SeoFields;
  hero: { eyebrow: string; heading: string; intro: string };
  sections: SolutionSection[];
  faqs: Faq[];
  cta: { heading: string; body: string };
  availability: Availability;
};

export const solutionsOverview = {
  seo: {
    title: 'Solutions',
    description:
      'Funda360 for schools, school owners and leadership, education groups and funders. See how connected school information supports each audience.',
  } satisfies SeoFields,
  hero: {
    eyebrow: 'Solutions',
    heading: 'Built for everyone responsible for a school',
    intro: 'The same connected platform serves different people in different ways. Choose the view that fits you.',
  },
};

export const solutionPages: SolutionPageContent[] = [
  {
    slug: 'schools',
    navLabel: 'Schools',
    audience: 'School teams: administrators, teachers, finance and admissions staff',
    summary: 'Run the daily work of the school in one connected platform.',
    availability: 'available',
    seo: {
      title: 'Funda360 for Schools',
      description:
        'How Funda360 supports school administrators, teachers, finance and admissions teams with connected learner, academic, attendance, fee and communication workflows.',
    },
    hero: {
      eyebrow: 'Solutions · Schools',
      heading: 'One platform for the people who run the school day',
      intro:
        'Administrators, teachers, finance and admissions staff each have their own work to do. Funda360 gives every role its own workspace, built on the same school records.',
    },
    sections: [
      {
        kind: 'challenges',
        heading: 'What school teams tell us gets in the way',
        items: [
          { title: 'Capturing the same thing twice', description: 'Learner details, marks and attendance re-typed into different systems.' },
          { title: 'Searching for information', description: 'Answers spread across files, spreadsheets and inboxes.' },
          { title: 'End-of-term pressure', description: 'Report cards assembled by hand under time pressure.' },
        ],
      },
      {
        kind: 'roles',
        heading: 'A workspace for every role',
        intro: 'Each person sees what their role needs, and nothing they should not.',
        items: [
          { role: 'Administrators', description: 'Learner records, admissions, users and the academic calendar.', href: '/platform/learner-management' },
          { role: 'Teachers', description: 'Today’s lessons, registers, homework to mark and assessments.', href: '/platform/academics-assessments' },
          { role: 'Finance office', description: 'Fee ledger, statements, collections and reconciliation.', href: '/platform/finance' },
          { role: 'Admissions', description: 'Applications, requirements and enrolment.', href: '/platform/learner-management' },
          { role: 'Parents and learners', description: 'Their own portal for results, homework, attendance and messages.', href: '/platform#portals' },
        ],
      },
      {
        kind: 'dayInLife',
        heading: 'A school day with Funda360',
        intro: 'An illustrative example of how the platform fits into a normal day.',
        items: [
          { time: 'Morning', description: 'Teachers take registers from their workspace; attendance is visible to leadership straight away.' },
          { time: 'During the day', description: 'Homework is published and parents can see it in the parent portal.' },
          { time: 'Afternoon', description: 'The finance office records payments and reconciles the bank statement.' },
          { time: 'End of term', description: 'Results flow into report cards, which are reviewed, approved and published.' },
        ],
      },
      { kind: 'shots', heading: 'See the school workspace', shots: ['attendance', 'academicPerformance'] },
    ],
    faqs: [
      {
        question: 'How long does it take to get started?',
        answer: 'This depends on the size of the school and the areas you start with. The Funda360 team will plan onboarding with you.',
      },
      {
        question: 'Do teachers need training?',
        answer: 'The Funda360 team provides onboarding guidance for school roles. Ask about the support available for your school.',
      },
    ],
    cta: {
      heading: 'See how Funda360 would work in your school',
      body: 'Book a demo and we will walk through the workflows your team uses every day.',
    },
  },
  {
    slug: 'school-leadership',
    navLabel: 'School Owners & Leadership',
    audience: 'Principals, deputy principals, school owners and governing leadership',
    summary: 'See what is happening across the school and where attention may be needed.',
    availability: 'available',
    seo: {
      title: 'Funda360 for School Owners & Leadership',
      description:
        'Funda360 gives principals and school owners a connected view of learners, attendance, academic performance and finances, with role-based dashboards and reports.',
    },
    hero: {
      eyebrow: 'Solutions · School Owners & Leadership',
      heading: 'A clear view of your school, without waiting for reports',
      intro:
        'Leadership needs to know how the school is doing: learners, attendance, results and finances. Funda360 brings this together from the work your teams already do.',
    },
    sections: [
      {
        kind: 'questions',
        heading: 'Questions leadership can answer with Funda360',
        intro: 'Examples of the questions dashboards and reports are designed to help with.',
        items: [
          { question: 'How is attendance this week, and where is it a concern?', answer: 'Attendance overview on the leadership dashboard, with trends and alerts.', href: '/platform/attendance' },
          { question: 'How are classes performing in assessments?', answer: 'Academic and assessment reports.', href: '/platform/analytics' },
          { question: 'What is our fee collection position?', answer: 'Finance overview with collection and ageing indicators.', href: '/platform/finance' },
          { question: 'Are report cards ready to publish?', answer: 'Report-card workflow status from draft to published.', href: '/platform/academics-assessments' },
        ],
      },
      { kind: 'shots', heading: 'The leadership view', shots: ['dashboard', 'finance'] },
      {
        kind: 'capabilities',
        heading: 'Oversight with control',
        items: [
          { title: 'Role-based dashboards', description: 'A leadership dashboard focused on the indicators that matter.', href: '/platform/analytics' },
          { title: 'Governed processes', description: 'Review and approval steps for report cards and protected academic-year transitions.', href: '/platform/academics-assessments' },
          { title: 'Accountability', description: 'Audit logging for sensitive actions and role-based access for every user.', href: '/platform#roles-permissions' },
          { title: 'Leadership insights', description: 'Plain-language summaries of what needs attention.', availability: 'roadmap', href: '/ai' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can owners see the school’s finances?',
        answer: 'Yes, where their role allows. Finance dashboards and reports are available to roles with financial access.',
      },
    ],
    cta: {
      heading: 'See the leadership view',
      body: 'Book a demo focused on dashboards, reporting and oversight for principals and owners.',
    },
  },
  {
    slug: 'education-groups',
    navLabel: 'Education Groups',
    audience: 'Organisations that operate or support more than one school',
    summary: 'A consistent platform across schools, with each school’s data kept separate.',
    availability: 'available',
    seo: {
      title: 'Funda360 for Education Groups',
      description:
        'Funda360 for education groups running several schools: a consistent platform for every school, with each school’s information kept securely separate.',
    },
    hero: {
      eyebrow: 'Solutions · Education Groups',
      heading: 'A consistent platform across every school in your group',
      intro:
        'Funda360 is built as a multi-school platform. Every school runs on the same system, and each school’s information is kept securely separate from the others.',
    },
    sections: [
      {
        kind: 'challenges',
        heading: 'The challenge of running several schools',
        items: [
          { title: 'Different systems at each school', description: 'Comparing schools is hard when each works differently.' },
          { title: 'Onboarding new schools', description: 'Every new school means another setup project.' },
          { title: 'Keeping information separate', description: 'Each school’s learner and financial information must stay protected.' },
        ],
      },
      {
        kind: 'capabilities',
        heading: 'How Funda360 supports groups',
        items: [
          { title: 'Multi-school architecture', description: 'Each school is its own secure space on a shared platform.', availability: 'available' },
          { title: 'Consistent ways of working', description: 'Every school uses the same workflows for learners, academics, attendance and fees.', availability: 'available' },
          { title: 'Guided school onboarding', description: 'A setup process for adding each school.', availability: 'available' },
          { title: 'Group-level reporting', description: 'Consolidated views and analytics across schools.', availability: 'roadmap', href: '/platform/analytics' },
          { title: 'Group administration model', description: 'How group-level staff access several schools.', availability: 'confirm' },
        ],
      },
      {
        kind: 'considerations',
        heading: 'Planning a group rollout',
        intro: 'Topics we work through with education groups.',
        items: [
          { title: 'Rollout sequence', description: 'Which schools and which areas to start with.' },
          { title: 'Data migration', description: 'Bringing existing learner and fee information across.' },
          { title: 'Roles across schools', description: 'Who needs access to what, at school and group level.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can one person work across several of our schools?',
        answer: 'Group-level access arrangements should be confirmed with the Funda360 team for your specific structure.',
      },
      {
        question: 'Is each school’s data kept separate?',
        answer: 'Yes. Funda360 is designed so that each school’s information is isolated, and this is enforced by the platform’s database.',
      },
    ],
    cta: {
      heading: 'Plan a rollout across your schools',
      body: 'Talk to the Funda360 team about a phased approach for your group.',
    },
  },
  {
    slug: 'funders',
    navLabel: 'Funders',
    audience: 'Foundations, donors, development partners and programme funders supporting schools',
    summary: 'Help the schools you support build reliable, connected information.',
    availability: 'confirm',
    seo: {
      title: 'Funda360 for Funders & Education Partners',
      description:
        'How Funda360 can support funders and education partners who invest in schools: connected, reliable school information as a foundation for programmes.',
    },
    hero: {
      eyebrow: 'Solutions · Funders',
      heading: 'Stronger school information for the programmes you support',
      intro:
        'Funders and education partners rely on schools to understand what is happening on the ground. Funda360 helps the schools you support keep reliable, connected information about their learners and operations.',
    },
    sections: [
      {
        kind: 'challenges',
        heading: 'Why school information matters to funders',
        items: [
          { title: 'Understanding the starting point', description: 'Reliable baseline information is hard to gather when schools keep records on paper or in spreadsheets.' },
          { title: 'Following progress', description: 'Attendance and academic information can be difficult to compare over time.' },
          { title: 'Strengthening school capacity', description: 'Better systems help school teams run their schools, not only report on them.' },
        ],
      },
      {
        kind: 'capabilities',
        heading: 'How Funda360 can help',
        items: [
          { title: 'Connected records in each school', description: 'Learner, attendance, academic and fee information recorded in one platform.', availability: 'available' },
          { title: 'School-level reports and exports', description: 'Standard reports and CSV exports that schools can share.', availability: 'available' },
          { title: 'Privacy by design', description: 'Role-based access and consent records help schools protect learner information.', availability: 'available' },
          { title: 'Programme-level reporting for funders', description: 'Aggregated, privacy-respecting reporting across supported schools.', availability: 'roadmap' },
          { title: 'Funding and partnership models', description: 'How funders can support Funda360 adoption in schools.', availability: 'confirm' },
        ],
      },
      {
        kind: 'considerations',
        heading: 'Questions to explore together',
        items: [
          { title: 'Which schools and how many', description: 'The scope of the schools you support.' },
          { title: 'What information matters', description: 'The indicators that matter to your programme.' },
          { title: 'Consent and privacy', description: 'How learner information is protected and what can be shared, and with whom.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can funders see learner-level information?',
        answer:
          'Learner information belongs to the school and is protected by role-based access and privacy controls. Any reporting arrangement with funders must respect consent and privacy requirements.',
      },
    ],
    cta: {
      heading: 'Explore a partnership',
      body: 'Talk to the Funda360 team about supporting the schools in your programme.',
    },
  },
];

export function getSolutionPage(slug: string): SolutionPageContent {
  const page = solutionPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown solution page: ${slug}`);
  return page;
}
