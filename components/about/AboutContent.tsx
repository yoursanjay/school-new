"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface AboutContentProps {
  isRevealed: boolean;
  prefersReducedMotion: boolean;
}

export default function AboutContent({
  isRevealed,
  prefersReducedMotion,
}: AboutContentProps) {
  const scrollToAcademics = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("academics");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const getRevealStyle = (delayMs: number) => {
    if (prefersReducedMotion) {
      return {
        opacity: isRevealed ? 1 : 0,
        transition: `opacity 600ms ease-out ${delayMs}ms`,
      };
    }
    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? "translate3d(0, 0, 0)" : "translate3d(0, 25px, 0)",
      transition: `opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      willChange: "opacity, transform",
    };
  };

  return (
    <div className="w-full max-w-[590px] flex flex-col justify-center">
      {/* 1. Eyebrow: • ABOUT OUR SCHOOL */}
      <div style={getRevealStyle(0)} className="w-fit">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.24em] bg-[#0B1B33]/8 text-[#0B1B33] border border-[#0B1B33]/15 mb-5 select-none shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9962E]" />
          ABOUT OUR SCHOOL
        </div>
      </div>

      {/* 2. Large Heading: Desktop ~64px, Tablet 48px, Mobile 38px */}
      <div style={getRevealStyle(100)} className="w-full">
        <h2
          className="w-full tracking-[-0.03em] m-0 text-[38px] sm:text-[48px] lg:text-[64px]"
          style={{
            fontWeight: 800,
            lineHeight: 1.06,
            overflowWrap: "break-word",
            wordBreak: "normal",
          }}
        >
          <span className="text-[#0B1B33] block">Learning With Purpose,</span>
          <span className="text-[#C9962E] block mt-1.5 sm:mt-2.5">
            Growing With Confidence.
          </span>
        </h2>
      </div>

      {/* 3. Paragraph 1 */}
      <div style={getRevealStyle(200)} className="w-full">
        <p className="mt-6 text-[16px] sm:text-[18px] text-slate-700 leading-[1.7] font-normal">
          Sri Aurobindo Mira Universal School is committed to providing a
          nurturing CBSE education that develops academic excellence,
          character, creativity and confidence.
        </p>
      </div>

      {/* 4. Paragraph 2 */}
      <div style={getRevealStyle(300)} className="w-full">
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#667085] leading-[1.7] font-normal">
          Located in Keelamathur, Madurai, our learning environment combines
          strong academics, experiential learning, creativity and timeless
          values to prepare students for a confident and compassionate future.
        </p>
      </div>

      {/* 5. CTA Buttons */}
      <div style={getRevealStyle(400)} className="w-full">
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#academics"
            onClick={scrollToAcademics}
            aria-label="Explore Academics at Sri Aurobindo Mira Universal School"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide bg-[#0B1B33] text-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(11,27,51,0.22)] active:translate-y-0 cursor-pointer"
          >
            <span>Explore Academics</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            onClick={scrollToContact}
            aria-label="Schedule a Campus Visit"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide bg-[#FAF7F2] text-[#0B1B33] border border-[#0B1B33]/25 transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] hover:shadow-[0_10px_25px_rgba(11,27,51,0.15)] active:translate-y-0 cursor-pointer"
          >
            <span>Campus Visit</span>
          </a>
        </div>
      </div>
    </div>
  );
}
