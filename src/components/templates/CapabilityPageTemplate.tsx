import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctas } from '@/content/ctas';
import type { CapabilityPageContent } from '@/content/platform';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot, ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';

/**
 * Shared structure for every /platform/* detail page:
 * Introduction → Problem/context → Capabilities → Key workflows →
 * Product UI → Benefits/outcomes → Related capabilities → FAQs → CTA.
 */
export function CapabilityPageTemplate({ page }: { page: CapabilityPageContent }) {
  const [heroShot, ...moreShots] = page.shots;
  const galleryShots = moreShots.length ? moreShots : page.shots;

  return (
    <>
      <Breadcrumbs trail={[{ name: 'Platform', path: '/platform' }, { name: page.navLabel, path: `/platform/${page.slug}` }]} />

      <PageHero
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        intro={page.hero.intro}
        primary={ctas.requestDemo}
        secondary={ctas.explorePlatform}
        layout="split"
        media={heroShot ? <ProductShot shot={heroShot} priority reveal={false} /> : undefined}
      />

      <Section id="context" eyebrow="The challenge" heading={page.problem.heading} intro={page.problem.body}>
        <ol className="grid grid--3 pain-list">
          {page.problem.points.map((point, i) => (
            <li key={point} className="item">
              <span className="item__icon mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{point}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="capabilities" tone="muted" eyebrow="Capabilities" heading={page.capabilities.heading} intro={page.capabilities.intro}>
        <FeatureList items={page.capabilities.items} layout="checks" columns={2} />
      </Section>

      <Section id="workflows" eyebrow="Workflows" heading={page.workflows.heading} intro={page.workflows.intro}>
        <div className="stack workflows">
          {page.workflows.items.map((workflow) => (
            <article key={workflow.title} className="workflow" aria-labelledby={`workflow-${slugify(workflow.title)}`}>
              <h3 id={`workflow-${slugify(workflow.title)}`}>{workflow.title}</h3>
              <ol className="steps">
                {workflow.steps.map((step) => (
                  <li key={step}>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section id="product" tone="navy" eyebrow="In the product" heading={`${page.navLabel} in Funda360`} intro="Real Funda360 screens, shown with a fictional demo school.">
        <ProductShotGallery shots={galleryShots} />
      </Section>

      <Section id="outcomes" eyebrow="Outcomes" heading={page.outcomes.heading}>
        <ul className="outcomes">
          {page.outcomes.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="related" tone="muted" eyebrow="Connected capabilities" heading="Related capabilities">
        <LinkCardList
          columns={3}
          items={page.related.map((r) => ({
            title: r.label,
            description: r.description,
            href: r.href,
            icon: <AreaIcon id={r.href === '/ai' ? 'ai-intelligence' : (r.href.split('/').pop() ?? '')} />,
          }))}
        />
        <p className="section__footer">
          <Link href="/platform" className="item__more">
            See all platform capabilities
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
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
