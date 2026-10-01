import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ctas } from '@/content/ctas';
import { homePage } from '@/content/home';
import { platformAreaDetails, platformAreas, platformOverview } from '@/content/platform';
import type { ProductShotKey } from '@/content/screenshots';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { CapabilityGroups } from '@/components/story/CapabilityGroups';
import { ConnectedHub } from '@/components/story/ConnectedHub';
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({ ...platformOverview.seo, path: '/platform' });

/** Real product screen shown beside each area (presentation choice; areas without one show their detail list). */
const AREA_SHOTS: Partial<Record<string, ProductShotKey>> = {
  'learner-management': 'learnerDirectory',
  'academics-curriculum': 'academicPerformance',
  'assessments-results': 'reporting',
  attendance: 'attendance',
  'fees-finance': 'finance',
  communication: 'communication',
  'performance-analytics': 'dashboard',
  reporting: 'analytics',
  'ai-intelligence': 'detailTrend',
};

export default function PlatformPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Platform', path: '/platform' }]} />
      <PageHero {...platformOverview.hero} primary={ctas.requestDemo} secondary={ctas.exploreSolutions} layout="split" media={<ProductShot shot="dashboard" priority reveal={false} />} />

      <Section id={platformOverview.connected.id} eyebrow="Connected by design" heading={platformOverview.connected.heading} intro={platformOverview.connected.intro} center>
        <ConnectedHub center={homePage.connected.center} nodes={homePage.connected.nodes} />
        <div className="section__footer">
          <FeatureList
            layout="checks"
            columns={2}
            level={3}
            items={platformOverview.connected.points.map((point, i) => ({ title: platformOverview.connected.pointTitles[i], description: point }))}
          />
        </div>
      </Section>

      <Section id={platformOverview.areasSection.id} tone="muted" eyebrow="Twelve areas, four groups" heading={platformOverview.areasSection.heading} intro={platformOverview.areasSection.intro}>
        <CapabilityGroups />
      </Section>

      {/* One section per capability area; each links to its detail page where one exists. */}
      {platformAreas.map((area, index) => {
        const shot = AREA_SHOTS[area.id];
        const details = platformAreaDetails[area.id];
        const copy = (
          <div>
            <div className="area__head">
              <span className={`item__icon${area.id === 'ai-intelligence' ? ' item__icon--insight' : ''}`}>
                <AreaIcon id={area.id} />
              </span>
              <AvailabilityBadge availability={area.availability} />
            </div>
            <h2 id={`${area.id}-heading`}>{area.title}</h2>
            <p className="lead">{area.summary}</p>
            {shot || !details ? (
              <ul className="bullets">
                {area.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
            {area.href ? (
              <p>
                <Link href={area.href} className="cta cta--secondary">
                  Explore {area.title}
                  <span className="visually-hidden"> in detail</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </p>
            ) : null}
          </div>
        );
        const media = shot ? (
          <ProductShot shot={shot} />
        ) : details ? (
          <FeatureList items={details} layout="checks" level={3} />
        ) : null;
        return (
          <section key={area.id} id={area.id} aria-labelledby={`${area.id}-heading`} className="area">
            <div className="container">
              <div className={`split${index % 2 ? ' split--reverse' : ''}`}>
                {copy}
                {media}
              </div>
            </div>
          </section>
        );
      })}

      <Section id={platformOverview.portals.id} tone="navy" eyebrow="Portals" heading={platformOverview.portals.heading} intro={platformOverview.portals.intro}>
        <div className="split">
          <FeatureList
            layout="checks"
            level={3}
            items={platformOverview.portals.items}
          />
          <ProductShot shot="parentPortal" />
        </div>
      </Section>

      <FaqSection faqs={platformOverview.faqs} />
      <CtaBanner secondary={ctas.exploreAi} />
      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
