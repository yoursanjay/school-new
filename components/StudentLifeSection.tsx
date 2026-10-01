"use client";

import React from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowUpRight } from "lucide-react";

interface ActivityCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ACTIVITIES: ActivityCard[] = [
  {
    id: "sports",
    tag: "Athletics",
    title: "SPORTS",
    description:
      "Competitive athletics, futsal championships, cricket academies, yoga, and gymnastics building sportsmanship, resilience, and endurance.",
    imageUrl: "/images/school/sports.jpg",
  },
  {
    id: "arts",
    tag: "Fine & Stage Arts",
    title: "ARTS & CULTURE",
    description:
      "Classical dance, music ensembles, studio fine arts, theatre, and stage performances inspiring bold imagination and aesthetic confidence.",
    imageUrl: "/images/school/arts.jpg",
  },
  {
    id: "science",
    tag: "STEM & Robotics",
    title: "SCIENCE & INNOVATION",
    description:
      "Hands-on robotics clubs, astronomy nights in the planetarium, coding hackathons, and sustainable green engineering projects.",
    imageUrl: "/images/school/science.jpg",
  },
  {
    id: "clubs",
    tag: "Leadership",
    title: "CLUBS & ACTIVITIES",
    description:
      "Model United Nations, literary societies, debate forums, eco-clubs, and student council governance shaping empathetic global leaders.",
    imageUrl: "/images/school/classroom.jpg",
  },
];

export default function StudentLifeSection() {
  return (
    <section
      id="student-life"
      className="relative z-20 w-full bg-white text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="STUDENT LIFE"
          title="Learning Beyond The Classroom"
          subtitle="A vibrant campus community where athletics, fine arts, scientific discovery, and active student clubs cultivate well-rounded global citizens."
          align="center"
        />

        {/* 4 Large Image Cards with Hover Motion */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {ACTIVITIES.map((act, idx) => (
            <Reveal
              key={act.id}
              direction="up"
              delay={idx * 100}
              duration={650}
              className="h-full"
            >
              <div className="group relative h-[440px] sm:h-[480px] rounded-[24px] overflow-hidden border border-[#0B1B33]/10 shadow-sm hover:shadow-xl flex flex-col justify-between p-7 cursor-pointer hover:-translate-y-1.5 transition-all duration-400">
                {/* Background Image with Hover Scale 1.05 */}
                <img
                  src={act.imageUrl}
                  alt={act.title}
                  className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Subtle Overlay with Hover Transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/65 to-black/20 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Category Badge */}
                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] bg-white/15 px-3 py-1 rounded-full text-slate-100 backdrop-blur-md border border-white/10">
                    {act.tag}
                  </span>
                </div>

                {/* Bottom Content with upward hover movement */}
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#C99732] transition-colors leading-tight">
                    {act.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {act.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#C99732] uppercase tracking-wider">
                    <span>Discover Activities</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
