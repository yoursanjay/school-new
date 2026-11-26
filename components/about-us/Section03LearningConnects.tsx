"use client";

import React from "react";
import Image from "next/image";
import styles from "./AboutUsPage.module.css";
import { useBidirectionalReveal, useScrollProgressVar } from "./useScrollMotion";

const COLLAGE_PHOTOS = [
  {
    src: "/img/about/collage-child-flowers-bw.webp",
    alt: "Young SAM Universe student smiling warmly with handmade paper flowers",
    outerClip: "polygon(3% 2%, 97% 6%, 99% 94%, 1% 98%)",
    innerClip: "polygon(5% 4%, 95% 8%, 97% 92%, 3% 95%)",
    rotation: "-3deg",
    parallax: -24,
    delay: 80,
    zIndex: 30,
  },
  {
    src: "/img/about/collage-students-reading-bw.webp",
    alt: "Four SAM Universe students reading together on campus courtyard steps",
    outerClip: "polygon(1% 5%, 99% 1%, 96% 97%, 3% 93%)",
    innerClip: "polygon(3% 7%, 97% 3%, 94% 94%, 5% 91%)",
    rotation: "2.5deg",
    parallax: 16,
    delay: 240,
    zIndex: 20,
  },
  {
    src: "/img/about/collage-classroom-hands-bw.webp",
    alt: "SAM Universe students raising hands enthusiastically in an interactive classroom",
    outerClip: "polygon(2% 3%, 98% 8%, 95% 96%, 0% 92%)",
    innerClip: "polygon(4% 5%, 96% 10%, 93% 93%, 2% 90%)",
    rotation: "-2deg",
    parallax: 28,
    delay: 400,
    zIndex: 10,
  },
] as const;

export default function Section03LearningConnects() {
  const { ref: revealRef, isVisible } = useBidirectionalReveal<HTMLDivElement>(0.12);
  const { ref: scrollRef } = useScrollProgressVar<HTMLElement>();

  return (
    <section
      ref={scrollRef}
      id="learning-connects"
      aria-labelledby="section03-heading"
      className={`${styles.section03} ${isVisible ? styles.isVisible : ""} relative py-20 sm:py-28 lg:py-32`}
    >
      {/* Textured Teal Surface + Rough Diagonal Brush Texture (Reference 3 primary theme) */}
      <div className={styles.tealTextureOverlay} aria-hidden="true" />
      <svg
        className={styles.roughBrushLayer}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-120 740 L 1480 40 L 1540 240 L -60 920 Z"
          fill="#033F47"
        />
        <path
          d="M180 -60 L 1560 520 L 1460 720 L 80 120 Z"
          fill="#02343B"
          opacity="0.65"
        />
      </svg>

      <div
        ref={revealRef}
        className="relative z-10 mx-auto max-w-7xl pl-14 pr-5 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ===============================================================
              LEFT SIDE: ASYMMETRIC LAYERED B&W STUDENT PHOTOS + YELLOW CUTOUT BORDERS
          =============================================================== */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative mx-auto max-w-[490px] sm:max-w-[540px] flex flex-col">
              {COLLAGE_PHOTOS.map((item, idx) => (
                <div
                  key={item.src}
                  className={`${styles.collageCutoutFrame} ${
                    idx === 0
                      ? "w-[82%] sm:w-[78%] self-start"
                      : idx === 1
                      ? "w-[88%] sm:w-[84%] self-end -mt-8 sm:-mt-12"
                      : "w-[86%] sm:w-[82%] self-start -mt-8 sm:-mt-12"
                  }`}
                  style={{
                    zIndex: item.zIndex,
                    transitionDelay: `${item.delay}ms`,
                    clipPath: "none",
                    transform: isVisible
                      ? `translate3d(0, calc((var(--scroll-p, 0.5) - 0.5) * ${item.parallax}px), 0) rotate(${item.rotation})`
                      : undefined,
                  }}
                >
                  {/* Outer bright yellow scissor-cut paper border */}
                  <div
                    className="p-[9px] sm:p-[11px] bg-[#FFE033] shadow-[0_20px_40px_rgba(0,0,0,0.42)]"
                    style={{ clipPath: item.outerClip }}
                  >
                    {/* Monochrome black-and-white photograph inside */}
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden bg-[#111315]"
                      style={{ clipPath: item.innerClip }}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, 460px"
                        className={`${styles.collagePhotoImg} object-cover`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===============================================================
              RIGHT SIDE: BOLD WHITE EDITORIAL TYPE + YELLOW BRUSH HIGHLIGHT STRIPS
          =============================================================== */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <h2 id="section03-heading" className="sr-only">
              A PLACE WHERE LEARNING CONNECTS WITH LIFE
            </h2>

            {/* Reference 3 exact 4-tier typographic rhythm */}
            <div
              aria-hidden="true"
              className="flex flex-col items-start select-none"
            >
              {/* Strip 1: Yellow highlight ribbon "A PLACE WHERE" */}
              <div
                className={`${styles.yellowHighlightStrip} px-4 sm:px-6 py-1.5 sm:py-2 -rotate-2 mb-3`}
                style={{
                  clipPath: isVisible
                    ? "polygon(1% 4%, 99% 0%, 98% 96%, 0% 100%)"
                    : "inset(0 100% 0 0)",
                  transitionDelay: "60ms",
                }}
              >
                <span
                  className="block font-black uppercase text-xl sm:text-2xl md:text-3xl tracking-wide leading-none text-[#0B0E11]"
                  style={{
                    fontFamily:
                      "var(--font-about-condensed), 'Barlow Condensed', sans-serif",
                  }}
                >
                  A PLACE WHERE
                </span>
              </div>

              {/* Giant Condensed Italic White: "LEARNING" + overlapping script "connects" */}
              <div className="relative flex flex-wrap items-baseline">
                <span className={styles.wordClip}>
                  <span
                    className={`${styles.wordInner} italic font-black uppercase text-white text-[clamp(3.6rem,8.4vw,6.4rem)] leading-[0.86] tracking-[-0.015em] drop-shadow-[0_10px_22px_rgba(0,0,0,0.34)] pr-2`}
                    style={{
                      fontFamily:
                        "var(--font-about-condensed), 'Barlow Condensed', sans-serif",
                      transitionDelay: "180ms",
                    }}
                  >
                    LEARNING
                  </span>
                </span>

                <span
                  className={`${styles.revealBlock} text-[#FFE033] text-[clamp(2.6rem,5.4vw,4.3rem)] leading-none -ml-4 sm:-ml-8 -rotate-6 drop-shadow-[0_6px_14px_rgba(0,0,0,0.4)] z-10`}
                  style={{
                    fontFamily: "var(--font-about-script), Caveat, cursive",
                    transitionDelay: "300ms",
                  }}
                >
                  connects
                </span>
              </div>

              {/* Strip 2: Yellow highlight ribbon "WITH LIFE" */}
              <div
                className={`${styles.yellowHighlightStrip} px-5 sm:px-7 py-2 sm:py-2.5 -rotate-2 mt-3`}
                style={{
                  clipPath: isVisible
                    ? "polygon(0% 6%, 100% 0%, 98% 95%, 1% 100%)"
                    : "inset(0 100% 0 0)",
                  transitionDelay: "360ms",
                }}
              >
                <span
                  className="block font-black uppercase text-2xl sm:text-3xl md:text-4xl tracking-wider leading-none text-[#0B0E11]"
                  style={{
                    fontFamily:
                      "var(--font-about-condensed), 'Barlow Condensed', sans-serif",
                  }}
                >
                  WITH LIFE
                </span>
              </div>
            </div>

            {/* Supporting content */}
            <h3
              className={`${styles.revealBlock} mt-7 sm:mt-8 text-xl sm:text-2xl md:text-[28px] font-bold text-[#FFE033] tracking-tight leading-snug`}
              style={{ transitionDelay: "420ms" }}
            >
              Where Learning Becomes a Lifelong Experience.
            </h3>

            {/* Description */}
            <p
              className={`${styles.revealBlock} mt-3 max-w-[56ch] text-base sm:text-[17px] leading-[1.72] text-white/95 font-normal`}
              style={{ transitionDelay: "500ms" }}
            >
              At SAM Universe, students learn through meaningful experiences,
              friendships, exploration and real-world connections. We create an
              environment where every child feels encouraged to discover their
              strengths and achieve their potential.
            </p>
          </div>
        </div>
      </div>

      {/* Organic transition from Deep Teal into Bright Yellow (Section 04) */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-16 sm:h-24 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0 58 Q 360 8, 720 48 T 1440 34 L 1440 100 L 0 100 Z"
            fill="#FFE23D"
          />
        </svg>
      </div>
    </section>
  );
}
