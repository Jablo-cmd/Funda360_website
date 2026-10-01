import { aboutPage } from '@/content/about';
import { ctas } from '@/content/ctas';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FeatureList } from '@/components/ui/FeatureList';
import { PageHero } from '@/components/ui/PageHero';
import { Placeholder } from '@/components/ui/Placeholder';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...aboutPage.seo, path: '/about' });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'About', path: '/about' }]} />
      <PageHero {...aboutPage.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />

      {aboutPage.sections.map((section) => (
        <Section key={section.id} id={section.id} heading={section.heading}>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="lead">
              {paragraph}
            </p>
          ))}
        </Section>
      ))}

      <Section id="values" heading={aboutPage.values.heading}>
        <FeatureList items={aboutPage.values.items} />
      </Section>

      <Section id="company" heading={aboutPage.company.heading}>
        <p>{aboutPage.company.body}</p>
        <Placeholder>{aboutPage.company.placeholder}</Placeholder>
      </Section>

      <CtaBanner />
    </>
  );
}
