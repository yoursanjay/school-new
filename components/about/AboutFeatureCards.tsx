"use client";

import React from "react";
import { Sparkles, Compass, Award } from "lucide-react";

interface AboutFeatureCardsProps {
  isRevealed: boolean;
  prefersReducedMotion: boolean;
}

const CARDS_DATA = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "HOLISTIC GROWTH",
    description:
      "Academics, sports, arts and mindfulness come together to develop well-rounded learners.",
    delay: 0,
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "GLOBAL OUTLOOK",
    description:
      "Future-ready learning that combines CBSE rigor with communication, creativity and world skills.",
    delay: 150,
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "VALUES ROOTED",
    description:
      "Discipline, integrity, empathy and social responsibility remain at the heart of our learning culture.",
    delay: 300,
  },
];

export default function AboutFeatureCards({
  isRevealed,
  prefersReducedMotion,
}: AboutFeatureCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 sm:mt-16">
      {CARDS_DATA.map((card) => {
        const cardStyle: React.CSSProperties = prefersReducedMotion
          ? {
              opacity: isRevealed ? 1 : 0,
              transition: `opacity 600ms ease-out ${card.delay}ms`,
            }
          : {
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 40px, 0)",
              transition: `opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) ${card.delay}ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) ${card.delay}ms`,
              willChange: "opacity, transform",
            };

        return (
          <div key={card.title} style={cardStyle} className="h-full">
            <div
              className="group h-full rounded-[24px] bg-white border border-[#0B1B33]/10 p-7 shadow-xs hover:shadow-[0_20px_45px_rgba(11,27,51,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              style={{
                minHeight: "190px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C9962E]/15 text-[#C9962E] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-[1.08]">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B1B33] uppercase tracking-wider">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#667085] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
