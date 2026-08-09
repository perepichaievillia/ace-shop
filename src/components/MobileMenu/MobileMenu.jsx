import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      aria-hidden={!open}
    >
      <nav className={styles.list} aria-label="Mobile">
        <Link to="/shop" className={styles.link} onClick={onClose} tabIndex={open ? 0 : -1}>
          Shop
        </Link>
        <Link to="/about" className={styles.link} onClick={onClose} tabIndex={open ? 0 : -1}>
          About
        </Link>
        <Link to="/cart" className={styles.link} onClick={onClose} tabIndex={open ? 0 : -1}>
          Bag
        </Link>
      </nav>
      <div className={styles.footer}>
        <span>WEAR YOUR ACE.</span>
        <span>ACE School — School Merch 2026</span>
      </div>
    </div>
  );
}
