"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";

const VIDEO_SOURCE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";

interface ScrollVideoProps {
  sequenceRef: RefObject<HTMLDivElement | null>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ScrollVideo({ sequenceRef }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const sequence = sequenceRef.current;
    const background = backgroundRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !video || !sequence || !background || !context) return;

    let targetProgress = 0;
    let smoothedProgress = 0;
    let animationFrameId = 0;
    let animationPending = false;
    let hasRenderedFrame = false;

    const drawCoverFrame = () => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const videoWidth = video.videoWidth || width;
      const videoHeight = video.videoHeight || height;
      const scale = Math.max(width / videoWidth, height / videoHeight);
      const drawWidth = videoWidth * scale;
      const drawHeight = videoHeight * scale;

      try {
        context.clearRect(0, 0, width, height);
        context.drawImage(
          video,
          (width - drawWidth) / 2,
          (height - drawHeight) / 2,
          drawWidth,
          drawHeight,
        );
      } catch (error) {
        console.error("Unable to render the scroll-scrubbed video frame.", error);
        return;
      }

      hasRenderedFrame = true;
      if (posterRef.current) posterRef.current.style.opacity = "0";
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (hasRenderedFrame) drawCoverFrame();
    };

    const updateTargetProgress = () => {
      const rect = sequence.getBoundingClientRect();
      const scrollableDistance = Math.max(
        sequence.offsetHeight - window.innerHeight,
        1,
      );
      targetProgress = clamp(-rect.top / scrollableDistance, 0, 1);
      scheduleAnimation();
    };

    const animate = () => {
      animationPending = false;
      smoothedProgress += (targetProgress - smoothedProgress) * 0.12;

      if (
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.readyState >= HTMLMediaElement.HAVE_METADATA
      ) {
        const targetTime = smoothedProgress * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.04 && !video.seeking) {
          video.currentTime = targetTime;
        }
      }

      if (Math.abs(targetProgress - smoothedProgress) >= 0.001) {
        scheduleAnimation();
      }
    };

    function scheduleAnimation() {
      if (animationPending) return;
      animationPending = true;
      animationFrameId = window.requestAnimationFrame(animate);
    }

    const handleVideoData = () => {
      drawCoverFrame();
      updateTargetProgress();
    };
    const handleSeeked = () => {
      drawCoverFrame();
      scheduleAnimation();
    };
    const handleVideoError = () => {
      console.error(
        "The scroll-scrubbed school video could not be loaded.",
        video.error,
      );
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      background.style.opacity = entry.isIntersecting ? "1" : "0";
    });
    visibilityObserver.observe(sequence);
    resizeCanvas();
    updateTargetProgress();
    video.addEventListener("loadeddata", handleVideoData);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleVideoError);
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("scroll", updateTargetProgress, { passive: true });

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      handleVideoData();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      video.removeEventListener("loadeddata", handleVideoData);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleVideoError);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateTargetProgress);
    };
  }, [sequenceRef]);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a] opacity-0 transition-opacity duration-500 pointer-events-none"
      aria-hidden="true"
    >
      <Image
        ref={posterRef}
        src="/images/school-hero-campus.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover transition-opacity duration-500"
      />
      <video
        ref={videoRef}
        className="absolute h-px w-px opacity-0"
        src={VIDEO_SOURCE}
        crossOrigin="anonymous"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
