"use client";

import Image from "next/image";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const REVEAL_AT = 4.3;

const SCENE_ORDER = ["academics", "campus", "schoolLife", "community"] as const;
type SceneId = (typeof SCENE_ORDER)[number];

const SCENES: Record<
  SceneId,
  {
    label: string;
    image: string;
    alt: string;
    caption: string;
    objectPosition?: string;
  }
> = {
  academics: {
    label: "Academics",
    image: "/images/school-hero-learning.jpg",
    alt: "Students learning together in a classroom",
    caption: "Learn · Explore",
  },
  campus: {
    label: "Campus",
    image: "/images/school-hero-campus.jpg",
    alt: "Sri Aurobindo Mira Universal School campus",
    caption: "A place to grow",
  },
  schoolLife: {
    label: "School Life",
    image: "/images/school-hero-campus-life.jpg",
    alt: "Students walking through a landscaped campus",
    caption: "Life at School",
  },
  community: {
    label: "Community",
    image: "/images/school-hero-campus.jpg",
    alt: "Sri Aurobindo Mira Universal School campus",
    caption: "Learn · Belong",
    objectPosition: "center 64%",
  },
};

const PREVIEW_SCENES: Record<SceneId, readonly [SceneId, SceneId]> = {
  academics: ["campus", "schoolLife"],
  campus: ["academics", "schoolLife"],
  schoolLife: ["campus", "community"],
  community: ["academics", "campus"],
};

const PREVIEW_LABELS: Record<SceneId, readonly [string, string]> = {
  academics: ["CAMPUS", "SCHOOL LIFE"],
  campus: ["ACADEMICS", "CAMPUS"],
  schoolLife: ["CAMPUS", "COMMUNITY"],
  community: ["ACADEMICS", "CAMPUS"],
};

export default function KingfisherSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentProgressRef = useRef(0);
  const fallbackTimeoutRef = useRef<number | null>(null);
  const [activeScene, setActiveScene] = useState<SceneId>("campus");
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
      setReducedMotion(event.matches);
    };

    handleMotionPreference(mediaQuery);
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const image = imageWrapRef.current?.querySelector("img");
    if (!container || !stage || !image) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId = 0;
    let animationPending = false;

    const revealElements = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-kingfisher-reveal]"),
    ).map((element) => ({
      element,
      start: Number(element.dataset.revealStart),
      end: Number(element.dataset.revealEnd),
    }));

    const updateScrollProgress = () => {
      const stageRect = stage.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const enterProgress = clamp(
        (viewportHeight - stageRect.top) / viewportHeight,
        0,
        1,
      );
      targetProgress = enterProgress;
      scheduleAnimation();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) currentProgress = targetProgress;
      scheduleAnimation();
    };

    const animate = () => {
      animationPending = false;
      const difference = targetProgress - currentProgress;
      if (reducedMotion || Math.abs(difference) < 0.001) {
        currentProgress = targetProgress;
      } else {
        currentProgress += difference * 0.12;
      }
      currentProgressRef.current = currentProgress;

      const imageTravel = reducedMotion ? 0 : (currentProgress - 0.5) * 28;
      const image = imageWrapRef.current?.querySelector("img");
      if (image) {
        image.style.transform = `scale(${reducedMotion ? 1 : 1.08}) translate3d(0, ${imageTravel}px, 0)`;
      }

      revealElements.forEach(({ element, start, end }) => {
        const elementProgress = reducedMotion
          ? 1
          : clamp((currentProgress - start) / (end - start), 0, 1);
        const easedProgress =
          elementProgress * elementProgress * (3 - 2 * elementProgress);
        const travelDistance = reducedMotion ? 0 : 18;

        element.style.opacity = String(easedProgress);
        element.style.transform = `translate3d(0, ${(1 - easedProgress) * travelDistance}px, 0)`;
        element.style.filter = `blur(${(1 - easedProgress) * (reducedMotion ? 0 : 6)}px)`;
      });

      if (!reducedMotion && Math.abs(targetProgress - currentProgress) >= 0.001) {
        scheduleAnimation();
      }
    };

    function scheduleAnimation() {
      if (animationPending) return;
      animationPending = true;
      animationFrameId = window.requestAnimationFrame(animate);
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    updateScrollProgress();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  useEffect(() => {
    const image = imageWrapRef.current?.querySelector("img");
    if (!image) return;

    const imageTravel = reducedMotion
      ? 0
      : (currentProgressRef.current - 0.5) * 28;
    image.style.transform = `scale(${reducedMotion ? 1 : 1.08}) translate3d(0, ${imageTravel}px, 0)`;
  }, [activeScene, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const runVideo = () => {
      if (reducedMotion) {
        video.pause();
        video.currentTime = video.duration || 0;
        setVideoReady(true);
        return;
      }

      if (video.readyState >= 2) {
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.play().catch(() => {
          setVideoReady(false);
        });
        setVideoReady(true);
      }
    };

    const handleLoadedData = () => {
      setVideoReady(true);
      runVideo();
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      runVideo();
    };

    const handleEnded = () => {
      if (video.duration) {
        video.currentTime = video.duration;
        video.pause();
      }
      setVideoReady(true);
    };

    const handleError = () => {
      setVideoReady(false);
      video.pause();
    };

    if (reducedMotion) {
      video.pause();
      video.currentTime = video.duration || 0;
      setVideoReady(true);
      return;
    }

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    if (fallbackTimeoutRef.current) {
      window.clearTimeout(fallbackTimeoutRef.current);
    }

    fallbackTimeoutRef.current = window.setTimeout(() => {
      if (video.readyState < 2) {
        setVideoReady(false);
      }
    }, 9000);

    if (video.readyState >= 2) {
      runVideo();
    }

    return () => {
      if (fallbackTimeoutRef.current) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [reducedMotion]);

  const replayFromStart = () => {
    const container = containerRef.current;
    if (!container) return;

    const top = container.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  const previewScenes = PREVIEW_SCENES[activeScene];

  return (
    <div
      id="kingfisher"
      ref={containerRef}
      className="kingfisher-scroll-container"
    >
      <section
        ref={stageRef}
        id="kingfisher-stage"
        className={`${jetBrainsMono.variable} kingfisher-cinematic-section`}
        aria-label="Sri Aurobindo Mira Universal School"
      >
        <div className="kingfisher-image-wrap" ref={imageWrapRef} aria-hidden="true">
          <Image
            key={activeScene}
            className="kingfisher-image kingfisher-image-enter"
            src={SCENES[activeScene].image}
            alt=""
            fill
            sizes="100vw"
            style={{ objectPosition: SCENES[activeScene].objectPosition }}
            loading="lazy"
          />

          <video
            ref={videoRef}
            className={`kingfisher-video${videoReady && !reducedMotion ? " is-visible" : ""}`}
            src="https://thinkingods.com/demos/kingfisher-hero/hero.mp4"
            muted
            playsInline
            preload="auto"
            autoPlay
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onEnded={() => {
              const video = videoRef.current;
              if (video && video.duration) {
                video.currentTime = video.duration;
                video.pause();
              }
              setVideoReady(true);
            }}
            onError={() => setVideoReady(false)}
          />
        </div>

        <div className="kingfisher-word-wrap" aria-hidden="true">
          <div className={`${instrumentSerif.className} kingfisher-word`}>
            <span>ACADEMY</span>
          </div>
        </div>

        <div className="kingfisher-ui">
          <div className="kingfisher-branding kingfisher-mono">
            <span>Sri Aurobindo Mira Universal School</span>
          </div>

          <div className="kingfisher-copy">
            <div
              className="kingfisher-eyebrow kingfisher-mono"
              data-kingfisher-reveal
              data-reveal-start="0.35"
              data-reveal-end="0.55"
            >
              <span>A PLACE TO LEARN</span>
              <i aria-hidden="true" />
            </div>
            <h1
              className={`${instrumentSerif.className} kingfisher-headline`}
              data-kingfisher-reveal
              data-reveal-start="0.4"
              data-reveal-end="0.6"
            >
              Where young
              <br />
              minds <em>grow</em>
            </h1>
            <p
              className="kingfisher-description"
              data-kingfisher-reveal
              data-reveal-start="0.5"
              data-reveal-end="0.68"
            >
              A vibrant learning environment where curiosity, character, and
              confidence shape every student.
            </p>
            <div
              className="kingfisher-cta-row"
              data-kingfisher-reveal
              data-reveal-start="0.55"
              data-reveal-end="0.75"
            >
              <a className="kingfisher-primary-cta" href="/garden#about">
                Explore our school <span aria-hidden="true">↗</span>
              </a>
              <a
                className="kingfisher-secondary-cta"
                href="/garden#facilities"
              >
                Discover campus ↗
              </a>
            </div>
          </div>

          <aside
            className="kingfisher-cluster"
            aria-label="School experience previews"
            data-kingfisher-reveal
            data-reveal-start="0.6"
            data-reveal-end="0.8"
          >
            <div
              className="kingfisher-trust-row"
              role="group"
              aria-label="Choose a school experience"
            >
              {SCENE_ORDER.map((sceneId, index) => (
                <button
                  key={sceneId}
                  className={`kingfisher-avatar kingfisher-avatar-${index + 1}${activeScene === sceneId ? " is-active" : ""}`}
                  type="button"
                  aria-label={`Show ${SCENES[sceneId].label}`}
                  aria-pressed={activeScene === sceneId}
                  onClick={() => setActiveScene(sceneId)}
                >
                  {String.fromCharCode(65 + index)}
                </button>
              ))}
            </div>
            <div className="kingfisher-cards">
              {previewScenes.map((sceneId, index) => {
                const scene = SCENES[sceneId];
                return (
                  <button
                    key={sceneId}
                    className={`kingfisher-card${index === 1 ? " kingfisher-card-offset" : ""}`}
                    type="button"
                    aria-label={`Show ${scene.label}`}
                    onClick={() => setActiveScene(sceneId)}
                  >
                    <div className="kingfisher-card-art">
                      <Image
                        key={`${activeScene}-${sceneId}`}
                        src={scene.image}
                        alt={scene.alt}
                        fill
                        sizes="(max-width: 900px) 38vw, 200px"
                        loading="lazy"
                      />
                      <span className="kingfisher-card-index kingfisher-mono">
                        {PREVIEW_LABELS[activeScene][index]} / 0{index + 1}
                      </span>
                    </div>
                    <div
                      className="kingfisher-card-caption"
                      key={`${activeScene}-${sceneId}-caption`}
                    >
                      <span className="kingfisher-caption-label">
                        {scene.caption}
                      </span>
                      <span className="kingfisher-dots" aria-label="Three steps">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div
            className="kingfisher-metadata kingfisher-mono"
            data-kingfisher-reveal
            data-reveal-start="0.75"
            data-reveal-end="0.95"
          >
            <div className="kingfisher-species">
              <span>STUDENTS 01</span>
              <em>Future ready</em>
            </div>
            <span className="kingfisher-coordinates">
              EXCELLENCE · COMMUNITY · GROWTH
            </span>
            <button
              className="kingfisher-replay"
              type="button"
              onClick={replayFromStart}
            >
              EXPLORE <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
