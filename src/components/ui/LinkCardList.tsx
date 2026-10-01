import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Availability } from '@/content/types';
import { AvailabilityBadge } from './AvailabilityBadge';

export type LinkCard = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
  points?: string[];
  availability?: Availability;
  /** Small mono label above the title. */
  label?: string;
  icon?: React.ReactNode;
};

type Props = { items: LinkCard[]; level?: 3 | 4; columns?: 2 | 3 | 4; variant?: 'default' | 'audience' };

/**
 * Cards whose title is the link (meaningful link text, one tab stop per card;
 * the whole card is clickable via the stretched title link).
 */
export function LinkCardList({ items, level = 3, columns, variant = 'default' }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ul className={`grid${columns ? ` grid--${columns}` : ''}`} role="list">
      {items.map((item) => (
        <li key={item.title} className={`item${variant === 'audience' ? ' audience-card' : ''}`}>
          {item.icon ? <span className="item__icon">{item.icon}</span> : null}
          {item.label ? <span className="audience-card__label">{item.label}</span> : null}
          <Heading className="item__title">{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</Heading>
          <AvailabilityBadge availability={item.availability} />
          <p>{item.description}</p>
          {item.points?.length ? (
            <ul className="bullets">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
          {item.meta ? <p className="meta">{item.meta}</p> : null}
          {item.href ? (
            <span className="item__more" aria-hidden="true">
              Explore <ArrowRight size={16} />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
