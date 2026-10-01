import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Cta } from '@/content/types';

type Props = {
  cta: Cta;
  variant?: 'primary' | 'secondary' | 'text';
  /** Trailing arrow for forward-moving actions. */
  arrow?: boolean;
  className?: string;
};

/**
 * Every call-to-action on the site goes through this component so CTA
 * styling and analytics (data-cta) are applied in one place.
 *
 * External CTAs (Login) are plain anchors to the Funda360 application and
 * carry visually hidden context so the link text stays meaningful.
 */
export function CtaLink({ cta, variant = 'primary', arrow, className }: Props) {
  const classes = ['cta', `cta--${variant}`, className].filter(Boolean).join(' ');
  const showArrow = arrow ?? variant === 'text';

  if (cta.external) {
    return (
      <a href={cta.href} className={classes} data-cta={cta.label}>
        {cta.label}
        <span className="visually-hidden"> (opens the Funda360 application)</span>
      </a>
    );
  }

  return (
    <Link href={cta.href} className={classes} data-cta={cta.label}>
      {cta.label}
      {showArrow ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </Link>
  );
}

export function CtaGroup({ children }: { children: React.ReactNode }) {
  return <div className="cta-group">{children}</div>;
}
