import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No products here — yet.</p>
        <p className={styles.emptyText}>Try a different category.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
