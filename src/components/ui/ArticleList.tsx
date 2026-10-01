import Link from 'next/link';
import { formatDate } from '@/lib/format';
import { getAuthor, getCategory, type Article } from '@/content/resources';

/** Article listing used on /resources, category pages, the homepage and related articles. */
export function ArticleList({ articles, level = 3 }: { articles: Article[]; level?: 2 | 3 }) {
  const Heading = `h${level}` as 'h2' | 'h3';
  if (articles.length === 0) return <p>No articles yet.</p>;
  return (
    <ul className="grid" role="list">
      {articles.map((article) => {
        const category = getCategory(article.category);
        return (
          <li key={article.slug} className="item">
            {category ? <p className="eyebrow">{category.name}</p> : null}
            <Heading className="item__title">
              <Link href={`/resources/${article.slug}`}>{article.title}</Link>
            </Heading>
            <p>{article.description}</p>
            <p className="meta">
              {getAuthor(article.authorId).name} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingMinutes} min read
              {article.status === 'draft' ? ' · Draft' : ''}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
