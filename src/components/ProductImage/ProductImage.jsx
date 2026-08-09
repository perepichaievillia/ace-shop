import { useState } from 'react';
import { placeholderImage } from '../../utils/placeholder';

// Tries to load a real photo from /public/images/products/{imageKey}.jpg.
// If it 404s (no file dropped in yet), swaps to an on-brand SVG placeholder
// automatically — no code changes needed once real photography arrives.
export default function ProductImage({ imageKey, alt, className, label }) {
  const realSrc = `/images/products/${imageKey}.jpg`;
  const fallback = placeholderImage(label || alt || imageKey, imageKey);
  const [src, setSrc] = useState(realSrc);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
