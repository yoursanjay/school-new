"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import AboutContent from "./about/AboutContent";
import AboutImageCarousel from "./AboutImageCarousel";
import AboutFeatureCards from "./about/AboutFeatureCards";
import AboutStats from "./AboutStats";

export default function AboutSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Subtle Parallax offsets (strictly active ONLY while About section is in view)
  const [imageParallaxY, setImageParallaxY] = useState(0);
  const [characterParallaxY, setCharacterParallaxY] = useState(0);
  const [statsParallaxY, setStatsParallaxY] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const isIntersectingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // IntersectionObserver: trigger scroll reveal once, track visibility for parallax
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Safety fallback
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 1200);

    if (typeof IntersectionObserver === "undefined") {
      setIsRevealed(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          clearTimeout(fallbackTimer);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "40px 0px 40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(el);
    };
  }, []);

  // Subtle Scroll Parallax (active ONLY while About section is in view)
  const updateParallax = useCallback(() => {
    if (prefersReducedMotion || !isIntersectingRef.current) {
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Relative progression through the viewport: -1 (entering bottom) to 1 (leaving top)
    const centerOffset =
      (rect.top + rect.height / 2 - windowH / 2) /
      (windowH / 2 + rect.height / 2);
    const clampedRatio = Math.max(-1, Math.min(1, centerOffset));

    // Invert so scrolling down moves elements gently upward
    const scrollFactor = -clampedRatio;

    // Main Image: max ±20px, Character: max ±35px, Statistics: max ±10px
    setImageParallaxY(Math.round(scrollFactor * 20));
    setCharacterParallaxY(Math.round(scrollFactor * 35));
    setStatsParallaxY(Math.round(scrollFactor * 10));
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        updateParallax();
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateParallax, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative z-20 w-full overflow-hidden text-[#0B1B33]"
      style={{
        backgroundColor: "#FAF7F2", // Warm ivory background
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "120px",
        borderTop: "1px solid rgba(201, 150, 46, 0.2)",
      }}
    >
      {/* Scoped CSS animations for About Section */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes kenBurnsSubtle {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }
        @keyframes studentFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }
        @keyframes experienceCardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-student-float {
          animation: studentFloat 4s ease-in-out infinite;
        }
        .animate-experience-card-float {
          animation: experienceCardFloat 3.5s ease-in-out infinite;
        }
      `,
        }}
      />

      {/* ========================================================
          PREMIUM BACKGROUND DETAILS (Behind content, opacity 0.08–0.15)
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Large blurred gold circle */}
        <div
          className="absolute -top-24 right-10 w-[520px] h-[520px] rounded-full filter blur-[120px]"
          style={{
            backgroundColor: "#C9962E",
            opacity: 0.12,
          }}
        />

        {/* Small navy circle */}
        <div
          className="absolute bottom-16 -left-20 w-[420px] h-[420px] rounded-full filter blur-[110px]"
          style={{
            backgroundColor: "#0B1B33",
            opacity: 0.09,
          }}
        />

        {/* Soft center gradient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full filter blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201, 150, 46, 0.14) 0%, transparent 70%)",
            opacity: 0.12,
          }}
        />

        {/* Thin curved decorative line */}
        <svg
          className="absolute top-1/4 right-0 w-[600px] h-[400px] opacity-[0.08]"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 350C200 320 350 200 550 50"
            stroke="#C9962E"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="350"
            cy="200"
            r="140"
            stroke="#0B1B33"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      {/* ========================================================
          MAIN CENTERED CONTAINER (max-width: 1280px; margin: auto; padding: 0 32px)
          ======================================================== */}
      <div
        className="w-full relative z-10 box-border"
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        {/* ========================================================
            TOP ROW: Two-column layout (LEFT: Content ~50%, RIGHT: Visual ~50%)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Eyebrow, Heading, Paragraphs, Buttons */}
          <AboutContent
            isRevealed={isRevealed}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Right Column: Interactive Visual, Ken Burns, Carousel, 3D Student Character */}
          <AboutImageCarousel
            isRevealed={isRevealed}
            prefersReducedMotion={prefersReducedMotion}
            imageParallaxY={imageParallaxY}
            characterParallaxY={characterParallaxY}
          />
        </div>

        {/* ========================================================
            HIGHLIGHT CARDS: Holistic Growth, Global Outlook, Values Rooted
            ======================================================== */}
        <AboutFeatureCards
          isRevealed={isRevealed}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* ========================================================
            ANIMATED STATISTICS: 25+ Years, 1000+ Students, 50+ Faculty, 20+ Activities
            ======================================================== */}
        <AboutStats
          isRevealed={isRevealed}
          prefersReducedMotion={prefersReducedMotion}
          statsParallaxY={statsParallaxY}
        />
      </div>
    </section>
  );
}
