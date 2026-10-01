import { closingCta } from '@/content/ctas';
import type { Cta } from '@/content/types';
import { CtaGroup, CtaLink } from './CtaLink';

type Props = {
  id?: string;
  heading?: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
};

/** Closing conversion block used at the end of most pages. */
export function CtaBanner({
  id = 'request-demo',
  heading = closingCta.heading,
  body = closingCta.body,
  primary = closingCta.primary,
  secondary = closingCta.secondary,
}: Props) {
  return (
    <section id={id} className="section cta-banner" aria-labelledby={`${id}-heading`} data-tone="cta">
      <div className="container">
        <h2 id={`${id}-heading`}>{heading}</h2>
        <p className="lead">{body}</p>
        <CtaGroup>
          <CtaLink cta={primary} />
          {secondary ? <CtaLink cta={secondary} variant="secondary" /> : null}
        </CtaGroup>
      </div>
    </section>
  );
}
