import { notFound } from 'next/navigation';
import { solutionPages } from '@/content/solutions';
import { SolutionPageTemplate } from '@/components/templates/SolutionPageTemplate';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

// Only the solution pages defined in content/solutions.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);
  if (!page) return {};
  return pageMetadata({ ...page.seo, path: `/solutions/${page.slug}` });
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const page = solutionPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SolutionPageTemplate page={page} />;
}
