import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { pageMetadata } from '@/lib/seo';

/**
 * /login is a stable hand-off URL, not a login screen.
 *
 * The marketing site has no authentication. This page immediately forwards
 * to the Funda360 application (NEXT_PUBLIC_APP_LOGIN_URL) with a zero-delay
 * meta refresh (works on static hosting) and shows a plain link as fallback.
 * Header/footer Login CTAs link straight to the application.
 */
export const metadata = pageMetadata({
  title: 'Login',
  description: 'Sign in to the Funda360 application.',
  path: '/login',
  noIndex: true,
});

export default function LoginRedirectPage() {
  return (
    <section className="center-page" aria-labelledby="page-title">
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content={`0;url=${siteConfig.appLoginUrl}`} />
      <div className="container">
        <div className="center-card">
          <Logo />
          <h1 id="page-title">Login to Funda360</h1>
          <p className="lead">You are being taken to the Funda360 application to sign in.</p>
          <div className="cta-group">
            <a className="cta cta--primary" href={siteConfig.appLoginUrl}>
              Continue to the Funda360 application
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="meta spaced-top">
            New to Funda360? <Link href="/request-demo">Request a demo</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
