"use client";

import React from "react";
import Reveal from "./Reveal";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <Reveal direction="up" delay={delay} duration={600} className="h-full">
      <div
        className="group h-full rounded-[20px] bg-white border border-[#0B1B33]/10 p-7 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between"
        style={{
          minHeight: "180px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#C99732]/15 text-[#C99732] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-base font-bold text-[#0B1B33] uppercase tracking-wider">
            {title}
          </h3>
          <p className="mt-2 text-sm text-[#667085] leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
