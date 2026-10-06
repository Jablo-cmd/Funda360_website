import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/config/site';
import { Logo } from '@/components/ui/Logo';

/**
 * Short alias URLs (/demo, /product, /features) that people type or link to.
 * Static hosting cannot send HTTP redirects, so each alias is a tiny noindex
 * page that forwards immediately (zero-delay meta refresh, which search
 * engines treat as a redirect), names the real page as canonical, and shows
 * a plain link as a fallback. Aliases are never listed in the sitemap.
 */
export function forwardMetadata(target: string, label: string): Metadata {
  return {
    title: { absolute: `${label} | Funda360` },
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(target) },
  };
}

export function ForwardPage({ target, label }: { target: string; label: string }) {
  const href = absoluteUrl(target).replace(/^https?:\/\/[^/]+/, '') || '/';
  return (
    <section className="center-page" aria-labelledby="page-title">
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <div className="container">
        <div className="center-card">
          <Logo />
          <h1 id="page-title">{label}</h1>
          <p className="lead">This page has moved. You are being taken to it now.</p>
          <div className="cta-group">
            <Link className="cta cta--primary" href={target}>
              Continue to {label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
