import { Link } from 'react-router-dom';
import ProductImage from '../../components/ProductImage/ProductImage';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import styles from './Cart.module.css';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <div className={styles.empty}>
          <span className="eyebrow">Твій кошик</span>
          <h1 className={styles.emptyTitle}>Ваш кошик порожній.</h1>
          <Button as={Link} to="/shop">До магазину</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.wrap}>
        <h1 className={styles.title}>Твій кошик</h1>

        <div className={styles.layout}>
          <ul className={styles.list}>
            {items.map((line) => (
              <li className={styles.line} key={line.key}>
                <Link to={`/product/${line.slug}`} className={styles.thumb}>
                  <ProductImage
                    imageKey={line.image}
                    label={line.name}
                    alt={line.name}
                    className={styles.thumbImg}
                  />
                </Link>
                <div className={styles.lineBody}>
                  <div className={styles.lineTop}>
                    <div>
                      <Link to={`/product/${line.slug}`} className={styles.name}>{line.name}</Link>
                      <div className={styles.variant}>
                        {line.color ? `${line.color} · ` : ''}Розмір {line.size}
                      </div>
                    </div>
                    <span className={styles.linePrice}>
                      {formatPrice(line.price * line.quantity, line.currency)}
                    </span>
                  </div>
                  <div className={styles.lineBottom}>
                    <QuantitySelector
                      value={line.quantity}
                      onChange={(q) => updateQuantity(line.key, q)}
                    />
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(line.key)}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <span className={styles.summaryTitle}>Підсумок замовлення</span>
            <div className={styles.summaryRow}>
              <span>Сума</span>
              <span>{formatPrice(subtotal, items[0]?.currency)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Доставка</span>
              <span>Згідно тарифів служби доставки</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Разом</span>
              <span>{formatPrice(subtotal, items[0]?.currency)}</span>
            </div>
            <Button as={Link} to="/checkout" variant="primary" full>
              Оформити замовлення
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
