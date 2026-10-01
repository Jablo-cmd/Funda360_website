import { legalPages } from '@/content/legal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Placeholder } from '@/components/ui/Placeholder';
import { pageMetadata } from '@/lib/seo';

const page = legalPages.privacy;

// noindex until the final policy text is supplied.
export const metadata = pageMetadata({ ...page.seo, path: '/privacy', noIndex: true });

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.heading, path: '/privacy' }]} />
      <section className="hero" aria-labelledby="page-title">
        <div className="container container--narrow">
          <p className="eyebrow">Legal</p>
          <h1 id="page-title">Privacy policy</h1>
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
