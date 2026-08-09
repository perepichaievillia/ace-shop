import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './Accordion.module.css';

export function AccordionItem({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <Plus size={16} className={`${styles.icon} ${open ? styles.iconOpen : ''}`} aria-hidden="true" />
      </button>
      <div
        id={id}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
      >
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
}

export default function Accordion({ children }) {
  return <div>{children}</div>;
}
