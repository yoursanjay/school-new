import KingfisherSection from "@/components/KingfisherSection";
import Navbar from "@/components/Navbar";
import ScrollCanvasBackground from "@/components/ScrollCanvasBackground";
import SchoolExperiencesSection from "@/components/sections/SchoolExperiences";
import SchoolStorySection from "@/components/sections/SchoolStory";
import SchoolFAQ from "@/components/school/SchoolFAQ";
import SchoolFooter from "@/components/school/SchoolFooter";
import SchoolJournal from "@/components/school/SchoolJournal";
import SchoolTestimonials from "@/components/school/SchoolTestimonials";
import { schoolMono, schoolSerif } from "@/components/school/typography";

export default function Home() {
  return (
    <>
      <Navbar hideDuringKingfisher />
      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        <section id="hero" className="frame-sequence relative">
          <ScrollCanvasBackground />
        </section>
        <KingfisherSection />
        <SchoolExperiencesSection />
        <SchoolStorySection />

        <div
          className={`school-sections ${schoolSerif.variable} ${schoolMono.variable}`}
        >
          <SchoolJournal />
          <SchoolTestimonials />
          <SchoolFAQ />
          <SchoolFooter />
        </div>
      </main>
    </>
  );
}
