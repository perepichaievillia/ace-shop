// Product data layer.
// Drop real photography into /public/images/products/ using the same
// filenames referenced below and the storefront picks them up automatically.
// Until then, /src/utils/placeholder.js generates on-brand SVG placeholders.

export const CATEGORIES = [
  { id: 'all', label: 'Усі' },
  { id: 'clothing', label: 'Одяг' },
  { id: 'accessories', label: 'Аксесуари' },
];

export const products = [
  {
    id: 'ace-hoodie-black',
    slug: 'ace-hoodie-black',
    name: 'ACE Hoodie',
    category: 'clothing',
    price: 1890,
    currency: 'UAH',
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Oversized hoodie created for the ACE community. Heavyweight brushed fleece, dropped shoulder, ribbed cuffs. Built for hallway to weekend.',
    details: [
      'Oversized, dropped-shoulder fit',
      'Heavyweight 380gsm brushed fleece',
      'Ribbed cuffs and hem',
      'Embroidered ACE wordmark on chest',
      'Kangaroo pocket',
    ],
    material: '80% cotton, 20% recycled polyester. Brushed interior. Pre-shrunk.',
    images: ['hoodie-black-1', 'hoodie-black-2'],
    featured: true,
  },
  {
    id: 'ace-crewneck-forest',
    slug: 'ace-crewneck-forest',
    name: 'ACE Crewneck',
    category: 'clothing',
    price: 1590,
    currency: 'UAH',
    colors: ['Forest Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'A relaxed crewneck in a deep forest tone with a tonal embroidered crest. Made to be lived in.',
    details: [
      'Relaxed, boxy fit',
      'Mid-weight loopback fleece',
      'Tonal embroidered crest',
      'Set-in sleeves',
    ],
    material: '100% organic cotton fleece.',
    images: ['crewneck-forest-1', 'crewneck-forest-2'],
    featured: true,
  },
  {
    id: 'ace-tee-offwhite',
    slug: 'ace-tee-offwhite',
    name: 'ACE Tee',
    category: 'clothing',
    price: 890,
    currency: 'UAH',
    colors: ['Off White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'A heavyweight tee with a boxy silhouette and a single-line ACE print across the back.',
    details: [
      'Boxy, straight-hem fit',
      '240gsm combed cotton',
      'Back print: WEAR YOUR ACE',
      'Reinforced neck seam',
    ],
    material: '100% combed cotton.',
    images: ['tee-offwhite-1', 'tee-offwhite-2'],
    featured: true,
  },
  {
    id: 'ace-track-pant-black',
    slug: 'ace-track-pant-black',
    name: 'ACE Track Pant',
    category: 'clothing',
    price: 1690,
    currency: 'UAH',
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Tapered track pant in a soft brushed knit with an elastic waist and side stripe detail.',
    details: [
      'Tapered leg, elastic waist with drawcord',
      'Side seam pockets',
      'Woven ACE side stripe',
    ],
    material: '95% cotton, 5% elastane.',
    images: ['track-pant-black-1', 'track-pant-black-2'],
    featured: true,
  },
  {
    id: 'ace-cap-black',
    slug: 'ace-cap-black',
    name: 'ACE Cap',
    category: 'accessories',
    price: 690,
    currency: 'UAH',
    colors: ['Black'],
    sizes: ['One Size'],
    description:
      'A low-profile six-panel cap with a curved brim and embroidered eyelets.',
    details: [
      'Six-panel construction',
      'Curved brim, adjustable strap back',
      'Embroidered ACE emblem',
    ],
    material: '100% cotton twill.',
    images: ['cap-black-1', 'cap-black-2'],
    featured: false,
  },
  {
    id: 'ace-tote-natural',
    slug: 'ace-tote-natural',
    name: 'ACE Tote',
    category: 'accessories',
    price: 590,
    currency: 'UAH',
    colors: ['Natural'],
    sizes: ['One Size'],
    description:
      'Heavy canvas tote built to carry books, kit, or groceries. Long enough to sling over a shoulder.',
    details: [
      'Heavy 12oz canvas',
      'Reinforced stitched handles',
      'Interior pocket',
    ],
    material: '100% cotton canvas.',
    images: ['tote-natural-1', 'tote-natural-2'],
    featured: false,
  },
  {
    id: 'ace-socks-set',
    slug: 'ace-socks-set',
    name: 'ACE Socks (2-Pack)',
    category: 'accessories',
    price: 390,
    currency: 'UAH',
    colors: ['Black / Green'],
    sizes: ['S/M', 'L/XL'],
    description:
      'Ribbed crew socks in a two-pack, one black and one off-white, both with a woven ACE ankle tag.',
    details: [
      'Ribbed crew length',
      'Cushioned sole',
      'Woven ACE ankle tag',
    ],
    material: '75% cotton, 20% polyester, 5% elastane.',
    images: ['socks-set-1', 'socks-set-2'],
    featured: false,
  },
  {
    id: 'ace-beanie-forest',
    slug: 'ace-beanie-forest',
    name: 'ACE Beanie',
    category: 'accessories',
    price: 490,
    currency: 'UAH',
    colors: ['Forest Green'],
    sizes: ['One Size'],
    description:
      'A ribbed knit beanie with a folded cuff and a woven ACE label.',
    details: ['Ribbed knit construction', 'Folded cuff', 'Woven label'],
    material: '100% acrylic knit.',
    images: ['beanie-forest-1', 'beanie-forest-2'],
    featured: false,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}
