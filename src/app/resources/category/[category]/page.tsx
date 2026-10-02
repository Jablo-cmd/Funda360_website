import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesInCategory, categories, categoryIsIndexable, getCategory } from '@/content/resources';
import { ArticleList } from '@/components/ui/ArticleList';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryNav } from '@/components/ui/CategoryNav';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata, webPageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: `${category.name} Insights for Schools | Funda360`,
    socialTitle: `${category.name} insights from Funda360`,
    description: `Funda360 articles on ${category.name.toLowerCase()} for schools and school leaders. ${category.description}`,
    path: `/resources/category/${category.slug}`,
    // Indexable only once the category lists a published article (avoids thin pages).
    noIndex: !categoryIsIndexable(category.slug),
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = articlesInCategory(category.slug);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Resources', path: '/resources' },
          { name: category.name, path: `/resources/category/${category.slug}` },
        ]}
      />
      <PageHero eyebrow="Resources · Category" heading={category.name} intro={category.description}>
        <div className="spaced-top">
          <CategoryNav current={category.slug} />
        </div>
      </PageHero>
      <Section id="articles" eyebrow={`${items.length} ${items.length === 1 ? 'article' : 'articles'}`} heading={`Articles in ${category.name}`}>
        <ArticleList articles={items} columns={items.length > 1 ? 3 : 2} />
      </Section>
      <Section id="other-categories" tone="muted" heading="Other categories">
        <ul className="bullets">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link href={`/resources/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          <li>
            <Link href="/resources">All resources</Link>
          </li>
        </ul>
      </Section>
      <CtaBanner />
      <JsonLd
        data={webPageJsonLd({
          path: `/resources/category/${category.slug}`,
          title: `${category.name} Insights for Schools | Funda360`,
          description: category.description,
          type: 'CollectionPage',
          hasBreadcrumb: true,
          items: items.map((a) => ({ name: a.title, path: `/resources/${a.slug}` })),
        })}
      />
    </>
  );
}
