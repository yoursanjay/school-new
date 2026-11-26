import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="why-sam-heading">
      <Image
        src="/img/photo_2024-06-21_17-07-37.jpg"
        alt="Aerial view of students gathered on SAM Universe School's athletics field"
        fill
        preload
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroSlash} aria-hidden="true" />

      <div className={styles.heroContent}>
        <div className={`${styles.heroIntro} ${styles.heroCopy}`}>
          <p className={styles.heroEyebrow}>SRI AUROBINDO MIRA · MADURAI · SINCE 2001</p>
          <h1 id="why-sam-heading" className={styles.heroTitle}>
            <span>WHY</span>
            <span>SAM</span>
            <span>UNIVERSE<span className={styles.heroQuestion}>?</span></span>
          </h1>
          <p className={styles.heroSubhead}>
            A school for curious minds, confident voices, and many ways to grow.
          </p>
          <a className={styles.heroLink} href="#learning-section">
            EXPLORE THE EXPERIENCE
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className={styles.heroIndex} aria-hidden="true">01 <span>/</span> 07</p>
      </div>
    </section>
  );
}
