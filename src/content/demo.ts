import type { SeoFields } from './types';

export const demoPage = {
  seo: {
    title: 'Request a Demo',
    description:
      'Request a Funda360 demo. Tell us about your school, group or programme and the Funda360 team will arrange a walkthrough focused on what matters to you.',
  } satisfies SeoFields,
  hero: {
    eyebrow: 'Request a demo',
    heading: 'Request a Funda360 demo',
    intro: 'Tell us a little about your organisation and what you would like to see. The Funda360 team will contact you to arrange a walkthrough.',
  },
  expectations: {
    heading: 'What to expect',
    steps: [
      'We review your request and contact you to agree a time.',
      'We walk through the parts of Funda360 most relevant to you.',
      'We discuss your school’s needs, onboarding and next steps.',
    ],
    // TODO(content): confirm response time commitment before stating one.
  },
  privacyNote:
    'We use the information you provide only to respond to your demo request. See our privacy policy for details.',
};

export type Option = { value: string; label: string };

export const roleOptions: Option[] = [
  { value: 'principal', label: 'Principal or deputy principal' },
  { value: 'owner', label: 'School owner or governing body' },
  { value: 'administrator', label: 'School administrator' },
  { value: 'teacher', label: 'Teacher or head of department' },
  { value: 'finance', label: 'Finance or bursar' },
  { value: 'group', label: 'Education group leadership' },
  { value: 'funder', label: 'Funder or education partner' },
  { value: 'other', label: 'Other' },
];

export const sizeOptions: Option[] = [
  { value: 'lt-300', label: 'One school, fewer than 300 learners' },
  { value: '300-700', label: 'One school, 300 to 700 learners' },
  { value: '700-1200', label: 'One school, 700 to 1,200 learners' },
  { value: 'gt-1200', label: 'One school, more than 1,200 learners' },
  { value: '2-5-schools', label: '2 to 5 schools' },
  { value: '6-20-schools', label: '6 to 20 schools' },
  { value: 'gt-20-schools', label: 'More than 20 schools' },
  { value: 'not-applicable', label: 'Not applicable (for example, a funder)' },
];

export const interestOptions: Option[] = [
  { value: 'learner-management', label: 'Learner management and admissions' },
  { value: 'academics-assessments', label: 'Academics, assessments and report cards' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'finance', label: 'Fees and finance' },
  { value: 'communication', label: 'Communication and parent portal' },
  { value: 'analytics', label: 'Analytics and reporting' },
  { value: 'ai', label: 'AI and intelligence roadmap' },
  { value: 'whole-platform', label: 'The whole platform' },
];
