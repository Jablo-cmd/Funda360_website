import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="container container--narrow">
        <h1 id="page-title">Page not found</h1>
        <p className="lead">The page you are looking for does not exist or has moved.</p>
        <ul className="bullets">
          <li>
            <Link href="/">Go to the Funda360 home page</Link>
          </li>
          <li>
            <Link href="/platform">Explore the platform</Link>
          </li>
          <li>
            <Link href="/request-demo">Request a demo</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
