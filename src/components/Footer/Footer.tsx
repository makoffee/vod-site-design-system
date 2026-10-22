import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SocialIcons, type SocialPlatform } from "../SocialIcons/SocialIcons";
import { SoonerLogo } from "../SoonerLogo/SoonerLogo";

// Axes mirror the Footer master (cd51389682b4feaa): locale[en,de]. The master's viewport[desktop,mobile] axis is not a
// prop: the layout follows the container (desktop from 768px).
export type FooterLocale = "en" | "de";

const copy: Record<FooterLocale, { columns: { label: string; href: string }[][]; copyright: string }> = {
  en: {
    columns: [
      [
        { label: "Discover", href: "/discover" },
        { label: "Help & Support", href: "/help" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
      [
        { label: "Terms", href: "/terms" },
        { label: "Imprint", href: "/imprint" },
        { label: "Partner Program", href: "/partners" },
      ],
      [
        { label: "Press", href: "/press" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    ],
    copyright: "© 2026 ContentScope GmbH • Berlin, Germany",
  },
  de: {
    columns: [
      [
        { label: "Discover", href: "/discover" },
        { label: "Hilfe & Support", href: "/help" },
        { label: "Blog", href: "/blog" },
        { label: "Kontakt", href: "/contact" },
      ],
      [
        { label: "AGB", href: "/terms" },
        { label: "Impressum", href: "/imprint" },
        { label: "Partnerprogramm", href: "/partners" },
      ],
      [
        { label: "Presse", href: "/press" },
        { label: "Datenschutz", href: "/privacy" },
        { label: "Cookie-Richtlinie", href: "/cookies" },
      ],
    ],
    copyright: "© 2026 ContentScope GmbH • Adlershof-Berlin, Deutschland",
  },
};

// Raster logos from the master; replace with SVGs once vector sources are supplied.
const fundingLogos = [
  { name: "Creative Europe Media", src: "/images/funding/creative-europe-media.png", width: 125 },
  { name: "Fédération Wallonie-Bruxelles", src: "/images/funding/federation-wallonie-bruxelles.png", width: 44 },
  { name: "VAF", src: "/images/funding/vaf.png", width: 74 },
];

const defaultSocial: { platform: SocialPlatform; href: string }[] = [
  { platform: "Instagram", href: "https://www.instagram.com/" },
  { platform: "YouTube", href: "https://www.youtube.com/" },
  { platform: "Spotify", href: "https://open.spotify.com/" },
  { platform: "Facebook", href: "https://www.facebook.com/" },
];

export interface FooterProps {
  locale?: FooterLocale;
  /** Defaults to "Curated Cinema" in both locales (every screen uses the default). */
  tagline?: string;
  /** Instance override, e.g. "… • Adlershof-Berlin, Germany" on the marketing pages. */
  copyright?: string;
  social?: { platform: SocialPlatform; href: string }[];
  className?: string;
}

/** Fills its container (instances are s(fill, hug) on every screen). */
export function Footer({ locale = "en", tagline = "Curated Cinema", copyright, social = defaultSocial, className }: FooterProps) {
  const t = copy[locale];

  return (
    // <footer> is the query container; the inner wrapper carries the layout so it can respond to it.
    <footer className={cn("@container w-full bg-black", className)}>
      <div className="flex flex-col gap-12 px-6 py-12 @3xl:gap-8">
        <div className="flex flex-col gap-8 @3xl:flex-row @3xl:pb-4">
          <div className="flex flex-1 flex-col gap-6">
            <SoonerLogo className="self-start" />
            <p className="text-sm leading-6 text-white/60">{tagline}</p>
          </div>
          {t.columns.map((column, i) => (
            <ul key={i} className="flex flex-1 flex-col gap-2">
              {column.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm leading-6 text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 @3xl:flex-row @3xl:justify-between">
          <div className="flex items-center gap-6">
            {fundingLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={42}
                style={{ width: "auto" }}
                className="h-[42px] object-contain"
              />
            ))}
          </div>
          <div className="flex items-center gap-6">
            {social.map((s) => (
              <SocialIcons key={s.platform} platform={s.platform} href={s.href} color="negative" size={42} />
            ))}
          </div>
        </div>

        <div className="border-t border-sooner-primary/20 pt-8">
          {/* Design gap: white/40 on black is 3.65:1, below WCAG AA (4.5:1). Kept as designed. */}
          <p className="text-sm text-white/40 text-center @3xl:text-left">{copyright ?? t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
