import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Announcement Poster | Sri Aurobindo Mira Universal School",
  description: "Latest announcement and event poster from Sri Aurobindo Mira Universal School.",
};

export default function PosterPage() {
  return (
    <main className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#0c1b33]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative flex flex-col items-center max-w-[92vw] max-h-[94vh] m-auto">
        {/* Close Button Above Poster */}
        <div className="w-full flex items-center justify-center mb-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white text-[#0c1b33] font-bold text-xs uppercase tracking-wider border-2 border-[#c99738] shadow-xl hover:bg-[#fbf9f5] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#c99738]"
            aria-label="Close poster and go to home"
          >
            <span>Close & Go to Home</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Poster Card */}
        <div className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#08080a] max-h-[calc(85vh-54px)] max-w-[min(90vw,480px)]">
          <Image
            src="/img/poster.webp"
            alt="School Poster"
            width={689}
            height={1078}
            priority
            className="block w-auto h-auto max-w-full max-h-[calc(85vh-54px)] object-contain rounded-2xl select-none"
          />
        </div>
      </div>
    </main>
  );
}
