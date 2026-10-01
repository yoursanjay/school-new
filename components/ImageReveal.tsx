"use client";

import React, { useEffect, useRef, useState } from "react";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 900,
}: ImageRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400 + delay);

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timer);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      clearTimeout(timer);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        transform: isVisible ? "scale(1)" : "scale(1.08)",
        transitionProperty: "opacity, clip-path, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, clip-path, transform",
      }}
    >
      {children}
    </div>
  );
}
