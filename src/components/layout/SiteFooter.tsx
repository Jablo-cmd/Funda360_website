import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerColumns } from '@/content/navigation';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__brand">
          {/* Logo placeholder: the final Funda360 logo is supplied in Phase 2. */}
          <p className="logo-placeholder">FUNDA360</p>
          <p>{siteConfig.tagline}</p>
          <p>{siteConfig.description}</p>
        </div>

        <nav aria-label="Footer" className="site-footer__nav">
          {footerColumns.map((column) => (
            <div key={column.heading} className="site-footer__column">
              <h2 className="site-footer__heading">{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a href={link.href}>
                        {link.label}
                        <span className="visually-hidden"> (opens the Funda360 application)</span>
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="site-footer__legal">
          © {year} {siteConfig.developer}. {siteConfig.name} is developed by {siteConfig.developer}.
        </p>
      </div>
    </footer>
  );
}
