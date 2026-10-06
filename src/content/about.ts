import { siteConfig } from '@/config/site';
import type { Feature } from './types';

export const aboutPage = {
  hero: {
    eyebrow: 'About',
    heading: 'About Funda360',
    intro:
      'Funda360 is a connected school management platform. It exists to help schools turn the information they already collect into a clear, shared picture that supports every learner.',
  },
  sections: [
    {
      id: 'what',
      heading: 'What Funda360 is',
      body: [
        'Funda360 is a web-based platform that brings together the core work of a school: learner records, admissions, academics, assessments, attendance, fees, communication and reporting.',
        'Each school has its own secure space on the platform. Administrators, teachers, finance teams, leadership, parents and learners each have a view designed for their role.',
      ],
    },
    {
      id: 'why',
      heading: 'Why it exists',
      body: [
        'Schools work hard to record what happens every day, yet that information is often spread across paper, spreadsheets and disconnected tools. The people who need it most, teachers, leaders and families, struggle to see the whole picture in time to make a difference.',
        'Funda360 was created to change that: to make school information connected, current and useful.',
      ],
    },
    {
      id: 'problem',
      heading: 'The problem we address',
      body: [
        'Fragmented information costs time and attention. It leads to duplicate capturing, inconsistent records and reports that arrive too late.',
        'Most importantly, it makes it harder to notice when a learner, a class or a part of the school needs attention.',
      ],
    },
    {
      id: 'connected',
      heading: 'Connected school information',
      body: [
        'In Funda360, the learner record sits at the centre. Classes, assessments, attendance, fees and communication connect to it, so information captured once can serve many purposes.',
        'Access is role-based and enforced by the platform, so connected does not mean exposed: each person sees only what their role allows.',
      ],
    },
    {
      id: 'responsible',
      heading: 'Responsible technology',
      body: [
        'School information is about children and families, so Funda360 is built to protect it: each school’s data kept separate, role-based access enforced in the platform, and an audit trail for sensitive actions.',
        'We apply the same care to intelligence. People make the decisions; the platform helps them see clearly. And we label honestly what is available today and what is still on the roadmap.',
      ],
    },
    {
      id: 'vision',
      heading: 'Our vision',
      body: [
        'Smarter schools, better outcomes. We want every school to be able to manage its daily work, understand what is happening and act where attention is needed.',
        'Our roadmap extends the platform into broader school operations, interoperability and school intelligence, always with people making the decisions.',
      ],
    },
  ],
  values: {
    heading: 'How we work',
    items: [
      { title: 'Learner-centred', description: 'Every capability connects back to the learner.' },
      { title: 'Secure by design', description: 'Access is restricted by school and by role by default, and enforced in the database.' },
      { title: 'Honest about our product', description: 'We are clear about what is available today and what is on the roadmap.' },
      { title: 'Built for local context', description: 'Designed with South African schools and privacy requirements in mind.' },
    ] satisfies Feature[],
  },
  company: {
    heading: 'Who builds Funda360',
    body: `Funda360 is the product; ${siteConfig.developer} is the company that designs, builds and supports it. Funda360 is designed with South African schools in mind: their terminology, their structures and their privacy obligations.`,
    // CONFIRM: company background, team and contact details for public use (tracked in MARKETING_WEBSITE_AUDIT.md).
  },
};
