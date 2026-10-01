type Props = {
  id: string;
  heading: string;
  eyebrow?: string;
  intro?: string;
  /** Heading level. Page sections are h2; nest with 3 inside another section. */
  level?: 2 | 3;
  /** Background treatment: muted (slate-50), navy (trust/story), intelligence (teal tint), available, roadmap. */
  tone?: 'muted' | 'navy' | 'intelligence' | 'available' | 'roadmap';
  /** Centre the section header. */
  center?: boolean;
  /** Use the 1320px showcase width. */
  wide?: boolean;
  /** Eyebrow colour: brand (default) or insight (teal, intelligence content only). */
  eyebrowTone?: 'brand' | 'insight';
  children?: React.ReactNode;
};

/**
 * A page section: landmark-labelled by its own heading so assistive
 * technology can list and jump between sections.
 */
export function Section({ id, heading, eyebrow, intro, level = 2, tone, center, wide, eyebrowTone, children }: Props) {
  const Heading = `h${level}` as 'h2' | 'h3';
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="section" data-tone={tone}>
      <div className={`container${wide ? ' container--wide' : ''}`}>
        <header className={`section__header${center ? ' section__header--center' : ''}`}>
          {eyebrow ? <p className={`eyebrow${eyebrowTone === 'insight' ? ' eyebrow--insight' : ''}`}>{eyebrow}</p> : null}
          <Heading id={headingId}>{heading}</Heading>
          {intro ? <p className="lead">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
