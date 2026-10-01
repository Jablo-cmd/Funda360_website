import { ctas } from '@/content/ctas';
import { categories, articlesInCategory, resourcesPage, sortedArticles } from '@/content/resources';
import { ArticleList, FeaturedArticle } from '@/components/ui/ArticleList';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CategoryNav } from '@/components/ui/CategoryNav';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { FeatureList } from '@/components/ui/FeatureList';
import { LinkCardList } from '@/components/ui/LinkCardList';
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
      <PageHero {...resourcesPage.hero}>
        <div className="spaced-top">
          <CategoryNav />
        </div>
      </PageHero>

      {featured ? (
        <Section id="featured" eyebrow="Featured" heading="Featured insight">
          <FeaturedArticle article={featured} />
        </Section>
      ) : null}

      <Section id="latest" tone="muted" eyebrow="Latest" heading="Latest insights">
        <ArticleList articles={rest} />
      </Section>

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

      <Section id="coming-soon" tone="muted" eyebrow="Coming soon" heading={resourcesPage.futureTypes.heading} intro={resourcesPage.futureTypes.intro}>
        <FeatureList
          layout="checks"
          columns={2}
          items={resourcesPage.futureTypes.items.map((item) => ({ title: item, description: 'Planned resource type.', availability: 'roadmap' as const }))}
        />
      </Section>

      <CtaBanner secondary={ctas.explorePlatform} />
    </>
  );
}
