"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./WebsiteContentRevisionSection.module.css";

const topics = [
  {
    title: "Events Coverage",
    description: "In-depth reporting on EDUTOPIA events and recent campus happenings.",
    icon: "✦",
  },
  {
    title: "Front Page Branding",
    description: "Update the primary logo with the revised picture, incorporating the latest tie-up partners and modified branding elements.",
    icon: "◈",
  },
  {
    title: "Virtual Campus Tour",
    description: "Integrate the high-definition promotional video showcasing the school's state-of-the-art infrastructure.",
    icon: "▷",
  },
  {
    title: "Content Architecture",
    description: "Thoroughly update all sub-topic titles and internal descriptive content throughout the website, paired with high-quality, relevant pictures.",
    icon: "▤",
  },
  {
    title: "Interactive Features",
    description: "Implement a \"Chat with Us\" functionality on the home page, featuring automated AI responses for immediate visitor engagement.",
    icon: "◎",
  },
  {
    title: "Inquiry Management",
    description: "Integrate a \"Need Help or Call Back Requested\" lead-generation form for prospective parents.",
    icon: "↗",
  },
  {
    title: "The SAM Advantage",
    description: "Add a persuasive write-up titled \"Why to Choose Sri Aurobindo Mira Universal School\" highlighting the school's unique selling points.",
    icon: "✧",
  },
  {
    title: "Specialized Class Activities",
    description: "Create a dedicated section featuring various activity titles accompanied by a gallery of updated, vibrant pictures.",
    icon: "▧",
  },
];

export default function WebsiteContentRevisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="content-revision-title"
      data-visible={isVisible}
    >
      <div className={styles.studentImage} aria-hidden="true">
        <Image
          src="/img/bg2.png"
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 48vw"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.panel}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Sri Aurobindo Mira Universal School</span>
            <h2 id="content-revision-title">Website Content Revision and Update</h2>
          </header>
          <ul className={styles.topicGrid}>
            {topics.map((topic, index) => (
              <li className={styles.topic} key={topic.title} style={{ "--topic-index": index } as CSSProperties}>
                <span className={styles.icon} aria-hidden="true">{topic.icon}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
