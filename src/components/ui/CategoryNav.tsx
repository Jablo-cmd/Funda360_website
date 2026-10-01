import Link from 'next/link';
import { articlesInCategory, articles, categories } from '@/content/resources';

/** Pill navigation between the resources landing page and category pages. */
export function CategoryNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Resource categories">
      <ul className="pill-nav">
        <li>
          <Link href="/resources" aria-current={current ? undefined : 'page'}>
            All <span className="pill-nav__count">{articles.length}</span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/resources/category/${category.slug}`} aria-current={current === category.slug ? 'page' : undefined}>
              {category.name} <span className="pill-nav__count">{articlesInCategory(category.slug).length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
