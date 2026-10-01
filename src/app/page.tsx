import Link from 'next/link';
import { aiPage } from '@/content/ai';
import { CtaLink } from '@/components/ui/CtaLink';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { ProductShot, ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import { ArticleList } from '@/components/ui/ArticleList';
import { ctas } from '@/content/ctas';
import { homePage } from '@/content/home';
import { platformAreas } from '@/content/platform';
import { sortedArticles } from '@/content/resources';
import { solutionPages } from '@/content/solutions';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...homePage.seo, path: '/' });

export default function HomePage() {
  const { hero } = homePage;
  return (
    <>
      {/* 1. Hero */}
      <section className="hero" aria-labelledby="page-title" data-section="hero">
        <div className="container two-column">
          <div>
            <p className="eyebrow">{hero.brand}</p>
            <h1 id="page-title">{hero.heading}</h1>
            <p className="lead">{hero.intro}</p>
            <div className="cta-group">
              <CtaLink cta={hero.primary} />
              <CtaLink cta={hero.secondary} variant="secondary" />
            </div>
          </div>
          <ProductShot shot={hero.shot} priority showBrief={false} />
        </div>
      </section>

      {/* 2. Introduction */}
      <Section id={homePage.introduction.id} heading={homePage.introduction.heading}>
        {homePage.introduction.body.map((p) => (
          <p key={p} className="lead">
            {p}
          </p>
        ))}
        <p>
          <Link href="/about">Learn more about Funda360</Link>
        </p>
      </Section>

      {/* 3. Problem: fragmented school data */}
      <Section id={homePage.problem.id} heading={homePage.problem.heading} intro={homePage.problem.intro}>
        <FeatureList items={homePage.problem.items} />
      </Section>

      {/* 4. Connected platform */}
      <Section id={homePage.connected.id} heading={homePage.connected.heading} intro={homePage.connected.intro}>
        <p>
          <Link href={homePage.connected.link.href}>{homePage.connected.link.label}</Link>
        </p>
      </Section>

      {/* 5. Manage → Understand → Act */}
      <Section id={homePage.framework.id} heading={homePage.framework.heading} intro={homePage.framework.intro}>
        <StepList steps={homePage.framework.steps} />
      </Section>

      {/* 6. Platform capabilities */}
      <Section id={homePage.capabilities.id} heading={homePage.capabilities.heading} intro={homePage.capabilities.intro}>
        <LinkCardList items={platformAreas.map((a) => ({ title: a.title, description: a.summary, href: a.href ?? `/platform#${a.id}`, availability: a.availability }))} />
        <CtaLink cta={homePage.capabilities.link} variant="secondary" />
      </Section>

      {/* 7. Product UI showcase */}
      <Section id={homePage.showcase.id} heading={homePage.showcase.heading} intro={homePage.showcase.intro}>
        <ProductShotGallery shots={homePage.showcase.shots} />
      </Section>

      {/* 8. AI & Intelligence */}
      <Section id={homePage.ai.id} heading={homePage.ai.heading} intro={homePage.ai.intro}>
        <div className="two-column">
          <div>
            <h3>{aiPage.available.heading}</h3>
            <FeatureList items={aiPage.available.items.slice(0, 3)} level={4} layout="stack" showAvailable />
          </div>
          <div>
            <h3>{aiPage.roadmap.heading}</h3>
            <FeatureList items={aiPage.roadmap.items.slice(0, 3)} level={4} layout="stack" />
          </div>
        </div>
        <CtaLink cta={homePage.ai.link} variant="secondary" />
      </Section>

      {/* 9. Solutions by audience */}
      <Section id={homePage.solutions.id} heading={homePage.solutions.heading} intro={homePage.solutions.intro}>
        <LinkCardList items={solutionPages.map((s) => ({ title: s.navLabel, description: s.summary, meta: s.audience, href: `/solutions/${s.slug}` }))} />
      </Section>

      {/* 10. Trust & security */}
      <Section id={homePage.trust.id} heading={homePage.trust.heading} intro={homePage.trust.intro}>
        <FeatureList items={homePage.trust.items} />
        <p className="meta">{homePage.trust.note}</p>
      </Section>

      {/* 11. Education impact / outcomes */}
      <Section id={homePage.impact.id} heading={homePage.impact.heading} intro={homePage.impact.intro}>
        <FeatureList items={homePage.impact.items} />
      </Section>

      {/* 12. Resources / insights */}
      <Section id={homePage.resources.id} heading={homePage.resources.heading} intro={homePage.resources.intro}>
        <ArticleList articles={sortedArticles().slice(0, 3)} />
        <CtaLink cta={homePage.resources.link} variant="secondary" />
      </Section>

      {/* 13. Request a demo CTA */}
      <CtaBanner secondary={ctas.exploreSolutions} />
    </>
  );
}
