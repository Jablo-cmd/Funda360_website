import type { SeoFields } from './types';

/**
 * Resources / insights content model.
 *
 * Articles are stored as structured blocks so the design phase controls
 * presentation and a CMS can later replace this file without changing pages.
 *
 * Every article below is a DRAFT written for Phase 1 so the template has
 * realistic content. Drafts are rendered with a visible "Draft" label, are
 * marked noindex and are excluded from the sitemap until `status` becomes
 * "published" after editorial review.
 */

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'callout'; text: string };

export type ResourceCategory = { slug: string; name: string; description: string };

export type Author = { id: string; name: string; role: string; bio: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  authorId: string;
  /** ISO date (YYYY-MM-DD). Drafts carry a provisional date. */
  publishedAt: string;
  updatedAt?: string;
  status: 'draft' | 'published';
  readingMinutes: number;
  /** Related article slugs, in priority order. Falls back to same category. */
  related?: string[];
  /** Internal links to platform pages relevant to the article. */
  relatedPages?: { label: string; href: string }[];
  body: ArticleBlock[];
};

export const resourcesPage = {
  seo: {
    title: 'Resources & Insights',
    description:
      'Insights from Funda360 on connected school information, school leadership, attendance, assessment and the responsible use of technology and AI in schools.',
  } satisfies SeoFields,
  hero: {
    eyebrow: 'Resources',
    heading: 'Resources & insights',
    intro: 'Practical thinking on school information, leadership and technology for schools and the people who support them.',
  },
  futureTypes: {
    heading: 'More resources are coming',
    intro: 'Planned resource types. These sections will appear when content is ready.',
    items: ['Guides and checklists', 'Product updates', 'Webinars and events', 'Case studies (only with verified, permissioned stories)'],
  },
};

export const categories: ResourceCategory[] = [
  { slug: 'school-leadership', name: 'School leadership', description: 'Using information to lead schools well.' },
  { slug: 'connected-data', name: 'Connected school data', description: 'Why connected information matters and how to get there.' },
  { slug: 'teaching-learning', name: 'Teaching & learning', description: 'Attendance, assessment and supporting every learner.' },
  { slug: 'ai-in-education', name: 'AI in education', description: 'A careful, practical view of AI in schools.' },
];

export const authors: Author[] = [
  {
    id: 'funda360-team',
    name: 'The Funda360 Team',
    role: 'Funda360',
    bio: 'The team building Funda360. [Placeholder: replace with named authors and bios when confirmed.]',
  },
];

export const articles: Article[] = [
  {
    slug: 'why-school-data-fragmentation-matters',
    title: 'Why fragmented school information matters, and what to do about it',
    description:
      'School information spread across spreadsheets, paper and separate tools costs time and makes it harder to notice when learners need support. Here is how to start connecting it.',
    category: 'connected-data',
    authorId: 'funda360-team',
    publishedAt: '2026-10-01',
    status: 'draft',
    readingMinutes: 5,
    related: ['manage-understand-act', 'using-attendance-information-well'],
    relatedPages: [
      { label: 'The Funda360 platform', href: '/platform' },
      { label: 'Learner Management', href: '/platform/learner-management' },
    ],
    body: [
      { type: 'paragraph', text: 'Schools record an enormous amount of information: who is enrolled, who attended, how learners performed, which fees are outstanding and what was communicated to families. The challenge is rarely a lack of information. It is that the information lives in too many places.' },
      { type: 'heading', text: 'What fragmentation looks like' },
      { type: 'list', items: ['Learner details kept in an admissions spreadsheet and again in class lists.', 'Marks captured on mark sheets and re-typed into report cards.', 'Registers on paper, and a separate summary prepared for leadership.', 'Fee balances in a finance tool that teachers and leadership cannot see.'] },
      { type: 'heading', text: 'Why it matters' },
      { type: 'paragraph', text: 'Every time information is copied, there is a cost in time and a risk of error. More importantly, when information is split up, no one sees the whole picture. A learner whose attendance is slipping and whose marks are dropping may be noticed by two different people who never compare notes.' },
      { type: 'heading', text: 'Where to start' },
      { type: 'list', items: ['Make the learner record the single starting point for everything else.', 'Capture information once, at the point where it is created.', 'Give each role the view it needs, rather than sending files around.', 'Agree on a small number of indicators leadership will review regularly.'] },
      { type: 'callout', text: 'Connected does not mean exposed. Role-based access ensures each person sees only what they should.' },
    ],
  },
  {
    slug: 'manage-understand-act',
    title: 'Manage, understand, act: a simple framework for school information',
    description: 'A three-step way to think about school information: run daily work in one place, make it visible, and use it to decide where attention is needed.',
    category: 'school-leadership',
    authorId: 'funda360-team',
    publishedAt: '2026-10-01',
    status: 'draft',
    readingMinutes: 4,
    related: ['why-school-data-fragmentation-matters', 'responsible-ai-in-schools'],
    relatedPages: [{ label: 'Analytics & Reporting', href: '/platform/analytics' }],
    body: [
      { type: 'paragraph', text: 'School leaders are often told to be “data-driven”. In practice, that only works when the underlying information is reliable and easy to see. We think about it in three steps.' },
      { type: 'heading', text: 'Manage' },
      { type: 'paragraph', text: 'Run the daily work of the school in one place: enrolment, registers, assessments, fees and communication. When daily work produces the information, no one has to collect it separately.' },
      { type: 'heading', text: 'Understand' },
      { type: 'paragraph', text: 'Make the information visible to the people who need it, through dashboards and reports built from the same records the school works in every day.' },
      { type: 'heading', text: 'Act' },
      { type: 'paragraph', text: 'Use what you see to decide where attention is needed: a learner to check in with, a class to support, a fee account to follow up. The decision always belongs to people.' },
      { type: 'quote', text: 'Information is only useful if someone can act on it in time.' },
    ],
  },
  {
    slug: 'using-attendance-information-well',
    title: 'Using attendance information well',
    description: 'Attendance registers are captured every day, but their value depends on whether patterns are noticed and followed up. Practical ideas for schools.',
    category: 'teaching-learning',
    authorId: 'funda360-team',
    publishedAt: '2026-10-01',
    status: 'draft',
    readingMinutes: 4,
    related: ['why-school-data-fragmentation-matters', 'manage-understand-act'],
    relatedPages: [{ label: 'Attendance', href: '/platform/attendance' }],
    body: [
      { type: 'paragraph', text: 'Taking the register is one of the most consistent routines in any school. Yet a register on its own does not help a learner; what helps is someone noticing a pattern and responding.' },
      { type: 'heading', text: 'From registers to patterns' },
      { type: 'list', items: ['Capture attendance digitally at the start of each lesson or day.', 'Review trends regularly, not only end-of-term totals.', 'Agree who follows up, and how, when a pattern appears.', 'Keep families informed so they can help.'] },
      { type: 'heading', text: 'Keep the human conversation central' },
      { type: 'paragraph', text: 'Behind every pattern is a learner and a family. Alerts and reports are prompts for a conversation, not conclusions.' },
    ],
  },
  {
    slug: 'responsible-ai-in-schools',
    title: 'A practical, responsible view of AI in schools',
    description: 'What school leaders should ask before adopting AI: what information it uses, how it explains itself, and who makes the decisions.',
    category: 'ai-in-education',
    authorId: 'funda360-team',
    publishedAt: '2026-10-01',
    status: 'draft',
    readingMinutes: 5,
    related: ['manage-understand-act'],
    relatedPages: [{ label: 'AI & Intelligence at Funda360', href: '/ai' }],
    body: [
      { type: 'paragraph', text: 'AI is attracting a great deal of attention in education. For school leaders, the useful question is not whether to use AI, but how to judge whether a particular use is helpful, safe and fair.' },
      { type: 'heading', text: 'Questions worth asking' },
      { type: 'list', items: ['What information does it use, and is that information reliable?', 'Can it explain why it highlighted something?', 'Who sees the output, and does that respect existing access rules?', 'Does a person always make the final decision?', 'How is learner privacy protected?'] },
      { type: 'heading', text: 'Foundations first' },
      { type: 'paragraph', text: 'AI cannot compensate for incomplete or inconsistent information. Connected, reliable school records are the foundation any responsible use of AI depends on.' },
      { type: 'callout', text: 'Funda360’s AI capabilities are on the roadmap. See the AI & Intelligence page for what is available today.' },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getCategory(slug: string): ResourceCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAuthor(id: string): Author {
  return authors.find((a) => a.id === id) ?? authors[0];
}

export function articlesInCategory(slug: string): Article[] {
  return articles.filter((a) => a.category === slug);
}

/** Related articles: explicit list first, then same category, never the article itself. */
export function relatedArticles(article: Article, limit = 3): Article[] {
  const explicit = (article.related ?? []).map(getArticle).filter((a): a is Article => Boolean(a));
  const sameCategory = articles.filter((a) => a.category === article.category && a.slug !== article.slug);
  const merged = [...explicit, ...sameCategory].filter((a, i, all) => a.slug !== article.slug && all.findIndex((b) => b.slug === a.slug) === i);
  return merged.slice(0, limit);
}

export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
