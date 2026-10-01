import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Aurobindo Mira Universal School | CBSE International School Madurai",
  description:
    "Sri Aurobindo Mira Universal School (CBSE, Madurai) offers holistic, values-based international education with digital classrooms, planetarium, sportsplex, and CBSE excellence.",
  keywords: [
    "Sri Aurobindo Mira",
    "CBSE School Madurai",
    "International School Madurai",
    "Best Schools in Tamil Nadu",
    "SAM Universal School",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[#fbf9f5] text-slate-800 m-0 p-0 selection:bg-[#c99738] selection:text-[#0c1b33]">
        {children}
      </body>
    </html>
  );
}
