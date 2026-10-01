"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ScrollCanvasBackground from "@/components/ScrollCanvasBackground";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* High-Z Sticky / Glassmorphic Navigation with Top Scroll Progress */}
      <Navbar />

      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        {/* Hero: Preserved Existing Frame 1 Classroom Scroll Animation */}
        <section id="hero" className="frame-sequence relative">
          <ScrollCanvasBackground />
        </section>

        {/* Section 01: About / School Story */}
        <AboutSection />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </>
  );
}
