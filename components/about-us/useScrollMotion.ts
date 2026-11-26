"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Bidirectional viewport intersection observer.
 * Triggers reveal when entering from either scroll direction (top or bottom),
 * and resets smoothly when completely outside the viewport with buffer so
 * scrolling back up replays entrances naturally without flickering.
 */
export function useBidirectionalReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.14
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Only reset if fully exited with generous margin so fast scrolling stays smooth
            const rect = entry.boundingClientRect;
            const vh = window.innerHeight || 800;
            if (rect.top > vh * 1.08 || rect.bottom < -vh * 0.15) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, reducedMotion]);

  return { ref, isVisible: reducedMotion || isVisible, reducedMotion };
}

/**
 * Continuous scroll-progress hook writing a smooth 0..1 `--scroll-p` CSS custom property
 * directly onto the target element via rAF (zero React re-renders per scroll frame!).
 * Progress goes from 0 (element entering bottom of viewport) to 1 (element exiting top).
 */
export function useScrollProgressVar<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.style.setProperty("--scroll-p", "0.5");
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const total = vh + rect.height;
      const raw = total > 0 ? (vh - rect.top) / total : 0.5;
      const clamped = Math.max(0, Math.min(1, raw));
      node.style.setProperty("--scroll-p", clamped.toFixed(4));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return { ref, reducedMotion };
}

/**
 * Magnetic cursor pull micro-interaction for CTA buttons.
 * Uses CSS variables --mx / --my for GPU-composited transform with zero layout thrash.
 */
export function useMagneticHover<T extends HTMLElement = HTMLAnchorElement>(
  strength = 10
) {
  const reducedMotion = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (reducedMotion) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", `${(relX * strength).toFixed(2)}px`);
      el.style.setProperty("--my", `${(relY * strength).toFixed(2)}px`);
    },
    [reducedMotion, strength]
  );

  const onMouseLeave = useCallback((e: React.MouseEvent<T>) => {
    e.currentTarget.style.setProperty("--mx", "0px");
    e.currentTarget.style.setProperty("--my", "0px");
  }, []);

  return { onMouseMove, onMouseLeave };
}
