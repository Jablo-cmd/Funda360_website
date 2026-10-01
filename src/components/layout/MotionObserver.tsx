'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Gentle entrance for product visuals marked with [data-reveal].
 * CSS only hides them when JS runs and the user has not asked for reduced
 * motion, so content is never lost without JavaScript.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
