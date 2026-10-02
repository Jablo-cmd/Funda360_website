import { ArrowRight, Check, CircleDashed } from 'lucide-react';
import Link from 'next/link';
import type { Feature } from '@/content/types';
import { linkLabelFor } from '@/lib/links';
import { AvailabilityBadge } from './AvailabilityBadge';

type Item = Feature & { href?: string };

type Props = {
  items: Item[];
  /** Heading level for item titles. Defaults to h3 inside an h2 section. */
  level?: 3 | 4;
  showAvailable?: boolean;
  /** "grid": reflowing cards; "stack": single column of cards; "checks": compact check list. */
  layout?: 'grid' | 'stack' | 'checks';
  /** Column hint for the grid on large screens. */
  columns?: 2 | 3 | 4;
  /** Optional icon renderer per item (presentation only). */
  icon?: (item: Item, index: number) => React.ReactNode;
  /** Use the teal intelligence accent for check marks. */
  insight?: boolean;
};

/** A list of titled items (features, benefits, challenges, outcomes). */
export function FeatureList({ items, level = 3, showAvailable = false, layout = 'grid', columns, icon, insight }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';

  if (layout === 'checks') {
    return (
      <ul className={`check-list${insight ? ' check-list--insight' : ''}${columns === 2 ? ' check-list--2col' : ''}`} role="list">
        {items.map((item) => (
          <li key={item.title} data-availability={item.availability ?? 'available'}>
            {/* A check means "available"; roadmap/unconfirmed items never get one. */}
            {item.availability && item.availability !== 'available' ? (
              <CircleDashed size={20} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Check size={20} strokeWidth={2.25} aria-hidden="true" />
            )}
            <div>
              <Heading className="item__title">{item.title}</Heading>
              <AvailabilityBadge availability={item.availability} showAvailable={showAvailable} />
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const gridClass = layout === 'grid' ? `grid${columns ? ` grid--${columns}` : ''}` : 'stack';
  return (
    <ul className={gridClass} role="list">
      {items.map((item, index) => (
        <li key={item.title} className="item" data-availability={item.availability ?? 'available'}>
          {icon ? icon(item, index) : null}
          <Heading className="item__title">{item.title}</Heading>
          <AvailabilityBadge availability={item.availability} showAvailable={showAvailable} />
          <p>{item.description}</p>
          {item.href ? (
            <p>
              <Link href={item.href} className="item__more">
                {linkLabelFor(item.href)}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
