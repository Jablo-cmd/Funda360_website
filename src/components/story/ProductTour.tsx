'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { ProductShotKey } from '@/content/screenshots';
import { ProductShot } from '@/components/ui/ProductShot';

export type TourItem = {
  id: string;
  label: string;
  shot: ProductShotKey;
  title: string;
  body: string;
  link: { label: string; href: string };
};

/**
 * Product tour: WAI-ARIA tabs (arrow keys, Home/End, roving tabindex).
 * Without JavaScript the tab list is hidden and every panel is shown in turn.
 */
export function ProductTour({ items, label }: { items: TourItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(items.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  return (
    <div className="tour">
      <div className="tour__tabs" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`tour-tab-${item.id}`}
            type="button"
            role="tab"
            className="tour__tab"
            aria-selected={index === active}
            aria-controls={`tour-panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          id={`tour-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`tour-tab-${item.id}`}
          className="tour__panel"
          data-active={index === active || undefined}
          tabIndex={0}
        >
          <div className="tour__copy">
            <p className="eyebrow">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <p>
              <Link href={item.link.href} className="item__more">
                {item.link.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </div>
          <ProductShot shot={item.shot} reveal={false} sizes="(min-width: 64rem) 820px, 100vw" />
        </div>
      ))}
    </div>
  );
}
