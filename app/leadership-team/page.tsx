import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import LeadershipTeamClient from "@/components/leadership-team/LeadershipTeamClient";

export const metadata: Metadata = {
  title: "Leadership Team | Sri Aurobindo Mira Universal School",
  description:
    "Visionary leaders, trustees, and mentors guiding Sri Aurobindo Mira Universal School.",
};

export default function LeadershipTeamPage() {
  return (
    <>
      <Navbar />
      <main id="hero" className="w-full bg-[#fbf9f5] overflow-x-clip">
        <LeadershipTeamClient />
      </main>
      <HomeFooter />
    </>
  );
}
