import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import styles from './ProductCard.module.css';

const categoryLabels = {
  junior: 'Молодша школа',
  senior: 'Старша школа',
  clothing: 'Одяг',
  accessories: 'Аксесуари',
};

// Функція для коректного оброблення шляху до фотографії
function getImageUrl(image) {
  if (!image) return '';
  if (image.startsWith('http')) return image;

  const cleanPath = image.replace(/^public\//, '').replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export default function ProductCard({ product }) {
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1];

  return (
    <Link to={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.frame}>
        {primaryImage ? (
          <img
            src={getImageUrl(primaryImage)}
            alt={product.name}
            className={`${styles.img} ${styles.imgPrimary}`}
          />
        ) : (
          <div className={styles.placeholder}>{product.name}</div>
        )}

        {secondaryImage && (
          <img
            src={getImageUrl(secondaryImage)}
            alt=""
            className={`${styles.img} ${styles.imgSecondary}`}
          />
        )}

        <span className={styles.cta}>Дивитися</span>
      </div>

      <div className={styles.meta}>
        <div className={styles.info}>
          <span className={styles.category}>
            {categoryLabels[product.category] || product.category}
          </span>
          <h3 className={styles.name}>{product.name}</h3>
        </div>

        <span className={styles.price}>
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
    </Link>
  );
}