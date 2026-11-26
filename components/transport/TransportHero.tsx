"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TransportHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const diag1Ref = useRef<HTMLDivElement>(null);
  const diag2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Cinematic reveal: overlay sweeps up
      tl.to(overlayRef.current, { scaleY: 0, transformOrigin: "top center", duration: 1.2, ease: "expo.inOut" })
        .from(tagRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(headlineRef.current!.querySelectorAll(".word"), {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power4.out",
        }, "-=0.3")
        .from(subRef.current, { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(diag1Ref.current, { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.out" }, "-=0.6")
        .from(diag2Ref.current, { scaleX: 0, transformOrigin: "right center", duration: 0.8, ease: "power2.out" }, "-=0.7");

      // Subtle parallax on image while scrolling
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef }
  );

  const headline = "SAFE JOURNEYS. BRIGHTER FUTURES.";
  const words = headline.split(" ").map((w, i) => (
    <span key={i} className="word inline-block mr-[0.2em]">{w}</span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-[#032A1C]"
    >
      {/* Background image with parallax */}
      <div ref={imgRef} className="absolute inset-0 w-full h-[115%] top-0">
        <Image
          src="/img/transport/bus-hero.jpg"
          alt="SAM Universe school bus"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark-green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#032A1C] via-[#032A1Ccc] to-[#032A1C55]" />
      </div>

      {/* Cinematic reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-[#064E35] origin-top"
      />

      {/* Decorative diagonal shapes */}
      <div
        ref={diag1Ref}
        className="absolute top-0 left-0 w-[55%] h-1 bg-[#35A853] opacity-80 origin-left"
        style={{ top: "72%", transform: "skewY(-2deg)" }}
      />
      <div
        ref={diag2Ref}
        className="absolute right-0 w-[40%] h-[3px] bg-[#35A853] opacity-60 origin-right"
        style={{ top: "55%", transform: "skewY(2deg)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
        <span
          ref={tagRef}
          className="inline-block mb-5 text-xs font-bold tracking-[0.25em] uppercase text-[#35A853] border border-[#35A853] px-4 py-1.5 rounded-full"
        >
          Sri Aurobindo Mira Universal School — Transport
        </span>

        <h1
          ref={headlineRef}
          className="overflow-hidden text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {words}
        </h1>

        <p
          ref={subRef}
          className="max-w-xl text-[#DDF5D2] text-base md:text-lg leading-relaxed mb-10 font-medium"
        >
          Every child deserves a safe, comfortable journey to and from school.
          Our dedicated transport team ensures each student travels with care,
          supervision, and reliability — every single day.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a
            href="#safety-section"
            className="inline-flex items-center gap-2 bg-[#35A853] hover:bg-[#2a8c43] text-white font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 shadow-lg"
          >
            Explore Transport
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 border-2 border-[#DDF5D2] text-[#DDF5D2] hover:bg-[#DDF5D2] hover:text-[#064E35] font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300"
          >
            Transport Enquiry
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] text-[#DDF5D2] uppercase opacity-70">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#35A853] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
