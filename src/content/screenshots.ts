import type { ProductShotSpec } from './types';

/**
 * Product UI showcase slots.
 *
 * Every image in /public/screenshots is a real screen of the Funda360
 * application, captured from a local, network-mocked copy of the app running
 * a FICTIONAL demo school ("Funda360 Demo School"). No real learners,
 * guardians, staff, schools or financial records appear. Two pieces of
 * session-specific chrome were hidden before capture: the per-user two-factor
 * set-up reminder and the data-protection status card (to avoid implying a
 * compliance status).
 *
 * Rules for future captures (see DESIGN_HANDOFF.md):
 * - Demo tenant with fictional data only.
 * - Keep the alt text in sync with what the image shows.
 * - Slots without `src` render a labelled placeholder.
 */
const desktop = { aspectRatio: '16 / 10', width: 1600, height: 1000, frame: 'desktop' } as const;

export const productShots = {
  dashboard: {
    id: 'dashboard',
    title: 'Leadership dashboard',
    alt: 'Funda360 principal dashboard for a demo school, showing active learners, employees, classes, today’s attendance, the 30-day attendance rate, fee collection rate and recent assessments.',
    brief: 'Principal dashboard with summary tiles, attendance overview and recent assessments.',
    sourceScreen: 'Application: /dashboard (principal)',
    src: '/screenshots/dashboard.webp',
    ...desktop,
  },
  learnerManagement: {
    id: 'learner-management',
    title: 'Learner profile',
    alt: 'Funda360 learner profile for a fictional Grade 8 learner, with enrolment details, record tabs, an “Attention required” panel and a financial summary.',
    brief: 'A single learner profile with record tabs and the attention-required panel.',
    sourceScreen: 'Application: /learners/:id',
    src: '/screenshots/learner-profile.webp',
    ...desktop,
  },
  learnerDirectory: {
    id: 'learner-directory',
    title: 'Learner directory',
    alt: 'Funda360 learner directory listing fictional learners with learner and admission numbers and status, with search, status filter, CSV import and add-learner actions.',
    brief: 'Learner directory with search and filters.',
    sourceScreen: 'Application: /learners',
    src: '/screenshots/learners.webp',
    ...desktop,
  },
  academicPerformance: {
    id: 'academic-performance',
    title: 'Assessment results',
    alt: 'Funda360 assessment view for a demo Grade 8A Mathematics test, showing marked learners, class average, highest and lowest marks, and each learner’s mark and percentage.',
    brief: 'An assessment with captured results for a demo class.',
    sourceScreen: 'Application: /academic/assessments/:id',
    src: '/screenshots/assessment.webp',
    ...desktop,
  },
  attendance: {
    id: 'attendance',
    title: 'Daily attendance register',
    alt: 'Funda360 class attendance register for a demo Grade 10A class, with present, absent, late and excused options for each learner.',
    brief: 'The class register being captured.',
    sourceScreen: 'Application: /attendance',
    src: '/screenshots/attendance.webp',
    ...desktop,
  },
  finance: {
    id: 'finance',
    title: 'Finance overview',
    alt: 'Funda360 finance overview for a demo school, showing total billed, collected, outstanding and overdue amounts, the collection rate, learners by payment status and balance ageing.',
    brief: 'Finance overview KPIs. Demo amounts only.',
    sourceScreen: 'Application: /fees',
    src: '/screenshots/finance.webp',
    ...desktop,
  },
  communication: {
    id: 'communication',
    title: 'Messages',
    alt: 'Funda360 messages inbox with a conversation between school staff and a fictional guardian about a consent form.',
    brief: 'Messaging inbox with a fictional staff-guardian conversation.',
    sourceScreen: 'Application: /messages',
    src: '/screenshots/messages.webp',
    ...desktop,
  },
  analytics: {
    id: 'analytics',
    title: 'Attendance report',
    alt: 'Funda360 attendance report for a demo school, with present, absent and late counts, the attendance rate for the period, a six-week attendance trend chart and an alert that one learner has attendance below 80%.',
    brief: 'Attendance report with summary, trend chart and alert.',
    sourceScreen: 'Application: /reports/attendance',
    src: '/screenshots/attendance-report.webp',
    ...desktop,
  },
  reporting: {
    id: 'reporting',
    title: 'Report cards',
    alt: 'Funda360 report cards list for a demo school, showing Term 3 report cards by learner and class with overall results and workflow status from approved to published.',
    brief: 'Report-card list with workflow states.',
    sourceScreen: 'Application: /report-cards',
    src: '/screenshots/report-cards.webp',
    ...desktop,
  },
  parentPortal: {
    id: 'parent-portal',
    title: 'Parent portal',
    alt: 'Funda360 parent portal on a phone, showing a fictional child’s attendance rate, present, absent and late counts, and recent attendance by date.',
    brief: 'Parent portal child view at mobile width.',
    sourceScreen: 'Application: /parent/children/:id (attendance tab)',
    src: '/screenshots/parent-portal.webp',
    aspectRatio: '780 / 1688',
    width: 780,
    height: 1688,
    frame: 'phone',
  },

  /* Cropped close-ups used in the Manage → Understand → Act story. */
  detailRegister: {
    id: 'detail-register',
    title: 'Manage: taking the register',
    alt: 'Close-up of the Funda360 class register: each fictional learner marked present, absent, late or excused.',
    brief: 'Crop of the attendance register.',
    sourceScreen: 'Application: /attendance',
    src: '/screenshots/detail-register.webp',
    aspectRatio: '1200 / 615',
    width: 1200,
    height: 615,
    frame: 'detail',
  },
  detailTrend: {
    id: 'detail-trend',
    title: 'Understand: attendance trend',
    alt: 'Close-up of the Funda360 attendance report: summary counts, a six-week trend chart with an 80% attention line, and an alert that one learner has attendance below 80%.',
    brief: 'Crop of the attendance report chart and alert.',
    sourceScreen: 'Application: /reports/attendance',
    src: '/screenshots/detail-attendance-trend.webp',
    aspectRatio: '1200 / 603',
    width: 1200,
    height: 603,
    frame: 'detail',
  },
  detailAttention: {
    id: 'detail-attention',
    title: 'Act: attention required',
    alt: 'Close-up of a Funda360 learner profile: an “Attention required” panel listing missing guardian, emergency contact and medical information, above guardian and financial summaries.',
    brief: 'Crop of the learner profile attention panel.',
    sourceScreen: 'Application: /learners/:id',
    src: '/screenshots/detail-attention.webp',
    aspectRatio: '1200 / 443',
    width: 1200,
    height: 443,
    frame: 'detail',
  },

  ai: {
    id: 'ai',
    title: 'Intelligence concept (roadmap)',
    alt: 'Roadmap concept: Funda360 intelligence that highlights areas that may need attention. Not a current product screen.',
    brief:
      'ROADMAP CONCEPT ONLY. There is no AI screen in the application today. Rendered as a labelled concept panel, never as a fake screen.',
    sourceScreen: 'None yet: roadmap concept',
    aspectRatio: '16 / 10',
  },
} satisfies Record<string, ProductShotSpec>;

export type ProductShotKey = keyof typeof productShots;
