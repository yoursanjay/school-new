"use client";

import { useEffect, useRef } from "react";

interface SecondScrollSequenceProps {
  sectionId?: string;
  folderPath?: string;
  totalFrames?: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function SecondScrollSequence({
  sectionId = "frame2-sequence",
  folderPath = "/frame2",
  totalFrames = 150,
}: SecondScrollSequenceProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const lastRenderedImageRef = useRef<HTMLImageElement | null>(null);
  const needsRedrawRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const getFrameUrl = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `${folderPath}/ezgif-frame-${padded}.png`;
  };

  const loadFrame = (index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const cached = frameCacheRef.current.get(index);
      if (cached) {
        resolve(cached);
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        frameCacheRef.current.set(index, image);
        needsRedrawRef.current = true;
        resolve(image);
      };
      image.onerror = () => reject(new Error(`Failed to load frame ${index}`));
      image.src = getFrameUrl(index);
    });
  };

  const drawCoverImage = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cssWidth = canvas.clientWidth || window.innerWidth;
    const cssHeight = canvas.clientHeight || window.innerHeight;
    const imageWidth = image.naturalWidth || cssWidth;
    const imageHeight = image.naturalHeight || cssHeight;
    const scale = Math.max(cssWidth / imageWidth, cssHeight / imageHeight);

    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const x = (cssWidth - drawWidth) / 2;
    const y = (cssHeight - drawHeight) / 2;

    context.clearRect(0, 0, cssWidth, cssHeight);
    context.drawImage(image, x, y, drawWidth, drawHeight);
    lastRenderedImageRef.current = image;
  };

  useEffect(() => {
    let cancelled = false;

    const preloadFrames = async () => {
      const firstFrame = 1;
      try {
        const firstImage = await loadFrame(firstFrame);
        if (!cancelled && firstImage) {
          lastRenderedImageRef.current = firstImage;
        }
      } catch {
        // keep the canvas stable while the first frame loads
      }

      const framesToLoad = Array.from({ length: totalFrames - 1 }, (_, index) => index + 2);

      for (const frameIndex of framesToLoad) {
        if (cancelled) break;

        try {
          await loadFrame(frameIndex);
        } catch {
          // continue loading background frames without blocking the animation
        }
      }
    };

    preloadFrames();

    return () => {
      cancelled = true;
    };
  }, [totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.style.opacity = "1";
      canvas.style.transition = "none";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (frameIndex: number) => {
      const image = frameCacheRef.current.get(frameIndex) ?? lastRenderedImageRef.current;
      if (!image) return;

      const cssWidth = canvas.clientWidth || window.innerWidth;
      const cssHeight = canvas.clientHeight || window.innerHeight;
      const imageWidth = image.naturalWidth || cssWidth;
      const imageHeight = image.naturalHeight || cssHeight;
      const scale = Math.max(cssWidth / imageWidth, cssHeight / imageHeight);
      const drawWidth = imageWidth * scale;
      const drawHeight = imageHeight * scale;
      const x = (cssWidth - drawWidth) / 2;
      const y = (cssHeight - drawHeight) / 2;

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.drawImage(image, x, y, drawWidth, drawHeight);
      lastRenderedImageRef.current = image;
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    const render = () => {
      const smoothing = 0.12;
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) * smoothing;

      const frameIndex = clamp(Math.round(currentFrameRef.current), 0, totalFrames - 1);

      if (needsRedrawRef.current || frameIndex !== lastDrawnFrameRef.current) {
        const image = frameCacheRef.current.get(frameIndex + 1) ?? lastRenderedImageRef.current;
        if (image) {
          drawFrame(frameIndex + 1);
          lastDrawnFrameRef.current = frameIndex;
          needsRedrawRef.current = false;
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    handleScroll();

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalFrames]);

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="frame2-sequence"
      style={{
        position: "relative",
        minHeight: "400vh",
        height: "400vh",
      }}
    >
      <div
        className="frame2-sticky"
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
          className="frame2-canvas"
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
    </section>
  );
}
