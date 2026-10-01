"use client";

import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionContainer({
  children,
  className = "",
  style,
}: SectionContainerProps) {
  return (
    <div
      className={`w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 box-border ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
