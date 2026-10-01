import type { Faq, Feature, SeoFields } from './types';

/**
 * AI & Intelligence positioning.
 *
 * Source of truth: the Funda360 application's current-state register lists
 * "Funda AI / school intelligence" as a ROADMAP item. Nothing on this page may
 * describe AI functionality as available today. What IS available is the
 * connected data foundation, dashboards, reports and attendance alerts that
 * any future intelligence depends on.
 */
export const aiPage = {
  seo: {
    title: 'AI & Intelligence',
    description:
      'How Funda360 approaches school intelligence: connected school information that helps people understand what is happening and identify where attention may be needed. What is available today and what is on the roadmap.',
  } satisfies SeoFields,
  hero: {
    eyebrow: 'AI & Intelligence',
    heading: 'Intelligence starts with connected school information',
    intro:
      'Funda360 connects school information so that people can understand what is happening and identify where attention may be needed. Intelligence is only as good as the information beneath it, which is why Funda360 starts with the connected foundation.',
  },
  principle: {
    heading: 'Our approach',
    body: 'Funda360 treats intelligence as support for people, not a replacement for them. Teachers, leaders and families make the decisions; the platform helps them see clearly and sooner.',
    points: [
      { title: 'People decide', description: 'Insights point to where attention may be needed. A person always decides what to do.' },
      { title: 'Explainable', description: 'Any indicator should show the school information it is based on.' },
      { title: 'Respectful of privacy', description: 'Intelligence works within the same role-based access rules as the rest of the platform.' },
      { title: 'Honest about maturity', description: 'We label what is available today and what is still on the roadmap.' },
    ] satisfies Feature[],
  },
  available: {
    heading: 'Available today',
    intro: 'The foundation for school intelligence, already part of the Funda360 platform.',
    items: [
      {
        title: 'Connected school information',
        description: 'Learners, classes, assessments, attendance, fees and communication share the same records.',
        availability: 'available',
      },
      {
        title: 'Role-based dashboards',
        description: 'Leadership, finance, HR and admissions dashboards summarise what is happening.',
        availability: 'available',
      },
      {
        title: 'Attendance trends and alerts',
        description: 'Attendance reports show trends, and attendance alerts highlight where attention may be needed.',
        availability: 'available',
      },
      {
        title: 'Reports across school areas',
        description: 'Learner, staff, academic, assessment, attendance and finance reports with exports.',
        availability: 'available',
      },
    ] satisfies Feature[],
  },
  roadmap: {
    heading: 'On the roadmap',
    intro:
      'These are directions we are exploring for Funda AI and school intelligence. They are concepts, not current features, and their scope and timing are not yet confirmed.',
    items: [
      {
        title: 'Learner attention areas',
        description: 'Bringing attendance, results and other signals together to suggest learners who may benefit from a conversation or support.',
        availability: 'roadmap',
      },
      {
        title: 'Performance trends',
        description: 'Highlighting changes in assessment results across classes, subjects and terms.',
        availability: 'roadmap',
      },
      {
        title: 'Attendance concerns',
        description: 'Moving from individual alerts to patterns across a learner’s attendance over time.',
        availability: 'roadmap',
      },
      {
        title: 'Learner insights',
        description: 'A combined, explainable view of a learner’s journey for the teachers responsible for them.',
        availability: 'roadmap',
      },
      {
        title: 'Leadership insights',
        description: 'Plain-language summaries for principals and owners of what has changed and what may need attention.',
        availability: 'roadmap',
      },
      {
        title: 'Operational intelligence',
        description: 'Signals from school operations, such as fee collection, to support planning.',
        availability: 'roadmap',
      },
      {
        title: 'Early-warning concepts',
        description: 'Earlier, explainable indications that a learner or area may need attention, always reviewed by people.',
        availability: 'roadmap',
      },
    ] satisfies Feature[],
  },
  flow: {
    heading: 'From information to attention',
    steps: [
      { title: 'Connect', description: 'Daily school work is recorded once, in one platform.' },
      { title: 'Understand', description: 'Dashboards and reports show what is happening.' },
      { title: 'Highlight', description: 'Alerts today, and intelligence on the roadmap, point to where attention may be needed.' },
      { title: 'Act', description: 'People decide and follow up, using the same platform.' },
    ] satisfies Feature[],
  },
  faqs: [
    {
      question: 'Does Funda360 use AI today?',
      answer:
        'Funda360 today provides the connected information, dashboards, reports and attendance alerts that school intelligence depends on. AI-driven insights are on the roadmap and are not yet available.',
    },
    {
      question: 'Will AI make decisions about learners?',
      answer: 'No. Funda360’s approach is that intelligence highlights where attention may be needed; people always decide what to do.',
    },
    {
      question: 'Will our school’s data be used to train AI models?',
      answer:
        'To be confirmed. Funda360 will publish its approach to AI and data use before any AI capability is released.',
    },
  ] satisfies Faq[],
};
