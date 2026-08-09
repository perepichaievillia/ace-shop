import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { buildOrder, saveOrder } from '../../utils/orders';
import styles from './Checkout.module.css';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  className: '',
  deliveryMethod: 'pickup',
  comment: '',
};

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'Введіть ім’я.';
if (!form.lastName.trim()) errors.lastName = 'Введіть прізвище.';
if (!form.phone.trim()) errors.phone = 'Введіть номер телефону.';
  else if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) {
    errors.phone = 'Введіть коректний номер телефону.';
  }
  if (!form.email.trim()) errors.email = 'Введіть email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Введіть коректну електронну адресу.';
  }
  if (!form.className.trim()) errors.className = 'Вкажіть клас.';
  return errors;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container">
        <div className={styles.wrap} style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>Оформлення замовлення</h1>
          <p style={{ color: 'var(--c-dark-60)', marginBottom: '24px' }}>
            Ваш кошик порожній. Додайте товар перед оформленням замовлення.
          </p>
          <Button as={Link} to="/shop">До магазину</Button>
        </div>
      </div>
    );
  }

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const order = buildOrder({
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        class: form.className.trim(),
      },
      deliveryMethod: form.deliveryMethod,
      comment: form.comment.trim(),
      items: items.map((line) => ({
        productId: line.productId,
        name: line.name,
        size: line.size,
        quantity: line.quantity,
        price: line.price,
      })),
      total: subtotal,
    });

    await saveOrder(order);

const response = await fetch('/.netlify/functions/send-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(order),
});

const result = await response.json();

if (!response.ok) {
  throw new Error(result.error || 'Не вдалося відправити замовлення');
}

clearCart();
navigate('/success', { state: { order } });
  };

  return (
    <div className="container">
      <div className={styles.wrap}>
        <h1 className={styles.title}>Оформлення замовлення</h1>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Контактні дані</legend>
              <div className={styles.row2}>
                <Field
                  label="Імʼя"
                  id="firstName"
                  value={form.firstName}
                  onChange={(v) => setField('firstName', v)}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  label="Прізвище"
                  id="lastName"
                  value={form.lastName}
                  onChange={(v) => setField('lastName', v)}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>
              <div className={styles.row2}>
                <Field
                  label="Телефон"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setField('phone', v)}
                  error={errors.phone}
                  autoComplete="tel"
                  placeholder="+380"
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setField('email', v)}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              <Field
                label="Клас"
                id="className"
                value={form.className}
                onChange={(v) => setField('className', v)}
                error={errors.className}
                placeholder="наприклад, 5B"
              />
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Спосіб отримання</legend>
              <div className={styles.radioGroup} role="radiogroup" aria-label="Delivery method">
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={form.deliveryMethod === 'pickup'}
                    onChange={() => setField('deliveryMethod', 'pickup')}
                  />
                  <span className={styles.radioText}>
                    <span className={styles.radioLabel}>Забрати в ACE School</span>
                    <span className={styles.radioHint}>Готово через 3–5 робочих днів, безкоштовно.</span>
                  </span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="other"
                    checked={form.deliveryMethod === 'other'}
                    onChange={() => setField('deliveryMethod', 'other')}
                  />
                  <span className={styles.radioText}>
                    <span className={styles.radioLabel}>Інший спосіб</span>
                    <span className={styles.radioHint}>Нова пошта або кур’єр. Деталі в коментарі.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Коментар</legend>
              <div className={styles.field}>
                <label className="sr-only" htmlFor="comment">Коментар (необов’язково)</label>
                <textarea
                  id="comment"
                  className={styles.textarea}
                  value={form.comment}
                  onChange={(e) => setField('comment', e.target.value)}
                  placeholder="Адреса доставки, примітки щодо отримання або будь-яка інша інформація..."
                />
              </div>
            </fieldset>

            <Button type="submit" variant="primary" full disabled={submitting}>
              {submitting ? 'Оформлення замовлення…' : 'Оформити замовлення'}
            </Button>
          </form>

          <aside className={`${styles.summary} ${styles.summaryMobile}`}>
            <span className={styles.summaryTitle}>Підсумок замовлення</span>
            {items.map((line) => (
              <div className={styles.summaryLine} key={line.key}>
                <span className={styles.summaryLineName}>
                  {line.name} · {line.size} &times; {line.quantity}
                </span>
                <span>{formatPrice(line.price * line.quantity, line.currency)}</span>
              </div>
            ))}
            <div className={styles.summaryTotal}>
              <span>Разом</span>
              <span>{formatPrice(subtotal, items[0]?.currency)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, id, error, onChange, value, type = 'text', ...rest }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && <span id={`${id}-error`} className={styles.errorText}>{error}</span>}
    </div>
  );
}
