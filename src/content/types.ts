/**
 * Content model for the marketing site.
 *
 * Pages render these objects; they never hard-code copy. Phase 2 (design)
 * can change presentation freely without touching the content architecture,
 * and copy can be edited here (or later migrated to a CMS) without touching
 * components.
 */

/**
 * How confident we are that a statement describes the product today.
 *
 * - available: implemented in the Funda360 application today (verified against
 *   the application's current-state register, 2026-09-24/30).
 * - roadmap:   a direction or concept, not a current capability. Must always be
 *   presented with a visible "Roadmap" label.
 * - confirm:   plausible but needs product/commercial confirmation before launch.
 *   Rendered with a visible "To be confirmed" label.
 */
export type Availability = 'available' | 'roadmap' | 'confirm';

export type Cta = {
  label: string;
  href: string;
  /** Opens the Funda360 application (Login) rather than a marketing page. */
  external?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  /** Optional sub-pages shown in a disclosure menu. */
  children?: NavLink[];
};

export type Faq = { question: string; answer: string };

export type Feature = {
  title: string;
  description: string;
  availability?: Availability;
};

export type Workflow = {
  title: string;
  /** Ordered steps of the workflow, written from the user's point of view. */
  steps: string[];
};

/** A product screenshot slot. Real screenshots replace the placeholder in Phase 2. */
export type ProductShotSpec = {
  id: string;
  title: string;
  /** Mandatory alt text describing what the final screenshot will show. */
  alt: string;
  /** What the screenshot must show (brief for whoever captures it). */
  brief: string;
  /** Application screen to capture from (reference only). */
  sourceScreen: string;
  /** Final image path once supplied, e.g. "/screenshots/dashboard.png". */
  src?: string;
  /** Intended aspect ratio, e.g. "16 / 10". */
  aspectRatio?: string;
  /** Intrinsic pixel size of `src` (prevents layout shift). */
  width?: number;
  height?: number;
  /** "desktop" frames get browser chrome; "phone" frames a device outline; "detail" is a cropped close-up. */
  frame?: 'desktop' | 'phone' | 'detail';
};

export type Section = {
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
};

export type SeoFields = {
  title: string;
  description: string;
};
