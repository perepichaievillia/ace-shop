import { Link } from 'react-router-dom';
import ProductImage from '../ProductImage/ProductImage';
import { formatPrice } from '../../utils/format';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [primary, secondary] = product.images;

  return (
    <Link to={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.frame}>
        <ProductImage
          imageKey={primary}
          label={product.name}
          alt={product.name}
          className={`${styles.img} ${styles.imgPrimary}`}
        />
        {secondary && (
          <ProductImage
            imageKey={secondary}
            label={product.name}
            alt=""
            className={`${styles.img} ${styles.imgSecondary}`}
          />
        )}
        <span className={styles.cta}>View product</span>
      </div>
      <div className={styles.meta}>
        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h3 className={styles.name}>{product.name}</h3>
        </div>
        <span className={styles.price}>{formatPrice(product.price, product.currency)}</span>
      </div>
    </Link>
  );
}
