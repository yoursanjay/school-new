"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Microscope,
  School,
  ShieldCheck,
  Star,
  TreeDeciduous,
  UsersRound,
} from "lucide-react";

const schoolHighlights = [
  { label: "Graduation", Icon: GraduationCap, tone: "blue" },
  { label: "Microscope", Icon: Microscope, tone: "mint" },
  { label: "Our school", Icon: School, tone: "gold" },
  { label: "Nature", Icon: TreeDeciduous, tone: "green" },
  { label: "Shine", Icon: Star, tone: "coral" },
];

const butterflyFlights = [
  {
    start: 0.08,
    end: 0.9,
    points: [[-0.08, 0.68], [0.14, 0.76], [0.36, 0.25], [0.57, 0.48]],
    color: "#ed6a8b",
  },
  {
    start: 0.13,
    end: 0.86,
    points: [[0.02, 0.2], [0.24, -0.03], [0.68, 0.02], [1.08, 0.18]],
    color: "#8a74d6",
  },
  {
    start: 0.28,
    end: 0.96,
    points: [[0.39, 0.43], [0.56, 0.12], [0.8, 0.77], [1.08, 0.48]],
    color: "#e8a23a",
  },
  {
    start: 0.1,
    end: 0.72,
    points: [[0.56, 0.04], [0.62, 0.23], [0.78, -0.01], [0.93, 0.16]],
    color: "#39a9a5",
  },
  {
    start: 0.38,
    end: 0.99,
    points: [[-0.06, 0.32], [0.22, 0.86], [0.78, 0.23], [1.06, 0.68]],
    color: "#e06c58",
  },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const cubicBezier = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number,
) => {
  const inverse = 1 - t;
  return (
    inverse ** 3 * p0 +
    3 * inverse ** 2 * t * p1 +
    3 * inverse * t ** 2 * p2 +
    t ** 3 * p3
  );
};

export default function AboutOurSchoolSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const butterflyRefs = useRef<Array<SVGSVGElement | null>>([]);
  const isIntersectingRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector(".school-about-stage");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setProgress = (progress: number) => {
      section.style.setProperty("--about-progress", progress.toFixed(4));
      section.style.setProperty(
        "--about-reveal",
        clamp((progress - 0.04) / 0.4, 0, 1).toFixed(4),
      );

      const width = stage?.clientWidth ?? section.clientWidth;
      const height = stage?.clientHeight ?? window.innerHeight;

      butterflyFlights.forEach((flight, index) => {
        const butterfly = butterflyRefs.current[index];
        if (!butterfly) return;

        const rawProgress = clamp(
          (progress - flight.start) / (flight.end - flight.start),
          0,
          1,
        );
        const pathProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
        const [start, control1, control2, end] = flight.points;
        const x = cubicBezier(
          pathProgress,
          start[0],
          control1[0],
          control2[0],
          end[0],
        ) * width;
        const y = cubicBezier(
          pathProgress,
          start[1],
          control1[1],
          control2[1],
          end[1],
        ) * height;
        const nextProgress = Math.min(pathProgress + 0.01, 1);
        const nextX = cubicBezier(
          nextProgress,
          start[0],
          control1[0],
          control2[0],
          end[0],
        ) * width;
        const nextY = cubicBezier(
          nextProgress,
          start[1],
          control1[1],
          control2[1],
          end[1],
        ) * height;
        const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);
        const visibility = clamp(
          Math.min(rawProgress * 5, (1 - rawProgress) * 5),
          0,
          1,
        );
        const wingFlap = Math.sin(progress * 48 + index * 1.7) * 13;

        butterfly.style.opacity = visibility.toFixed(3);
        butterfly.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg) scale(${0.72 + visibility * 0.28})`;
        butterfly.style.setProperty("--wing-flap", `${wingFlap.toFixed(2)}deg`);
      });
    };

    const updateTarget = () => {
      if (!isIntersectingRef.current || reducedMotionRef.current) return;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );
      targetProgressRef.current = clamp(-rect.top / scrollDistance, 0, 1);
    };

    const animate = () => {
      animationFrameRef.current = null;
      if (!isIntersectingRef.current || reducedMotionRef.current) return;

      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.12;
      if (
        Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.001
      ) {
        currentProgressRef.current = targetProgressRef.current;
      }

      setProgress(currentProgressRef.current);

      if (currentProgressRef.current !== targetProgressRef.current) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const scheduleAnimation = () => {
      if (
        isIntersectingRef.current &&
        !reducedMotionRef.current &&
        animationFrameRef.current === null
      ) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      updateTarget();
      scheduleAnimation();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      section.dataset.reducedMotion = String(event.matches);
      if (event.matches) {
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        currentProgressRef.current = 1;
        targetProgressRef.current = 1;
        setProgress(1);
      } else {
        handleScroll();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateTarget();
          scheduleAnimation();
        } else if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      },
      { threshold: 0, rootMargin: "120px 0px" },
    );

    reducedMotionRef.current = motionQuery.matches;
    section.dataset.reducedMotion = String(motionQuery.matches);
    if (motionQuery.matches) {
      currentProgressRef.current = 1;
      targetProgressRef.current = 1;
      setProgress(1);
    }

    observer.observe(section);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToReviews = () => {
    document.querySelector(".testimonial-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="school-about-section"
      aria-labelledby="school-about-heading"
    >
      <div className="school-about-stage">
        <svg
          className="school-about-branch school-about-branch-left"
          viewBox="0 0 380 250"
          aria-hidden="true"
        >
          <path d="M-20 228C92 164 163 105 324 18" />
          <path d="M70 177C57 130 35 109 6 99M133 140c-3-47 8-77 34-106m36 73c20-34 48-49 86-51m-119 89c-30-9-54-7-80 8m152-65c26-5 47 0 70 15" />
          <ellipse cx="25" cy="107" rx="20" ry="9" transform="rotate(40 25 107)" />
          <ellipse cx="169" cy="40" rx="22" ry="9" transform="rotate(-48 169 40)" />
          <ellipse cx="284" cy="57" rx="22" ry="9" transform="rotate(20 284 57)" />
          <ellipse cx="105" cy="183" rx="22" ry="9" transform="rotate(18 105 183)" />
          <ellipse cx="274" cy="81" rx="20" ry="8" transform="rotate(48 274 81)" />
        </svg>
        <svg
          className="school-about-branch school-about-branch-right"
          viewBox="0 0 380 250"
          aria-hidden="true"
        >
          <path d="M400 230C288 164 217 105 56 18" />
          <path d="M310 177c13-47 35-68 64-78m-127 41c3-47-8-77-34-106m-36 73c-20-34-48-49-86-51m119 89c30-9 54-7 80 8m-152-65c-26-5-47 0-70 15" />
          <ellipse cx="355" cy="107" rx="20" ry="9" transform="rotate(-40 355 107)" />
          <ellipse cx="211" cy="40" rx="22" ry="9" transform="rotate(48 211 40)" />
          <ellipse cx="96" cy="57" rx="22" ry="9" transform="rotate(-20 96 57)" />
          <ellipse cx="275" cy="183" rx="22" ry="9" transform="rotate(-18 275 183)" />
          <ellipse cx="106" cy="81" rx="20" ry="8" transform="rotate(-48 106 81)" />
        </svg>

        {butterflyFlights.map((flight, index) => (
          <svg
            key={`butterfly-${index}`}
            ref={(element) => {
              butterflyRefs.current[index] = element;
            }}
            className="school-about-butterfly"
            viewBox="0 0 64 48"
            aria-hidden="true"
          >
            <g className="school-butterfly-wings">
              <path
                d="M31 23C22 4 8 3 6 13c-2 8 7 13 22 14C13 27 8 35 14 41c7 7 17-2 19-16Z"
                fill={flight.color}
              />
              <path
                d="M33 23C42 4 56 3 58 13c2 8-7 13-22 14 15 0 20 8 14 14-7 7-17-2-19-16Z"
                fill={flight.color}
              />
              <circle cx="20" cy="17" r="3" fill="#fff4cb" />
              <circle cx="44" cy="17" r="3" fill="#fff4cb" />
            </g>
            <path
              d="M32 17v17m0-15-5-6m5 6 5-6"
              fill="none"
              stroke="#5c513f"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        ))}

        <div className="school-about-content">
          <header className="school-about-heading school-about-reveal">
            <span className="school-about-eyebrow">A place to grow</span>
            <h2 id="school-about-heading">ABOUT OUR SCHOOL</h2>
            <span className="school-about-heading-rule" />
          </header>

          <div className="school-about-main">
            <article className="school-vision-card school-about-reveal">
              <span className="school-card-overline">Our purpose</span>
              <h3>OUR VISION<br />&amp; MISSION</h3>
              <p>
                To nurture holistic development in a safe, inspiring
                environment. We aim to empower students through academic
                excellence and a spirit of discovery.
              </p>
              <div className="school-vision-seal" aria-hidden="true">
                <ShieldCheck size={27} strokeWidth={1.7} />
              </div>
            </article>

            <div className="school-about-right">
              <div className="school-level-cards">
                <article className="school-level-card school-about-reveal">
                  <div className="school-level-image school-level-primary">
                    <Image
                      src="/images/primary.jpg"
                      alt="Primary school students learning together"
                      fill
                      sizes="(max-width: 760px) 39vw, 236px"
                    />
                    <span className="school-level-title">PRIMARY<br />SCHOOL</span>
                  </div>
                </article>
                <article className="school-level-card school-about-reveal">
                  <div className="school-level-image school-level-middle">
                    <Image
                      src="/images/middle-school.jpg"
                      alt="Middle and high school students at school"
                      fill
                      sizes="(max-width: 760px) 39vw, 236px"
                    />
                    <span className="school-level-title">MIDDLE &amp; HIGH<br />SCHOOL</span>
                  </div>
                </article>
              </div>

              <div className="school-about-details">
                <article className="school-detail-card school-about-reveal">
                  <div className="school-detail-image">
                    <Image
                      src="/images/school/students.jpg"
                      alt=""
                      fill
                      sizes="48px"
                    />
                    <UsersRound size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>OUR TEAM</h3>
                    <p>Experienced<br />Educators</p>
                  </div>
                </article>
                <article className="school-detail-card school-about-reveal">
                  <div className="school-detail-image">
                    <Image src="/images/campus.jpg" alt="" fill sizes="48px" />
                    <School size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>OUR CAMPUS</h3>
                    <p>Safe &amp; Modern<br />Facilities</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="school-about-footer school-about-reveal">
            <div className="school-highlight-row">
              {schoolHighlights.map(({ label, Icon, tone }) => (
                <div className={`school-highlight school-highlight-${tone}`} key={label}>
                  <span className="school-highlight-icon">
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <button
              className="school-about-cta"
              type="button"
              onClick={scrollToReviews}
            >
              LEARN MORE
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <svg
          className="school-about-books"
          viewBox="0 0 210 150"
          aria-hidden="true"
        >
          <path d="M20 96h131l26 16H45Z" fill="#efab55" />
          <path d="M20 91h131v10H20z" fill="#f7d58b" />
          <path d="M34 74h135l20 16H54Z" fill="#5ca7d7" />
          <path d="M34 68h135v11H34z" fill="#8ec9e9" />
          <path d="m77 36 22 5-14 58-22-5z" fill="#f06c74" />
          <path d="m87 38 6 2-14 58-6-2z" fill="#ffd467" />
          <path d="m102 42 22-7 18 56-22 7z" fill="#79bd8a" />
          <path d="m113 39 6-2 18 56-6 2z" fill="#fff0be" />
        </svg>

        <svg
          className="school-about-bus"
          viewBox="0 0 250 135"
          aria-hidden="true"
        >
          <path d="M25 27c0-9 7-16 16-16h156c10 0 18 8 18 18v67H25Z" fill="#f4bc43" />
          <path d="M38 25h40v34H38zm48 0h43v34H86zm51 0h43v34h-43z" fill="#cceaf4" />
          <path d="M26 65h188v31H26z" fill="#edaa32" />
          <path d="M45 73h72v12H45z" fill="#fff3d6" />
          <path d="M165 67h32v20h-32z" fill="#ef6b58" />
          <circle cx="66" cy="98" r="17" fill="#31445b" />
          <circle cx="66" cy="98" r="7" fill="#d6e0e5" />
          <circle cx="178" cy="98" r="17" fill="#31445b" />
          <circle cx="178" cy="98" r="7" fill="#d6e0e5" />
          <path d="M218 70h14v22h-14z" fill="#edaa32" />
          <path d="M231 73h10v16h-10z" fill="#ffd978" />
        </svg>
      </div>
    </section>
  );
}
