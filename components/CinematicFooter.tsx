"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/garden#about" },
  { label: "Academics", href: "/garden#academics" },
  { label: "Facilities", href: "/garden#facilities" },
  { label: "Student Life", href: "/garden#student-life" },
  { label: "Gallery", href: "/garden#gallery" },
  { label: "Garden", href: "/garden" },
  { label: "Admissions", href: "/garden#admissions" },
  { label: "Contact", href: "/garden#contact" },
];

const academicLinks = [
  { label: "Primary School", href: "/garden#about" },
  { label: "Middle & High School", href: "/garden#about" },
  { label: "Academic Programs", href: "/garden#academics" },
  { label: "Co-Curricular Activities", href: "/garden#student-life" },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function CinematicFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const targetRevealRef = useRef(0);
  const currentRevealRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isIntersectingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = motionQuery.matches;

    const updateTarget = () => {
      if (!isIntersectingRef.current || prefersReducedMotionRef.current) return;

      const rect = footer.getBoundingClientRect();
      targetRevealRef.current = clamp(
        (window.innerHeight - rect.top) / (window.innerHeight * 0.78),
        0,
        1,
      );
    };

    const animateReveal = () => {
      animationFrameRef.current = null;
      if (!isIntersectingRef.current || prefersReducedMotionRef.current) return;

      currentRevealRef.current +=
        (targetRevealRef.current - currentRevealRef.current) * 0.12;
      if (Math.abs(targetRevealRef.current - currentRevealRef.current) < 0.001) {
        currentRevealRef.current = targetRevealRef.current;
      }

      footer.style.setProperty(
        "--footer-reveal",
        currentRevealRef.current.toFixed(4),
      );

      if (currentRevealRef.current !== targetRevealRef.current) {
        animationFrameRef.current = window.requestAnimationFrame(animateReveal);
      }
    };

    const scheduleReveal = () => {
      if (
        isIntersectingRef.current &&
        !prefersReducedMotionRef.current &&
        animationFrameRef.current === null
      ) {
        animationFrameRef.current = window.requestAnimationFrame(animateReveal);
      }
    };

    const handleScroll = () => {
      updateTarget();
      scheduleReveal();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
      footer.dataset.reducedMotion = String(event.matches);
      if (event.matches) {
        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        footer.style.setProperty("--footer-reveal", "1");
      } else {
        handleScroll();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        footer.classList.toggle("footer-is-visible", entry.isIntersecting);

        if (entry.isIntersecting) {
          updateTarget();
          scheduleReveal();
        } else if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      },
      { threshold: 0 },
    );

    footer.dataset.reducedMotion = String(motionQuery.matches);
    if (motionQuery.matches) {
      currentRevealRef.current = 1;
      targetRevealRef.current = 1;
      footer.style.setProperty("--footer-reveal", "1");
    }

    observer.observe(footer);
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

  return (
    <footer id="contact" ref={footerRef} className="cinematic-footer" aria-label="School footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link className="footer-school-mark" href="/" aria-label="Back to home">
            <span className="footer-logo">
              <Image
                src="/images/logo.png"
                alt=""
                width={54}
                height={54}
                sizes="54px"
              />
            </span>
            <span className="footer-school-name">
              <strong>Sri Aurobindo Mira</strong>
              <span>Universal School • CBSE</span>
            </span>
          </Link>
          <p className="footer-tagline">Learning today. Growing tomorrow.</p>
        </div>

        <nav className="footer-link-group" aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-link-group footer-academics" aria-label="Academics">
          <h2>Academics</h2>
          <ul>
            {academicLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="footer-contact">
          <h2>Contact Us</h2>
          <a href="https://maps.google.com/?q=Sri+Aurobindo+Mira+Universal+School+Madurai">
            <MapPin aria-hidden="true" />
            <span>
              Keelamathur, Melakkal Main Road,
              <br />
              Madurai – 625016, Tamil Nadu
            </span>
          </a>
          <a href="tel:+919047077677">
            <Phone aria-hidden="true" />
            <span>+91 90470 77677</span>
          </a>
          <a href="mailto:info@school.edu">
            <Mail aria-hidden="true" />
            <span>info@school.edu</span>
          </a>
        </address>
      </div>

      <div className="footer-landscape" aria-hidden="true">
        <svg
          className="footer-mountains footer-mountains-back"
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
        >
          <path d="M0 198C118 183 164 136 244 144c94 10 117 62 203 58 107-5 136-74 229-70 105 4 154 67 251 54 88-12 126-47 204-43 91 4 160 49 238 28 79-21 139-49 231-30v359H0Z" />
        </svg>
        <svg
          className="footer-mountains footer-mountains-middle"
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
        >
          <path d="M0 220c143-35 215-73 339-57 104 14 175 61 286 54 139-9 195-78 330-65 123 12 188 67 288 55 95-11 141-47 220-41 48 4 91 20 137 19v315H0Z" />
        </svg>
        <svg
          className="footer-mountains footer-mountains-front"
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
        >
          <path d="M0 239c126-24 219-8 326 15 115 25 202 25 316-4 127-32 232-43 353-16 122 28 205 44 307 15 94-27 172-39 298-22v273H0Z" />
        </svg>
        <svg
          className="footer-skyline"
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
        >
          <g className="footer-skyline-buildings">
            <path d="M0 325h90v-74h28v74h45v-116h32v116h34v-65h48v65h47v-94h26v94h79v-58h38v58h72v-90h25v90h82v-50h27v50h53v-116h37v116h55v-66h26v66h68v-99h34v99h59v-54h29v54h65v-112h29v112h81v-67h37v67h51v-90h32v90h68v-130h35v130h46v-69h37v69h63v175H0Z" />
            <path d="M104 273h10v20h-10zm72-43h11v16h-11zm146 55h12v16h-12zm167 32h11v18h-11zm189-87h12v17h-12zm194 34h12v18h-12zm200-57h11v18h-11zm181 59h12v17h-12zm158-51h12v18h-12z" />
          </g>
          <g className="footer-tree-row">
            <path d="M0 342h1600" />
            <g>
              <path d="M137 340v-30m-13 9 13-16 13 16m-13-4-10 12m10-8 10 9" />
              <circle cx="137" cy="300" r="19" />
              <path d="M374 340v-27m-12 9 12-17 12 17m-12-5-10 11m10-9 10 10" />
              <circle cx="374" cy="302" r="16" />
              <path d="M670 340v-34m-15 10 15-21 15 21m-15-5-12 13m12-9 12 12" />
              <circle cx="670" cy="296" r="22" />
              <path d="M1020 340v-29m-13 9 13-18 13 18m-13-5-10 12m10-8 10 10" />
              <circle cx="1020" cy="300" r="18" />
              <path d="M1317 340v-36m-16 11 16-22 16 22m-16-6-12 14m12-10 12 13" />
              <circle cx="1317" cy="295" r="22" />
              <path d="M1500 340v-28m-12 8 12-17 12 17m-12-5-10 11m10-8 10 10" />
              <circle cx="1500" cy="302" r="17" />
            </g>
          </g>
          <g className="footer-ferris-wheel" transform="translate(1180 250)">
            <circle r="54" />
            <circle r="7" />
            <path d="M0-54v108M-54 0h108M-38-38l76 76M38-38l-76 76M-17 51l-15 38m32-38 15 38m-41 0h52" />
            <g className="footer-wheel-cars">
              <circle cy="-54" r="5" />
              <circle cx="38" cy="-38" r="5" />
              <circle cx="54" r="5" />
              <circle cx="38" cy="38" r="5" />
              <circle cy="54" r="5" />
              <circle cx="-38" cy="38" r="5" />
              <circle cx="-54" r="5" />
              <circle cx="-38" cy="-38" r="5" />
            </g>
          </g>
        </svg>

        <svg className="footer-balloon" viewBox="0 0 80 120">
          <path d="M40 4C18 4 5 22 8 44c2 19 16 34 32 44 16-10 30-25 32-44C75 22 62 4 40 4Z" />
          <path d="M40 6v79M25 10c-8 18-7 40 4 63m22-63c8 18 7 40-4 63" />
          <path d="m34 88 6 10 6-10m-10 11h8l-2 11h-5Z" />
          <path className="footer-balloon-basket" d="M34 110h12v7H34z" />
        </svg>

        <svg className="footer-shoe footer-shoe-left" viewBox="0 0 180 90">
          <path d="M17 53c14-3 25-12 33-29l13 4c5 12 16 22 34 29l38 8c12 3 19 11 17 19H20C8 84 3 76 8 67c2-6 5-11 9-14Z" />
          <path d="m53 35 18 8m-24 0 20 8m-30-6 17 9m61 18h42" />
          <path className="footer-shoe-sole" d="M15 77h133" />
        </svg>
        <svg className="footer-shoe footer-shoe-right" viewBox="0 0 180 90">
          <path d="M17 53c14-3 25-12 33-29l13 4c5 12 16 22 34 29l38 8c12 3 19 11 17 19H20C8 84 3 76 8 67c2-6 5-11 9-14Z" />
          <path d="m53 35 18 8m-24 0 20 8m-30-6 17 9m61 18h42" />
          <path className="footer-shoe-sole" d="M15 77h133" />
        </svg>

        <span className="footer-sparkle footer-sparkle-one">✦</span>
        <span className="footer-sparkle footer-sparkle-two">✧</span>
        <span className="footer-sparkle footer-sparkle-three">✦</span>

        <div className="footer-traveler-lane">
          <svg className="footer-traveler" viewBox="0 0 50 76">
            <g className="footer-traveler-body">
              <circle cx="25" cy="12" r="7" />
              <path d="M19 22c4-3 10-3 13 1l5 18-9 3-4-11-5 12-9-4 6-16c1-1 2-2 3-3Z" />
              <path className="footer-traveler-arm" d="m19 25-9 14m18-13 10 12" />
              <path className="footer-traveler-leg footer-traveler-leg-left" d="m20 42-7 17 8 2 8-13" />
              <path className="footer-traveler-leg footer-traveler-leg-right" d="m28 43 8 15-7 4-9-13" />
              <path d="m11 60 10 1-2 4H8zm17 2 10-4 2 5-10 5z" />
            </g>
            <path className="footer-traveler-satchel" d="M34 30h9v13h-9z" />
          </svg>
        </div>
      </div>

      <div className="footer-copyright">
        <span>© 2026 Sri Aurobindo Mira Universal School. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
