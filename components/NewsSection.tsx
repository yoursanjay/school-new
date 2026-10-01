"use client";

import React, { useState } from "react";
import SectionContainer from "./SectionContainer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import { Calendar, Tag, ArrowRight, X } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  fullStory: string;
  imageUrl: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-sports",
    date: "18 FEB 2026",
    category: "Athletics & Sports",
    title: "Annual Sports Meet & Athletic Championship",
    description:
      "A thrilling display of track and field events, teamwork, and sportsman spirit across houses with our newly inaugurated synthetic track.",
    fullStory:
      "The Annual Sports Meet at Sri Aurobindo Mira brought together hundreds of energetic student athletes across all grade levels. Events included 100m/400m sprint championships, high jump, relay matches, and a grand march past led by the school student council. Dignitaries and coaches commended our athletes for their discipline and sporting ethics.",
    imageUrl: "/images/school/sports.jpg",
  },
  {
    id: "news-awards",
    date: "12 JAN 2026",
    category: "Academic Distinction",
    title: "Academic Excellence Awards & Merit Honors",
    description:
      "Celebrating exceptional CBSE scholastic milestones, subject centum toppers, and research innovators who demonstrate exemplary dedication.",
    fullStory:
      "Our annual Academic Honours Convocation recognized high achievers in CBSE secondary and senior secondary programs. Over 45 scholars received gold distinction pins for securing top ranks in national olympiads, conceptual mathematics, and collaborative literature essays, celebrating continuous intellectual growth.",
    imageUrl: "/images/school/students.jpg",
  },
  {
    id: "news-science",
    date: "04 DEC 2025",
    category: "STEM & Research",
    title: "Science & Innovation Exhibition",
    description:
      "Student scientists showcased working AI robotics models, renewable energy prototypes, and space exploration research projects in our campus lab.",
    fullStory:
      "The Science & Innovation Exhibition transformed our school STEM wing into an interactive research hub. Students from Middle and Senior School presented over 60 working working models, spanning automated drip irrigation, astrophysics telemetry, drone technology, and bio-degradable polymer alternatives.",
    imageUrl: "/images/school/science.jpg",
  },
];

export default function NewsSection() {
  const [activeStory, setActiveStory] = useState<NewsItem | null>(null);

  return (
    <section
      id="news"
      className="relative z-20 w-full bg-white text-[#0B1B33] overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(80px, 8vw, 120px)",
        borderTop: "1px solid rgba(11, 27, 51, 0.08)",
      }}
    >
      <SectionContainer>
        <SectionHeading
          badge="LATEST NEWS & EVENTS"
          title="Latest News & Events"
          subtitle="Discover recent scholastic achievements, athletic triumphs, cultural showcases, and community milestones from our campus."
          align="center"
        />

        {/* 3 News Cards with Staggered Reveal */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {NEWS_ITEMS.map((item, idx) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={idx * 120}
              duration={650}
              className="h-full"
            >
              <article className="group h-full rounded-[24px] overflow-hidden bg-[#F7F4EC]/60 border border-[#0B1B33]/10 shadow-sm hover:shadow-xl hover:border-[#C99732]/50 hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between">
                <div>
                  {/* Image with clip-path reveal and hover scale */}
                  <ImageReveal delay={idx * 120 + 40} duration={800}>
                    <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B1B33] flex items-center gap-1.5 shadow-sm border border-[#0B1B33]/10">
                        <Tag className="w-3 h-3 text-[#C99732]" />
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </ImageReveal>

                  {/* Body Content */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#667085] mb-3">
                      <Calendar className="w-3.5 h-3.5 text-[#C99732]" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xl font-black text-[#0B1B33] group-hover:text-[#C99732] transition-colors leading-snug tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#667085] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Read More Trigger */}
                <div className="px-7 pb-7 pt-2 border-t border-[#0B1B33]/10">
                  <button
                    type="button"
                    onClick={() => setActiveStory(item)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1B33] group-hover:text-[#C99732] transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionContainer>

      {/* Story Lightbox Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 z-[10002] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveStory(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B1B33] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block text-[11px] font-bold text-[#C99732] uppercase tracking-[0.2em] mb-2">
              {activeStory.category} • {activeStory.date}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B33] leading-tight mb-4 tracking-tight">
              {activeStory.title}
            </h3>

            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden mb-5 bg-slate-200">
              <img
                src={activeStory.imageUrl}
                alt={activeStory.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {activeStory.fullStory}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
