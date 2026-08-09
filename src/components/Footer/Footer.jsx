import { Link } from 'react-router-dom';
import Marquee from '../Marquee/Marquee';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.headline}>Wear Your Ace.</p>

        <div className={styles.col}>
          <span className={styles.colTitle}>Shop</span>
          <Link to="/shop" className={styles.link}>All Products</Link>
          <Link to="/shop?category=clothing" className={styles.link}>Clothing</Link>
          <Link to="/shop?category=accessories" className={styles.link}>Accessories</Link>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Info</span>
          <Link to="/about" className={styles.link}>About ACE Store</Link>
          <a href="mailto:store@aceschool.ua" className={styles.link}>store@aceschool.ua</a>
          <span className={styles.link}>Pick up at ACE School</span>
        </div>
      </div>

      <Marquee dark />

      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} ACE School. All rights reserved.</span>
        <span>Kyiv, Ukraine</span>
      </div>
    </footer>
  );
}
