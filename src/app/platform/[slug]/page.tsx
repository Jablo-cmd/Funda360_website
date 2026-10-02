import { notFound } from 'next/navigation';
import { capabilityPages } from '@/content/platform';
import { CapabilityPageTemplate } from '@/components/templates/CapabilityPageTemplate';
import { seoFor, type SeoPath } from '@/content/seo';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

// Only the capability pages defined in content/platform.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return capabilityPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const page = capabilityPages.find((p) => p.slug === slug);
  if (!page) return {};
  return pageMetadata(seoFor(`/platform/${page.slug}` as SeoPath));
}

export default async function CapabilityPage({ params }: Params) {
  const { slug } = await params;
  const page = capabilityPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <CapabilityPageTemplate page={page} />;
}
