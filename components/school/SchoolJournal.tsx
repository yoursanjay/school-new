"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const stories = [
  {
    category: "ACADEMICS",
    title: "Learning beyond the classroom",
    description:
      "How curiosity, collaboration, and hands-on experiences help students turn knowledge into understanding.",
    date: "12 SEP 2026",
    image: "/images/school/classroom.jpg",
    imageAlt: "Students learning together in a bright classroom",
    href: "/garden#academics",
  },
  {
    category: "CAMPUS LIFE",
    title: "A day shaped by discovery",
    description:
      "From morning classrooms to shared spaces, explore the experiences that make everyday school life meaningful.",
    date: "05 SEP 2026",
    image: "/images/school/students.jpg",
    imageAlt: "Students sharing a moment at school",
    href: "/garden#student-life",
  },
  {
    category: "ACHIEVEMENT",
    title: "Celebrating every student's journey",
    description:
      "Recognising the dedication, creativity, confidence, and growth of our students.",
    date: "28 AUG 2026",
    image: "/images/school/arts.jpg",
    imageAlt: "Students taking part in a school arts event",
    href: "/garden#gallery",
  },
];

const storyPhotos = [
  {
    image: stories[0].image,
    imageAlt: stories[0].imageAlt,
    label: "Learning beyond the classroom",
    storyIndex: 0,
  },
  {
    image: stories[1].image,
    imageAlt: stories[1].imageAlt,
    label: "A day shaped by discovery",
    storyIndex: 1,
  },
  {
    image: stories[2].image,
    imageAlt: stories[2].imageAlt,
    label: "Celebrating every student's journey",
    storyIndex: 2,
  },
  {
    image: "/images/school/campus.jpg",
    imageAlt: "The school's campus and outdoor spaces",
    label: "Our campus",
    storyIndex: 1,
  },
  {
    image: "/images/school/library.jpg",
    imageAlt: "Books and learning resources in the school library",
    label: "The school library",
    storyIndex: 0,
  },
  {
    image: "/images/school/science.jpg",
    imageAlt: "Students exploring science at school",
    label: "Curiosity in action",
    storyIndex: 0,
  },
  {
    image: "/images/school/sports.jpg",
    imageAlt: "Students taking part in school sports",
    label: "Learning through play",
    storyIndex: 2,
  },
];

function getFibonacciPositions(total: number) {
  return Array.from({ length: total }, (_, index) => {
    const y = 1 - (index / Math.max(total - 1, 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    return { x, y, z };
  });
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function SchoolJournal() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    active: false,
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    dragged: false,
    photoIndex: null as number | null,
  });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: -12, y: 0 });
  const [rotation, setRotation] = useState({ x: -12, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [sphereRadius, setSphereRadius] = useState(220);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );

  const positions = useMemo(() => getFibonacciPositions(storyPhotos.length), []);

  const getCameraSpaceDepth = (position: (typeof positions)[number]) => {
    const radiansX = (rotation.x * Math.PI) / 180;
    const radiansY = (rotation.y * Math.PI) / 180;
    const rotatedZ =
      -position.x * Math.sin(radiansY) +
      (position.y * Math.sin(radiansX) +
        position.z * Math.cos(radiansX)) *
        Math.cos(radiansY);

    return rotatedZ;
  };

  const frontPhotoIndex = positions.reduce(
    (frontIndex, position, index) =>
      getCameraSpaceDepth(position) >
      getCameraSpaceDepth(positions[frontIndex])
        ? index
        : frontIndex,
    0,
  );
  const activeStory =
    stories[
      storyPhotos[selectedPhotoIndex ?? frontPhotoIndex].storyIndex
    ];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const availableRadius = Math.min(
        entry.contentRect.width * 0.3,
        entry.contentRect.height * 0.38,
      );
      setSphereRadius(Math.min(220, Math.max(105, availableRadius)));
    });
    resizeObserver.observe(stage);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isDragging) {
      return undefined;
    }

    let frameId = 0;

    const tick = () => {
      const xVelocity = velocityRef.current.x;
      const yVelocity = velocityRef.current.y;

      if (Math.abs(xVelocity) < 0.035 && Math.abs(yVelocity) < 0.035) {
        return;
      }

      const nextRotation = {
        x: clamp(rotationRef.current.x + yVelocity, -52, 52),
        y: rotationRef.current.y + xVelocity,
      };

      rotationRef.current = nextRotation;
      setRotation(nextRotation);
      velocityRef.current.x *= 0.94;
      velocityRef.current.y *= 0.94;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isDragging]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStateRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      originX: event.clientX,
      originY: event.clientY,
      dragged: false,
      photoIndex: null,
    };
    velocityRef.current = { x: 0, y: 0 };
    setIsDragging(true);
    const photoCard =
      event.target instanceof HTMLElement
        ? event.target.closest<HTMLElement>(".school-story-photo-card")
        : null;
    const photoIndex = photoCard?.dataset.photoIndex;
    dragStateRef.current.photoIndex =
      photoIndex === undefined ? null : Number(photoIndex);
    (photoCard ?? event.currentTarget).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active) {
      return;
    }

    const dx = event.clientX - dragStateRef.current.x;
    const dy = event.clientY - dragStateRef.current.y;

    dragStateRef.current.x = event.clientX;
    dragStateRef.current.y = event.clientY;
    if (
      Math.hypot(
        event.clientX - dragStateRef.current.originX,
        event.clientY - dragStateRef.current.originY,
      ) > 8
    ) {
      dragStateRef.current.dragged = true;
    }

    const nextRotation = {
      x: clamp(rotationRef.current.x + dy * 0.18, -52, 52),
      y: rotationRef.current.y + dx * 0.35,
    };

    rotationRef.current = nextRotation;
    setRotation(nextRotation);
    velocityRef.current = { x: dx * 0.08, y: dy * 0.06 };
  };

  const stopDragging = () => {
    if (!dragStateRef.current.active) {
      return;
    }

    const { dragged, photoIndex } = dragStateRef.current;
    if (!dragged && photoIndex !== null && Number.isInteger(photoIndex)) {
      setSelectedPhotoIndex((current) =>
        current === photoIndex ? null : photoIndex,
      );
    }

    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <section id="journal" className="school-journal">
      <div className="school-section-shell">
        <header className="school-journal-header">
          <div>
            <p className="school-eyebrow">SCHOOL JOURNAL</p>
            <h2 className="school-serif school-section-title">
              Stories from our school
            </h2>
          </div>
          <p className="school-section-intro">
            Discover the moments, achievements, ideas, and experiences that
            shape our school community.
          </p>
        </header>

        <div className="school-journal-rule" />

        <div className="school-journal-grid">
          <div
            ref={stageRef}
            className="school-journal-3d-stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <div
              className="school-story-3d-world"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              <div className="school-story-3d-halo" aria-hidden="true" />
              {storyPhotos.map((photo, index) => {
                const position = positions[index];
                const depthRatio = clamp(
                  (getCameraSpaceDepth(position) + 1) / 2,
                  0,
                  1,
                );
                const brightness = 0.68 + depthRatio * 0.42;
                const isSelected = selectedPhotoIndex === index;
                const scale = isSelected ? 1.18 : 0.82 + depthRatio * 0.2;

                return (
                  <button
                    type="button"
                    className="school-story-photo-card"
                    key={photo.image}
                    data-photo-index={index}
                    aria-label={`Read story: ${stories[photo.storyIndex].title}`}
                    style={{
                      transform: isSelected
                        ? `translate3d(-50%, -50%, ${sphereRadius + 100}px) scale(${scale})`
                        : `translate3d(-50%, -50%, 0) translate3d(${position.x * sphereRadius}px, ${-position.y * sphereRadius}px, ${position.z * sphereRadius}px) scale(${scale})`,
                      opacity: isSelected ? 1 : 0.5 + depthRatio * 0.5,
                      filter: isSelected
                        ? "brightness(1.08) saturate(1.1)"
                        : `brightness(${brightness}) saturate(${0.82 + depthRatio * 0.28})`,
                      zIndex: isSelected ? 3 : undefined,
                    }}
                    onClick={(event) => {
                      if (event.detail === 0) {
                        setSelectedPhotoIndex(isSelected ? null : index);
                      }
                    }}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.imageAlt}
                      fill
                      sizes="(max-width: 620px) 44vw, 260px"
                    />
                    <span className="school-story-photo-caption">
                      {isSelected ? activeStory.title : photo.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedPhotoIndex === null ? (
              <div className="school-story-center">
              <p className="school-story-center-category school-mono">
                {activeStory.category} · {activeStory.date}
              </p>
              <h3 className="school-serif">{activeStory.title}</h3>
              <p>{activeStory.description}</p>
              <a href={activeStory.href} className="school-story-center-link">
                Read story <span aria-hidden="true">↗</span>
              </a>
              </div>
            ) : (
              <button
                type="button"
                className="school-story-back-button"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                Back to all photos
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
