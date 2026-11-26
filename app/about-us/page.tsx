import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import AboutUsClient from "@/components/about-us/AboutUsClient";

export const metadata: Metadata = {
  title: "About Us | Sri Aurobindo Mira Universal School",
  description:
    "Discover SAM Universe: learning beyond classrooms, joyful exploration, real-world connections, and a nurturing community where every student matters.",
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main id="hero" className="w-full overflow-x-clip">
        <AboutUsClient />
      </main>
      <HomeFooter />
    </>
  );
}
