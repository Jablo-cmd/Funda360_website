import Link from 'next/link';
import { ctas } from '@/content/ctas';
import { articlesInCategory, categories, resourcesPage, sortedArticles } from '@/content/resources';
import { ArticleList } from '@/components/ui/ArticleList';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ ...resourcesPage.seo, path: '/resources' });

export default function ResourcesPage() {
  const articles = sortedArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <Breadcrumbs trail={[{ name: 'Resources', path: '/resources' }]} />
      <PageHero {...resourcesPage.hero} />

      <Section id="categories" heading="Browse by category">
        <nav aria-label="Resource categories">
          <ul className="grid" role="list">
            {categories.map((category) => (
              <li key={category.slug} className="item">
                <h3 className="item__title">
                  <Link href={`/resources/category/${category.slug}`}>{category.name}</Link>
                </h3>
                <p>{category.description}</p>
                <p className="meta">{articlesInCategory(category.slug).length} articles</p>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {featured ? (
        <Section id="featured" heading="Featured insight">
          <ArticleList articles={[featured]} />
        </Section>
      ) : null}

      <Section id="latest" heading="Latest insights">
        <ArticleList articles={rest} />
      </Section>

      <Section id="coming-soon" heading={resourcesPage.futureTypes.heading} intro={resourcesPage.futureTypes.intro}>
        <ul className="bullets">
          {resourcesPage.futureTypes.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <CtaBanner secondary={ctas.explorePlatform} />
    </>
  );
}
