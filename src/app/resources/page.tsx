import { ctas } from '@/content/ctas';
import { categories, articlesInCategory, resourcesPage, sortedArticles } from '@/content/resources';
import { contentClusters } from '@/content/seo';
import { ArticleList, FeaturedArticle } from '@/components/ui/ArticleList';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryNav } from '@/components/ui/CategoryNav';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { seoFor } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/ui/PageSchema';

export const metadata = pageMetadata(seoFor('/resources'));

export default function ResourcesPage() {
  const articles = sortedArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <Breadcrumbs trail={[{ name: 'Resources', path: '/resources' }]} />
      <PageHero {...resourcesPage.hero}>
        {articles.length ? (
          <div className="spaced-top">
            <CategoryNav />
          </div>
        ) : null}
      </PageHero>

      {featured ? (
        <Section id="featured" eyebrow="Featured" heading="Featured insight">
          <FeaturedArticle article={featured} />
        </Section>
      ) : null}

      {rest.length ? (
        <Section id="latest" tone="muted" eyebrow="Latest" heading="Latest insights">
          <ArticleList articles={rest} />
        </Section>
      ) : null}

      {articles.length === 0 ? (
        <Section
          id="in-preparation"
          eyebrow="In preparation"
          heading="Our first insights are in editorial review"
          intro="These are the topics we are writing about. Each article will link to the part of Funda360 it relates to."
        >
          <ul className="grid grid--3" role="list">
            {contentClusters.map((cluster) => (
              <li key={cluster.cluster} className="item">
                <h3 className="item__title">{cluster.cluster}</h3>
                <ul className="bullets">
                  {cluster.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {articles.length ? (
        <Section id="categories" eyebrow="Topics" heading="Browse by category">
          <LinkCardList
            columns={4}
            items={categories.map((category) => ({
              title: category.name,
              description: category.description,
              meta: `${articlesInCategory(category.slug).length} articles`,
              href: `/resources/category/${category.slug}`,
            }))}
          />
        </Section>
      ) : null}

      <Section id="coming-soon" tone="muted" eyebrow="Coming soon" heading={resourcesPage.futureTypes.heading} intro={resourcesPage.futureTypes.intro}>
        <FeatureList layout="checks" columns={2} items={resourcesPage.futureTypes.items.map((item) => ({ title: item, description: 'Planned resource type.', availability: 'roadmap' as const }))} />
      </Section>

      <CtaBanner secondary={ctas.explorePlatform} />
      <PageSchema path="/resources" type="CollectionPage" items={articles.map((a) => ({ name: a.title, path: `/resources/${a.slug}` }))} />
    </>
  );
}
