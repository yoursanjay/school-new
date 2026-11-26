import {
  Barlow_Condensed,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";

export const losCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-los-condensed",
  display: "swap",
});

export const losBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-los-body",
  display: "swap",
});

export const losMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-los-mono",
  display: "swap",
});
