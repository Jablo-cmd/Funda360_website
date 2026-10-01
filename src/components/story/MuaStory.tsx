import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ProductShotKey } from '@/content/screenshots';
import type { Feature } from '@/content/types';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { ProductShot } from '@/components/ui/ProductShot';

type StoryStep = { step: string; shot: ProductShotKey; caption: string; link: { label: string; href: string } };

/**
 * Manage → Understand → Act: the core product story, told with one real
 * Funda360 screen per step. The Act step carries explicit availability
 * labels: alerts exist today, intelligence is on the roadmap.
 */
export function MuaStory({ steps, story, level = 3 }: { steps: readonly Feature[]; story: readonly StoryStep[]; level?: 3 | 4 }) {
  const Heading = `h${level}` as 'h3' | 'h4';
  return (
    <ol className="mua">
      {steps.map((step, index) => {
        const detail = story[index];
        return (
          <li key={step.title} className="mua__step" data-step={detail?.step}>
            <div className="mua__copy">
              <p className="mua__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')} · {step.title}
              </p>
              <Heading>{step.title}</Heading>
              <p>{step.description}</p>
              {detail?.step === 'act' ? (
                <p className="mua__badges">
                  <AvailabilityBadge availability="available" showAvailable />
                  <span className="meta">Alerts</span>
                  <AvailabilityBadge availability="roadmap" />
                  <span className="meta">AI insights</span>
                </p>
              ) : null}
              {detail ? (
                <p>
                  <Link href={detail.link.href} className="item__more">
                    {detail.link.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </p>
              ) : null}
            </div>
            {detail ? (
              <div>
                <ProductShot shot={detail.shot} caption={false} />
                <p className="meta mua__caption">{detail.caption}</p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
