import productsData from './products.json';

export const CATEGORIES = [
  { id: 'all', label: 'УСІ' },
  { id: 'junior', label: 'МОЛОДША ШКОЛА' },
  { id: 'senior', label: 'СТАРША ШКОЛА' },
  { id: 'accessories', label: 'АКСЕСУАРИ' },
];

export const products = productsData.products ?? productsData;

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