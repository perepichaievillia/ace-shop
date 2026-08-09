import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

export default function QuantitySelector({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className={styles.control}>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} strokeWidth={2} />
      </button>
      <span className={styles.value} aria-live="polite">{value}</span>
      <button
        type="button"
        className={styles.btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
