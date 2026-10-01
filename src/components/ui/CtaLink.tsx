import Link from 'next/link';
import type { Cta } from '@/content/types';

type Props = {
  cta: Cta;
  /** Structural emphasis only. Visual treatment is a Phase 2 decision. */
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
};

/**
 * Every call-to-action on the site goes through this component so CTA
 * styling and analytics can be applied in one place later.
 *
 * External CTAs (Login) are plain anchors to the Funda360 application and
 * carry visually hidden context so the link text stays meaningful.
 */
export function CtaLink({ cta, variant = 'primary', className }: Props) {
  const classes = ['cta', `cta--${variant}`, className].filter(Boolean).join(' ');

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
    </Link>
  );
}

export function CtaGroup({ children }: { children: React.ReactNode }) {
  return <div className="cta-group">{children}</div>;
}
