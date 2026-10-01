import { siteConfig } from '@/config/site';
import type { Feature, SeoFields } from './types';

export const aboutPage = {
  seo: {
    title: 'About Funda360',
    description:
      'Why Funda360 exists: connecting fragmented school information so school teams, leaders, families and partners can understand what is happening and act sooner.',
  } satisfies SeoFields,
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
      { title: 'Secure by design', description: 'School information is protected by default.' },
      { title: 'Honest about our product', description: 'We are clear about what is available today and what is on the roadmap.' },
      { title: 'Built for local context', description: 'Designed with South African schools and privacy requirements in mind.' },
    ] satisfies Feature[],
  },
  company: {
    heading: 'Who builds Funda360',
    body: `Funda360 is developed by ${siteConfig.developer}.`,
    // TODO(content): confirm company description, team and contact details for public use.
    placeholder: 'Company background, team and contact information to be supplied.',
  },
};
