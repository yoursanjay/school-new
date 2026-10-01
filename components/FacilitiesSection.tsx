"use client";

import React from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { ArrowUpRight } from "lucide-react";

interface Facility {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  colSpanClass: string;
}

const FACILITIES: Facility[] = [
  {
    id: "digital-classrooms",
    number: "01",
    name: "DIGITAL CLASSROOMS",
    category: "Smart Learning",
    description:
      "Interactive smart displays, ergonomic modular seating, and audiovisual tech supporting dynamic concept visualization and collaborative inquiry.",
    imageUrl: "/images/school/classroom.jpg",
    colSpanClass: "lg:col-span-8",
  },
  {
    id: "science-labs",
    number: "02",
    name: "SCIENCE LABORATORIES",
    category: "Innovation & STEM",
    description:
      "Dedicated physics, chemistry, biology, and robotics research laboratories equipped for safe hands-on experimentation.",
    imageUrl: "/images/school/science.jpg",
    colSpanClass: "lg:col-span-4",
  },
  {
    id: "library",
    number: "03",
    name: "LIBRARY",
    category: "Knowledge Hub",
    description:
      "Over 15,000 curated volumes, international periodicals, and quiet research pods encouraging lifelong reading habits.",
    imageUrl: "/images/school/library.jpg",
    colSpanClass: "lg:col-span-4",
  },
  {
    id: "sports",
    number: "04",
    name: "SPORTS",
    category: "Athletics",
    description:
      "FIFA-standard artificial futsal arena, 400m synthetic running track, cricket practice nets, and multi-sport coaching.",
    imageUrl: "/images/school/sports.jpg",
    colSpanClass: "lg:col-span-8",
  },
  {
    id: "transport",
    number: "05",
    name: "TRANSPORT",
    category: "Student Safety",
    description:
      "Modern GPS-tracked, air-conditioned bus fleet covering all key zones across Madurai with dedicated staff supervision.",
    imageUrl: "/images/school/campus.jpg",
    colSpanClass: "lg:col-span-6",
  },
  {
    id: "campus-facilities",
    number: "06",
    name: "CAMPUS FACILITIES",
    category: "Infrastructure",
    description:
      "Sprawling 10-acre eco-friendly campus, cosmic planetarium, modern dining hall, and full-time pediatric health center.",
    imageUrl: "/images/school/campus.jpg",
    colSpanClass: "lg:col-span-6",
  },
];

export default function FacilitiesSection() {
  return (
    <section
      id="facilities"
      className="relative z-20 w-full bg-[#F7F4EC] text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="OUR CAMPUS"
          title="A Campus Designed For Discovery"
          subtitle="Explore modern facilities tailored to spark scientific wonder, athletic excellence, creative expression, and student safety."
        />

        {/* Varied Image-led Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 w-full">
          {FACILITIES.map((fac, idx) => (
            <Reveal
              key={fac.id}
              direction="up"
              delay={idx * 70}
              duration={650}
              className={`${fac.colSpanClass} w-full`}
            >
              <div className="group relative h-[360px] sm:h-[400px] rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl border border-[#0B1B33]/10 flex flex-col justify-end p-7 sm:p-8 cursor-pointer hover:-translate-y-1.5 transition-all duration-400">
                {/* Background Image with Hover Scale */}
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/60 to-black/15 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content */}
                <div className="relative z-10 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl sm:text-2xl font-black text-[#C99732] font-mono">
                      {fac.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/15 px-3 py-1 rounded-full text-slate-100 backdrop-blur-sm border border-white/10">
                      {fac.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#C99732] transition-colors leading-snug">
                    {fac.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-xl">
                    {fac.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#C99732] uppercase tracking-wider">
                    <span>Explore Space</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
