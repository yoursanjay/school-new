"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade" | "zoom";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function RevealOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 600,
  threshold = 0,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fallback: guarantee visibility even if IntersectionObserver is delayed
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600 + delay);

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timer);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: "150px 0px 50px 0px",
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      clearTimeout(timer);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";
    switch (direction) {
      case "up":
        return "translate3d(0, 30px, 0)";
      case "down":
        return "translate3d(0, -30px, 0)";
      case "left":
      case "right":
        return "translate3d(0, 24px, 0)";
      case "zoom":
        return "scale(0.96)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0.05,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
