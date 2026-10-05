"use client";

import React, { useCallback, useEffect, useRef } from "react";

interface ScrollCanvasBackgroundProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const FRAME_1_COUNT = 150;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ScrollCanvasBackground({
  containerRef: externalContainerRef,
}: ScrollCanvasBackgroundProps = {}) {
  const localContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = externalContainerRef || localContainerRef;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const lastRenderedImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const loadFrame = useCallback((frameIndex: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const cached = imagesCacheRef.current.get(frameIndex);
      if (cached) {
        resolve(cached);
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        imagesCacheRef.current.set(frameIndex, image);
        resolve(image);
      };
      image.onerror = () => {
        const fallback = new Image();
        fallback.decoding = "async";
        fallback.onload = () => {
          imagesCacheRef.current.set(frameIndex, fallback);
          resolve(fallback);
        };
        fallback.onerror = () => reject(new Error(`Failed to load frame ${frameIndex}`));
        const padded = String(frameIndex + 1).padStart(3, "0");
        fallback.src = `/frames/frame-${padded}.png`;
      };
      const padded = String(frameIndex + 1).padStart(3, "0");
      image.src = `/frames/frame-${padded}.jpg`;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const preloadFrames = async () => {
      const priorityFrames = [0, FRAME_1_COUNT - 1, 1, 2, 149];

      for (const frameIndex of priorityFrames) {
        if (cancelled) return;
        if (frameIndex < 0 || frameIndex >= FRAME_1_COUNT) continue;

        try {
          await loadFrame(frameIndex);
        } catch {
          // continue loading background frames without blocking the sequence
        }
      }

      for (let frameIndex = 0; frameIndex < FRAME_1_COUNT; frameIndex += 1) {
        if (cancelled) return;
        if (imagesCacheRef.current.has(frameIndex)) continue;

        try {
          await loadFrame(frameIndex);
        } catch {
          // keep progressively preloading without interrupting the active scroll animation
        }
      }
    };

    preloadFrames();

    return () => {
      cancelled = true;
    };
  }, [loadFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const defaultSmoothingQuality = ctx.imageSmoothingQuality;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.opacity = "1";
      canvas.style.transition = "none";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCoverImage = (image: HTMLImageElement) => {
      if (!canvas) return;

      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;
      const imageWidth = image.naturalWidth || cssWidth;
      const imageHeight = image.naturalHeight || cssHeight;
      const scale = Math.max(cssWidth / imageWidth, cssHeight / imageHeight);
      const drawWidth = imageWidth * scale;
      const drawHeight = imageHeight * scale;
      const x = (cssWidth - drawWidth) / 2;
      const y = (cssHeight - drawHeight) / 2;

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
      lastRenderedImageRef.current = image;
    };

    const renderFrame = (frameIndex: number): boolean => {
      const actualFrameIndex = clamp(frameIndex, 0, FRAME_1_COUNT - 1);
      const requestedImage = imagesCacheRef.current.get(actualFrameIndex) ?? lastRenderedImageRef.current;

      if (!requestedImage) return false;
      ctx.imageSmoothingQuality = defaultSmoothingQuality;

      drawCoverImage(requestedImage);
      return true;
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = Math.max(container.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 1);
      targetFrameRef.current = reducedMotion
        ? 0
        : progress * (FRAME_1_COUNT - 1);
    };

    const renderLoop = () => {
      if (reducedMotion) {
        currentFrameRef.current = 0;
        const firstFrame = imagesCacheRef.current.get(0);
        if (firstFrame) {
          drawCoverImage(firstFrame);
          lastDrawnFrameRef.current = 0;
          animationFrameRef.current = null;
          return;
        }
      } else {
        currentFrameRef.current +=
          (targetFrameRef.current - currentFrameRef.current) * 0.12;
      }

      const roundedFrame = Math.round(currentFrameRef.current);
      if (roundedFrame !== lastDrawnFrameRef.current) {
        if (renderFrame(roundedFrame)) {
          lastDrawnFrameRef.current = roundedFrame;
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(renderLoop);
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      currentFrameRef.current = 0;
      lastDrawnFrameRef.current = null;
      handleScroll();
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(renderLoop);
      }
    };

    const handleResize = () => {
      resizeCanvas();
      if (reducedMotion) {
        lastDrawnFrameRef.current = null;
        if (animationFrameRef.current === null) {
          animationFrameRef.current = window.requestAnimationFrame(renderLoop);
        }
      }
    };

    resizeCanvas();
    handleScroll();
    animationFrameRef.current = window.requestAnimationFrame(renderLoop);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="hero-sequence"
      style={{
        position: "relative",
        minHeight: "800vh",
        height: "800vh",
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
            opacity: 1,
            filter: "none",
            transition: "none",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}
