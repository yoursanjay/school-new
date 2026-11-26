"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  UserRound,
  GraduationCap,
  Newspaper,
  Bus,
  Award,
  Milestone,
  Users,
  Landmark,
  Phone,
} from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  hideDuringKingfisher?: boolean;
}

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CAMPUS_LIFE_ITEMS: DropdownItem[] = [
  { label: "Life of Sam", href: "/life-of-sam", icon: GraduationCap },
  { label: "School News", href: "/school-news", icon: Newspaper },
  { label: "Transport", href: "/transport", icon: Bus },
];

const ABOUT_US_ITEMS: DropdownItem[] = [
  { label: "Why Sam Universe", href: "/why-sam-universe", icon: Award },
  { label: "Our Journey", href: "/our-journey", icon: Milestone },
  { label: "Leadership Team", href: "/leadership-team", icon: Users },
  { label: "About Us", href: "/about-us", icon: Landmark },
];

export default function Navbar({ hideDuringKingfisher = false }: NavbarProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [immersiveSectionVisible, setImmersiveSectionVisible] = useState(false);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  // Close dropdown whenever the route changes (React 19 pattern: adjusting state during render)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileOpen(false);
  }

  const navRef = useRef<HTMLElement>(null);

  // Micro-animation on mount
  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  // Kingfisher section visibility observer
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

  // Scroll listener for background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileGroup = (name: string) => {
    setMobileExpandedGroup((prev) => (prev === name ? null : name));
  };

  // Active status checks
  const isHomeActive = pathname === "/";
  const isSportsActive = pathname === "/sports";
  const isCampusLifeActive =
    pathname === "/life-of-sam" ||
    pathname === "/school-news" ||
    pathname === "/transport" ||
    pathname.startsWith("/campus-life");
  const isAboutUsActive =
    pathname === "/why-sam-universe" ||
    pathname === "/our-journey" ||
    pathname === "/leadership-team" ||
    pathname === "/about-us" ||
    pathname.startsWith("/about-us");
  const isContactUsActive = pathname === "/contact-us";

  if (hideDuringKingfisher && immersiveSectionVisible) return null;

  return (
    <>
      {/* Background Blur Overlay for Dropdowns */}
      {activeDropdown && (
        <div
          className={styles.blurOverlay}
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}

      {/* Floating Header Container */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none flex flex-col items-center"
      >
        {/* Main Floating Navbar Bar */}
        <div
          className="pointer-events-auto relative flex items-center justify-between gap-4 transition-all duration-300 ease-out"
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
          {/* LEFT: School Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 cursor-pointer group select-none"
            aria-label="Sri Aurobindo Mira Universal School Home"
          >
            <div
              className="relative w-[88px] sm:w-[128px] h-[44px] sm:h-[64px] shrink-0 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: "50ms",
              }}
            >
              <Image
                src="/img/logo.png"
                alt="Sri Aurobindo Mira Universal School"
                width={128}
                height={64}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* CENTER: Navigation Items (Desktop) */}
          <nav
            className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-3 transition-all duration-500 ease-out"
            aria-label="Main Navigation"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-6px)",
              transitionDelay: "150ms",
            }}
          >
            {/* 1. Home */}
            <Link
              href="/"
              className={styles.navButton}
              aria-current={isHomeActive ? "page" : undefined}
            >
              <div className={styles.iconSlot}>
                <div className={styles.capWrapper}>
                  {/* Graduation cap SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.capIcon}
                    aria-hidden="true"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  {/* Golden orbit ring & sparkle */}
                  <div className={styles.orbitRing} aria-hidden="true">
                    <div className={styles.orbitSparkle} />
                  </div>
                </div>
              </div>
              <div className={styles.labelRow}>
                <span className={styles.labelText}>Home</span>
              </div>
              {isHomeActive && <span className={styles.activeUnderline} />}
              {!isHomeActive && <span className={styles.hoverUnderline} />}
            </Link>

            {/* 2. Sports */}
            <Link
              href="/sports"
              className={styles.navButton}
              aria-current={isSportsActive ? "page" : undefined}
            >
              <div className={styles.iconSlot}>
                <div className={styles.ballWrapper}>
                  {/* Bouncing sports ball SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.ballIcon}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24" />
                    <path d="M14.83 9.17l-5.66 5.66" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>
              <div className={styles.labelRow}>
                <span className={styles.labelText}>Sports</span>
              </div>
              {isSportsActive && <span className={styles.activeUnderline} />}
              {!isSportsActive && <span className={styles.hoverUnderline} />}
            </Link>

            {/* 3. Campus Life (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("campus-life")}
                className={styles.navButton}
                aria-expanded={activeDropdown === "campus-life"}
                aria-haspopup="true"
              >
                <div className={styles.iconSlot}>
                  <div className={styles.bookWrapper}>
                    {/* Open book / school building SVG */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.bookIcon}
                      aria-hidden="true"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      <path d="M8 7h8m-8 4h5" />
                    </svg>
                  </div>
                </div>
                <div className={styles.labelRow}>
                  <span className={styles.labelText}>Campus Life</span>
                  <ChevronDown
                    className={`${styles.arrowIcon} ${
                      activeDropdown === "campus-life" ? styles.arrowOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
                {isCampusLifeActive && <span className={styles.activeUnderline} />}
                {!isCampusLifeActive && <span className={styles.hoverUnderline} />}
              </button>

              {/* Deep Purple Dropdown */}
              {activeDropdown === "campus-life" && (
                <div className={styles.dropdownMenu} role="menu">
                  <div className={styles.dropdownArrow} aria-hidden="true" />
                  {CAMPUS_LIFE_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={styles.dropdownItem}
                        role="menuitem"
                      >
                        <div className={styles.dropdownItemIcon}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className={styles.dropdownItemText}>
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. About Us (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("about-us")}
                className={styles.navButton}
                aria-expanded={activeDropdown === "about-us"}
                aria-haspopup="true"
              >
                <div className={styles.iconSlot}>
                  <div className={styles.starWrapper}>
                    {/* Sparkling emblem / star SVG */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={styles.starIcon}
                      aria-hidden="true"
                    >
                      <path d="M12 1.5l2.6 6.5 6.9.6-5.2 4.6 1.6 6.8L12 16.5l-5.9 3.5 1.6-6.8-5.2-4.6 6.9-.6L12 1.5z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.labelRow}>
                  <span className={styles.labelText}>About Us</span>
                  <ChevronDown
                    className={`${styles.arrowIcon} ${
                      activeDropdown === "about-us" ? styles.arrowOpen : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
                {isAboutUsActive && <span className={styles.activeUnderline} />}
                {!isAboutUsActive && <span className={styles.hoverUnderline} />}
              </button>

              {/* Deep Purple Dropdown */}
              {activeDropdown === "about-us" && (
                <div className={styles.dropdownMenu} role="menu">
                  <div className={styles.dropdownArrow} aria-hidden="true" />
                  {ABOUT_US_ITEMS.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={styles.dropdownItem}
                        role="menuitem"
                      >
                        <div className={styles.dropdownItemIcon}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className={styles.dropdownItemText}>
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Contact Us */}
            <Link
              href="/contact-us"
              className={styles.navButton}
              aria-current={isContactUsActive ? "page" : undefined}
            >
              <div className={styles.iconSlot}>
                <div className={styles.envelopeWrapper}>
                  {/* Floating envelope SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.envelopeIcon}
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>
              <div className={styles.labelRow}>
                <span className={styles.labelText}>Contact Us</span>
              </div>
              {isContactUsActive && <span className={styles.activeUnderline} />}
              {!isContactUsActive && <span className={styles.hoverUnderline} />}
            </Link>
          </nav>

          {/* RIGHT: Login & CTA & Hamburger */}
          <div
            className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0 transition-all duration-500 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.96)",
              transitionDelay: "200ms",
            }}
          >
            {/* Login Icon */}
            <a
              href="https://app.stppeify.com/"
              aria-label="Login"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111111] transition-colors duration-200 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99738]"
            >
              <UserRound className="h-5 w-5" aria-hidden="true" />
            </a>

            {/* Apply Now Button */}
            <a
              href="/garden#admissions"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full font-bold text-[12px] tracking-wide text-white cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100 select-none shadow-[0_4px_16px_rgba(37,99,235,0.30)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.45)]"
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
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
            >
              <span className="text-lg leading-none font-semibold">
                {mobileOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>

          {/* Bottom highlight line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none rounded-b-[18px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(17, 17, 17, 0.18), transparent)",
              opacity: 0.35,
            }}
          />
        </div>

        {/* Mobile Dropdown Menu (lg:hidden) */}
        {mobileOpen && (
          <div
            className="pointer-events-auto w-[calc(100%-36px)] max-w-[1520px] rounded-[18px] border border-black/10 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 animate-in fade-in slide-in-from-top-3 lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto"
            style={{
              backgroundColor: "rgba(248, 249, 250, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col gap-1.5">
              {/* 1. Mobile Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                  isHomeActive
                    ? "text-[#111111] bg-black/5"
                    : "text-[#111111] hover:bg-black/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={styles.capWrapper}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-[#111111]"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span>Home</span>
                </div>
                {isHomeActive && (
                  <span className="w-2 h-2 rounded-full bg-[#F4C542]" />
                )}
              </Link>

              {/* 2. Mobile Sports */}
              <Link
                href="/sports"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                  isSportsActive
                    ? "text-[#111111] bg-black/5"
                    : "text-[#111111] hover:bg-black/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={styles.ballWrapper}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-[#ea580c]"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24" />
                      <path d="M14.83 9.17l-5.66 5.66" />
                    </svg>
                  </div>
                  <span>Sports</span>
                </div>
                {isSportsActive && (
                  <span className="w-2 h-2 rounded-full bg-[#F4C542]" />
                )}
              </Link>

              {/* 3. Mobile Campus Life */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileGroup("campus-life")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                    isCampusLifeActive
                      ? "text-[#111111] bg-black/5"
                      : "text-[#111111] hover:bg-black/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={styles.bookWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4 text-[#2563eb]"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <span>Campus Life</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExpandedGroup === "campus-life" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExpandedGroup === "campus-life" && (
                  <div className={styles.mobileDropdownGroup}>
                    {CAMPUS_LIFE_ITEMS.map((subItem) => {
                      const IconComponent = subItem.icon;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileOpen(false)}
                          className={styles.mobileSubItem}
                        >
                          <IconComponent className="w-4 h-4 text-[#7c3aed]" />
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Mobile About Us */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileGroup("about-us")}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                    isAboutUsActive
                      ? "text-[#111111] bg-black/5"
                      : "text-[#111111] hover:bg-black/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={styles.starWrapper}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-[#ca8a04]"
                      >
                        <path d="M12 1.5l2.6 6.5 6.9.6-5.2 4.6 1.6 6.8L12 16.5l-5.9 3.5 1.6-6.8-5.2-4.6 6.9-.6L12 1.5z" />
                      </svg>
                    </div>
                    <span>About Us</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExpandedGroup === "about-us" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExpandedGroup === "about-us" && (
                  <div className={styles.mobileDropdownGroup}>
                    {ABOUT_US_ITEMS.map((subItem) => {
                      const IconComponent = subItem.icon;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileOpen(false)}
                          className={styles.mobileSubItem}
                        >
                          <IconComponent className="w-4 h-4 text-[#7c3aed]" />
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. Mobile Contact Us */}
              <Link
                href="/contact-us"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                  isContactUsActive
                    ? "text-[#111111] bg-black/5"
                    : "text-[#111111] hover:bg-black/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={styles.envelopeWrapper}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 text-[#0c1b33]"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span>Contact Us</span>
                </div>
                {isContactUsActive && (
                  <span className="w-2 h-2 rounded-full bg-[#F4C542]" />
                )}
              </Link>
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
                onClick={() => setMobileOpen(false)}
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
