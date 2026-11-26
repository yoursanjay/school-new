import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhySamUniverse from "@/components/WhySam/WhySamUniverse";
import HomeFooter from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Why Sam Universe | Sri Aurobindo Mira Universal School",
  description: "Discover what makes Sri Aurobindo Mira Universal School unique.",
};

export default function WhySamUniversePage() {
  return (
    <>
      <Navbar />
      <main>
        <WhySamUniverse />
      </main>
      <HomeFooter />
    </>
  );
}
