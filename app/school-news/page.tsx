import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SchoolNewsClient from "@/components/school-news/SchoolNewsClient";

export const metadata: Metadata = {
  title: "School News | Sri Aurobindo Mira Universal School",
  description:
    "Explore campus stories, academic highlights, sports energy, creative arts, and announcements from Sri Aurobindo Mira Universal School.",
};

export default function SchoolNewsPage() {
  return (
    <>
      <Navbar />
      <main id="school-news-main" className="w-full overflow-x-clip">
        <SchoolNewsClient />
      </main>
      <HomeFooter />
    </>
  );
}
