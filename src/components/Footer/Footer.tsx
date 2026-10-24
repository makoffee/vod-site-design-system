import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SocialIcons, type SocialPlatform } from "../SocialIcons/SocialIcons";
import { SoonerLogo } from "../SoonerLogo/SoonerLogo";

// The master's viewport[desktop,mobile] axis is not a prop: the layout follows the container (desktop from 768px).
// English only; German screens pass footerDe (src/i18n/de.ts).

export interface FooterLink {
  label: string;
  href: string;
}

/** The three link columns sooner.de shows (English). */
export const footerColumns: FooterLink[][] = [
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
];

export interface FundingLogo {
  name: string;
  src: string;
  width: number;
}

// Raster logos from the master; replace with SVGs once vector sources are supplied.
const creativeEuropeMedia: FundingLogo = { name: "Creative Europe Media", src: "/images/funding/creative-europe-media.png", width: 125 };

/** Default: the one logo sooner.de shows. */
export const defaultFundingLogos: FundingLogo[] = [creativeEuropeMedia];

/** Belgian site only (screens on "3 Key Screens"); the master keeps these hidden, named "· BE only". */
export const beFundingLogos: FundingLogo[] = [
  creativeEuropeMedia,
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
  /** Link columns (label + href). English default (footerColumns); pass German on DE screens (footerDe). */
  columns?: FooterLink[][];
  /** Line under the logo; default "Curated Cinema" (the brand line, the same on every site). */
  tagline?: string;
  /** Copyright line. English default; pass German on DE screens (footerDe). */
  copyright?: string;
  /** Social links shown as white 42px icons; defaults to Instagram, YouTube, Spotify, Facebook. */
  social?: { platform: SocialPlatform; href: string }[];
  /** Sponsor logos. Only Creative Europe MEDIA by default; pass beFundingLogos for the Belgian site. */
  fundingLogos?: FundingLogo[];
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Fills its container (instances are s(fill, hug) on every screen).
 * Use for: the bottom of every page screen.
 */
export function Footer({
  columns = footerColumns,
  tagline = "Curated Cinema",
  copyright = "© 2026 ContentScope GmbH • Berlin, Germany",
  social = defaultSocial,
  fundingLogos = defaultFundingLogos,
  className,
}: FooterProps) {
  return (
    // <footer> is the query container; the inner wrapper carries the layout so it can respond to it.
    <footer className={cn("@container w-full bg-black", className)}>
      <div className="flex flex-col gap-12 px-6 py-12 @3xl:gap-8">
        <div className="flex flex-col gap-8 @3xl:flex-row @3xl:pb-4">
          <div className="flex flex-1 flex-col gap-6">
            <SoonerLogo className="self-start text-white" />
            <p className="text-sm leading-6 text-white/60">{tagline}</p>
          </div>
          {columns.map((column, i) => (
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
          <p className="text-sm text-white/40 text-center @3xl:text-left">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
