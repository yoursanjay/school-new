import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function StrengthSection() {
  return (
    <section
      id="strength-section"
      className={styles.strength}
      aria-labelledby="strength-heading"
    >
      <div className={styles.strengthLayout}>
        <figure className={`${styles.strengthPhoto} ${styles.photoFrame}`} data-diagonal>
          <Image
            src="/img/photo_2025-09-19_08-57-17.jpg"
            alt="A student enjoying a hula-hoop activity outdoors"
            fill
            sizes="(max-width: 800px) 88vw, 48vw"
            className={styles.photo}
            data-parallax
          />
          <figcaption className={styles.strengthPhotoCaption}>DISCOVER WHAT MOVES YOU</figcaption>
        </figure>

        <div className={styles.strengthCopy} data-reveal-group>
          <p className={styles.eyebrow} data-reveal-item>03 / EVERY CHILD HAS A STRENGTH</p>
          <h2 id="strength-heading" className={styles.strengthHeading} data-reveal-item>
            EVERY CHILD
            <span>HAS A STRENGTH</span>
          </h2>
          <p className={styles.bodyCopyLight} data-reveal-item>
            A strength might show up on a field, in a studio, or in the quiet
            moment a new idea clicks. Every learner deserves room to find theirs.
          </p>
          <div className={styles.strengthWords} data-reveal-item>
            <span>NOTICE</span>
            <span>NURTURE</span>
            <span>CELEBRATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
