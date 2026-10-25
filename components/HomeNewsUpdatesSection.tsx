"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HomeNewsUpdatesSection.module.css";

export default function HomeNewsUpdatesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    setMotionReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-motion-ready={motionReady || undefined}
      data-visible={isVisible || undefined}
      aria-labelledby="latest-news-updates-heading"
    >
      <div className={styles.layout}>
        <header className={styles.sectionHeader}>
          <span className={styles.kicker}>SAM · SCHOOL JOURNAL</span>
          <p className={styles.eyebrow} id="latest-news-updates-heading">
            News &amp; Updates
          </p>
        </header>

        <div className={styles.newsContent}>
          <article className={styles.article}>
            <p className={styles.category}>HIGHER EDUCATION · UNIVERSITY FAIR</p>
            <h2>1. SAM EDUTOPIA 2026 – Opening New Horizons in Higher Education</h2>
            <div className={styles.body}>
              <p><time className={styles.inlineMeta} dateTime="2026-09-25">Madurai, 25 September 2026</time>: Sri Aurobindo Mira Universal School hosted SAM EDUTOPIA 2026, bringing more than 50 leading universities and institutions together for its University Fair.</p>
              <p>Students in Grades 11 and 12 from nearly 10 schools across Madurai and neighbouring regions explored pathways in engineering, medicine, arts and design, business, computer science and AI, research, hospitality, travel, and emerging fields.</p>
              <p>Students and parents met university representatives to discuss courses, admissions, scholarships, and careers. Led by Director Er. M.C. Abilash, the event opened new opportunities for students to explore, aspire, and excel.</p>
            </div>
          </article>

        </div>

        <figure className={styles.figure}>
          <div className={styles.imageFrame}>
            <Image src="/img/s6.JPG" alt="Students smiling together" width={1672} height={941} sizes="(max-width: 800px) 100vw, 42vw" />
          </div>
          <figcaption className={styles.caption}>
            <strong>Learn. Explore. Achieve.</strong>
            <strong>Every Student Has a Bright Future</strong>
            <span>Inspiring young minds through curiosity, creativity and meaningful learning.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
