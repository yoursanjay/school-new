"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  grade: string;
  avatarInitial: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Sri Aurobindo Mira has provided our daughter with not just CBSE academic excellence, but genuine curiosity and moral groundedness. Her teachers recognize her unique talents and mentor her with profound care and dedication.",
    author: "Dr. K. Senthil Nathan",
    role: "Senior Consultant Surgeon",
    grade: "Parent of Ananya (Grade 10, CBSE)",
    avatarInitial: "SN",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The robotics research labs, digital classrooms, and synthetic sports turf have transformed my son's school life. The balance between timeless human values and modern world skills is truly peerless.",
    author: "Meenakshi Sundaram",
    role: "Tech Entrepreneur & Alumni Parent",
    grade: "Parent of Siddharth (Grade 8, Middle Years)",
    avatarInitial: "MS",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Choosing SAM Universal was the finest decision for our family. The compassionate teachers, safe transport, and inspiring arts curriculum nurture each child into a confident, kind, and capable individual ready for life.",
    author: "Rajeshwari Venkat",
    role: "Chartered Accountant",
    grade: "Parent of Aadhav (Grade 4, Primary Years)",
    avatarInitial: "RV",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const el = document.getElementById("testimonials");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative z-20 w-full bg-[#F7F4EC] text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        {/* Header with Nav Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge="TESTIMONIALS"
            title="What Our Families Say"
            subtitle="Discover how Sri Aurobindo Mira Universal School transforms young learners through academic distinction, character, and lifelong confidence."
          />

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-[#0B1B33]/20 bg-white hover:bg-[#0B1B33] text-[#0B1B33] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-[#0B1B33]/20 bg-white hover:bg-[#0B1B33] text-[#0B1B33] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Desktop 3-Card Layout with Center Focus */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 w-full items-stretch">
            {TESTIMONIALS.map((item, idx) => {
              const isCenter = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative p-8 sm:p-9 rounded-[28px] transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isCenter
                      ? "bg-white shadow-[0_20px_50px_rgba(11,27,51,0.12)] border-2 border-[#C99732] scale-[1.02] z-20"
                      : "bg-white/70 shadow-sm border border-[#0B1B33]/10 opacity-75 hover:opacity-100 hover:scale-[1.01] z-10"
                  }`}
                >
                  <div>
                    {/* Header: Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#C99732] text-[#C99732]"
                          />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-[#C99732]/30" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-700 text-base leading-relaxed italic mb-8 font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-6 border-t border-[#0B1B33]/10 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B1B33] to-[#102A4A] text-[#C99732] font-black text-sm flex items-center justify-center shadow-inner shrink-0 font-mono">
                      {item.avatarInitial}
                    </div>
                    <div>
                      <h4 className="font-black text-[#0B1B33] text-base tracking-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-[#667085] font-medium">
                        {item.role}
                      </p>
                      <p className="text-xs text-[#C99732] font-bold mt-0.5">
                        {item.grade}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile / Tablet View: Active Card */}
          <div className="lg:hidden w-full">
            <div className="relative p-7 sm:p-9 rounded-[28px] bg-white shadow-xl border border-[#0B1B33]/10 transition-all duration-400">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C99732] text-[#C99732]"
                    />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-[#C99732]/30" />
              </div>

              <p className="text-slate-700 text-base leading-relaxed italic mb-6 font-normal">
                &ldquo;{TESTIMONIALS[currentIndex].quote}&rdquo;
              </p>

              <div className="pt-5 border-t border-[#0B1B33]/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0B1B33] to-[#102A4A] text-[#C99732] font-black text-sm flex items-center justify-center shrink-0 font-mono">
                  {TESTIMONIALS[currentIndex].avatarInitial}
                </div>
                <div>
                  <h4 className="font-black text-[#0B1B33] text-base tracking-tight">
                    {TESTIMONIALS[currentIndex].author}
                  </h4>
                  <p className="text-xs text-[#667085]">
                    {TESTIMONIALS[currentIndex].role}
                  </p>
                  <p className="text-xs text-[#C99732] font-bold">
                    {TESTIMONIALS[currentIndex].grade}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-[#C99732]"
                    : "w-2.5 h-2.5 bg-[#0B1B33]/20 hover:bg-[#0B1B33]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
