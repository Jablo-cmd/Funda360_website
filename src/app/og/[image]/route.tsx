import { ogEntries } from '@/lib/ogImages';
import { renderOgImage } from '@/lib/og';

/**
 * Social-sharing images at /og/<key>.png (1200×630 PNG), generated at build
 * time. A real .png path keeps the correct content type on static hosting.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ogEntries).map((key) => ({ image: `${key}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const entry = ogEntries[image.replace(/\.png$/, '')];
  if (!entry) return new Response('Not found', { status: 404 });
  return renderOgImage(entry);
}
