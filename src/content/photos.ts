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

export type PhotoKey = keyof typeof photos;

/** Capability page slug → photo shown beside its overview. */
export const capabilityPhotos: Record<string, PhotoKey> = {
  'academics-assessments': 'classroom',
  communication: 'parentEvening',
  analytics: 'engagementMeeting',
};

/** Solution page slug → photo shown beside its "why" section. */
export const solutionPhotos: Record<string, PhotoKey> = {
  schools: 'classroom',
  'school-leadership': 'engagementMeeting',
  'education-groups': 'parentEvening',
};
