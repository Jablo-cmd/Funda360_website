import { ctas } from '@/content/ctas';
import { solutionPages, solutionsOverview } from '@/content/solutions';
import { AreaIcon } from '@/components/ui/AreaIcon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CapabilityGroups } from '@/components/story/CapabilityGroups';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...solutionsOverview.seo, path: '/solutions' });

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Solutions', path: '/solutions' }]} />
      <PageHero {...solutionsOverview.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />
      <Section id="audiences" eyebrow="Four audiences" heading="Choose your solution">
        <LinkCardList
          variant="audience"
          columns={2}
          items={solutionPages.map((s) => ({
            label: s.navLabel,
            title: s.tagline,
            description: s.summary,
            meta: s.audience,
            href: `/solutions/${s.slug}`,
            icon: <AreaIcon id={s.slug} />,
          }))}
        />
      </Section>
      <Section id="one-platform" tone="muted" eyebrow="One platform underneath" heading="Every audience works from the same connected information" intro="Whichever view you start from, it is the same Funda360 platform and the same school records.">
        <CapabilityGroups />
      </Section>
      <CtaBanner />
    </>
  );
}
