import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | Sri Aurobindo Mira Universal School",
  description:
    "Get in touch with Sri Aurobindo Mira Universal School, Madurai. Enquire about admissions, student support, transport, and campus visits.",
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <main className="w-full overflow-x-clip">
        <ContactPageContent />
      </main>
      <HomeFooter />
    </>
  );
}
