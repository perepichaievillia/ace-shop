import { Link } from 'react-router-dom';
import ProductImage from '../../components/ProductImage/ProductImage';
import Button from '../../components/Button/Button';
import Reveal from '../../components/Reveal/Reveal';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <div className="container">
        <div className={styles.hero}>
          <span className={`eyebrow ${styles.eyebrow}`}>Про нас</span>
          <Reveal as="h1" className={styles.headline}>
            Більше, ніж школа. Спільнота, яку ти носиш.
          </Reveal>
          <Reveal as="p" delay={100} className={styles.lead}>
           ACE Store — це мерч ACE School, створений для учнів, батьків, працівників і всіх, хто вважає, що символ школи має місце не лише в коридорах, а й на вулицях.
          </Reveal>
        </div>

        <Reveal className={styles.imageBand}>
          <ProductImage
            imageKey="crewneck-forest-2"
            label="ACE Store"
            alt="ACE Store apparel"
            className={styles.imageBandImg}
          />
        </Reveal>

        <Reveal as="div" className={styles.section}>
          <h2 className={styles.sectionTitle}>Ідея</h2>
          <p className={styles.sectionText}>
            Більшість шкільного мерчу залишається в межах школи. Ми хочемо, щоб наш
            виходив за її межі. Кожна річ ACE спочатку створюється як одяг — продумані
            тканини, зручна посадка та стриманий брендинг, щоб вона легко вписувалася
            у твій повсякденний гардероб.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.section}>
          <h2 className={styles.sectionTitle}>Нова колекція</h2>
          <p className={styles.sectionText}>
            Нові колекції виходять невеликими сезонними дропами, а не залишаються
            у постійному каталозі. Коли дроп розпродається, ми знімаємо його з продажу.
            Так кожна річ зберігає особливий зв’язок із роком, коли ти був частиною ACE.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.section}>
          <h2 className={styles.sectionTitle}>Отримання та доставка</h2>
          <p className={styles.sectionText}>
            Кожне замовлення можна безкоштовно забрати безпосередньо в ACE School.
          </p>
        </Reveal>
      </div>

      <div className={styles.ctaSection}>
        <div className="container">
          <p className={styles.ctaHeadline}>Будь собою. Будь ACE.</p>
          <Button as={Link} to="/shop" variant="primary">
            Усі товари
          </Button>
        </div>
      </div>
    </>
  );
}
