import styles from './Marquee.module.css';

export default function Marquee({
  text = 'БУДЬ СОБОЮ • БУДЬ ACE • ТВОРИ • ДОСЛІДЖУЙ • РУХАЙСЯ ДАЛІ',
  dark = false,
  repeat = 8
}) {
  const phrases = text.split(' • ');
  const items = Array.from({ length: repeat });

  return (
    <div
      className={`${styles.marquee} ${dark ? styles.dark : ''}`}
      aria-hidden="true"
    >
      <div className={styles.track}>
        {[...items, ...items].map((_, i) => (
          <div className={styles.item} key={i}>
            {phrases.map((phrase, index) => (
              <span key={index}>
                {phrase}
                <span className={styles.dot}>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}