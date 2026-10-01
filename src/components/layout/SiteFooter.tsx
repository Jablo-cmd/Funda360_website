import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerColumns } from '@/content/navigation';
import { Logo } from '@/components/ui/Logo';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" data-tone="navy">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="site-header__brand">
              <Logo variant="inverse" />
              <span className="visually-hidden">Funda360 home</span>
            </Link>
            <p className="site-footer__tagline">{siteConfig.tagline}</p>
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
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__legal">
            © {year} {siteConfig.developer}. {siteConfig.name} is developed by {siteConfig.developer}.
          </p>
          <p className="site-footer__legal">Designed with South African schools in mind.</p>
        </div>
      </div>
    </footer>
  );
}
