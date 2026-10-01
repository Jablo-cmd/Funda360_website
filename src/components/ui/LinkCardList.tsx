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
};

type Props = { items: LinkCard[]; level?: 3 | 4 };

/**
 * Cards whose title is the link (meaningful link text, one tab stop per card).
 * Cards without an href render as plain content.
 */
export function LinkCardList({ items, level = 3 }: Props) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ul className="grid" role="list">
      {items.map((item) => (
        <li key={item.title} className="item">
          <Heading className="item__title">{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</Heading>
          <AvailabilityBadge availability={item.availability} />
          {item.meta ? <p className="meta">{item.meta}</p> : null}
          <p>{item.description}</p>
          {item.points?.length ? (
            <ul className="bullets">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
