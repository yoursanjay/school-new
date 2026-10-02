"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Ayan's Parents",
    category: "Grade 5",
    text:
      "The holistic approach is fantastic. The balanced program of academics and co-curriculars has been transformational for Ayan. From science labs to dance, he's thriving.",
    image: "/images/gallery-1.webp",
  },
  {
    id: 2,
    name: "Science Fair Team",
    category: "Students",
    text:
      "Our projects are amazing! We love working together and discovering new ideas every day.",
    image: "/images/gallery-2.webp",
  },
  {
    id: 3,
    name: "Student Voice",
    category: "Grade 6",
    text:
      "The teachers make learning exciting and meaningful every day. I feel more confident in class and in every activity.",
    image: "/images/gallery-3.webp",
  },
  {
    id: 4,
    name: "Dance Troupe",
    category: "Students",
    text:
      "The dance program is so much fun! It helps us express ourselves while building confidence and teamwork.",
    image: "/images/gallery-4.webp",
  },
  {
    id: 5,
    name: "Parent",
    category: "Grade 7",
    text:
      "Every activity helped our child become more creative, confident, and curious about the world.",
    image: "/images/gallery-5.webp",
  },
  {
    id: 6,
    name: "Creative Club",
    category: "Students",
    text:
      "The school encourages curiosity and confidence. We feel supported in every challenge and opportunity.",
    image: "/images/about.webp",
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function StudentReviewsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetIndexRef = useRef<number>(2);
  const currentIndexRef = useRef<number>(2);
  const animationFrameRef = useRef<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState(2);
  const [viewportWidth, setViewportWidth] = useState(1280);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateTargetProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 1);
      targetIndexRef.current = progress * (reviews.length - 1);
    };

    const animate = () => {
      currentIndexRef.current +=
        (targetIndexRef.current - currentIndexRef.current) * 0.08;
      setDisplayIndex(currentIndexRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    updateTargetProgress();
    animationFrameRef.current = requestAnimationFrame(animate);

    const onScroll = () => updateTargetProgress();
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      updateTargetProgress();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleStep = (direction: 1 | -1) => {
    targetIndexRef.current = clamp(
      targetIndexRef.current + direction,
      0,
      reviews.length - 1,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="testimonial-section"
      aria-label="Student and parent testimonials"
    >
      <div className="testimonial-sky" />
      <div className="testimonial-cloud testimonial-cloud-left" />
      <div className="testimonial-cloud testimonial-cloud-right" />
      <div className="testimonial-sun" />
      <div className="testimonial-plane" />
      <div className="testimonial-leaf testimonial-leaf-one" />
      <div className="testimonial-leaf testimonial-leaf-two" />
      <div className="testimonial-leaf testimonial-leaf-three" />

      <div className="testimonial-content">
        <div className="testimonial-heading-wrap">
          <span className="testimonial-kicker">School Community</span>
          <h2>Hear From Our Happy Students &amp; Parents</h2>
        </div>

        <div className="testimonial-stage">
          <button
            type="button"
            className="testimonial-nav testimonial-nav-left"
            aria-label="Previous testimonial"
            onClick={() => handleStep(-1)}
          >
            ←
          </button>

          <div className="testimonial-track">
            {reviews.map((review, index) => {
              const offset = index - displayIndex;
              const abs = Math.abs(offset);
              const scale = clamp(1 - abs * 0.18, 0.58, 1);
              const opacity = clamp(1 - abs * 0.22, 0.35, 1);
              const x = offset * clamp(viewportWidth * 0.28, 220, 360);
              const zIndex = 10 - abs;

              return (
                <article
                  key={review.id}
                  className={`review-card ${index === Math.round(displayIndex) ? "is-active" : ""}`}
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), -50%, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="review-portrait-wrap">
                    <div
                      className="review-portrait"
                      style={{ backgroundImage: `url(${review.image})` }}
                    />
                    <div className="review-badge">{review.id}</div>
                  </div>

                  <div className="review-stars" aria-label="Five out of five stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>

                  <p className="review-text">“{review.text}”</p>

                  <div className="review-meta">
                    <strong>{review.name}</strong>
                    <span>{review.category}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="testimonial-nav testimonial-nav-right"
            aria-label="Next testimonial"
            onClick={() => handleStep(1)}
          >
            →
          </button>
        </div>

        <div className="testimonial-dots" aria-label="Current testimonial progress">
          {reviews.map((review, index) => {
            const active = Math.round(displayIndex) === index;
            return (
              <button
                key={review.id}
                type="button"
                className={`dot ${active ? "is-active" : ""}`}
                aria-label={`Show review ${index + 1}`}
                onClick={() => {
                  targetIndexRef.current = index;
                }}
              />
            );
          })}
        </div>

        <div className="testimonial-icons" aria-hidden="true">
          {[
            { label: "Graduation", icon: "🎓", active: false },
            { label: "Book", icon: "📘", active: true },
            { label: "Trophy", icon: "🏆", active: false },
            { label: "Students", icon: "👩‍🎓", active: false },
            { label: "Star", icon: "⭐", active: false },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`testimonial-icon ${item.active ? "is-active" : ""}`}
              style={{
                transform: `translateX(${index * 12}px) scale(${item.active ? 1.08 : 0.9})`,
              }}
            >
              <span>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
