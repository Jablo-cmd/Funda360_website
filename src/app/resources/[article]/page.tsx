import { notFound } from 'next/navigation';
import { articles, getArticle, getAuthor } from '@/content/resources';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ article: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // Drafts are built but unlisted and noindex wherever draft content is hidden (see content/resources.ts).
  return articles.map((a) => ({ article: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { article: slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: `${article.seoTitle ?? article.title} | Funda360`,
    socialTitle: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    ogType: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [getAuthor(article.authorId).name],
    // Drafts stay out of search results until editorial sign-off.
    noIndex: article.status === 'draft',
  });
}

export default async function ArticlePage({ params }: Params) {
  const { article: slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticleTemplate article={article} />;
}
