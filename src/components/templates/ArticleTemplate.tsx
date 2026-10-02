import Link from 'next/link';
import { formatDate } from '@/lib/format';
import { getAuthor, getCategory, relatedArticles, type Article, type ArticleBlock } from '@/content/resources';
import { articleJsonLd } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/ui/JsonLd';
import { ArticleList } from '@/components/ui/ArticleList';
import { LinkCardList } from '@/components/ui/LinkCardList';
import { solutionPages } from '@/content/solutions';
import { capabilityCard } from '@/lib/links';

function initials(name: string) {
  return name
    .replace(/^The\s+/i, '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Article template: breadcrumb, category, title, summary, author,
 * publication date, reading time, body blocks, author, related platform
 * pages, related articles and CTA.
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
        <header className="article-header">
          <div className="container container--narrow">
            {article.status === 'draft' ? (
              <p className="article__draft">
                <span className="badge" data-availability="confirm">
                  Draft
                </span>
                <span className="meta"> Editorial review required before publication</span>
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

        <div className="container container--narrow article__body prose">
          {/* Article hero image slot: add an editorial image with descriptive alt text when available. */}
          {article.body.map((block, index) => (
            <ArticleBlockView key={index} block={block} />
          ))}
        </div>

        <footer className="container container--narrow article__footer">
          <section aria-labelledby="author-heading" className="item author-card">
            <span className="author-card__avatar" aria-hidden="true">
              {initials(author.name)}
            </span>
            <div>
              <h2 id="author-heading">About the author</h2>
              <p>
                <strong>{author.name}</strong>, {author.role}
              </p>
              <p>{author.bio}</p>
            </div>
          </section>

          {article.relatedPages?.length || article.relatedSolutions?.length ? (
            <section aria-labelledby="related-pages-heading">
              <h2 id="related-pages-heading" className="eyebrow">
                Related on Funda360
              </h2>
              <LinkCardList
                columns={2}
                items={[
                  ...(article.relatedPages ?? []).map((link) => ({
                    title: link.label,
                    description: capabilityCard(link.href)?.description ?? 'How Funda360 approaches this, and what is available today.',
                    href: link.href,
                  })),
                  ...(article.relatedSolutions ?? [])
                    .map((slug) => solutionPages.find((s) => s.slug === slug))
                    .filter((s) => s !== undefined)
                    .map((s) => ({ title: `Funda360 for ${s.navLabel}`, description: s.tagline, href: `/solutions/${s.slug}` })),
                ]}
              />
            </section>
          ) : null}
        </footer>
      </article>

      {related.length ? (
        <section className="section" data-tone="muted" aria-labelledby="related-articles-heading">
          <div className="container">
            <header className="section__header">
              <p className="eyebrow">Keep reading</p>
              <h2 id="related-articles-heading">Related articles</h2>
            </header>
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
          section: category?.name,
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
