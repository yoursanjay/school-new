import Navbar from "@/components/Navbar";
import SecondScrollSequence from "@/components/SecondScrollSequence";
import AboutOurSchoolSection from "@/components/AboutOurSchoolSection";
import StudentLifeSection from "@/components/StudentLifeSection";
import AcademicsSection from "@/components/AcademicsSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import GallerySection from "@/components/GallerySection";
import StudentReviewsSection from "@/components/StudentReviewsSection";
import AdmissionsSection from "@/components/AdmissionsSection";
import CinematicFooter from "@/components/CinematicFooter";

export default function GardenPage() {
  return (
    <>
      <Navbar />
      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        <SecondScrollSequence />
        <AboutOurSchoolSection />
        <StudentLifeSection />
        <AcademicsSection />
        <FacilitiesSection />
        <GallerySection />
        <StudentReviewsSection />
        <AdmissionsSection />
        <CinematicFooter />
      </main>
    </>
  );
}
