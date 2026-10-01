"use client";

import React from "react";
import SectionContainer from "./SectionContainer";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle, Calendar, GraduationCap } from "lucide-react";

export default function AdmissionsSection() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const offsetTop =
        contactEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="admissions"
      className="relative z-20 w-full bg-[#0B1B33] text-white overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(201, 151, 50, 0.25)",
      }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C99732]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#102A4A] rounded-full blur-[120px] pointer-events-none" />

      <SectionContainer>
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#102A4A]/90 to-[#0B1B33] border border-[#C99732]/35 shadow-2xl p-8 sm:p-14 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT: Text & CTA Actions (7 cols) */}
            <div className="lg:col-span-7">
              {/* Small Eyebrow Badge */}
              <Reveal direction="down" duration={500}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.24em] bg-[#C99732]/20 text-[#E2B64A] border border-[#C99732]/40 mb-6 w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99732]" />
                  <span>ADMISSIONS 2026 – 2027</span>
                </div>
              </Reveal>

              {/* Main Heading */}
              <Reveal direction="up" delay={60} duration={650}>
                <h2
                  className="font-black tracking-[-0.03em] text-white"
                  style={{
                    fontSize: "clamp(34px, 4vw, 56px)",
                    lineHeight: 1.08,
                  }}
                >
                  Start Your Child&apos;s Journey
                </h2>
              </Reveal>

              {/* Supporting Text */}
              <Reveal direction="up" delay={120} duration={650}>
                <p className="mt-5 text-base sm:text-lg text-slate-200 leading-[1.7] max-w-xl font-normal">
                  Discover a nurturing learning environment designed to help every
                  child learn, grow and lead. Join a vibrant school community
                  grounded in academic excellence and timeless human values.
                </p>
              </Reveal>

              {/* Small Supporting Information Badges */}
              <Reveal direction="up" delay={160} duration={650}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100">
                    <CheckCircle className="w-4 h-4 text-[#C99732]" />
                    <span>Admissions Open</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100">
                    <GraduationCap className="w-4 h-4 text-[#C99732]" />
                    <span>CBSE Curriculum</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100">
                    <Calendar className="w-4 h-4 text-[#C99732]" />
                    <span>Campus Visits Available</span>
                  </div>
                </div>
              </Reveal>

              {/* CTA Buttons */}
              <Reveal direction="up" delay={220} duration={650}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {/* Gold Apply Now CTA */}
                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-black text-sm tracking-wide text-[#0B1B33] transition-all duration-300 shadow-[0_8px_25px_rgba(201,151,50,0.35)] hover:shadow-[0_12px_32px_rgba(201,151,50,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase select-none"
                    style={{
                      background: "linear-gradient(135deg, #E2B64A 0%, #C99732 100%)",
                    }}
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* Secondary Contact Admissions */}
                  <a
                    href="tel:+919047077677"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase select-none"
                  >
                    <PhoneCall className="w-4 h-4 text-[#E2B64A]" />
                    <span>Contact Admissions</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Campus & Student Image Card (5 cols) */}
            <div className="lg:col-span-5 relative w-full">
              <ImageReveal delay={150} duration={850}>
                <div className="relative w-full rounded-[24px] overflow-hidden border-2 border-[#C99732]/35 shadow-2xl bg-[#0B1B33] min-h-[320px] sm:min-h-[380px]">
                  <img
                    src="/images/school/campus.jpg"
                    alt="Sri Aurobindo Mira Campus"
                    className="w-full h-full object-cover object-center block hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold text-[#E2B64A] uppercase tracking-[0.2em] block mb-1">
                      Campus Admissions Desk
                    </span>
                    <p className="text-sm font-bold leading-snug">
                      Keelamathur, Melakkal Main Road, Madurai
                    </p>
                  </div>
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
