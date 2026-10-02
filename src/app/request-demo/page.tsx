import { ArrowRight, CalendarCheck, Check, MessagesSquare, MonitorPlay } from 'lucide-react';
import Link from 'next/link';
import { ctas } from '@/content/ctas';
import { demoPage } from '@/content/demo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaLink } from '@/components/ui/CtaLink';
import { ProductShot } from '@/components/ui/ProductShot';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

export const metadata = pageMetadata(seoFor('/request-demo'));

// Presentation-only icons for the three expectation steps.
const STEP_ICONS = [CalendarCheck, MonitorPlay, MessagesSquare];

export default function RequestDemoPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Request a demo', path: '/request-demo' }]} />
      <section className="demo-hero" aria-labelledby="page-title" data-tone="navy">
        <div className="container">
          <p className="eyebrow">{demoPage.hero.eyebrow}</p>
          <h1 id="page-title">{demoPage.hero.heading}</h1>
          <p className="lead">{demoPage.hero.intro}</p>
          <p className="demo-hero__audience">{demoPage.audience}</p>
        </div>
      </section>

      <div className="container demo-body">
        <div className="demo-layout">
          <section aria-labelledby="form-heading" className="form-card">
            <h2 id="form-heading">Your details</h2>
            <DemoRequestForm />
          </section>

          <aside aria-labelledby="covers-heading" className="demo-aside">
            <div className="demo-aside__block">
              <h2 id="covers-heading">{demoPage.covers.heading}</h2>
              <ul className="check-list">
                {demoPage.covers.items.map((item) => (
                  <li key={item}>
                    <Check size={20} strokeWidth={2.25} aria-hidden="true" />
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="demo-aside__block">
              <h2 id="expectations-heading">{demoPage.expectations.heading}</h2>
              <ol className="check-list">
                {demoPage.expectations.steps.map((step, i) => {
                  const Icon = STEP_ICONS[i] ?? CalendarCheck;
                  return (
                    <li key={step}>
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      <p>{step}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="demo-aside__block">
              <h2>{demoPage.whyWeAsk.heading}</h2>
              <p>{demoPage.whyWeAsk.body}</p>
            </div>
            <div className="demo-aside__block">
              <ProductShot shot="dashboard" caption={false} />
              <p className="meta spaced-top-sm">The Funda360 leadership dashboard, shown with a fictional demo school.</p>
            </div>
            <div className="demo-aside__block">
              <h2>Already using Funda360?</h2>
              <p>Sign in to the Funda360 application with your school account.</p>
              <CtaLink cta={ctas.login} variant="secondary" />
            </div>
            <div className="demo-aside__block">
              <h2>Not ready for a demo?</h2>
              <ul className="stack">
                {[
                  { href: '/platform', label: 'Explore the Funda360 platform' },
                  { href: '/solutions', label: 'Find the solution for your role' },
                  { href: '/security', label: 'Read how Funda360 protects school information' },
                  { href: '/resources', label: 'Read insights for schools' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="item__more">
                      {link.label}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <PageSchema path="/request-demo" type="ContactPage" />
    </>
  );
}
