import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";

export const metadata: Metadata = {
  title: "Sports | Sri Aurobindo Mira Universal School",
  description: "Sports and athletic programs at Sri Aurobindo Mira Universal School.",
};

export default function SportsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#fbf9f5] pt-28 pb-12" />
      <HomeFooter />
    </>
  );
}
