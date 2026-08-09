import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/format';
import styles from './ProductCard.module.css';

const categoryLabels = {
  clothing: 'Clothing',
  accessories: 'Accessories',
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

  return (
    <Link to={`/product/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {primaryImage ? (
          <img
            src={getImageUrl(primaryImage)}
            alt={product.name}
            className={styles.image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.placeholder}>{product.name}</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>
            {categoryLabels[product.category] || product.category}
          </span>
          <span className={styles.price}>
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        <h3 className={styles.title}>{product.name}</h3>
      </div>
    </Link>
  );
}