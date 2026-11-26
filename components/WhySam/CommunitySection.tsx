import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

export default function CommunitySection() {
  return (
    <section
      id="community-section"
      className={styles.community}
      aria-labelledby="community-heading"
    >
      <div className={styles.communityLayout}>
        <div className={styles.communityCopy} data-reveal-group>
          <p className={styles.eyebrow} data-reveal-item>06 / A COMMUNITY THAT INSPIRES</p>
          <h2 id="community-heading" className={styles.communityHeading} data-reveal-item>
            GROW
            <span>TOGETHER.</span>
          </h2>
          <p className={styles.bodyCopyLight} data-reveal-item>
            A school community is built in everyday moments: learning beside
            one another, sharing wonder, and showing care.
          </p>
          <p className={styles.communityAside} data-reveal-item>
            MANY VOICES. ONE SHARED SPACE.
          </p>
        </div>

        <div className={styles.communityMosaic}>
          <figure className={`${styles.communityMainPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/about/special-every-child.webp"
              alt="Young students sharing a close-up encounter with a parrot"
              fill
              sizes="(max-width: 800px) 88vw, 46vw"
              className={styles.photo}
              data-parallax
            />
          </figure>
          <figure className={`${styles.communitySmallPhoto} ${styles.photoFrame}`} data-diagonal>
            <Image
              src="/img/about/special-educators.webp"
              alt="School educators gathered together on campus"
              fill
              sizes="(max-width: 800px) 52vw, 28vw"
              className={styles.photo}
            />
          </figure>
          <span className={styles.communityRule} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
