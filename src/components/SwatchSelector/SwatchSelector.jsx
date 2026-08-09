import styles from './SwatchSelector.module.css';

export default function SwatchSelector({ label, options, value, onChange }) {
  return (
    <div className={styles.group} role="radiogroup" aria-label={label}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {value && <span className={styles.selected}>{value}</span>}
      </div>
      <div className={styles.options}>
        {options.map((option) => (
          <button
            type="button"
            key={option}
            role="radio"
            aria-checked={value === option}
            className={`${styles.option} ${value === option ? styles.optionActive : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
