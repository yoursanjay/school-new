"use client";

import { useRef, useState } from "react";
import SchoolExperienceCard, {
  type SchoolExperience,
} from "./SchoolExperienceCard";

const experiences: SchoolExperience[] = [
  {
    eyebrow: "01 — LEARNING",
    title: "CURIOUS MINDS.\nCONFIDENT FUTURES.",
    description:
      "A learning environment where students question, explore and discover with purpose.",
    cta: "EXPLORE",
    image: "/images/digital-classroom.jpg",
    imageAlt: "Students learning together in a modern classroom",
  },
  {
    eyebrow: "02 — SPORTS",
    title: "STRENGTH BEYOND\nTHE CLASSROOM.",
    description:
      "Sport builds discipline, teamwork, resilience and the confidence to keep moving forward.",
    cta: "EXPLORE",
    image: "/images/sports.jpg",
    imageAlt: "Students playing sport and building confidence",
  },
  {
    eyebrow: "03 — CREATIVITY",
    title: "IMAGINATION\nWITHOUT LIMITS.",
    description:
      "Art, music and creative expression give every student space to discover their own voice.",
    cta: "EXPLORE",
    image: "/images/arts.jpg",
    imageAlt: "Students engaged in creative arts and expression",
  },
  {
    eyebrow: "04 — INNOVATION",
    title: "BUILDING\nTOMORROW.",
    description:
      "Technology and hands-on exploration turn curiosity into ideas, skills and possibilities.",
    cta: "EXPLORE",
    image: "/images/innovation.jpg",
    imageAlt: "Students using technology and STEM equipment to build ideas",
  },
  {
    eyebrow: "05 — LEADERSHIP",
    title: "READY TO\nLEAD.",
    description:
      "Students grow through responsibility, collaboration and experiences that prepare them for the future.",
    cta: "EXPLORE",
    image: "/images/student-life.jpg",
    imageAlt: "Students collaborating and leading together",
  },
];

const clampIndex = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function SchoolExperiencesSection() {
  const [activeIndex, setActiveIndex] = useState(3);
  const dragOriginRef = useRef<number | null>(null);

  const moveToIndex = (nextIndex: number) => {
    setActiveIndex(clampIndex(nextIndex, 0, experiences.length - 1));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragOriginRef.current = event.clientX;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragOriginRef.current === null) return;

    const delta = event.clientX - dragOriginRef.current;
    if (Math.abs(delta) < 28) return;

    moveToIndex(activeIndex + (delta < 0 ? 1 : -1));
    dragOriginRef.current = event.clientX;
  };

  const handlePointerEnd = () => {
    dragOriginRef.current = null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveToIndex(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveToIndex(activeIndex + 1);
    }
  };

  return (
    <section className="school-experiences" aria-label="School experiences">
      <div className="school-experiences-shell">
        <header className="school-experiences-header">
          <div className="school-experiences-kicker">
            <span>06</span>
            <span className="school-experiences-kicker-divider" aria-hidden="true" />
            <span>EXPERIENCES</span>
          </div>
          <h2 className="school-experiences-title">
            EVERY DAY
            <br />
            BECOMES PART OF THE JOURNEY.
          </h2>
          <p className="school-experiences-lead">
            Learning extends beyond the classroom — through discovery,
            creativity, movement and leadership.
          </p>
        </header>

        <div
          className="school-experiences-rail"
          role="listbox"
          tabIndex={0}
          aria-activedescendant={`school-experience-${activeIndex}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerEnd}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onKeyDown={handleKeyDown}
        >
          {experiences.map((experience, index) => (
            <SchoolExperienceCard
              key={experience.eyebrow}
              experience={experience}
              index={index}
              isOpen={activeIndex === index}
              offset={index - activeIndex}
              totalCount={experiences.length}
              onActivate={() => moveToIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
