import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctas } from '@/content/ctas';
import type { CapabilityPageContent } from '@/content/platform';
import { articlesForPage } from '@/content/resources';
import type { SeoPath } from '@/content/seo';
import { solutionPages } from '@/content/solutions';
import { ArticleList } from '@/components/ui/ArticleList';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { PageSchema } from '@/components/ui/PageSchema';
import { ProductShot, ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';

/**
 * Shared structure for every /platform/* detail page. Each page works as a
 * standalone landing page for its search intent:
 * Introduction → What it is → Problem → Capabilities → Who uses it →
 * Key workflows → Product UI → Outcomes → Related capabilities and
 * solutions → Related reading → FAQs → CTA.
 */
export function CapabilityPageTemplate({ page }: { page: CapabilityPageContent }) {
  const path = `/platform/${page.slug}`;
  const [heroShot, ...moreShots] = page.shots;
  const galleryShots = moreShots.length ? moreShots : page.shots;
  const solutions = page.solutions.map((slug) => solutionPages.find((s) => s.slug === slug)).filter((s) => s !== undefined);
  const reading = articlesForPage(path);

  return (
    <>
      <Breadcrumbs trail={[{ name: 'Platform', path: '/platform' }, { name: page.navLabel, path }]} />

      <PageHero
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        intro={page.hero.intro}
        primary={ctas.requestDemo}
        secondary={ctas.explorePlatform}
        layout="split"
        media={heroShot ? <ProductShot shot={heroShot} priority reveal={false} /> : undefined}
      />

      <Section id="overview" eyebrow={page.navLabel} heading={page.overview.heading}>
        <div className="split split--top">
          <p className="lead">{page.overview.body[0]}</p>
          <div>
            {page.overview.body.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="context" tone="muted" eyebrow="The challenge" heading={page.problem.heading} intro={page.problem.body}>
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

      <Section id="capabilities" eyebrow="Capabilities" heading={page.capabilities.heading} intro={page.capabilities.intro}>
        <FeatureList items={page.capabilities.items} layout="checks" columns={2} />
      </Section>

      <Section id="who-uses-it" tone="muted" eyebrow="Roles" heading={`Who uses ${page.navLabel}`}>
        <ul className={`grid grid--${page.users.length === 3 ? 3 : 4}`} role="list">
          {page.users.map((user) => (
            <li key={user.role} className="item">
              <h3 className="item__title">{user.role}</h3>
              <p>{user.description}</p>
            </li>
          ))}
        </ul>
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
        {solutions.length ? (
          <div className="related-solutions">
            <h3>{page.navLabel} for your role</h3>
            <ul className="pill-nav">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`}>Funda360 for {s.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="section__footer">
          <Link href="/platform" className="item__more">
            See all school management capabilities
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </Section>

      {reading.length ? (
        <Section id="related-reading" eyebrow="Insights" heading="Related reading">
          <ArticleList articles={reading} />
        </Section>
      ) : null}

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading={`See ${page.navLabel} in action`} />
      <PageSchema path={path as SeoPath} />
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
