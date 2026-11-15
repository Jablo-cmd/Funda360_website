/**
 * Illustrative photography of school life (not Funda360 customers, not
 * product screens). Each photo is placed beside copy it genuinely relates to.
 */
export type SitePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export const photos = {
  classroom: {
    src: '/photos/classroom.webp',
    alt: 'A teacher leans over two smiling learners in school uniform, pointing at an open exercise book in a bright classroom.',
    width: 1400,
    height: 788,
    caption: 'Teachers and learners in the classroom.',
  },
  parentEvening: {
    src: '/photos/parent-evening.webp',
    alt: 'A school leader speaks at a podium to parents and staff beneath a screen reading Together for Our Learners.',
    width: 1400,
    height: 933,
    caption: 'Parents and school leaders at a parent evening.',
  },
  engagementMeeting: {
    src: '/photos/engagement-meeting.webp',
    alt: 'A school leader with a microphone addresses parents and a panel of teachers at a parent and teacher meeting.',
    width: 1400,
    height: 788,
    caption: 'A school leader addressing parents and teachers.',
  },
} satisfies Record<string, SitePhoto>;

/** Original vector illustrations in the brand palette (not photographs). */
export const illustrations = {
  learnerManagement: {
    src: '/illustrations/learner-management.svg',
    alt: 'Illustration of a learner profile card with an avatar, tags and two smaller learner cards beside it.',
    width: 640,
    height: 480,
    caption: 'One profile per learner, from admission onwards.',
  },
  attendance: {
    src: '/illustrations/attendance.svg',
    alt: 'Illustration of a register calendar with present, absent and late marks and a small attendance trend line.',
    width: 640,
    height: 480,
    caption: 'Registers and attendance trends at a glance.',
  },
  finance: {
    src: '/illustrations/finance.svg',
    alt: 'Illustration of a fees bar chart, an invoice with a paid button and a stack of coins.',
    width: 640,
    height: 480,
    caption: 'Invoices, payments and fee collection in one place.',
  },
  funders: {
    src: '/illustrations/funders.svg',
    alt: 'Illustration of a school building beside a rising bar chart with a growth arrow.',
    width: 640,
    height: 480,
    caption: 'Clear reporting for the people who support schools.',
  },
} satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos | keyof typeof illustrations;

export function figureFor(key: PhotoKey): { photo: SitePhoto; kind: 'photo' | 'illustration' } {
  return key in illustrations
    ? { photo: illustrations[key as keyof typeof illustrations], kind: 'illustration' }
    : { photo: photos[key as keyof typeof photos], kind: 'photo' };
}

/** Capability page slug → photo shown beside its overview. */
export const capabilityPhotos: Record<string, PhotoKey> = {
  'academics-assessments': 'classroom',
  communication: 'parentEvening',
  analytics: 'engagementMeeting',
  'learner-management': 'learnerManagement',
  attendance: 'attendance',
  finance: 'finance',
};

/** Solution page slug → photo shown beside its "why" section. */
export const solutionPhotos: Record<string, PhotoKey> = {
  schools: 'classroom',
  'school-leadership': 'engagementMeeting',
  'education-groups': 'parentEvening',
  funders: 'funders',
};
