"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const comfortPoints = [
  { label: "Well-Maintained Vehicles", desc: "Buses are regularly inspected and serviced to keep every journey smooth and safe." },
  { label: "Clean & Orderly Interiors", desc: "Cleanliness standards are maintained daily to ensure a pleasant environment for students." },
  { label: "Adequate Seating", desc: "Routes are planned so no student travels in overcrowded or uncomfortable conditions." },
  { label: "Courteous Conduct", desc: "Drivers and attendants are trained to treat every child with patience and respect." },
];

export default function ComfortSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Headline
      gsap.from(".comfort-headline", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".comfort-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Photos — parallax + stagger reveal
      gsap.from(".comfort-photo", {
        y: 50,
        opacity: 0,
        stagger: 0.18,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".comfort-photos-row",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // List items
      gsap.from(".comfort-list-item", {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".comfort-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // CTA block
      gsap.from(".comfort-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".comfort-cta",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="comfort-section"
      ref={sectionRef}
      className="bg-white py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[3px] w-12 bg-[#35A853] rounded-full" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#35A853]">
            05 — Comfortable School Journeys
          </span>
        </div>

        <h2
          className="comfort-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#064E35] leading-tight mb-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          A BETTER RIDE,<br />
          <span className="text-[#35A853]">EVERY DAY.</span>
        </h2>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-12 max-w-2xl">
          A comfortable journey prepares students to arrive at school ready to
          learn. We invest in vehicle upkeep, cleanliness and professional
          conduct to make every trip pleasant for every child.
        </p>

        {/* Photo strip */}
        <div className="comfort-photos-row grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { src: "/img/transport/bus-hero.jpg", label: "School Transport" },
            { src: "/img/transport/students-uniform.jpg", label: "Our Students" },
            { src: "/img/about/campus-entrance.webp", label: "School Campus" },
          ].map((photo, i) => (
            <div
              key={i}
              className="comfort-photo relative h-56 rounded-2xl overflow-hidden group shadow-lg"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#064E35cc] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-bold uppercase tracking-widest">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Comfort points */}
        <div className="comfort-list grid sm:grid-cols-2 gap-5 mb-16">
          {comfortPoints.map((pt, i) => (
            <div
              key={i}
              className="comfort-list-item flex gap-4 items-start bg-[#F4FCF0] rounded-xl p-5 border border-[#DDF5D2]"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#35A853] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#064E35] text-sm mb-1">{pt.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="comfort-cta bg-[#064E35] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
          {/* Decorative diagonal */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#35A853] opacity-10 hidden md:block"
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#35A853] mb-4 block">
              Get in Touch
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold leading-tight mb-4">
              INTERESTED IN<br />SCHOOL TRANSPORT?
            </h3>
            <p className="text-[#DDF5D2] text-base leading-relaxed mb-8">
              Contact our transport office to learn about available routes,
              fee structure and registration for the upcoming academic year.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-[#35A853] hover:bg-[#2a8c43] text-white font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 shadow-lg"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center border-2 border-[#DDF5D2] text-[#DDF5D2] hover:bg-[#DDF5D2] hover:text-[#064E35] font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-300"
              >
                Transport Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
