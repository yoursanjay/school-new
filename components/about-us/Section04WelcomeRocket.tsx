"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import styles from "./AboutUsPage.module.css";
import {
  useBidirectionalReveal,
  useMagneticHover,
  useScrollProgressVar,
} from "./useScrollMotion";

interface Section04WelcomeRocketProps {
  onMeetTeachers: () => void;
}

export default function Section04WelcomeRocket({
  onMeetTeachers,
}: Section04WelcomeRocketProps) {
  const { ref: revealRef, isVisible } = useBidirectionalReveal<HTMLDivElement>(0.12);
  const { ref: scrollRef } = useScrollProgressVar<HTMLElement>();
  const exploreMagnetic = useMagneticHover<HTMLAnchorElement>(10);
  const teachersMagnetic = useMagneticHover<HTMLButtonElement>(10);

  return (
    <section
      ref={scrollRef}
      id="welcome-to-sam"
      aria-labelledby="section04-heading"
      className={`${styles.section04} ${isVisible ? styles.isVisible : ""} relative pt-14 sm:pt-20 pb-20 sm:pb-24`}
    >
      <div
        ref={revealRef}
        className="relative z-10 mx-auto max-w-5xl pl-14 pr-5 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-12 flex flex-col items-center text-center"
      >
        {/* ===============================================================
            FLOATING EDUCATIONAL DOODLES (Reference 4 Motifs)
        =============================================================== */}
        {/* Top-left: Hand-drawn Ringed Planet (Saturn) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 sm:top-8 left-4 sm:left-14 lg:left-24"
          style={{
            transform:
              "translate3d(0, calc((0.5 - var(--scroll-p, 0.5)) * 42px), 0)",
          }}
        >
          <div className={styles.doodleFloat}>
            <svg viewBox="0 0 120 90" className="w-20 h-16 sm:w-28 sm:h-22" fill="none">
              <circle
                cx="60"
                cy="45"
                r="26"
                fill="#FFD400"
                stroke="#111315"
                strokeWidth="3.5"
              />
              <ellipse
                cx="60"
                cy="45"
                rx="52"
                ry="12"
                transform="rotate(-18 60 45)"
                stroke="#111315"
                strokeWidth="3.5"
              />
            </svg>
          </div>
        </div>

        {/* Top-right: 4-point sparkle star & tiny ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 right-6 sm:right-20"
          style={{
            transform:
              "translate3d(0, calc((var(--scroll-p, 0.5) - 0.5) * 32px), 0)",
          }}
        >
          <div className={styles.doodleFloatAlt}>
            <svg viewBox="0 0 80 48" className="w-16 h-10 sm:w-20 sm:h-12" fill="none">
              <path
                d="M18 10V26M10 18H26"
                stroke="#111315"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="62" cy="30" r="3" fill="#111315" />
            </svg>
          </div>
        </div>

        {/* Mid-right: 4x9 Black Dot Matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[34%] right-4 sm:right-14 hidden sm:block"
          style={{
            transform:
              "translate3d(0, calc((0.5 - var(--scroll-p, 0.5)) * 28px), 0)",
          }}
        >
          <div className="grid grid-cols-9 gap-2">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#111315]"
              />
            ))}
          </div>
        </div>

        {/* Mid-left: Tiny circle & sunburst doodle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[40%] left-4 sm:left-16 hidden sm:block"
          style={{
            transform:
              "translate3d(0, calc((var(--scroll-p, 0.5) - 0.5) * 26px), 0)",
          }}
        >
          <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
            <circle cx="14" cy="18" r="3.5" stroke="#111315" strokeWidth="2.2" />
            <g stroke="#111315" strokeWidth="2.2" strokeLinecap="round">
              <path d="M36 28V33M36 43V48M28.5 38H23.5M48.5 38H43.5M30.5 32.5L27 29M45 47L41.5 43.5M41.5 32.5L45 29M27 47L30.5 43.5" />
            </g>
          </svg>
        </div>

        {/* ===============================================================
            CENTERPIECE: PENCIL ROCKET + BILLOWING SMOKE CLOUD (Reference 4)
        =============================================================== */}
        <div className="relative w-full max-w-[500px] mx-auto pt-2">
          {/* Launching Pencil Rocket (scrolls upward dynamically) */}
          <div className={`${styles.rocketThrustWrap} relative z-20 mx-auto w-[150px] sm:w-[185px]`}>
            <svg
              viewBox="0 0 220 340"
              className="w-full h-auto drop-shadow-[0_18px_22px_rgba(0,0,0,0.18)]"
              fill="none"
              role="img"
              aria-label="Creative red and black pencil rocket launching upward"
            >
              {/* Hand-drawn Black Rocket Silhouette & Fins behind the pencil */}
              <path
                d="M110 12 C 148 48, 152 130, 148 258 L 178 288 C 178 288, 174 238, 148 214"
                stroke="#111315"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#FFE23D"
                fillOpacity="0.4"
              />
              <path
                d="M110 12 C 72 48, 68 130, 72 258 L 42 288 C 42 288, 46 238, 72 214"
                stroke="#111315"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#FFE23D"
                fillOpacity="0.4"
              />
              {/* Rocket base connectors into exhaust stem */}
              <path
                d="M84 260V296M136 260V296"
                stroke="#111315"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Red & Black Faceted Wooden Pencil inside the Rocket Frame */}
              {/* Sharpened wood cone */}
              <path d="M110 34 L 136 86 L 84 86 Z" fill="#F1C99B" />
              <path d="M110 34 L 118 86 L 102 86 Z" fill="#F8D8B5" />
              {/* Graphite tip */}
              <path d="M110 34 L 117 50 Q 110 53 103 50 Z" fill="#1D2124" />
              {/* Scalloped collar line */}
              <path
                d="M84 86 Q 91 92 98 86 Q 104 92 110 86 Q 116 92 122 86 Q 129 92 136 86"
                fill="#E53935"
              />

              {/* Upper Red Faceted Body */}
              <rect x="84" y="86" width="16" height="58" fill="#C62828" />
              <rect x="100" y="86" width="20" height="58" fill="#E53935" />
              <rect x="120" y="86" width="16" height="58" fill="#FF5252" />

              {/* Bold Black Middle Band */}
              <rect x="84" y="144" width="52" height="32" fill="#141619" />
              <rect x="120" y="144" width="16" height="32" fill="#2A2E33" />

              {/* Lower Red Faceted Body */}
              <rect x="84" y="176" width="16" height="52" fill="#C62828" />
              <rect x="100" y="176" width="20" height="52" fill="#E53935" />
              <rect x="120" y="176" width="16" height="52" fill="#FF5252" />

              {/* Silver Metallic Ferrule */}
              <rect x="84" y="228" width="52" height="22" fill="#CFD8DC" />
              <line x1="84" y1="234" x2="136" y2="234" stroke="#78909C" strokeWidth="2.5" />
              <line x1="84" y1="242" x2="136" y2="242" stroke="#78909C" strokeWidth="2.5" />

              {/* Coral-Red Eraser */}
              <path
                d="M84 250 H136 V274 Q136 281 129 281 H91 Q84 281 84 274 Z"
                fill="#EF6C6C"
              />
              <rect x="120" y="250" width="16" height="26" fill="#F28B82" />
            </svg>
          </div>

          {/* Billowing Hand-Drawn Exhaust Cloud Below Rocket */}
          <div
            className={`${styles.smokeCloudDraw} ${styles.smokePuffFloat} relative z-10 -mt-12 sm:-mt-14 w-full`}
          >
            <svg
              viewBox="0 0 640 120"
              className="w-full h-auto"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M28 106 C 36 74, 72 68, 96 80 C 118 50, 178 44, 210 64 C 228 42, 260 34, 286 38 L 286 14 M 354 14 L 354 38 C 384 34, 414 44, 430 64 C 464 42, 524 50, 544 80 C 568 68, 604 74, 612 106"
                stroke="#111315"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M150 76 C 160 66, 178 68, 186 76 M452 76 C 462 66, 480 68, 488 76 M226 84 C 236 72, 258 72, 268 84 M372 84 C 382 72, 404 72, 414 84"
                stroke="#111315"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ===============================================================
            MAIN HEADING: "WELCOME TO SAM UNIVERSE" (Hand-Sketched Typography)
        =============================================================== */}
        <div className="mt-2 sm:mt-4 w-full flex flex-col items-center">
          <h2 id="section04-heading" className="sr-only">
            WELCOME TO SAM UNIVERSE
          </h2>

          <p
            aria-hidden="true"
            className={`${styles.revealBlock} text-lg sm:text-2xl font-bold uppercase tracking-[0.26em] text-[#111315]`}
            style={{
              fontFamily: "var(--font-about-block), sans-serif",
              transitionDelay: "120ms",
            }}
          >
            WELCOME TO
          </p>

          {/* Hand-sketched / crayon-hatched black display typography matching Reference 4 */}
          <div
            aria-hidden="true"
            className={`${styles.revealBlock} relative w-full max-w-[820px] mt-1`}
            style={{ transitionDelay: "220ms" }}
          >
            <svg
              viewBox="0 0 980 140"
              className="w-full h-auto overflow-visible"
              role="presentation"
            >
              <defs>
                {/* Hand-drawn diagonal marker/crayon scribble hatch pattern */}
                <pattern
                  id="sam-sketch-hatch"
                  width="12"
                  height="12"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(38)"
                >
                  <rect width="12" height="12" fill="#111315" fillOpacity="0.14" />
                  <path
                    d="M0 2H12M0 6.5H12M0 10.5H12"
                    stroke="#111315"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </pattern>
              </defs>

              <text
                x="490"
                y="108"
                textAnchor="middle"
                fontSize="104"
                fontWeight="900"
                letterSpacing="2.5"
                fill="url(#sam-sketch-hatch)"
                stroke="#111315"
                strokeWidth="3.5"
                strokeLinejoin="round"
                style={{
                  fontFamily: "var(--font-about-block), Montserrat, sans-serif",
                }}
              >
                SAM UNIVERSE
              </text>
            </svg>

            {/* Playful red-and-black star crest accent & tiny squiggle */}
            <div className="hidden sm:flex items-center justify-center gap-2 -mt-2 mb-2">
              <span className="h-[3px] w-10 bg-[#111315] rounded-full" />
              <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
                <path
                  d="M14 2L17.5 10.2L26.5 11L19.6 16.8L21.7 25.5L14 20.8L6.3 25.5L8.4 16.8L1.5 11L10.5 10.2Z"
                  fill="#E53935"
                  stroke="#111315"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="h-[3px] w-10 bg-[#111315] rounded-full" />
            </div>
          </div>

          {/* Supporting Heading */}
          <h3
            className={`${styles.revealBlock} mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111315] tracking-tight`}
            style={{ transitionDelay: "300ms" }}
          >
            A New Journey.{" "}
            <span className="text-[#B91C1C]">Endless Possibilities.</span>
          </h3>

          {/* Description */}
          <p
            className={`${styles.revealBlock} mt-3 max-w-[60ch] text-sm sm:text-base md:text-[17px] leading-[1.68] text-[#1D2124] font-medium`}
            style={{ transitionDelay: "380ms" }}
          >
            Every school day is a new opportunity to dream, explore, create and
            achieve. Join a learning community where curiosity is celebrated and
            every student matters.
          </p>

          {/* ===============================================================
              TWO INTERACTIVE MAGNETIC PILL BUTTONS
          =============================================================== */}
          <div
            className={`${styles.revealBlock} mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-4`}
            style={{ transitionDelay: "460ms" }}
          >
            <Link
              href="/garden#about"
              onMouseMove={exploreMagnetic.onMouseMove}
              onMouseLeave={exploreMagnetic.onMouseLeave}
              className={`${styles.magneticBtn} inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 sm:px-8 py-3.5 rounded-full bg-[#111315] text-[#FFE033] font-extrabold text-xs sm:text-sm uppercase tracking-[0.14em] shadow-[0_12px_26px_rgba(17,19,21,0.28)] hover:shadow-[0_18px_36px_rgba(17,19,21,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]`}
            >
              <span>EXPLORE OUR SCHOOL</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={onMeetTeachers}
              onMouseMove={teachersMagnetic.onMouseMove}
              onMouseLeave={teachersMagnetic.onMouseLeave}
              className={`${styles.magneticBtn} inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 sm:px-8 py-3.5 rounded-full border-2 border-[#111315] bg-transparent text-[#111315] hover:bg-[#111315] hover:text-[#FFE033] font-extrabold text-xs sm:text-sm uppercase tracking-[0.14em] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111315]`}
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>MEET OUR TEACHERS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Organic angled transition into Section 05 (What Makes SAM Universe Special) */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-14 sm:h-20 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0 44 L 320 18 L 680 56 L 1060 22 L 1440 50 L 1440 90 L 0 90 Z"
            fill="#062B31"
          />
        </svg>
      </div>
    </section>
  );
}
