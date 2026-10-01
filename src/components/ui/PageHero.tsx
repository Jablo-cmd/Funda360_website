import type { Cta } from '@/content/types';
import { CtaGroup, CtaLink } from './CtaLink';

type Props = {
  eyebrow?: string;
  heading: string;
  intro: string;
  primary?: Cta;
  secondary?: Cta;
  children?: React.ReactNode;
};

/** The single h1 of every page, with its introduction and primary actions. */
export function PageHero({ eyebrow, heading, intro, primary, secondary, children }: Props) {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
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
    </section>
  );
}
