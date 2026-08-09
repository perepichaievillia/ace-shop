import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Marquee from '../../components/Marquee/Marquee';
import Reveal from '../../components/Reveal/Reveal';
import { getFeaturedProducts } from '../../data/products';
import styles from './Home.module.css';

// Підключаємо файл даних, які будуть змінюватися через адмінку
import heroData from '../../data/hero.json';

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroTop}>
            <span className="eyebrow">ACE Store</span>
            <span className="eyebrow">School Merch 2026</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.heroHeadline}>
                <span>{heroData.title1}</span>
                <span>{heroData.title2}</span>
                <span className={styles.accentWord}>{heroData.accent}</span>
              </h1>
              <div className={styles.heroMeta}>
                <Button as={Link} to="/shop" variant="primary">
                  ДИВИТИСЯ КОЛЕКЦІЮ
                </Button>
                <span className="eyebrow">01 / Drop 2026</span>
              </div>
            </div>

            <div className={styles.heroImageWrap}>
              <span className={styles.heroBadge}>New Drop</span>
              <img
                src={heroData.heroImage}
                alt="ACE Hero"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className={styles.section}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Колекція</h2>
            <Button as={Link} to="/shop" variant="ghost">
              View all <ArrowRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
            </Button>
          </Reveal>
          <Reveal>
            <ProductGrid products={featured} />
          </Reveal>
        </div>
      </section>

      <section className={styles.manifesto}>
  <div className="container">
    <Reveal>
      <p className={styles.manifestoText}>
        Ми не просто <span className={styles.fade}>ходимо до школи.</span>
        <br />
        Ми — частина <span className={styles.fade}>ACE.</span>
      </p>
    </Reveal>

    <Reveal delay={120} className={styles.manifestoRow} style={{ marginTop: '48px' }}>
      <p className={styles.manifestoNote}>
        Це не просто мерч. Це частина спільноти, яку можна носити із собою далеко за межами школи.
      </p>

      <Button as={Link} to="/about" variant="outlineLight">
        Наша історія
      </Button>
    </Reveal>
  </div>
</section>

      <section className={styles.section}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Shop By Category</h2>
          </Reveal>
          <div className={styles.categoryGrid}>
            <Reveal>
              <Link to="/shop?category=clothing" className={styles.categoryCard}>
                <ProductImage
                  imageKey="crewneck-forest-1"
                  label="Clothing"
                  alt="Clothing category"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryOverlay} />
                <span className={styles.categoryLabel}>Clothing</span>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/shop?category=accessories" className={styles.categoryCard}>
                <ProductImage
                  imageKey="tote-natural-1"
                  label="Accessories"
                  alt="Accessories category"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryOverlay} />
                <span className={styles.categoryLabel}>Accessories</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container">
          <Reveal>
            <p className={styles.finalCtaHeadline}>Wear Your Ace.</p>
            <Button as={Link} to="/shop" variant="primary">
              Shop All
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}