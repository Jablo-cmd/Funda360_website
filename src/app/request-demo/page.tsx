import Link from 'next/link';
import { ctas } from '@/content/ctas';
import { demoPage } from '@/content/demo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaLink } from '@/components/ui/CtaLink';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...demoPage.seo, path: '/request-demo' });

export default function RequestDemoPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Request a demo', path: '/request-demo' }]} />
      <section className="hero" aria-labelledby="page-title">
        <div className="container">
          <p className="eyebrow">{demoPage.hero.eyebrow}</p>
          <h1 id="page-title">{demoPage.hero.heading}</h1>
          <p className="lead">{demoPage.hero.intro}</p>
        </div>
      </section>

      <div className="container two-column section">
        <section aria-labelledby="form-heading">
          <h2 id="form-heading">Your details</h2>
          <DemoRequestForm />
        </section>

        <aside aria-labelledby="expectations-heading">
          <h2 id="expectations-heading">{demoPage.expectations.heading}</h2>
          <ol className="numbered">
            {demoPage.expectations.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2>Already using Funda360?</h2>
          <p>Sign in to the Funda360 application with your school account.</p>
          <CtaLink cta={ctas.login} variant="secondary" />
          <h2>Not ready for a demo?</h2>
          <ul className="bullets">
            <li>
              <Link href="/platform">Explore the platform</Link>
            </li>
            <li>
              <Link href="/solutions">Find the solution for your role</Link>
            </li>
            <li>
              <Link href="/resources">Read our insights</Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
