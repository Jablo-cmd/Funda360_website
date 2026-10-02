import { Compass, Eye, Lock, Users } from 'lucide-react';
import { aiPage } from '@/content/ai';
import { ctas } from '@/content/ctas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ConceptPanel } from '@/components/ui/ConceptPanel';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

export const metadata = pageMetadata(seoFor('/ai'));

// Presentation-only icons for the four principles, in content order.
const PRINCIPLE_ICONS = [Users, Eye, Lock, Compass];

export default function AiPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'AI & Intelligence', path: '/ai' }]} />
      <PageHero
        {...aiPage.hero}
        eyebrowTone="insight"
        primary={ctas.requestDemo}
        secondary={ctas.explorePlatform}
        layout="split"
        media={<ProductShot shot="detailTrend" priority reveal={false} />}
      />

      <Section id="approach" eyebrow="Principles" eyebrowTone="insight" heading={aiPage.principle.heading} intro={aiPage.principle.body}>
        <FeatureList
          items={aiPage.principle.points}
          columns={4}
          icon={(_, i) => {
            const Icon = PRINCIPLE_ICONS[i] ?? Compass;
            return (
              <span className="item__icon item__icon--insight">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            );
          }}
        />
      </Section>

      <Section id="information-to-attention" tone="muted" eyebrow="How it works" heading={aiPage.flow.heading}>
        <StepList steps={aiPage.flow.steps} highlight={2} />
      </Section>

      {/* Available and roadmap are separate sections with separate headings so they can never be read as one list. */}
      <Section id="available-today" tone="available" eyebrow="The foundation" eyebrowTone="insight" heading={aiPage.available.heading} intro={aiPage.available.intro}>
        <div className="split split--top">
          <FeatureList items={aiPage.available.items} layout="checks" insight showAvailable />
          <div className="stack">
            <ProductShot shot="analytics" />
            <ProductShot shot="dashboard" />
          </div>
        </div>
      </Section>

      <Section id="roadmap" tone="roadmap" eyebrow="Direction" heading={aiPage.roadmap.heading} intro={aiPage.roadmap.intro}>
        <div className="split split--top">
          <FeatureList items={aiPage.roadmap.items} layout="checks" />
          <ConceptPanel {...aiPage.concept} />
        </div>
      </Section>

      <FaqSection faqs={aiPage.faqs} />
      <CtaBanner heading="Talk to us about school intelligence" body="See the connected foundation available today and discuss where Funda360 intelligence is heading." />
      <PageSchema path="/ai" />
    </>
  );
}
