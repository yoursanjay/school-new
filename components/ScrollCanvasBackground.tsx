"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ScrollCanvasBackground.module.css";

const slides = [
  {
    image: "/img/hero1.png",
    heading: "Where Every Child's Journey Begins",
    description:
      "Discover a nurturing learning environment where curiosity grows, confidence builds, and every child is encouraged to reach their full potential.",
    button: "Discover Our School",
    href: "/garden#about",
    position: "left",
    theme: "dark",
  },
  {
    image: "/img/hero2.png",
    heading: "Inspiring Young Minds to Achieve More",
    description:
      "Build strong foundations through engaging lessons, creative thinking, and meaningful learning experiences that prepare students for the future.",
    button: "Explore Academics",
    href: "/garden#academics",
    position: "right",
    theme: "dark",
  },
  {
    image: "/img/hero3.png",
    heading: "Learn, Create, Explore and Grow",
    description:
      "From sports and arts to collaborative projects and hands-on activities, we encourage students to discover their talents and develop essential life skills.",
    button: "Explore School Life",
    href: "/garden#student-life",
    position: "left",
    theme: "light",
  },
  {
    image: "/img/hero4.png",
    heading: "Your Child's Bright Future Starts Here",
    description:
      "Join a welcoming school community dedicated to learning, personal growth, creativity, and preparing every student for tomorrow's opportunities.",
    button: "Enquire About Admissions",
    href: "/garden#admissions",
    position: "left",
    theme: "dark",
  },
];

export default function ScrollCanvasBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let intervalId: number | undefined;

    const syncMotionPreference = () => {
      const shouldReduceMotion = motionPreference.matches;
      setReducedMotion(shouldReduceMotion);

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }

      if (!shouldReduceMotion) {
        intervalId = window.setInterval(() => {
          setActiveIndex((index) => (index + 1) % slides.length);
        }, 3000);
      }
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
      motionPreference.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  return (
    <div
      className={styles.hero}
      data-active-slide={activeIndex}
    >
      <div className={styles.imageStage}>
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            preload={index === 0}
            sizes="100vw"
            aria-hidden="true"
            className={`${styles.heroImage} ${activeIndex === index ? styles.activeImage : ""}`}
            style={{ transitionDuration: reducedMotion ? "0ms" : undefined }}
          />
        ))}
      </div>
      <div
        key={activeIndex}
        className={`${styles.content} ${styles[`content--${activeSlide.position}`]} ${styles[`content--${activeSlide.theme}`]} ${reducedMotion ? styles.reducedMotion : ""}`}
      >
        <div className={styles.contentMotion}>
          <h1 className={styles.heading}>{activeSlide.heading}</h1>
          <p className={styles.description}>{activeSlide.description}</p>
          <a className={styles.button} href={activeSlide.href}>
            {activeSlide.button}
          </a>
        </div>
      </div>
    </div>
  );
}
