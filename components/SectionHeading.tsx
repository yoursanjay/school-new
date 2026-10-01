"use client";

import React from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <Reveal direction="down" duration={600}>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.24em] mb-4 ${
              dark
                ? "bg-[#C99732]/15 text-[#E2B64A] border border-[#C99732]/30"
                : "bg-[#0B1B33]/8 text-[#0B1B33] border border-[#0B1B33]/15"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                dark ? "bg-[#E2B64A]" : "bg-[#C99732]"
              }`}
            />
            {badge}
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={60} duration={700}>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black tracking-[-0.03em] leading-[1.12] ${
            dark ? "text-white" : "text-[#0B1B33]"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal direction="up" delay={120} duration={700}>
          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
              dark ? "text-slate-300" : "text-[#667085]"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
