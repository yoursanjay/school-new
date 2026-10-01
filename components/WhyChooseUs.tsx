"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedCounter from "./AnimatedCounter";
import { ShieldCheck, HeartHandshake, Award, Users } from "lucide-react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    target: 25,
    suffix: "+",
    label: "Years of Excellence",
    sublabel: "Nurturing generations of accomplished learners since 2001.",
  },
  {
    target: 2500,
    suffix: "+",
    label: "Enrolled Students",
    sublabel: "Thriving across foundational, primary, middle, and senior grades.",
  },
  {
    target: 30,
    suffix: "+",
    label: "Learning Programs",
    sublabel: "CBSE academic pathways, STEM labs, arts, and languages.",
  },
  {
    target: 20,
    suffix: "+",
    label: "Campus Facilities",
    sublabel: "FIFA futsal arena, full-dome planetarium, modern sciences.",
  },
  {
    target: 100,
    suffix: "%",
    label: "Commitment To Every Learner",
    sublabel: "Individualized mentorship with 1:15 educator ratio.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative z-20 py-24 sm:py-32 bg-[#0c1b33] text-white overflow-hidden transition-colors"
    >
      {/* Subtle gold gradient accents and grid lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c99738]/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c99738]/50 to-transparent" />
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#1a365d]/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          badge="OUR DISTINCTION"
          title="Why Families Choose Us"
          subtitle="A purposeful institution where academic excellence, moral grounding, and world-class infrastructure inspire students to achieve their highest potential."
          align="center"
          dark
        />

        {/* 5 Animated Stats Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STATS.map((stat, idx) => (
            <RevealOnScroll
              key={stat.label}
              direction="up"
              delay={idx * 100}
              duration={700}
              className={idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="relative h-full rounded-3xl p-7 bg-[#13233d]/70 border border-[#c99738]/25 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.25)] flex flex-col justify-between hover:border-[#c99738]/60 transition-all duration-300 hover:-translate-y-1">
                {/* Glowing line top */}
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#e6b85c] to-transparent opacity-50" />

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#e6b85c] tracking-tight">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white leading-snug">
                    {stat.label}
                  </h3>
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed font-normal pt-3 border-t border-white/10">
                  {stat.sublabel}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Institutional Promises Bar */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <RevealOnScroll direction="up" delay={200}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c99738]/15 border border-[#c99738]/30 flex items-center justify-center text-[#e6b85c] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Safe, Caring Ambience</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  24/7 campus surveillance, strict safety protocols, and emotionally supportive mentoring.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={280}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c99738]/15 border border-[#c99738]/30 flex items-center justify-center text-[#e6b85c] shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Universal Values</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Inspired by Sri Aurobindo and The Mother's vision of integral education and empathy.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={360}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c99738]/15 border border-[#c99738]/30 flex items-center justify-center text-[#e6b85c] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Distinguished Faculty</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Passionate, subject-certified educators committed to personalized academic growth.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
