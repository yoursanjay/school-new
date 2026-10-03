"use client";

import { useEffect, useRef } from "react";

const curriculumCards = [
  {
    title: "STEM & Innovation",
    bullets: [
      "Hands-on Science Labs",
      "Coding & Robotics",
      "Problem-Solving Challenges",
    ],
    accent: "#f7c76f",
    image: "/images/innovation.jpg",
  },
  {
    title: "Primary Foundations",
    bullets: [
      "Literacy & Numeracy",
      "Social-Emotional Learning",
      "Curiosity-Driven Inquiry",
    ],
    accent: "#88d0ae",
    image: "/images/primary.jpg",
  },
  {
    title: "Future Technologies",
    bullets: [
      "Engineering Principles",
      "Advanced Coding",
      "AI & Digital Skills",
    ],
    accent: "#7bc3ff",
    image: "/images/senior-school.jpg",
  },
  {
    title: "Arts & Humanities",
    bullets: [
      "Visual Arts & Design",
      "Creative Writing",
      "History & Culture Studies",
    ],
    accent: "#f2a7c8",
    image: "/images/arts.jpg",
  },
];

export default function AcademicsSection() {
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const section = document.getElementById("academics");
    const stage = section?.querySelector(".academics-sticky");
    const rabbit = section?.querySelector<HTMLElement>(".academics-rabbit");
    const tortoise = section?.querySelector<HTMLElement>(".academics-tortoise");
    if (!section || !stage || !rabbit || !tortoise) return;

    const clouds = Array.from(
      section.querySelectorAll<HTMLElement>(".academics-cloud"),
    );
    const vines = Array.from(
      section.querySelectorAll<HTMLElement>(".academics-vine"),
    );
    const books = section.querySelector<HTMLElement>(".academics-books");
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);
    let rabbitTravel = 0;
    let tortoiseTravel = 0;

    const measureTravel = () => {
      const width = stage.clientWidth;
      const rabbitLeft =
        Number.parseFloat(getComputedStyle(rabbit).left) || 0;
      const tortoiseLeft =
        Number.parseFloat(getComputedStyle(tortoise).left) || 0;
      const rabbitScale =
        Number.parseFloat(
          getComputedStyle(rabbit).getPropertyValue("--academics-scale"),
        ) || 1;
      const tortoiseScale =
        Number.parseFloat(
          getComputedStyle(tortoise).getPropertyValue("--academics-scale"),
        ) || 1;
      rabbitTravel = Math.max(
        0,
        width - rabbitLeft - rabbit.offsetWidth * rabbitScale - 16,
      );
      tortoiseTravel = Math.max(
        0,
        Math.min(
          width * 0.65 -
            tortoiseLeft -
            (tortoise.offsetWidth * tortoiseScale) / 2,
          width - tortoiseLeft - tortoise.offsetWidth * tortoiseScale - 16,
        ),
      );
    };

    const renderProgress = (progress: number) => {
      const rabbitBob = -Math.abs(Math.sin(progress * Math.PI * 12)) * 13;
      const tortoiseBob = -Math.abs(Math.sin(progress * Math.PI * 14)) * 4;
      rabbit.style.setProperty(
        "--academics-rabbit-x",
        `${rabbitTravel * progress}px`,
      );
      rabbit.style.setProperty("--academics-rabbit-y", `${rabbitBob}px`);
      tortoise.style.setProperty(
        "--academics-tortoise-x",
        `${tortoiseTravel * progress}px`,
      );
      tortoise.style.setProperty("--academics-tortoise-y", `${tortoiseBob}px`);

      clouds.forEach((cloud, index) => {
        const drift = (progress - 0.5) * (index % 2 === 0 ? 24 : 36);
        cloud.style.setProperty("--academics-cloud-drift", `${drift}px`);
      });
      vines.forEach((vine, index) => {
        const sway = Math.sin(progress * 3 + index * 1.7) * 5;
        vine.style.setProperty("--academics-vine-sway", `${sway}px`);
      });
      books?.style.setProperty(
        "--academics-prop-y",
        `${progress * 6}px`,
      );
    };

    const updateTarget = () => {
      if (reducedMotionRef.current) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      targetProgressRef.current = clamp(-rect.top / travel, 0, 1);
    };

    const animate = () => {
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.12;
      if (
        Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.001
      ) {
        currentProgressRef.current = targetProgressRef.current;
      }
      renderProgress(currentProgressRef.current);

      if (currentProgressRef.current !== targetProgressRef.current) {
        frameRef.current = window.requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
      }
    };

    const scheduleAnimation = () => {
      if (reducedMotionRef.current || frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(animate);
    };
    const handleScroll = () => {
      updateTarget();
      scheduleAnimation();
    };
    const handleResize = () => {
      measureTravel();
      updateTarget();
      scheduleAnimation();
    };
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      if (event.matches) {
        currentProgressRef.current = targetProgressRef.current;
        renderProgress(currentProgressRef.current);
      } else {
        updateTarget();
        scheduleAnimation();
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    measureTravel();
    updateTarget();
    currentProgressRef.current = targetProgressRef.current;
    renderProgress(currentProgressRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section id="academics" className="academics-section">
      <div className="academics-sticky">
        <div className="academics-background" />
        <div className="academics-vine academics-vine-left" />
        <div className="academics-vine academics-vine-right" />
        <div className="academics-cloud academics-cloud-one" />
        <div className="academics-cloud academics-cloud-two" />
        <div className="academics-cloud academics-cloud-three" />
        <div className="academics-plane academics-plane-one" />
        <div className="academics-plane academics-plane-two" />
        <div className="academics-flower academics-flower-one" />
        <div className="academics-flower academics-flower-two" />
        <div className="academics-flower academics-flower-three" />
        <div className="academics-flower academics-flower-four" />
        <div className="academics-rabbit" aria-hidden="true">
          <img
            className="academics-rabbit-image"
            src="/images/academics-rabbit.png"
            alt=""
            draggable="false"
          />
        </div>

        <h2 className="academics-heading">Academics &amp; Curriculum</h2>

        <div className="academics-cards" aria-label="Academic programs">
          {curriculumCards.map((item, index) => (
            <article key={item.title} className="academics-card" style={{ animationDelay: `${index * 120}ms` }}>
              <div className="academics-card-image" style={{ borderColor: item.accent }}>
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="academics-card-content">
                <div className="academics-card-accent" style={{ background: item.accent }} />
                <h3>{item.title}</h3>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <button type="button" className="academics-card-button">
                  Explore
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="academics-books" aria-hidden="true">
          <span className="academics-book book-one" />
          <span className="academics-book book-two" />
          <span className="academics-book book-three" />
          <span className="academics-book book-four" />
        </div>

        <div className="academics-pencil-bundle" aria-hidden="true">
          <span className="academics-pencil pencil-one" />
          <span className="academics-pencil pencil-two" />
          <span className="academics-pencil pencil-three" />
        </div>

        <div className="academics-tortoise" aria-hidden="true">
          <img
            className="academics-tortoise-image"
            src="/images/academics-tortoise.png"
            alt=""
            draggable="false"
          />
        </div>

        <div className="academics-grass" aria-hidden="true">
          <span className="academics-grass-blade blade-one" />
          <span className="academics-grass-blade blade-two" />
          <span className="academics-grass-blade blade-three" />
          <span className="academics-grass-blade blade-four" />
          <span className="academics-grass-blade blade-five" />
          <span className="academics-grass-blade blade-six" />
          <span className="academics-flower academics-ground-flower bloom-one" />
          <span className="academics-flower academics-ground-flower bloom-two" />
        </div>
      </div>

      <style jsx>{`
        .academics-section {
          position: relative;
          z-index: 20;
          min-height: 350vh;
          height: 350vh;
          overflow: clip;
          background: linear-gradient(180deg, #ebf9ff 0%, #d9f4e8 16%, #f7fbff 34%, #f0f8ff 100%);
        }

        .academics-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 13%, rgba(255,255,255,0.9), rgba(255,255,255,0) 22%),
            radial-gradient(circle at 76% 10%, rgba(255,255,255,0.8), rgba(255,255,255,0) 18%),
            linear-gradient(180deg, #bfefff 0%, #d8f5ec 46%, #f3f9fd 100%);
        }

        .academics-background {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0)),
            radial-gradient(circle at 20% 78%, rgba(102, 200, 126, 0.12), rgba(255,255,255,0) 25%),
            radial-gradient(circle at 74% 78%, rgba(119, 205, 122, 0.12), rgba(255,255,255,0) 30%);
        }

        .academics-vine {
          position: absolute;
          top: -10px;
          width: 180px;
          height: 190px;
          background: linear-gradient(180deg, rgba(79, 174, 107, 0.7), rgba(44, 135, 77, 0.8));
          border-radius: 100% 100% 0 100%;
          opacity: 0.8;
          filter: drop-shadow(0 8px 10px rgba(75, 148, 79, 0.12));
          z-index: 1;
        }

        .academics-vine::before,
        .academics-vine::after {
          content: "";
          position: absolute;
          left: 32px;
          width: 3px;
          background: rgba(87, 163, 97, 0.7);
          border-radius: 999px;
        }

        .academics-vine::before {
          top: 15px;
          height: 130px;
          transform: rotate(8deg);
        }

        .academics-vine::after {
          right: 26px;
          top: 30px;
          height: 110px;
          transform: rotate(-12deg);
        }

        .academics-vine-left {
          left: -30px;
          transform: translate3d(var(--academics-vine-sway, 0px), 0, 0)
            rotate(-8deg);
          transition: none;
        }

        .academics-vine-right {
          right: -32px;
          transform: translate3d(var(--academics-vine-sway, 0px), 0, 0)
            scaleX(-1) rotate(-6deg);
          transition: none;
        }

        .academics-cloud {
          position: absolute;
          height: 54px;
          background: rgba(255,255,255,0.7);
          border-radius: 999px;
          box-shadow: 0 18px 30px rgba(116, 179, 220, 0.08);
          z-index: 2;
          transform: translate3d(var(--academics-cloud-drift, 0px), 0, 0);
        }

        .academics-cloud::before,
        .academics-cloud::after {
          content: "";
          position: absolute;
          background: rgba(255,255,255,0.85);
          border-radius: 999px;
        }

        .academics-cloud::before {
          width: 32px;
          height: 32px;
          left: 18px;
          top: -14px;
        }

        .academics-cloud::after {
          width: 44px;
          height: 42px;
          right: 20px;
          top: -18px;
        }

        .academics-cloud-one {
          top: 10%;
          left: 10%;
          width: 180px;
        }

        .academics-cloud-two {
          top: 14%;
          right: 18%;
          width: 210px;
        }

        .academics-cloud-three {
          top: 20%;
          left: 38%;
          width: 150px;
        }

        .academics-plane {
          position: absolute;
          width: 86px;
          height: 26px;
          border: 2px solid rgba(104, 160, 211, 0.8);
          border-color: rgba(104,160,211,0.8) transparent transparent transparent;
          border-radius: 50%;
          z-index: 2;
        }

        .academics-plane-one {
          top: 24%;
          left: 22%;
          transform: rotate(-16deg);
        }

        .academics-plane-two {
          top: 18%;
          right: 27%;
          transform: rotate(14deg);
        }

        .academics-flower {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #f7d96b;
          box-shadow:
            -8px 0 0 rgba(255, 180, 200, 0.85),
            8px 0 0 rgba(255, 180, 200, 0.85),
            0 -8px 0 rgba(255, 180, 200, 0.85),
            0 8px 0 rgba(255, 180, 200, 0.85);
          z-index: 2;
        }

        .academics-flower-one { left: 14%; top: 72%; }
        .academics-flower-two { left: 26%; top: 76%; }
        .academics-flower-three { right: 18%; top: 73%; }
        .academics-flower-four { right: 30%; top: 80%; }

        .academics-heading {
          position: absolute;
          top: 12%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          margin: 0;
          font-size: clamp(2.5rem, 4vw, 5rem);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.06em;
          text-align: center;
          color: #18325a;
          text-shadow: 0 8px 18px rgba(70, 96, 143, 0.1);
        }

        .academics-rabbit {
          position: absolute;
          left: clamp(16px, 3vw, 44px);
          top: 18%;
          width: 148px;
          height: 160px;
          z-index: 8;
          pointer-events: none;
          --academics-scale: 1;
          transform: translate3d(
              var(--academics-rabbit-x, 0px),
              var(--academics-rabbit-y, 0px),
              0
            )
            scale(var(--academics-scale));
          will-change: transform;
        }

        .academics-rabbit-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 8px 8px rgba(35, 49, 40, 0.22));
          user-select: none;
        }

        .academics-cards {
          position: absolute;
          left: 50%;
          top: 32%;
          transform: translateX(-50%);
          width: min(1200px, 82vw);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          z-index: 6;
        }

        .academics-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 320px;
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(24,50,90,0.12);
          border-radius: 28px;
          box-shadow: 0 18px 36px rgba(80, 111, 148, 0.12);
          overflow: hidden;
          transform: translate3d(0, 0, 0) scale(1);
          transition: transform 380ms ease, box-shadow 380ms ease;
          will-change: transform;
        }

        .academics-card:hover {
          transform: translate3d(0, -4px, 0) scale(1.05);
          box-shadow: 0 22px 44px rgba(51, 86, 121, 0.16);
          z-index: 2;
        }

        .academics-card-image {
          position: relative;
          height: 180px;
          border-bottom: 5px solid rgba(255,255,255,0.1);
          overflow: hidden;
          background: #ebf4ff;
        }

        .academics-card-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease;
        }

        .academics-card:hover .academics-card-image img {
          transform: scale(1.08);
        }

        .academics-card-content {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          padding: 18px 18px 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.8), rgba(254,252,247,0.9));
        }

        .academics-card-accent {
          position: absolute;
          left: 18px;
          right: 18px;
          top: 0;
          height: 4px;
          border-radius: 999px;
        }

        .academics-card h3 {
          margin: 10px 0 0;
          font-size: clamp(1.15rem, 1.6vw, 1.5rem);
          line-height: 1.2;
          font-weight: 800;
          color: #18325a;
        }

        .academics-card ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 6px;
          color: #44526a;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .academics-card li {
          position: relative;
          padding-left: 14px;
        }

        .academics-card li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #2d8b66;
          font-weight: 800;
        }

        .academics-card-button {
          margin-top: auto;
          width: fit-content;
          border: none;
          border-radius: 999px;
          background: #1c3d69;
          color: white;
          padding: 0.7rem 1.1rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
          box-shadow: 0 10px 18px rgba(28,61,105,0.18);
        }

        .academics-card-button:hover,
        .academics-card-button:focus-visible {
          background: #163459;
          transform: translateY(-1px);
          box-shadow: 0 12px 18px rgba(28,61,105,0.24);
          outline: none;
        }

        .academics-books {
          position: absolute;
          right: 22%;
          bottom: 17%;
          width: 170px;
          height: 90px;
          z-index: 5;
          transform: translate3d(0, var(--academics-prop-y, 0px), 0);
        }

        .academics-book {
          position: absolute;
          bottom: 0;
          height: 70px;
          border-radius: 10px 10px 18px 18px;
          box-shadow: 0 12px 20px rgba(58, 88, 108, 0.15);
        }

        .book-one {
          left: 0;
          width: 58px;
          background: linear-gradient(180deg, #ffa868 0%, #f28a4d 100%);
        }

        .book-two {
          left: 34px;
          width: 60px;
          background: linear-gradient(180deg, #7cc7f8 0%, #4fa4e5 100%);
        }

        .book-three {
          left: 72px;
          width: 54px;
          background: linear-gradient(180deg, #8ae0a0 0%, #58b66f 100%);
        }

        .book-four {
          left: 108px;
          width: 38px;
          background: linear-gradient(180deg, #ffc970 0%, #f9b445 100%);
        }

        .academics-pencil-bundle {
          position: absolute;
          right: 14%;
          bottom: 17%;
          width: 120px;
          height: 40px;
          z-index: 6;
        }

        .academics-pencil {
          position: absolute;
          bottom: 0;
          width: 30px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, #f5e670 0%, #f8bf41 100%);
          transform: rotate(18deg);
        }

        .pencil-one { left: 0; }
        .pencil-two { left: 34px; transform: rotate(-10deg); }
        .pencil-three { left: 68px; transform: rotate(14deg); }

        .academics-pencils::before,
        .academics-pencil::after {
          content: "";
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #f4c95c;
          clip-path: polygon(0 50%, 100% 0, 100% 100%);
        }

        .academics-tortoise {
          position: absolute;
          left: 10%;
          bottom: 12%;
          width: 160px;
          height: 96px;
          z-index: 8;
          pointer-events: none;
          --academics-scale: 1;
          transform: translate3d(
              var(--academics-tortoise-x, 0px),
              var(--academics-tortoise-y, 0px),
              0
            )
            scale(var(--academics-scale));
          will-change: transform;
        }

        .academics-tortoise-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 7px 7px rgba(38, 45, 28, 0.24));
          user-select: none;
        }

        .academics-grass {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 22vh;
          background: linear-gradient(180deg, rgba(136, 213, 146, 0.2) 0%, rgba(73, 164, 94, 0.6) 12%, rgba(43, 115, 72, 0.8) 100%);
          z-index: 3;
          pointer-events: none;
        }

        .academics-grass-blade {
          position: absolute;
          bottom: 0;
          width: 6px;
          height: 30px;
          background: linear-gradient(180deg, #bff3a5 0%, #4fa35a 100%);
          border-radius: 999px;
          transform-origin: bottom center;
        }

        .blade-one { left: 12%; transform: rotate(-18deg); }
        .blade-two { left: 23%; height: 36px; transform: rotate(12deg); }
        .blade-three { left: 38%; height: 34px; transform: rotate(-8deg); }
        .blade-four { left: 62%; height: 38px; transform: rotate(10deg); }
        .blade-five { left: 78%; height: 32px; transform: rotate(-14deg); }
        .blade-six { left: 88%; height: 30px; transform: rotate(8deg); }

        .academics-ground-flower {
          bottom: 20px;
          width: 10px;
          height: 10px;
          background: #f7dca8;
          box-shadow:
            -8px 0 0 rgba(255, 162, 187, 0.82),
            8px 0 0 rgba(255, 162, 187, 0.82),
            0 -8px 0 rgba(255, 162, 187, 0.82),
            0 8px 0 rgba(255, 162, 187, 0.82);
        }

        .bloom-one { left: 57%; }
        .bloom-two { right: 24%; }

        @media (max-width: 1024px) {
          .academics-rabbit { top: 20%; }
          .academics-cards {
            width: min(900px, 88vw);
            height: 58%;
            gap: 16px;
            top: 34%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
          }
          .academics-card {
            min-height: 0;
          }
          .academics-card-image {
            height: 38%;
            min-height: 0;
          }
          .academics-card-content {
            gap: 7px;
            padding: 13px 14px 14px;
          }
          .academics-books { right: 20%; }
          .academics-heading { top: 14%; }
        }

        @media (max-width: 768px) {
          .academics-section {
            min-height: 430vh;
            height: 430vh;
          }

          .academics-sticky {
            height: 100vh;
          }

          .academics-heading {
            top: 14%;
            width: min(90vw, 520px);
            font-size: clamp(2.2rem, 10vw, 3.4rem);
          }

          .academics-rabbit {
            top: 19%;
            --academics-scale: 0.72;
          }

          .academics-cards {
            width: min(90vw, 580px);
            top: 31%;
            height: 53%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .academics-card {
            min-height: 0;
            border-radius: 18px;
          }

          .academics-card-image {
            height: 36%;
            min-height: 54px;
          }

          .academics-card-content {
            gap: 4px;
            padding: 9px 10px 10px;
          }

          .academics-card h3 {
            margin-top: 4px;
            font-size: clamp(0.82rem, 3vw, 1rem);
          }

          .academics-card ul {
            gap: 2px;
            font-size: clamp(0.58rem, 2vw, 0.72rem);
            line-height: 1.25;
          }

          .academics-card li {
            padding-left: 9px;
          }

          .academics-card-button {
            padding: 0.42rem 0.75rem;
            font-size: 0.68rem;
          }

          .academics-tortoise {
            left: 3%;
            bottom: 3%;
            --academics-scale: 0.66;
          }

          .academics-books {
            right: 14%;
            bottom: 9%;
            transform: translate3d(0, var(--academics-prop-y, 0px), 0) scale(0.72);
          }

          .academics-grass { height: 17vh; }
        }

        @media (max-height: 700px) and (min-width: 769px) {
          .academics-heading { top: 15%; }
          .academics-cards { top: 34%; }
          .academics-card { min-height: 250px; }
          .academics-card-image { height: 115px; }
          .academics-rabbit {
            top: 15%;
            --academics-scale: 0.72;
          }
          .academics-tortoise { bottom: 4%; }
          .academics-grass { height: 17vh; }
        }

        @media (prefers-reduced-motion: reduce) {
          .academics-section {
            min-height: 100vh;
            height: auto;
          }

          .academics-sticky {
            position: relative;
            height: auto;
            min-height: 100vh;
          }

          .academics-card,
          .academics-card-button,
          .academics-rabbit,
          .academics-tortoise,
          .academics-books,
          .academics-cloud,
          .academics-vine {
            transition: none !important;
          }

          .academics-card:hover { transform: none; }
          .academics-rabbit,
          .academics-tortoise { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
