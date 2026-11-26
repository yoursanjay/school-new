import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Why Sam Universe | Sri Aurobindo Mira Universal School",
  description: "Discover what makes Sri Aurobindo Mira Universal School unique.",
};

export default function AboutWhySamUniversePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#fbf9f5] pt-28 pb-12" />
      <HomeFooter />
    </>
  );
}
