import ScrollCanvasBackground from "@/components/ScrollCanvasBackground";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative w-full bg-[#fbf9f5] overflow-x-clip">
        <section id="hero" className="frame-sequence relative">
          <ScrollCanvasBackground />
        </section>
      </main>
    </>
  );
}
