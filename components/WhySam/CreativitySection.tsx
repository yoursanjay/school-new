import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function CreativitySection() {
  return (
    <section
      id="creativity-section"
      className={styles.creativity}
      aria-labelledby="creativity-heading"
    >
      <div className={styles.creativityLayout}>
        <div className={styles.creativityCopy} data-reveal-group>
          <p className={styles.eyebrow} data-reveal-item>05 / CREATIVITY IN ACTION</p>
          <h2 id="creativity-heading" className={styles.creativityHeading} data-reveal-item>
            IDEAS
            <span>TAKE SHAPE.</span>
          </h2>
          <p className={styles.bodyCopy} data-reveal-item>
            Colour, movement, music and making offer different ways to explore
            an idea and express what you see.
          </p>
          <p className={styles.creativitySignature} data-reveal-item>
            MAKE <span>·</span> MOVE <span>·</span> IMAGINE
          </p>
        </div>

        <div className={styles.creativityStage}>
          <figure className={`${styles.creativityMainPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/about/letter-art-studio.webp"
              alt="Students painting together in the school art studio"
              fill
              sizes="(max-width: 800px) 88vw, 52vw"
              className={styles.photo}
              data-parallax
            />
          </figure>
          <figure className={`${styles.creativityInsetPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/ac1.jpg"
              alt="Students performing together on a school stage"
              fill
              sizes="(max-width: 800px) 64vw, 32vw"
              className={styles.photo}
            />
            <figcaption className={styles.creativityCaption}>A DIFFERENT KIND OF SPOTLIGHT</figcaption>
          </figure>
          <span className={styles.creativityNumber} aria-hidden="true">05</span>
        </div>
      </div>
    </section>
  );
}
