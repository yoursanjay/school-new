"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  Bus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import styles from "./ContactPageContent.module.css";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  category?: string;
  message?: string;
}

interface CategoryButton {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeBg: string;
  badgeGlow: string;
}

const ENQUIRY_CATEGORIES: CategoryButton[] = [
  {
    id: "Admissions",
    label: "Admissions",
    icon: GraduationCap,
    badgeBg: "bg-gradient-to-br from-[#fbbf24] to-[#d97706]",
    badgeGlow: "shadow-[0_0_12px_rgba(245,158,11,0.6)]",
  },
  {
    id: "General Enquiries",
    label: "General Enquiries",
    icon: Users,
    badgeBg: "bg-gradient-to-br from-[#60a5fa] to-[#2563eb]",
    badgeGlow: "shadow-[0_0_12px_rgba(59,130,246,0.6)]",
  },
  {
    id: "Academic Office",
    label: "Academic Office",
    icon: BookOpen,
    badgeBg: "bg-gradient-to-br from-[#f87171] to-[#dc2626]",
    badgeGlow: "shadow-[0_0_12px_rgba(239,68,68,0.6)]",
  },
  {
    id: "Student Support",
    label: "Student Support",
    icon: UserCheck,
    badgeBg: "bg-gradient-to-br from-[#4ade80] to-[#16a34a]",
    badgeGlow: "shadow-[0_0_12px_rgba(34,197,94,0.6)]",
  },
  {
    id: "Transport",
    label: "Transport",
    icon: Bus,
    badgeBg: "bg-gradient-to-br from-[#c084fc] to-[#9333ea]",
    badgeGlow: "shadow-[0_0_12px_rgba(168,85,247,0.6)]",
  },
];

export default function ContactPageContent() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    category: "Admissions",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryHighlight, setCategoryHighlight] = useState(false);

  // Scroll reveal references
  const heroRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [heroRevealed, setHeroRevealed] = useState(false);
  const [helpRevealed, setHelpRevealed] = useState(false);
  const [infoRevealed, setInfoRevealed] = useState(false);
  const [campusRevealed, setCampusRevealed] = useState(false);
  const [formRevealed, setFormRevealed] = useState(false);

  useEffect(() => {
    // Initial hero reveal trigger
    const timer = setTimeout(() => setHeroRevealed(true), 80);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === helpRef.current) setHelpRevealed(true);
          if (entry.target === infoRef.current) setInfoRevealed(true);
          if (entry.target === campusRef.current) setCampusRevealed(true);
          if (entry.target === formRef.current) setFormRevealed(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });

    if (helpRef.current) observer.observe(helpRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    if (campusRef.current) observer.observe(campusRef.current);
    if (formRef.current) observer.observe(formRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToForm = (categoryName?: string) => {
    if (categoryName) {
      setFormData((prev) => ({ ...prev, category: categoryName }));
      setCategoryHighlight(true);
      setTimeout(() => setCategoryHighlight(false), 2200);
    }
    const target = document.getElementById("enquiry-form");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+-\s()]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write your query or message.";
    } else if (formData.message.trim().length < 8) {
      newErrors.message = "Message must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 750);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      category: "Admissions",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className={styles.contactWrapper}>
      {/* Ambient background lighting */}
      <div className={styles.ambientGlowHero} aria-hidden="true" />
      <div className={styles.ambientGlowCampus} aria-hidden="true" />

      {/* =========================================================================
          SECTION 1: CONTACT HERO (3D School & Students Island)
      ========================================================================= */}
      <section
        ref={heroRef}
        className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center z-10"
      >

        {/* Background Twinkling Stars */}
        <div
          className={`absolute top-28 left-1/4 ${styles.twinklingStar} text-yellow-400 select-none pointer-events-none text-base`}
        >
          ★
        </div>
        <div
          className={`absolute top-36 right-1/4 ${styles.twinklingStar} text-yellow-300 select-none pointer-events-none text-xs`}
        >
          ✦
        </div>
        <div
          className={`absolute top-64 left-1/6 ${styles.twinklingStar} text-yellow-400 select-none pointer-events-none text-sm`}
        >
          ★
        </div>

        {/* Eyebrow: GET IN TOUCH */}
        <div
          className={`flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.28em] text-white/75 uppercase mb-3 ${
            styles.revealItem
          } ${heroRevealed ? styles.revealed : ""}`}
        >
          <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-white/60" />
          <span>GET IN TOUCH</span>
          <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent via-white/30 to-white/60" />
        </div>

        {/* Real 3D HTML Heading: CONTACT (Zero Duplication) */}
        <h1
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl ${styles.heroTitle3D} mb-3 sm:mb-5 ${
            styles.revealItem
          } ${heroRevealed ? styles.revealed : ""}`}
          style={{ transitionDelay: "120ms" }}
        >
          CONTACT
        </h1>

        {/* Pure 3D Visual Scene: School Building + Students on Floating Rock Island (cn1.webp) */}
        <div
          className={`relative w-full max-w-[880px] mx-auto my-3 sm:my-6 ${
            styles.floatingHeroIsland
          } ${styles.revealItem} ${heroRevealed ? styles.revealed : ""}`}
          style={{ transitionDelay: "220ms" }}
        >
          <Image
            src="/img/contact/cn1.webp"
            alt="3D School Campus with Students Sitting on Books"
            width={1959}
            height={803}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Supporting text: — LET'S CONNECT — */}
        <div
          className={`flex items-center gap-2 mt-4 text-sm sm:text-base font-extrabold tracking-widest uppercase text-white/90 ${
            styles.revealItem
          } ${heroRevealed ? styles.revealed : ""}`}
          style={{ transitionDelay: "320ms" }}
        >
          <span className="text-white/40">—</span>
          <span>LET&apos;S</span>
          <span className="text-[#F4C542] relative font-black">
            CONNECT
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#F4C542] rounded-full shadow-[0_0_8px_#F4C542]" />
          </span>
          <span className="text-white/40">—</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 01 HOW CAN WE HELP? (3D Open Book & 5 Enquiry Capsules)
      ========================================================================= */}
      <section
        ref={helpRef}
        id="how-can-we-help"
        className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10"
      >
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 ${styles.revealItem} ${
            helpRevealed ? styles.revealed : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-[0.24em] text-[#d8b4fe] uppercase mb-2">
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent to-purple-500/50" />
            <span>01</span>
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            HOW CAN WE HELP?
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-medium">
            We&apos;re here to help
          </p>
        </div>

        {/* 3D Composition: Central 3D Open Book with Circular Platform & 5 Capsules */}
        <div className="relative flex flex-col items-center">
          {/* DESKTOP VIEW (>= 1024px / lg): Balanced 3-column layout */}
          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 w-full max-w-6xl mx-auto">
            {/* Left Column: 1. Admissions & 2. General Enquiries */}
            <div className="flex flex-col gap-10 items-end shrink-0 w-[220px]">
              {/* 1. Admissions */}
              <button
                type="button"
                onClick={() => scrollToForm("Admissions")}
                className={`${styles.enquiryButton} w-full justify-start`}
                aria-label="Enquire about Admissions"
              >
                <div
                  className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[0].badgeBg} ${ENQUIRY_CATEGORIES[0].badgeGlow}`}
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className={styles.enquiryLabel}>
                  {ENQUIRY_CATEGORIES[0].label}
                </span>
              </button>

              {/* 2. General Enquiries */}
              <button
                type="button"
                onClick={() => scrollToForm("General Enquiries")}
                className={`${styles.enquiryButton} w-full justify-start`}
                aria-label="Make a General Enquiry"
              >
                <div
                  className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[1].badgeBg} ${ENQUIRY_CATEGORIES[1].badgeGlow}`}
                >
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className={styles.enquiryLabel}>
                  {ENQUIRY_CATEGORIES[1].label}
                </span>
              </button>
            </div>

            {/* Center: Large 3D Open Book on Floating Circular Platform (cn2.webp) */}
            <div className="flex flex-col items-center justify-center shrink-0 w-[460px] xl:w-[520px]">
              <div
                className={`relative w-full ${styles.floatingBook}`}
              >
                {/* Glowing Aura behind book */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-purple-600/30 via-amber-500/20 to-purple-600/30 blur-2xl rounded-full ${styles.auraPulse}`}
                  aria-hidden="true"
                />
                <Image
                  src="/img/contact/cn2.webp"
                  alt="3D Open Book with Glowing School Shield and Graduation Cap"
                  width={1728}
                  height={910}
                  priority
                  className="relative w-full h-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* 5. Transport (Directly below central book) */}
              <div className="mt-4 w-[220px]">
                <button
                  type="button"
                  onClick={() => scrollToForm("Transport")}
                  className={`${styles.enquiryButton} w-full justify-start`}
                  aria-label="Enquire about Transport"
                >
                  <div
                    className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[4].badgeBg} ${ENQUIRY_CATEGORIES[4].badgeGlow}`}
                  >
                    <Bus className="w-5 h-5 text-white" />
                  </div>
                  <span className={styles.enquiryLabel}>
                    {ENQUIRY_CATEGORIES[4].label}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: 3. Academic Office & 4. Student Support */}
            <div className="flex flex-col gap-10 items-start shrink-0 w-[220px]">
              {/* 3. Academic Office */}
              <button
                type="button"
                onClick={() => scrollToForm("Academic Office")}
                className={`${styles.enquiryButton} w-full justify-start`}
                aria-label="Enquire about Academic Office"
              >
                <div
                  className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[2].badgeBg} ${ENQUIRY_CATEGORIES[2].badgeGlow}`}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className={styles.enquiryLabel}>
                  {ENQUIRY_CATEGORIES[2].label}
                </span>
              </button>

              {/* 4. Student Support */}
              <button
                type="button"
                onClick={() => scrollToForm("Student Support")}
                className={`${styles.enquiryButton} w-full justify-start`}
                aria-label="Enquire about Student Support"
              >
                <div
                  className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[3].badgeBg} ${ENQUIRY_CATEGORIES[3].badgeGlow}`}
                >
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <span className={styles.enquiryLabel}>
                  {ENQUIRY_CATEGORIES[3].label}
                </span>
              </button>
            </div>
          </div>

          {/* TABLET & MOBILE LAYOUT (< 1024px): Book Top, 5 Capsules Neatly Arranged */}
          <div className="lg:hidden flex flex-col items-center w-full max-w-lg mx-auto gap-6">
            {/* Center: 3D Open Book */}
            <div
              className={`relative w-full max-w-[360px] sm:max-w-[440px] my-2 ${styles.floatingBook}`}
            >
              <div
                className={`absolute inset-0 bg-purple-500/25 blur-2xl rounded-full ${styles.auraPulse}`}
                aria-hidden="true"
              />
              <Image
                src="/img/contact/cn2.webp"
                alt="3D Open Book with School Shield and Graduation Cap"
                width={1728}
                height={910}
                className="relative w-full h-auto object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.85)]"
              />
            </div>

            {/* 5 Clickable 3D Capsules in a Clean Responsive Grid/Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {ENQUIRY_CATEGORIES.slice(0, 4).map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToForm(cat.id)}
                    className={`${styles.enquiryButton} w-full justify-start`}
                  >
                    <div
                      className={`${styles.enquiryIconBadge} ${cat.badgeBg} ${cat.badgeGlow}`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className={styles.enquiryLabel}>{cat.label}</span>
                  </button>
                );
              })}
              {/* 5. Transport centered across both columns on tablet */}
              <div className="sm:col-span-2 sm:flex sm:justify-center">
                <button
                  type="button"
                  onClick={() => scrollToForm(ENQUIRY_CATEGORIES[4].id)}
                  className={`${styles.enquiryButton} w-full sm:w-[240px] justify-start`}
                >
                  <div
                    className={`${styles.enquiryIconBadge} ${ENQUIRY_CATEGORIES[4].badgeBg} ${ENQUIRY_CATEGORIES[4].badgeGlow}`}
                  >
                    <Bus className="w-5 h-5 text-white" />
                  </div>
                  <span className={styles.enquiryLabel}>
                    {ENQUIRY_CATEGORIES[4].label}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONTACT INFORMATION STRIP (Directly below How Can We Help)
        ========================================================================= */}
        <div
          ref={infoRef}
          className={`mt-14 sm:mt-18 max-w-4xl mx-auto ${styles.revealItem} ${
            infoRevealed ? styles.revealed : ""
          }`}
        >
          <div
            className={`${styles.infoStrip} p-4 sm:p-5 flex flex-col md:flex-row items-center justify-around gap-4 text-center md:text-left`}
          >
            {/* Email */}
            <a
              href="mailto:universal@sriaurobindomira.org"
              className="flex items-center gap-3 text-white/90 hover:text-white group transition-colors px-3 py-1"
              aria-label="Email Sri Aurobindo Mira Universal School"
            >
              <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:bg-purple-500/35 flex items-center justify-center shrink-0 text-[#d8b4fe] transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  universal@sriaurobindomira.org
                </span>
              </div>
            </a>

            <div className="hidden md:block w-[1px] h-9 bg-purple-500/25" />

            {/* Phone */}
            <a
              href="tel:+919047077677"
              className="flex items-center gap-3 text-white/90 hover:text-white group transition-colors px-3 py-1"
              aria-label="Call Sri Aurobindo Mira Universal School"
            >
              <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:bg-purple-500/35 flex items-center justify-center shrink-0 text-[#d8b4fe] transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  Phone Number
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  +91 90470 77677
                </span>
              </div>
            </a>

            <div className="hidden md:block w-[1px] h-9 bg-purple-500/25" />

            {/* Address */}
            <a
              href="https://maps.google.com/?q=School+Melakkal+Main+Road+Keelamathur+Madurai+625+019"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/90 hover:text-white group transition-colors px-3 py-1"
              aria-label="View School location on Google Maps"
            >
              <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:bg-purple-500/35 flex items-center justify-center shrink-0 text-[#d8b4fe] transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  Campus Location
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight max-w-[260px] truncate">
                  Melakkal Main Rd, Keelamathur, Madurai
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 02 VISIT OUR CAMPUS (Full 3D Campus Scene + Action Buttons)
      ========================================================================= */}
      <section
        ref={campusRef}
        id="visit-our-campus"
        className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center z-10"
      >
        {/* Section Header */}
        <div
          className={`mb-6 sm:mb-10 ${styles.revealItem} ${
            campusRevealed ? styles.revealed : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-[0.24em] text-[#d8b4fe] uppercase mb-2">
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent to-purple-500/50" />
            <span>02</span>
            <span className="w-10 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            VISIT OUR CAMPUS
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-medium">
            Your school community starts here.
          </p>
        </div>

        {/* Complete Uncropped 3D Campus Environment Layer (cn3.webp) */}
        <div
          className={`relative w-full max-w-[880px] mx-auto my-3 sm:my-6 ${
            styles.floatingCampus
          } ${styles.revealItem} ${campusRevealed ? styles.revealed : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          <Image
            src="/img/contact/cn3.webp"
            alt="Complete 3D Campus Environment with School Building, Bus, Student and Trees"
            width={1725}
            height={912}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_32px_55px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Real HTML 3D Action Buttons (GET IN TOUCH & PLAN A VISIT) */}
        <div
          className={`flex flex-wrap items-center justify-center gap-5 mt-6 sm:mt-8 ${
            styles.revealItem
          } ${campusRevealed ? styles.revealed : ""}`}
          style={{ transitionDelay: "250ms" }}
        >
          {/* 1. GET IN TOUCH */}
          <button
            type="button"
            onClick={() => scrollToForm("Admissions")}
            className={styles.button3DGetInTouch}
            aria-label="Scroll to Enquiry Form"
          >
            <Send className="w-4 h-4" />
            <span>GET IN TOUCH</span>
          </button>

          {/* 2. PLAN A VISIT */}
          <button
            type="button"
            onClick={() => scrollToForm("Campus Visit")}
            className={styles.button3DPlanVisit}
            aria-label="Plan a Campus Visit"
          >
            <Calendar className="w-4 h-4 text-[#d8b4fe]" />
            <span>PLAN A VISIT</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CONTACT ENQUIRY FORM (Glassmorphic 3D Design)
      ========================================================================= */}
      <section
        ref={formRef}
        id="enquiry-form"
        className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto z-10"
      >
        <div
          className={`text-center mb-10 ${styles.revealItem} ${
            formRevealed ? styles.revealed : ""
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/35 text-xs font-semibold text-[#d8b4fe] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" />
            <span>Direct School Communications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            WE&apos;D LOVE TO HEAR FROM YOU
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-medium">
            Have a question? Send us a message.
          </p>
        </div>

        {/* Glassmorphic 3D Form Card */}
        <div
          className={`${styles.formContainer} p-6 sm:p-10 ${styles.revealItem} ${
            formRevealed ? styles.revealed : ""
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {isSuccess ? (
            /* Success confirmation card */
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/35 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Enquiry Successfully Received!
              </h3>
              <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
                Thank you,{" "}
                <span className="text-white font-semibold">
                  {formData.fullName}
                </span>
                . Our administration office has received your enquiry regarding{" "}
                <span className="text-[#F4C542] font-semibold">
                  {formData.category}
                </span>
                . We will get back to you shortly at{" "}
                <span className="text-white font-semibold">
                  {formData.email}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(147,51,234,0.4)]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5"
                >
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className={`${styles.inputField} ${
                    errors.fullName ? "border-rose-500/80" : ""
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                />
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5"
                  >
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="name@example.com"
                    className={`${styles.inputField} ${
                      errors.email ? "border-rose-500/80" : ""
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5"
                  >
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. 98765 43210"
                    className={`${styles.inputField} ${
                      errors.phone ? "border-rose-500/80" : ""
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Enquiry Category Dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5"
                >
                  Enquiry Category <span className="text-rose-400">*</span>
                </label>
                <div
                  className={`relative rounded-xl transition-all duration-300 ${
                    categoryHighlight
                      ? "ring-2 ring-[#F4C542] shadow-[0_0_18px_rgba(244,197,66,0.6)]"
                      : ""
                  }`}
                >
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`${styles.inputField} cursor-pointer appearance-none pr-10`}
                  >
                    <option value="Admissions" className="bg-[#19102c] text-white">
                      Admissions
                    </option>
                    <option
                      value="General Enquiries"
                      className="bg-[#19102c] text-white"
                    >
                      General Enquiries
                    </option>
                    <option
                      value="Academic Office"
                      className="bg-[#19102c] text-white"
                    >
                      Academic Office
                    </option>
                    <option
                      value="Student Support"
                      className="bg-[#19102c] text-white"
                    >
                      Student Support
                    </option>
                    <option value="Transport" className="bg-[#19102c] text-white">
                      Transport
                    </option>
                    <option
                      value="Campus Visit"
                      className="bg-[#19102c] text-white"
                    >
                      Campus Visit
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5"
                >
                  Your Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How can we assist you and your family today?"
                  className={`${styles.inputField} resize-none ${
                    errors.message ? "border-rose-500/80" : ""
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(147,51,234,0.35)] hover:shadow-[0_14px_35px_rgba(147,51,234,0.55)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-white/45 mt-1">
                We respect your family&apos;s privacy. Details are strictly used
                for school correspondence.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
