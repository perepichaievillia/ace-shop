import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Marquee from '../../components/Marquee/Marquee';
import Reveal from '../../components/Reveal/Reveal';
import { getFeaturedProducts } from '../../data/products';
import styles from './Home.module.css';

// Підключаємо файл даних, які будуть змінюватися через адмін-панель
import heroData from '../../data/hero.json';

// Функція для коректного оброблення шляху до фотографії
function getImageUrl(image) {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  const cleanPath = image.replace(/^public\//, '').replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

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
                src={getImageUrl(heroData.heroImage)}
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
            <h2 className={styles.sectionTitle}>Обирай своє</h2>
          </Reveal>
          <Reveal>
            <div className={styles.categoryGrid}>
              <Link to="/shop?category=junior" className={styles.categoryCard}>
                <img
                  src={getImageUrl('images/products/pub../img_2540.jpg.jpg')} 
                  alt="Молодша школа"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryOverlay} />
                <span className={styles.categoryLabel}>Молодша школа</span>
              </Link>

              <Link to="/shop?category=senior" className={styles.categoryCard}>
                <img
                  src={getImageUrl('images/products/crewneck-forest-1.jpg')} 
                  alt="Старша школа"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryOverlay} />
                <span className={styles.categoryLabel}>Старша школа</span>
              </Link>

              <Link to="/shop?category=accessories" className={styles.categoryCard}>
                <img
                  src={getImageUrl('images/products/tote-natural-1.jpg')} 
                  alt="Аксесуари"
                  className={styles.categoryImg}
                />
                <div className={styles.categoryOverlay} />
                <span className={styles.categoryLabel}>Аксесуари</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container">
          <Reveal>
            <p className={styles.finalCtaHeadline}>Носи те, ким ти є.</p>
            <Button as={Link} to="/shop" variant="primary">
              Дивитися все
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}