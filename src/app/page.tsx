import Link from 'next/link';
import { Database, Fingerprint, KeyRound, Lock, ScrollText, ShieldCheck } from 'lucide-react';
import { aiPage } from '@/content/ai';
import { ctas } from '@/content/ctas';
import { homePage } from '@/content/home';
import { sortedArticles } from '@/content/resources';
import { solutionPages } from '@/content/solutions';
import { ArticleList } from '@/components/ui/ArticleList';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { CtaLink } from '@/components/ui/CtaLink';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { ProductShot } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { CapabilityGroups } from '@/components/story/CapabilityGroups';
import { ConnectedHub } from '@/components/story/ConnectedHub';
import { MuaStory } from '@/components/story/MuaStory';
import { ProductTour } from '@/components/story/ProductTour';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

export const metadata = pageMetadata(seoFor('/'));

// Presentation-only icons for the trust items, in content order.
const TRUST_ICONS = [Database, KeyRound, ShieldCheck, ScrollText, Fingerprint, Lock];

export default function HomePage() {
  const { hero } = homePage;
  const insights = sortedArticles().slice(0, 3);
  return (
    <>
      {/* 1. Hero */}
      <section className="home-hero" aria-labelledby="page-title" data-section="hero">
        <div className="container">
          <div className="home-hero__copy">
            <p className="eyebrow">{hero.brand}</p>
            <h1 id="page-title" className="display">
              {hero.heading}
            </h1>
            <p className="lead">{hero.intro}</p>
            <div className="cta-group">
              <CtaLink cta={hero.primary} arrow />
              <CtaLink cta={hero.secondary} variant="secondary" />
            </div>
            <p className="home-hero__audience">{hero.audience}</p>
            <ul className="module-strip" aria-label="Connected in one platform">
              {hero.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container container--wide">
          <div className="home-hero__visual">
            <div className="home-hero__frame">
              <ProductShot shot={hero.shot} priority reveal={false} caption={false} sizes="(min-width: 82rem) 1200px, 100vw" />
            </div>
            <div className="home-hero__phone">
              <ProductShot shot={hero.phoneShot} reveal={false} caption={false} />
            </div>
            <p className="home-hero__note">Real Funda360 screens · fictional demo school</p>
          </div>
        </div>
      </section>

      {/* 2. Introduction */}
      <Section id={homePage.introduction.id} eyebrow="Funda360" heading={homePage.introduction.heading}>
        <div className="split split--top">
          <p className="lead">{homePage.introduction.body[0]}</p>
          <div>
            {homePage.introduction.body.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <CtaLink cta={{ label: 'Learn more about Funda360', href: '/about' }} variant="text" />
          </div>
        </div>
      </Section>

      {/* 3. Problem: fragmented school data */}
      <Section id={homePage.problem.id} tone="muted" eyebrow="The problem" heading={homePage.problem.heading} intro={homePage.problem.intro}>
        <FeatureList
          items={homePage.problem.items}
          columns={4}
          icon={(_, index) => (
            <span className="item__icon mono" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        />
      </Section>

      {/* 3b. Who it is for: solutions by audience */}
      <Section id={homePage.solutions.id} eyebrow="Solutions" heading={homePage.solutions.heading} intro={homePage.solutions.intro}>
        <LinkCardList
          variant="audience"
          columns={2}
          items={solutionPages.map((s) => ({ label: s.navLabel, title: s.tagline, description: s.summary, meta: s.audience, href: `/solutions/${s.slug}` }))}
        />
      </Section>

      {/* 4. Connected platform */}
      <Section id={homePage.connected.id} eyebrow="The connected platform" heading={homePage.connected.heading} intro={homePage.connected.intro} center>
        <ConnectedHub center={homePage.connected.center} nodes={homePage.connected.nodes} />
        <p className="section__footer section__footer--center">
          <CtaLink cta={homePage.connected.link} variant="text" />
        </p>
      </Section>

      {/* 5. Manage → Understand → Act */}
      <Section id={homePage.framework.id} tone="muted" eyebrow="How it works" heading={homePage.framework.heading} intro={homePage.framework.intro}>
        <MuaStory steps={homePage.framework.steps} story={homePage.framework.story} />
      </Section>

      {/* 6. Platform capabilities */}
      <Section id={homePage.capabilities.id} eyebrow="Platform" heading={homePage.capabilities.heading} intro={homePage.capabilities.intro}>
        <CapabilityGroups />
        <div className="section__footer">
          <CtaLink cta={homePage.capabilities.link} variant="secondary" arrow />
        </div>
      </Section>

      {/* 7. Product UI showcase */}
      <Section id={homePage.showcase.id} tone="navy" wide eyebrow="Product tour" heading={homePage.showcase.heading} intro={homePage.showcase.intro}>
        <ProductTour items={homePage.showcase.tour} label="Funda360 product screens" />
      </Section>

      {/* 8. AI & Intelligence */}
      <Section id={homePage.ai.id} tone="intelligence" eyebrow="Intelligence" eyebrowTone="insight" heading={homePage.ai.heading} intro={homePage.ai.intro}>
        <div className="split split--top">
          <div>
            <h3>{aiPage.available.heading}</h3>
            <FeatureList items={aiPage.available.items.slice(0, 3)} level={4} layout="checks" insight />
            <h3 className="spaced-top">{aiPage.roadmap.heading}</h3>
            <FeatureList items={aiPage.roadmap.items.slice(0, 3)} level={4} layout="checks" />
            <div className="section__footer">
              <CtaLink cta={homePage.ai.link} variant="secondary" arrow />
            </div>
          </div>
          <div>
            <ProductShot shot="detailTrend" />
            <p className="meta spaced-top-sm">
              Available today: attendance trends with an attention threshold, and an alert when a learner falls below it.
            </p>
          </div>
        </div>
      </Section>

      {/* 10. Trust & security */}
      <Section id={homePage.trust.id} tone="navy" eyebrow="Trust and security" heading={homePage.trust.heading} intro={homePage.trust.intro}>
        <ul className="trust-list">
          {homePage.trust.items.map((item, index) => {
            const Icon = TRUST_ICONS[index] ?? ShieldCheck;
            return (
              <li key={item.title}>
                <span className="item__icon">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="trust-note">
          {homePage.trust.note} <Link href="/security">How Funda360 protects school information</Link>
        </p>
      </Section>

      {/* 11. What makes Funda360 different (factual) */}
      <Section id={homePage.different.id} eyebrow="Why Funda360" heading={homePage.different.heading} intro={homePage.different.intro}>
        <ul className="outcomes">
          {homePage.different.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 12. Resources / insights (only once articles are visible) */}
      {insights.length ? (
      <Section id={homePage.resources.id} tone="muted" eyebrow="Resources" heading={homePage.resources.heading} intro={homePage.resources.intro}>
        <ArticleList articles={insights} />
        <div className="section__footer">
          <CtaLink cta={homePage.resources.link} variant="secondary" arrow />
        </div>
      </Section>
      ) : null}

      {/* 13. Request a demo CTA */}
      <CtaBanner heading="Ready to see Funda360 in action?" secondary={ctas.exploreSolutions} />
      <PageSchema path="/" breadcrumb={false} />
    </>
  );
}
