"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import styles from "./LeadershipTeamClient.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOTAL_FRAMES = 217;
const HOLD_END_RATIO = 0.94;
const INITIAL_PRELOAD_TARGET = 20;
const POSTER_SRC = "/frames/leadership-team/frame_0001.webp";

type FrameSource = ImageBitmap | HTMLImageElement;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getFrameUrl = (frameNumber: number) => {
  const padded = String(frameNumber).padStart(4, "0");
  return `/frames/leadership-team/frame_${padded}.webp`;
};

const buildPriorityOrder = (total: number): number[] => {
  const seen = new Set<number>();
  const order: number[] = [];

  const push = (n: number) => {
    if (n >= 1 && n <= total && !seen.has(n)) {
      seen.add(n);
      order.push(n);
    }
  };

  push(1);
  push(total);
  for (let i = 2; i <= Math.min(20, total); i++) push(i);

  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = 1; i <= total; i += stride) {
      push(i);
    }
  }

  return order;
};

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const LEADERSHIP_PILLARS = [
  {
    number: "01",
    title: "Vision & Direction",
    description:
      "Nurturing holistic development in a safe, inspiring environment, empowering students through CBSE academic excellence and a spirit of discovery.",
    Icon: Compass,
  },
  {
    number: "02",
    title: "Integrity & Values",
    description:
      "Inspired by Sri Aurobindo and The Mother's vision of integral education and empathy, cultivating confidence, compassion, and capability.",
    Icon: HeartHandshake,
  },
  {
    number: "03",
    title: "Care, Growth & Excellence",
    description:
      "24/7 campus safety protocols, dedicated 1:15 faculty mentorship, and emotionally supportive guidance so every learner thrives with purpose.",
    Icon: ShieldCheck,
  },
] as const;

const EDUCATOR_METRICS = [
  {
    id: "metric-years",
    target: 25,
    format: (v: number) => `${Math.round(v)}+`,
    finalDisplay: "25+",
    label: "Years of Excellence",
  },
  {
    id: "metric-faculty",
    target: 50,
    format: (v: number) => `${Math.round(v)}+`,
    finalDisplay: "50+",
    label: "Dedicated Faculty",
  },
  {
    id: "metric-ratio",
    target: 15,
    format: (v: number) => `1:${Math.max(1, Math.round(v))}`,
    finalDisplay: "1:15",
    label: "Educator Ratio",
  },
] as const;

export default function LeadershipTeamClient() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const decodedImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const bitmapCacheRef = useRef<Map<number, ImageBitmap>>(new Map());
  const pendingFramesRef = useRef<Set<number>>(new Set());
  const boostQueueRef = useRef<number[]>([]);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const lastDrawnSourceRef = useRef<FrameSource | null>(null);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rawProgressRef = useRef<number>(0);
  const needsRedrawRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const reducedMotionRef = useRef<boolean>(prefersReducedMotion);
  const canvasSizeRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialBufferReady, setIsInitialBufferReady] = useState(false);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  // =========================================================================
  // PRESERVED 217-FRAME WEBP CANVAS ANIMATION ENGINE
  // =========================================================================
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let cancelled = false;
    const decodedImages = decodedImagesRef.current;
    const bitmapCache = bitmapCacheRef.current;
    const pendingFrames = pendingFramesRef.current;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const isCompactOrLowMem =
      window.innerWidth < 768 ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
    const maxBitmaps = isCompactOrLowMem ? 36 : 72;
    const concurrency = isCompactOrLowMem ? 6 : 8;

    const drawSourceToCanvas = (source: FrameSource) => {
      const cssWidth = stage.clientWidth || window.innerWidth;
      const cssHeight = stage.clientHeight || window.innerHeight;
      if (cssWidth <= 0 || cssHeight <= 0) return;

      const sourceWidth =
        source instanceof HTMLImageElement
          ? source.naturalWidth || 1280
          : source.width;
      const sourceHeight =
        source instanceof HTMLImageElement
          ? source.naturalHeight || 720
          : source.height;
      if (sourceWidth <= 0 || sourceHeight <= 0) return;

      const scale = Math.max(cssWidth / sourceWidth, cssHeight / sourceHeight);
      const drawWidth = Math.ceil(sourceWidth * scale);
      const drawHeight = Math.ceil(sourceHeight * scale);
      const x = Math.floor((cssWidth - drawWidth) / 2);
      const focalY = cssWidth < cssHeight ? 0.38 : 0.5;
      const y = Math.floor((cssHeight - drawHeight) * focalY);

      context.drawImage(source, x, y, drawWidth, drawHeight);
      lastDrawnSourceRef.current = source;
    };

    const resizeCanvas = () => {
      const cssWidth = Math.max(1, stage.clientWidth || window.innerWidth);
      const cssHeight = Math.max(1, stage.clientHeight || window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor(cssWidth * dpr);
      const targetHeight = Math.floor(cssHeight * dpr);

      const prev = canvasSizeRef.current;
      if (
        prev.width === targetWidth &&
        prev.height === targetHeight &&
        prev.dpr === dpr
      ) {
        return;
      }

      canvasSizeRef.current = { width: targetWidth, height: targetHeight, dpr };
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (lastDrawnSourceRef.current) {
        drawSourceToCanvas(lastDrawnSourceRef.current);
      } else {
        needsRedrawRef.current = true;
      }
    };

    const evictBitmapsIfNeeded = (activeFrameNum: number) => {
      if (bitmapCache.size <= maxBitmaps) return;

      for (const key of bitmapCache.keys()) {
        if (bitmapCache.size <= maxBitmaps) break;
        if (
          key === lastDrawnFrameRef.current ||
          Math.abs(key - activeFrameNum) <= 4
        ) {
          continue;
        }
        const evicted = bitmapCache.get(key);
        bitmapCache.delete(key);
        if (evicted && evicted !== lastDrawnSourceRef.current) {
          evicted.close();
        }
      }
    };

    const cacheBitmap = async (frameNumber: number, image: HTMLImageElement) => {
      if (
        cancelled ||
        typeof createImageBitmap !== "function" ||
        bitmapCache.has(frameNumber)
      ) {
        return;
      }

      try {
        const bitmap = await createImageBitmap(image);
        if (cancelled) {
          bitmap.close();
          return;
        }
        bitmapCache.set(frameNumber, bitmap);
        evictBitmapsIfNeeded(Math.round(targetFrameRef.current) + 1);
      } catch {
        // Fallback smoothly uses decoded HTMLImageElement
      }
    };

    const findNearestAvailableFrame = (
      desiredFrame: number,
    ): { frameNumber: number; source: FrameSource } | null => {
      const getSource = (n: number): FrameSource | undefined => {
        const bmp = bitmapCache.get(n);
        if (bmp) {
          bitmapCache.delete(n);
          bitmapCache.set(n, bmp);
          return bmp;
        }
        return decodedImages.get(n);
      };

      const exact = getSource(desiredFrame);
      if (exact) {
        return { frameNumber: desiredFrame, source: exact };
      }

      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = desiredFrame - offset;
        if (prev >= 1) {
          const prevSource = getSource(prev);
          if (prevSource) return { frameNumber: prev, source: prevSource };
        }
        const next = desiredFrame + offset;
        if (next <= TOTAL_FRAMES) {
          const nextSource = getSource(next);
          if (nextSource) return { frameNumber: next, source: nextSource };
        }
      }

      return null;
    };

    const loadSingleFrame = (frameNumber: number): Promise<void> => {
      if (
        cancelled ||
        decodedImages.has(frameNumber) ||
        pendingFrames.has(frameNumber)
      ) {
        return Promise.resolve();
      }
      pendingFrames.add(frameNumber);

      return new Promise((resolve) => {
        const img = new window.Image();
        img.decoding = "async";

        const finishSuccess = async () => {
          try {
            if (typeof img.decode === "function") {
              await img.decode();
            }
          } catch {
            // Proceed with loaded image element
          }

          if (cancelled) {
            pendingFrames.delete(frameNumber);
            resolve();
            return;
          }

          decodedImages.set(frameNumber, img);
          pendingFrames.delete(frameNumber);

          const count = decodedImages.size;
          setLoadedCount(count);
          if (count >= INITIAL_PRELOAD_TARGET || count === TOTAL_FRAMES) {
            setIsInitialBufferReady(true);
          }

          void cacheBitmap(frameNumber, img);

          const currentTargetFrame = clamp(
            Math.round(currentFrameRef.current) + 1,
            1,
            TOTAL_FRAMES,
          );
          const distToNewlyLoaded = Math.abs(frameNumber - currentTargetFrame);
          const distToLastDrawn =
            lastDrawnFrameRef.current === null
              ? Infinity
              : Math.abs(lastDrawnFrameRef.current - currentTargetFrame);

          if (frameNumber === 1 || distToNewlyLoaded < distToLastDrawn) {
            needsRedrawRef.current = true;
            scheduleFrame();
          }

          resolve();
        };

        img.onload = () => {
          void finishSuccess();
        };
        img.onerror = () => {
          pendingFrames.delete(frameNumber);
          resolve();
        };
        img.src = getFrameUrl(frameNumber);
      });
    };

    const boostAroundFrame = (centerFrame: number) => {
      const queue = boostQueueRef.current;
      for (let offset = -4; offset <= 12; offset++) {
        const candidate = centerFrame + offset;
        if (
          candidate >= 1 &&
          candidate <= TOTAL_FRAMES &&
          !decodedImages.has(candidate) &&
          !pendingFrames.has(candidate) &&
          !queue.includes(candidate)
        ) {
          queue.push(candidate);
        }
      }
      if (queue.length > 48) {
        boostQueueRef.current = queue.slice(-48);
      }
    };

    const baseQueue = buildPriorityOrder(TOTAL_FRAMES);
    let baseCursor = 0;

    const getNextFrameToLoad = (): number | null => {
      while (boostQueueRef.current.length > 0) {
        const boosted = boostQueueRef.current.shift()!;
        if (!decodedImages.has(boosted) && !pendingFrames.has(boosted)) {
          return boosted;
        }
      }
      while (baseCursor < baseQueue.length) {
        const next = baseQueue[baseCursor++];
        if (!decodedImages.has(next) && !pendingFrames.has(next)) {
          return next;
        }
      }
      return null;
    };

    const startPreloadWorkers = async () => {
      await loadSingleFrame(1);
      if (cancelled) return;

      const workers = Array.from({ length: concurrency }, async () => {
        while (!cancelled) {
          const nextFrame = getNextFrameToLoad();
          if (nextFrame === null) break;
          await loadSingleFrame(nextFrame);
        }
      });

      await Promise.all(workers);
    };

    const syncStageChrome = (rawProgress: number, renderedProgress: number) => {
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${renderedProgress.toFixed(4)})`;
      }
      if (veilRef.current) {
        const veilOpacity =
          rawProgress < 0.1
            ? 0
            : rawProgress > 0.85
              ? clamp(1 - (rawProgress - 0.85) / 0.12, 0.25, 1) * 0.85
              : clamp((rawProgress - 0.1) / 0.12, 0, 0.85);
        veilRef.current.style.opacity = veilOpacity.toFixed(3);
      }
    };

    const renderTick = () => {
      rafIdRef.current = null;
      if (cancelled) return;

      const target = targetFrameRef.current;
      const diff = target - currentFrameRef.current;

      if (reducedMotionRef.current || Math.abs(diff) < 0.02) {
        currentFrameRef.current = target;
      } else {
        currentFrameRef.current += diff * 0.22;
      }

      const desiredFrameNumber = clamp(
        Math.round(currentFrameRef.current) + 1,
        1,
        TOTAL_FRAMES,
      );

      if (
        needsRedrawRef.current ||
        desiredFrameNumber !== lastDrawnFrameRef.current
      ) {
        const resolved = findNearestAvailableFrame(desiredFrameNumber);
        if (resolved) {
          if (
            needsRedrawRef.current ||
            resolved.frameNumber !== lastDrawnFrameRef.current
          ) {
            drawSourceToCanvas(resolved.source);
            lastDrawnFrameRef.current = resolved.frameNumber;
            setIsCanvasReady(true);

            const cachedNeighbor = decodedImages.get(desiredFrameNumber);
            if (cachedNeighbor && !bitmapCache.has(desiredFrameNumber)) {
              void cacheBitmap(desiredFrameNumber, cachedNeighbor);
            }
          }
          needsRedrawRef.current = false;
        }
      }

      const renderedProgress = currentFrameRef.current / (TOTAL_FRAMES - 1);
      syncStageChrome(rawProgressRef.current, renderedProgress);

      if (
        (!reducedMotionRef.current &&
          Math.abs(targetFrameRef.current - currentFrameRef.current) >= 0.02) ||
        needsRedrawRef.current
      ) {
        rafIdRef.current = window.requestAnimationFrame(renderTick);
      }
    };

    function scheduleFrame() {
      if (cancelled || rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(renderTick);
    }

    const updateTargetFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const stageHeight = stage.clientHeight || window.innerHeight;
      const scrollTravel = Math.max(section.offsetHeight - stageHeight, 1);
      const rawProgress = clamp(-rect.top / scrollTravel, 0, 1);
      rawProgressRef.current = rawProgress;

      const animProgress = clamp(rawProgress / HOLD_END_RATIO, 0, 1);
      targetFrameRef.current = animProgress * (TOTAL_FRAMES - 1);

      const desired = clamp(
        Math.round(targetFrameRef.current) + 1,
        1,
        TOTAL_FRAMES,
      );
      if (!decodedImages.has(desired)) {
        boostAroundFrame(desired);
      }

      scheduleFrame();
    };

    const handleResize = () => {
      resizeCanvas();
      updateTargetFromScroll();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(stage);

    resizeCanvas();
    updateTargetFromScroll();
    currentFrameRef.current = targetFrameRef.current;
    needsRedrawRef.current = true;
    scheduleFrame();

    void startPreloadWorkers();

    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      for (const bmp of bitmapCache.values()) {
        bmp.close();
      }
      bitmapCache.clear();
      pendingFrames.clear();
      boostQueueRef.current = [];
      lastDrawnFrameRef.current = null;
      lastDrawnSourceRef.current = null;
    };
  }, []);

  // =========================================================================
  // GSAP SCROLLTRIGGER COORDINATION ACROSS THE 4 LEADERSHIP SECTIONS
  // =========================================================================
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isMobile: "(max-width: 639px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const cond = context.conditions ?? {};
          const isReduced = Boolean(cond.reduceMotion);
          const isDesktop = Boolean(cond.isDesktop);

          if (isReduced) {
            EDUCATOR_METRICS.forEach((m) => {
              const el = root.querySelector<HTMLElement>(`#${m.id}`);
              if (el) el.textContent = m.finalDisplay;
            });
            gsap.set(
              [
                ".js-lt-hero",
                ".js-lt-s1-head",
                ".js-lt-s1-card",
                ".js-lt-s2-photo",
                ".js-lt-s2-copy",
                ".js-lt-stat",
                ".js-lt-pillar",
                ".js-lt-cta",
              ],
              { clearProps: "all" },
            );
            return;
          }

          // Hero intro card gently exits upward as scrolling begins (reversible)
          gsap.fromTo(
            ".js-lt-hero",
            { y: 0, autoAlpha: 1 },
            {
              y: -36,
              autoAlpha: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".js-lt-hero-band",
                start: "top top",
                end: "45% top",
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            },
          );

          // SECTION 1: Visionary Leaders Heading + White Director Profile Card
          const s1Tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#leadership-section-1",
              start: "top 86%",
              end: "top 40%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          s1Tl
            .fromTo(
              ".js-lt-s1-head",
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
              0,
            )
            .fromTo(
              ".js-lt-s1-card",
              { y: 38, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.65, ease: "power2.out" },
              0.12,
            );

          // SECTION 2: Experienced Educators Photo + Copy + Progressive Stat Counters
          const s2Tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#leadership-section-2",
              start: "top 86%",
              end: "top 38%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          s2Tl
            .fromTo(
              ".js-lt-s2-photo",
              { x: isDesktop ? -32 : 0, y: 26, autoAlpha: 0 },
              { x: 0, y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
              0,
            )
            .fromTo(
              ".js-lt-s2-copy",
              { x: isDesktop ? 32 : 0, y: 24, autoAlpha: 0 },
              { x: 0, y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
              0.08,
            )
            .fromTo(
              ".js-lt-stat",
              { y: 22, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                stagger: 0.1,
                duration: 0.45,
                ease: "power2.out",
              },
              0.2,
            );

          // Progressive numeric counters scrubbed reversibly inside Section 2
          EDUCATOR_METRICS.forEach((metric, idx) => {
            const el = root.querySelector<HTMLElement>(`#${metric.id}`);
            if (!el) return;
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: metric.target,
              ease: "none",
              scrollTrigger: {
                trigger: "#leadership-section-2",
                start: `top ${82 - idx * 4}%`,
                end: "top 40%",
                scrub: 0.45,
                invalidateOnRefresh: true,
                onUpdate: () => {
                  el.textContent = metric.format(proxy.val);
                },
              },
            });
          });

          // SECTION 3: Sequential Navy Pillar Cards (01, 02, 03)
          gsap.fromTo(
            ".js-lt-pillar",
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.16,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#leadership-section-3",
                start: "top 86%",
                end: "top 42%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );

          // SECTION 4: Final Connect With Our School Leadership CTA Panel
          gsap.fromTo(
            ".js-lt-cta",
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: "#leadership-section-4",
                start: "top 88%",
                end: "top 48%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      const rafRefresh = window.requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.cancelAnimationFrame(rafRefresh);
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  const scrollToSection1 = () => {
    document.getElementById("leadership-section-1")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const preloadPercent = Math.min(
    100,
    Math.round((loadedCount / TOTAL_FRAMES) * 100),
  );

  return (
    <div ref={rootRef} className={styles.pageRoot}>
      {/* =====================================================================
          UNIFIED 217-FRAME SCROLL EXPERIENCE + 4 INTEGRATED CONTENT SECTIONS
          ===================================================================== */}
      <section
        id="leadership-sequence"
        ref={sectionRef}
        className={styles.experienceSection}
        aria-label="Leadership Team interactive scroll experience"
      >
        {/* STICKY FULL-BLEED 217-FRAME CANVAS STAGE */}
        <div ref={stageRef} className={styles.stickyViewport}>
          {/* Relative image parent inside sticky viewport fixes fill warning */}
          <div className={styles.posterFrame}>
            <Image
              src={POSTER_SRC}
              alt="Sri Aurobindo Mira Universal School community and mentors"
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              unoptimized
              className={`${styles.posterImage} ${
                isCanvasReady ? styles.posterHidden : ""
              }`}
            />
          </div>

          <canvas
            ref={canvasRef}
            className={`${styles.canvas} ${
              isCanvasReady ? styles.canvasVisible : ""
            }`}
            aria-hidden="true"
          />

          <div className={styles.topScrim} aria-hidden="true" />
          <div
            ref={veilRef}
            className={styles.warmBackdropVeil}
            aria-hidden="true"
          />

          {!isInitialBufferReady && (
            <div className={styles.stageStatusBar}>
              <div className={styles.loadingChip} aria-live="polite">
                <span className={styles.loadingSpinner} aria-hidden="true" />
                <span>Preparing frames · {preloadPercent}%</span>
              </div>
            </div>
          )}

          <div className={styles.progressTrack} aria-hidden="true">
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
        </div>

        {/* SCROLLING FOREGROUND SECTIONS COORDINATED WITH VIDEO FRAMES */}
        <div className={styles.scrollOverlayTrack}>
          {/* BAND 0: HERO INTRO (Top-left card leaves central subjects open) */}
          <div className={`${styles.bandContainer} ${styles.heroBand} js-lt-hero-band`}>
            <div className={`${styles.heroIntroCard} js-lt-hero`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10233F] border border-[#D9A441]/55 text-[#D9A441] text-[11px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
                <span>Sri Aurobindo Mira Universal School</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-white">
                Leadership Team
              </h1>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#F8F6F1]/90 max-w-md">
                Visionary leaders, trustees, and mentors guiding every learner
                toward clarity, character, and purpose.
              </p>
            </div>

            <div className={`${styles.heroBottomRow} js-lt-hero`}>
              <button
                type="button"
                onClick={scrollToSection1}
                className={styles.scrollPrompt}
                aria-label="Scroll down to view Leadership Team sections"
              >
                <span>Scroll to explore</span>
                <span className={styles.scrollArrowBounce} aria-hidden="true">
                  <ArrowDown className="w-3.5 h-3.5 text-[#D9A441]" />
                </span>
              </button>
            </div>
          </div>

          {/* SECTION 1 – VISIONARY LEADERS, TRUSTEES & MENTORS
              Right-aligned editorial column leaves left/center atrium frames open */}
          <section
            id="leadership-section-1"
            aria-labelledby="leadership-s1-heading"
            className={`${styles.bandContainer} ${styles.storyBand}`}
          >
            <div className="w-full lg:max-w-[660px] lg:ml-auto space-y-5">
              {/* Heading & Introduction Card */}
              <div
                className={`${styles.warmGlassPanel} js-lt-s1-head rounded-[24px] p-6 sm:p-8`}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] bg-[#10233F] text-[#F8F6F1] border border-[#D9A441]/45 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
                  <span>Leadership &amp; Mentorship</span>
                </div>

                <h2
                  id="leadership-s1-heading"
                  className="text-3xl sm:text-4xl font-black tracking-[-0.025em] leading-[1.08] text-[#10233F]"
                >
                  Visionary Leaders, Trustees &amp; Mentors
                </h2>

                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#2B3036]">
                  Guiding Sri Aurobindo Mira Universal School in nurturing
                  holistic development, CBSE academic excellence, and timeless
                  human values in Keelamathur, Madurai.
                </p>
              </div>

              {/* White Leadership Profile Card */}
              <div
                className={`${styles.whiteContentCard} js-lt-s1-card rounded-[26px] p-6 sm:p-8`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Verified Monogram / Editable Portrait Slot */}
                  <div className="flex flex-col items-center sm:items-start shrink-0">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#10233F] border-2 border-[#D9A441] text-[#D9A441] flex flex-col items-center justify-center shadow-md"
                      aria-label="Director profile monogram"
                    >
                      <span className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
                        MA
                      </span>
                      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#F8F6F1]/80">
                        Director
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F6F1] border border-[#D9A441]/55 text-[11px] font-bold uppercase tracking-[0.18em] text-[#10233F]">
                        <Award
                          className="w-3.5 h-3.5 text-[#D9A441]"
                          aria-hidden="true"
                        />
                        <span>Director</span>
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4B5563]">
                        Sri Aurobindo Mira Universal School
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#10233F]">
                      Er. M.C. Abilash
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#2B3036]">
                      Guiding school leadership and student advancement
                      initiatives, including leading{" "}
                      <strong className="font-bold text-[#10233F]">
                        SAM EDUTOPIA 2026
                      </strong>{" "}
                      in Madurai — bringing together more than 50 leading
                      universities and institutions so Grades 11 and 12 students
                      across Madurai and neighbouring regions can explore
                      pathways in engineering, medicine, arts and design,
                      business, computer science, AI, and research.
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-[#10233F]/12 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#10233F]">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#D9A441]"
                          aria-hidden="true"
                        />
                        <span>CBSE Affiliation: 1930282</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#D9A441]"
                          aria-hidden="true"
                        />
                        <span>School Code: 55225</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#D9A441]"
                          aria-hidden="true"
                        />
                        <span>Keelamathur, Madurai</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 – EXPERIENCED EDUCATORS GUIDING EVERY STEP
              Left-anchored translucent showcase keeps corridor & courtyard action clear on right */}
          <section
            id="leadership-section-2"
            aria-labelledby="leadership-s2-heading"
            className={`${styles.bandContainer} ${styles.storyBand}`}
          >
            <div
              className={`${styles.warmGlassPanel} w-full lg:max-w-[780px] lg:mr-auto rounded-[28px] p-6 sm:p-8`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Actual Teachers Group Photograph */}
                <div className="js-lt-s2-photo md:col-span-5">
                  <div className={styles.educatorPhotoWrap}>
                    <Image
                      src="/img/about/special-educators.webp"
                      alt="Dedicated SAM Universe School faculty educators welcoming community members"
                      fill
                      sizes="(max-width: 1024px) 90vw, 380px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Heading, Copy & 3 Progressive Statistics */}
                <div className="js-lt-s2-copy md:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-[#10233F] text-[#F8F6F1] border border-[#D9A441]/45 mb-3">
                    <Users
                      className="w-3.5 h-3.5 text-[#D9A441]"
                      aria-hidden="true"
                    />
                    <span>Our Team · Distinguished Faculty</span>
                  </div>

                  <h2
                    id="leadership-s2-heading"
                    className="text-2xl sm:text-3xl font-black tracking-tight text-[#10233F] leading-tight"
                  >
                    Experienced Educators Guiding Every Step
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#2B3036]">
                    Passionate, subject-certified educators committed to
                    personalized academic growth and supportive teaching. Every
                    mentor encourages curiosity, creativity, and moral
                    groundedness across primary, middle, and senior grades.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {EDUCATOR_METRICS.map((metric) => (
                      <div
                        key={metric.id}
                        className="js-lt-stat rounded-2xl bg-white border border-[#D9A441]/40 p-3 sm:p-4 text-center shadow-sm"
                      >
                        <div
                          id={metric.id}
                          className="text-xl sm:text-2xl lg:text-3xl font-black text-[#10233F] tracking-tight"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {metric.finalDisplay}
                        </div>
                        <p className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#4B5563]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 – OUR LEADERSHIP PILLARS
              Lower band placement keeps upper classroom mentoring frames open */}
          <section
            id="leadership-section-3"
            aria-labelledby="leadership-s3-heading"
            className={`${styles.bandContainer} ${styles.storyBand} lg:justify-end`}
          >
            <div className="lg:pt-28">
              <div
                className={`${styles.warmGlassPanel} inline-block rounded-2xl px-5 py-2.5 mb-5`}
              >
                <h2
                  id="leadership-s3-heading"
                  className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#10233F] flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                  <span>Our Leadership Pillars</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {LEADERSHIP_PILLARS.map((pillar) => {
                  const Icon = pillar.Icon;
                  return (
                    <article
                      key={pillar.number}
                      className="js-lt-pillar pointer-events-auto rounded-[24px] bg-[#10233F]/96 text-white p-6 sm:p-7 border border-[#D9A441]/45 shadow-[0_20px_46px_rgba(16,35,63,0.28)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
                          <span className="text-2xl sm:text-3xl font-black text-[#D9A441] font-mono">
                            {pillar.number}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#D9A441]/35 flex items-center justify-center text-[#D9A441]">
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white">
                          {pillar.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">
                          {pillar.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4 – CONNECT WITH OUR SCHOOL LEADERSHIP & ADMISSIONS */}
          <section
            id="leadership-section-4"
            aria-labelledby="leadership-s4-heading"
            className={`${styles.bandContainer} ${styles.ctaBand}`}
          >
            <div className="js-lt-cta pointer-events-auto lg:max-w-[1020px] lg:mx-auto rounded-[28px] bg-[#10233F]/96 border-2 border-[#D9A441]/60 p-7 sm:p-9 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-[0_24px_58px_rgba(16,35,63,0.38)]">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D9A441] mb-2">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sri Aurobindo Mira Universal School</span>
                </div>

                <h2
                  id="leadership-s4-heading"
                  className="text-2xl sm:text-3xl font-black tracking-tight text-white"
                >
                  Connect With Our School Leadership &amp; Admissions
                </h2>

                <p className="mt-2 text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
                  Welcome parents and students to visit our campus, meet our
                  mentors, and discover holistic learning in Madurai.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D9A441] hover:bg-[#c59132] text-[#10233F] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#F8F6F1]/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Explore About Us</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
