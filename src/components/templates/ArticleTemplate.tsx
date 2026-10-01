import Link from 'next/link';
import { formatDate } from '@/lib/format';
import { getAuthor, getCategory, relatedArticles, type Article, type ArticleBlock } from '@/content/resources';
import { articleJsonLd } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/ui/JsonLd';
import { ArticleList } from '@/components/ui/ArticleList';


/**
 * Article template: breadcrumb, category, title, summary, author,
 * publication date, reading time, body blocks, related platform pages,
 * related articles and CTA.
 */
export function ArticleTemplate({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);
  const related = relatedArticles(article);
  const path = `/resources/${article.slug}`;

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'Resources', path: '/resources' },
          ...(category ? [{ name: category.name, path: `/resources/category/${category.slug}` }] : []),
          { name: article.title, path },
        ]}
      />

      <article className="article" aria-labelledby="page-title">
        <header className="hero">
          <div className="container container--narrow">
            {article.status === 'draft' ? (
              <p className="badge" data-availability="confirm">
                Draft article: editorial review required before publication
              </p>
            ) : null}
            {category ? (
              <p className="eyebrow">
                <Link href={`/resources/category/${category.slug}`}>{category.name}</Link>
              </p>
            ) : null}
            <h1 id="page-title">{article.title}</h1>
            <p className="lead">{article.description}</p>
            <dl className="article__meta">
              <div>
                <dt>Author</dt>
                <dd>{author.name}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </dd>
              </div>
              {article.updatedAt ? (
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Reading time</dt>
                <dd>{article.readingMinutes} minutes</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="container container--narrow article__body">
          {/* Article hero image slot: supplied in Phase 2 with descriptive alt text. */}
          {article.body.map((block, index) => (
            <ArticleBlockView key={index} block={block} />
          ))}
        </div>

        <footer className="container container--narrow article__footer">
          <section aria-labelledby="author-heading" className="item">
            <h2 id="author-heading">About the author</h2>
            <p>
              <strong>{author.name}</strong>, {author.role}
            </p>
            <p>{author.bio}</p>
          </section>

          {article.relatedPages?.length ? (
            <section aria-labelledby="related-pages-heading">
              <h2 id="related-pages-heading">Related on Funda360</h2>
              <ul className="bullets">
                {article.relatedPages.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </footer>
      </article>

      {related.length ? (
        <section className="section" aria-labelledby="related-articles-heading">
          <div className="container">
            <h2 id="related-articles-heading">Related articles</h2>
            <ArticleList articles={related} />
          </div>
        </section>
      ) : null}

      <CtaBanner />

      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.description,
          path,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          authorName: author.name,
        })}
      />
    </>
  );
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'heading':
      return <h2>{block.text}</h2>;
    case 'list':
      return (
        <ul className="bullets">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      );
    case 'callout':
      return (
        <aside className="callout" aria-label="Note">
          <p>{block.text}</p>
        </aside>
      );
  }
}
