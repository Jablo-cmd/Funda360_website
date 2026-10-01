import Link from 'next/link';
import { ctas } from '@/content/ctas';
import { platformAreaDetails, platformAreas, platformOverview } from '@/content/platform';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot, ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({ ...platformOverview.seo, path: '/platform' });

export default function PlatformPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Platform', path: '/platform' }]} />
      <PageHero {...platformOverview.hero} primary={ctas.requestDemo} secondary={ctas.exploreSolutions}>
        <ProductShot shot="dashboard" showBrief={false} />
      </PageHero>

      <Section id={platformOverview.connected.id} heading={platformOverview.connected.heading} intro={platformOverview.connected.intro}>
        <ul className="bullets">
          {platformOverview.connected.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Section>

      <Section id={platformOverview.areasSection.id} heading={platformOverview.areasSection.heading} intro={platformOverview.areasSection.intro}>
        <nav aria-label="Platform capability areas">
          <ul className="grid" role="list">
            {platformAreas.map((area) => (
              <li key={area.id} className="item">
                <a href={`#${area.id}`}>{area.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {/* One section per capability area; each links to its detail page where one exists. */}
      {platformAreas.map((area) => (
        <Section key={area.id} id={area.id} heading={area.title} intro={area.summary}>
          <AvailabilityBadge availability={area.availability} />
          {platformAreaDetails[area.id] ? (
            <FeatureList items={platformAreaDetails[area.id]} />
          ) : (
            <ul className="bullets">
              {area.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {area.href ? (
            <p>
              <Link href={area.href}>
                Explore {area.title}
                <span className="visually-hidden"> in detail</span>
              </Link>
            </p>
          ) : null}
        </Section>
      ))}

      <Section id={platformOverview.portals.id} heading={platformOverview.portals.heading} intro={platformOverview.portals.intro}>
        <ProductShotGallery shots={['parentPortal']} />
      </Section>

      <FaqSection faqs={platformOverview.faqs} />
      <CtaBanner secondary={ctas.exploreAi} />
      <JsonLd data={softwareApplicationJsonLd()} />
    </>
  );
}
