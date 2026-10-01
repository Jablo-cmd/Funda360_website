type Props = {
  id: string;
  heading: string;
  eyebrow?: string;
  intro?: string;
  /** Heading level. Page sections are h2; nest with 3 inside another section. */
  level?: 2 | 3;
  /** Semantic hint for Phase 2 design (e.g. "muted", "feature"). No styling is attached yet. */
  tone?: string;
  children?: React.ReactNode;
};

/**
 * A page section: landmark-labelled by its own heading so assistive
 * technology can list and jump between sections.
 */
export function Section({ id, heading, eyebrow, intro, level = 2, tone, children }: Props) {
  const Heading = `h${level}` as 'h2' | 'h3';
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="section" data-tone={tone}>
      <div className="container">
        <header className="section__header">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <Heading id={headingId}>{heading}</Heading>
          {intro ? <p className="lead">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
