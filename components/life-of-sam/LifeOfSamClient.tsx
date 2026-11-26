"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import styles from "./LifeOfSamPage.module.css";
import { losBody, losCondensed, losMono } from "./typography";
import { DAY_IN_LIFE_CHAPTERS } from "./lifeOfSamData";
import LifeOfSam3DStage, { type LifeOfSamScrollState } from "./LifeOfSam3DStage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CHAPTER_NAV = [
  { id: "day-01-morning",    label: "01", title: "Morning"    },
  { id: "day-02-classrooms", label: "02", title: "Classrooms" },
  { id: "day-03-friendships",label: "03", title: "Friendships"},
  { id: "day-04-beyond",     label: "04", title: "Outdoors"   },
  { id: "day-05-talent",     label: "05", title: "Talent"     },
  { id: "day-06-moments",    label: "06", title: "Moments"    },
  { id: "day-07-finale",     label: "07", title: "Life at SAM"},
];

/* ─── Word-reveal splitter ─── */
function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
          <span className={`doc-word inline-block ${className}`}>{word}</span>
        </span>
      ))}
    </>
  );
}

/* ─── Cinematic time-of-day badge ─── */
function TimeBadge({ time, light = false }: { time: string; light?: boolean }) {
  return (
    <span
      className={`${styles.monoTag} ${styles.timeBadge} ${light ? styles.timeBadgeLight : styles.timeBadgeDark} inline-flex items-center gap-2 text-[10px] tracking-[0.18em]`}
    >
      <span className={styles.timeDot} />
      {time}
    </span>
  );
}

export default function LifeOfSamClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const scrollStateRef = useRef<LifeOfSamScrollState>({
    globalProgress: 0,
    morningProgress: 0,
    classroomsProgress: 0,
    friendshipsProgress: 0,
    beyondProgress: 0,
    talentProgress: 0,
    momentsProgress: 0,
    finaleProgress: 0,
  });

  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReducedMotion(mqReduce.matches);
      setIsMobile(mqMobile.matches);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mqReduce.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion: prefersReduced } = context.conditions ?? {
            isDesktop: true,
            reduceMotion: false,
          };

          /* ── Global scroll progress tracker ── */
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              scrollStateRef.current.globalProgress = self.progress;
            },
          });

          /* ── Chapter rail sync ── */
          CHAPTER_NAV.forEach((chap, idx) => {
            ScrollTrigger.create({
              id: `doc-nav-${chap.id}`,
              trigger: `#${chap.id}`,
              start: idx === 0 ? "top top" : "top 48%",
              end: idx === CHAPTER_NAV.length - 1 ? "bottom bottom" : "bottom 48%",
              onToggle: (self) => { if (self.isActive) setActiveChapter(idx); },
            });
          });

          if (prefersReduced) {
            scrollStateRef.current.morningProgress = 1;
            return;
          }

          /* ════════════════════════════════════════════
             01 — MORNING: Cinematic pinned hero
             ════════════════════════════════════════════ */
          const morningTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#day-01-morning",
              start: "top top",
              end: isDesktop ? "+=120%" : "+=70%",
              pin: true,
              scrub: 0.9,
              onUpdate: (self) => { scrollStateRef.current.morningProgress = self.progress; },
            },
          });

          morningTl
            .fromTo("#day-01-morning .los-hero-photo",
              { scale: 1.18, filter: "brightness(0.72)" },
              { scale: 1,    filter: "brightness(1)",   ease: "none", duration: 1 }
            )
            .fromTo("#day-01-morning .doc-word",
              { yPercent: 108, opacity: 0.2 },
              { yPercent: 0,   opacity: 1, stagger: 0.065, duration: 0.55 },
              0
            )
            .fromTo("#day-01-morning .los-hero-sub",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.4 },
              0.4
            )
            .fromTo("#day-01-morning .los-hero-cta",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.35 },
              0.6
            );

          /* ════════════════════════════════════════════
             02 — CLASSROOMS: Clip-path reveal + word cascade
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-02-classrooms",
            start: "top 85%",
            end: "bottom 20%",
            onUpdate: (self) => { scrollStateRef.current.classroomsProgress = self.progress; },
          });

          gsap.fromTo("#day-02-classrooms .los-clip-reveal",
            { clipPath: "inset(8% 8% 8% 8% round 32px)", scale: 1.1 },
            {
              clipPath: "inset(0% 0% 0% 0% round 32px)", scale: 1,
              scrollTrigger: { trigger: "#day-02-classrooms", start: "top 80%", end: "top 20%", scrub: 0.85 },
            }
          );

          gsap.fromTo("#day-02-classrooms .doc-word",
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0, opacity: 1, stagger: 0.055,
              scrollTrigger: { trigger: "#day-02-classrooms", start: "top 78%", end: "top 38%", scrub: 0.75 },
            }
          );

          gsap.fromTo("#day-02-classrooms .los-body-reveal",
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1,
              scrollTrigger: { trigger: "#day-02-classrooms", start: "top 68%", end: "top 30%", scrub: 0.7 },
            }
          );

          /* ════════════════════════════════════════════
             03 — FRIENDSHIPS: Layered parallax reveal
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-03-friendships",
            start: "top 85%",
            end: "bottom 20%",
            onUpdate: (self) => { scrollStateRef.current.friendshipsProgress = self.progress; },
          });

          gsap.fromTo("#day-03-friendships .los-parallax-bg",
            { y: isDesktop ? 80 : 32 },
            {
              y: isDesktop ? -60 : -20, ease: "none",
              scrollTrigger: {
                trigger: "#day-03-friendships", start: "top bottom", end: "bottom top", scrub: 1.0,
              },
            }
          );

          gsap.fromTo("#day-03-friendships .los-parallax-fg",
            { y: isDesktop ? 40 : 16, opacity: 0 },
            {
              y: 0, opacity: 1,
              scrollTrigger: { trigger: "#day-03-friendships", start: "top 75%", end: "top 30%", scrub: 0.8 },
            }
          );

          gsap.fromTo("#day-03-friendships .doc-word",
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0, opacity: 1, stagger: 0.06,
              scrollTrigger: { trigger: "#day-03-friendships", start: "top 72%", end: "top 32%", scrub: 0.7 },
            }
          );

          /* ════════════════════════════════════════════
             04 — BEYOND: Staggered photo reveal
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-04-beyond",
            start: "top 85%",
            end: "bottom 20%",
            onUpdate: (self) => { scrollStateRef.current.beyondProgress = self.progress; },
          });

          gsap.fromTo("#day-04-beyond .los-sport-photo",
            { y: 60, scale: 1.08, autoAlpha: 0.1 },
            {
              y: 0, scale: 1, autoAlpha: 1, stagger: 0.18,
              scrollTrigger: { trigger: "#day-04-beyond", start: "top 80%", end: "top 25%", scrub: 0.85 },
            }
          );

          /* ════════════════════════════════════════════
             05 — TALENT: Staggered frame ascent
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-05-talent",
            start: "top 85%",
            end: "bottom 20%",
            onUpdate: (self) => { scrollStateRef.current.talentProgress = self.progress; },
          });

          gsap.fromTo("#day-05-talent .los-talent-frame",
            { y: 72, scale: 1.07, autoAlpha: 0.15 },
            {
              y: 0, scale: 1, autoAlpha: 1, stagger: 0.16,
              scrollTrigger: { trigger: "#day-05-talent", start: "top 80%", end: "top 26%", scrub: 0.85 },
            }
          );

          /* ════════════════════════════════════════════
             06 — MOMENTS: Horizontal drift + fade in
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-06-moments",
            start: "top 85%",
            end: "bottom 20%",
            onUpdate: (self) => { scrollStateRef.current.momentsProgress = self.progress; },
          });

          gsap.fromTo("#day-06-moments .los-reel-strip",
            { xPercent: isDesktop ? 5 : 0, scale: 1.03 },
            {
              xPercent: isDesktop ? -5 : 0, scale: 1, ease: "none",
              scrollTrigger: {
                trigger: "#day-06-moments", start: "top 85%", end: "bottom 18%", scrub: 1.0,
              },
            }
          );

          gsap.fromTo("#day-06-moments .los-moment-card",
            { y: 48, autoAlpha: 0, scale: 1.04 },
            {
              y: 0, autoAlpha: 1, scale: 1, stagger: 0.14,
              scrollTrigger: { trigger: "#day-06-moments", start: "top 80%", end: "top 30%", scrub: 0.8 },
            }
          );

          /* ════════════════════════════════════════════
             07 — FINALE: Upward scale reveal
             ════════════════════════════════════════════ */
          ScrollTrigger.create({
            trigger: "#day-07-finale",
            start: "top 85%",
            end: "bottom bottom",
            onUpdate: (self) => { scrollStateRef.current.finaleProgress = self.progress; },
          });

          gsap.fromTo("#day-07-finale .los-finale-photo",
            { scale: 1.14, filter: "brightness(0.68)" },
            {
              scale: 1, filter: "brightness(1)",
              scrollTrigger: { trigger: "#day-07-finale", start: "top 86%", end: "top 28%", scrub: 0.85 },
            }
          );

          gsap.fromTo("#day-07-finale .doc-word",
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0, opacity: 1, stagger: 0.07,
              scrollTrigger: { trigger: "#day-07-finale", start: "top 80%", end: "top 38%", scrub: 0.75 },
            }
          );
        },
        rootRef
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleJump = (id: string, idx: number) => {
    setActiveChapter(idx);
    if (id === "day-01-morning") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80);
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const c = DAY_IN_LIFE_CHAPTERS;

  return (
    <div
      ref={rootRef}
      className={`${styles.losDocRoot} ${losCondensed.variable} ${losBody.variable} ${losMono.variable}`}
    >
      {/* ── Fixed 3D Stage ── */}
      <LifeOfSam3DStage
        scrollStateRef={scrollStateRef}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
        className={styles.stageWrap}
      />

      {/* ── Chapter Rail (right side) ── */}
      <nav className={styles.progressRail} aria-label="A Day in the Life of SAM chapters">
        {CHAPTER_NAV.map((item, idx) => {
          const active = idx === activeChapter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleJump(item.id, idx)}
              className={`${styles.railItem} ${active ? styles.railItemActive : ""}`}
              title={item.title}
              aria-label={`Jump to ${item.title}`}
            >
              <span className={styles.railNum}>{item.label}</span>
              <span className={styles.railTitle}>{item.title}</span>
            </button>
          );
        })}
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          01 — THE MORNING BEGINS
          Full-screen cinematic hero, pinned + scrubbed
         ═══════════════════════════════════════════════════════════ */}
      <section
        id={c.morning.id}
        className={`${styles.section} ${styles.section01} min-h-[100svh] flex flex-col justify-end`}
      >
        {/* Full-bleed background photo */}
        <div className={`${styles.heroImageWrap} los-hero-photo`}>
          <Image
            src={c.morning.primaryImage}
            alt={c.morning.primaryAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className={styles.heroOverlay} />
        </div>

        {/* Morning tint vignette */}
        <div className={styles.morningVignette} aria-hidden="true" />

        {/* Content: bottom-left stacked cinematic text */}
        <div className={`${styles.container} relative z-10 pb-16 sm:pb-24`}>
          <div className="max-w-5xl">
            <TimeBadge time={c.morning.timeOfDay} light />

            <h1 className={`${styles.displayHeading} ${styles.heroHeading} mt-6 text-[#FAF7F0]`}>
              <SplitWords text={c.morning.heading} />
            </h1>

            <p className={`${styles.heroParagraph} los-hero-sub text-[#D9F0FB]/90 mt-5 max-w-2xl`}>
              {c.morning.lead}
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-8 los-hero-cta">
              <button
                type="button"
                onClick={() => handleJump(c.classrooms.id, 1)}
                className={`${styles.ctaButton} px-8 py-4 inline-flex items-center gap-3`}
              >
                <span>BEGIN THE DAY</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`${styles.monoTag} text-xs text-[#7EE0B5] hidden sm:block`}>
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>
        </div>

        {/* Bus thumbnail anchor – bottom right */}
        <div className={`${styles.busThumbnail} hidden lg:block`}>
          <Image
            src={c.morning.busImage}
            alt={c.morning.busAlt}
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>

        {/* Chapter counter */}
        <div className={`${styles.chapterCounter} los-hero-sub`}>
          <span className={styles.monoTag}>01 / 07</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          02 — INSIDE OUR CLASSROOMS
          Ivory — left-col large photo (clip reveal), right-col copy
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.classrooms.id} className={`${styles.section} ${styles.section02}`}>
        <div className={styles.container}>
          {/* Asymmetric 7-5 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Large photo */}
            <div className="lg:col-span-7 relative">
              <div className="los-clip-reveal relative aspect-[16/11] w-full overflow-hidden rounded-[32px] shadow-[0_48px_96px_-28px_rgba(5,15,32,0.28)]">
                <Image
                  src={c.classrooms.primaryImage}
                  alt={c.classrooms.primaryAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 56vw"
                  className="object-cover"
                />
              </div>
              {/* Floating secondary photo */}
              <div className="hidden lg:block absolute -bottom-10 -right-8 w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[3px] border-white/60">
                <Image
                  src={c.classrooms.secondaryImage!}
                  alt={c.classrooms.secondaryAlt!}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-5 space-y-6">
              <TimeBadge time={c.classrooms.timeOfDay} />

              <h2 className={`${styles.displayHeading} ${styles.sectionHeading} text-[#0B1A2E]`}>
                <SplitWords text={c.classrooms.heading} />
              </h2>

              <div className="los-body-reveal space-y-4">
                <p className="text-xl font-semibold text-[#1A2B42] leading-snug">
                  {c.classrooms.lead}
                </p>
                <p className="text-base text-[#3A4E68] leading-relaxed">
                  {c.classrooms.body}
                </p>
              </div>

              {/* Decorative rule */}
              <div className="los-body-reveal flex items-center gap-4 pt-2">
                <div className="h-px flex-1 bg-gradient-to-r from-[#6EC1E4]/60 to-transparent" />
                <span className={`${styles.monoTag} text-[10px] text-[#6EC1E4]`}>WHERE CURIOSITY LIVES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          03 — FRIENDSHIPS & CONNECTIONS
          Deep midnight — full-width stacked with parallax layers
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.friendships.id} className={`${styles.section} ${styles.section03}`}>
        <div className={styles.container}>
          {/* Section label row */}
          <div className="flex items-start justify-between gap-8 mb-10 sm:mb-14">
            <div className="space-y-5 max-w-2xl">
              <TimeBadge time={c.friendships.timeOfDay} light />
              <h2 className={`${styles.displayHeading} ${styles.sectionHeadingLg} text-[#FAF7F0]`}>
                <SplitWords text={c.friendships.heading} />
              </h2>
            </div>
            <p className="hidden lg:block text-base text-[#D9F0FB]/80 leading-relaxed max-w-sm pt-16">
              {c.friendships.body}
            </p>
          </div>

          {/* Layered image composition */}
          <div className="relative">
            {/* Primary large photo (parallax bg) */}
            <div className="los-parallax-bg relative aspect-[21/9] w-full overflow-hidden rounded-[28px] shadow-[0_56px_112px_-32px_rgba(0,0,0,0.6)]">
              <Image
                src={c.friendships.primaryImage}
                alt={c.friendships.primaryAlt}
                fill
                sizes="(max-width:1024px) 100vw, 85vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071021]/50 via-transparent to-transparent" />
            </div>

            {/* Foreground floating photo (parallax fg) */}
            <div className="los-parallax-fg absolute -bottom-8 right-8 w-72 sm:w-96 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[3px] border-[#FAF7F0]/20 hidden sm:block">
              <Image
                src={c.friendships.secondaryImage!}
                alt={c.friendships.secondaryAlt!}
                fill
                sizes="384px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile body copy */}
          <p className="lg:hidden mt-8 text-base text-[#D9F0FB]/80 leading-relaxed">
            {c.friendships.body}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          04 — BEYOND THE CLASSROOM
          Sky-mint — headline spans full width, 3-photo mosaic below
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.beyond.id} className={`${styles.section} ${styles.section04}`}>
        <div className={styles.container}>
          {/* Full-width headline */}
          <div className="mb-10 sm:mb-14">
            <TimeBadge time={c.beyond.timeOfDay} />
            <h2 className={`${styles.displayHeading} ${styles.sectionHeadingXl} text-[#0A1829] mt-5`}>
              {c.beyond.heading}
            </h2>
          </div>

          {/* Body copy + photo mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Copy column */}
            <div className="lg:col-span-4 space-y-5">
              <p className="text-xl font-semibold text-[#122235] leading-snug">{c.beyond.lead}</p>
              <p className="text-base text-[#2C4157] leading-relaxed">{c.beyond.body}</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-px bg-[#7EE0B5]" />
                <span className={`${styles.monoTag} text-[10px] text-[#7EE0B5]`}>HEALTH · MOTION · NATURE</span>
              </div>
            </div>

            {/* 3-photo mosaic */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-4 items-stretch">
              {/* Large primary */}
              <div className="los-sport-photo col-span-2 sm:col-span-1 relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_32px_64px_-20px_rgba(0,0,0,0.3)]">
                <Image
                  src={c.beyond.primaryImage}
                  alt={c.beyond.primaryAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              {/* Stack of 2 */}
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
                <div className="los-sport-photo relative aspect-[16/9] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.25)]">
                  <Image
                    src={c.beyond.secondaryImage!}
                    alt={c.beyond.secondaryAlt!}
                    fill
                    sizes="(max-width:1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="los-sport-photo relative aspect-[16/9] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.25)]">
                  <Image
                    src={c.beyond.tertiaryImage!}
                    alt={c.beyond.tertiaryAlt!}
                    fill
                    sizes="(max-width:1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          05 — DISCOVER YOUR TALENT
          Ivory-warm — centred headline, asymmetric 3-photo masonry
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.talent.id} className={`${styles.section} ${styles.section05}`}>
        <div className={styles.container}>
          {/* Header */}
          <div className="mb-10 sm:mb-14 max-w-3xl">
            <TimeBadge time={c.talent.timeOfDay} />
            <h2 className={`${styles.displayHeading} ${styles.sectionHeadingLg} text-[#0A1829] mt-5`}>
              {c.talent.heading}
            </h2>
            <p className="text-lg text-[#2C4157] leading-relaxed mt-4">{c.talent.lead}</p>
          </div>

          {/* Masonry layout: tall-left, stacked-right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Art — tall portrait */}
            <div className="los-talent-frame lg:col-span-4 relative aspect-[3/4] lg:aspect-auto overflow-hidden rounded-[28px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.26)]" style={{ minHeight: 320 }}>
              <Image
                src={c.talent.artImage}
                alt={c.talent.artAlt}
                fill
                sizes="(max-width:1024px) 100vw, 32vw"
                className="object-cover"
              />
              <div className={styles.photoCaption}>
                <span className={styles.monoTag}>Art Studio</span>
              </div>
            </div>

            {/* Dance + Lab stacked */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="los-talent-frame relative aspect-[16/9] overflow-hidden rounded-[28px] shadow-[0_32px_64px_-20px_rgba(0,0,0,0.22)]">
                <Image
                  src={c.talent.danceImage}
                  alt={c.talent.danceAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className={styles.photoCaption}>
                  <span className={styles.monoTag}>Dance & Performance</span>
                </div>
              </div>

              {/* Lab + copy side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                <div className="los-talent-frame relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.2)]">
                  <Image
                    src={c.talent.labImage}
                    alt={c.talent.labAlt}
                    fill
                    sizes="(max-width:640px) 100vw, 28vw"
                    className="object-cover"
                  />
                  <div className={styles.photoCaption}>
                    <span className={styles.monoTag}>Science Lab</span>
                  </div>
                </div>
                <div className="los-talent-frame flex items-center bg-[#E8F4F9] rounded-[24px] p-6 sm:p-8">
                  <p className="text-[#1A2B42] font-semibold text-base leading-relaxed">
                    {c.talent.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          06 — MOMENTS TO REMEMBER
          Deep midnight — drifting reel of 4 cinematic portraits
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.moments.id} className={`${styles.section} ${styles.section06}`}>
        <div className={styles.container}>
          <div className="mb-10 sm:mb-14">
            <TimeBadge time={c.moments.timeOfDay} light />
            <h2 className={`${styles.displayHeading} ${styles.sectionHeadingLg} text-[#FAF7F0] mt-5`}>
              {c.moments.heading}
            </h2>
            <p className="text-lg text-[#D9F0FB]/85 leading-relaxed mt-4 max-w-2xl">
              {c.moments.lead}
            </p>
          </div>

          {/* Gallery reel */}
          <div className="los-reel-strip grid grid-cols-2 lg:grid-cols-4 gap-4">
            {c.moments.gallery.map((item) => (
              <figure key={item.src} className="los-moment-card space-y-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] shadow-[0_28px_56px_-18px_rgba(0,0,0,0.65)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width:640px) 48vw, (max-width:1024px) 46vw, 22vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071021]/70 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                    <span className={`${styles.monoTag} text-[9px] text-[#D9F0FB]/90`}>{item.caption}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          07 — THIS IS LIFE AT SAM
          Full-bleed campus photo + inspiring finale copy
         ═══════════════════════════════════════════════════════════ */}
      <section id={c.finale.id} className={`${styles.section} ${styles.section07} min-h-[90svh] flex flex-col justify-end`}>
        {/* Background campus photograph */}
        <div className={`${styles.heroImageWrap} los-finale-photo`}>
          <Image
            src={c.finale.primaryImage}
            alt={c.finale.primaryAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className={styles.finaleOverlay} />
        </div>

        <div className={`${styles.container} relative z-10 pb-20 sm:pb-32`}>
          <div className="max-w-4xl">
            <TimeBadge time={c.finale.timeOfDay} light />

            <h2 className={`${styles.displayHeading} ${styles.finaleHeading} text-[#FAF7F0] mt-6`}>
              <SplitWords text={c.finale.heading} />
            </h2>

            <p className="text-lg sm:text-xl text-[#D9F0FB]/90 leading-relaxed max-w-2xl mt-6 font-medium">
              {c.finale.lead}
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-10">
              <Link
                href="/about-us"
                className={`${styles.ctaButton} px-8 py-4 inline-flex items-center gap-3 text-sm font-black tracking-wide`}
              >
                <span>EXPLORE OUR SCHOOL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact-us"
                className={`${styles.ghostButton} px-7 py-4 text-sm font-bold inline-flex items-center gap-2`}
              >
                PLAN A CAMPUS VISIT
              </Link>
            </div>
          </div>
        </div>

        {/* Chapter counter */}
        <div className={`${styles.chapterCounter} ${styles.chapterCounterLight} z-10`}>
          <span className={styles.monoTag}>07 / 07</span>
        </div>
      </section>
    </div>
  );
}
