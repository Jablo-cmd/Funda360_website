import Link from 'next/link';
import { ctas } from '@/content/ctas';
import type { SolutionPageContent, SolutionSection } from '@/content/solutions';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';

/**
 * Solution pages share a frame (hero, audience, FAQs, CTA) but each page
 * composes its own sequence of section kinds, so audiences get content
 * shaped around their questions rather than one duplicated layout.
 */
export function SolutionPageTemplate({ page }: { page: SolutionPageContent }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Solutions', path: '/solutions' }, { name: page.navLabel, path: `/solutions/${page.slug}` }]} />

      <PageHero eyebrow={page.hero.eyebrow} heading={page.hero.heading} intro={page.hero.intro} primary={ctas.requestDemo} secondary={ctas.explorePlatform}>
        <p className="meta">
          <strong>Who this is for:</strong> {page.audience}
        </p>
      </PageHero>

      {page.sections.map((section, index) => (
        <SolutionSectionView key={`${section.kind}-${index}`} section={section} id={`${section.kind}-${index + 1}`} />
      ))}

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading={page.cta.heading} body={page.cta.body} secondary={ctas.exploreSolutions} />
    </>
  );
}

function SolutionSectionView({ section, id }: { section: SolutionSection; id: string }) {
  switch (section.kind) {
    case 'challenges':
    case 'considerations':
      return (
        <Section id={id} heading={section.heading} intro={section.intro}>
          <FeatureList items={section.items} />
        </Section>
      );
    case 'capabilities':
      return (
        <Section id={id} heading={section.heading} intro={section.intro}>
          <FeatureList items={section.items} />
        </Section>
      );
    case 'roles':
      return (
        <Section id={id} heading={section.heading} intro={section.intro}>
          <LinkCardList items={section.items.map((r) => ({ title: r.role, description: r.description, href: r.href }))} />
        </Section>
      );
    case 'dayInLife':
      return (
        <Section id={id} heading={section.heading} intro={section.intro}>
          <ol className="timeline">
            {section.items.map((item) => (
              <li key={item.time} className="item">
                <h3 className="item__title">{item.time}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      );
    case 'questions':
      return (
        <Section id={id} heading={section.heading} intro={section.intro}>
          <ul className="grid" role="list">
            {section.items.map((item) => (
              <li key={item.question} className="item">
                <h3 className="item__title">{item.question}</h3>
                <p>{item.answer}</p>
                {item.href ? (
                  <p>
                    <Link href={item.href}>
                      Learn more<span className="visually-hidden">: {item.question}</span>
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
        <Section id={id} heading={section.heading} intro={section.intro}>
          <ProductShotGallery shots={section.shots} />
        </Section>
      );
  }
}
