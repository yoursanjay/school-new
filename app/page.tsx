"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ScrollCanvasBackground from "@/components/ScrollCanvasBackground";
import AboutOurSchoolSection from "@/components/AboutOurSchoolSection";
import AcademicsSection from "@/components/AcademicsSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import StudentReviewsSection from "@/components/StudentReviewsSection";
import CinematicFooter from "@/components/CinematicFooter";

export default function Home() {
  return (
    <>
      {/* High-Z Sticky / Glassmorphic Navigation with Top Scroll Progress */}
      <Navbar />

      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        {/* Hero / sequence: kept intact while using a single uninterrupted frame timeline */}
        <section id="hero" className="frame-sequence relative">
          <ScrollCanvasBackground />
        </section>

        <AboutOurSchoolSection />
        <AcademicsSection />
        <FacilitiesSection />
        <StudentReviewsSection />
        <CinematicFooter />
      </main>
    </>
  );
}
