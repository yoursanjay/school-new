"use client";

import { useEffect, useRef } from "react";

const facilities = [
  {
    name: "State-of-the-Art Science Lab",
    image: "/images/science-lab.jpg",
  },
  {
    name: "Multi-Purpose STEM Lab",
    image: "/images/innovation.jpg",
  },
  {
    name: "Robotics and Tech Hub",
    image: "/images/digital-classroom.jpg",
  },
  {
    name: "Performing Arts Auditorium",
    image: "/images/school/arts.jpg",
  },
  {
    name: "Fine Arts Studio",
    image: "/images/arts.jpg",
  },
  {
    name: "Early Childhood Playroom",
    image: "/images/early-years.jpg",
  },
  {
    name: "Advanced Computer Lab",
    image: "/images/school/classroom.jpg",
  },
  {
    name: "Spacious School Library",
    image: "/images/library.jpg",
  },
  {
    name: "Collaborative Study Spaces",
    image: "/images/primary.jpg",
  },
  {
    name: "Full-Size Gymnasium",
    image: "/images/school/sports.jpg",
  },
  {
    name: "Acoustics Music Room",
    image: "/images/student-life.jpg",
  },
  {
    name: "Culinary Arts Kitchen",
    image: "/images/school/students.jpg",
  },
  {
    name: "Interactive Media Lab",
    image: "/images/gallery-04.jpg",
  },
  {
    name: "Student Care Center",
    image: "/images/school/campus.jpg",
  },
];

const stars = [
  [9, 8, 2], [18, 15, 1], [27, 6, 2], [36, 18, 1], [45, 10, 2],
  [54, 6, 1], [62, 16, 2], [71, 8, 1], [80, 19, 2], [91, 10, 1],
  [13, 28, 1], [23, 34, 2], [34, 26, 1], [47, 31, 1], [58, 24, 2],
  [69, 34, 1], [83, 27, 1], [94, 37, 2], [6, 42, 1], [17, 46, 2],
  [31, 42, 1], [42, 48, 1], [56, 43, 2], [73, 47, 1], [87, 42, 2],
  [96, 54, 1], [8, 59, 2], [25, 55, 1], [38, 62, 2], [51, 57, 1],
  [65, 63, 1], [79, 58, 2], [90, 66, 1], [15, 72, 1], [33, 70, 2],
  [48, 74, 1], [62, 70, 2], [76, 74, 1], [88, 80, 2],
];

export default function FacilitiesSection() {
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = document.getElementById("facilities");
    if (!section) return;

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
    const render = (progress: number) => {
      const night = clamp((progress - 0.3) / 0.7);
      const mixColor = (
        day: [number, number, number],
        nightColor: [number, number, number],
      ) =>
        `rgb(${day
          .map((value, index) =>
            Math.round(value + (nightColor[index] - value) * night),
          )
          .join(", ")})`;
      const mixShadow = (
        day: [number, number, number],
        nightColor: [number, number, number],
        dayAlpha: number,
        nightAlpha: number,
      ) => {
        const color = mixColor(day, nightColor).slice(4, -1);
        return `rgba(${color}, ${(dayAlpha + (nightAlpha - dayAlpha) * night).toFixed(2)})`;
      };
      section.style.setProperty("--facility-progress", progress.toFixed(4));
      section.style.setProperty(
        "--facility-sunset",
        clamp(1 - Math.abs(progress - 0.52) / 0.52).toFixed(4),
      );
      section.style.setProperty("--facility-night", night.toFixed(4));
      section.style.setProperty(
        "--facility-text-color",
        mixColor([24, 36, 57], [248, 250, 255]),
      );
      section.style.setProperty(
        "--facility-heading-shadow",
        mixShadow([255, 236, 193], [7, 20, 45], 0.62, 0.84),
      );
      section.style.setProperty(
        "--facility-card-shadow",
        mixShadow([255, 255, 255], [7, 20, 45], 0.8, 0.84),
      );
      section.style.setProperty(
        "--facility-stars",
        clamp((progress - 0.38) / 0.62).toFixed(4),
      );
    };
    const updateTarget = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1,
      );
      targetRef.current = clamp(-rect.top / scrollDistance);
    };
    const animate = () => {
      progressRef.current += (targetRef.current - progressRef.current) * 0.1;
      if (Math.abs(targetRef.current - progressRef.current) < 0.001) {
        progressRef.current = targetRef.current;
      }
      render(progressRef.current);
      if (progressRef.current !== targetRef.current) {
        frameRef.current = window.requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
      }
    };
    const scheduleAnimation = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };
    const onScroll = () => {
      updateTarget();
      scheduleAnimation();
    };

    updateTarget();
    progressRef.current = targetRef.current;
    render(progressRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section id="facilities" className="facilities-section">
      <div className="facilities-sticky">
        <div className="facilities-sky" />
        <div className="facilities-sunset-wash" />
        <div className="facilities-night-sky" />
        <div className="facilities-sun" aria-hidden="true" />
        <div className="facilities-moon" aria-hidden="true" />
        <div className="facilities-stars" aria-hidden="true">
          {stars.map(([left, top, size], index) => (
            <span
              key={`${left}-${top}`}
              className="facilities-star"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                transitionDelay: `${(index % 6) * 35}ms`,
              }}
            />
          ))}
        </div>
        <div className="facilities-cloud facilities-cloud-one" />
        <div className="facilities-cloud facilities-cloud-two" />
        <div className="facilities-cloud facilities-cloud-three" />
        <div className="facilities-cloud facilities-cloud-four" />

        <div className="facilities-vine facilities-vine-left" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} className={`facility-leaf leaf-${index + 1}`} />
          ))}
        </div>
        <div className="facilities-vine facilities-vine-right" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} className={`facility-leaf leaf-${index + 1}`} />
          ))}
        </div>
        <span className="facility-flower flower-top-left" aria-hidden="true" />
        <span className="facility-flower flower-top-right" aria-hidden="true" />
        <span className="facility-flower flower-side-left" aria-hidden="true" />
        <span className="facility-flower flower-side-right" aria-hidden="true" />

        <svg className="facility-flight flight-left" viewBox="0 0 210 90" aria-hidden="true">
          <path d="M12 72C46 18 87 20 112 43s49 30 82-11" />
          <path className="paper-plane" d="m20 11 53 9-28 17-8 29-6-25-17-14 22 5z" />
        </svg>
        <svg className="facility-flight flight-right" viewBox="0 0 210 90" aria-hidden="true">
          <path d="M8 23c38 47 81 51 111 22s55-29 82 4" />
          <path className="paper-plane" d="m126 6 57 13-33 17-10 30-6-24-19-14 24 5z" />
        </svg>

        <h2 className="facilities-heading">OUR FACILITIES &amp; LEARNING SPACES</h2>

        <div className="facilities-grid" aria-label="School facilities">
          {facilities.map((facility) => (
            <article className="facility-card" key={facility.name}>
              <div className="facility-card-image">
                <img src={facility.image} alt={facility.name} loading="lazy" />
              </div>
              <h3>{facility.name}</h3>
            </article>
          ))}
        </div>

        <div className="facilities-books" aria-hidden="true">
          <span className="facility-book book-red" />
          <span className="facility-book book-blue" />
          <span className="facility-book book-green" />
          <span className="facility-book book-gold" />
          <span className="facility-book-ribbon" />
        </div>
        <div className="facilities-pencils" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="facilities-bus" aria-hidden="true">
          <div className="facility-bus-roof">
            <span>SCHOOL BUS</span>
          </div>
          <div className="facility-bus-windows">
            <i /><i /><i /><i />
          </div>
          <div className="facility-bus-front">
            <i />
            <b />
          </div>
          <div className="facility-bus-bumper" />
          <div className="facility-bus-wheel wheel-left" />
          <div className="facility-bus-wheel wheel-right" />
        </div>
        <div className="facilities-ground" aria-hidden="true">
          {Array.from({ length: 13 }, (_, index) => (
            <i key={index} className={`facility-grass-blade grass-${index + 1}`} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .facilities-section {
          position: relative;
          z-index: 20;
          height: 350vh;
          min-height: 350vh;
          overflow: clip;
          isolation: isolate;
          color: #1e242b;
          --facility-progress: 0;
          --facility-sunset: 0;
          --facility-night: 0;
          --facility-stars: 0;
        }

        .facilities-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          isolation: isolate;
          background: #7fc7ef;
        }

        .facilities-sky,
        .facilities-sunset-wash,
        .facilities-night-sky {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .facilities-sky {
          z-index: -5;
          background:
            radial-gradient(ellipse at 13% 36%, rgba(255, 239, 178, 0.96), transparent 23%),
            radial-gradient(ellipse at 80% 19%, rgba(255,255,255,0.54), transparent 26%),
            linear-gradient(180deg, #4d9bd0 0%, #8fc8e6 42%, #c5e8e5 76%, #d9e7bd 100%);
        }

        .facilities-sunset-wash {
          z-index: -4;
          opacity: var(--facility-sunset);
          background:
            radial-gradient(ellipse at 14% 39%, rgba(255, 174, 76, 0.78), transparent 34%),
            linear-gradient(180deg, rgba(255, 154, 98, 0.08), rgba(244, 150, 90, 0.38) 56%, rgba(255, 209, 111, 0.2));
          transition: opacity 120ms linear;
        }

        .facilities-night-sky {
          z-index: -3;
          opacity: var(--facility-night);
          background:
            radial-gradient(ellipse at 50% 3%, rgba(45, 104, 159, 0.58), transparent 40%),
            linear-gradient(180deg, #081b44 0%, #122b5c 43%, #245b8b 76%, #7196a0 100%);
          transition: opacity 120ms linear;
        }

        .facilities-sun,
        .facilities-moon {
          position: absolute;
          z-index: -1;
          width: clamp(72px, 10vw, 132px);
          aspect-ratio: 1;
          border-radius: 50%;
          pointer-events: none;
        }

        .facilities-sun {
          left: 8%;
          top: 17%;
          opacity: calc(1 - var(--facility-progress) * 1.75);
          transform: translate3d(
            calc(var(--facility-progress) * 38vw),
            calc(var(--facility-progress) * 20vh),
            0
          );
          background: radial-gradient(circle, #fffef0 0%, #ffe992 35%, rgba(255, 194, 83, 0.2) 69%, transparent 72%);
          box-shadow: 0 0 46px 24px rgba(255, 223, 123, 0.35);
        }

        .facilities-moon {
          left: 50%;
          top: 7%;
          opacity: var(--facility-night);
          transform: translate3d(-50%, calc(var(--facility-progress) * 0px), 0);
          background:
            radial-gradient(circle at 33% 31%, rgba(144, 171, 201, 0.54) 0 5%, transparent 6%),
            radial-gradient(circle at 69% 64%, rgba(144, 171, 201, 0.38) 0 8%, transparent 9%),
            radial-gradient(circle at 52% 74%, rgba(144, 171, 201, 0.28) 0 5%, transparent 6%),
            radial-gradient(circle at 39% 58%, #edf5ff 0%, #cbdcf0 58%, #9ab7d6 100%);
          box-shadow: 0 0 46px 20px rgba(194, 221, 255, 0.19);
        }

        .facilities-stars {
          position: absolute;
          inset: 0 0 18%;
          z-index: -2;
          opacity: var(--facility-stars);
          pointer-events: none;
        }

        .facilities-star {
          position: absolute;
          border-radius: 50%;
          background: #f4f7ff;
          box-shadow: 0 0 7px 2px rgba(219, 235, 255, 0.64);
        }

        .facilities-cloud {
          position: absolute;
          z-index: -2;
          height: clamp(34px, 6vw, 70px);
          border-radius: 999px;
          background: rgba(255, 255, 255, calc(0.62 - var(--facility-night) * 0.3));
          filter: drop-shadow(0 8px 15px rgba(67, 116, 151, 0.12));
          opacity: calc(1 - var(--facility-night) * 0.35);
          transition: background 120ms linear, opacity 120ms linear;
        }

        .facilities-cloud::before,
        .facilities-cloud::after {
          content: "";
          position: absolute;
          bottom: 22%;
          border-radius: 50%;
          background: inherit;
        }

        .facilities-cloud::before { left: 18%; width: 35%; aspect-ratio: 1; }
        .facilities-cloud::after { right: 16%; width: 48%; aspect-ratio: 1; }
        .facilities-cloud-one { left: 26%; top: 10%; width: 28%; }
        .facilities-cloud-two { right: 8%; top: 17%; width: 26%; }
        .facilities-cloud-three { left: 4%; top: 30%; width: 22%; }
        .facilities-cloud-four { right: 32%; top: 30%; width: 21%; }

        .facilities-vine {
          position: absolute;
          z-index: 4;
          top: -9%;
          width: clamp(112px, 15vw, 210px);
          height: 40%;
          pointer-events: none;
          border-left: 4px solid rgba(64, 111, 49, 0.62);
          border-radius: 0 0 50% 50%;
        }

        .facilities-vine-left { left: 1.5%; transform: rotate(4deg); }
        .facilities-vine-right { right: 1.5%; transform: scaleX(-1) rotate(4deg); }

        .facility-leaf {
          position: absolute;
          width: clamp(18px, 2.8vw, 38px);
          height: clamp(28px, 4vw, 54px);
          border-radius: 100% 0 100% 0;
          background: linear-gradient(140deg, #91a84d, #416a35 75%);
          box-shadow: inset 3px 1px 0 rgba(213, 218, 135, 0.42);
          transform: rotate(42deg);
        }

        .leaf-1 { left: -14px; top: 22%; }
        .leaf-2 { left: 28px; top: 10%; transform: rotate(128deg); }
        .leaf-3 { left: -24px; top: 42%; }
        .leaf-4 { left: 38px; top: 31%; transform: rotate(128deg); }
        .leaf-5 { left: -18px; top: 62%; }
        .leaf-6 { left: 32px; top: 53%; transform: rotate(128deg); }
        .leaf-7 { left: -25px; top: 78%; }
        .leaf-8 { left: 40px; top: 73%; transform: rotate(128deg); }
        .leaf-9 { left: 2px; top: 92%; }

        .facility-flower {
          position: absolute;
          z-index: 5;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #ffc748;
          box-shadow: -7px 0 #ffda70, 7px 0 #ffda70, 0 -7px #ffda70, 0 7px #ffda70;
          pointer-events: none;
        }

        .flower-top-left { left: 18%; top: 5%; }
        .flower-top-right { right: 19%; top: 6%; }
        .flower-side-left { left: 2%; top: 69%; }
        .flower-side-right { right: 3%; top: 59%; }

        .facility-flight {
          position: absolute;
          z-index: 3;
          width: clamp(110px, 18vw, 220px);
          height: auto;
          overflow: visible;
          pointer-events: none;
        }

        .facility-flight path:first-child {
          fill: none;
          stroke: rgba(32, 66, 102, 0.65);
          stroke-width: 1.5;
          stroke-dasharray: 3 5;
          opacity: 0.8;
        }

        .facility-flight .paper-plane {
          fill: #f8fbff;
          stroke: #62788c;
          stroke-width: 1.2;
          filter: drop-shadow(0 2px 2px rgba(39, 67, 88, 0.2));
        }

        .flight-left { top: 20%; left: 9%; }
        .flight-right { top: 17%; right: 14%; transform: scaleX(-1); }

        .facilities-heading {
          position: absolute;
          z-index: 6;
          top: 18%;
          left: 50%;
          width: max-content;
          max-width: 86%;
          margin: 0;
          transform: translateX(-50%);
          color: var(--facility-text-color, #172337);
          font-size: clamp(1.2rem, 2.2vw, 2.15rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: 0.02em;
          text-align: center;
          text-shadow: 0 2px 10px var(--facility-heading-shadow, rgba(255, 236, 193, 0.62));
          transition: color 120ms linear, text-shadow 120ms linear;
        }

        .facilities-grid {
          position: absolute;
          z-index: 6;
          top: 27%;
          left: 50%;
          width: min(80vw, 1450px);
          height: 52%;
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          column-gap: clamp(7px, 1.1vw, 18px);
          row-gap: clamp(6px, 1vw, 14px);
          align-items: stretch;
        }

        .facility-card {
          position: relative;
          z-index: 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border-radius: 14px;
          text-align: center;
          transform: scale(1);
          transform-origin: center;
          transition: transform 380ms ease, z-index 0ms, filter 380ms ease;
        }

        .facility-card:hover {
          z-index: 12;
          transform: scale(1.08);
        }

        .facility-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 1.12 / 1;
          flex: 0 0 auto;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.88);
          border-radius: 13px;
          background: #e7edf0;
          box-shadow: 0 4px 12px rgba(39, 57, 75, 0.24);
          transition: border-color 300ms ease, box-shadow 380ms ease;
        }

        .facility-card-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(11, 30, 63, 0.22);
          opacity: var(--facility-night);
          pointer-events: none;
          transition: opacity 140ms linear;
        }

        .facility-card:hover .facility-card-image {
          border-color: #fff6d6;
          box-shadow: 0 9px 22px rgba(30, 47, 67, 0.34);
        }

        .facility-card-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 400ms ease, filter 400ms ease;
        }

        .facility-card:hover .facility-card-image img {
          transform: scale(1.06);
        }

        .facility-card h3 {
          margin: 5px 0 0;
          color: var(--facility-text-color, #182439);
          font-size: clamp(0.58rem, 0.93vw, 0.88rem);
          font-weight: 600;
          line-height: 1.15;
          text-wrap: balance;
          text-shadow: 0 1px 2px var(--facility-card-shadow, rgba(255,255,255,0.8));
          transition: color 300ms ease, text-shadow 300ms ease;
        }

        .facilities-books {
          position: absolute;
          z-index: 5;
          right: 18%;
          bottom: 1.4%;
          width: clamp(65px, 8vw, 104px);
          height: clamp(48px, 6.5vw, 80px);
          filter: drop-shadow(0 5px 5px rgba(37, 46, 35, 0.32));
        }

        .facility-book {
          position: absolute;
          bottom: 0;
          width: 84%;
          height: 24%;
          border: 2px solid rgba(64, 55, 45, 0.45);
          border-radius: 5px 7px 5px 5px;
          box-shadow: inset 0 4px rgba(255, 255, 255, 0.2);
        }

        .book-red { left: 6%; bottom: 4%; background: #c46743; transform: rotate(-6deg); }
        .book-blue { left: 9%; bottom: 29%; background: #5685a6; transform: rotate(4deg); }
        .book-green { left: 3%; bottom: 53%; background: #6c9450; transform: rotate(-4deg); }
        .book-gold { left: 8%; bottom: 76%; width: 70%; background: #d7ad58; transform: rotate(3deg); }
        .facility-book-ribbon {
          position: absolute;
          left: 43%;
          top: 4%;
          width: 11%;
          height: 94%;
          background: linear-gradient(90deg, #f4d37c, #fff0b2, #c99c44);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 83%, 0 100%);
        }

        .facilities-pencils {
          position: absolute;
          z-index: 5;
          right: 11.5%;
          bottom: 1.5%;
          width: 33px;
          height: clamp(44px, 5.5vw, 68px);
          border-radius: 6px 6px 3px 3px;
          background: linear-gradient(90deg, #587aa4, #8aa9bf, #46637f);
          filter: drop-shadow(0 4px 4px rgba(37,46,35,.28));
        }

        .facilities-pencils span {
          position: absolute;
          bottom: 48%;
          width: 5px;
          height: 77%;
          border-radius: 4px 4px 0 0;
          transform-origin: bottom;
        }

        .facilities-pencils span::before {
          content: "";
          position: absolute;
          top: -5px;
          left: 0;
          border-left: 2.5px solid transparent;
          border-right: 2.5px solid transparent;
          border-bottom: 5px solid #d8c8a1;
        }

        .facilities-pencils span:nth-child(1) { left: 7px; background: #e8c34e; transform: rotate(-14deg); }
        .facilities-pencils span:nth-child(2) { left: 15px; height: 92%; background: #e27c51; }
        .facilities-pencils span:nth-child(3) { left: 23px; background: #6da579; transform: rotate(12deg); }

        .facilities-bus {
          position: absolute;
          z-index: 5;
          right: 2%;
          bottom: 2.2%;
          width: clamp(116px, 17vw, 220px);
          height: clamp(62px, 8.4vw, 108px);
          border: 2px solid #9e682a;
          border-radius: 15% 13% 10% 13%;
          background: linear-gradient(180deg, #ffd754 0 18%, #efaa3d 19% 100%);
          box-shadow: 0 8px 14px rgba(43, 47, 36, 0.32), inset 0 -7px 0 rgba(166, 99, 35, 0.22);
          filter: drop-shadow(0 0 0.01px rgba(255, 226, 124, calc(var(--facility-night) * 0.6)));
        }

        .facility-bus-roof {
          position: absolute;
          top: -10%;
          left: 22%;
          width: 65%;
          height: 18%;
          border: 2px solid #9e682a;
          border-bottom: 0;
          border-radius: 12px 12px 0 0;
          background: #f9c449;
        }

        .facility-bus-roof span {
          display: block;
          color: #55391d;
          font-size: clamp(4px, 0.6vw, 7px);
          font-weight: 900;
          text-align: center;
          letter-spacing: 0.04em;
        }

        .facility-bus-windows {
          position: absolute;
          top: 16%;
          left: 6%;
          width: 72%;
          height: 40%;
          display: flex;
          gap: 3%;
        }

        .facility-bus-windows i {
          flex: 1;
          border: 1px solid rgba(119, 87, 50, 0.7);
          border-radius: 4px;
          background: linear-gradient(145deg, #c4e7e7, #719eb4);
          box-shadow: inset 0 0 5px rgba(255,255,255,.6);
        }

        .facility-bus-front {
          position: absolute;
          right: -1%;
          top: 25%;
          width: 18%;
          height: 45%;
          border: 2px solid #9e682a;
          border-radius: 0 9px 5px 0;
          background: linear-gradient(135deg, #f6bf50, #d88933);
        }

        .facility-bus-front i {
          position: absolute;
          top: 10%;
          left: 14%;
          width: 75%;
          height: 56%;
          border-radius: 3px;
          background: linear-gradient(145deg, #a5d0d7, #557b91);
        }

        .facility-bus-front b {
          position: absolute;
          right: -3px;
          bottom: 3%;
          width: 5px;
          height: 18%;
          border-radius: 5px;
          background: #fff0b3;
        }

        .facility-bus-bumper {
          position: absolute;
          right: -3%;
          bottom: 4%;
          width: 20%;
          height: 8%;
          border-radius: 4px;
          background: #73797a;
        }

        .facility-bus-wheel {
          position: absolute;
          bottom: -10%;
          width: 18%;
          aspect-ratio: 1;
          border: 4px solid #3b4348;
          border-radius: 50%;
          background: #abb1ae;
          box-shadow: inset 0 0 0 3px #535b60;
        }

        .wheel-left { left: 18%; }
        .wheel-right { right: 15%; }

        .facilities-ground {
          position: absolute;
          z-index: 1;
          left: 0;
          right: 0;
          bottom: 0;
          height: 14%;
          background:
            radial-gradient(ellipse at 50% 0, rgba(210, 205, 104, 0.3), transparent 52%),
            linear-gradient(180deg, #8baa42, #677f35 70%, #506c36);
          box-shadow: 0 -12px 34px rgba(255, 227, 131, calc(0.24 - var(--facility-night) * 0.18));
          transition: background 160ms linear, box-shadow 160ms linear;
        }

        .facilities-ground::before {
          content: "";
          position: absolute;
          inset: -14px 0 auto;
          height: 24px;
          background: #91ad45;
          clip-path: polygon(0 65%, 4% 24%, 8% 66%, 14% 28%, 20% 62%, 26% 20%, 32% 61%, 38% 25%, 44% 64%, 50% 18%, 56% 63%, 62% 23%, 68% 65%, 74% 18%, 80% 61%, 86% 25%, 92% 63%, 97% 22%, 100% 62%, 100% 100%, 0 100%);
        }

        .facility-grass-blade {
          position: absolute;
          top: -14px;
          width: 4px;
          height: 15px;
          border-radius: 100% 0;
          background: #a3bc53;
        }

        .grass-1 { left: 8%; transform: rotate(-28deg); }
        .grass-2 { left: 22%; transform: rotate(28deg); }
        .grass-3 { left: 35%; transform: rotate(-28deg); }
        .grass-4 { left: 48%; transform: rotate(28deg); }
        .grass-5 { left: 61%; transform: rotate(-28deg); }
        .grass-6 { left: 73%; transform: rotate(28deg); }
        .grass-7 { left: 88%; transform: rotate(-28deg); }
        .grass-8 { left: 15%; height: 10px; transform: rotate(35deg); }
        .grass-9 { left: 30%; height: 10px; transform: rotate(-30deg); }
        .grass-10 { left: 55%; height: 10px; transform: rotate(32deg); }
        .grass-11 { left: 68%; height: 10px; transform: rotate(-28deg); }
        .grass-12 { left: 82%; height: 10px; transform: rotate(30deg); }
        .grass-13 { left: 95%; height: 10px; transform: rotate(-25deg); }

        @media (min-width: 1500px) {
          .facilities-grid { width: min(82vw, 1600px); }
        }

        @media (max-width: 1100px) {
          .facilities-grid {
            width: 86vw;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-template-rows: repeat(4, minmax(0, 1fr));
            top: 25%;
            height: 59%;
          }
          .facilities-heading { top: 16%; }
          .facility-card h3 { font-size: clamp(0.68rem, 1.4vw, 0.9rem); }
        }

        @media (max-width: 650px) {
          .facilities-section {
            height: 360vh;
            min-height: 360vh;
          }
          .facilities-sticky { min-height: 0; }
          .facilities-vine { width: 92px; height: 32%; }
          .facilities-heading {
            top: 11%;
            max-width: 82%;
            font-size: clamp(1rem, 5vw, 1.55rem);
          }
          .facilities-grid {
            top: 20%;
            width: 86%;
            height: 67%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(7, minmax(0, 1fr));
            column-gap: 12px;
            row-gap: 5px;
          }
          .facility-card {
            display: grid;
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr);
            align-items: center;
            gap: 5px;
            border-radius: 9px;
          }
          .facility-card-image {
            aspect-ratio: 1.1 / 1;
            border-radius: 8px;
          }
          .facility-card h3 {
            margin: 0;
            font-size: clamp(0.56rem, 2.45vw, 0.75rem);
            line-height: 1.1;
          }
          .facilities-ground { height: 10%; }
          .facilities-books { right: 24%; bottom: 1%; }
          .facilities-pencils { right: 18%; bottom: 1%; }
          .facilities-bus {
            right: 1%;
            bottom: 2%;
            width: clamp(78px, 22vw, 118px);
            height: clamp(44px, 12vw, 64px);
          }
          .facility-bus-wheel { border-width: 3px; }
          .facilities-cloud-one { left: 26%; top: 7%; width: 38%; }
          .facilities-cloud-two { right: 7%; top: 16%; width: 33%; }
          .facilities-cloud-three { left: 2%; top: 34%; width: 25%; }
          .facilities-cloud-four { right: 24%; top: 38%; width: 25%; }
          .flight-left { top: 14%; left: 3%; }
          .flight-right { top: 15%; right: 3%; }
          .facilities-sun { left: 5%; top: 12%; width: 72px; }
          .facilities-moon { top: 5%; width: 68px; }
          .facility-flower-side-left { top: 75%; }
          .facility-flower-side-right { top: 73%; }
        }

        @media (max-width: 380px) {
          .facilities-grid { width: 90%; column-gap: 7px; }
          .facility-card { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr); }
          .facility-card h3 { font-size: 0.54rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .facility-card,
          .facility-card-image,
          .facility-card-image img,
          .facility-card h3,
          .facilities-cloud,
          .facilities-sunset-wash,
          .facilities-night-sky {
            transition-duration: 0.01ms;
          }
          .facility-card:hover { transform: scale(1.03); }
        }
      `}</style>
    </section>
  );
}
