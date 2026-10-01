import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="center-page" aria-labelledby="page-title">
      <div className="container">
        <div className="center-card">
          <p className="eyebrow">Error 404</p>
          <h1 id="page-title">Page not found</h1>
          <p className="lead">The page you are looking for does not exist or has moved.</p>
          <div className="cta-group">
            <Link href="/" className="cta cta--primary">
              Go to the Funda360 home page
            </Link>
          </div>
          <ul className="link-list">
            <li>
              <Link href="/platform" className="item__more">
                Explore the platform
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href="/request-demo" className="item__more">
                Request a demo
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
