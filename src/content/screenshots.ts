import type { ProductShotSpec } from './types';

/**
 * Product UI showcase slots.
 *
 * Every slot is a placeholder until real screenshots are captured from the
 * Funda360 application. Rules for capturing (see DESIGN_HANDOFF.md):
 * - Use a demo tenant with fictional data only. Never show real learners,
 *   guardians, staff, schools or financial records.
 * - Capture at a consistent viewport and theme.
 * - Keep the alt text below in sync with what the final image shows.
 */
export const productShots = {
  dashboard: {
    id: 'dashboard',
    title: 'Leadership dashboard',
    alt: 'Funda360 leadership dashboard showing attendance, learner and finance summaries for a demo school.',
    brief: 'Principal/leadership persona dashboard with summary tiles and the attendance overview, using demo data.',
    sourceScreen: 'Application: /dashboard (principal persona)',
    aspectRatio: '16 / 10',
  },
  learnerManagement: {
    id: 'learner-management',
    title: 'Learner profile',
    alt: 'Funda360 learner profile for a fictional learner showing enrolment, guardians and documents tabs.',
    brief: 'A single learner profile with enrolment history, guardians and documents visible. Fictional learner only.',
    sourceScreen: 'Application: /learners/:id',
    aspectRatio: '16 / 10',
  },
  academicPerformance: {
    id: 'academic-performance',
    title: 'Assessments and results',
    alt: 'Funda360 assessment results view listing marks for a demo class.',
    brief: 'An assessment with captured results for a demo class; optionally a report card in review.',
    sourceScreen: 'Application: /academic/assessments/:id and /report-cards',
    aspectRatio: '16 / 10',
  },
  attendance: {
    id: 'attendance',
    title: 'Daily attendance register',
    alt: 'Funda360 class attendance register with present, absent and late states for a demo class.',
    brief: 'The class register being captured, plus the attendance trend chart from the attendance report.',
    sourceScreen: 'Application: /attendance and /reports/attendance',
    aspectRatio: '16 / 10',
  },
  finance: {
    id: 'finance',
    title: 'Fees and finance overview',
    alt: 'Funda360 finance overview showing fee collection and ageing summaries for a demo school.',
    brief: 'Finance overview KPIs and a learner fee statement. Demo amounts only.',
    sourceScreen: 'Application: /fees',
    aspectRatio: '16 / 10',
  },
  communication: {
    id: 'communication',
    title: 'Messages and announcements',
    alt: 'Funda360 messaging view with a conversation between a teacher and a guardian in a demo school.',
    brief: 'Messaging inbox with a fictional staff-guardian conversation and the announcements list.',
    sourceScreen: 'Application: /messages and /announcements',
    aspectRatio: '16 / 10',
  },
  analytics: {
    id: 'analytics',
    title: 'Reports overview',
    alt: 'Funda360 reports overview listing learner, academic, assessment, attendance and employee reports.',
    brief: 'Reports overview page and one report with its summary bar and CSV export.',
    sourceScreen: 'Application: /reports',
    aspectRatio: '16 / 10',
  },
  reporting: {
    id: 'reporting',
    title: 'Report cards',
    alt: 'Funda360 report card workflow showing report cards moving from draft to published for a demo class.',
    brief: 'Report-card list with workflow states and a generated PDF preview. Fictional learners only.',
    sourceScreen: 'Application: /report-cards',
    aspectRatio: '16 / 10',
  },
  ai: {
    id: 'ai',
    title: 'Intelligence concept (roadmap)',
    alt: 'Concept illustration of Funda360 highlighting areas that may need attention. Roadmap concept, not a current screen.',
    brief:
      'ROADMAP CONCEPT ONLY. There is no AI screen in the application today. If a visual is used, it must be labelled as a concept, or use the existing dashboard/attendance alerts instead.',
    sourceScreen: 'None yet: roadmap concept',
    aspectRatio: '16 / 10',
  },
  parentPortal: {
    id: 'parent-portal',
    title: 'Parent portal',
    alt: 'Funda360 parent portal on a phone showing a fictional child’s attendance, homework and report cards.',
    brief: 'Parent portal dashboard captured at mobile width with demo data.',
    sourceScreen: 'Application: /parent/dashboard',
    aspectRatio: '9 / 16',
  },
} satisfies Record<string, ProductShotSpec>;

export type ProductShotKey = keyof typeof productShots;
