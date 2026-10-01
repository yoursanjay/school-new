"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollCanvasBackgroundProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const TOTAL_FRAMES = 150;

export default function ScrollCanvasBackground({
  containerRef: externalContainerRef,
}: ScrollCanvasBackgroundProps = {}) {
  const localContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = externalContainerRef || localContainerRef;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const needsRedrawRef = useRef<boolean>(true);
  const [, setInitialLoaded] = useState(false);

  // URL generator for Frame 1 sequence
  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/frame-${padded}.jpg`;
  };

  // Helper to load a frame
  const loadFrame = (index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (imagesCache.current.has(index)) {
        resolve(imagesCache.current.get(index)!);
        return;
      }

      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesCache.current.set(index, img);
        needsRedrawRef.current = true;
        resolve(img);
      };
      img.onerror = () => {
        // Fallback to png naming if jpg fails
        const fallbackImg = new Image();
        const padded = String(index).padStart(3, "0");
        fallbackImg.src = `/frames/frame-${padded}.png`;
        fallbackImg.onload = () => {
          imagesCache.current.set(index, fallbackImg);
          needsRedrawRef.current = true;
          resolve(fallbackImg);
        };
        fallbackImg.onerror = reject;
      };
    });
  };

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;

    // 1. Immediately load first and last frames
    Promise.all([loadFrame(1), loadFrame(TOTAL_FRAMES)]).then(() => {
      if (!isCancelled) {
        setInitialLoaded(true);
        needsRedrawRef.current = true;
      }
    });

    const preloadAll = async () => {
      // 2. Preload keyframes (every 10th frame)
      for (let i = 10; i < TOTAL_FRAMES; i += 10) {
        if (isCancelled) return;
        try {
          await loadFrame(i);
        } catch {
          // continue
        }
      }

      // 3. Progressively load all remaining frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        if (!imagesCache.current.has(i)) {
          await new Promise((r) => setTimeout(r, 12));
          if (isCancelled) return;
          loadFrame(i).catch(() => {});
        }
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Main canvas render & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionPreference);

    // Resize canvas with DPR support
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      const targetW = Math.floor(width * dpr);
      const targetH = Math.floor(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        needsRedrawRef.current = true;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Scroll listener: calculate progress strictly relative to hero container
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Progress from 0.0 at beginning of hero section to 1.0 at very end
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Helper: Find closest loaded frame
    const getBestAvailableImage = (targetIndex: number): HTMLImageElement | null => {
      if (imagesCache.current.has(targetIndex)) {
        return imagesCache.current.get(targetIndex)!;
      }

      loadFrame(targetIndex).catch(() => {});

      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = targetIndex - offset;
        const right = targetIndex + offset;
        if (left >= 1 && imagesCache.current.has(left)) {
          return imagesCache.current.get(left)!;
        }
        if (right <= TOTAL_FRAMES && imagesCache.current.has(right)) {
          return imagesCache.current.get(right)!;
        }
      }

      return null;
    };

    // Draw frame onto canvas using cover fitting with zero distortion
    const drawCoverImage = (img: HTMLImageElement) => {
      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const iWidth = img.naturalWidth || 1280;
      const iHeight = img.naturalHeight || 720;

      if (!cWidth || !cHeight || !iWidth || !iHeight) return;

      const imgRatio = iWidth / iHeight;
      const canvasRatio = cWidth / cHeight;

      let drawWidth: number;
      let drawHeight: number;

      if (canvasRatio > imgRatio) {
        drawWidth = cWidth;
        drawHeight = cWidth / imgRatio;
      } else {
        drawHeight = cHeight;
        drawWidth = cHeight * imgRatio;
      }

      const offsetX = (cWidth - drawWidth) * 0.5;
      const offsetY = (cHeight - drawHeight) * 0.5;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Continuous Animation loop using rAF + smooth lerp
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        // Continuous smooth progress lerp
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.00005) {
          currentProgressRef.current += diff * 0.1;
        } else {
          currentProgressRef.current = targetProgressRef.current;
        }
      }

      const p = currentProgressRef.current;
      const frameIndex = Math.min(
        Math.max(Math.round(1 + p * (TOTAL_FRAMES - 1)), 1),
        TOTAL_FRAMES
      );

      if (frameIndex !== lastDrawnFrameRef.current || needsRedrawRef.current) {
        const img = getBestAvailableImage(frameIndex);
        if (img) {
          drawCoverImage(img);
          lastDrawnFrameRef.current = frameIndex;
          needsRedrawRef.current = false;
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="hero-sequence"
      style={{
        position: "relative",
        minHeight: "400vh",
        height: "400vh",
      }}
    >
      <div
        className="hero-sticky"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
