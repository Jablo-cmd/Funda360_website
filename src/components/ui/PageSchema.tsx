import { routeSeo, type SeoPath } from '@/content/seo';
import { webPageJsonLd, type PageSchemaType } from '@/lib/seo';
import { JsonLd } from './JsonLd';

type Props = {
  path: SeoPath;
  type?: PageSchemaType;
  /** Linked pages listed on this page (emitted as an ItemList). */
  items?: { name: string; path: string }[];
  /** Whether the page renders <Breadcrumbs> (links the BreadcrumbList by @id). */
  breadcrumb?: boolean;
};

/** WebPage (or CollectionPage/AboutPage/ContactPage) entity for a static route. */
export function PageSchema({ path, type, items, breadcrumb = true }: Props) {
  const seo = routeSeo[path];
  return (
    <JsonLd
      data={webPageJsonLd({
        path,
        title: seo.title,
        description: seo.description,
        type,
        dateModified: seo.lastModified,
        hasBreadcrumb: breadcrumb && path !== '/',
        items,
      })}
    />
  );
}
