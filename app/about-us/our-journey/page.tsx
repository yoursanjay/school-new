import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import OurJourneyClient from "@/components/our-journey/OurJourneyClient";

export const metadata: Metadata = {
  title: "Our Journey | Sri Aurobindo Mira Universal School",
  description:
    "Explore the founding vision since 2001, verified campus milestones, community chronicle, and future horizon of Sri Aurobindo Mira Universal School in Madurai.",
};

export default function AboutOurJourneyPage() {
  return (
    <>
      <Navbar />
      <main
        id="hero"
        className="min-h-screen w-full overflow-x-clip bg-[#F7F5F0] pt-[84px] sm:pt-[90px]"
      >
        <OurJourneyClient />
      </main>
      <HomeFooter />
    </>
  );
}
