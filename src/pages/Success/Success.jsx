import { Link, useLocation, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../utils/format';
import styles from './Success.module.css';

export default function Success() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="container">
      <div className={styles.wrap}>
        <span className={styles.check} aria-hidden="true">
          <Check size={30} strokeWidth={2.5} />
        </span>
        <h1 className={styles.title}>ЗАМОВЛЕННЯ ОФОРМЛЕНО</h1>
        <p className={styles.text}>
          Дякуємо, {order.customer.firstName}. Ваше замовлення прийнято, очікуйте повідомлення від відповідальної особи.
        </p>

        <div className={styles.orderCard}>
          <span className={styles.orderId}>ЗАМОВЛЕННЯ {order.id}</span>
          {order.items.map((item) => (
            <div className={styles.orderLine} key={`${item.productId}-${item.size}`}>
              <span>{item.name} · {item.size} &times; {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className={styles.orderTotal}>
            <span>До сплати</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button as={Link} to="/shop" variant="primary">
            Продовжити покупки
          </Button>
          <Button as={Link} to="/" variant="outline">
            На головну
          </Button>
        </div>
      </div>
    </div>
  );
}
