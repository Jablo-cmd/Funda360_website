import { figureFor, type PhotoKey } from '@/content/photos';

/** One photograph or illustration with a short caption. */
export function PhotoFigure({ photo }: { photo: PhotoKey }) {
  const { photo: p, kind } = figureFor(photo);
  return (
    <figure className={`photo-figure${kind === 'illustration' ? ' photo-figure--art' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
      <figcaption>{p.caption}</figcaption>
    </figure>
  );
}
