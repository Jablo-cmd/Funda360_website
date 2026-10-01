import Link from 'next/link';
import { breadcrumbJsonLd, type Crumb } from '@/lib/seo';
import { JsonLd } from './JsonLd';

/** Breadcrumb trail (Home is added automatically) with BreadcrumbList structured data. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <div className="container">
          <ol>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.path}>
                  {isLast ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
