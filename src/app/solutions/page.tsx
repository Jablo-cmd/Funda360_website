import { ctas } from '@/content/ctas';
import { solutionPages, solutionsOverview } from '@/content/solutions';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...solutionsOverview.seo, path: '/solutions' });

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Solutions', path: '/solutions' }]} />
      <PageHero {...solutionsOverview.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />
      <Section id="audiences" heading="Choose your solution">
        <LinkCardList
          items={solutionPages.map((s) => ({
            title: s.navLabel,
            description: s.summary,
            meta: s.audience,
            href: `/solutions/${s.slug}`,
          }))}
        />
      </Section>
      <CtaBanner />
    </>
  );
}
