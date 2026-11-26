import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function LearningSection() {
  return (
    <section
      id="learning-section"
      className={styles.learning}
      aria-labelledby="learning-heading"
    >
      <div className={styles.learningLayout}>
        <div className={styles.learningCopy} data-reveal-group>
          <p className={styles.eyebrow} data-reveal-item>02 / LEARNING WITHOUT LIMITS</p>
          <h2 id="learning-heading" className={styles.heading} data-reveal-item>
            LEARNING
            <span>WITHOUT LIMITS</span>
          </h2>
          <p className={styles.bodyCopy} data-reveal-item>
            A question is a beginning. Classroom exploration, computing and
            outdoor discovery give learning room to move beyond a single room.
          </p>
          <p className={styles.learningNote} data-reveal-item>
            ASK <span>·</span> TRY <span>·</span> DISCOVER
          </p>
        </div>

        <div className={styles.learningBoard}>
          <figure className={`${styles.learningMainPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/about/special-holistic.webp"
              alt="Students taking part in an interactive classroom lesson"
              fill
              sizes="(max-width: 800px) 88vw, 48vw"
              className={styles.photo}
              data-parallax
            />
            <figcaption className={styles.photoCaption}>CURIOSITY IN THE CLASSROOM</figcaption>
          </figure>
          <figure className={`${styles.learningDetailPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/about/letter-tech-lab.webp"
              alt="Students working at computers in a school laboratory"
              fill
              sizes="(max-width: 800px) 58vw, 28vw"
              className={styles.photo}
            />
            <figcaption className={styles.photoCaption}>IDEAS AT WORK</figcaption>
          </figure>
          <span className={styles.learningMarker} aria-hidden="true">KEEP ASKING ↗</span>
        </div>
      </div>
    </section>
  );
}
