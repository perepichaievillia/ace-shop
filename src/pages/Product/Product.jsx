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

const categoryLabels = {
  clothing: 'Одяг',
  accessories: 'Аксесуари',
};

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
      <div className={styles.wrap}>
        <span className="eyebrow">Не знайдено</span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            margin: '12px 0 24px',
          }}
        >
          Цього товару не існує.
        </h1>

        <Link to="/shop">До магазину</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!size) {
      setError('Оберіть розмір перед додаванням до кошика.');
      setNotice('');
      return;
    }

    setError('');
    addItem(product, { size, color, quantity });
    setNotice('Товар додано до кошика.');

    setTimeout(() => setNotice(''), 2500);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.breadcrumb}>
        <Link to="/shop">Магазин</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

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
                  className={`${styles.thumb} ${
                    i === activeImage ? styles.thumbActive : ''
                  }`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Переглянути зображення ${i + 1} з ${
                    product.name
                  }`}
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
          <span className={`eyebrow ${styles.category}`}>
            {categoryLabels[product.category] || product.category}
          </span>

          <h1 className={styles.name}>{product.name}</h1>

          <p className={styles.price}>
            {formatPrice(product.price, product.currency)}
          </p>

          <p className={styles.desc}>{product.description}</p>

          <div className={styles.selectors}>
            {product.colors.length > 0 && (
              <SwatchSelector
                label="Колір"
                options={product.colors}
                value={color}
                onChange={setColor}
              />
            )}

            <SwatchSelector
              label="Розмір"
              options={product.sizes}
              value={size}
              onChange={(v) => {
                setSize(v);
                setError('');
              }}
            />

            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Кількість</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
              />
            </div>
          </div>

          <div className={styles.addRow}>
            <Button
              variant="primary"
              full
              onClick={handleAdd}
            >
              Додати до кошика
            </Button>

            <p
              className={`${styles.notice} ${
                error ? styles.sizeError : ''
              }`}
              aria-live="polite"
            >
              {error || notice}
            </p>
          </div>

          <div className={styles.accordions}>
            <AccordionItem label="Деталі" defaultOpen>
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem label="Матеріал">
              <p>{product.material}</p>
            </AccordionItem>

            <AccordionItem label="Розмірна сітка">
              <p>
                Речі ACE відповідають стандартному розміру та мають
                вільний, оверсайз крій. Якщо вагаєтесь між двома
                розмірами — оберіть менший для більш приталеного
                вигляду або більший для додаткового простору.
              </p>
            </AccordionItem>

            <AccordionItem label="Доставка">
              <p>
                Безкоштовне отримання в ACE School протягом 3–5
                навчальних днів. Інші способи доставки доступні під
                час оформлення замовлення.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  );
}