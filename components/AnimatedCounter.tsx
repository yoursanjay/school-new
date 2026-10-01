"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime: number | null = null;

          const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          };

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentVal = easedProgress * target;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [target, duration]);

  const displayValue =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
