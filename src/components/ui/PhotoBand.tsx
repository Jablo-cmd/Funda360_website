export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

/**
 * Editorial photography pair.
 * Images are illustrative of school life, not Funda360 customers, and are
 * labelled as such.
 */
export function PhotoBand({ photos }: { photos: [Photo, Photo] }) {
  const figure = (photo: Photo, className: string) => (
    <figure className={`photo-band__item ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
  return (
    <div className="photo-band">
      {figure(photos[0], 'photo-band__support')}
      {figure(photos[1], 'photo-band__support')}
      <p className="photo-band__note">Illustrative photography of school life. Not Funda360 customers.</p>
    </div>
  );
}
