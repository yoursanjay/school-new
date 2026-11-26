"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const routeFeatures = [
  {
    num: "01",
    title: "Defined Coverage Zones",
    desc: "Our routes are carefully designed to cover all major residential areas in Madurai, minimising travel time for every student.",
  },
  {
    num: "02",
    title: "Fixed Pickup & Drop Points",
    desc: "Clearly communicated stop locations so families know exactly where and when to meet the bus each day.",
  },
  {
    num: "03",
    title: "Route-Specific Attendants",
    desc: "Each route has a dedicated attendant who knows the students by name and maintains order and safety.",
  },
  {
    num: "04",
    title: "Direct Transport Office Line",
    desc: "Parents can contact the transport coordinator directly for any route update, concern or schedule change.",
  },
];

export default function RouteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".route-headline", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".route-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".route-img-panel", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".route-img-panel",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".route-feature-item", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".route-features-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animated line drawing
      gsap.from(".route-line-anim", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".route-features-list",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="route-section"
      ref={sectionRef}
      className="bg-[#064E35] py-20 md:py-28 relative overflow-hidden"
    >
      {/* Diagonal background shape */}
      <div
        className="absolute inset-y-0 right-0 w-[45%] bg-[#053d2a] hidden md:block"
        style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[3px] w-12 bg-[#35A853] rounded-full" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#35A853]">
            03 — Live Route Experience
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text + route features */}
          <div>
            <h2
              className="route-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              EVERY ROUTE,<br />
              <span className="text-[#35A853]">CONNECTED.</span>
            </h2>
            <p className="text-[#DDF5D2] text-base md:text-lg leading-relaxed mb-10">
              Our transport network is designed to serve families across
              Madurai with consistency and care. Each route is staffed,
              supervised and communicated clearly to parents throughout the
              school year.
            </p>

            <div className="route-features-list relative pl-6">
              {/* Animated vertical line */}
              <div className="route-line-anim absolute left-0 top-0 bottom-0 w-[2px] bg-[#35A853]" />

              {routeFeatures.map((f, i) => (
                <div key={i} className="route-feature-item relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[#35A853] border-2 border-[#064E35]" />
                  <span className="text-[#35A853] text-xs font-bold tracking-widest">{f.num}</span>
                  <h3 className="text-white font-bold text-base mt-1 mb-1">{f.title}</h3>
                  <p className="text-[#DDF5D2] text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image panel */}
          <div className="route-img-panel relative h-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/img/transport/students-uniform.jpg"
              alt="SAM Universe students"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#064E35aa] to-transparent" />

            {/* Decorative pin graphic */}
            <div className="absolute top-6 right-6 bg-[#35A853] text-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-xs font-bold uppercase tracking-wide">Madurai Routes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
