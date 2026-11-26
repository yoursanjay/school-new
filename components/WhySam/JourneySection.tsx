import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function JourneySection() {
  return (
    <section
      id="journey-section"
      className={styles.journey}
      aria-labelledby="journey-heading"
    >
      <div className={styles.journeyLayout}>
        <div className={styles.journeyCopy} data-reveal-group>
          <p className={styles.eyebrowDark} data-reveal-item>07 / BEGIN HERE</p>
          <h2 id="journey-heading" className={styles.journeyHeading} data-reveal-item>
            YOUR JOURNEY
            <span>STARTS HERE.</span>
          </h2>
          <p className={styles.journeyBody} data-reveal-item>
            Bring your questions, your interests, and the person you are
            becoming. Take a closer look at life at SAM Universe.
          </p>
          <div className={styles.journeyActions} data-reveal-item>
            <a className={styles.journeyPrimary} href="/garden#admissions">
              EXPLORE ADMISSIONS <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.journeySecondary} href="/contact-us">
              TALK TO OUR TEAM
            </a>
          </div>
        </div>

        <figure className={`${styles.journeyPhoto} ${styles.photoFrame}`} data-diagonal>
          <Image
            src="/img/about/campus-entrance.webp"
            alt="Entrance to Sri Aurobindo Mira Universal School in Madurai"
            fill
            sizes="(max-width: 800px) 88vw, 48vw"
            className={styles.photo}
            data-parallax
          />
          <figcaption className={styles.journeyCaption}>SRI AUROBINDO MIRA UNIVERSAL SCHOOL · MADURAI</figcaption>
        </figure>
      </div>
    </section>
  );
}
