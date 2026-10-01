import Link from 'next/link';
import { ctas } from '@/content/ctas';
import type { CapabilityPageContent } from '@/content/platform';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';

/**
 * Shared structure for every /platform/* detail page:
 * Introduction → Problem/context → Capabilities → Key workflows →
 * Product UI → Benefits/outcomes → Related capabilities → FAQs → CTA.
 */
export function CapabilityPageTemplate({ page }: { page: CapabilityPageContent }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Platform', path: '/platform' }, { name: page.navLabel, path: `/platform/${page.slug}` }]} />

      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} intro={page.hero.intro} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />

      <Section id="context" heading={page.problem.heading} intro={page.problem.body}>
        <ul className="bullets">
          {page.problem.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Section>

      <Section id="capabilities" heading={page.capabilities.heading} intro={page.capabilities.intro}>
        <FeatureList items={page.capabilities.items} />
      </Section>

      <Section id="workflows" heading={page.workflows.heading} intro={page.workflows.intro}>
        <div className="grid grid--wide">
          {page.workflows.items.map((workflow) => (
            <article key={workflow.title} className="item" aria-labelledby={`workflow-${slugify(workflow.title)}`}>
              <h3 id={`workflow-${slugify(workflow.title)}`} className="item__title">
                {workflow.title}
              </h3>
              <ol className="numbered">
                {workflow.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section id="product" heading={`${page.navLabel} in Funda360`}>
        <ProductShotGallery shots={page.shots} />
      </Section>

      <Section id="outcomes" heading={page.outcomes.heading}>
        <FeatureList items={page.outcomes.items} />
      </Section>

      <Section id="related" heading="Related capabilities">
        <LinkCardList items={page.related.map((r) => ({ title: r.label, description: r.description, href: r.href }))} />
        <p>
          <Link href="/platform">See all platform capabilities</Link>
        </p>
      </Section>

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading={`See ${page.navLabel} in action`} />
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
