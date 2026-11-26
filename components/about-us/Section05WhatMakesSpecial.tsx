"use client";

import React from "react";
import Image from "next/image";
import { Compass, HeartHandshake, Sparkles, Users } from "lucide-react";
import styles from "./AboutUsPage.module.css";
import { useBidirectionalReveal, useScrollProgressVar } from "./useScrollMotion";

export interface SpecialPillar {
  id: "holistic" | "educators" | "beyond" | "every-child";
  title: string;
  description: string;
  photo: string;
  alt: string;
  caption: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const SPECIAL_PILLARS: SpecialPillar[] = [
  {
    id: "holistic",
    title: "Holistic Learning",
    description: "Developing academic knowledge, creativity and confidence.",
    photo: "/img/about/special-holistic.webp",
    alt: "SAM Universe students actively engaging in an interactive classroom lesson",
    caption: "Curious Minds in Interactive Classrooms",
    Icon: Sparkles,
  },
  {
    id: "educators",
    title: "Experienced Educators",
    description: "Encouraging every student through supportive teaching.",
    photo: "/img/about/special-educators.webp",
    alt: "Dedicated SAM Universe teachers smiling together on campus",
    caption: "Supportive Educators Guiding Every Step",
    Icon: Users,
  },
  {
    id: "beyond",
    title: "Beyond the Classroom",
    description: "Learning through sports, arts, teamwork and exploration.",
    photo: "/img/about/special-beyond-classroom.webp",
    alt: "SAM Universe students practicing outdoor archery together",
    caption: "Sports, Studio Arts & Outdoor Discovery",
    Icon: Compass,
  },
  {
    id: "every-child",
    title: "Every Child Matters",
    description:
      "Creating an inclusive and encouraging learning environment.",
    photo: "/img/about/special-every-child.webp",
    alt: "Smiling SAM Universe students interacting gently with a parrot outdoors",
    caption: "An Inclusive, Warm Learning Community",
    Icon: HeartHandshake,
  },
];

interface Section05WhatMakesSpecialProps {
  activePillarId: SpecialPillar["id"];
  onSelectPillar: (id: SpecialPillar["id"]) => void;
}

export default function Section05WhatMakesSpecial({
  activePillarId,
  onSelectPillar,
}: Section05WhatMakesSpecialProps) {
  const { ref: revealRef, isVisible } = useBidirectionalReveal<HTMLDivElement>(0.12);
  const { ref: scrollRef } = useScrollProgressVar<HTMLElement>();

  const activePillar =
    SPECIAL_PILLARS.find((p) => p.id === activePillarId) ?? SPECIAL_PILLARS[0];

  return (
    <section
      ref={scrollRef}
      id="what-makes-sam-special"
      aria-labelledby="section05-heading"
      className={`${styles.section05} ${isVisible ? styles.isVisible : ""} relative pt-16 sm:pt-24 pb-20 sm:pb-28`}
    >
      <div className={styles.tealTextureOverlay} aria-hidden="true" />

      <div
        ref={revealRef}
        className="relative z-10 mx-auto max-w-7xl pl-14 pr-5 sm:pl-16 sm:pr-10 lg:pl-20 lg:pr-12"
      >
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <h2
            id="section05-heading"
            className={`${styles.revealBlock} text-3xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-white leading-[0.98]`}
            style={{
              fontFamily:
                "var(--font-about-condensed), 'Barlow Condensed', sans-serif",
            }}
          >
            WHAT MAKES{" "}
            <span className="text-[#FFE033]">SAM UNIVERSE</span> SPECIAL?
          </h2>
          <div
            aria-hidden="true"
            className={`${styles.yellowHighlightStrip} mt-3 h-1.5 w-28 sm:w-40`}
          />
        </div>

        {/* Asymmetric Editorial Spread (No uniform rectangular card grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: Interactive Editorial Chapters */}
          <div className="lg:col-span-6 divide-y divide-white/15 border-y border-white/15">
            {SPECIAL_PILLARS.map((pillar, index) => {
              const IconComp = pillar.Icon;
              const isSelected = pillar.id === activePillar.id;
              return (
                <button
                  key={pillar.id}
                  id={pillar.id === "educators" ? "special-educators" : undefined}
                  type="button"
                  onClick={() => onSelectPillar(pillar.id)}
                  onMouseEnter={() => onSelectPillar(pillar.id)}
                  aria-pressed={isSelected}
                  className={`${styles.revealBlock} group w-full text-left py-5 sm:py-6 px-3 sm:px-5 flex items-start gap-4 sm:gap-5 transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE033] ${
                    isSelected ? "bg-white/6" : "hover:bg-white/[0.03]"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isSelected
                        ? "bg-[#FFE033] text-[#0B0E11] scale-105 shadow-[0_8px_20px_rgba(255,224,51,0.35)]"
                        : "bg-[#087A87]/40 text-[#FFE033] border border-[#FFE033]/30 group-hover:bg-[#FFE033]/20"
                    }`}
                  >
                    <IconComp className="w-5 h-5" aria-hidden="true" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                          isSelected ? "text-[#FFE033]" : "text-white"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? "bg-[#FFE033] scale-125"
                            : "bg-white/25 group-hover:bg-white/50"
                        }`}
                      />
                    </div>
                    <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-white/85">
                      {pillar.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Paper-Cut Asymmetric Photo Stage */}
          <div className="lg:col-span-6">
            <div
              className="relative mx-auto max-w-[560px]"
              style={{
                transform:
                  "translate3d(0, calc((0.5 - var(--scroll-p, 0.5)) * 22px), 0)",
              }}
            >
              {/* Layered secondary paper-cut print peeking behind top-right */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-5 -right-4 w-[58%] aspect-[16/10] rotate-[4deg] bg-[#FFE033] p-[7px] shadow-[0_18px_36px_rgba(0,0,0,0.4)] opacity-85"
                style={{
                  clipPath: "polygon(2% 4%, 98% 0%, 96% 96%, 0% 98%)",
                }}
              >
                <div className="relative w-full h-full overflow-hidden bg-[#0A0D0F]">
                  <Image
                    src="/img/about/special-creative-arts.webp"
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Active Yellow Paper-Cut Hero Photo Frame */}
              <div
                className="relative z-10 p-[10px] sm:p-[13px] bg-[#FFE033] shadow-[0_26px_54px_rgba(0,0,0,0.5)] -rotate-[1.5deg] transition-transform duration-500"
                style={{
                  clipPath: "polygon(1% 3%, 99% 0%, 98% 97%, 2% 100%)",
                }}
              >
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0D0F]"
                  style={{
                    clipPath: "polygon(1.5% 2%, 98.5% 1%, 98% 98%, 1% 99%)",
                  }}
                >
                  {SPECIAL_PILLARS.map((pillar) => (
                    <Image
                      key={pillar.id}
                      src={pillar.photo}
                      alt={pillar.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 540px"
                      className={`object-cover transition-all duration-500 ease-out ${
                        pillar.id === activePillar.id
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                      }`}
                    />
                  ))}

                  {/* Bottom editorial caption banner (right-aligned so corner sticker on bottom-left never overlaps text) */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07191D]/95 via-[#07191D]/72 to-transparent px-4 sm:px-6 pt-12 pb-4 flex items-end justify-end text-right">
                    <div className="max-w-[78%] sm:max-w-[66%]">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#FFE033]">
                        {activePillar.title}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {activePillar.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small campus entrance corner sticker bottom-left */}
              <div
                aria-hidden="true"
                className="hidden sm:block relative z-20 -mt-12 -ml-3 w-40 aspect-[16/10] rotate-[-3deg] bg-white p-[5px] shadow-[0_14px_28px_rgba(0,0,0,0.42)]"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/img/about/campus-entrance.webp"
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth stepped transition into shared HomeFooter (#F8F9FA) */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 sm:h-16 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0 40 Q 380 80, 760 36 T 1440 44 L 1440 80 L 0 80 Z"
            fill="#F8F9FA"
          />
        </svg>
      </div>
    </section>
  );
}
