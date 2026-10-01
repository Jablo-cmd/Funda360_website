import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesInCategory, categories, getCategory } from '@/content/resources';
import { ArticleList } from '@/components/ui/ArticleList';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

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
    title: `${category.name} insights`,
    description: `Funda360 insights on ${category.name.toLowerCase()}: ${category.description}`,
    path: `/resources/category/${category.slug}`,
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
      <PageHero eyebrow="Resources · Category" heading={category.name} intro={category.description} />
      <Section id="articles" heading={`Articles in ${category.name}`}>
        <ArticleList articles={items} />
      </Section>
      <Section id="other-categories" heading="Other categories">
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
    </>
  );
}
