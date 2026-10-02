import { productShots, type ProductShotKey } from '@/content/screenshots';
import type { ProductShotSpec } from '@/content/types';

type Props = {
  shot: ProductShotKey;
  /** Show the capture brief under a placeholder (only relevant while a screenshot is outstanding). */
  showBrief?: boolean;
  /** Load eagerly (above-the-fold visuals). */
  priority?: boolean;
  /** Hide the caption (when surrounding copy already describes the screen). */
  caption?: boolean;
  /** Gentle entrance animation (respects reduced motion). */
  reveal?: boolean;
  /** Responsive `sizes` hint for the browser. */
  sizes?: string;
};

/**
 * Product UI showcase slot.
 *
 * Renders the real Funda360 screenshot (from content/screenshots.ts) inside a
 * neutral device frame. Slots without `src` render a clearly labelled
 * placeholder with the same proportions, so layouts never shift when real
 * images arrive.
 */
export function ProductShot({ shot, showBrief = true, priority = false, caption = true, reveal = true, sizes }: Props) {
  const spec: ProductShotSpec = productShots[shot];
  const ratio = spec.aspectRatio ?? '16 / 10';
  const frame = spec.frame ?? 'desktop';

  return (
    <figure className="product-shot" data-shot={spec.id} data-reveal={reveal && spec.src ? '' : undefined}>
      {spec.src ? (
        <div className={`frame frame--${frame}`}>
          {frame === 'desktop' ? (
            <div className="frame__bar" aria-hidden="true">
              <span className="frame__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="frame__address">Funda360</span>
            </div>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spec.src}
            alt={spec.alt}
            width={spec.width}
            height={spec.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
            sizes={sizes}
            className="product-shot__image"
          />
        </div>
      ) : (
        <div className="product-shot__placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={`Screenshot placeholder: ${spec.alt}`}>
          <span className="product-shot__label">Product screenshot placeholder</span>
          <span className="product-shot__name">{spec.title}</span>
          {showBrief ? <span className="product-shot__source">{spec.sourceScreen}</span> : null}
        </div>
      )}
      {caption ? (
        <figcaption>
          <span className="product-shot__title">{spec.title}</span>
          {spec.caption ? <span className="product-shot__caption">{spec.caption}</span> : null}
          {spec.src ? <span className="product-shot__demo">Real product · fictional demo data</span> : null}
          {showBrief && !spec.src ? <span className="product-shot__brief">Brief: {spec.brief}</span> : null}
        </figcaption>
      ) : null}
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
