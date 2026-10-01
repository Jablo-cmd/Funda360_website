import type { Cta } from '@/content/types';
import { CtaGroup, CtaLink } from './CtaLink';

type Props = {
  eyebrow?: string;
  heading: string;
  intro: string;
  primary?: Cta;
  secondary?: Cta;
  /** Extra content under the intro (audience note, meta). */
  children?: React.ReactNode;
  /** Product visual. Rendered beside the copy (split) or below it. */
  media?: React.ReactNode;
  layout?: 'stacked' | 'split';
  eyebrowTone?: 'brand' | 'insight';
};

/** The single h1 of every page, with its introduction, primary actions and optional product visual. */
export function PageHero({ eyebrow, heading, intro, primary, secondary, children, media, layout = 'stacked', eyebrowTone }: Props) {
  const copy = (
    <div className="hero__copy">
      {eyebrow ? <p className={`eyebrow${eyebrowTone === 'insight' ? ' eyebrow--insight' : ''}`}>{eyebrow}</p> : null}
      <h1 id="page-title">{heading}</h1>
      <p className="lead">{intro}</p>
      {primary || secondary ? (
        <CtaGroup>
          {primary ? <CtaLink cta={primary} /> : null}
          {secondary ? <CtaLink cta={secondary} variant="secondary" /> : null}
        </CtaGroup>
      ) : null}
      {children}
    </div>
  );

  return (
    <section className={`hero${layout === 'split' && media ? ' hero--split' : ''}`} aria-labelledby="page-title">
      <div className="container">
        {layout === 'split' && media ? (
          <div className="split">
            {copy}
            <div className="hero__media">{media}</div>
          </div>
        ) : (
          <>
            {copy}
            {media ? <div className="hero__media">{media}</div> : null}
          </>
        )}
      </div>
    </section>
  );
}
