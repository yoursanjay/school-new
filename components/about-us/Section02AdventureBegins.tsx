"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./AboutUsPage.module.css";
import { useBidirectionalReveal, useScrollProgressVar } from "./useScrollMotion";

interface AdventureLetter {
  id: string;
  letter: string;
  photo: string;
  caption: string;
  speed: number;
  delay: number;
}

const ADVENTURE_LETTERS: AdventureLetter[] = [
  {
    id: "A",
    letter: "A",
    photo: "/img/about/letter-archery.webp",
    caption: "Archery & Precision Focus",
    speed: -24,
    delay: 40,
  },
  {
    id: "D",
    letter: "D",
    photo: "/img/about/letter-dance.webp",
    caption: "Dance & Creative Expression",
    speed: 20,
    delay: 110,
  },
  {
    id: "V",
    letter: "V",
    photo: "/img/about/letter-equestrian.webp",
    caption: "Equestrian Confidence & Courage",
    speed: -18,
    delay: 180,
  },
  {
    id: "E1",
    letter: "E",
    photo: "/img/about/letter-art-studio.webp",
    caption: "Studio Arts & Imagination",
    speed: 22,
    delay: 240,
  },
  {
    id: "N",
    letter: "N",
    photo: "/img/about/letter-tech-lab.webp",
    caption: "Digital Labs & Discovery",
    speed: -20,
    delay: 300,
  },
  {
    id: "T",
    letter: "T",
    photo: "/img/about/letter-trekking.webp",
    caption: "Outdoor Trails & Teamwork",
    speed: 24,
    delay: 360,
  },
  {
    id: "U",
    letter: "U",
    photo: "/img/about/letter-botany.webp",
    caption: "Botany & Field Exploration",
    speed: -18,
    delay: 420,
  },
  {
    id: "R",
    letter: "R",
    photo: "/img/about/letter-reading.webp",
    caption: "Shared Reading & Curiosity",
    speed: 20,
    delay: 480,
  },
  {
    id: "E2",
    letter: "E",
    photo: "/img/about/letter-campus-aerial.webp",
    caption: "Expansive Green Campus Life",
    speed: -22,
    delay: 540,
  },
];

export default function Section02AdventureBegins() {
  const { ref: revealRef, isVisible } = useBidirectionalReveal<HTMLDivElement>(0.12);
  const { ref: scrollRef } = useScrollProgressVar<HTMLElement>();
  const [activeLetter, setActiveLetter] = useState<AdventureLetter>(
    ADVENTURE_LETTERS[0]
  );

  return (
    <section
      ref={scrollRef}
      id="adventure-begins"
      aria-labelledby="section02-heading"
      className={`${styles.section02} ${isVisible ? styles.isVisible : ""} relative py-20 sm:py-28 lg:py-32`}
    >
      {/* Subtle architectural dark teal radial glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full bg-[#087A87]/18 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-16 right-10 w-[340px] h-[340px] rounded-full bg-[#FFE033]/8 blur-[120px]"
        aria-hidden="true"
      />

      <div
        ref={revealRef}
        className="relative z-10 mx-auto max-w-7xl pl-14 pr-5 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-12"
      >
        <h2 id="section02-heading" className="sr-only">
          THE ADVENTURE BEGINS!
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ===============================================================
              LEFT / CENTER: MONUMENTAL "THE / ADV-ENT-URE / BEGINS!" POSTER
          =============================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[540px] sm:max-w-[590px] mx-auto px-2 sm:px-6">
              {/* Top "T H E" + Cheering Cutout Boy perched on V */}
              <div className="relative flex items-end justify-between mb-1 sm:mb-2 px-4 sm:px-6">
                <p
                  aria-hidden="true"
                  className={`${styles.revealBlock} text-white/95 font-medium text-base sm:text-xl tracking-[0.65em] uppercase select-none`}
                  style={{
                    fontFamily: "var(--font-about-block), sans-serif",
                    transitionDelay: "30ms",
                  }}
                >
                  THE
                </p>

                {/* Cutout student character perched above V (Reference 2 top-right) */}
                <div
                  className={`${styles.cutoutCharacter} relative w-24 sm:w-28 md:w-32 -mb-6 sm:-mb-8 mr-1 sm:mr-3 z-20 pointer-events-none`}
                  style={{
                    transitionDelay: "320ms",
                    transform:
                      "translate3d(0, calc((0.5 - var(--scroll-p, 0.5)) * 28px), 0)",
                  }}
                >
                  <Image
                    src="/img/about/cutout-cheering-boy.png"
                    alt="Excited SAM student cutout cheering with backpack"
                    width={850}
                    height={542}
                    className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.75)]"
                  />
                </div>
              </div>

              {/* 3x3 Monumental Letter Grid: ADV / ENT / URE */}
              <div className="relative grid grid-cols-3 gap-x-1.5 sm:gap-x-3 gap-y-1 sm:gap-y-2 select-none">
                {ADVENTURE_LETTERS.map((item, idx) => {
                  const clipId = `sam-adventure-clip-${item.id}`;
                  const isSelected = activeLetter.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveLetter(item)}
                      onFocus={() => setActiveLetter(item)}
                      onClick={() => setActiveLetter(item)}
                      aria-label={`${item.letter}: ${item.caption}`}
                      className={`${styles.adventureLetterCard} group relative aspect-[1/1.04] w-full bg-transparent border-0 p-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE033] rounded-md`}
                    >
                      <div
                        className={`${styles.adventureLetterMask} w-full h-full`}
                        style={{ transitionDelay: `${item.delay}ms` }}
                      >
                        <svg
                          viewBox="0 0 220 230"
                          className="w-full h-full overflow-visible"
                          role="img"
                          aria-hidden="true"
                        >
                          <defs>
                            <clipPath id={clipId}>
                              <text
                                x="110"
                                y="192"
                                textAnchor="middle"
                                fontSize="228"
                                fontWeight="900"
                                style={{
                                  fontFamily:
                                    "var(--font-about-block), Montserrat, sans-serif",
                                }}
                              >
                                {item.letter}
                              </text>
                            </clipPath>
                          </defs>

                          {/* Photo masked inside the monumental letterform with individual scroll speed */}
                          <g clipPath={`url(#${clipId})`}>
                            <g
                              style={{
                                transform: `translate3d(0, calc((var(--scroll-p, 0.5) - 0.5) * ${item.speed}px), 0)`,
                                transition: "transform 0.14s linear",
                              }}
                            >
                              <image
                                href={item.photo}
                                x="-25"
                                y="-28"
                                width="270"
                                height="286"
                                preserveAspectRatio="xMidYMid slice"
                                style={{ filter: "brightness(1.12) contrast(1.06)" }}
                                className="transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            </g>
                            {/* Subtle interactive teal/yellow highlight tint when hovered/selected */}
                            <rect
                              x="0"
                              y="0"
                              width="220"
                              height="230"
                              fill={
                                isSelected
                                  ? "rgba(255, 224, 51, 0.14)"
                                  : "rgba(5, 94, 104, 0.08)"
                              }
                            />
                          </g>

                          {/* Crisp subtle outline separating letterform from charcoal ground */}
                          <text
                            x="110"
                            y="192"
                            textAnchor="middle"
                            fontSize="228"
                            fontWeight="900"
                            fill="none"
                            stroke={
                              isSelected
                                ? "#FFE033"
                                : "rgba(255, 255, 255, 0.28)"
                            }
                            strokeWidth={isSelected ? "3.4" : "1.8"}
                            style={{
                              fontFamily:
                                "var(--font-about-block), Montserrat, sans-serif",
                              transition: "stroke 0.25s ease",
                            }}
                          >
                            {item.letter}
                          </text>
                        </svg>
                      </div>

                      {/* Tiny index marker on hover */}
                      {idx === 0 && (
                        <span
                          aria-hidden="true"
                          className="hidden sm:block absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-[#FFE033] pointer-events-none"
                        />
                      )}
                    </button>
                  );
                })}

                {/* Cutout student character jumping beside U / E on bottom-left (Reference 2 style) */}
                <div
                  className={`${styles.cutoutCharacter} pointer-events-none absolute left-1 sm:-left-10 bottom-[6%] w-18 sm:w-28 md:w-32 z-20`}
                  style={{
                    transitionDelay: "460ms",
                    transform:
                      "translate3d(0, calc((var(--scroll-p, 0.5) - 0.5) * 34px), 0)",
                  }}
                >
                  <Image
                    src="/img/about/cutout-hula-student.png"
                    alt="Joyful SAM student jumping with rainbow hula hoop"
                    width={683}
                    height={808}
                    className="w-full h-auto object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Small explorer character accent perched on right edge between V and T */}
                <div
                  aria-hidden="true"
                  className={`${styles.cutoutCharacter} hidden sm:flex pointer-events-none absolute -right-4 top-[35%] w-16 h-16 items-center justify-center rounded-full bg-[#055E68] border-2 border-[#FFE033] shadow-[0_10px_24px_rgba(0,0,0,0.65)] z-20`}
                  style={{
                    transitionDelay: "520ms",
                    transform:
                      "translate3d(0, calc((0.5 - var(--scroll-p, 0.5)) * 26px), 0)",
                  }}
                >
                  <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                    <path
                      d="M8 24C14 21 20 21 26 24C29 25.5 32 24 34 22L28 11L19 16L13 10L6 20L8 24Z"
                      fill="#FFE033"
                      stroke="#0A0D0F"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M19 16V30M28 11V28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Bottom "B E G I N S !" */}
              <p
                aria-hidden="true"
                className={`${styles.revealBlock} mt-4 sm:mt-5 text-center text-white font-semibold text-base sm:text-xl md:text-2xl tracking-[0.58em] uppercase select-none`}
                style={{
                  fontFamily: "var(--font-about-block), sans-serif",
                  transitionDelay: "580ms",
                }}
              >
                BEGINS<span className="text-[#FFE033]">!</span>
              </p>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: EDITORIAL MAGAZINE STORY & INTERACTIVE LETTER INSPECTOR
          =============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              className={`${styles.revealBlock} border-l-4 border-[#FFE033] pl-5 sm:pl-7`}
              style={{ transitionDelay: "220ms" }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white leading-[1.12] tracking-tight">
                Every Student Has a Story to{" "}
                <span className="text-[#FFE033]">Discover.</span>
              </h3>

              <p className="mt-5 text-base sm:text-[17px] leading-[1.7] text-white/85 max-w-[52ch]">
                Every day at SAM Universe brings new opportunities to explore,
                discover, learn and grow. From classroom activities to sports,
                creativity and teamwork, we make every learning experience
                meaningful.
              </p>
            </div>

            {/* Interactive Letter Photo Spotlight (syncs when hovering/tapping any letter) */}
            <div
              className={`${styles.revealBlock} mt-8 p-4 sm:p-5 rounded-2xl bg-[#11181B] border border-white/12 shadow-[0_18px_38px_rgba(0,0,0,0.45)]`}
              style={{ transitionDelay: "340ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-xl border-2 border-[#FFE033]">
                  <Image
                    src={activeLetter.photo}
                    alt={activeLetter.caption}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#FFE033] text-[#0A0D0F] font-black text-sm">
                      {activeLetter.letter}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#35C6D4]">
                      Inside The Letter
                    </span>
                  </div>
                  <p className="mt-1.5 text-base sm:text-lg font-bold text-white truncate">
                    {activeLetter.caption}
                  </p>
                  <p className="mt-0.5 text-xs text-white/65">
                    Tap or hover any letter of ADVENTURE to preview campus life.
                  </p>
                </div>
              </div>

              {/* Quick letter pills for touch accessibility */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ADVENTURE_LETTERS.map((item) => {
                  const selected = item.id === activeLetter.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveLetter(item)}
                      className={`px-2.5 py-1 rounded-md text-xs font-extrabold transition-colors cursor-pointer ${
                        selected
                          ? "bg-[#FFE033] text-[#0A0D0F]"
                          : "bg-white/8 text-white/75 hover:bg-white/15 hover:text-white"
                      }`}
                    >
                      {item.letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jagged brushed transition from Charcoal into Section 03 (Primary Deep Teal) */}
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
            d="M0 36 C 280 78, 560 12, 860 54 C 1100 84, 1290 22, 1440 42 L 1440 90 L 0 90 Z"
            fill="#066B77"
          />
        </svg>
      </div>
    </section>
  );
}
