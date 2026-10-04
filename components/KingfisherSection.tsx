"use client";

import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { useEffect, useRef } from "react";

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

const VIDEO_URL = "https://thinkingods.com/demos/kingfisher-hero/hero.mp4";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function KingfisherSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!container || !stage || !video) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId = 0;
    let thumbnailVideo: HTMLVideoElement | null = null;
    let thumbnailsStarted = false;

    const revealElements = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-kingfisher-reveal]"),
    ).map((element) => ({
      element,
      start: Number(element.dataset.revealStart),
      end: Number(element.dataset.revealEnd),
    }));

    const updateScrollProgress = () => {
      const scrollDistance = Math.max(
        container.offsetHeight - window.innerHeight,
        1,
      );
      targetProgress = clamp(
        -container.getBoundingClientRect().top / scrollDistance,
        0,
        1,
      );
    };

    const sampleBackdrop = () => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

      try {
        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = 1;
        sampleCanvas.height = 1;
        const context = sampleCanvas.getContext("2d", { willReadFrequently: true });
        if (!context || !video.videoWidth || !video.videoHeight) return;

        const sampleX = Math.min(
          video.videoWidth - 1,
          Math.floor(video.videoWidth * 0.94),
        );
        const sampleY = Math.min(
          video.videoHeight - 1,
          Math.floor(video.videoHeight * 0.12),
        );
        context.drawImage(video, sampleX, sampleY, 1, 1, 0, 0, 1, 1);
        const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;

        container.style.setProperty("--bg", `rgb(${red} ${green} ${blue})`);
        container.style.setProperty(
          "--ghost",
          `rgb(${Math.round(red * 0.955)} ${Math.round(green * 0.955)} ${Math.round(blue * 0.955)})`,
        );
      } catch {
        container.style.setProperty("--bg", "#B6C3B0");
        container.style.setProperty("--ghost", "#ADBAA7");
      }
    };

    const drawThumbnails = (source: HTMLVideoElement) => {
      if (!source.videoWidth || !source.videoHeight) return;

      stage.querySelectorAll<HTMLCanvasElement>("[data-crop]").forEach((canvas) => {
        const bounds = canvas.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(bounds.width * pixelRatio));
        const height = Math.max(1, Math.round(bounds.height * pixelRatio));
        const context = canvas.getContext("2d");
        const crop = canvas.dataset.crop?.split(",").map(Number);
        if (!context || !crop || crop.length !== 3) return;

        canvas.width = width;
        canvas.height = height;

        const [centerX, centerY, scale] = crop;
        const sourceWidth = Math.min(source.videoWidth, source.videoWidth * scale);
        const sourceHeight = Math.min(
          source.videoHeight,
          sourceWidth / (width / height),
        );
        const sourceX = clamp(
          centerX * source.videoWidth - sourceWidth / 2,
          0,
          source.videoWidth - sourceWidth,
        );
        const sourceY = clamp(
          centerY * source.videoHeight - sourceHeight / 2,
          0,
          source.videoHeight - sourceHeight,
        );

        context.drawImage(
          source,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          width,
          height,
        );
        canvas.dataset.drawn = "true";
      });
    };

    const startThumbnailCapture = () => {
      if (thumbnailsStarted) return;
      thumbnailsStarted = true;

      const source = document.createElement("video");
      thumbnailVideo = source;
      source.muted = true;
      source.playsInline = true;
      source.preload = "auto";

      const seekToLandingFrame = () => {
        if (!Number.isFinite(source.duration)) return;
        const landingTime = Math.max(source.duration - 0.04, 0);
        if (landingTime === 0) {
          drawThumbnails(source);
          return;
        }
        source.currentTime = landingTime;
      };
      const captureLandingFrame = () => drawThumbnails(source);

      source.addEventListener("loadedmetadata", seekToLandingFrame);
      source.addEventListener("seeked", captureLandingFrame, { once: true });
      source.src = VIDEO_URL;
      source.load();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    const animate = () => {
      const difference = targetProgress - currentProgress;
      const interpolation = reducedMotion ? 0.35 : 0.12;
      currentProgress =
        Math.abs(difference) < 0.001
          ? targetProgress
          : currentProgress + difference * interpolation;

      if (
        video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const targetTime =
          currentProgress >= 1
            ? Math.max(video.duration - Math.min(0.04, video.duration / 2), 0)
            : currentProgress * video.duration;

        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }

      revealElements.forEach(({ element, start, end }) => {
        const elementProgress = clamp(
          (currentProgress - start) / (end - start),
          0,
          1,
        );
        const easedProgress =
          elementProgress * elementProgress * (3 - 2 * elementProgress);
        const travelDistance = reducedMotion ? 3 : 18;

        element.style.opacity = String(easedProgress);
        element.style.transform = `translate3d(0, ${(1 - easedProgress) * travelDistance}px, 0)`;
        element.style.filter = `blur(${(1 - easedProgress) * (reducedMotion ? 0 : 6)}px)`;
      });

      if (currentProgress >= 0.48) startThumbnailCapture();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    video.pause();
    video.addEventListener("loadeddata", sampleBackdrop);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) sampleBackdrop();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    updateScrollProgress();
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
      video.removeEventListener("loadeddata", sampleBackdrop);

      if (thumbnailVideo) {
        thumbnailVideo.pause();
        thumbnailVideo.removeAttribute("src");
        thumbnailVideo.load();
      }
    };
  }, []);

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
        aria-label="A place to learn: school cinematic hero"
      >
        <video
          ref={videoRef}
          className="kingfisher-video"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          loop={false}
          aria-hidden="true"
        />

        <div className="kingfisher-word-wrap" aria-hidden="true">
          <div className={`${instrumentSerif.className} kingfisher-word`}>
            <span>SCHOOL</span>
          </div>
        </div>

        <div className="kingfisher-ui">
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
            aria-label="Academic and campus previews"
            data-kingfisher-reveal
            data-reveal-start="0.6"
            data-reveal-end="0.8"
          >
            <div className="kingfisher-trust-row" aria-label="Our school community">
              <span className="kingfisher-avatar kingfisher-avatar-one">A</span>
              <span className="kingfisher-avatar kingfisher-avatar-two">B</span>
              <span className="kingfisher-avatar kingfisher-avatar-three">C</span>
              <span className="kingfisher-avatar kingfisher-avatar-four">D</span>
            </div>
            <div className="kingfisher-cards">
              <article className="kingfisher-card">
                <div className="kingfisher-card-art">
                  <canvas
                    data-crop="0.555,0.335,0.22"
                    aria-label="Academic preview"
                  />
                  <span className="kingfisher-card-index kingfisher-mono">
                    ACADEMICS / 01
                  </span>
                </div>
                <div className="kingfisher-card-caption">
                  <span>Learn · Explore</span>
                  <span className="kingfisher-dots" aria-label="Three steps">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </article>

              <article className="kingfisher-card kingfisher-card-offset">
                <div className="kingfisher-card-art">
                  <canvas
                    data-crop="0.43,0.60,0.24"
                    aria-label="Campus preview"
                  />
                  <span className="kingfisher-card-index kingfisher-mono">
                    CAMPUS / 02
                  </span>
                </div>
                <div className="kingfisher-card-caption">
                  <span>Life at school</span>
                  <span className="kingfisher-dots" aria-label="Three steps">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </article>
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
