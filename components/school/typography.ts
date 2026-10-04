import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const schoolSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-school-serif",
});

export const schoolMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-school-mono",
});
