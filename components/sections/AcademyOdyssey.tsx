"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-odyssey-inter",
});

const MEDIA = {
  preloader: "/gemini_generated_video_e42b2f54.mp4",
  campus: "/gemini_generated_video_87e1ae2c.mp4",
  robotics: "/Recording 2026-10-07 210103.mp4",
  auditorium: "/gemini_generated_video_d6dd5115.mp4",
} as const;

type SceneId = "campus" | "robotics" | "auditorium";

interface Scene {
  id: SceneId;
  title: string;
  displayTitle: string;
  backgroundVideo: string;
  nextScene: SceneId;
  nextName: string;
}

const SCENES: Record<SceneId, Scene> = {
  campus: {
    id: "campus",
    title: "CAMPUS",
    displayTitle: "CAMPUS",
    backgroundVideo: MEDIA.campus,
    nextScene: "robotics",
    nextName: "Robotics Lab",
  },
  robotics: {
    id: "robotics",
    title: "ROBOTICS",
    displayTitle: "ROBOTICS",
    backgroundVideo: MEDIA.robotics,
    nextScene: "auditorium",
    nextName: "Auditorium",
  },
  auditorium: {
    id: "auditorium",
    title: "AUDITORIUM",
    displayTitle: "AUDITORIUM",
    backgroundVideo: MEDIA.auditorium,
    nextScene: "campus",
    nextName: "Campus",
  },
};

const FACILITIES = [
  { name: "Campus", scene: "campus" },
  { name: "Robotics Lab", scene: "robotics" },
  { name: "Auditorium", scene: "auditorium" },
] as const satisfies readonly { name: string; scene: SceneId }[];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

function roundedRectPoints(
  width: number,
  height: number,
  radius: number,
  segments = 11,
) {
  const corners = [
    { cx: width / 2 - radius, cy: -height / 2 + radius, start: -90 },
    { cx: width / 2 - radius, cy: height / 2 - radius, start: 0 },
    { cx: -width / 2 + radius, cy: height / 2 - radius, start: 90 },
    { cx: -width / 2 + radius, cy: -height / 2 + radius, start: 180 },
  ];

  return corners.flatMap(({ cx, cy, start }) =>
    Array.from({ length: segments }, (_, index) => {
      const angle = ((start + (index / (segments - 1)) * 90) * Math.PI) / 180;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    }),
  );
}

export default function AcademyOdysseySection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const portalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const portalRef = useRef<HTMLButtonElement | null>(null);
  const backgroundRefs = useRef<Record<SceneId, HTMLVideoElement | null>>({
    campus: null,
    robotics: null,
    auditorium: null,
  });
  const portalVideoRef = useRef<HTMLVideoElement | null>(null);
  const transitionVideoRef = useRef<HTMLVideoElement | null>(null);
  const preloaderVideoRef = useRef<HTMLVideoElement | null>(null);
  const transitionRef = useRef<{
    to: SceneId;
    start: number;
  } | null>(null);
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const preloaderDoneRef = useRef(false);
  const [activeScene, setActiveScene] = useState<SceneId>("campus");
  const [introComplete, setIntroComplete] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [portalKey, setPortalKey] = useState(0);
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);
  const scene = SCENES[activeScene];
  const nextScene = SCENES[scene.nextScene];
  const nextNumber =
    ["campus", "robotics", "auditorium"].indexOf(scene.nextScene) + 1;

  const finishIntro = useCallback(() => {
    if (preloaderDoneRef.current) return;
    preloaderDoneRef.current = true;
    setPreloaderProgress(100);
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let introStartedAt: number | null = null;
    let active = false;
    let animationFrame = 0;
    let lastFrameTime = 0;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activate();
      else deactivate();
    });
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resizeCanvases = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      [sceneCanvasRef.current, portalCanvasRef.current].forEach((canvas) => {
        if (!canvas) return;
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const drawCoveredMedia = (
      context: CanvasRenderingContext2D,
      media: HTMLVideoElement | HTMLImageElement,
    ) => {
      const sourceWidth =
        media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
      const sourceHeight =
        media instanceof HTMLVideoElement
          ? media.videoHeight
          : media.naturalHeight;
      if (!sourceWidth || !sourceHeight) return false;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      context.drawImage(
        media,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      return true;
    };

    const updatePortalTilt = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      rotationRef.current.targetX = reducedMotion
        ? 0
        : clamp(ny, -1, 1) * 33;
      rotationRef.current.targetY = reducedMotion
        ? 0
        : clamp(nx, -1, 1) * -37.4;
    };

    const render = (time: number) => {
      const elapsed = lastFrameTime ? time - lastFrameTime : 16;
      lastFrameTime = time;

      if (!introStartedAt && active && !preloaderDoneRef.current) {
        introStartedAt = time;
        const preloader = preloaderVideoRef.current;
        if (preloader) {
          preloader.playbackRate = 1.5;
          preloader.play().catch((error: unknown) => {
            console.error("The campus intro video could not be played.", error);
          });
        }
      }

      if (introStartedAt && !preloaderDoneRef.current) {
        const progress = clamp((time - introStartedAt) / 2700, 0, 1);
        setPreloaderProgress(Math.floor(progress * 100));
        if (progress >= 1) finishIntro();
      }

      const rotation = rotationRef.current;
      const easing = reducedMotion ? 1 : Math.min(elapsed * 0.009, 1);
      rotation.x += (rotation.targetX - rotation.x) * easing;
      rotation.y += (rotation.targetY - rotation.y) * easing;

      const transitionVideo = transitionVideoRef.current;
      if (transitionRef.current?.start === 0) {
        transitionRef.current.start = time;
      }

      const portalCanvas = portalCanvasRef.current;
      const portalContext = portalCanvas?.getContext("2d");
      const portal = portalRef.current;
      if (portalCanvas && portalContext && portal && active && introComplete) {
        portalContext.clearRect(
          0,
          0,
          window.innerWidth,
          window.innerHeight,
        );
        const rect = portal.getBoundingClientRect();
        const sectionRect = root.getBoundingClientRect();
        const expansion = transitionRef.current
          ? clamp((time - transitionRef.current.start) / 1100, 0, 1)
          : 0;
        const easedExpansion = easeInOutCubic(expansion);
        const centerX = rect.left - sectionRect.left + rect.width / 2;
        const centerY = rect.top - sectionRect.top + rect.height / 2;
        const width =
          rect.width + (window.innerWidth - rect.width) * easedExpansion;
        const height =
          rect.height + (window.innerHeight - rect.height) * easedExpansion;
        const radius =
          Math.min(width / 2, height / 2) * (1 - easedExpansion);
        const points = roundedRectPoints(width, height, radius);
        const ax = (rotation.x * Math.PI) / 180;
        const ay = (rotation.y * Math.PI) / 180;
        const projected = points.map(({ x, y }) => {
          const z = x * Math.sin(ay) - y * Math.sin(ax);
          const perspective = 850 / (850 + z);
          return {
            x: centerX + x * perspective,
            y: centerY + y * perspective,
          };
        });

        portalContext.beginPath();
        projected.forEach(({ x, y }, index) => {
          if (index === 0) portalContext.moveTo(x, y);
          else portalContext.lineTo(x, y);
        });
        portalContext.closePath();
        portalContext.save();
        portalContext.clip();

        const travelVideo = transitionRef.current
          ? transitionVideoRef.current
          : portalVideoRef.current;
        if (travelVideo) drawCoveredMedia(portalContext, travelVideo);
        const shade = portalContext.createLinearGradient(
          0,
          window.innerHeight * 0.55,
          0,
          window.innerHeight,
        );
        shade.addColorStop(0, "rgba(0,0,0,0)");
        shade.addColorStop(1, "rgba(0,0,0,0.55)");
        portalContext.fillStyle = shade;
        portalContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
        portalContext.restore();

      }

      if (
        transitionRef.current &&
        time - transitionRef.current.start >= 1100
      ) {
        const destinationId = transitionRef.current.to;
        const sceneContext = sceneCanvasRef.current?.getContext("2d");
        if (sceneContext && transitionVideo) {
          drawCoveredMedia(sceneContext, transitionVideo);
          if (sceneCanvasRef.current) {
            sceneCanvasRef.current.style.opacity = "1";
          }
        }
        transitionRef.current = null;
        transitionVideo?.pause();
        setActiveScene(destinationId);
        setActiveFacilityIndex(
          FACILITIES.findIndex((facility) => facility.scene === destinationId),
        );
        setBusy(false);
        setPortalKey((key) => key + 1);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const activate = () => {
      if (active) return;
      active = true;
      resizeCanvases();
      animationFrame = window.requestAnimationFrame(render);
    };
    const deactivate = () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
    };
    visibilityObserver.observe(root);
    const rootBounds = root.getBoundingClientRect();
    if (rootBounds.top < window.innerHeight && rootBounds.bottom > 0) {
      activate();
    }

    window.addEventListener("resize", resizeCanvases, { passive: true });
    window.addEventListener("pointermove", updatePortalTilt, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resizeCanvases);
      window.removeEventListener("pointermove", updatePortalTilt);
    };
  }, [finishIntro, introComplete, nextScene]);

  useEffect(() => {
    if (!introComplete) return;
    const video = backgroundRefs.current[activeScene];
    if (!video) return;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      if (sceneCanvasRef.current) sceneCanvasRef.current.style.opacity = "0";
    }
    video.play().then(() => {
      if (sceneCanvasRef.current) sceneCanvasRef.current.style.opacity = "0";
    }).catch((error: unknown) => {
      console.error(`The ${activeScene} campus video could not be played.`, error);
    });
    Object.entries(backgroundRefs.current).forEach(([id, background]) => {
      if (id !== activeScene) background?.pause();
    });
  }, [activeScene, introComplete]);

  useEffect(() => {
    if (!introComplete || !nextScene?.backgroundVideo) return;
    const video = portalVideoRef.current;
    if (!video) return;
    video.play().catch((error: unknown) => {
      console.error("The next campus preview video could not be played.", error);
    });
    return () => video.pause();
  }, [introComplete, nextScene]);

  const enterScene = (destinationId: SceneId) => {
    if (busy || destinationId === activeScene) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionVideo = transitionVideoRef.current;
    const destination = SCENES[destinationId];

    if (transitionVideo && destination.backgroundVideo) {
      transitionVideo.src = destination.backgroundVideo;
      transitionVideo.load();
      transitionVideo.play().catch((error: unknown) => {
        console.error("The campus transition video could not be played.", error);
      });
    } else if (transitionVideo) {
      transitionVideo.pause();
    }

    transitionRef.current = {
      to: destinationId,
      start: prefersReducedMotion ? -1100 : 0,
    };
    setBusy(true);
  };

  const handlePortalClick = () => {
    if (scene.nextScene) enterScene(scene.nextScene);
  };

  return (
    <section
      ref={rootRef}
      id="odyssey-overview"
      className={`${inter.variable} academy-odyssey-section relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-[#08080a] text-white`}
      data-location={activeScene}
      aria-label="Explore our school"
    >
    <div className="backgrounds odyssey-backgrounds" aria-hidden="true">
      {(["campus", "robotics", "auditorium"] as const).map((sceneId) => (
        <video
          key={sceneId}
          id={`${sceneId}-background`}
          ref={(element) => {
            backgroundRefs.current[sceneId] = element;
          }}
          className={`background odyssey-background${sceneId === activeScene ? " is-visible" : ""}`}
          src={SCENES[sceneId].backgroundVideo}
            onError={(event) => {
              console.error(
                `The ${sceneId} campus video could not be loaded.`,
                event.currentTarget.error,
              );
            }}
            muted
            playsInline
            preload="auto"
            loop
          />
        ))}
      </div>

      <div
        id="preloader"
        className={`odyssey-preloader${introComplete ? " is-complete" : ""}`}
        aria-label="Welcome to Sri Aurobindo Mira Universal School"
        aria-hidden={introComplete}
      >
        <video
          id="preloader-video"
          ref={preloaderVideoRef}
          src={MEDIA.preloader}
          poster="/images/campus.jpg"
          onError={(event) => {
            console.error(
              "The campus intro video could not be loaded.",
              event.currentTarget.error,
            );
          }}
          muted
          playsInline
          preload="auto"
          loop
        />
        <div className="odyssey-preloader-shade" />
        <div className="odyssey-preloader-label">
          <span>Sri Aurobindo Mira</span>
          <span>Universal School · CBSE</span>
        </div>
      </div>

      <Image
        id="floating-logo"
        src="/images/logo.png"
        alt="Sri Aurobindo Mira Universal School crest"
        width={59}
        height={58}
        className={`odyssey-floating-logo${introComplete ? " is-docked" : ""}`}
        unoptimized
        priority
      />
      <div
        id="preloader-count"
        className={`odyssey-preloader-count${introComplete ? " is-complete" : ""}`}
        aria-live="polite"
        aria-label={`Introduction ${preloaderProgress}% complete`}
      >
        <span id="preloader-value">{preloaderProgress}</span>
        <span className="odyssey-percent">%</span>
      </div>

      <canvas
        id="scene-canvas"
        ref={sceneCanvasRef}
        className={`odyssey-scene-canvas${busy ? " is-transitioning" : ""}`}
        aria-hidden="true"
      />
      <div className="odyssey-shade" aria-hidden="true" />
      <canvas
        id="portal-canvas"
        ref={portalCanvasRef}
        className="portal-canvas odyssey-portal-canvas"
        aria-hidden="true"
      />

      <div
        className={`odyssey-interface chrome${introComplete ? " intro-ready" : ""}${busy ? " is-transitioning" : ""}`}
      >
        <aside className="department-list odyssey-facilities" aria-label="Campus wings">
          <span className="odyssey-facilities-label">Campus wings</span>
          {FACILITIES.map((facility, index) => (
            <button
              key={facility.name}
              type="button"
              className={activeFacilityIndex === index ? "is-active" : ""}
              onClick={() => {
                setActiveFacilityIndex(index);
                enterScene(facility.scene);
              }}
              aria-current={activeFacilityIndex === index ? "location" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {facility.name}
            </button>
          ))}
        </aside>

        <div className="department-content odyssey-editorial" aria-live="polite">
          <div className="odyssey-title-wrap">
            <span className="odyssey-eyebrow">Sri Aurobindo Mira Universal School</span>
            <h1 id="department-title" key={activeScene} className="odyssey-title">
              {scene.displayTitle}
            </h1>
          </div>
        </div>
        <div className="portal-wrap odyssey-portal-shell">
          <div className="odyssey-portal-group">
              <div className="odyssey-portal-heading">
                <span>Next destination</span>
                <strong>
                  <span id="next-number">[{String(nextNumber).padStart(2, "0")}]</span>{" "}
                  <span id="next-name">{scene.nextName}</span>
                </strong>
              </div>
              <button
                key={portalKey}
                ref={portalRef}
                id="portal"
                className="portal odyssey-portal"
                type="button"
                onClick={handlePortalClick}
                aria-label={`Explore ${scene.nextName}`}
                disabled={busy}
              >
                <span className="odyssey-portal-border" />
                <video
                  id="portal-video"
                  ref={portalVideoRef}
                  className="odyssey-hidden-media"
                  src={nextScene.backgroundVideo}
                  onError={(event) => {
                    console.error(
                      "The next campus preview video could not be loaded.",
                      event.currentTarget.error,
                    );
                  }}
                  muted
                  playsInline
                  preload="auto"
                  loop
                  aria-hidden="true"
                />
              </button>
              <span className="odyssey-portal-hint">
                Enter
                <ArrowRight size={13} aria-hidden="true" />
              </span>
            </div>
        </div>

        <div className="transition-layer odyssey-transition-layer" aria-hidden="true">
          <video
            id="transition-video"
            ref={transitionVideoRef}
            className="odyssey-hidden-media"
            onError={(event) => {
              console.error(
                "The campus transition video could not be loaded.",
                event.currentTarget.error,
              );
            }}
            muted
            playsInline
            preload="auto"
            loop
          />
        </div>
        <div className={`loading odyssey-loading${busy ? " is-visible" : ""}`} aria-live="polite">
          Exploring {scene.nextName ?? "Central Library"}…
        </div>
      </div>

    </section>
  );
}
