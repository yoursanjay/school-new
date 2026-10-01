"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Phone, ArrowUpRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Academics", href: "#academics", id: "academics" },
  { label: "Facilities", href: "#facilities", id: "facilities" },
  { label: "Student Life", href: "#student-life", id: "student-life" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "News", href: "#news", id: "news" },
  { label: "Admissions", href: "#admissions", id: "admissions" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Trigger micro-animation on load
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // IntersectionObserver for tracking active section without interfering with Frame-1 canvas
  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "academics",
      "facilities",
      "student-life",
      "values",
      "gallery",
      "news",
      "testimonials",
      "admissions",
      "contact",
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "values") {
            setActiveSection("student-life");
          } else if (id === "testimonials") {
            setActiveSection("news");
          } else {
            setActiveSection(id);
          }
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
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === "#hero" || href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
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
          className="pointer-events-auto relative flex items-center justify-between transition-all duration-300 ease-out"
          style={{
            margin: "10px 18px",
            width: "calc(100% - 36px)",
            maxWidth: "1520px",
            height: "64px",
            borderRadius: "18px",
            backgroundColor: isScrolled
              ? "rgba(5, 18, 30, 0.94)"
              : "rgba(8, 24, 40, 0.70)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: isScrolled
              ? "0 14px 44px rgba(0, 0, 0, 0.35)"
              : "0 10px 40px rgba(0, 0, 0, 0.20)",
            padding: "0 18px",
          }}
        >
          {/* LEFT: Premium School Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 shrink-0 cursor-pointer group select-none"
            aria-label="Sri Aurobindo Mira Universal School Home"
          >
            {/* Logo with gold accent ring */}
            <div
              className="relative w-[44px] h-[44px] rounded-full overflow-hidden p-0.5 bg-black/20 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105"
              style={{
                border: "1.5px solid rgba(244, 197, 66, 0.65)",
                boxShadow: "0 0 10px rgba(244, 197, 66, 0.22)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: "50ms",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Sri Aurobindo Mira Emblem"
                className="w-full h-full object-contain"
              />
            </div>

            {/* School Name Typography */}
            <div
              className="flex flex-col transition-all duration-500 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-10px)",
                transitionDelay: "100ms",
              }}
            >
              <span className="text-[13px] sm:text-[14px] font-extrabold tracking-tight text-white leading-tight uppercase">
                Sri Aurobindo Mira
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#F4C542]">
                Universal School • CBSE
              </span>
            </div>
          </a>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 transition-all duration-500 ease-out"
            aria-label="Main Navigation"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-6px)",
              transitionDelay: "150ms",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-2.5 xl:px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-200 select-none ${
                    isActive
                      ? "text-[#F4C542]"
                      : "text-white/88 hover:text-[#F4C542]"
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
            className="flex items-center gap-3 sm:gap-4 transition-all duration-500 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.96)",
              transitionDelay: "200ms",
            }}
          >
            {/* Phone link (Desktop only) */}
            <a
              href="tel:+919047077677"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-[12px] font-medium text-white/85 hover:text-[#F4C542] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4C542]" />
              <span>+91 9047077677</span>
            </a>

            {/* Contact link (Desktop only) */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className={`hidden sm:inline-flex text-[12.5px] font-medium px-2 py-1 transition-colors duration-200 ${
                activeSection === "contact"
                  ? "text-[#F4C542]"
                  : "text-white/85 hover:text-[#F4C542]"
              }`}
            >
              Contact
            </a>

            {/* Premium Apply Now CTA Button */}
            <a
              href="#admissions"
              onClick={(e) => handleNavClick(e, "#admissions")}
              className="inline-flex items-center gap-1.5 rounded-full font-bold text-[12px] tracking-wide text-[#05121e] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100 select-none shadow-[0_4px_16px_rgba(244,197,66,0.30)] hover:shadow-[0_6px_22px_rgba(244,197,66,0.45)]"
              style={{
                background: "linear-gradient(135deg, #F4C542, #DFAE24)",
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
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
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
                "linear-gradient(90deg, transparent, rgba(244, 197, 66, 0.6), transparent)",
              opacity: 0.35,
            }}
          />
        </div>

        {/* Mobile Dropdown Menu (<= 900px / lg) */}
        {mobileOpen && (
          <div
            className="pointer-events-auto w-[calc(100%-36px)] max-w-[1520px] rounded-[18px] border border-white/14 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.5)] transition-all duration-300 animate-in fade-in slide-in-from-top-3 lg:hidden"
            style={{
              backgroundColor: "rgba(5, 18, 30, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#F4C542] bg-white/10 font-bold"
                        : "text-white/88 hover:text-[#F4C542] hover:bg-white/5"
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
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium text-white/88 hover:text-[#F4C542] hover:bg-white/5"
              >
                <span>Contact</span>
              </a>
            </nav>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="tel:+919047077677"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/15 text-white/90 text-[13px] font-medium bg-white/5 hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-[#F4C542]" />
                <span>+91 9047077677</span>
              </a>

              <a
                href="#admissions"
                onClick={(e) => handleNavClick(e, "#admissions")}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-[13px] font-bold text-[#05121e] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #F4C542, #DFAE24)",
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
