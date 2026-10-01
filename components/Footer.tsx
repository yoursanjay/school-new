"use client";

import React from "react";
import Image from "next/image";
import SectionContainer from "./SectionContainer";
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "#hero") {
      scrollToTop();
      return;
    }
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative z-20 w-full bg-[#0B1B33] text-white border-t border-white/10 overflow-hidden"
      style={{
        paddingTop: "clamp(60px, 6vw, 90px)",
        paddingBottom: "clamp(36px, 4vw, 48px)",
      }}
    >
      {/* Decorative top gold gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0B1B33] via-[#C99732] to-[#0B1B33]" />

      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-[#C99732]/40">
                <Image
                  src="/images/logo.png"
                  alt="Sri Aurobindo Mira Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block text-lg font-black tracking-tight text-white leading-tight uppercase">
                  Sri Aurobindo Mira
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#E2B64A]">
                  Universal School • CBSE
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md font-normal">
              Sri Aurobindo Mira Universal School is committed to providing a
              nurturing CBSE education that develops academic excellence,
              character, creativity and confidence in Keelamathur, Madurai.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E2B64A] font-semibold bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#C99732]" />
              <span>CBSE Affiliation: 1930282 | School Code: 55225</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99732] hover:text-[#0B1B33] text-white flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99732] hover:text-[#0B1B33] text-white flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C99732] hover:text-[#0B1B33] text-white flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 border-b border-white/10 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Academics", href: "#academics" },
                { name: "Facilities", href: "#facilities" },
                { name: "Student Life", href: "#student-life" },
                { name: "Values", href: "#values" },
                { name: "Gallery", href: "#gallery" },
                { name: "Admissions", href: "#admissions" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-300 hover:text-[#E2B64A] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C99732]" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 border-b border-white/10 pb-2">
              School Contact
            </h4>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C99732] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Keelamathur, Melakkal Main Road,
                  <br />
                  Madurai – 625016, Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C99732] shrink-0" />
                <a
                  href="tel:+919047077677"
                  className="hover:text-[#E2B64A] font-semibold transition-colors"
                >
                  +91 90470 77677
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C99732] shrink-0" />
                <a
                  href="mailto:info@school.edu"
                  className="hover:text-[#E2B64A] transition-colors"
                >
                  info@school.edu
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#C99732] hover:text-[#0B1B33] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Back To Top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2026 Sri Aurobindo Mira Universal School. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="hover:text-[#E2B64A] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#admissions"
              onClick={(e) => handleNavClick(e, "#admissions")}
              className="hover:text-[#E2B64A] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hover:text-[#E2B64A] transition-colors"
            >
              CBSE Mandatory Disclosure
            </a>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
