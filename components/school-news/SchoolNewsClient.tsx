"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Compass,
  Megaphone,
  Palette,
  Sparkles,
  Trophy,
} from "lucide-react";
import styles from "./SchoolNewsPage.module.css";
import { newsBody, newsCondensed, newsMono, newsScript } from "./typography";
import {
  CAMPUS_MOMENTS_COLLAGE,
  NEWS_CATEGORIES,
  SCHOOL_NEWS_ARTICLES,
  UPCOMING_ANNOUNCEMENTS,
  type CampusMomentPhoto,
  type NewsArticle,
  type NewsCategory,
} from "./schoolNewsData";
import SchoolNews3DStage, { type SchoolNewsScrollState } from "./SchoolNews3DStage";
import { BlueprintCompassDecor, PushPin, TornPaperSvgDefs } from "./StationeryArtwork";
import SchoolNewsModal from "./SchoolNewsModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SECTION_NAV = [
  { id: "sec-01-hero", label: "01 Hero" },
  { id: "sec-02-latest", label: "02 Latest" },
  { id: "sec-03-academics", label: "03 Academics" },
  { id: "sec-04-sports", label: "04 Sports" },
  { id: "sec-05-creative", label: "05 Creative" },
  { id: "sec-06-moments", label: "06 Moments" },
  { id: "sec-07-announcements", label: "07 Connect" },
];

function getMaskClass(shape: NewsArticle["maskShape"]) {
  switch (shape) {
    case "torn-a":
      return styles.maskTornA;
    case "torn-b":
      return styles.maskTornB;
    case "torn-c":
      return styles.maskTornC;
    case "torn-d":
      return styles.maskTornD;
  }
}

export default function SchoolNewsClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const scrollStateRef = useRef<SchoolNewsScrollState>({
    globalProgress: 0,
    heroUnfold: 0,
    latestProgress: 0,
    academicsProgress: 0,
    sportsProgress: 0,
    creativeProgress: 0,
    momentsProgress: 0,
    announcementsProgress: 0,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<CampusMomentPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"All" | NewsCategory>("All");
  const [showAllArchive, setShowAllArchive] = useState(false);
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

  const latestArticles = useMemo(
    () => SCHOOL_NEWS_ARTICLES.filter((a) => a.section === "latest"),
    []
  );
  const academicArticles = useMemo(
    () => SCHOOL_NEWS_ARTICLES.filter((a) => a.section === "academics"),
    []
  );
  const sportsArticles = useMemo(
    () => SCHOOL_NEWS_ARTICLES.filter((a) => a.section === "sports"),
    []
  );
  const creativeArticles = useMemo(
    () => SCHOOL_NEWS_ARTICLES.filter((a) => a.section === "creative"),
    []
  );

  const filteredArchiveArticles = useMemo(() => {
    const base =
      selectedCategory === "All"
        ? SCHOOL_NEWS_ARTICLES
        : SCHOOL_NEWS_ARTICLES.filter((a) => a.category === selectedCategory);
    return showAllArchive ? base : base.slice(0, 4);
  }, [selectedCategory, showAllArchive]);

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

          // Global scroll progress tracker for 3D characters moving between sections
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              scrollStateRef.current.globalProgress = self.progress;
            },
          });

          // Active section rail sync across all 7 sections (works for both scroll down & up, and reduced motion)
          SECTION_NAV.forEach((sec, idx) => {
            ScrollTrigger.create({
              id: `nav-${sec.id}`,
              trigger: `#${sec.id}`,
              start: idx === 0 ? "top top" : "top 45%",
              end: idx === SECTION_NAV.length - 1 ? "bottom bottom" : "bottom 45%",
              onToggle: (self) => {
                if (self.isActive) {
                  setActiveSectionIndex(idx);
                }
              },
            });
          });

          if (prefersReduced) {
            scrollStateRef.current.heroUnfold = 1;
            return;
          }

          // SECTION 01: Pinned News Hero — Sharpener & Paper Scroll Unfolding
          const heroTl = gsap.timeline({
            scrollTrigger: {
              id: "st-sec-01-hero",
              trigger: "#sec-01-hero",
              start: "top top",
              end: isDesktop ? "+=115%" : "+=65%",
              pin: true,
              scrub: 0.75,
              onUpdate: (self) => {
                scrollStateRef.current.heroUnfold = self.progress;
              },
            },
          });

          heroTl
            .fromTo(
              ".hero-paper-scroll",
              { scaleX: isDesktop ? 0.72 : 0.88, rotationY: isDesktop ? -22 : -8, y: 24 },
              { scaleX: 1, rotationY: 0, y: 0, ease: "power2.out", duration: 0.55 }
            )
            .fromTo(
              ".hero-oversized-title",
              { scale: isDesktop ? 1.26 : 1.12, y: 18 },
              { scale: 1, y: 0, ease: "power2.out", duration: 0.55 },
              0
            )
            .to(
              ".hero-sharpener-chip",
              { x: isDesktop ? -26 : -10, rotation: -6, scale: 0.92, duration: 0.55 },
              0
            )
            .fromTo(
              ".hero-paper-reveal-item",
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.45 },
              0.22
            );

          // SECTION 02: Latest School News — Dramatic Large-to-Small & Paper Mask Reveal
          ScrollTrigger.create({
            trigger: "#sec-02-latest",
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => setActiveSectionIndex(1),
            onEnterBack: () => setActiveSectionIndex(1),
            onUpdate: (self) => {
              scrollStateRef.current.latestProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-02-latest .section-title-scale",
            { scale: isDesktop ? 1.24 : 1.1, y: 40, autoAlpha: 0.35 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#sec-02-latest",
                start: "top 88%",
                end: "top 30%",
                scrub: 0.7,
              },
            }
          );

          gsap.fromTo(
            "#sec-02-latest .news-card-anim",
            { y: 54, scale: 1.06, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#sec-02-latest .cards-grid",
                start: "top 82%",
                end: "top 34%",
                scrub: 0.75,
              },
            }
          );

          // SECTION 03: Academic Highlights
          ScrollTrigger.create({
            trigger: "#sec-03-academics",
            start: "top 78%",
            end: "bottom 20%",
            onEnter: () => setActiveSectionIndex(2),
            onEnterBack: () => setActiveSectionIndex(2),
            onUpdate: (self) => {
              scrollStateRef.current.academicsProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-03-academics .section-title-scale",
            { scale: isDesktop ? 1.22 : 1.1, x: isDesktop ? -36 : 0, autoAlpha: 0.35 },
            {
              scale: 1,
              x: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#sec-03-academics",
                start: "top 86%",
                end: "top 30%",
                scrub: 0.7,
              },
            }
          );

          gsap.fromTo(
            "#sec-03-academics .acad-card-anim",
            { y: 48, rotation: -1.8, autoAlpha: 0 },
            {
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              stagger: 0.15,
              scrollTrigger: {
                trigger: "#sec-03-academics .cards-grid",
                start: "top 82%",
                end: "top 35%",
                scrub: 0.8,
              },
            }
          );

          // SECTION 04: Sports & Activities
          ScrollTrigger.create({
            trigger: "#sec-04-sports",
            start: "top 78%",
            end: "bottom 20%",
            onEnter: () => setActiveSectionIndex(3),
            onEnterBack: () => setActiveSectionIndex(3),
            onUpdate: (self) => {
              scrollStateRef.current.sportsProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-04-sports .section-title-scale",
            { scale: isDesktop ? 1.25 : 1.1, y: 44, autoAlpha: 0.35 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#sec-04-sports",
                start: "top 88%",
                end: "top 30%",
                scrub: 0.7,
              },
            }
          );

          gsap.fromTo(
            "#sec-04-sports .sports-card-anim",
            { x: (i) => (i % 2 === 0 ? -40 : 40), scale: 1.07, autoAlpha: 0 },
            {
              x: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.14,
              scrollTrigger: {
                trigger: "#sec-04-sports .cards-grid",
                start: "top 82%",
                end: "top 34%",
                scrub: 0.75,
              },
            }
          );

          // SECTION 05: Creative Corner
          ScrollTrigger.create({
            trigger: "#sec-05-creative",
            start: "top 78%",
            end: "bottom 20%",
            onEnter: () => setActiveSectionIndex(4),
            onEnterBack: () => setActiveSectionIndex(4),
            onUpdate: (self) => {
              scrollStateRef.current.creativeProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-05-creative .section-title-scale",
            { scale: isDesktop ? 1.22 : 1.08, rotation: -1.5, autoAlpha: 0.35 },
            {
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#sec-05-creative",
                start: "top 86%",
                end: "top 30%",
                scrub: 0.7,
              },
            }
          );

          gsap.fromTo(
            "#sec-05-creative .creative-cutout-anim",
            { y: 50, scale: 0.92, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.14,
              scrollTrigger: {
                trigger: "#sec-05-creative .cards-grid",
                start: "top 82%",
                end: "top 34%",
                scrub: 0.75,
              },
            }
          );

          // SECTION 06: Campus Moments Collage
          ScrollTrigger.create({
            trigger: "#sec-06-moments",
            start: "top 78%",
            end: "bottom 20%",
            onEnter: () => setActiveSectionIndex(5),
            onEnterBack: () => setActiveSectionIndex(5),
            onUpdate: (self) => {
              scrollStateRef.current.momentsProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-06-moments .moment-polaroid-anim",
            { y: (i) => (i % 2 === 0 ? 54 : -24), scale: 1.08, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.1,
              scrollTrigger: {
                trigger: "#sec-06-moments .moments-grid",
                start: "top 84%",
                end: "top 26%",
                scrub: 0.8,
              },
            }
          );

          // SECTION 07: Announcements
          ScrollTrigger.create({
            trigger: "#sec-07-announcements",
            start: "top 80%",
            end: "bottom bottom",
            onEnter: () => setActiveSectionIndex(6),
            onEnterBack: () => setActiveSectionIndex(6),
            onUpdate: (self) => {
              scrollStateRef.current.announcementsProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#sec-07-announcements .section-title-scale",
            { scale: isDesktop ? 1.2 : 1.08, y: 36, autoAlpha: 0.4 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              scrollTrigger: {
                trigger: "#sec-07-announcements",
                start: "top 88%",
                end: "top 38%",
                scrub: 0.7,
              },
            }
          );
        },
        rootRef
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleJumpToSection = (id: string, idx?: number) => {
    if (typeof idx === "number") {
      setActiveSectionIndex(idx);
    }
    if (id === "sec-01-hero") {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72);
    window.scrollTo({
      top: targetTop,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.newsRoot} ${newsCondensed.variable} ${newsBody.variable} ${newsScript.variable} ${newsMono.variable}`}
    >
      <TornPaperSvgDefs />

      {/* Fixed Blueprint Background */}
      <div className={styles.blueprintBackdrop} aria-hidden="true">
        <div className={styles.blueprintGrid} />
        <BlueprintCompassDecor className="absolute -top-24 -right-24 w-[460px] h-[460px] opacity-25" />
        <BlueprintCompassDecor className="absolute bottom-8 -left-28 w-[380px] h-[380px] opacity-20" />
      </div>

      {/* Persistent Scroll-Driven 3D Cartoon Stationery Stage */}
      <SchoolNews3DStage
        scrollStateRef={scrollStateRef}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
        className={styles.stageCanvasWrap}
      />

      {/* Right-side Section Indicator Rail (Desktop) */}
      <nav className={styles.progressRail} aria-label="School News sections">
        {SECTION_NAV.map((item, idx) => {
          const active = idx === activeSectionIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleJumpToSection(item.id, idx)}
              className={`${styles.monoTag} text-[10px] font-bold px-2.5 py-1 rounded border transition-all cursor-pointer text-right ${
                active
                  ? "bg-[#FFD52A] text-[#111521] border-[#111521] scale-105 shadow-[3px_3px_0_#111521]"
                  : "bg-[#052970]/85 text-[#FDF6E4]/80 border-white/25 hover:border-[#FFD52A]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ============================================================
          SECTION 01 — NEWS HERO: "WHAT'S HAPPENING AT SAM?"
         ============================================================ */}
      <section id="sec-01-hero" className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Red Pencil Sharpener Callout */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <div
                className={`${styles.heroSharpenerBadge} hero-sharpener-chip rounded-2xl p-5 text-white max-w-xs`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={`${styles.monoTag} text-[11px] bg-[#111521] text-[#FFD52A] px-2.5 py-1 rounded`}>
                    SECTION 01 · EDITION 2026
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#e6edf8] border-2 border-[#111521] inline-block" />
                </div>
                <p className={`${styles.displayHeading} text-2xl sm:text-3xl tracking-tight`}>
                  SHARPENER PRESS
                </p>
                <p className="text-xs sm:text-sm text-white/90 mt-1.5 font-medium">
                  Scroll to unroll the parchment chronicle straight from SAM Universe School.
                </p>
              </div>

              <div className={`${styles.yellowPanel} px-4 py-2 rounded-lg inline-flex items-center gap-2 text-xs font-extrabold`}>
                <Sparkles className="w-4 h-4 text-[#E53935]" />
                <span>SCROLL-DRIVEN 3D STORYTELLING</span>
              </div>
            </div>

            {/* Right: Giant Unfolding Parchment Scroll */}
            <div className="lg:col-span-8">
              <div
                className={`${styles.parchmentSheet} ${styles.parchmentCurl} ${styles.heroScrollPaper} hero-paper-scroll p-6 sm:p-10 lg:p-12`}
              >
                <div
                  className={styles.maskingTape}
                  style={{ top: "-13px", left: "12%", transform: "rotate(-3deg)" }}
                />
                <div
                  className={styles.maskingTape}
                  style={{ top: "-12px", right: "10%", transform: "rotate(4deg)" }}
                />

                <div className="flex flex-wrap items-center gap-3 mb-4 hero-paper-reveal-item">
                  <span className={`${styles.redStamp} ${styles.monoTag} text-xs font-bold px-3 py-1 rounded`}>
                    WHAT&apos;S HAPPENING AT SAM?
                  </span>
                  <span className={`${styles.monoTag} text-xs font-bold text-[#073A9B]`}>
                    MADURAI · CBSE INTERNATIONAL
                  </span>
                </div>

                <h1
                  className={`${styles.displayHeading} hero-oversized-title text-[3.4rem] sm:text-[5rem] lg:text-[6.2rem] text-[#111521] mb-4`}
                >
                  SCHOOL{" "}
                  <span className="inline-block bg-[#FFD52A] px-3 py-0.5 border-2 border-[#111521] shadow-[5px_5px_0_#111521]">
                    NEWS
                  </span>
                </h1>

                <p className="hero-paper-reveal-item text-base sm:text-lg text-[#242c3f] font-semibold max-w-2xl leading-relaxed mb-6">
                  Stories of curiosity, campus milestones, student sports, creative arts, and
                  academic breakthroughs at Sri Aurobindo Mira Universal School.
                </p>

                <div className="hero-paper-reveal-item flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleJumpToSection("sec-02-latest")}
                    className={`${styles.redStamp} px-5 py-3 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform cursor-pointer`}
                  >
                    <span>READ LATEST STORIES</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJumpToSection("sec-07-announcements")}
                    className="px-5 py-3 rounded-xl border-2 border-[#111521] bg-white text-[#111521] font-extrabold text-sm hover:bg-[#FFD52A] transition-colors cursor-pointer"
                  >
                    BROWSE ALL CATEGORIES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 02 — LATEST SCHOOL NEWS: "THE LATEST FROM OUR CAMPUS."
         ============================================================ */}
      <section id="sec-02-latest" className={styles.section}>
        <div className={styles.container}>
          <div className="section-title-scale mb-10 sm:mb-14">
            <span className={`${styles.yellowPanel} ${styles.monoTag} inline-block px-3 py-1 text-xs font-extrabold rounded mb-3`}>
              02 · LATEST SCHOOL NEWS
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
              THE LATEST FROM{" "}
              <span className="text-[#FFD52A] underline decoration-[#E53935] decoration-4 underline-offset-8">
                OUR CAMPUS.
              </span>
            </h2>
          </div>

          <div className="cards-grid grid grid-cols-1 lg:grid-cols-12 gap-7">
            {latestArticles.map((article, idx) => {
              const isLead = idx === 0;
              return (
                <article
                  key={article.id}
                  className={`news-card-anim ${styles.parchmentSheet} ${styles.parchmentCurl} ${styles.newsCard} rounded-2xl p-5 sm:p-6 flex flex-col justify-between ${
                    isLead ? "lg:col-span-7" : "lg:col-span-5"
                  }`}
                >
                  <PushPin
                    color={article.accent === "red" ? "red" : article.accent === "orange" ? "orange" : "yellow"}
                    className="absolute -top-3 left-6"
                  />

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pt-1">
                      <span className={`${styles.redStamp} ${styles.monoTag} text-[11px] font-bold px-2.5 py-1 rounded`}>
                        {article.category}
                      </span>
                      <span className={`${styles.monoTag} text-xs font-bold text-[#073A9B] bg-[#073A9B]/10 px-2.5 py-1 rounded`}>
                        {article.dateLabel}
                      </span>
                    </div>

                    {/* Irregular Torn-Paper Masked Photograph */}
                    <div
                      className={`relative w-full ${
                        isLead ? "aspect-[16/10]" : "aspect-[16/11]"
                      } mb-5 bg-[#d9cbb0] ${getMaskClass(article.maskShape)} overflow-hidden`}
                    >
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes={isLead ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 100vw, 38vw"}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <h3 className={`${styles.displayHeading} text-2xl sm:text-3xl text-[#111521] mb-2`}>
                      {article.headline}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#E53935] mb-2">
                      {article.subhead}
                    </p>
                    <p className="text-sm sm:text-base text-[#2d3548] leading-relaxed font-medium mb-4">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="self-start inline-flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg bg-[#111521] text-[#FFD52A] hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>READ FULL STORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 03 — ACADEMIC HIGHLIGHTS: "IDEAS THAT INSPIRE."
         ============================================================ */}
      <section id="sec-03-academics" className={styles.section}>
        <div className={styles.container}>
          <div className="section-title-scale flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className={`${styles.redStamp} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded mb-3`}>
                <BookOpen className="w-3.5 h-3.5" />
                03 · ACADEMIC HIGHLIGHTS
              </span>
              <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
                IDEAS THAT <span className="text-[#FFD52A]">INSPIRE.</span>
              </h2>
            </div>
            <p className={`${styles.scriptNote} text-2xl sm:text-3xl text-[#FFD52A] max-w-md`}>
              Classroom curiosity, science labs, reading corners &amp; global pedagogy.
            </p>
          </div>

          <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicArticles.map((article) => (
              <article
                key={article.id}
                className={`acad-card-anim ${styles.parchmentSheet} ${styles.newsCard} rounded-2xl p-5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`${styles.yellowPanel} ${styles.monoTag} text-[10px] font-extrabold px-2.5 py-0.5 rounded`}>
                      {article.badgeText || "ACADEMICS"}
                    </span>
                    <span className={`${styles.monoTag} text-[11px] text-[#313a4f] font-semibold`}>
                      {article.dateLabel}
                    </span>
                  </div>

                  <div className={`relative w-full aspect-[4/3] mb-4 ${getMaskClass(article.maskShape)} overflow-hidden`}>
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 31vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className={`${styles.displayHeading} text-2xl text-[#111521] mb-2`}>
                    {article.headline}
                  </h3>
                  <p className="text-sm text-[#2c3447] leading-relaxed font-medium mb-4">
                    {article.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="text-xs font-extrabold uppercase tracking-wider text-[#073A9B] hover:text-[#E53935] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>OPEN ACADEMIC NOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 04 — SPORTS & ACTIVITIES: "ENERGY. TEAMWORK. ACHIEVEMENT."
         ============================================================ */}
      <section id="sec-04-sports" className={styles.section}>
        <div className={styles.container}>
          <div className="section-title-scale mb-12">
            <span className={`${styles.orangeBadge} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded mb-3`}>
              <Trophy className="w-3.5 h-3.5" />
              04 · SPORTS &amp; ACTIVITIES
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
              ENERGY. <span className="text-[#FFD52A]">TEAMWORK.</span>{" "}
              <span className="text-[#FF6B2C]">ACHIEVEMENT.</span>
            </h2>
          </div>

          <div className="cards-grid grid grid-cols-1 lg:grid-cols-3 gap-7">
            {sportsArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`sports-card-anim ${styles.parchmentSheet} ${styles.parchmentCurl} ${styles.newsCard} rounded-2xl p-5 flex flex-col justify-between`}
                style={{
                  transform: idx === 1 ? "translateY(-8px)" : undefined,
                }}
              >
                <div
                  className={styles.maskingTape}
                  style={{ top: "-12px", right: "18px", transform: idx % 2 === 0 ? "rotate(4deg)" : "rotate(-5deg)" }}
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`${styles.redStamp} ${styles.monoTag} text-[10px] font-bold px-2.5 py-1 rounded`}>
                      {article.badgeText || "SPORTS"}
                    </span>
                    <span className={`${styles.monoTag} text-[11px] font-bold text-[#111521]`}>
                      {article.dateLabel}
                    </span>
                  </div>

                  <div className={`relative w-full aspect-[16/11] mb-4 ${getMaskClass(article.maskShape)} overflow-hidden`}>
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 31vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className={`${styles.displayHeading} text-2xl text-[#111521] mb-2`}>
                    {article.headline}
                  </h3>
                  <p className="text-sm text-[#2c3447] font-medium leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className={`${styles.yellowPanel} px-4 py-2 rounded-lg text-xs font-extrabold inline-flex items-center gap-2 self-start cursor-pointer`}
                >
                  <span>VIEW HIGHLIGHTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 05 — CREATIVE CORNER: "IMAGINATION IN ACTION."
         ============================================================ */}
      <section id="sec-05-creative" className={styles.section}>
        <div className={styles.container}>
          <div className="section-title-scale mb-12">
            <span className={`${styles.yellowPanel} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded mb-3`}>
              <Palette className="w-3.5 h-3.5 text-[#E53935]" />
              05 · CREATIVE CORNER
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
              IMAGINATION <span className="text-[#FFD52A]">IN ACTION.</span>
            </h2>
          </div>

          <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {creativeArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`creative-cutout-anim relative rounded-2xl p-5 flex flex-col justify-between ${styles.newsCard} ${
                  idx === 0
                    ? styles.yellowPanel
                    : `${styles.parchmentSheet} ${styles.parchmentCurl}`
                }`}
              >
                <PushPin color={idx === 0 ? "red" : idx === 1 ? "orange" : "yellow"} className="absolute -top-3 right-6" />

                <div>
                  <span
                    className={`${
                      idx === 0 ? styles.redStamp : styles.orangeBadge
                    } ${styles.monoTag} inline-block text-[10px] font-bold px-2.5 py-1 rounded mb-3`}
                  >
                    {article.badgeText || "CREATIVE ARTS"}
                  </span>

                  <div className={`relative w-full aspect-[4/3] mb-4 ${getMaskClass(article.maskShape)} overflow-hidden`}>
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 31vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className={`${styles.displayHeading} text-2xl text-[#111521] mb-2`}>
                    {article.headline}
                  </h3>
                  <p className="text-sm text-[#1e2536] font-medium leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="self-start inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-lg bg-[#111521] text-[#FFD52A] hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer"
                >
                  <span>EXPLORE FEATURE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 06 — CAMPUS MOMENTS: "LITTLE MOMENTS. BIG MEMORIES."
         ============================================================ */}
      <section id="sec-06-moments" className={styles.section}>
        <div className={styles.container}>
          <div className="section-title-scale flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className={`${styles.redStamp} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded mb-3`}>
                <Compass className="w-3.5 h-3.5" />
                06 · CAMPUS MOMENTS
              </span>
              <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
                LITTLE MOMENTS. <span className="text-[#FFD52A]">BIG MEMORIES.</span>
              </h2>
            </div>
            <p className={`${styles.scriptNote} text-2xl text-[#FFD52A]`}>
              Click any snapshot to inspect the memory!
            </p>
          </div>

          <div className="moments-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {CAMPUS_MOMENTS_COLLAGE.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedMoment(photo)}
                className={`moment-polaroid-anim ${styles.parchmentSheet} ${styles.parchmentCurl} ${styles.newsCard} text-left rounded-xl p-4 pb-6 cursor-pointer`}
                style={{ transform: `rotate(${photo.tilt})` }}
              >
                <PushPin color={photo.pinColor} className="absolute -top-3 left-1/2 -translate-x-1/2" />
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border-2 border-[#111521] mb-3">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`${styles.scriptNote} text-xl text-[#111521]`}>
                    {photo.caption}
                  </span>
                  <span className={`${styles.monoTag} text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFD52A] text-[#111521] border border-[#111521]`}>
                    {photo.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.blueprintRuler} aria-hidden="true" />

      {/* ============================================================
          SECTION 07 — ANNOUNCEMENTS: "STAY CONNECTED WITH SAM."
         ============================================================ */}
      <section id="sec-07-announcements" className={`${styles.section} pb-24`}>
        <div className={styles.container}>
          <div className="section-title-scale mb-10">
            <span className={`${styles.yellowPanel} ${styles.monoTag} inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded mb-3`}>
              <Megaphone className="w-3.5 h-3.5 text-[#E53935]" />
              07 · ANNOUNCEMENTS &amp; ARCHIVE
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#FDF6E4]`}>
              STAY CONNECTED <span className="text-[#FFD52A]">WITH SAM.</span>
            </h2>
          </div>

          {/* Upcoming Event Information & Editable Notice Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {UPCOMING_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className={`${styles.parchmentSheet} rounded-2xl p-5 sm:p-6 border-2 border-[#111521]`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className={`${styles.redStamp} ${styles.monoTag} text-[10px] font-bold px-2.5 py-1 rounded`}>
                    {ann.category}
                  </span>
                  <span className={`${styles.monoTag} text-[11px] font-bold inline-flex items-center gap-1 text-[#073A9B]`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {ann.scheduleLabel}
                  </span>
                </div>
                <h3 className={`${styles.displayHeading} text-2xl text-[#111521] mb-1`}>
                  {ann.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E53935] mb-2">
                  {ann.venueOrNote}
                </p>
                <p className="text-sm text-[#2d3548] font-medium leading-relaxed">
                  {ann.description}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Category Filter + Functional Explore More News Board */}
          <div className={`${styles.parchmentSheet} ${styles.parchmentCurl} rounded-2xl p-6 sm:p-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className={`${styles.displayHeading} text-3xl text-[#111521]`}>
                  BROWSE NEWS BY CATEGORY
                </h3>
                <p className="text-sm font-medium text-[#313a4f]">
                  Filter campus stories across Academics, Sports, Cultural Events, Campus Life, and Announcements.
                </p>
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter news by category">
                {NEWS_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                        active
                          ? "bg-[#FFD52A] text-[#111521] border-[#111521] shadow-[3px_3px_0_#111521]"
                          : "bg-white text-[#111521] border-[#111521]/30 hover:border-[#111521]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {filteredArchiveArticles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedArticle(item)}
                  className="text-left p-4 rounded-xl bg-white/80 border-2 border-[#111521]/15 hover:border-[#111521] hover:bg-[#FFF9E6] transition-all flex items-start gap-4 cursor-pointer"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-[#111521]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className={`${styles.monoTag} text-[10px] font-bold text-[#E53935]`}>
                      {item.category} · {item.dateLabel}
                    </span>
                    <h4 className={`${styles.displayHeading} text-xl text-[#111521] mt-0.5 line-clamp-2`}>
                      {item.headline}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#111521]/15">
              <button
                type="button"
                onClick={() => setShowAllArchive((prev) => !prev)}
                className={`${styles.redStamp} px-6 py-3.5 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform cursor-pointer`}
              >
                <span>{showAllArchive ? "SHOW COMPACT EDITION" : "EXPLORE MORE NEWS"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className={`${styles.monoTag} text-xs font-bold text-[#313a4f]`}>
                SHOWING {filteredArchiveArticles.length} STORIES · SAM UNIVERSE SCHOOL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Photo Lightbox Modal */}
      <SchoolNewsModal
        article={selectedArticle}
        moment={selectedMoment}
        onClose={() => {
          setSelectedArticle(null);
          setSelectedMoment(null);
        }}
      />
    </div>
  );
}
