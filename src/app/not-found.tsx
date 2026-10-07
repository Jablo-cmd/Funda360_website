import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { appRoutePrefixes } from '@/content/appRoutes';

const appOrigin = new URL(siteConfig.appLoginUrl).origin;

/*
 * Runs while the page is parsed, before it is shown: a path that belongs to
 * the Funda360 application (an old bookmark or emailed link from when the
 * application lived on this domain) is forwarded to the same path on the
 * application host, with its query string and #fragment (sign-in links carry
 * tokens there). The destination host is fixed; only the path is reused.
 */
const forwardAppPaths = `(function(){var p=${JSON.stringify(appRoutePrefixes)},o=${JSON.stringify(appOrigin)},l=window.location,s=l.pathname.split('/')[1];if(p.indexOf(s)>-1){l.replace(o+l.pathname+l.search+l.hash)}})()`;

// Next.js adds <meta name="robots" content="noindex"> to the not-found page itself.
export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="center-page" aria-labelledby="page-title">
      <script dangerouslySetInnerHTML={{ __html: forwardAppPaths }} />
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
          <p className="meta spaced-top">
            Looking for the Funda360 application? It has moved to <a href={siteConfig.appLoginUrl}>{appOrigin.replace('https://', '')}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
