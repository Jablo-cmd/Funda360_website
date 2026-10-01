import Link from 'next/link';
import { formatDate } from '@/lib/format';
import { getAuthor, getCategory, type Article } from '@/content/resources';

function Meta({ article }: { article: Article }) {
  return (
    <p className="meta">
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min read
      {article.status === 'draft' ? ' · Draft' : ''}
    </p>
  );
}

/** Article listing used on /resources, category pages, the homepage and related articles. */
export function ArticleList({ articles, level = 3, columns = 3 }: { articles: Article[]; level?: 2 | 3; columns?: 2 | 3 }) {
  const Heading = `h${level}` as 'h2' | 'h3';
  if (articles.length === 0) return <p>No articles yet.</p>;
  return (
    <ul className={`grid grid--${columns}`} role="list">
      {articles.map((article) => {
        const category = getCategory(article.category);
        return (
          <li key={article.slug} className="item article-card">
            {category ? <p className="article-card__category">{category.name}</p> : null}
            <Heading className="item__title">
              <Link href={`/resources/${article.slug}`}>{article.title}</Link>
            </Heading>
            <p>{article.description}</p>
            <Meta article={article} />
          </li>
        );
      })}
    </ul>
  );
}

/** Large editorial card for the featured article. */
export function FeaturedArticle({ article, level = 3 }: { article: Article; level?: 2 | 3 }) {
  const Heading = `h${level}` as 'h2' | 'h3';
  const category = getCategory(article.category);
  return (
    <article className="item article-card article-card--featured" aria-labelledby={`featured-${article.slug}`}>
      <div className="article-card__panel" data-tone="navy">
        <p className="article-card__category">Featured insight</p>
        <p className="article-card__panel-mark" aria-hidden="true">
          {category?.name ?? 'Insight'}
        </p>
      </div>
      <div className="article-card__body">
        {category ? <p className="article-card__category">{category.name}</p> : null}
        <Heading id={`featured-${article.slug}`} className="item__title">
          <Link href={`/resources/${article.slug}`}>{article.title}</Link>
        </Heading>
        <p>{article.description}</p>
        <p className="meta">By {getAuthor(article.authorId).name}</p>
        <Meta article={article} />
      </div>
    </article>
  );
}
