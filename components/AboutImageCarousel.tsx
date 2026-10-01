"use client";

import React, { useState, useEffect } from "react";
import { Award, CheckCircle2 } from "lucide-react";

interface AboutImageCarouselProps {
  isRevealed: boolean;
  prefersReducedMotion: boolean;
  imageParallaxY: number;
  characterParallaxY: number;
}

const CAROUSEL_IMAGES = [
  {
    src: "/images/school/classroom.jpg",
    alt: "Students actively engaged in collaborative CBSE classroom learning",
    caption: "Interactive Classroom",
  },
  {
    src: "/images/school/students.jpg",
    alt: "Inspiring faculty mentoring students in academic workshop",
    caption: "Teacher Mentorship",
  },
  {
    src: "/images/school/campus.jpg",
    alt: "Sri Aurobindo Mira modern green educational campus in Keelamathur, Madurai",
    caption: "Campus Grounds",
  },
  {
    src: "/images/school/science.jpg",
    alt: "Students conducting experiential scientific research in modern lab",
    caption: "Science & Discovery",
  },
  {
    src: "/images/school/library.jpg",
    alt: "Modern school library with rich learning resources and study commons",
    caption: "Knowledge Library",
  },
];

const SLIDE_INTERVAL = 4000;

export default function AboutImageCarousel({
  isRevealed,
  prefersReducedMotion,
  imageParallaxY,
  characterParallaxY,
}: AboutImageCarouselProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [characterReady, setCharacterReady] = useState(false);

  // Transition character from entrance state to continuous floating loop
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setCharacterReady(true);
      }, 950);
      return () => clearTimeout(timer);
    } else {
      setCharacterReady(false);
    }
  }, [isRevealed]);

  // Automatic image carousel (4000ms interval, pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Preload next image to ensure smooth crossfade
  useEffect(() => {
    const nextIdx = (activeImage + 1) % CAROUSEL_IMAGES.length;
    const img = new Image();
    img.src = CAROUSEL_IMAGES[nextIdx].src;
  }, [activeImage]);

  // Image scroll reveal transform (Entrance: translateY(50px) scale(0.96) -> translateY(0) scale(1) + scroll parallax)
  const getImageRevealTransform = () => {
    if (prefersReducedMotion) return "none";
    if (!isRevealed) return "translate3d(0, 50px, 0) scale(0.96)";
    return `translate3d(0, ${imageParallaxY}px, 0) scale(1)`;
  };

  // Character scroll reveal transform (Entrance: translateX(80px) translateY(30px) scale(0.92) -> translateX(0) translateY(0) scale(1) + scroll parallax)
  const getCharacterRevealTransform = () => {
    if (prefersReducedMotion) return "none";
    if (!isRevealed) {
      return "translate3d(80px, 30px, 0) scale(0.92)";
    }
    return `translate3d(0, ${characterParallaxY}px, 0) scale(1)`;
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none py-4 sm:py-6">
      {/* Composition Wrapper: Sized to 440-460px with right offset for 3D character */}
      <div className="relative w-full max-w-[420px] sm:max-w-[450px] lg:max-w-[460px] mx-auto lg:mr-10 xl:mr-14">
        {/* ========================================================
            1. MAIN ROUNDED IMAGE COMPOSITION
            Aspect-ratio: 4 / 4.5
            Border-radius: 28px
            ======================================================== */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: getImageRevealTransform(),
            transition: prefersReducedMotion
              ? "opacity 700ms ease-out"
              : "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, opacity",
          }}
          className="relative z-10 w-full aspect-[4/4.5] rounded-[28px] overflow-hidden border-2 border-white/80 shadow-[0_25px_65px_rgba(11,27,51,0.15)] bg-[#0B1B33]"
          role="region"
          aria-label="School visual gallery"
        >
          {/* Layered Crossfade Images (Ken Burns 8-10s subtle alternate) */}
          {CAROUSEL_IMAGES.map((img, idx) => {
            const isActive = idx === activeImage;
            return (
              <div
                key={img.src}
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.02)",
                  transition: "opacity 900ms ease-in-out, transform 900ms ease-out",
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center block"
                  style={{
                    animation:
                      isActive && !prefersReducedMotion
                        ? "kenBurnsSubtle 9s ease-in-out infinite alternate"
                        : "none",
                    willChange: "transform",
                  }}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}

          {/* Subtle Dark Gradient from bottom for high contrast */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(11, 27, 51, 0.5) 0%, rgba(11, 27, 51, 0.12) 35%, transparent 65%)",
            }}
          />

          {/* Carousel Indicators (● ● ● ● ●) near bottom */}
          <div
            className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5"
            role="tablist"
            aria-label="Select slide"
          >
            {CAROUSEL_IMAGES.map((img, idx) => {
              const isActive = idx === activeImage;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${img.caption}`}
                  onClick={() => setActiveImage(idx)}
                  className="h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9962E]"
                  style={{
                    width: isActive ? "24px" : "8px",
                    backgroundColor: isActive
                      ? "#C9962E"
                      : "rgba(255, 255, 255, 0.65)",
                  }}
                />
              );
            })}
          </div>

          {/* ========================================================
              FLOATING EXPERIENCE CARD (Desktop: Overlapping bottom-left)
              ======================================================== */}
          <div
            className={`hidden sm:block absolute left-5 bottom-5 z-20 w-[190px] sm:w-[210px] bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#C9962E]/30 shadow-[0_15px_35px_rgba(11,27,51,0.16)] ${
              !prefersReducedMotion ? "animate-experience-card-float" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1B33] to-[#102A4A] flex items-center justify-center text-[#C9962E] shadow-sm shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#0B1B33] tracking-tight leading-none">
                  25+
                </div>
                <p className="text-[11px] font-semibold text-slate-700 leading-tight mt-1">
                  Years of Educational Excellence
                </p>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-bold text-[#C9962E] uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9962E] shrink-0" />
              <span className="truncate">CBSE AFFILIATION: 1930282</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. 3D CARTOON STUDENT CHARACTER
            - Positioned overlapping the right side of the About visual
            - Standing beside / overlapping school image
            - Entire character visible, no face cropping, z-index above image
            - Entrance scroll animation: translateX(80px) translateY(30px) scale(0.92) -> translateX(0) translateY(0) scale(1)
            - Subsequent floating animation: 4s ease-in-out infinite translateY(-12px) rotate(±1deg)
            ======================================================== */}
        <div
          className="absolute z-30 pointer-events-none select-none right-[-10px] sm:right-[-35px] lg:right-[-65px] xl:right-[-70px] bottom-[-10px] sm:bottom-[-15px] lg:bottom-[-20px]"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: getCharacterRevealTransform(),
            transition: prefersReducedMotion
              ? "opacity 700ms ease-out"
              : "opacity 900ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, opacity",
          }}
        >
          <div
            className={`w-[200px] xs:w-[230px] sm:w-[280px] lg:w-[340px] xl:w-[370px] relative ${
              characterReady && !prefersReducedMotion
                ? "animate-student-float"
                : ""
            }`}
            style={{ willChange: "transform" }}
          >
            <img
              src="/images/about-student.png"
              alt="3D cartoon school student representing student life at Sri Aurobindo Mira Universal School"
              className="w-full h-auto object-contain block drop-shadow-[0_20px_40px_rgba(11,27,51,0.22)]"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE ONLY: Floating Experience Card placed normally below image
          Order on mobile: image carousel -> 3D character -> experience card -> highlight cards -> statistics
          ======================================================== */}
      <div className="sm:hidden w-full max-w-[380px] mt-4 bg-white/95 rounded-2xl p-4 border border-[#C9962E]/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B1B33] flex items-center justify-center text-[#C9962E] shadow-sm shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0B1B33] tracking-tight leading-none">
              25+
            </div>
            <p className="text-[12px] font-semibold text-slate-700 leading-tight mt-1">
              Years of Educational Excellence
            </p>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-[#C9962E] uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9962E] shrink-0" />
          <span>CBSE AFFILIATION: 1930282</span>
        </div>
      </div>
    </div>
  );
}
