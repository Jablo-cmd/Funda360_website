import Link from 'next/link';
import type { Feature } from '@/content/types';
import { AvailabilityBadge } from './AvailabilityBadge';

type Item = Feature & { href?: string };

type Props = {
  items: Item[];
  /** Heading level for item titles. Defaults to h3 inside an h2 section. */
  level?: 3 | 4;
  showAvailable?: boolean;
  /** Layout hint: "grid" (cards that reflow) or "stack" (single column). */
  layout?: 'grid' | 'stack';
};

/** A list of titled items (features, benefits, challenges, outcomes). */
export function FeatureList({ items, level = 3, showAvailable = false, layout = 'grid' }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ul className={layout === 'grid' ? 'grid' : 'stack'} role="list">
      {items.map((item) => (
        <li key={item.title} className="item" data-availability={item.availability ?? 'available'}>
          <Heading className="item__title">{item.title}</Heading>
          <AvailabilityBadge availability={item.availability} showAvailable={showAvailable} />
          <p>{item.description}</p>
          {item.href ? (
            <p>
              <Link href={item.href}>
                Learn more<span className="visually-hidden"> about {item.title}</span>
              </Link>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
