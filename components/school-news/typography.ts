import {
  Barlow_Condensed,
  Caveat,
  JetBrains_Mono,
  Montserrat,
} from "next/font/google";

export const newsCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-news-condensed",
  display: "swap",
});

export const newsBody = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-news-body",
  display: "swap",
});

export const newsScript = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-news-script",
  display: "swap",
});

export const newsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-news-mono",
  display: "swap",
});
