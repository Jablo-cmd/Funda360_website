import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctas } from '@/content/ctas';
import type { SolutionPageContent, SolutionSection } from '@/content/solutions';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot, ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';

/** Section-kind eyebrows (presentation labels). */
const EYEBROWS: Record<SolutionSection['kind'], string> = {
  challenges: 'The challenge',
  roles: 'Roles',
  dayInLife: 'A day with Funda360',
  questions: 'Questions answered',
  capabilities: 'How Funda360 helps',
  shots: 'In the product',
  considerations: 'Planning',
};

/**
 * Solution pages share a frame (hero, audience, FAQs, CTA) but each page
 * composes its own sequence of section kinds, so audiences get content
 * shaped around their questions rather than one duplicated layout.
 */
export function SolutionPageTemplate({ page }: { page: SolutionPageContent }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Solutions', path: '/solutions' }, { name: page.navLabel, path: `/solutions/${page.slug}` }]} />

      <PageHero
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        intro={page.hero.intro}
        primary={ctas.requestDemo}
        secondary={ctas.explorePlatform}
        layout={page.heroShot ? 'split' : 'stacked'}
        media={page.heroShot ? <ProductShot shot={page.heroShot} priority reveal={false} /> : undefined}
      >
        <p className="hero__audience">
          <strong>Who this is for:</strong> {page.audience}
        </p>
      </PageHero>

      {page.sections.map((section, index) => (
        <SolutionSectionView key={`${section.kind}-${index}`} section={section} id={`${section.kind}-${index + 1}`} muted={index % 2 === 0} />
      ))}

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading={page.cta.heading} body={page.cta.body} secondary={ctas.exploreSolutions} />
    </>
  );
}

function SolutionSectionView({ section, id, muted }: { section: SolutionSection; id: string; muted: boolean }) {
  const tone = section.kind === 'shots' ? 'navy' : muted ? 'muted' : undefined;
  const common = { id, heading: section.heading, intro: section.intro, eyebrow: EYEBROWS[section.kind], tone } as const;

  switch (section.kind) {
    case 'challenges':
      return (
        <Section {...common}>
          <FeatureList
            items={section.items}
            columns={3}
            icon={(_, i) => (
              <span className="item__icon mono" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
          />
        </Section>
      );
    case 'considerations':
      return (
        <Section {...common}>
          <FeatureList items={section.items} layout="checks" columns={2} />
        </Section>
      );
    case 'capabilities':
      return (
        <Section {...common}>
          <FeatureList items={section.items} columns={section.items.length > 4 ? 3 : 2} />
        </Section>
      );
    case 'roles':
      return (
        <Section {...common}>
          <LinkCardList
            columns={3}
            items={section.items.map((r) => ({
              title: r.role,
              description: r.description,
              href: r.href,
              icon: <AreaIcon id={r.href?.split(/[/#]/).pop() ?? ''} />,
            }))}
          />
        </Section>
      );
    case 'dayInLife':
      return (
        <Section {...common}>
          <ol className="timeline">
            {section.items.map((item) => (
              <li key={item.time}>
                <h3 className="item__title">{item.time}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      );
    case 'questions':
      return (
        <Section {...common}>
          <ul className="grid grid--2" role="list">
            {section.items.map((item) => (
              <li key={item.question} className="item question-card">
                <span className="question-card__mark" aria-hidden="true">
                  Q
                </span>
                <h3 className="item__title">{item.question}</h3>
                <p>{item.answer}</p>
                {item.href ? (
                  <p>
                    <Link href={item.href} className="item__more">
                      Learn more<span className="visually-hidden">: {item.question}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      );
    case 'shots':
      return (
        <Section {...common} intro={section.intro ?? 'Real Funda360 screens, shown with a fictional demo school.'}>
          <ProductShotGallery shots={section.shots} />
        </Section>
      );
  }
}
