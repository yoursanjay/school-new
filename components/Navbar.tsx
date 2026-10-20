"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface NavbarProps {
  hideDuringKingfisher?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", id: "hero" },
  { label: "About", href: "/garden#about", id: "about" },
  { label: "Academics", href: "/garden#academics", id: "academics" },
  { label: "Facilities", href: "/garden#facilities", id: "facilities" },
  { label: "Student Life", href: "/garden#student-life", id: "student-life" },
  { label: "Gallery", href: "/garden#gallery", id: "gallery" },
  { label: "Garden", href: "/garden", id: "garden" },
  { label: "Admissions", href: "/garden#admissions", id: "admissions" },
];

export default function Navbar({
  hideDuringKingfisher = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname === "/" ? "hero" : "garden",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [immersiveSectionVisible, setImmersiveSectionVisible] = useState(false);

  // Trigger micro-animation on load
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (!hideDuringKingfisher) return;

    const section = document.querySelector(".academy-odyssey-section");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setImmersiveSectionVisible(entry.isIntersecting);
    });
    observer.observe(section);

    return () => observer.disconnect();
  }, [hideDuringKingfisher]);

  // Scroll listener for background opacity & top scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking the active Garden section.
  useEffect(() => {
    if (pathname !== "/garden") return;

    const sectionIds = [
      "about",
      "academics",
      "facilities",
      "student-life",
      "gallery",
      "admissions",
      "contact",
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);

    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname !== pathname) {
      return;
    }

    e.preventDefault();
    const targetId = destination.hash.slice(1);
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  if (hideDuringKingfisher && immersiveSectionVisible) return null;

  return (
    <>
      {/* Top subtle Gold Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[10001] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#F4C542] via-[#ffe28a] to-[#F4C542] shadow-[0_0_8px_rgba(244,197,66,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header Container */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none flex flex-col items-center"
      >
        {/* Main Floating Navbar Bar */}
        <div
          className="pointer-events-auto relative flex items-center justify-between gap-6 transition-all duration-300 ease-out"
          style={{
            margin: "10px 18px",
            width: "calc(100% - 36px)",
            maxWidth: "1520px",
            height: "64px",
            borderRadius: "18px",
            backgroundColor: "#F8F9FA",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: isScrolled
              ? "0 6px 18px rgba(0, 0, 0, 0.14)"
              : "0 4px 14px rgba(0, 0, 0, 0.12)",
            padding: "0 18px",
          }}
        >
          {/* LEFT: Premium School Brand */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 shrink-0 cursor-pointer group select-none"
            aria-label="Sri Aurobindo Mira Universal School Home"
          >
            {/* School wordmark */}
            <div
              className="relative w-[88px] sm:w-[128px] h-[44px] sm:h-[64px] shrink-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: "50ms",
              }}
            >
              <img
                src="/img/logo.png"
                alt="Sri Aurobindo Mira Universal School"
                className="w-full h-full object-contain"
              />
            </div>

          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-3 transition-all duration-500 ease-out"
            aria-label="Main Navigation"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-6px)",
              transitionDelay: "150ms",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.id === "hero" && pathname === "/") ||
                (item.id === "garden" && pathname === "/garden") ||
                (item.id !== "hero" &&
                  item.id !== "garden" &&
                  pathname === "/garden" &&
                  activeSection === item.id);

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-2.5 xl:px-3 py-1.5 text-[13px] font-bold tracking-wide transition-colors duration-200 select-none ${
                    isActive
                      ? "text-[#111111]"
                      : "text-[#111111] hover:text-[#111111]"
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Active small gold underline (approx 18-24px centered) */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#F4C542] rounded-full transition-all duration-250 ease-out"
                      style={{
                        boxShadow: "0 0 6px rgba(244, 197, 66, 0.6)",
                      }}
                    />
                  )}

                  {/* Subtle animated underline on hover when not active */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#F4C542]/70 rounded-full transition-all duration-200 ease-out group-hover:w-4" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Phone, Contact & Premium Apply CTA */}
          <div
            className="flex items-center gap-3 sm:gap-4 lg:gap-6 transition-all duration-500 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.96)",
              transitionDelay: "200ms",
            }}
          >
            {/* Phone link (Desktop only) */}
            <a
              href="tel:+919047077677"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-[12px] font-bold text-[#111111] hover:text-[#111111] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#111111]" />
              <span>+91 9047077677</span>
            </a>

            {/* Contact link (Desktop only) */}
            <a
              href="/garden#contact"
              onClick={(e) => handleNavClick(e, "/garden#contact")}
              className={`hidden sm:inline-flex text-[12.5px] font-bold px-2 py-1 transition-colors duration-200 ${
                activeSection === "contact"
                  ? "text-[#111111]"
                  : "text-[#111111] hover:text-[#111111]"
              }`}
            >
              Contact
            </a>

            {/* Premium Apply Now CTA Button */}
            <a
              href="/garden#admissions"
              onClick={(e) => handleNavClick(e, "/garden#admissions")}
              className="inline-flex items-center gap-1.5 rounded-full font-bold text-[12px] tracking-wide text-white cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100 select-none shadow-[0_4px_16px_rgba(37,99,235,0.30)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)]"
              style={{
                background: "#2563EB",
                padding: "8px 16px",
              }}
            >
              <span>Apply Now</span>
              <span className="font-bold text-[13px] leading-none">↗</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-black/10 bg-black/5 text-[#111111] hover:bg-black/10 transition-colors"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              <span className="text-lg leading-none font-semibold">
                {mobileOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* Subtle Gold Highlight Line at Bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none rounded-b-[18px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(17, 17, 17, 0.18), transparent)",
              opacity: 0.35,
            }}
          />
        </div>

        {/* Mobile Dropdown Menu (<= 900px / lg) */}
        {mobileOpen && (
          <div
            className="pointer-events-auto w-[calc(100%-36px)] max-w-[1520px] rounded-[18px] border border-black/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.15)] transition-all duration-300 animate-in fade-in slide-in-from-top-3 lg:hidden"
            style={{
              backgroundColor: "rgba(248, 249, 250, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, idx) => {
                const isActive =
                  (item.id === "hero" && pathname === "/") ||
                  (item.id === "garden" && pathname === "/garden") ||
                  (item.id !== "hero" &&
                    item.id !== "garden" &&
                    pathname === "/garden" &&
                    activeSection === item.id);
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 ${
                      isActive
                        ? "text-[#111111] bg-black/5 font-bold"
                        : "text-[#111111] hover:text-[#111111] hover:bg-black/5"
                    }`}
                    style={{
                      animationDelay: `${idx * 40}ms`,
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#F4C542]" />
                    )}
                  </a>
                );
              })}

              <a
                href="/garden#contact"
                onClick={(e) => handleNavClick(e, "/garden#contact")}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold text-[#111111] hover:text-[#111111] hover:bg-black/5"
              >
                <span>Contact</span>
              </a>
            </nav>

            <div className="mt-4 pt-4 border-t border-black/10 flex flex-col gap-2.5">
              <a
                href="tel:+919047077677"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-black/10 text-[#111111] text-[13px] font-bold bg-black/5 hover:bg-black/10"
              >
                <Phone className="w-4 h-4 text-[#111111]" />
                <span>+91 9047077677</span>
              </a>

              <a
                href="/garden#admissions"
                onClick={(e) => handleNavClick(e, "/garden#admissions")}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-[13px] font-bold text-white shadow-md"
                style={{
                  background: "#2563EB",
                }}
              >
                <span>Apply For Admission ↗</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
