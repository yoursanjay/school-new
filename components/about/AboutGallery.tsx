"use client";

import React from "react";

interface AboutGalleryProps {
  isRevealed: boolean;
  prefersReducedMotion: boolean;
}

const GALLERY_STRIP = [
  {
    src: "/images/school/arts.jpg",
    alt: "Students exploring visual arts and performing expression in campus studio",
    caption: "Creative Arts Studio",
  },
  {
    src: "/images/digital-classroom.jpg",
    alt: "Next-generation digital interactive smart classroom learning",
    caption: "Smart Classroom",
  },
  {
    src: "/images/innovation.jpg",
    alt: "Hands-on robotics and experiential STEM innovation workspace",
    caption: "STEM & Robotics",
  },
  {
    src: "/images/middle-school.jpg",
    alt: "Collaborative student discussion, inquiry and debate session",
    caption: "Inquiry & Seminars",
  },
];

export default function AboutGallery({
  isRevealed,
  prefersReducedMotion,
}: AboutGalleryProps) {
  return (
    <div
      className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
      style={{ marginTop: "60px" }}
      aria-label="Campus visual moments"
    >
      {GALLERY_STRIP.map((item, idx) => {
        const delay = 100 + idx * 100;

        const revealStyle: React.CSSProperties = prefersReducedMotion
          ? {
              opacity: isRevealed ? 1 : 0,
              transition: `opacity 600ms ease-out ${delay}ms`,
            }
          : {
              opacity: isRevealed ? 1 : 0,
              clipPath: isRevealed
                ? "inset(0% 0 0% 0)"
                : "inset(15% 0 15% 0)",
              transition: `clip-path 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 800ms ease-out ${delay}ms`,
              willChange: "clip-path, opacity",
            };

        return (
          <div
            key={item.src}
            style={revealStyle}
            className="group relative h-[180px] rounded-[16px] overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(16,35,63,0.12)] transition-shadow duration-300 bg-slate-200 border border-white/60"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />

            {/* Subtle bottom caption gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10233F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-3.5">
              <span className="text-white text-xs font-semibold tracking-wide drop-shadow-sm">
                {item.caption}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
