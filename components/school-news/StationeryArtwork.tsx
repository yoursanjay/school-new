"use client";

import React from "react";

/**
 * Hidden SVG definitions providing organic, irregular torn-paper clip-path masks
 * so school photographs reveal through authentic editorial paper-cut edges.
 */
export function TornPaperSvgDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
      <defs>
        <clipPath id="sam-torn-mask-a" clipPathUnits="objectBoundingBox">
          <path d="M0.02,0.04 L0.18,0.01 L0.34,0.05 L0.53,0.01 L0.74,0.04 L0.96,0.02 L0.99,0.22 L0.96,0.44 L0.99,0.68 L0.95,0.95 L0.76,0.98 L0.55,0.94 L0.32,0.99 L0.11,0.95 L0.01,0.97 L0.04,0.72 L0.01,0.46 L0.03,0.23 Z" />
        </clipPath>
        <clipPath id="sam-torn-mask-b" clipPathUnits="objectBoundingBox">
          <path d="M0.04,0.02 L0.27,0.05 L0.49,0.01 L0.71,0.05 L0.97,0.03 L0.95,0.28 L0.99,0.52 L0.96,0.78 L0.98,0.97 L0.72,0.94 L0.46,0.99 L0.22,0.95 L0.02,0.98 L0.01,0.74 L0.04,0.49 L0.01,0.24 Z" />
        </clipPath>
        <clipPath id="sam-torn-mask-c" clipPathUnits="objectBoundingBox">
          <path d="M0.01,0.05 L0.22,0.02 L0.45,0.05 L0.68,0.01 L0.95,0.04 L0.99,0.26 L0.95,0.51 L0.98,0.76 L0.94,0.98 L0.68,0.95 L0.44,0.98 L0.18,0.94 L0.02,0.96 L0.05,0.70 L0.01,0.43 L0.04,0.19 Z" />
        </clipPath>
        <clipPath id="sam-torn-mask-d" clipPathUnits="objectBoundingBox">
          <path d="M0.03,0.03 L0.25,0.01 L0.47,0.04 L0.73,0.01 L0.98,0.04 L0.96,0.31 L0.99,0.56 L0.95,0.82 L0.97,0.96 L0.71,0.99 L0.48,0.95 L0.24,0.98 L0.01,0.95 L0.03,0.69 L0.01,0.42 L0.04,0.18 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PushPin({ color = "red", className = "" }: { color?: "red" | "yellow" | "orange"; className?: string }) {
  const fill =
    color === "yellow" ? "#FFD52A" : color === "orange" ? "#FF6B2C" : "#E53935";
  return (
    <svg
      viewBox="0 0 36 36"
      className={`w-7 h-7 drop-shadow-[0_4px_5px_rgba(3,18,56,0.45)] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="14" fill="#111521" opacity="0.22" transform="translate(2,3)" />
      <circle cx="18" cy="16" r="12" fill={fill} stroke="#111521" strokeWidth="2.5" />
      <circle cx="15" cy="13" r="4.2" fill="#FFFFFF" opacity="0.55" />
    </svg>
  );
}

export function BlueprintCompassDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden="true">
      <circle cx="200" cy="200" r="165" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="8 8" />
      <circle cx="200" cy="200" r="120" stroke="rgba(255,213,42,0.35)" strokeWidth="1.2" />
      <path d="M200 15V385M15 200H385" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <path d="M70 70L330 330M330 70L70 330" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  );
}
