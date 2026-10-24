import Image from "next/image";
import { cn } from "@/lib/cn";

export interface AppLink {
  /** Store or platform name; used as the logo's alt text. */
  name: string;
  /** Link target. */
  href: string;
  /** Logo image URL. */
  logoSrc: string;
  /** Intrinsic logo size; logos are capped at 40px high. */
  width: number;
  /** Intrinsic logo height. */
  height: number;
}

// Production two_column_media (withAppButtons) logos, saved to public/images/apps. Production links all of them to
// sooner.de; the store URLs come with the real app listings.
export const defaultApps: AppLink[] = [
  { name: "Apple TV", href: "https://sooner.de", logoSrc: "/images/apps/apple-tv.svg", width: 120, height: 34 },
  { name: "Android TV", href: "https://sooner.de", logoSrc: "/images/apps/android-tv.svg", width: 120, height: 22 },
  { name: "Google Play", href: "https://sooner.de", logoSrc: "/images/apps/google-play.svg", width: 120, height: 37 },
  { name: "App Store", href: "https://sooner.de", logoSrc: "/images/apps/app-store-de.svg", width: 120, height: 40 },
  { name: "Fire TV", href: "https://sooner.de", logoSrc: "/images/apps/fire-tv.svg", width: 70, height: 37 },
];

export type TwoColumnMediaSide = "left" | "right";

export interface TwoColumnMediaProps {
  /** Playfair heading. */
  title: string;
  /** Body paragraph under the heading. */
  description?: string;
  /** Which side the image sits on from 1024px of container width (it stacks on top below); default left. */
  side?: TwoColumnMediaSide;
  /** Image URL (575:372 rounded frame); gray gradient when omitted. */
  imageSrc?: string;
  /** Image alt text; default "" (decorative). */
  imageAlt?: string;
  /** App store buttons (variation withAppButtons; { name, href, logoSrc, width, height }); defaults to the five production logos, pass [] for none. */
  apps?: AppLink[];
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Image beside a heading, text and app-store logos (production slice two_column_media / withAppButtons,
 * side[left,right]). Logos sit in a 2- then 3-column grid.
 * Use for: a dark landing slice pairing an image with text, optionally listing the apps/devices.
 * Not for: the white discover feature panel (use EditorialSlice) or questions and answers (use Faq).
 */
export function TwoColumnMedia({ title, description, side = "left", imageSrc, imageAlt = "", apps = defaultApps, className }: TwoColumnMediaProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <section className="w-full bg-black px-6 py-12 text-white @3xl:py-20">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 @5xl:grid-cols-2 @5xl:gap-0 @5xl:p-3">
          <div className={cn("min-w-0 @5xl:px-8", side === "right" && "@5xl:order-last")}>
            <div className="relative mx-auto aspect-[575/372] w-full max-w-[620px] overflow-hidden rounded-3xl bg-linear-135 from-gray-700 to-gray-800">
              {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />}
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-6 [overflow-wrap:anywhere] @5xl:pt-[52px] @5xl:pb-[119px]">
            <h2 className="m-0 font-display text-[32px] leading-9 font-bold tracking-[-1.2px] @2xl:text-5xl @2xl:leading-14">{title}</h2>
            {description && <p className="m-0 text-lg leading-[30px]">{description}</p>}
            {apps.length > 0 && (
              <ul className="m-0 grid w-full max-w-[448px] list-none grid-cols-2 gap-4 p-0 @min-[480px]:grid-cols-3">
                {apps.map((app) => (
                  <li key={app.name}>
                    <a
                      href={app.href}
                      rel="noreferrer"
                      className="flex min-h-12 min-w-0 items-center justify-center rounded p-1 transition-opacity outline-none hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-60 motion-reduce:transition-none"
                    >
                      <Image src={app.logoSrc} alt={app.name} width={app.width} height={app.height} unoptimized className="h-auto max-h-10 w-auto max-w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
