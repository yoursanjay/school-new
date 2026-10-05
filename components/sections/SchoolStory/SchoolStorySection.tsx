"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { schoolMono, schoolSerif } from "@/components/school/typography";
import styles from "./SchoolStorySection.module.css";

const themes = [
  "ACADEMICS",
  "CREATIVITY",
  "LEADERSHIP",
  "SPORTS",
  "ARTS",
  "COMMUNITY",
];

export default function SchoolStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="school-story"
      className={`${styles.section} ${schoolSerif.variable} ${schoolMono.variable}`}
      data-entered={hasEntered}
      aria-label="The school"
    >
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/images/school-hero-campus-life.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <p className={`${styles.brand} ${styles.reveal}`} data-order="1">
          PREMIUM ACADEMY
        </p>

        <div className={styles.hero}>
          <p className={`${styles.eyebrow} ${styles.reveal}`} data-order="2">
            07 — THE SCHOOL
          </p>
          <h2 className={styles.reveal} data-order="3">
            WHERE CURIOSITY
            <br />
            BECOMES POSSIBILITY.
          </h2>
          <p className={`${styles.intro} ${styles.reveal}`} data-order="4">
            A learning environment designed to help every student discover,
            question, create, and grow with confidence.
          </p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.approach}>
            <p className={`${styles.eyebrow} ${styles.reveal}`} data-order="5">
              OUR APPROACH
            </p>
            <h3 className={styles.reveal} data-order="6">
              LEARNING THAT
              <br />
              MOVES WITH THE WORLD.
            </h3>
            <p className={`${styles.description} ${styles.reveal}`} data-order="7">
              From foundational learning to future-ready thinking, students are
              encouraged to explore ideas, build skills, and become confident
              contributors to the world around them.
            </p>
            <div className={`${styles.actions} ${styles.reveal}`} data-order="8">
              <a href="/garden#academics">EXPLORE ACADEMICS <span aria-hidden="true">↗</span></a>
              <a href="/garden#facilities">DISCOVER CAMPUS <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <ul
            className={`${styles.themes} ${styles.reveal}`}
            data-order="9"
            aria-label="School experiences"
          >
            {themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
