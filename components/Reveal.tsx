"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
}

export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 700,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Guarantees visibility if observer is delayed or skipped
    const timer = setTimeout(() => setIsVisible(true), 350 + delay);

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

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 40px, 0)";
      case "down":
        return "translate3d(0, -40px, 0)";
      case "left":
        return "translate3d(-40px, 0, 0)";
      case "right":
        return "translate3d(40px, 0, 0)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
