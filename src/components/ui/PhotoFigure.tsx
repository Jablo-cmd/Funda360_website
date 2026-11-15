import { photos, type PhotoKey } from '@/content/photos';

/** One illustrative photograph with a short caption and an honest label. */
export function PhotoFigure({ photo }: { photo: PhotoKey }) {
  const p = photos[photo];
  return (
    <figure className="photo-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
      <figcaption>
        {p.caption}
        <span>Illustrative photo, not a Funda360 customer</span>
      </figcaption>
    </figure>
  );
}
