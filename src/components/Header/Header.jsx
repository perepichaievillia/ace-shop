import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.module.css';

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (menuOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${hidden ? styles.hidden : ''}`}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo}>
            ACE STORE
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Магазин
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Про нас
            </NavLink>
          </nav>

          <div className={styles.actions}>
            <Link to="/cart" className={styles.bagLink} aria-label={`Bag, ${count} items`}>
              <ShoppingBag size={18} strokeWidth={1.6} aria-hidden="true" />
              <span className={styles.bagCount}>({count})</span>
            </Link>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.6} />
              ) : (
                <Menu size={22} strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
