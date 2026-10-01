import { productShots, type ProductShotKey } from '@/content/screenshots';
import type { ProductShotSpec } from '@/content/types';

type Props = {
  shot: ProductShotKey;
  /** Show the capture brief under the placeholder (useful while screenshots are outstanding). */
  showBrief?: boolean;
  priority?: boolean;
};

/**
 * Product UI showcase slot.
 *
 * Renders the real screenshot once `src` is set in content/screenshots.ts;
 * until then it renders a clearly labelled placeholder with the same
 * dimensions, so layouts do not shift when real images arrive.
 */
export function ProductShot({ shot, showBrief = true, priority = false }: Props) {
  const spec: ProductShotSpec = productShots[shot];
  const ratio = spec.aspectRatio ?? '16 / 10';

  return (
    <figure className="product-shot" data-shot={spec.id}>
      {spec.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={spec.src}
          alt={spec.alt}
          style={{ aspectRatio: ratio }}
          loading={priority ? 'eager' : 'lazy'}
          className="product-shot__image"
        />
      ) : (
        <div className="product-shot__placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={`Screenshot placeholder: ${spec.alt}`}>
          <span className="product-shot__label">Product screenshot placeholder</span>
          <span className="product-shot__name">{spec.title}</span>
          {showBrief ? <span className="product-shot__source">{spec.sourceScreen}</span> : null}
        </div>
      )}
      <figcaption>
        {spec.title}
        {showBrief && !spec.src ? <span className="product-shot__brief"> · Brief: {spec.brief}</span> : null}
      </figcaption>
    </figure>
  );
}

export function ProductShotGallery({ shots, showBrief = true }: { shots: ProductShotKey[]; showBrief?: boolean }) {
  return (
    <div className="gallery">
      {shots.map((shot) => (
        <ProductShot key={shot} shot={shot} showBrief={showBrief} />
      ))}
    </div>
  );
}
