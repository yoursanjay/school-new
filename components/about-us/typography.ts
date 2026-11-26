import {
  Fredoka,
  Montserrat,
  Barlow_Condensed,
  Caveat,
} from "next/font/google";

export const aboutRounded = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-about-rounded",
  display: "swap",
});

export const aboutBlock = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-about-block",
  display: "swap",
});

export const aboutCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-about-condensed",
  display: "swap",
});

export const aboutScript = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-about-script",
  display: "swap",
});
