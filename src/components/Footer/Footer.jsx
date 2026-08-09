import { Link } from 'react-router-dom';
import Marquee from '../Marquee/Marquee';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.headline}>Будь собою. <br /> Будь ACE.</p>

        <div className={styles.col}>
          <span className={styles.colTitle}>Магазин</span>
          <Link to="/shop" className={styles.link}>Усі товари</Link>
          <Link to="/shop?category=clothing" className={styles.link}>Одяг</Link>
          <Link to="/shop?category=accessories" className={styles.link}>Аксесуари</Link>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Інформація</span>
          <Link to="/about" className={styles.link}>Про ACE Store</Link>
          <a href="mailto:store@aceschool.ua" className={styles.link}>info@ace-school.com.ua</a>
          <span className={styles.link}>Забрати в ACE School</span>
        </div>
      </div>

      <Marquee dark />

      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} ACE School. Всі права захищені.</span>
        <span>Київ, Україна</span>
      </div>
    </footer>
  );
}
