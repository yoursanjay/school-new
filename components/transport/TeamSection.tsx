"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const teamValues = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    label: "Background Verified",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: "Safety Trained",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    label: "Student-Friendly",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: "School Approved",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".team-headline", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".team-img-left", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-img-left",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".team-content-right", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-content-right",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".team-badge", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".team-badges-row",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="team-section"
      ref={sectionRef}
      className="bg-[#F4FCF0] py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[3px] w-12 bg-[#064E35] rounded-full" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#064E35]">
            04 — Our Trusted Team
          </span>
        </div>

        <h2
          className="team-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#064E35] leading-tight mb-14"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          PEOPLE YOU<br />
          <span className="text-[#35A853]">CAN TRUST.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: image */}
          <div className="team-img-left relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/img/about/special-educators.webp"
              alt="SAM Universe transport team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Green bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#064E35] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium leading-snug">
                Our drivers and attendants are carefully selected, trained and
                supervised to put children first.
              </p>
            </div>
          </div>

          {/* Right: text + badges */}
          <div className="team-content-right">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              Behind every safe school journey is a team of responsible,
              caring individuals. Our drivers are experienced, courteous and
              hold valid commercial licences. Every bus is accompanied by a
              dedicated attendant who ensures orderly boarding, monitors
              student behaviour and maintains a secure environment throughout
              the journey.
            </p>

            <div className="team-badges-row grid grid-cols-2 gap-4 mb-8">
              {teamValues.map((v, i) => (
                <div
                  key={i}
                  className="team-badge flex items-center gap-3 bg-white border border-[#DDF5D2] rounded-xl px-4 py-3 shadow-sm"
                >
                  <span className="text-[#35A853]">{v.icon}</span>
                  <span className="text-[#064E35] font-semibold text-sm">{v.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#064E35] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-base mb-2">Staff Responsibilities</h3>
              <ul className="space-y-2 text-[#DDF5D2] text-sm">
                <li className="flex items-start gap-2"><span className="text-[#35A853] mt-0.5">✓</span> Ensure all students are seated and secure before departure</li>
                <li className="flex items-start gap-2"><span className="text-[#35A853] mt-0.5">✓</span> Confirm student identity at pick-up and drop-off</li>
                <li className="flex items-start gap-2"><span className="text-[#35A853] mt-0.5">✓</span> Report any incidents to the transport coordinator immediately</li>
                <li className="flex items-start gap-2"><span className="text-[#35A853] mt-0.5">✓</span> Maintain discipline and a calm, safe environment on board</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
