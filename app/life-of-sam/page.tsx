import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import LifeOfSamClient from "@/components/life-of-sam/LifeOfSamClient";

export const metadata: Metadata = {
  title: "Life of Sam | Sri Aurobindo Mira Universal School",
  description:
    "Explore daily student life, academics, sports, creative arts, celebrations, and campus moments at Sri Aurobindo Mira Universal School.",
};

export default function LifeOfSamPage() {
  return (
    <>
      <Navbar />
      <main id="life-of-sam-main" className="w-full overflow-x-clip">
        <LifeOfSamClient />
      </main>
      <HomeFooter />
    </>
  );
}
