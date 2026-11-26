"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

import { journeyDisplay } from "./typography";
import {
  SCHOOL_ORIGIN_SPECS,
  SECTION1_ORIGIN_CONTENT,
  JOURNEY_MILESTONES,
  GROWING_TOGETHER_FEATURE,
  GROWING_TOGETHER_OVERLAP,
  GROWING_TOGETHER_GALLERY,
} from "./journeyData";
import styles from "./OurJourneyClient.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CHAPTER_NAV = [
  { id: "the-beginning", code: "01", label: "The Beginning" },
  { id: "our-milestones", code: "02", label: "Our Milestones" },
  { id: "growing-together", code: "03", label: "Growing Together" },
  { id: "the-journey-continues", code: "04", label: "The Journey Continues" },
] as const;

export default function OurJourneyClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (!window.location.hash && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

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
          const isDesktop = Boolean(cond.isDesktop);
          const isMobile = Boolean(cond.isMobile);

          if (isReduced) {
            gsap.set(
              [
                ".js-s1-word",
                ".js-s1-fade",
                ".js-s1-mask",
                ".js-s1-parallax",
                ".js-s2-word",
                ".js-spine-fill",
                ".js-milestone-row",
                ".js-milestone-year",
                ".js-milestone-card",
                ".js-milestone-mask",
                ".js-milestone-stagger",
                ".js-s3-word",
                ".js-s3-mask",
                ".js-s3-strip",
                ".js-s3-strip-even",
                ".js-s3-strip-odd",
                ".js-s3-meta",
                ".js-s4-mask",
                ".js-s4-photo-zoom",
                ".js-s4-word",
                ".js-s4-fade",
              ],
              { clearProps: "all" },
            );
            return;
          }

          /* =============================================================
             SECTION 01 – THE BEGINNING (Word reveal, masks & subtle depth)
             ============================================================= */
          gsap.fromTo(
            ".js-s1-word",
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.72,
              stagger: 0.055,
              ease: "power3.out",
              clearProps: "transform",
            },
          );

          gsap.fromTo(
            ".js-s1-fade",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              stagger: 0.07,
              delay: 0.14,
              ease: "power2.out",
              clearProps: "transform",
            },
          );

          gsap.fromTo(
            ".js-s1-mask",
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.95,
              stagger: 0.14,
              ease: "power3.out",
            },
          );

          if (!isMobile) {
            gsap.to(".js-s1-parallax", {
              y: isDesktop ? -28 : -14,
              ease: "none",
              scrollTrigger: {
                trigger: "#the-beginning",
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            });
          }

          /* =============================================================
             SECTION 02 – OUR MILESTONES (Progressive Red Spine + Alt Cards)
             ============================================================= */
          gsap.fromTo(
            ".js-s2-word",
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#our-milestones",
                start: "top 86%",
                end: "top 52%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );

          const spineFill = root.querySelector(".js-spine-fill");
          if (spineFill) {
            gsap.fromTo(
              spineFill,
              { scaleY: 0.02 },
              {
                scaleY: 1,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                  trigger: ".js-milestone-track",
                  start: "top 74%",
                  end: "bottom 56%",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          const rows = gsap.utils.toArray<HTMLElement>(".js-milestone-row");
          rows.forEach((row) => {
            const side = row.dataset.side === "left" ? "left" : "right";
            const yearEl = row.querySelector(".js-milestone-year");
            const maskEl = row.querySelector(".js-milestone-mask");
            const cardEl = row.querySelector(".js-milestone-card");
            const staggerEls = row.querySelectorAll(".js-milestone-stagger");

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                end: "top 40%",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            });

            if (yearEl) {
              tl.fromTo(
                yearEl,
                { y: 22, autoAlpha: 0.2 },
                { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
                0,
              );
            }

            if (cardEl) {
              const xOffset = isDesktop ? (side === "left" ? -34 : 34) : 18;
              tl.fromTo(
                cardEl,
                { x: xOffset, y: 18, autoAlpha: 0 },
                { x: 0, y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
                0.04,
              );
            }

            if (maskEl) {
              tl.fromTo(
                maskEl,
                {
                  clipPath:
                    isDesktop && side === "left"
                      ? "inset(0 100% 0 0)"
                      : "inset(0 0 0 100%)",
                },
                {
                  clipPath: "inset(0 0% 0 0%)",
                  duration: 0.72,
                  ease: "power2.out",
                },
                0.06,
              );
            }

            if (staggerEls.length > 0) {
              tl.fromTo(
                staggerEls,
                { y: 14, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  stagger: 0.08,
                  duration: 0.45,
                  ease: "power2.out",
                },
                0.14,
              );
            }
          });

          /* =============================================================
             SECTION 03 – GROWING TOGETHER (Staggered Documentary Strips)
             ============================================================= */
          gsap.fromTo(
            ".js-s3-word",
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.055,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#growing-together",
                start: "top 86%",
                end: "top 52%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );

          const s3Strips = gsap.utils.toArray<HTMLElement>(".js-s3-strip");
          if (s3Strips.length > 0) {
            gsap.fromTo(
              s3Strips,
              { y: 42, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.09,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".js-s3-poster-board",
                  start: "top 84%",
                  end: "top 42%",
                  scrub: 0.55,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          const s3Masks = gsap.utils.toArray<HTMLElement>(".js-s3-mask");
          s3Masks.forEach((mask, idx) => {
            gsap.fromTo(
              mask,
              {
                clipPath:
                  idx % 2 === 0
                    ? "inset(100% 0 0% 0)"
                    : "inset(0% 0 100% 0)",
              },
              {
                clipPath: "inset(0% 0 0% 0)",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".js-s3-poster-board",
                  start: "top 78%",
                  end: "top 34%",
                  scrub: 0.55,
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          if (isDesktop) {
            gsap.to(".js-s3-strip-even", {
              y: -16,
              ease: "none",
              scrollTrigger: {
                trigger: ".js-s3-poster-board",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            });
            gsap.to(".js-s3-strip-odd", {
              y: 16,
              ease: "none",
              scrollTrigger: {
                trigger: ".js-s3-poster-board",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            });
          }

          gsap.fromTo(
            ".js-s3-meta",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".js-s3-meta",
                start: "top 92%",
                end: "top 68%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );

          /* =============================================================
             SECTION 04 – THE JOURNEY CONTINUES (Real Campus Finale)
             ============================================================= */
          gsap.fromTo(
            ".js-s4-mask",
            { clipPath: "inset(6% 4% 6% 4%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: "#the-journey-continues",
                start: "top 86%",
                end: "top 28%",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            ".js-s4-photo-zoom",
            { scale: 1.12, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: "#the-journey-continues",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            ".js-s4-word",
            { yPercent: 105, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#the-journey-continues",
                start: "top 68%",
                end: "top 30%",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            ".js-s4-fade",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#the-journey-continues",
                start: "top 62%",
                end: "top 24%",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      const onWindowLoad = () => ScrollTrigger.refresh();
      const rafRefresh = window.requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );
      window.addEventListener("load", onWindowLoad);

      return () => {
        window.cancelAnimationFrame(rafRefresh);
        window.removeEventListener("load", onWindowLoad);
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={`${styles.journeyPageRoot} ${journeyDisplay.variable}`}
    >
      {/* Top Editorial Chapter Navigation */}
      <nav
        aria-label="Our Journey sections"
        className="border-b border-[#D8D8D8] bg-[#FFFFFF]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 py-3 pl-[58px] pr-4 sm:pl-[76px] sm:pr-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 bg-[#E31E24]" />
            <span
              className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717]`}
            >
              OUR JOURNEY · SRI AUROBINDO MIRA UNIVERSAL SCHOOL
            </span>
          </div>

          <ol className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
            {CHAPTER_NAV.map((ch) => (
              <li key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  className={`${styles.fontMono} inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#404040] transition-colors hover:text-[#E31E24]`}
                >
                  <span className="font-bold text-[#E31E24]">{ch.code}</span>
                  <span>{ch.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ====================================================================
          SECTION 01 – THE BEGINNING
          ==================================================================== */}
      <section
        id="the-beginning"
        aria-labelledby="s1-heading"
        className="scroll-mt-[96px] border-b border-[#D8D8D8] pt-8 pb-16 sm:pt-12 sm:pb-24"
      >
        <div className="mx-auto max-w-[1440px] pl-[58px] pr-4 sm:pl-[76px] sm:pr-8 lg:px-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* LEFT ASYMMETRIC COLUMN: Verified Key Facts & Classroom Still */}
            <div className="flex flex-col justify-between gap-7 lg:col-span-3">
              <div className="js-s1-fade">
                <div className="mb-3 h-[3px] w-10 bg-[#E31E24]" />
                <p
                  className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.2em] text-[#E31E24]`}
                >
                  FOUNDING STORY · SINCE 2001
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#404040]">
                  Rooted in Madurai, guiding young learners across academic
                  study, values, and joyful discovery for more than two
                  decades.
                </p>

                <dl className="mt-6 divide-y divide-[#D8D8D8] border-y border-[#D8D8D8]">
                  {SCHOOL_ORIGIN_SPECS.map((spec) => (
                    <div key={spec.label} className="py-2.5">
                      <dt
                        className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#E31E24]`}
                      >
                        {spec.label}
                      </dt>
                      <dd className="mt-0.5 text-[13px] font-medium leading-snug text-[#171717]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className="photoFrame js-s1-fade border border-[#D8D8D8] bg-[#FFFFFF] p-2.5 shadow-[0_12px_28px_rgba(23,23,23,0.06)]">
                <div className="js-s1-mask relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/img/about/collage-classroom-hands-bw.webp"
                    alt="Primary students raising hands eagerly during a lesson at Sri Aurobindo Mira Universal School"
                    fill
                    sizes="(max-width: 1023px) 88vw, 24vw"
                    className={`${styles.docGrayscale} object-cover`}
                  />
                  <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#E31E24]" />
                  <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[#E31E24]" />
                </div>
                <figcaption
                  className={`${styles.fontMono} mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#4A4A4A]`}
                >
                  <span>PRIMARY CLASSROOM LEARNING</span>
                  <span className="font-bold text-[#E31E24]">MADURAI</span>
                </figcaption>
              </figure>
            </div>

            {/* RIGHT MAIN EDITORIAL COLUMN */}
            <div className="lg:col-span-9">
              {/* Top Headline + Right Philosophy Callout */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
                  <div className="js-s1-fade flex items-center gap-3">
                    <span className="inline-block h-[3px] w-12 bg-[#E31E24]" />
                    <span
                      className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717]`}
                    >
                      {SECTION1_ORIGIN_CONTENT.eyebrow}
                    </span>
                  </div>

                  <h1
                    id="s1-heading"
                    className={`${styles.fontDisplay} mt-4 text-[clamp(3rem,6.6vw,6rem)] font-black uppercase leading-[0.92] text-[#171717]`}
                  >
                    {SECTION1_ORIGIN_CONTENT.headlineWords.map((word) => (
                      <span
                        key={word}
                        className={`${styles.wordClipWrap} mr-[0.22em]`}
                      >
                        <span className="js-s1-word inline-block">{word}</span>
                      </span>
                    ))}
                    <span className={`${styles.wordClipWrap} block text-[#E31E24]`}>
                      <span className="js-s1-word inline-block">
                        {SECTION1_ORIGIN_CONTENT.headlineAccent}
                      </span>
                    </span>
                  </h1>

                  <p className="js-s1-fade mt-4 max-w-2xl text-base leading-relaxed text-[#404040] sm:text-lg">
                    {SECTION1_ORIGIN_CONTENT.subheading}
                  </p>
                </div>

                <aside className="js-s1-fade border-l-2 border-[#E31E24] pl-4 lg:col-span-4 lg:mt-6">
                  <p
                    className={`${styles.fontDisplay} text-xl font-bold uppercase tracking-wide text-[#E31E24]`}
                  >
                    {SECTION1_ORIGIN_CONTENT.philosophyTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#404040]">
                    {SECTION1_ORIGIN_CONTENT.philosophyCopy}
                  </p>
                </aside>
              </div>

              {/* HERO CAMPUS PHOTOGRAPH + SUPPORTING AERIAL GROUNDS */}
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                <figure className="photoFrame relative border border-[#D8D8D8] bg-[#FFFFFF] p-3 shadow-[0_18px_40px_rgba(23,23,23,0.08)] lg:col-span-8">
                  <div className="mb-2.5 flex items-center justify-between border-b border-[#D8D8D8] pb-2">
                    <span
                      className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#171717]`}
                    >
                      SRI AUROBINDO MIRA UNIVERSAL SCHOOL · CAMPUS ENTRANCE
                    </span>
                    <span
                      className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#E31E24]`}
                    >
                      KEELAMATHUR
                    </span>
                  </div>

                  <div className="js-s1-mask relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/img/about/campus-entrance.webp"
                      alt="Main facade of Sri Aurobindo Mira Universal School in Madurai"
                      fill
                      loading="eager"
                      fetchPriority="high"
                      sizes="(max-width: 1023px) 92vw, 54vw"
                      className={`${styles.docGrayscale} object-cover`}
                    />
                    <div className="pointer-events-none absolute top-0 left-0 h-7 w-7 border-t-2 border-l-2 border-[#E31E24]" />
                    <div className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-[#E31E24]" />
                  </div>

                  <figcaption
                    className={`${styles.fontMono} mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[#4A4A4A]`}
                  >
                    <span>MELAKKAL MAIN ROAD · MADURAI – 625 019</span>
                    <span className="font-bold text-[#E31E24]">10-ACRE CAMPUS</span>
                  </figcaption>
                </figure>

                <div className="js-s1-parallax flex flex-col justify-between gap-5 lg:col-span-4">
                  <div className="js-s1-fade border border-[#D8D8D8] bg-[#FFFFFF] p-5 shadow-[0_10px_24px_rgba(23,23,23,0.05)]">
                    <div className="flex items-center justify-between">
                      <span
                        className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.2em] text-[#E31E24]`}
                      >
                        FOUNDING VISION · 2001
                      </span>
                      <span className="h-2 w-2 bg-[#E31E24]" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#171717]">
                      {SECTION1_ORIGIN_CONTENT.narrative}
                    </p>
                  </div>

                  <figure className="photoFrame js-s1-fade border border-[#D8D8D8] bg-[#FFFFFF] p-2.5 shadow-[0_12px_28px_rgba(23,23,23,0.06)]">
                    <div className="js-s1-mask relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src="/img/about/letter-campus-aerial.webp"
                        alt="Aerial view of the Sri Aurobindo Mira Universal School campus and synthetic running track"
                        fill
                        loading="eager"
                        fetchPriority="high"
                        sizes="(max-width: 1023px) 90vw, 28vw"
                        className={`${styles.docGrayscale} object-cover`}
                      />
                    </div>
                    <figcaption
                      className={`${styles.fontMono} mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-[#4A4A4A]`}
                    >
                      <span>CAMPUS GROUNDS &amp; TRACK</span>
                      <span className="font-bold text-[#E31E24]">MADURAI</span>
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Verified Key School Metrics Row */}
              <div className="js-s1-fade mt-10 grid grid-cols-2 gap-4 border-t border-[#D8D8D8] pt-6 sm:grid-cols-4 sm:gap-6">
                {SECTION1_ORIGIN_CONTENT.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t-2 border-[#E31E24] pt-3"
                  >
                    <p
                      className={`${styles.fontDisplay} text-3xl font-black leading-none text-[#171717] sm:text-4xl`}
                    >
                      {stat.number}
                    </p>
                    <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-[#171717]">
                      {stat.label}
                    </p>
                    <p
                      className={`${styles.fontMono} mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[#4A4A4A]`}
                    >
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 02 – OUR MILESTONES
          ==================================================================== */}
      <section
        id="our-milestones"
        aria-labelledby="s2-heading"
        className="scroll-mt-[96px] border-b border-[#D8D8D8] bg-[#F7F5F0] pt-16 pb-24 sm:pt-24 sm:pb-32"
      >
        <div className="mx-auto max-w-[1440px] pl-[58px] pr-4 sm:pl-[76px] sm:pr-8 lg:px-16">
          <header className="mx-auto max-w-4xl pb-14 text-left lg:pb-18 lg:text-center">
            <div className="inline-flex items-center gap-3">
              <span className="inline-block h-[3px] w-10 bg-[#E31E24]" />
              <span
                className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.22em] text-[#E31E24]`}
              >
                CHAPTER 02 · SCHOOL MILESTONES
              </span>
              <span className="hidden h-[3px] w-10 bg-[#E31E24] sm:inline-block" />
            </div>

            <h2
              id="s2-heading"
              className={`${styles.fontDisplay} mt-3 text-[clamp(2.6rem,5.8vw,5.25rem)] font-black uppercase leading-[0.92] text-[#171717]`}
            >
              {["MOMENTS", "THAT"].map((w) => (
                <span key={w} className={`${styles.wordClipWrap} mr-[0.22em]`}>
                  <span className="js-s2-word inline-block">{w}</span>
                </span>
              ))}
              {["SHAPED", "OUR", "STORY."].map((w) => (
                <span
                  key={w}
                  className={`${styles.wordClipWrap} mr-[0.22em] text-[#E31E24]`}
                >
                  <span className="js-s2-word inline-block">{w}</span>
                </span>
              ))}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#404040] sm:text-base">
              Tracing key chapters from our 2001 beginnings through campus
              traditions, evolving classroom pedagogy, SAM EDUTOPIA 2026, and
              athletic distinction at the Universal Sportsplex.
            </p>
          </header>

          {/* Continuous Central Vertical Red Spine Container */}
          <div className="js-milestone-track relative pt-2">
            {/* Spine rail: Left-aligned on mobile/tablet, Center on Desktop */}
            <div
              aria-hidden="true"
              className={`${styles.redSpineTrack} pointer-events-none absolute top-0 bottom-0 left-0 w-[44px] sm:w-[74px] lg:left-1/2 lg:w-[116px] lg:-translate-x-1/2`}
            >
              <div
                className={`${styles.tickRuler} absolute top-0 bottom-0 -right-3 w-3 opacity-80 lg:-left-4 lg:right-auto lg:w-4`}
              />
              <div
                className={`${styles.tickRuler} hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:-right-4 lg:w-4 lg:opacity-80`}
              />
              <div
                className={`${styles.redSpineFill} js-spine-fill absolute inset-0`}
              />
              <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[#FFFFFF]/28" />
            </div>

            {/* Alternating Milestone Rows */}
            <div className="relative space-y-14 sm:space-y-20 lg:space-y-28">
              {JOURNEY_MILESTONES.map((item) => {
                const isLeft = item.side === "left";
                return (
                  <article
                    key={item.id}
                    data-side={item.side}
                    className="js-milestone-row relative grid grid-cols-1 items-center gap-5 pl-[58px] sm:gap-6 sm:pl-[98px] lg:grid-cols-12 lg:gap-0 lg:pl-0"
                  >
                    <div
                      aria-hidden="true"
                      className="js-milestone-year pointer-events-none absolute top-2 left-0 z-20 flex w-[44px] flex-col items-center justify-center sm:w-[74px] lg:top-1/2 lg:left-1/2 lg:w-[116px] lg:-translate-x-1/2 lg:-translate-y-1/2"
                    >
                      <span
                        className={`${styles.fontDisplay} block text-xl font-black leading-[0.86] text-[#FFFFFF] sm:text-3xl lg:text-[3.6rem]`}
                      >
                        {item.yearTop}
                      </span>
                      <span
                        className={`${styles.fontDisplay} block text-xl font-black leading-[0.86] text-[#FFFFFF] sm:text-3xl lg:text-[3.6rem]`}
                      >
                        {item.yearBottom}
                      </span>
                    </div>

                    {/* PHOTOGRAPH SIDE */}
                    <div
                      className={`${
                        isLeft
                          ? "lg:col-span-5 lg:col-start-8 lg:pl-16"
                          : "lg:col-span-5 lg:col-start-1 lg:pr-16"
                      }`}
                    >
                      <figure className="photoFrame js-milestone-mask relative border border-[#D8D8D8] bg-[#FFFFFF] p-2 sm:p-2.5 shadow-[0_16px_34px_rgba(23,23,23,0.08)]">
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            sizes="(max-width: 1023px) 78vw, 38vw"
                            className={`${styles.docGrayscale} object-cover`}
                          />
                          <div className="pointer-events-none absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-[#E31E24]" />
                          <div className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-[#E31E24]" />
                        </div>
                        <figcaption
                          className={`${styles.fontMono} mt-2.5 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.15em] text-[#4A4A4A]`}
                        >
                          <span>{item.caption}</span>
                          <span className="font-bold text-[#E31E24]">
                            {item.dateLabel}
                          </span>
                        </figcaption>
                      </figure>
                    </div>

                    {/* COPY CARD SIDE */}
                    <div
                      className={`js-milestone-card ${
                        isLeft
                          ? "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-16 lg:text-right"
                          : "lg:col-span-5 lg:col-start-8 lg:pl-16"
                      }`}
                    >
                      <div className="border border-[#D8D8D8] bg-[#FFFFFF] p-4 shadow-[0_12px_28px_rgba(23,23,23,0.05)] sm:p-7">
                        <div
                          className={`js-milestone-stagger flex flex-wrap items-center gap-2.5 ${
                            isLeft ? "lg:justify-end" : ""
                          }`}
                        >
                          <span
                            className={`${styles.fontMono} border border-[#E31E24] bg-[#E31E24] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFFFFF]`}
                          >
                            {item.dateLabel}
                          </span>
                          <span
                            className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.16em] text-[#4A4A4A]`}
                          >
                            {item.category}
                          </span>
                        </div>

                        <h3
                          className={`${styles.fontDisplay} js-milestone-stagger mt-3.5 text-3xl font-black uppercase leading-[0.94] text-[#171717] sm:text-4xl`}
                        >
                          {item.titlePrefix}{" "}
                          <span className="text-[#E31E24]">
                            {item.titleHighlight}
                          </span>
                        </h3>

                        <p className="js-milestone-stagger mt-3.5 text-sm leading-relaxed text-[#404040] sm:text-[15px]">
                          {item.summary}
                        </p>

                        <ul
                          className={`js-milestone-stagger mt-4 space-y-2 border-t border-[#D8D8D8] pt-3.5 text-xs leading-relaxed text-[#171717] sm:text-[13px] ${
                            isLeft ? "lg:ml-auto lg:max-w-md" : ""
                          }`}
                        >
                          {item.details.map((bullet) => (
                            <li
                              key={bullet}
                              className={`flex items-start gap-2.5 ${
                                isLeft ? "lg:flex-row-reverse lg:text-right" : ""
                              }`}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#E31E24]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03 – GROWING TOGETHER (Restored Editorial Monochrome Grid)
          ==================================================================== */}
      <section
        id="growing-together"
        aria-labelledby="s3-heading"
        className="scroll-mt-[96px] border-b border-[#D8D8D8] bg-[#FFFFFF] pt-16 pb-20 sm:pt-24 sm:pb-28"
      >
        <div className="mx-auto max-w-[1440px] pl-[58px] pr-4 sm:pl-[76px] sm:pr-8 lg:px-16">
          <header className="grid grid-cols-1 gap-6 border-b border-[#D8D8D8] pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="inline-block h-[3px] w-10 bg-[#E31E24]" />
                <span
                  className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.22em] text-[#E31E24]`}
                >
                  CHAPTER 03 · STUDENTS, EDUCATORS &amp; CAMPUS COMMUNITY
                </span>
              </div>

              <h2
                id="s3-heading"
                className={`${styles.fontDisplay} mt-3 text-[clamp(2.6rem,5.8vw,5.25rem)] font-black uppercase leading-[0.92] text-[#171717]`}
              >
                {["GROWING", "TOGETHER"].map((w) => (
                  <span key={w} className={`${styles.wordClipWrap} mr-[0.22em]`}>
                    <span className="js-s3-word inline-block">{w}</span>
                  </span>
                ))}
                <span className="block">
                  {["A", "JOURNEY", "BUILT", "BY", "MANY."].map((w) => (
                    <span
                      key={w}
                      className={`${styles.wordClipWrap} mr-[0.22em] text-[#E31E24]`}
                    >
                      <span className="js-s3-word inline-block">{w}</span>
                    </span>
                  ))}
                </span>
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-[#404040] sm:text-base lg:col-span-4">
              Guided by dedicated faculty across classrooms, fine arts, reading
              circles, and sports grounds—every learner grows in companionship
              and care.
            </p>
          </header>

          {/* Asymmetric Overlapping Feature Spread */}
          <div className="js-s3-feature-wrap relative mt-12 grid grid-cols-1 items-center gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-0">
            <figure className="photoFrame js-s3-parallax-a border border-[#D8D8D8] bg-[#F7F5F0] p-3 shadow-[0_18px_40px_rgba(23,23,23,0.08)] lg:col-span-8 lg:col-start-1">
              <div className="js-s3-mask relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={GROWING_TOGETHER_FEATURE.image}
                  alt={GROWING_TOGETHER_FEATURE.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 60vw"
                  className={`${styles.docGrayscale} object-cover`}
                  style={{
                    objectPosition: GROWING_TOGETHER_FEATURE.objectPosition,
                  }}
                />
                <div className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-[#E31E24]" />
              </div>

              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#D8D8D8] pt-2.5">
                <div>
                  <span
                    className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#E31E24]`}
                  >
                    {GROWING_TOGETHER_FEATURE.index} ·{" "}
                    {GROWING_TOGETHER_FEATURE.category}
                  </span>
                  <h3
                    className={`${styles.fontDisplay} mt-0.5 text-2xl font-bold uppercase text-[#171717]`}
                  >
                    {GROWING_TOGETHER_FEATURE.title}
                  </h3>
                </div>
                <p className="max-w-md text-xs leading-relaxed text-[#404040]">
                  {GROWING_TOGETHER_FEATURE.caption}
                </p>
              </figcaption>
            </figure>

            <figure className="photoFrame js-s3-parallax-b relative z-10 border border-[#E31E24] bg-[#FFFFFF] p-3 shadow-[0_22px_48px_rgba(23,23,23,0.14)] lg:col-span-5 lg:col-start-8 lg:-ml-16">
              <div className="js-s3-mask relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={GROWING_TOGETHER_OVERLAP.image}
                  alt={GROWING_TOGETHER_OVERLAP.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 38vw"
                  className={`${styles.docGrayscale} object-cover`}
                  style={{
                    objectPosition: GROWING_TOGETHER_OVERLAP.objectPosition,
                  }}
                />
              </div>

              <figcaption className="mt-3 border-t border-[#D8D8D8] pt-2.5">
                <span
                  className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#E31E24]`}
                >
                  {GROWING_TOGETHER_OVERLAP.index} ·{" "}
                  {GROWING_TOGETHER_OVERLAP.category}
                </span>
                <h3
                  className={`${styles.fontDisplay} mt-1 text-2xl font-bold uppercase text-[#171717]`}
                >
                  {GROWING_TOGETHER_OVERLAP.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#404040]">
                  {GROWING_TOGETHER_OVERLAP.caption}
                </p>
              </figcaption>
            </figure>
          </div>

          {/* 6-Panel Asymmetric Monochrome School Photography Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-8">
            {GROWING_TOGETHER_GALLERY.map((photo, idx) => {
              const desktopSpanMap = [
                "lg:col-span-7",
                "lg:col-span-5 lg:mt-10",
                "lg:col-span-5",
                "lg:col-span-7 lg:mt-10",
                "lg:col-span-6",
                "lg:col-span-6 lg:mt-8",
              ];
              const desktopCols = desktopSpanMap[idx] ?? "lg:col-span-6";

              return (
                <figure
                  key={photo.id}
                  className={`js-s3-card photoFrame border border-[#D8D8D8] bg-[#F7F5F0] p-2.5 shadow-[0_12px_28px_rgba(23,23,23,0.06)] ${desktopCols}`}
                >
                  <div
                    className={`js-s3-mask relative ${photo.aspectClass} w-full overflow-hidden border-b border-[#E31E24]`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.imageAlt}
                      fill
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
                      className={`${styles.docGrayscale} object-cover`}
                      style={{ objectPosition: photo.objectPosition ?? "center" }}
                    />
                  </div>

                  <figcaption className="px-1.5 pt-3 pb-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`${styles.fontMono} text-[10px] font-bold uppercase tracking-[0.18em] text-[#E31E24]`}
                      >
                        {photo.index} · {photo.category}
                      </span>
                      <span className="h-px flex-1 bg-[#D8D8D8]" />
                    </div>
                    <h3
                      className={`${styles.fontDisplay} mt-1.5 text-2xl font-bold uppercase leading-tight text-[#171717]`}
                    >
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#404040]">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 04 – THE JOURNEY CONTINUES
          ==================================================================== */}
      <section
        id="the-journey-continues"
        aria-labelledby="s4-heading"
        className="scroll-mt-[96px] bg-[#171717] text-[#FFFFFF]"
      >
        <div className="relative mx-auto max-w-[1600px] overflow-hidden">
          <div className="js-s4-mask relative h-[540px] w-full overflow-hidden sm:h-[640px] lg:h-[780px]">
            <div className="js-s4-photo-zoom relative h-full w-full will-change-transform">
              <Image
                src="/img/s6.JPG"
                alt="SAM Universe School students walking naturally across the sunlit campus beside the school coaches"
                fill
                sizes="100vw"
                className={`${styles.finalePhoto} object-cover object-center`}
              />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(23,23,23,0.52) 0%, rgba(23,23,23,0.18) 38%, rgba(23,23,23,0.86) 86%, rgba(23,23,23,0.96) 100%)",
              }}
            />

            <div className="absolute inset-0 z-10 mx-auto flex max-w-[1440px] flex-col justify-between py-10 pl-[58px] pr-4 sm:py-14 sm:pl-[76px] sm:pr-8 lg:px-16 lg:py-16">
              <div className="js-s4-fade flex flex-wrap items-center justify-between gap-3 border-b border-[#FFFFFF]/25 pb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-[3px] w-10 bg-[#E31E24]" />
                  <span
                    className={`${styles.fontMono} text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFFFFF]`}
                  >
                    CHAPTER 04 · THE JOURNEY CONTINUES
                  </span>
                </div>
                <span
                  className={`${styles.fontMono} text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8D8D8]`}
                >
                  KEELAMATHUR · MADURAI · SINCE 2001
                </span>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div>
                  <p
                    className={`${styles.fontMono} js-s4-fade mb-3 border-l-2 border-[#E31E24] pl-3 text-xs font-bold uppercase tracking-[0.22em] text-[#FFFFFF]`}
                  >
                    SRI AUROBINDO MIRA UNIVERSAL SCHOOL
                  </p>

                  <h2
                    id="s4-heading"
                    className={`${styles.fontDisplay} text-[clamp(2.8rem,6.8vw,6.2rem)] font-black uppercase leading-[0.9] text-[#FFFFFF]`}
                  >
                    {["THE", "BEST", "IS"].map((w) => (
                      <span
                        key={w}
                        className={`${styles.wordClipWrap} mr-[0.2em]`}
                      >
                        <span className="js-s4-word inline-block">{w}</span>
                      </span>
                    ))}
                    <span className="mt-1 inline-flex flex-wrap bg-[#E31E24] px-3 py-0.5 text-[#FFFFFF]">
                      {["YET", "TO", "COME."].map((w) => (
                        <span
                          key={w}
                          className={`${styles.wordClipWrap} mr-[0.18em] last:mr-0`}
                        >
                          <span className="js-s4-word inline-block">{w}</span>
                        </span>
                      ))}
                    </span>
                  </h2>

                  <p className="js-s4-fade mt-4 max-w-xl text-sm leading-relaxed text-[#FFFFFF]/90 sm:text-base">
                    Rooted in Madurai and guided by integral education, Sri
                    Aurobindo Mira Universal School continues preparing confident,
                    compassionate, and capable learners for what lies ahead.
                  </p>
                </div>

                <div className="js-s4-fade flex flex-wrap items-center gap-4">
                  <Link
                    href="/about-us"
                    className={`${styles.fontMono} group inline-flex items-center gap-3 border border-[#E31E24] bg-[#E31E24] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#FFFFFF] transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF]`}
                  >
                    <span>EXPLORE OUR SCHOOL</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
