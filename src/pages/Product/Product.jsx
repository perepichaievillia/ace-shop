import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductImage from '../../components/ProductImage/ProductImage';
import SwatchSelector from '../../components/SwatchSelector/SwatchSelector';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import Button from '../../components/Button/Button';
import { AccordionItem } from '../../components/Accordion/Accordion';
import { getProductBySlug } from '../../data/products';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../context/CartContext';
import styles from './Product.module.css';

export default function Product() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0] ?? '');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  if (!product) {
    return (
      <div className="container">
        <div className={styles.notFound}>
          <p className="eyebrow">Not found</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', margin: '12px 0 24px' }}>
            This product doesn&rsquo;t exist.
          </h1>
          <Button as={Link} to="/shop">Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    if (!size) {
      setError('Select a size before adding to bag.');
      setNotice('');
      return;
    }
    setError('');
    addItem(product, { size, color, quantity });
    setNotice('Added to bag.');
    setTimeout(() => setNotice(''), 2500);
  };

  return (
    <div className="container">
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
              <ProductImage
                imageKey={product.images[activeImage]}
                label={product.name}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
            {product.images.length > 1 && (
              <div className={styles.thumbRow}>
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1} of ${product.name}`}
                    aria-pressed={i === activeImage}
                  >
                    <ProductImage
                      imageKey={img}
                      label={product.name}
                      alt=""
                      className={styles.thumbImg}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <span className={`eyebrow ${styles.category}`}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>{formatPrice(product.price, product.currency)}</p>
            <p className={styles.desc}>{product.description}</p>

            <div className={styles.selectors}>
              {product.colors.length > 0 && (
                <SwatchSelector
                  label="Color"
                  options={product.colors}
                  value={color}
                  onChange={setColor}
                />
              )}
              <SwatchSelector
                label="Size"
                options={product.sizes}
                value={size}
                onChange={(v) => {
                  setSize(v);
                  setError('');
                }}
              />
              <div className={styles.qtyRow}>
                <span className={styles.qtyLabel}>Quantity</span>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
            </div>

            <div className={styles.addRow}>
              <Button variant="primary" full onClick={handleAdd}>
                Add to Bag
              </Button>
              <p className={`${styles.notice} ${error ? styles.sizeError : ''}`} aria-live="polite">
                {error || notice}
              </p>
            </div>

            <div className={styles.accordions}>
              <AccordionItem label="Details" defaultOpen>
                <ul>
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem label="Material">
                <p>{product.material}</p>
              </AccordionItem>
              <AccordionItem label="Size Guide">
                <p>
                  ACE Store pieces run true to size with a relaxed, oversized fit. Between
                  sizes? Size down for a fitted look, or size up for extra room.
                </p>
              </AccordionItem>
              <AccordionItem label="Delivery">
                <p>
                  Free pickup at ACE School within 3–5 school days. Other delivery options
                  available at checkout.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
