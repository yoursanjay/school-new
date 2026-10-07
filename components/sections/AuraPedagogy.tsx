"use client";

import { Inter } from "next/font/google";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import ScrollVideo from "@/components/ScrollVideo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-aura-inter",
});

const pillars = [
  {
    number: "01",
    title: "Socratic discourse",
    description:
      "Small seminar tables where every voice is tested, challenged, and refined.",
  },
  {
    number: "02",
    title: "Applied discovery",
    description:
      "Direct access to cutting-edge research facilities and studio workshops.",
  },
  {
    number: "03",
    title: "Global residency",
    description:
      "Immersive fieldwork and civic integration across global research centers.",
  },
];

export default function AuraPedagogySection() {
  const sequenceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = sequenceRef.current?.querySelectorAll<HTMLElement>(
      "[data-aura-reveal]",
    );
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sequenceRef}
      className={`${inter.variable} aura-scroll-sequence relative isolate min-h-[220vh] overflow-clip bg-[#0a0a0a] text-white`}
    >
      <ScrollVideo sequenceRef={sequenceRef} />
      <section className="aura-sticky-stage sticky top-0 flex min-h-screen items-stretch">
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-between px-5 pb-12 pt-28 sm:px-8 sm:pb-16 md:px-12">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div
              data-aura-reveal
              className="aura-accent-chip"
            >
              Inquiry Without Limits
            </div>
            <p
              data-aura-reveal
              className="max-w-xs text-lg leading-relaxed drop-shadow-md sm:text-right sm:text-xl"
              style={{ transitionDelay: "100ms" }}
            >
              Education here is not the passive reception of knowledge — it is
              a deliberate immersion into mastery.
            </p>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-12 lg:flex-row lg:items-end lg:gap-16">
            <div className="max-w-xl">
              <h2
                data-aura-reveal
                className="mb-5 text-5xl font-normal leading-[1.05] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl"
                style={{ transitionDelay: "100ms" }}
              >
                Formed for
                <br />
                leadership.
              </h2>
              <p
                data-aura-reveal
                className="max-w-lg text-sm leading-7 text-white/90 drop-shadow-md sm:text-base"
                style={{ transitionDelay: "200ms" }}
              >
                From foundational seminars to independent laboratory
                discovery, Aura equips students to navigate ambiguity and build
                futures that matter.
              </p>
              <div
                data-aura-reveal
                className="mt-7 flex flex-wrap gap-3"
                style={{ transitionDelay: "300ms" }}
              >
                <a
                  href="/garden#academics"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
                >
                  Explore curricula
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="/garden#admissions"
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  Download prospectus
                </a>
              </div>
            </div>

            <div
              data-aura-reveal
              className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6"
              style={{ transitionDelay: "200ms" }}
            >
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.number}
                  className={`grid grid-cols-[2.5rem_1fr] gap-3 py-5 sm:gap-4 ${
                    index < pillars.length - 1
                      ? "border-b border-white/15"
                      : ""
                  }`}
                >
                  <span className="font-mono text-[11px] tracking-[0.15em] text-white/60">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="text-base font-medium drop-shadow-md">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/75">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="h-[80vh]" aria-hidden="true" />
    </div>
  );
}
