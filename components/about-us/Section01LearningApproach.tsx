"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./AboutUsPage.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FlipSheetData {
  id: string;
  pageNumber: string;
  backTag: string;
  backTitle: string;
  backCaption: string;
  nextPhoto: string;
  nextPhotoAlt: string;
  nextLabel: string;
}

/**
 * Six turning sheets reveal 6 distinct verified SAM Universe student photographs
 * alongside the preserved open-cover cutout student (7 real visual spreads total).
 */
const FLIP_SHEETS: FlipSheetData[] = [
  {
    id: "sheet-1",
    pageNumber: "01",
    backTag: "INQUIRY & CURIOSITY",
    backTitle: "Questions Sparking Discovery",
    backCaption:
      "Primary learners actively participating alongside mentors in bright smart-board classrooms.",
    nextPhoto: "/img/about/special-holistic.webp",
    nextPhotoAlt:
      "Primary SAM Universe students raising hands eagerly during an interactive lesson",
    nextLabel: "01 · Classroom Inquiry",
  },
  {
    id: "sheet-2",
    pageNumber: "02",
    backTag: "CREATIVE ATELIER",
    backTitle: "Imagination In Color",
    backCaption:
      "Exploring brushwork, composition, and visual storytelling together in the fine arts studio.",
    nextPhoto: "/img/about/special-creative-arts.webp",
    nextPhotoAlt:
      "SAM Universe students smiling with paintbrushes in the school fine arts studio",
    nextLabel: "02 · Creative Studio",
  },
  {
    id: "sheet-3",
    pageNumber: "03",
    backTag: "SHARED READING",
    backTitle: "Dialogues Beyond Desks",
    backCaption:
      "Friendships built over open pages, collaborative reading, and reflective conversation on campus.",
    nextPhoto: "/img/about/letter-reading.webp",
    nextPhotoAlt:
      "Four SAM Universe girls reading a book together outdoors on campus stone steps",
    nextLabel: "03 · Shared Reading",
  },
  {
    id: "sheet-4",
    pageNumber: "04",
    backTag: "SPORT & PRECISION",
    backTitle: "Focus Under Open Skies",
    backCaption:
      "Archery and outdoor athletics building steady concentration and teamwork across houses.",
    nextPhoto: "/img/about/special-beyond-classroom.webp",
    nextPhotoAlt:
      "SAM Universe students practicing archery outdoors on the green campus lawn",
    nextLabel: "04 · Archery & Focus",
  },
  {
    id: "sheet-5",
    pageNumber: "05",
    backTag: "COURAGE IN STRIDE",
    backTitle: "Confidence In Motion",
    backCaption:
      "On-campus equestrian training nurturing balance, composure, and quiet fearlessness.",
    nextPhoto: "/img/about/letter-equestrian.webp",
    nextPhotoAlt:
      "SAM Universe student riding in protective gear at the campus equestrian arena",
    nextLabel: "05 · Equestrian Spirit",
  },
  {
    id: "sheet-6",
    pageNumber: "06",
    backTag: "EMPATHY & JOY",
    backTitle: "A Sanctuary To Thrive",
    backCaption:
      "Hands-on nature stewardship welcoming curiosity, kindness toward life, and lasting joy.",
    nextPhoto: "/img/about/special-every-child.webp",
    nextPhotoAlt:
      "Smiling SAM Universe students feeding a bright green parrot during nature learning",
    nextLabel: "06 · Empathy & Joy",
  },
];

const PRELOAD_SPREAD_IMAGES = FLIP_SHEETS.map((s) => s.nextPhoto);

export default function Section01LearningApproach() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const pageCounterRef = useRef<HTMLSpanElement | null>(null);
  const cutOutRef = useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setRevealed(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Background preloader so every upcoming student photograph decodes before its flip begins
  useEffect(() => {
    PRELOAD_SPREAD_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      if (typeof img.decode === "function") {
        img.decode().catch(() => {
          // Next/Image handles rendering fallback cleanly
        });
      }
    });
  }, []);

  // GSAP ScrollTrigger Pinned 3D Flipbook Timeline (strictly scroll-driven)
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const sheetEls = gsap.utils.toArray<HTMLElement>(".js-flip-sheet");
      if (sheetEls.length === 0) return;

      const syncSheetZIndices = () => {
        sheetEls.forEach((el, i) => {
          const rotY = Number(gsap.getProperty(el, "rotationY")) || 0;
          el.style.zIndex =
            rotY <= -90 ? String(20 + i) : String(40 - i);
        });
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isMobile: "(max-width: 639px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const cond = context.conditions ?? {};
          const isReduced = Boolean(cond.reduceMotion);
          const isMobile = Boolean(cond.isMobile);
          const isTablet = Boolean(cond.isTablet);

          // Resting right stack: strictly positive/zero angles keep sheet[0] cleanly in front with zero 3D Z-intersection
          sheetEls.forEach((el, i) => {
            gsap.set(el, {
              rotationY: i * 0.12,
              z: (sheetEls.length - i) * 2.5,
              skewY: 0,
            });
          });
          syncSheetZIndices();

          if (cutOutRef.current) {
            gsap.set(cutOutRef.current, { autoAlpha: 1, y: 0, scale: 1 });
          }

          const totalFlips = sheetEls.length;
          const scrollSpan = isMobile ? "+=1400" : isTablet ? "+=1700" : "+=2050";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: scrollSpan,
              pin: true,
              pinSpacing: true,
              scrub: isReduced ? 0.25 : 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                syncSheetZIndices();
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
                }
                if (pageCounterRef.current) {
                  const activeStep = Math.min(
                    totalFlips,
                    Math.round(self.progress * totalFlips),
                  );
                  const displayNum = String(activeStep + 1).padStart(2, "0");
                  pageCounterRef.current.textContent = `PAGE ${displayNum} / 07`;
                }
              },
            },
          });

          // Initial open beat + smoothly hide cutout student before Page 1 turns onto left stack
          tl.to({}, { duration: 0.14 }, 0);

          if (cutOutRef.current) {
            tl.fromTo(
              cutOutRef.current,
              { autoAlpha: 1, y: 0, scale: 1 },
              {
                autoAlpha: 0,
                y: 12,
                scale: 0.96,
                duration: 0.36,
                ease: "power2.inOut",
              },
              0.1,
            );
          }

          // Sequential 3D page turns on scroll (each turned sheet lands cleanly on top of the left stack)
          sheetEls.forEach((sheet, idx) => {
            const startTime = 0.14 + idx * 1.0;
            const targetLandAngle = -(179.5 - idx * 0.35);
            const targetLandZ = 2 + idx * 3;
            const glareEl = sheet.querySelector<HTMLElement>(".js-flip-glare");

            tl.to(
              sheet,
              {
                rotationY: -90,
                skewY: isReduced ? 0 : -1.8,
                z: 24 + idx * 2,
                duration: 0.45,
                ease: "power1.in",
              },
              startTime,
            ).to(
              sheet,
              {
                rotationY: targetLandAngle,
                skewY: 0,
                z: targetLandZ,
                duration: 0.45,
                ease: "power1.out",
              },
              startTime + 0.45,
            );

            if (glareEl && !isReduced) {
              tl.fromTo(
                glareEl,
                { opacity: 0 },
                { opacity: 0.72, duration: 0.38, ease: "sine.inOut" },
                startTime + 0.06,
              ).to(
                glareEl,
                { opacity: 0, duration: 0.38, ease: "sine.inOut" },
                startTime + 0.46,
              );
            }
          });

          // Brief final spread pause before smoothly releasing pin into Section 02
          tl.to({}, { duration: 0.26 });
        },
      );

      const rafId = window.requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="learning-approach"
      aria-labelledby="section01-heading"
      className={`${styles.section01} ${revealed ? styles.isVisible : ""} relative min-h-[100svh] flex flex-col justify-center pt-[84px] sm:pt-[90px] pb-12 sm:pb-14`}
    >
      {/* Textured deep teal backdrop + rough brush texture */}
      <div className={styles.tealTextureOverlay} aria-hidden="true" />
      <svg
        className={styles.roughBrushLayer}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-80 120 Q 320 40, 740 160 T 1520 90 L 1520 340 Q 1080 260, 620 380 T -80 310 Z"
          fill="#033A42"
        />
        <path
          d="M-60 660 Q 420 570, 920 680 T 1520 600 L 1520 900 L -60 900 Z"
          fill="#022E35"
        />
      </svg>

      {/* Subtle ambient teal/yellow radial depth */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[min(92vw,880px)] h-[420px] rounded-full bg-[#14b8c8]/20 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl pl-14 pr-5 sm:px-16 lg:px-20">
        {/* ===============================================================
            TOP EDITORIAL TYPOGRAPHY LOCKUP (Reference Screenshot Preserved)
        =============================================================== */}
        <header className="flex flex-col items-center text-center">
          <h1 id="section01-heading" className="sr-only">
            OUR APPROACH FOCUSES ON LEARNING
          </h1>

          <div
            aria-hidden="true"
            className="flex flex-col items-center select-none"
          >
            {/* Row 1: "Our / approach" tucked left of oversized "Focuses" */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4">
              <div className="flex flex-col items-end text-right leading-[1.02] text-white/95 font-semibold text-sm sm:text-lg md:text-xl tracking-tight">
                <span className={styles.wordClip}>
                  <span
                    className={styles.wordInner}
                    style={{ transitionDelay: "40ms" }}
                  >
                    Our
                  </span>
                </span>
                <span className={styles.wordClip}>
                  <span
                    className={styles.wordInner}
                    style={{ transitionDelay: "110ms" }}
                  >
                    approach
                  </span>
                </span>
              </div>

              <span
                className={styles.wordClip}
                style={{ fontFamily: "var(--font-about-rounded), sans-serif" }}
              >
                <span
                  className={`${styles.wordInner} text-[#FFFFFF] font-bold text-[clamp(2.25rem,5.4vw,4.35rem)] leading-[0.94] tracking-[-0.02em] drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)]`}
                  style={{ transitionDelay: "180ms" }}
                >
                  Focuses
                </span>
              </span>
            </div>

            {/* Row 2: "on" tucked beside oversized yellow "learning" + Lightbulb */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 -mt-1">
              <span className={`${styles.wordClip} self-start mt-1.5 sm:mt-2`}>
                <span
                  className={`${styles.wordInner} text-white/95 font-semibold text-sm sm:text-lg md:text-xl tracking-tight`}
                  style={{ transitionDelay: "260ms" }}
                >
                  on
                </span>
              </span>

              <span
                className={styles.wordClip}
                style={{ fontFamily: "var(--font-about-rounded), sans-serif" }}
              >
                <span
                  className={`${styles.wordInner} text-[#FFE033] font-bold text-[clamp(2.5rem,6vw,4.7rem)] leading-[0.95] tracking-[-0.02em] drop-shadow-[0_6px_20px_rgba(0,0,0,0.3)]`}
                  style={{ transitionDelay: "340ms" }}
                >
                  learning
                </span>
              </span>

              {/* Hand-drawn lightbulb illustration */}
              <div
                className={`${styles.revealBlock} ${styles.bulbGlow} ml-1 sm:ml-2 mt-0.5 shrink-0`}
                style={{ transitionDelay: "420ms" }}
              >
                <svg
                  viewBox="0 0 64 78"
                  className="w-8 h-10 sm:w-10 sm:h-12 md:w-11 md:h-13"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M32 3V9M11 13L15 17M53 13L49 17M5 32H11M53 32H59"
                    stroke="#FFE033"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 14C21.5 14 13 22.3 13 32.6C13 39.2 16.5 44.8 21.6 48.3C22.9 49.2 23.8 50.6 24 52.2L24.4 56H39.6L40 52.2C40.2 50.6 41.1 49.2 42.4 48.3C47.5 44.8 51 39.2 51 32.6C51 22.3 42.5 14 32 14Z"
                    fill="#9EEAF0"
                    stroke="#0B0E11"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 26C22.2 21.8 26 19 30.2 18.6"
                    stroke="#FFFFFF"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M27.5 55V42L24.5 34.5C26.5 33 28.5 36.5 30.2 34.5C31.8 32.8 33.8 36.5 35.5 34.5L36.5 34.5L34.5 42V55"
                    stroke="#0B0E11"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="24"
                    y="56"
                    width="16"
                    height="5"
                    rx="2"
                    fill="#FFE033"
                    stroke="#0B0E11"
                    strokeWidth="2.4"
                  />
                  <rect
                    x="25.5"
                    y="61.5"
                    width="13"
                    height="4.5"
                    rx="2"
                    fill="#FFE033"
                    stroke="#0B0E11"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M28.5 66.5H35.5C35.2 69.5 33.8 71 32 71C30.2 71 28.8 69.5 28.5 66.5Z"
                    fill="#0B0E11"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2
            className={`${styles.revealBlock} mt-1.5 sm:mt-2 text-base sm:text-xl md:text-2xl font-bold text-[#FFE033] tracking-tight`}
            style={{ transitionDelay: "380ms" }}
          >
            Learning Beyond Classrooms
          </h2>

          <p
            className={`${styles.revealBlock} mt-1 max-w-[60ch] text-xs sm:text-sm leading-[1.5] text-white/90 font-normal`}
            style={{ transitionDelay: "460ms" }}
          >
            At SAM Universe, we believe education is more than textbooks and
            examinations. We encourage curiosity, creativity, confidence and
            practical learning experiences that prepare students for a
            successful future.
          </p>
        </header>

        {/* ===============================================================
            CENTERPIECE: INTERACTIVE SCROLL-DRIVEN 3D FLIPBOOK
        =============================================================== */}
        <div className="relative mt-4 sm:mt-5 flex flex-col items-center">
          {/* Ambient decorative sparkles flanking the open book */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 left-[3%] sm:left-[6%] hidden sm:block"
          >
            <div className={styles.doodleFloat}>
              <svg viewBox="0 0 60 60" className="w-9 h-9 text-[#FFE033]" fill="none">
                <path
                  d="M30 8L33.5 22.5L48 26L33.5 29.5L30 44L26.5 29.5L12 26L26.5 22.5Z"
                  fill="currentColor"
                  fillOpacity="0.88"
                />
              </svg>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 right-[4%] sm:right-[7%] hidden sm:block"
          >
            <div className={styles.doodleFloatAlt}>
              <svg viewBox="0 0 72 48" className="w-12 h-9" fill="none">
                <path
                  d="M8 38C8 22.5 20.5 10 36 10C51.5 10 64 22.5 64 38H8Z"
                  stroke="#FFE033"
                  strokeWidth="2.8"
                  fill="#033F47"
                  fillOpacity="0.65"
                />
                <path
                  d="M20 38C20 29.2 27.2 22 36 22C44.8 22 52 29.2 52 38"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
          </div>

          {/* Balanced 2-Page 3D Flipbook Spread */}
          <div className={styles.bookStage}>
            <div
              className={`${styles.bookSpread3D} relative grid grid-cols-2 items-stretch aspect-[2/1.28] sm:aspect-[2/1.15]`}
            >
              {/* LEFT BOOK HARDCOVER BASE (Initial cutout student + doodles) */}
              <div className={`${styles.bookLeftFrame} overflow-visible`}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Doodle 1: Open mini book */}
                  <div className={`absolute top-[7%] left-[6%] w-[18%] ${styles.doodleFloat}`}>
                    <svg viewBox="0 0 80 68" className="w-full h-auto drop-shadow-md" fill="none">
                      <path
                        d="M8 14C20 10 32 13 40 20C48 13 60 10 72 14V54C60 50 48 52 40 58C32 52 20 50 8 54V14Z"
                        fill="#FFFFFF"
                        stroke="#0B0E11"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path d="M40 20V58" stroke="#0B0E11" strokeWidth="2.8" />
                      <path
                        d="M15 24C23 22 30 23 35 26M15 32C23 30 30 31 35 34M15 40C23 38 30 39 35 42"
                        stroke="#087A87"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M45 26C50 23 57 22 65 24M45 34C50 31 57 30 65 32M45 42C50 39 57 38 65 40"
                        stroke="#087A87"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Doodle 2: Science flask */}
                  <div className={`absolute bottom-[5%] left-[5%] w-[16%] ${styles.doodleFloatAlt}`}>
                    <svg viewBox="0 0 70 86" className="w-full h-auto drop-shadow-md" fill="none">
                      <path
                        d="M24 12H46M27 12V32L11 66C8.5 71 12.2 77 18 77H52C57.8 77 61.5 71 59 66L43 32V12"
                        fill="#FFFFFF"
                        stroke="#0B0E11"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 56L13 65C11.4 68.5 14 73 18 73H52C56 73 58.6 68.5 57 65L53 56C47 59 41 53 35 56C29 59 23 54 17 56Z"
                        fill="#FFE033"
                      />
                    </svg>
                  </div>

                  {/* Doodle 3: Pencil */}
                  <div className={`absolute top-[42%] right-[3%] w-[13%] rotate-[-26deg] ${styles.doodleFloat}`}>
                    <svg viewBox="0 0 42 110" className="w-full h-auto drop-shadow-md" fill="none">
                      <path d="M21 6L33 28H9L21 6Z" fill="#FAD7A0" stroke="#0B0E11" strokeWidth="2.8" />
                      <path d="M21 6L25 14H17L21 6Z" fill="#0B0E11" />
                      <rect x="9" y="28" width="24" height="62" fill="#FFE033" stroke="#0B0E11" strokeWidth="2.8" />
                      <rect x="9" y="90" width="24" height="10" fill="#E53935" stroke="#0B0E11" strokeWidth="2.8" />
                    </svg>
                  </div>
                </div>

                {/* Initial Open-Cover Student Cutout */}
                <div
                  ref={cutOutRef}
                  className={`${styles.bookStudentReveal} absolute inset-x-0 bottom-0 top-[-14%] flex items-end justify-center pointer-events-none z-10`}
                >
                  <div className="relative w-full h-full flex items-end justify-center">
                    <Image
                      src="/img/about/student-book-hero.png"
                      alt="Smiling SAM Universe student in yellow uniform showing painted colorful hands"
                      width={1100}
                      height={654}
                      loading="eager"
                      fetchPriority="high"
                      className="w-[100%] h-auto max-h-full object-contain object-bottom drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                </div>
              </div>

              {/* Center 3D Spine Crease Shadow */}
              <div className={styles.bookSpineSeam} aria-hidden="true" />

              {/* RIGHT BOOK STACK & 6 TURNABLE 3D PAPER SHEETS */}
              <div className={styles.bookRightBase}>
                {/* FINAL REVEALED BASE SPREAD (Visible underneath after Sheet 6 flips!) */}
                <div className="relative h-full w-full p-2 sm:p-3 flex flex-col justify-between bg-[#FBF9F5]">
                  <div className="relative flex-1 w-full overflow-hidden rounded-sm border border-[#055E68]/20">
                    <Image
                      src={FLIP_SHEETS[FLIP_SHEETS.length - 1].nextPhoto}
                      alt={FLIP_SHEETS[FLIP_SHEETS.length - 1].nextPhotoAlt}
                      fill
                      sizes="(max-width: 640px) 44vw, 360px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-center justify-between px-0.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#055E68]">
                    <span className="truncate">
                      {FLIP_SHEETS[FLIP_SHEETS.length - 1].nextLabel}
                    </span>
                    <span className="bg-[#FFE033] text-[#111315] px-1.5 py-0.5 rounded text-[8px] sm:text-[10px]">
                      FINAL
                    </span>
                  </div>
                </div>

                {/* 6 INDIVIDUAL 3D TURNING SHEETS */}
                {FLIP_SHEETS.map((sheet, idx) => {
                  const isFirstSheet = idx === 0;
                  const prevPhotoSheet = idx > 0 ? FLIP_SHEETS[idx - 1] : null;

                  return (
                    <div
                      key={sheet.id}
                      className={`${styles.flipSheet} js-flip-sheet`}
                    >
                      {/* FRONT FACE (Visible on Right Stack before this leaf flips) */}
                      <div className={styles.flipFaceFront}>
                        {isFirstSheet ? (
                          /* Initial Sheet 0 Front: Preserves classic crisp white folded right sheet aesthetics */
                          <div className="relative h-full w-full flex flex-col justify-between p-3 sm:p-5 bg-gradient-to-r from-[#E6F1F3] via-[#FFFFFF] to-[#FFFFFF]">
                            <div className="flex items-center justify-between">
                              <span className="inline-block bg-[#FFE033] text-[#111315] px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.16em]">
                                SAM UNIVERSE
                              </span>
                              <span className="text-[9px] sm:text-[11px] font-bold text-[#055E68] font-mono">
                                PAGE 01
                              </span>
                            </div>

                            <div className="my-auto flex flex-col gap-2 sm:gap-3 py-2">
                              <p
                                className="text-sm sm:text-xl font-black text-[#033F47] leading-tight"
                                style={{
                                  fontFamily: "var(--font-about-rounded), sans-serif",
                                }}
                              >
                                Moments Inside Campus Life
                              </p>
                              <div className="flex flex-col gap-2 opacity-30">
                                <span className="h-[2px] w-11/12 bg-[#055E68] rounded-full" />
                                <span className="h-[2px] w-9/12 bg-[#055E68] rounded-full" />
                                <span className="h-[2px] w-10/12 bg-[#055E68] rounded-full" />
                                <span className="hidden sm:block h-[2px] w-7/12 bg-[#055E68] rounded-full" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#055E68]/15 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#055E68]">
                              <span>Scroll to flip pages →</span>
                              <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-[#FFE033]" />
                                <span className="w-2 h-2 rounded-full bg-[#055E68]" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Sheet 1..5 Front: Real SAM Universe Student Photograph */
                          <div className="relative h-full w-full p-2 sm:p-3 flex flex-col justify-between bg-[#FBF9F5]">
                            <div className="relative flex-1 w-full overflow-hidden rounded-sm border border-[#055E68]/20 bg-[#044a53]">
                              <Image
                                src={prevPhotoSheet!.nextPhoto}
                                alt={prevPhotoSheet!.nextPhotoAlt}
                                fill
                                loading={idx <= 2 ? "eager" : "lazy"}
                                sizes="(max-width: 640px) 44vw, 360px"
                                className="object-cover"
                              />
                            </div>
                            <div className="mt-1.5 sm:mt-2 flex items-center justify-between px-0.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-[#055E68]">
                              <span className="truncate">
                                {prevPhotoSheet!.nextLabel}
                              </span>
                              <span className="font-mono text-[#033F47]/70">
                                {sheet.pageNumber}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className={`${styles.flipCurlShade} js-flip-glare`} />
                      </div>

                      {/* BACK FACE (Lands upright facing viewer on the Left Half when turned!) */}
                      <div className={styles.flipFaceBack}>
                        <div className="relative h-full w-full flex flex-col justify-between p-3 sm:p-6 bg-[#FFFFFF]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-block bg-[#FFE033] text-[#111315] px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] truncate">
                              {sheet.backTag}
                            </span>
                            <span className="text-[10px] sm:text-xs font-black font-mono text-[#055E68]">
                              {sheet.pageNumber}
                            </span>
                          </div>

                          <div className="my-auto py-1">
                            <h3
                              className="text-sm sm:text-2xl font-black text-[#033F47] leading-tight"
                              style={{
                                fontFamily: "var(--font-about-rounded), sans-serif",
                              }}
                            >
                              {sheet.backTitle}
                            </h3>
                            <p className="mt-1.5 sm:mt-2.5 text-[10px] sm:text-sm leading-snug sm:leading-relaxed text-[#2B3036]">
                              {sheet.backCaption}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#055E68]/15 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#055E68]/80">
                            <span>SAM Universe</span>
                            <span className="hidden sm:inline">Madurai Campus</span>
                          </div>
                        </div>
                        <div className={`${styles.flipCurlShade} js-flip-glare`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Book Flip Progress Bar & Page Counter (strictly scroll-driven) */}
          <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/90">
            <span
              ref={pageCounterRef}
              className="rounded-full bg-[#033F47]/90 border border-[#FFE033]/55 px-3.5 py-1 text-[10px] sm:text-[11px] font-mono text-[#FFE033]"
            >
              PAGE 01 / 07
            </span>

            <div
              className="w-32 sm:w-44 h-1.5 rounded-full bg-white/20 overflow-hidden"
              aria-hidden="true"
            >
              <div
                ref={progressBarRef}
                className="h-full w-full bg-[#FFE033] origin-left scale-x-0"
              />
            </div>

            <span className="text-[10px] font-semibold tracking-[0.14em] text-white/75">
              SCROLL TO FLIP
            </span>
          </div>
        </div>
      </div>

      {/* Organic angled brush transition into Section 02 (Obsidian Charcoal) */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 sm:h-16 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0 52 L240 28 L490 60 L780 18 L1090 54 L1320 26 L1440 44 L1440 90 L0 90 Z"
            fill="#0A0D0F"
          />
          <path
            d="M0 52 L240 28 L490 60 L780 18 L1090 54 L1320 26 L1440 44"
            stroke="#FFE033"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
}
