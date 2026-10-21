import { DM_Sans, Playfair_Display } from "next/font/google";

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  // Variable font (400–900): editorial titles are 400, quote sources 600, display 700/800, promo titles 900.
});

export const fontVariables = `${dmSans.variable} ${playfairDisplay.variable}`;
