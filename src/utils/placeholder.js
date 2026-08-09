// Generates an on-brand SVG placeholder for a product image.
// Used as a fallback until real photography is dropped into
// /public/images/products/. See <ProductImage /> for the swap logic.

const PALETTES = [
  { bg: '#0D1510', fg: '#F3F1EA', accent: '#7FAF62' },
  { bg: '#F3F1EA', fg: '#0D1510', accent: '#7FAF62' },
  { bg: '#7FAF62', fg: '#080B09', accent: '#F3F1EA' },
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function placeholderImage(label, seed = label) {
  const palette = PALETTES[hashString(seed) % PALETTES.length];
  const initials = label
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125" width="900" height="1125">
  <rect width="900" height="1125" fill="${palette.bg}" />
  <line x1="0" y1="0" x2="900" y2="1125" stroke="${palette.accent}" stroke-opacity="0.12" stroke-width="2" />
  <line x1="900" y1="0" x2="0" y2="1125" stroke="${palette.accent}" stroke-opacity="0.12" stroke-width="2" />
  <circle cx="450" cy="540" r="230" fill="none" stroke="${palette.accent}" stroke-opacity="0.35" stroke-width="1.5" />
  <text x="450" y="575" font-family="Manrope, Inter, sans-serif" font-weight="800" font-size="140" fill="${palette.fg}" text-anchor="middle">${initials}</text>
  <text x="450" y="1040" font-family="Inter, sans-serif" font-weight="600" font-size="26" letter-spacing="4" fill="${palette.fg}" fill-opacity="0.55" text-anchor="middle">${label.toUpperCase()}</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
