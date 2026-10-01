"use client";

import React from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Shield, Heart, Sparkles, ArrowUpRight } from "lucide-react";

interface ValueItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const VALUES: ValueItem[] = [
  {
    number: "01",
    title: "CONFIDENCE",
    tagline: "Intellectual Boldness & Self-Belief",
    description:
      "Empowering students to articulate ideas fearlessly, embrace challenges, and lead with quiet conviction across academic, artistic, and athletic arenas.",
    icon: Shield,
  },
  {
    number: "02",
    title: "COMPASSION",
    tagline: "Empathy, Ethics & Universal Mind",
    description:
      "Rooted in Sri Aurobindo's philosophy of integral oneness, instilling genuine empathy, respect for community, and an enduring social conscience.",
    icon: Heart,
  },
  {
    number: "03",
    title: "CAPABILITY",
    tagline: "Future-Ready Mastery & Problem Solving",
    description:
      "Cultivating analytical thinking, technological literacy, and interdisciplinary versatility required to excel and innovate in a dynamic world.",
    icon: Sparkles,
  },
];

export default function ValuesSection() {
  return (
    <section
      id="values"
      className="relative z-20 w-full bg-[#0B1B33] text-white overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C99732]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C99732]/60 to-transparent pointer-events-none" />

      <SectionContainer>
        <SectionHeading
          badge="OUR VALUES"
          title="Building Character. Creating Tomorrow's Leaders."
          subtitle="Our educational philosophy balances rigorous CBSE academics with moral depth, nurturing well-rounded individuals grounded in timeless human values."
          align="center"
          dark
        />

        {/* Three Large Value Blocks with Huge Subtle Background Numbers */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Reveal
                key={val.title}
                direction="up"
                delay={idx * 120}
                duration={650}
                className="h-full"
              >
                <div className="group relative h-full rounded-[28px] p-8 sm:p-10 bg-[#102A4A]/60 border border-[#C99732]/25 backdrop-blur-md shadow-lg hover:border-[#C99732]/70 transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
                  {/* Huge Subtle Number in Background */}
                  <span className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black font-mono text-white/5 group-hover:text-[#C99732]/10 transition-colors pointer-events-none select-none">
                    {val.number}
                  </span>

                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
                      <span className="text-3xl sm:text-4xl font-black text-[#C99732] tracking-tight font-mono">
                        {val.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#C99732] group-hover:bg-[#C99732] group-hover:text-[#0B1B33] transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-8 relative z-10">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E2B64A] block mb-2">
                        {val.tagline}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#C99732] transition-colors">
                        {val.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal relative z-10">
                      {val.description}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#E2B64A] uppercase tracking-wider relative z-10">
                    <span>Core Pillar {val.number}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
