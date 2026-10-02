import { Database, Fingerprint, KeyRound, Lock, ScrollText, ShieldCheck } from 'lucide-react';
import { ctas } from '@/content/ctas';
import { securityPage } from '@/content/security';
import { seoFor } from '@/content/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { CtaLink } from '@/components/ui/CtaLink';
import { FaqSection } from '@/components/ui/FaqList';
import { FeatureList } from '@/components/ui/FeatureList';
import { PageHero } from '@/components/ui/PageHero';
import { PageSchema } from '@/components/ui/PageSchema';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(seoFor('/security'));

// Presentation-only icons for the controls, in content order.
const ICONS = [Database, KeyRound, ShieldCheck, ScrollText, Fingerprint, Lock];

export default function SecurityPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Security & data protection', path: '/security' }]} />
      <PageHero {...securityPage.hero} primary={ctas.requestDemo} secondary={ctas.explorePlatform} />

      <Section id="controls" eyebrow="Platform controls" heading={securityPage.controls.heading} intro={securityPage.controls.intro}>
        <FeatureList
          items={securityPage.controls.items}
          columns={3}
          icon={(_, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <span className="item__icon">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            );
          }}
        />
      </Section>

      <Section id="claims" tone="muted" eyebrow="Transparency" heading={securityPage.claims.heading} intro={securityPage.claims.intro}>
        <FeatureList items={securityPage.claims.items} layout="checks" />
        <p className="section__footer">
          <CtaLink cta={{ label: 'Read how Funda360 approaches AI responsibly', href: '/ai' }} variant="text" />
        </p>
      </Section>

      <Section id="this-website" eyebrow="This website" heading={securityPage.website.heading}>
        <p className="lead">{securityPage.website.body}</p>
        <CtaLink cta={{ label: 'Read the website privacy policy', href: '/privacy' }} variant="text" />
      </Section>

      <FaqSection faqs={securityPage.faqs} />
      <CtaBanner heading="Questions about security and data protection?" body="Book a walkthrough and ask the Funda360 team about access controls, consent and data handling for your school." />
      <PageSchema path="/security" />
    </>
  );
}
