import {
  Barlow_Condensed,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";

export const transportCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-tr-condensed",
  display: "swap",
});

export const transportBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-tr-body",
  display: "swap",
});

export const transportMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-tr-mono",
  display: "swap",
});
