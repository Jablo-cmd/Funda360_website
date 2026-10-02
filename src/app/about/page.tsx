import { Compass, Lock, MapPin, UserCheck } from 'lucide-react';
import { aboutPage } from '@/content/about';
import { ctas } from '@/content/ctas';
import { homePage } from '@/content/home';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FeatureList } from '@/components/ui/FeatureList';
import { PageHero } from '@/components/ui/PageHero';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

export const metadata = pageMetadata(seoFor('/about'));

// Presentation-only icons for the values, in content order.
const VALUE_ICONS = [UserCheck, Lock, Compass, MapPin];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'About', path: '/about' }]} />
      <PageHero {...aboutPage.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform}>
        <ul className="module-strip" aria-label="Funda360 connects">
          {homePage.hero.modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
      </PageHero>

      <div className="section">
        <div className="container">
          {aboutPage.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="editorial-row">
              <h2 id={`${section.id}-heading`}>{section.heading}</h2>
              <div>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <Section id="values" tone="navy" eyebrow="Values" heading={aboutPage.values.heading}>
        <FeatureList
          items={aboutPage.values.items}
          columns={4}
          icon={(_, i) => {
            const Icon = VALUE_ICONS[i] ?? Compass;
            return (
              <span className="item__icon">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            );
          }}
        />
      </Section>

      <Section id="company" eyebrow="Company" heading={aboutPage.company.heading}>
        <p className="lead">{aboutPage.company.body}</p>
        <p>
          <Link href="/security">How Funda360 protects school information</Link> · <Link href="/ai">How Funda360 approaches AI</Link>
        </p>
      </Section>

      <CtaBanner />
      <PageSchema path="/about" type="AboutPage" />
    </>
  );
}
