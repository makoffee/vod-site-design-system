import type { AnchorHTMLAttributes } from "react";
import {
  siApple,
  siBluesky,
  siDiscord,
  siDribbble,
  siFigma,
  siGithub,
  siGoogle,
  siMedium,
  siMessenger,
  siPinterest,
  siReddit,
  siSignal,
  siSnapchat,
  siTelegram,
  siThreads,
  siTiktok,
  siTumblr,
  siTwitch,
  siVk,
  siWhatsapp,
  siX,
} from "simple-icons";
import { cn } from "@/lib/cn";

// Axes mirror the "Social Icons" master on canvas Components (dc53d585bfb82132).
export type SocialIconColor = "negative" | "original";

interface Glyph {
  title: string;
  viewBox: string;
  /** Base shape: currentColor in Negative, `original` in Original. */
  d: string;
  original: string;
  evenOdd?: boolean;
  /** Extra shapes on the base in Negative (Instagram is drawn as three shapes). */
  extra?: string[];
  /** White mark drawn over a solid base in Original (YouTube play, Facebook "f"). */
  originalMark?: string;
}

// Exported from the master (48 × 48). Instagram's Original variant is drawn in black in the design.
const fromDesign = {
  Instagram: {
    title: "Instagram",
    viewBox: "0 0 48 48",
    original: "#000100",
    evenOdd: true,
    d: "M14.11,0.14 C16.67,0.03 17.48,0 24,0 C30.52,0 31.33,0.03 33.9,0.15 C36.45,0.26 38.19,0.68 39.72,1.27 C41.29,1.88 42.64,2.7 43.97,4.03 C45.31,5.36 46.13,6.71 46.72,8.3 C47.31,9.82 47.72,11.57 47.83,14.12 C47.94,16.68 47.97,17.49 47.97,24.01 C47.97,30.53 47.94,31.34 47.83,33.9 C47.72,36.45 47.31,38.19 46.72,39.72 C46.11,41.3 45.28,42.64 43.95,43.97 C42.62,45.3 41.27,46.12 39.7,46.73 C38.18,47.32 36.43,47.74 33.88,47.85 C31.32,47.96 30.51,47.99 23.99,47.99 C17.47,47.99 16.66,47.96 14.1,47.85 C11.55,47.74 9.81,47.32 8.28,46.73 C6.71,46.12 5.36,45.3 4.03,43.97 C2.69,42.64 1.88,41.29 1.26,39.71 C0.67,38.19 0.25,36.44 0.14,33.89 C0.03,31.33 0,30.52 0,24 C0,17.48 0.03,16.67 0.14,14.1 C0.25,11.55 0.67,9.81 1.26,8.28 C1.88,6.7 2.69,5.36 4.03,4.03 C5.36,2.69 6.71,1.88 8.29,1.26 C9.81,0.67 11.56,0.25 14.11,0.14 Z M24,4.32 C30.41,4.32 31.17,4.35 33.69,4.46 C36.03,4.56 37.31,4.96 38.15,5.29 C39.27,5.72 40.07,6.25 40.9,7.08 C41.74,7.92 42.26,8.71 42.69,9.83 C43.02,10.67 43.42,11.96 43.52,14.29 C43.63,16.82 43.66,17.58 43.66,23.98 C43.66,30.39 43.63,31.16 43.52,33.68 C43.42,36.02 43.02,37.29 42.69,38.13 C42.26,39.25 41.73,40.05 40.9,40.88 C40.06,41.72 39.27,42.25 38.15,42.68 C37.31,43.01 36.02,43.4 33.69,43.5 C31.16,43.61 30.4,43.64 24,43.64 C17.59,43.64 16.83,43.61 14.31,43.5 C11.97,43.4 10.69,43.01 9.85,42.68 C8.73,42.25 7.93,41.71 7.1,40.88 C6.26,40.04 5.74,39.25 5.31,38.13 C4.98,37.29 4.58,36.01 4.48,33.68 C4.37,31.15 4.34,30.38 4.34,23.98 C4.34,17.57 4.37,16.81 4.48,14.29 C4.58,11.95 4.98,10.67 5.31,9.83 C5.74,8.71 6.27,7.91 7.1,7.08 C7.94,6.24 8.73,5.72 9.85,5.29 C10.69,4.96 11.98,4.56 14.31,4.46 C16.83,4.35 17.59,4.32 24,4.32 Z",
    extra: [
      "M11.67,24 C11.67,17.19 17.19,11.67 24,11.67 C30.81,11.67 36.33,17.19 36.33,24 C36.33,30.81 30.81,36.33 24,36.33 C17.19,36.33 11.67,30.81 11.67,24 Z M24,32 C19.58,32 16,28.42 16,24 C16,19.58 19.58,16 24,16 C28.42,16 32,19.58 32,24 C32,28.42 28.42,32 24,32 Z",
      "M39.69,11.18 C39.69,12.77 38.4,14.06 36.82,14.06 C35.23,14.06 33.94,12.76 33.94,11.18 C33.94,9.59 35.24,8.31 36.82,8.31 C38.4,8.31 39.69,9.6 39.69,11.18 Z",
    ],
  },
  YouTube: {
    title: "YouTube",
    viewBox: "0 0 48 48",
    original: "#ff0302",
    evenOdd: true,
    d: "M45.61,9.64 C47.05,11.09 47.52,14.4 47.52,14.4 C47.52,14.4 48,18.29 48,22.17 L48,25.81 C48,29.7 47.52,33.58 47.52,33.58 C47.52,33.58 47.05,36.89 45.61,38.34 C43.78,40.25 41.74,40.27 40.8,40.38 C34.09,40.86 24,40.88 24,40.88 C24,40.88 11.52,40.77 7.68,40.4 C6.61,40.19 4.21,40.25 2.38,38.34 C0.95,36.89 0.48,33.58 0.48,33.58 C0.48,33.58 0,29.69 0,25.81 L0,22.17 C0,18.29 0.49,14.4 0.49,14.4 C0.49,14.4 0.95,11.09 2.39,9.64 C4.22,7.73 6.26,7.71 7.2,7.6 C13.91,7.11 23.99,7.12 23.99,7.12 L24.01,7.12 C24.01,7.12 34.09,7.11 40.8,7.6 C41.74,7.71 43.78,7.73 45.61,9.64 Z M19.04,30.23 L19.04,16.73 L32.01,23.5 L19.04,30.23 Z",
    originalMark: "M19.14,31.14 L19.14,16.86 L31.68,24 L19.14,31.14 Z",
  },
  Spotify: {
    title: "Spotify",
    viewBox: "0 0 48 48",
    original: "#1ed760",
    evenOdd: true,
    d: "M0,23.93 C0,10.72 10.72,0 23.93,0 C37.15,0 47.85,10.72 47.85,23.93 C47.85,37.14 37.15,47.85 23.93,47.85 C10.72,47.85 0,37.14 0,23.93 Z M34.9,34.51 C34.47,35.21 33.55,35.43 32.85,35 C27.23,31.57 20.16,30.8 11.83,32.7 C11.03,32.88 10.22,32.37 10.04,31.57 C9.86,30.77 10.37,29.97 11.17,29.79 C20.28,27.71 28.09,28.61 34.4,32.46 C35.1,32.89 35.33,33.81 34.9,34.51 Z M37.83,27.99 C37.29,28.87 36.14,29.15 35.26,28.61 C28.83,24.66 19.03,23.51 11.42,25.82 C10.43,26.12 9.39,25.56 9.09,24.58 C8.79,23.59 9.36,22.55 10.34,22.25 C19.03,19.61 29.82,20.89 37.21,25.43 C38.09,25.97 38.37,27.11 37.83,27.99 Z M38.08,21.21 C30.37,16.63 17.64,16.21 10.28,18.44 C9.1,18.8 7.85,18.13 7.49,16.95 C7.13,15.77 7.8,14.52 8.98,14.16 C17.43,11.59 31.48,12.09 40.36,17.36 C41.43,17.99 41.78,19.37 41.15,20.43 C40.52,21.49 39.14,21.84 38.08,21.21 Z",
  },
  Facebook: {
    title: "Facebook",
    viewBox: "0 0 48 48",
    original: "#0866ff",
    d: "M0,24 C0,10.75 10.75,0 24,0 C37.25,0 48,10.75 48,24 C48,36.27 38.79,46.38 26.91,47.82 L26.91,31.33 L33.4,31.33 L34.75,24 L26.91,24 L26.91,21.41 C26.91,17.53 28.42,16.04 32.36,16.04 C33.58,16.04 34.57,16.07 35.14,16.13 L35.14,9.48 C34.07,9.18 31.44,8.88 29.92,8.88 C21.9,8.88 18.2,12.67 18.2,20.84 L18.2,24 L13.25,24 L13.25,31.33 L18.2,31.33 L18.2,47.29 C7.75,44.7 0,35.26 0,24 Z",
    originalMark:
      "M34.75,24 L33.4,31.33 L26.91,31.33 L26.91,47.82 C25.96,47.94 24.98,48 24,48 C22,48 20.06,47.75 18.2,47.29 L18.2,31.33 L13.25,31.33 L13.25,24 L18.2,24 L18.2,20.84 C18.2,12.67 21.9,8.88 29.92,8.88 C31.44,8.88 34.07,9.18 35.14,9.48 L35.14,16.13 C34.57,16.07 33.58,16.04 32.36,16.04 C28.43,16.04 26.91,17.53 26.91,21.41 L26.91,24 L34.75,24 Z",
  },
  LinkedIn: {
    title: "LinkedIn",
    viewBox: "0 0 48 48",
    original: "#0a66c2",
    evenOdd: true,
    d: "M3.54,0 L44.46,0 C45.4,0 46.3,0.38 46.96,1.04 C47.62,1.7 48,2.6 48,3.54 L48,44.46 C48,45.4 47.62,46.3 46.96,46.96 C46.3,47.62 45.4,48 44.46,48 L3.54,48 C2.6,48 1.7,47.62 1.04,46.96 C0.38,46.3 0,45.4 0,44.46 L0,3.54 C0,2.6 0.38,1.7 1.04,1.04 C1.7,0.38 2.6,0 3.54,0 Z M14.31,40.89 L7.09,40.89 L7.09,17.97 L14.31,17.97 L14.31,40.89 Z M10.69,14.79 C9.87,14.79 9.08,14.54 8.4,14.08 C7.72,13.62 7.19,12.98 6.88,12.22 C6.57,11.46 6.5,10.62 6.66,9.82 C6.82,9.02 7.22,8.29 7.8,7.71 C8.38,7.13 9.12,6.74 9.92,6.58 C10.72,6.42 11.55,6.51 12.31,6.82 C13.07,7.13 13.71,7.67 14.16,8.35 C14.61,9.03 14.86,9.83 14.86,10.65 C14.87,11.2 14.77,11.74 14.56,12.25 C14.35,12.76 14.05,13.21 13.66,13.6 C13.27,13.99 12.8,14.3 12.29,14.5 C11.78,14.7 11.24,14.8 10.69,14.79 Z M40.91,40.91 L33.69,40.91 L33.69,28.39 C33.69,24.7 32.13,23.55 30.1,23.55 C27.96,23.55 25.86,25.17 25.86,28.48 L25.86,40.91 L18.64,40.91 L18.64,17.98 L25.58,17.98 L25.58,21.16 L25.67,21.16 C26.37,19.75 28.81,17.34 32.53,17.34 C36.56,17.34 40.91,19.73 40.91,26.73 L40.91,40.91 Z",
  },
} satisfies Record<string, Glyph>;

// Remaining platforms on the master's axis: vector paths from simple-icons until they are exported too.
const si = (icon: { title: string; hex: string; path: string }): Glyph => ({
  title: icon.title,
  viewBox: "0 0 24 24",
  d: icon.path,
  original: `#${icon.hex}`,
});

export const socialGlyphs = {
  ...fromDesign,
  Apple: si(siApple),
  Bluesky: si(siBluesky),
  Discord: si(siDiscord),
  Dribbble: si(siDribbble),
  Figma: si(siFigma),
  Github: si(siGithub),
  Google: si(siGoogle),
  Medium: si(siMedium),
  Messenger: si(siMessenger),
  Pinterest: si(siPinterest),
  Reddit: si(siReddit),
  Signal: si(siSignal),
  Snapchat: si(siSnapchat),
  Telegram: si(siTelegram),
  Threads: si(siThreads),
  TikTok: si(siTiktok),
  Tumblr: si(siTumblr),
  Twitch: si(siTwitch),
  VK: si(siVk),
  WhatsApp: si(siWhatsapp),
  "X (Twitter)": si(siX),
} satisfies Record<string, Glyph>;

export type SocialPlatform = keyof typeof socialGlyphs;

export interface SocialIconsProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  /** negative = white glyph for dark surfaces (footer); original = brand color. */
  color?: SocialIconColor;
  /** Pixel size; the footer uses 42. */
  size?: number;
}

/** A single social glyph; renders as a link when `href` is set. */
export function SocialIcons({ platform, color = "negative", size = 42, href, className, ...props }: SocialIconsProps) {
  const glyph: Glyph = socialGlyphs[platform];
  const original = color === "original";
  const mark = original ? glyph.originalMark : undefined;
  const fill = original ? glyph.original : "currentColor";

  const svg = (
    <svg
      viewBox={glyph.viewBox}
      width={size}
      height={size}
      aria-hidden={href ? true : undefined}
      role={href ? undefined : "img"}
      aria-label={href ? undefined : glyph.title}
    >
      {/* With a white mark on top, the base is drawn solid instead of cut out. */}
      <path d={glyph.d} fill={fill} fillRule={glyph.evenOdd && !mark ? "evenodd" : undefined} />
      {glyph.extra?.map((d) => <path key={d} d={d} fill={fill} fillRule="evenodd" />)}
      {mark && <path d={mark} fill="#ffffff" />}
    </svg>
  );

  if (!href) return <span className={cn("inline-flex shrink-0 text-white", className)}>{svg}</span>;

  return (
    <a
      href={href}
      aria-label={glyph.title}
      className={cn(
        "inline-flex shrink-0 rounded-sm text-white outline-none transition-opacity hover:opacity-75",
        "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        className,
      )}
      {...props}
    >
      {svg}
    </a>
  );
}
