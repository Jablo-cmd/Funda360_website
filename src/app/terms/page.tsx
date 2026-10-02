import { legalPages } from '@/content/legal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

const page = legalPages.terms;

// noindex until the final terms are supplied.
export const metadata = pageMetadata(seoFor('/terms'));

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.heading, path: '/terms' }]} />
      <section className="hero" aria-labelledby="page-title">
        <div className="container container--narrow">
          <p className="eyebrow">Legal</p>
          <h1 id="page-title">Terms of use</h1>
        </div>
      </section>
      <div className="section">
        <div className="container container--narrow prose">
          <p className="lead">{page.status}</p>
          <ul className="bullets">
            {page.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
      <PageSchema path="/terms" />
    </>
  );
}
