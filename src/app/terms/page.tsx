import { legalPages } from '@/content/legal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Placeholder } from '@/components/ui/Placeholder';
import { pageMetadata } from '@/lib/seo';

const page = legalPages.terms;

// noindex until the final terms are supplied.
export const metadata = pageMetadata({ ...page.seo, path: '/terms', noIndex: true });

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
          <Placeholder>{page.placeholder}</Placeholder>
        </div>
      </div>
    </>
  );
}
