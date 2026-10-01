import { aiPage } from '@/content/ai';
import { ctas } from '@/content/ctas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShotGallery } from '@/components/ui/ProductShot';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...aiPage.seo, path: '/ai' });

export default function AiPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'AI & Intelligence', path: '/ai' }]} />
      <PageHero {...aiPage.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />

      <Section id="approach" heading={aiPage.principle.heading} intro={aiPage.principle.body}>
        <FeatureList items={aiPage.principle.points} />
      </Section>

      <Section id="information-to-attention" heading={aiPage.flow.heading}>
        <StepList steps={aiPage.flow.steps} />
      </Section>

      {/* Available and roadmap are separate sections with separate headings so they can never be read as one list. */}
      <Section id="available-today" heading={aiPage.available.heading} intro={aiPage.available.intro} tone="available">
        <FeatureList items={aiPage.available.items} showAvailable />
        <ProductShotGallery shots={['dashboard', 'attendance']} />
      </Section>

      <Section id="roadmap" heading={aiPage.roadmap.heading} intro={aiPage.roadmap.intro} tone="roadmap">
        <FeatureList items={aiPage.roadmap.items} />
        <ProductShotGallery shots={['ai']} />
      </Section>

      <FaqSection faqs={aiPage.faqs} />
      <CtaBanner heading="Talk to us about school intelligence" body="See the connected foundation available today and discuss where Funda360 intelligence is heading." />
    </>
  );
}
