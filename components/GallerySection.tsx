"use client";

import React, { useState, useEffect } from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "campus" | "academics" | "sports" | "culture";
  categoryLabel: string;
  imageUrl: string;
  gridClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Campus Grounds & Architectural Facade",
    category: "campus",
    categoryLabel: "Campus",
    imageUrl: "/images/school/campus.jpg",
    gridClass: "md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[500px]",
  },
  {
    id: "g2",
    title: "Hands-on Science & Innovation Laboratory",
    category: "academics",
    categoryLabel: "Academics",
    imageUrl: "/images/school/science.jpg",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    id: "g3",
    title: "Cultural Arts, Music & Performing Studio",
    category: "culture",
    categoryLabel: "Culture",
    imageUrl: "/images/school/arts.jpg",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[240px]",
  },
  {
    id: "g4",
    title: "FIFA-Standard Futsal Turf & 400m Track",
    category: "sports",
    categoryLabel: "Sports",
    imageUrl: "/images/school/sports.jpg",
    gridClass: "md:col-span-2 md:row-span-1 min-h-[260px]",
  },
  {
    id: "g5",
    title: "Resource-Rich Research Library",
    category: "campus",
    categoryLabel: "Library",
    imageUrl: "/images/school/library.jpg",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[260px]",
  },
  {
    id: "g6",
    title: "Smart Collaborative Classroom Learning",
    category: "academics",
    categoryLabel: "Academics",
    imageUrl: "/images/school/classroom.jpg",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[260px]",
  },
];

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === filteredItems.length - 1 ? 0 : prev + 1) : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section
      id="gallery"
      className="relative z-20 w-full bg-[#F7F4EC] text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="CAMPUS GALLERY"
          title="Campus Gallery"
          subtitle="Explore the spirit, laughter, intellectual milestones, and vibrant celebrations that define our school community."
          align="center"
        />

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Moments" },
            { id: "campus", label: "Campus" },
            { id: "academics", label: "Academics" },
            { id: "sports", label: "Sports" },
            { id: "culture", label: "Culture" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#0B1B33] text-white shadow-md border border-[#0B1B33]"
                  : "bg-white text-slate-700 hover:bg-[#0B1B33]/5 border border-[#0B1B33]/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Asymmetric Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 w-full">
          {filteredItems.map((item, idx) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={idx * 70}
              duration={650}
              className={`${item.gridClass} w-full`}
            >
              <div
                className="group relative w-full h-full rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl border border-[#0B1B33]/10 cursor-pointer hover:-translate-y-1.5 transition-all duration-400 bg-slate-200"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image with hover zoom */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
                  loading="lazy"
                />

                {/* Dark Hover Overlay with details & zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/90 via-[#0B1B33]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99732] bg-white/15 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      {item.categoryLabel}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10002] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Prev Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                lightboxIndex === 0
                  ? filteredItems.length - 1
                  : lightboxIndex - 1
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/25 flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[82vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col bg-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[72vh] w-auto object-contain mx-auto"
            />
            <div className="p-4 bg-[#0B1B33]/95 text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-[11px] font-bold text-[#C99732] uppercase tracking-wider block">
                  {filteredItems[lightboxIndex].categoryLabel}
                </span>
                <p className="text-sm sm:text-base font-bold text-white">
                  {filteredItems[lightboxIndex].title}
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>

          {/* Right / Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                lightboxIndex === filteredItems.length - 1
                  ? 0
                  : lightboxIndex + 1
              );
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/25 flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </section>
  );
}
