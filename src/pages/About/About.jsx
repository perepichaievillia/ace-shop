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
          <span className={`eyebrow ${styles.eyebrow}`}>About</span>
          <Reveal as="h1" className={styles.headline}>
            More Than A School. A Community You Wear.
          </Reveal>
          <Reveal as="p" delay={100} className={styles.lead}>
            ACE Store is the merch line of ACE School — built for students, alumni, and
            anyone who believes a crest belongs on the street as much as it does in a hallway.
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
          <h2 className={styles.sectionTitle}>The Idea</h2>
          <p className={styles.sectionText}>
            Most school merch stays in the building. We wanted ours to leave it. Every ACE
            piece is designed first as clothing — considered fabrics, real fit, restrained
            branding — so it holds up next to anything already in your rotation.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.section}>
          <h2 className={styles.sectionTitle}>The Drop Model</h2>
          <p className={styles.sectionText}>
            New pieces release in small, seasonal drops rather than a static catalog. Once a
            drop sells through, it's retired — so what you're wearing stays specific to the
            year you were part of ACE.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.section}>
          <h2 className={styles.sectionTitle}>Pickup &amp; Delivery</h2>
          <p className={styles.sectionText}>
            Every order can be picked up directly at ACE School at no cost, or shipped to
            you — the choice is yours at checkout.
          </p>
        </Reveal>
      </div>

      <div className={styles.ctaSection}>
        <div className="container">
          <p className={styles.ctaHeadline}>Wear Your Ace.</p>
          <Button as={Link} to="/shop" variant="primary">
            Shop All
          </Button>
        </div>
      </div>
    </>
  );
}
