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

/** Closing conversion block used at the end of most pages: a contained navy panel. */
export function CtaBanner({
  id = 'request-demo',
  heading = closingCta.heading,
  body = closingCta.body,
  primary = closingCta.primary,
  secondary = closingCta.secondary,
}: Props) {
  return (
    <section id={id} className="cta-banner" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="cta-panel" data-tone="cta">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 id={`${id}-heading`}>{heading}</h2>
            <p className="lead">{body}</p>
          </div>
          <CtaGroup>
            <CtaLink cta={primary} arrow />
            {secondary ? <CtaLink cta={secondary} variant="secondary" /> : null}
          </CtaGroup>
        </div>
      </div>
    </section>
  );
}
