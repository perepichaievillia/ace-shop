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

// Функція для коректного оброблення шляху до будь-якої фотографії
function getImageUrl(image) {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  const cleanPath = image.replace(/^public\//, '').replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

// Абстрактні SVG-заглушки для категорій
const placeholders = {
  junior: (
    <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.categoryPlaceholder}>
      <rect width="400" height="500" fill="#84AF71"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="var(--font-display)" font-weight="800" font-size="120" fill="black">МШ</text>
    </svg>
  ),
  senior: (
    <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.categoryPlaceholder}>
      <rect width="400" height="500" fill="#84AF71"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="var(--font-display)" font-weight="800" font-size="120" fill="black">СШ</text>
    </svg>
  ),
  accessories: (
    <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.categoryPlaceholder}>
      <rect width="400" height="500" fill="#84AF71"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="var(--font-display)" font-weight="800" font-size="120" fill="black">АК</text>
    </svg>
  ),
};

// Дані для карток категорій на головній (абстракція)
const homeCategories = [
  {
    id: 'junior',
    title: 'Молодша школа',
    link: '/shop?category=junior',
  },
  {
    id: 'senior',
    title: 'Старша школа',
    link: '/shop?category=senior',
  },
  {
    id: 'accessories',
    title: 'Аксесуари',
    link: '/shop?category=accessories',
  },
];

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
              <span className={styles.heroBadge}>Новинка</span>
              <img
                src={getImageUrl(heroData.heroImage)}
                alt="ACE Hero"
                className={styles.heroImage}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              Більше товарів <ArrowRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
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
              
              {/* Автоматична генерація карток категорій */}
              {homeCategories.map((cat) => (
                <Link key={cat.id} to={cat.link} className={styles.categoryCard}>
                  
                  {/* Абстрактна заглушка замість картинки */}
                  {placeholders[cat.id]}
                  
                  <div className={styles.categoryOverlay} />
                  <span className={styles.categoryLabel}>{cat.title}</span>
                </Link>
              ))}

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