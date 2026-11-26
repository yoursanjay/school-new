import Image from 'next/image';
import styles from './WhySamUniverse.module.css';

const moments = [
  {
    image: '/img/about/letter-archery.webp',
    alt: 'A student practicing archery outdoors',
    title: 'FOCUS',
    detail: 'Find your aim.',
  },
  {
    image: '/img/about/letter-dance.webp',
    alt: 'Students rehearsing a dance together',
    title: 'RHYTHM',
    detail: 'Move as one.',
  },
  {
    image: '/img/about/letter-equestrian.webp',
    alt: 'A student riding a horse on the school riding track',
    title: 'COURAGE',
    detail: 'Take the next step.',
  },
];

export default function PlaySection() {
  return (
    <section
      id="play-section"
      className={styles.play}
      aria-labelledby="play-heading"
    >
      <div className={styles.playHeader} data-reveal-group>
        <div>
          <p className={styles.eyebrowDark} data-reveal-item>04 / MOVEMENT & EXPRESSION</p>
          <h2 id="play-heading" className={styles.playHeading} data-reveal-item>
            PLAY.
            <span>PERFORM.</span>
            <span>EXCEL.</span>
          </h2>
        </div>
        <p className={styles.playIntro} data-reveal-item>
          Movement, practice, rhythm and teamwork. Find your pace, then make the
          most of every chance to take part.
        </p>
      </div>

      <div className={styles.playViewport} data-play-viewport>
        <div className={styles.playTrack} data-play-track>
          {moments.map((moment, index) => (
            <figure className={styles.playFrame} key={moment.title}>
              <div className={`${styles.playImageFrame} ${styles.photoFrame}`} data-diagonal>
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 767px) 82vw, 48vw"
                  className={styles.photo}
                />
              </div>
              <figcaption className={styles.playCaption}>
                <span className={styles.playIndex}>0{index + 1}</span>
                <span className={styles.playMoment}>{moment.title}</span>
                <span className={styles.playDetail}>{moment.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p className={styles.playFootnote}>
        <span>SPORT · STAGE · OUTDOORS</span>
        <span className={styles.playScrollCue}>SCROLL TO MOVE <span aria-hidden="true">→</span></span>
      </p>
    </section>
  );
}
