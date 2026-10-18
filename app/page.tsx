import Navbar from "@/components/Navbar";
import ScrollCanvasBackground from "@/components/ScrollCanvasBackground";
import AcademyOdysseySection from "@/components/sections/AcademyOdyssey";
import SchoolExperiencesSection from "@/components/sections/SchoolExperiences";
import SchoolStorySection from "@/components/sections/SchoolStory";
import HomeSchoolUpdateSection from "@/components/HomeSchoolUpdateSection";
import WebsiteContentRevisionSection from "@/components/WebsiteContentRevisionSection";
import HomeNewsUpdatesSection from "@/components/HomeNewsUpdatesSection";
import NewsSection from "@/components/NewsSection";
import ParentsTestimonialsSection from "@/components/ParentsTestimonialsSection";
import SchoolFAQ from "@/components/school/SchoolFAQ";
import HomeFooter from "@/components/HomeFooter";
import { schoolMono, schoolSerif } from "@/components/school/typography";
import SchoolJournal from "@/components/school/SchoolJournal";

export default function Home() {
  return (
    <>
      <Navbar hideDuringKingfisher />
      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        <section id="hero" className="frame-sequence relative">
          <ScrollCanvasBackground />
        </section>
        <AcademyOdysseySection />
        <SchoolExperiencesSection />
        <SchoolStorySection />
        <HomeSchoolUpdateSection />
        <WebsiteContentRevisionSection />
        <HomeNewsUpdatesSection />
        <div
          className={`school-sections ${schoolSerif.variable} ${schoolMono.variable}`}
        >
          <SchoolJournal />
          <NewsSection />
          <ParentsTestimonialsSection />
          <SchoolFAQ />
          <HomeFooter />
        </div>
      </main>
    </>
  );
}
