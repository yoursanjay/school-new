"use client";

import React, { useState, useEffect, useRef } from "react";

interface AboutStatsProps {
  isRevealed: boolean;
  prefersReducedMotion: boolean;
  statsParallaxY: number;
}

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { target: 25, suffix: "+", label: "Years of Excellence" },
  { target: 1000, suffix: "+", label: "Students" },
  { target: 50, suffix: "+", label: "Dedicated Faculty" },
  { target: 20, suffix: "+", label: "Activities & Programs" },
];

function StatCounter({
  target,
  suffix,
  isRevealed,
  prefersReducedMotion,
  duration = 1200,
}: {
  target: number;
  suffix: string;
  isRevealed: boolean;
  prefersReducedMotion: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isRevealed || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion) {
      setVal(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.round(easedProgress * target);

      setVal(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRevealed, target, duration, prefersReducedMotion]);

  return (
    <span className="inline-flex items-baseline">
      <span>{val.toLocaleString()}</span>
      <span className="text-[#C9962E] font-black ml-0.5">{suffix}</span>
    </span>
  );
}

export default function AboutStats({
  isRevealed,
  prefersReducedMotion,
  statsParallaxY,
}: AboutStatsProps) {
  return (
    <div
      className="w-full mt-14 sm:mt-16"
      style={{
        transform: prefersReducedMotion
          ? "none"
          : `translate3d(0, ${statsParallaxY}px, 0)`,
        transition: "transform 250ms ease-out",
        willChange: "transform",
      }}
      aria-label="School achievements and statistics"
    >
      <div className="w-full rounded-[24px] bg-white/80 backdrop-blur-sm border border-[#0B1B33]/10 shadow-[0_10px_35px_rgba(11,27,51,0.06)] p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
          {STATS_DATA.map((item, idx) => {
            const delay = idx * 100;
            const revealStyle: React.CSSProperties = prefersReducedMotion
              ? {
                  opacity: isRevealed ? 1 : 0,
                  transition: `opacity 600ms ease-out ${delay}ms`,
                }
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 30px, 0)",
                  transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                  willChange: "opacity, transform",
                };

            return (
              <div
                key={item.label}
                style={revealStyle}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1B33] tracking-tight leading-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <StatCounter
                    target={item.target}
                    suffix={item.suffix}
                    isRevealed={isRevealed}
                    prefersReducedMotion={prefersReducedMotion}
                    duration={1200}
                  />
                </div>
                <p className="mt-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
