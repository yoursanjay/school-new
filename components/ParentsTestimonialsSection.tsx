"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ParentsTestimonialsSection.module.css";

const reviews = [
  {
    text: "More than a place to learn, the school has given our child the confidence to explore, ask questions, and discover who they are.",
    signature: "A SAM Parent",
    description: "Parent of a Grade 8 student",
  },
  {
    text: "The teachers care about every child's progress. We have seen our child grow in confidence, creativity, and a genuine love for learning.",
    signature: "A Happy Parent",
    description: "Parent of a Grade 6 student",
  },
  {
    text: "Excellent academics, inspiring teachers, and wonderful opportunities beyond the classroom have made our child's school journey special.",
    signature: "A Proud Parent",
    description: "Parent of a Grade 10 student",
  },
  {
    text: "We appreciate the school's focus on values, discipline, and individual attention. Our child looks forward to coming to school every day.",
    signature: "A Grateful Parent",
    description: "Parent of a Grade 5 student",
  },
];

export default function ParentsTestimonialsSection() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const review = reviews[activeReview];

  return (
    <section className={styles.section} aria-labelledby="parents-testimonials-title">
      <div className={styles.inner}>
        <header className={styles.branding}>
          <Image
            className={styles.logo}
            src="/images/logo.png"
            alt="Sri Aurobindo Mira Universal School emblem"
            width={76}
            height={76}
          />
          <div className={styles.schoolIdentity}>
            <p className={styles.schoolName}>Sri Aurobindo Mira</p>
            <p className={styles.schoolTagline}>Universal School <span aria-hidden="true">·</span> CBSE <span aria-hidden="true">·</span> Madurai</p>
          </div>
          <p className={styles.brandNote}>Growing Minds.<br />Shaping Tomorrow.</p>
        </header>

        <div className={styles.cardWrap}>
          <article className={styles.card}>
            <div className={styles.familyPhotoPlaceholder} aria-label="Parent or family photo placeholder">
              <svg viewBox="0 0 96 96" aria-hidden="true">
                <circle cx="34" cy="31" r="12" />
                <circle cx="63" cy="33" r="10" />
                <path d="M12 76c1-16 9-25 22-25s21 9 22 25M51 76c1-13 6-20 15-20s15 7 16 20" />
                <path d="M26 77h45" />
              </svg>
            </div>

            <p className={styles.eyebrow}>A note from our school community</p>
            <h2 id="parents-testimonials-title">From Our Parents&apos; Hearts</h2>
            <span className={styles.headingRule} aria-hidden="true" />

            <div className={styles.reviewContent} key={activeReview} aria-live="polite">
              <blockquote className={styles.quote}>
                “{review.text}”
              </blockquote>

              <div className={styles.attribution}>
                <span className={styles.signature}>{review.signature}</span>
                <span className={styles.attributionNote}>{review.description}</span>
                <span className={styles.sampleNotice}>Sample testimonial</span>
              </div>
            </div>

            <div className={styles.stars} role="img" aria-label="Illustrative five-star rating">
              {Array.from({ length: 5 }, (_, index) => <span key={index} aria-hidden="true">★</span>)}
            </div>
          </article>
        </div>

        <p className={styles.bottomBrand}>Sri Aurobindo Mira Universal School <span aria-hidden="true">·</span> Madurai</p>
      </div>
    </section>
  );
}
