"use client";

import React from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { ArrowRight } from "lucide-react";

interface AcademicProgram {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const PROGRAMS: AcademicProgram[] = [
  {
    number: "01",
    title: "EARLY YEARS",
    subtitle: "Play-based foundations, curiosity and confidence.",
    description:
      "A warm, discovery-filled start that builds foundational literacy, joyful sensory play, emotional resilience, and a lifelong excitement for learning.",
    imageUrl: "/images/school/students.jpg",
  },
  {
    number: "02",
    title: "PRIMARY EDUCATION",
    subtitle: "Strong fundamentals and joyful discovery.",
    description:
      "Interactive inquiry, conceptual mathematics, linguistic expression, and hands-on activities empower young minds with curiosity and solid basic concepts.",
    imageUrl: "/images/school/classroom.jpg",
  },
  {
    number: "03",
    title: "MIDDLE SCHOOL",
    subtitle: "Critical thinking, collaboration and deeper learning.",
    description:
      "Interdisciplinary coursework develops analytical problem-solving, collaborative scientific exploration, and global awareness across diverse subjects.",
    imageUrl: "/images/school/science.jpg",
  },
  {
    number: "04",
    title: "SENIOR / CBSE",
    subtitle: "Focused academic preparation and future readiness.",
    description:
      "Rigorous CBSE board syllabus combined with personalized mentoring, competitive exam readiness, and advanced STEM research projects.",
    imageUrl: "/images/school/campus.jpg",
  },
];

export default function AcademicsSection() {
  return (
    <section
      id="academics"
      className="relative z-20 w-full bg-white text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="ACADEMICS"
          title="Education For A Better Future"
          subtitle="Our progressive CBSE curriculum balances academic rigor with creative inquiry, nurturing intellectually agile, ethically grounded leaders."
          align="center"
        />

        {/* 4 Large Cards with Staggered Scroll Reveal */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          {PROGRAMS.map((prog, idx) => (
            <Reveal
              key={prog.number}
              direction="up"
              delay={idx * 100}
              duration={650}
              className="h-full"
            >
              <div className="group h-full rounded-[24px] overflow-hidden bg-[#F7F4EC]/60 border border-[#0B1B33]/10 shadow-sm hover:shadow-xl hover:border-[#C99732]/50 hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between p-6">
                <div>
                  {/* Image with clip-path reveal and hover scale */}
                  <ImageReveal delay={idx * 100 + 50} duration={800}>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-200">
                      <img
                        src={prog.imageUrl}
                        alt={prog.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </ImageReveal>

                  {/* Small Number & Title */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-sm font-black text-[#C99732] font-mono">
                      {prog.number}
                    </span>
                    <h3 className="text-lg font-black tracking-tight text-[#0B1B33] group-hover:text-[#C99732] transition-colors">
                      {prog.title}
                    </h3>
                  </div>

                  <p className="text-xs font-bold text-[#C99732] uppercase tracking-wider mb-2.5">
                    {prog.subtitle}
                  </p>

                  <p className="text-sm text-[#667085] leading-relaxed font-normal">
                    {prog.description}
                  </p>
                </div>

                {/* Arrow Moves Right on Hover */}
                <div className="mt-6 pt-4 border-t border-[#0B1B33]/10 flex items-center justify-between text-xs font-bold text-[#0B1B33] group-hover:text-[#C99732] transition-colors">
                  <span>Explore Curriculum</span>
                  <div className="w-8 h-8 rounded-full bg-[#0B1B33] group-hover:bg-[#C99732] text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
