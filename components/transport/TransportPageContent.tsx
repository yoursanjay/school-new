"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Compass,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import styles from "./TransportPage.module.css";
import { transportBody, transportCondensed, transportMono } from "./typography";
import {
  COMFORT_HIGHLIGHTS,
  ROUTE_ZONE_PLACEHOLDERS,
  SAFETY_FEATURES,
  SMART_TRANSPORT_STEPS,
  TRANSPORT_TEAM_ROLES,
} from "./transportData";
import Transport3DStage, { type TransportScrollState } from "./Transport3DStage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SECTION_NAV = [
  { id: "tr-01-hero", label: "01 Journey" },
  { id: "tr-02-safety", label: "02 Safety" },
  { id: "tr-03-smart", label: "03 Connected" },
  { id: "tr-04-team", label: "04 Team" },
  { id: "tr-05-comfort", label: "05 Comfort" },
  { id: "tr-06-routes", label: "06 Routes" },
  { id: "tr-07-confidence", label: "07 Enquiry" },
];

export default function TransportPageContent() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const routeBusRef = useRef<SVGGElement | null>(null);

  const scrollStateRef = useRef<TransportScrollState>({
    globalProgress: 0,
    heroProgress: 0,
    safetyProgress: 0,
    smartProgress: 0,
    teamProgress: 0,
    comfortProgress: 0,
    routesProgress: 0,
    ctaProgress: 0,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
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

          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              scrollStateRef.current.globalProgress = self.progress;
            },
          });

          // Reliable active section rail sync (scroll down, scroll up, and reduced motion)
          SECTION_NAV.forEach((sec, idx) => {
            ScrollTrigger.create({
              id: `tr-nav-${sec.id}`,
              trigger: `#${sec.id}`,
              start: idx === 0 ? "top top" : "top 45%",
              end: idx === SECTION_NAV.length - 1 ? "bottom bottom" : "bottom 45%",
              onToggle: (self) => {
                if (self.isActive) setActiveSectionIndex(idx);
              },
            });
          });

          if (prefersReduced) {
            scrollStateRef.current.heroProgress = 1;
            return;
          }

          // 01 — HERO (Pinned Storytelling)
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#tr-01-hero",
              start: "top top",
              end: isDesktop ? "+=105%" : "+=60%",
              pin: true,
              scrub: 0.75,
              onUpdate: (self) => {
                scrollStateRef.current.heroProgress = self.progress;
              },
            },
          });

          heroTl
            .fromTo(
              ".tr-hero-title",
              { scale: isDesktop ? 1.2 : 1.08, y: 20 },
              { scale: 1, y: 0, ease: "power2.out", duration: 0.6 }
            )
            .to(".tr-road-dashes", { xPercent: -45, ease: "none", duration: 1 }, 0)
            .fromTo(
              ".tr-hero-photo",
              { scale: 1.08, clipPath: "inset(6% 6% 6% 6% round 22px)" },
              { scale: 1, clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 0.65 },
              0
            );

          // 02 — SAFETY FIRST
          ScrollTrigger.create({
            trigger: "#tr-02-safety",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              scrollStateRef.current.safetyProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#tr-02-safety .tr-title-scale",
            { scale: isDesktop ? 1.18 : 1.08, y: 36, autoAlpha: 0.4 },
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              scrollTrigger: {
                trigger: "#tr-02-safety",
                start: "top 86%",
                end: "top 32%",
                scrub: 0.7,
              },
            }
          );

          gsap.fromTo(
            "#tr-02-safety .tr-safety-card",
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.12,
              scrollTrigger: {
                trigger: "#tr-02-safety .tr-safety-grid",
                start: "top 82%",
                end: "top 34%",
                scrub: 0.75,
              },
            }
          );

          // 03 — SMART TRANSPORT
          ScrollTrigger.create({
            trigger: "#tr-03-smart",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              scrollStateRef.current.smartProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#tr-03-smart .tr-phone-mockup",
            { y: 54, scale: 0.94, autoAlpha: 0.3 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              scrollTrigger: {
                trigger: "#tr-03-smart",
                start: "top 82%",
                end: "top 30%",
                scrub: 0.75,
              },
            }
          );

          // 04 — OUR TRANSPORT TEAM
          ScrollTrigger.create({
            trigger: "#tr-04-team",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              scrollStateRef.current.teamProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#tr-04-team .tr-team-card",
            { y: 48, scale: 1.04, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.14,
              scrollTrigger: {
                trigger: "#tr-04-team .tr-team-grid",
                start: "top 82%",
                end: "top 32%",
                scrub: 0.75,
              },
            }
          );

          // 05 — COMFORTABLE JOURNEYS
          ScrollTrigger.create({
            trigger: "#tr-05-comfort",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              scrollStateRef.current.comfortProgress = self.progress;
            },
          });

          gsap.fromTo(
            "#tr-05-comfort .tr-comfort-photo",
            { clipPath: "inset(0% 10% 0% 10% round 20px)", scale: 1.06 },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              scale: 1,
              stagger: 0.12,
              scrollTrigger: {
                trigger: "#tr-05-comfort",
                start: "top 84%",
                end: "top 32%",
                scrub: 0.8,
              },
            }
          );

          // 06 — OUR ROUTES (Curved Road Bus Travel Scrub)
          ScrollTrigger.create({
            trigger: "#tr-06-routes",
            start: "top 80%",
            end: "bottom 20%",
            onUpdate: (self) => {
              scrollStateRef.current.routesProgress = self.progress;
              if (routeBusRef.current) {
                const x = gsap.utils.interpolate(40, 720, self.progress);
                const y = 110 + Math.sin(self.progress * Math.PI * 2) * 38;
                routeBusRef.current.setAttribute("transform", `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);
              }
            },
          });

          // 07 — TRAVEL WITH CONFIDENCE
          ScrollTrigger.create({
            trigger: "#tr-07-confidence",
            start: "top 85%",
            end: "bottom bottom",
            onUpdate: (self) => {
              scrollStateRef.current.ctaProgress = self.progress;
            },
          });
        },
        rootRef
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const handleJump = (id: string, idx: number) => {
    setActiveSectionIndex(idx);
    if (id === "tr-01-hero") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72);
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.transportRoot} ${transportCondensed.variable} ${transportBody.variable} ${transportMono.variable}`}
    >
      {/* Forest Green Editorial Backdrop */}
      <div className={styles.backdropLayer} aria-hidden="true">
        <div className={styles.subtleGrid} />
      </div>

      {/* Scroll-Driven 3D Cartoon Transport Stage */}
      <Transport3DStage
        scrollStateRef={scrollStateRef}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
        className={styles.stageWrap}
      />

      {/* Right-Side Section Rail (Desktop) */}
      <nav className={styles.progressRail} aria-label="Transport page sections">
        {SECTION_NAV.map((item, idx) => {
          const active = idx === activeSectionIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleJump(item.id, idx)}
              className={`${styles.monoTag} text-[10px] font-bold px-2.5 py-1 rounded border transition-all cursor-pointer text-right ${
                active
                  ? "bg-[#F6C324] text-[#1A211E] border-[#1A211E] scale-105 shadow-[3px_3px_0_#1A211E]"
                  : "bg-[#071D14]/85 text-[#E8F7EE]/80 border-[#C9F0D8]/25 hover:border-[#28A75B]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ============================================================
          01 — HERO: "EVERY JOURNEY STARTS WITH CARE."
         ============================================================ */}
      <section
        id="tr-01-hero"
        className={`${styles.section} min-h-[100svh] flex items-center pt-28 pb-12`}
      >
        <div className={styles.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className={`${styles.mintBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold`}>
                <Bus className="w-4 h-4 text-[#1E7E48]" />
                SAM UNIVERSE SCHOOL · MADURAI TRANSPORT
              </span>

              <h1
                className={`${styles.displayHeading} tr-hero-title text-[3.2rem] sm:text-[4.6rem] lg:text-[5.8rem] text-white`}
              >
                EVERY JOURNEY{" "}
                <span className="text-[#C9F0D8]">STARTS WITH</span>{" "}
                <span className="inline-block bg-[#F6C324] text-[#1A211E] px-3 py-0.5 rounded-lg border-2 border-[#1A211E] shadow-[5px_5px_0_#1A211E]">
                  CARE.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#E8F7EE]/90 font-medium max-w-xl leading-relaxed">
                Safe, supervised and well-maintained school buses connecting Madurai homes to
                Sri Aurobindo Mira Universal School with calm, dependable daily routines.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact-us"
                  className={`${styles.yellowPill} px-6 py-3.5 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform`}
                >
                  <span>TRANSPORT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleJump("tr-02-safety", 1)}
                  className="px-5 py-3.5 rounded-xl border border-[#C9F0D8]/40 bg-[#103A28]/80 text-white font-bold text-sm hover:bg-[#1E7E48] transition-colors cursor-pointer"
                >
                  EXPLORE SAFETY STANDARDS
                </button>
              </div>

              {/* Moving Road Graphic */}
              <div className={`${styles.roadStrip} max-w-lg`} aria-hidden="true">
                <div className={`${styles.roadDashes} tr-road-dashes`} />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className={`${styles.photoFrame} tr-hero-photo aspect-[16/10] w-full bg-[#071D14]`}>
                <Image
                  src="/img/transport/bus-hero.jpg"
                  alt="Yellow school bus arriving at Sri Aurobindo Mira Universal School"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#071D14]/90 via-[#071D14]/45 to-transparent">
                  <span className={`${styles.monoTag} text-[11px] font-bold text-[#F6C324]`}>
                    MORNING ARRIVAL · MELAKKAL MAIN ROAD CAMPUS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 — SAFETY FIRST: "YOUR SAFETY IS OUR PRIORITY."
         ============================================================ */}
      <section id="tr-02-safety" className={`${styles.section} ${styles.diagonalBand}`}>
        <div className={styles.container}>
          <div className="tr-title-scale mb-12">
            <span className={`${styles.leafBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3`}>
              <ShieldCheck className="w-4 h-4" />
              02 · SAFETY FIRST
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#0D2E20]`}>
              YOUR SAFETY IS <span className="text-[#1E7E48]">OUR PRIORITY.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className={`${styles.photoFrame} aspect-[4/3] w-full border-[#0D2E20]/20`}>
                <Image
                  src="/img/about/campus-entrance.webp"
                  alt="Safe supervised campus arrival zone at SAM Universe School"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 tr-safety-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SAFETY_FEATURES.map((feat) => (
                <div
                  key={feat.id}
                  className={`tr-safety-card ${styles.mintCard} ${styles.cardHover} rounded-2xl p-5`}
                >
                  <span className={`${styles.monoTag} text-[11px] font-bold text-[#1E7E48] block mb-2`}>
                    {feat.badge}
                  </span>
                  <h3 className={`${styles.displayHeading} text-2xl text-[#0D2E20] mb-2`}>
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#2A3832] font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 — SMART TRANSPORT: "CONNECTED EVERY STEP."
         ============================================================ */}
      <section id="tr-03-smart" className={styles.section}>
        <div className={styles.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className={`${styles.mintBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold`}>
                <Compass className="w-4 h-4 text-[#1E7E48]" />
                03 · SMART TRANSPORT
              </span>
              <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl text-white`}>
                CONNECTED <span className="text-[#C9F0D8]">EVERY STEP.</span>
              </h2>
              <p className="text-base text-[#E8F7EE]/88 font-medium leading-relaxed">
                Clear stop communication, fixed Madurai coverage zones, and direct access to the
                school transport coordination desk keep families informed without guesswork.
              </p>

              <div className="space-y-4">
                {SMART_TRANSPORT_STEPS.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.forestCard} rounded-2xl p-5 flex items-start gap-4`}
                  >
                    <span className={`${styles.yellowPill} ${styles.monoTag} text-xs font-extrabold px-2.5 py-1 rounded shrink-0`}>
                      {item.step}
                    </span>
                    <div>
                      <h3 className={`${styles.displayHeading} text-2xl text-white mb-1`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#E8F7EE]/85 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Smartphone Transport Schedule & Route Card Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="tr-phone-mockup w-full max-w-sm rounded-[34px] border-4 border-[#C9F0D8]/40 bg-[#071D14] p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
                  <span className={`${styles.monoTag} text-[11px] font-bold text-[#C9F0D8] inline-flex items-center gap-1.5`}>
                    <Smartphone className="w-3.5 h-3.5 text-[#F6C324]" />
                    SAM TRANSPORT DESK
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28A75B]" />
                </div>

                <div className={`${styles.mintCard} rounded-2xl p-4 mb-4`}>
                  <p className={`${styles.monoTag} text-[10px] font-bold text-[#1E7E48] mb-1`}>
                    ROUTE OVERVIEW · [EDITABLE]
                  </p>
                  <p className={`${styles.displayHeading} text-xl text-[#0D2E20] mb-2`}>
                    Fixed Pickup &amp; Drop Schedule
                  </p>
                  <div className="space-y-2 text-xs font-semibold text-[#1A211E]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1E7E48]" />
                      <span>[Stop 01 — Editable Stop Name]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1E7E48]" />
                      <span>[Stop 02 — Editable Stop Name]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#28A75B]" />
                      <span>SAM Campus · Melakkal Main Road</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#103A28] border border-[#C9F0D8]/20 p-3.5 text-xs text-[#E8F7EE]/90">
                  <p className="font-bold text-[#F6C324] mb-1">Direct Transport Office Line</p>
                  <p>Call 90470 77677 for verified stop timings and route assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          04 — OUR TRANSPORT TEAM: "PEOPLE YOU CAN TRUST."
         ============================================================ */}
      <section id="tr-04-team" className={`${styles.section} ${styles.diagonalBand}`}>
        <div className={styles.container}>
          <div className="mb-12">
            <span className={`${styles.leafBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3`}>
              <Users className="w-4 h-4" />
              04 · OUR TRANSPORT TEAM
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#0D2E20]`}>
              PEOPLE YOU <span className="text-[#1E7E48]">CAN TRUST.</span>
            </h2>
          </div>

          <div className="tr-team-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSPORT_TEAM_ROLES.map((member) => (
              <article
                key={member.id}
                className={`tr-team-card ${styles.mintCard} ${styles.cardHover} rounded-2xl p-5 flex flex-col justify-between`}
              >
                <div>
                  <span className={`${styles.leafBadge} ${styles.monoTag} inline-block text-[10px] font-bold px-2.5 py-1 rounded mb-3`}>
                    {member.tag}
                  </span>
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-[#0D2E20]/15">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 31vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className={`${styles.displayHeading} text-2xl text-[#0D2E20] mb-2`}>
                    {member.role}
                  </h3>
                  <p className="text-sm text-[#2A3832] font-medium leading-relaxed mb-3">
                    {member.summary}
                  </p>
                </div>
                <p className={`${styles.monoTag} text-[10px] font-bold text-[#1E7E48] bg-[#E8F7EE] px-2.5 py-1.5 rounded border border-[#1E7E48]/25`}>
                  {member.editableNote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          05 — COMFORTABLE JOURNEYS: "COMFORT IN EVERY MILE."
         ============================================================ */}
      <section id="tr-05-comfort" className={styles.section}>
        <div className={styles.container}>
          <div className="mb-12">
            <span className={`${styles.mintBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3`}>
              <Sparkles className="w-4 h-4 text-[#1E7E48]" />
              05 · COMFORTABLE JOURNEYS
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-white`}>
              COMFORT IN <span className="text-[#C9F0D8]">EVERY MILE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch mb-8">
            <div className="lg:col-span-7">
              <div className={`${styles.photoFrame} tr-comfort-photo aspect-[16/10] w-full h-full`}>
                <Image
                  src="/img/transport/bus-hero.jpg"
                  alt="Well-maintained SAM Universe School bus fleet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className={`${styles.photoFrame} tr-comfort-photo aspect-[16/10] lg:aspect-auto lg:h-full w-full`}>
                <Image
                  src="/img/about/letter-campus-aerial.webp"
                  alt="Aerial view of SAM Universe School green campus grounds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMFORT_HIGHLIGHTS.map((item) => (
              <div key={item.id} className={`${styles.forestCard} rounded-2xl p-6`}>
                <span className={`${styles.yellowPill} ${styles.monoTag} inline-block text-xs font-extrabold px-3 py-1 rounded mb-3`}>
                  {item.metric}
                </span>
                <h3 className={`${styles.displayHeading} text-2xl text-white mb-2`}>
                  {item.title}
                </h3>
                <p className="text-sm text-[#E8F7EE]/85 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          06 — OUR ROUTES: "CLOSER TO EVERY STUDENT."
         ============================================================ */}
      <section id="tr-06-routes" className={`${styles.section} ${styles.diagonalBand}`}>
        <div className={styles.container}>
          <div className="mb-10">
            <span className={`${styles.leafBadge} ${styles.monoTag} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3`}>
              <MapPin className="w-4 h-4" />
              06 · OUR ROUTES
            </span>
            <h2 className={`${styles.displayHeading} text-4xl sm:text-6xl lg:text-7xl text-[#0D2E20]`}>
              CLOSER TO <span className="text-[#1E7E48]">EVERY STUDENT.</span>
            </h2>
          </div>

          {/* Animated Curved Road Graphic */}
          <div className={`${styles.forestCard} rounded-3xl p-4 sm:p-6 mb-8 overflow-hidden`}>
            <svg viewBox="0 0 800 220" className="w-full h-auto" role="img" aria-label="Curved school bus route illustration">
              <path
                d="M 30 130 Q 200 40, 400 120 T 770 110"
                fill="none"
                stroke="#1A211E"
                strokeWidth="34"
                strokeLinecap="round"
              />
              <path
                d="M 30 130 Q 200 40, 400 120 T 770 110"
                fill="none"
                stroke="#F6C324"
                strokeWidth="4"
                strokeDasharray="16 14"
                strokeLinecap="round"
              />
              {/* Stop Markers */}
              {[130, 310, 520, 710].map((cx, i) => (
                <g key={cx} transform={`translate(${cx}, ${i % 2 === 0 ? 96 : 126})`}>
                  <circle r="11" fill="#28A75B" stroke="#FFFFFF" strokeWidth="3" />
                </g>
              ))}
              {/* Bus Icon travelling along the curve on scroll */}
              <g ref={routeBusRef} transform="translate(60, 118)">
                <rect x="-26" y="-16" width="52" height="28" rx="7" fill="#F6C324" stroke="#1A211E" strokeWidth="3" />
                <rect x="-18" y="-11" width="16" height="10" rx="2" fill="#0D2E20" />
                <rect x="2" y="-11" width="16" height="10" rx="2" fill="#0D2E20" />
                <circle cx="-14" cy="14" r="6" fill="#1A211E" />
                <circle cx="14" cy="14" r="6" fill="#1A211E" />
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ROUTE_ZONE_PLACEHOLDERS.map((zone) => (
              <div key={zone.id} className={`${styles.mintCard} rounded-2xl p-5 sm:p-6`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`${styles.leafBadge} ${styles.monoTag} text-[10px] font-bold px-2.5 py-1 rounded`}>
                    {zone.zoneCode}
                  </span>
                  <span className={`${styles.monoTag} text-[10px] font-bold text-[#1E7E48]`}>
                    {zone.timingLabel}
                  </span>
                </div>
                <h3 className={`${styles.displayHeading} text-2xl text-[#0D2E20] mb-1.5`}>
                  {zone.zoneTitle}
                </h3>
                <p className="text-sm text-[#2A3832] font-medium">{zone.stopsLabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          07 — TRAVEL WITH CONFIDENCE: "LET'S MAKE EVERY SCHOOL DAY BETTER."
         ============================================================ */}
      <section id="tr-07-confidence" className={`${styles.section} pb-24`}>
        <div className={styles.container}>
          <div className={`${styles.forestCard} rounded-3xl p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
            <div className="lg:col-span-7 space-y-5">
              <span className={`${styles.yellowPill} ${styles.monoTag} inline-block px-3 py-1 rounded text-xs font-extrabold`}>
                07 · TRAVEL WITH CONFIDENCE
              </span>
              <h2 className={`${styles.displayHeading} text-4xl sm:text-5xl lg:text-6xl text-white`}>
                LET&apos;S MAKE EVERY{" "}
                <span className="text-[#C9F0D8]">SCHOOL DAY BETTER.</span>
              </h2>
              <p className="text-base text-[#E8F7EE]/88 font-medium leading-relaxed max-w-xl">
                Need route availability, pickup point confirmation, or transport fee details for
                your child? Connect directly with the SAM Universe School transport office.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact-us"
                  className={`${styles.yellowPill} px-7 py-4 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform`}
                >
                  <span>TRANSPORT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919047077677"
                  className="px-5 py-4 rounded-xl border border-[#C9F0D8]/35 bg-[#071D14]/70 text-white font-bold text-sm inline-flex items-center gap-2 hover:bg-[#1E7E48] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F6C324]" />
                  <span>90470 77677</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`${styles.photoFrame} aspect-[16/11] w-full`}>
                <Image
                  src="/img/s6.JPG"
                  alt="Smiling SAM Universe School students at campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
