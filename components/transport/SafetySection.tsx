"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const safetyPoints = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Supervised Boarding & Alighting",
    desc: "A trained attendant accompanies every bus to ensure students board and exit safely at every stop.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Timely & Reliable Service",
    desc: "Fixed departure and arrival schedules so parents can plan their day with confidence.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Student Roll-Call System",
    desc: "Attendance is tracked at pick-up and drop-off to confirm every child's safe arrival.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Parent Communication",
    desc: "Direct contact channels between transport staff and parents for any update or concern.",
  },
];

export default function SafetySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Headline reveal
      gsap.from(".safety-headline", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".safety-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards staggered
      gsap.from(".safety-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".safety-cards-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Right image — mask reveal
      gsap.fromTo(
        ".safety-img-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".safety-img-wrap",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Label line
      gsap.from(".safety-label", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".safety-label",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="safety-section"
      ref={sectionRef}
      className="bg-white py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="safety-label h-[3px] w-12 bg-[#35A853] rounded-full" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#35A853]">
            02 — Student Safety
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="safety-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#064E35] leading-tight mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              YOUR CHILD'S SAFETY<br />
              <span className="text-[#35A853]">COMES FIRST.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
              Every decision in our transport programme starts with one
              question: is this safe for our students? From trained drivers and
              accompanying attendants to fixed routes and roll-call tracking,
              safety is woven into every journey.
            </p>

            <div className="safety-cards-grid grid sm:grid-cols-2 gap-5">
              {safetyPoints.map((pt, i) => (
                <div
                  key={i}
                  className="safety-card bg-[#F4FCF0] rounded-2xl p-5 border border-[#DDF5D2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-[#35A853] mb-3">{pt.icon}</div>
                  <h3 className="font-bold text-[#064E35] text-sm mb-2 uppercase tracking-wide">
                    {pt.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with mask */}
          <div className="safety-img-wrap relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/img/transport/students-uniform.jpg"
              alt="SAM Universe students in school uniform"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Green diagonal accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#064E35] to-transparent"
            />
            <div className="absolute bottom-6 left-6">
              <span className="bg-[#35A853] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                Every Student. Every Day.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
