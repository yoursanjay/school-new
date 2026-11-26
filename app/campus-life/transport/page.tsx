import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import TransportPageContent from "@/components/transport/TransportPageContent";

export const metadata: Metadata = {
  title: "Transport | Sri Aurobindo Mira Universal School",
  description:
    "Safe, supervised and reliable school transport for every student at Sri Aurobindo Mira Universal School, Madurai. Learn about our routes, safety measures and dedicated transport team.",
};

export default function CampusTransportPage() {
  return (
    <>
      <Navbar />
      <main className="w-full overflow-x-clip">
        <TransportPageContent />
      </main>
      <HomeFooter />
    </>
  );
}
