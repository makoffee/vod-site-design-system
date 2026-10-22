import Image from "next/image";
import { cn } from "@/lib/cn";
import { ActionLink, type Action } from "../_shared/ActionLink";
import { Pill } from "../_shared/Pill";

/** full = full-bleed page hero (landing "Hero"); contained = rounded banner inside the page gutters (production slice image_cta_banner). */
export type ImageCtaBannerLayout = "full" | "contained";
export type ImageCtaBannerAlign = "left" | "center" | "right";

export interface ImageCtaBannerProps {
  layout?: ImageCtaBannerLayout;
  align?: ImageCtaBannerAlign;
  /** Pill above the title, e.g. "Sooner recommends". */
  eyebrow?: string;
  title: string;
  /** Bold lead under the hero title (full layout). */
  subtitle?: string;
  /** Body line: the rental note on the hero, the supporting sentence on the contained banner. */
  description?: string;
  actions?: Action[];
  imageSrc?: string;
  imageAlt?: string;
  /** The landing hero is the page's h1; banners further down are h2. */
  as?: "h1" | "h2";
  className?: string;
}

const column: Record<ImageCtaBannerAlign, string> = {
  left: "items-start text-left",
  center: "mx-auto items-center text-center",
  right: "ml-auto items-end text-right",
};

const actionRow: Record<ImageCtaBannerAlign, string> = {
  left: "@2xl:justify-start",
  center: "@2xl:justify-center",
  right: "@2xl:justify-end",
};

/**
 * Image banner with a call to action (design "Hero" + "ContainedBanner", master axes layout[full,contained] ×
 * align[left,center,right]). full is the landing hero (production hero banner): full-bleed artwork fading to black,
 * Playfair 58 title, lead and rental note. contained is the closing banner (production image_cta_banner): a 420px
 * rounded box with a Playfair 48 title. Actions stack full-width below 672px of container width.
 */
export function ImageCtaBanner({
  layout = "contained",
  align = layout === "full" ? "left" : "center",
  eyebrow,
  title,
  subtitle,
  description,
  actions = [],
  imageSrc,
  imageAlt = "",
  as: Heading = layout === "full" ? "h1" : "h2",
  className,
}: ImageCtaBannerProps) {
  const full = layout === "full";

  return (
    <div className={cn("@container w-full", className)}>
      <section
        className={cn(
          "relative isolate flex w-full overflow-hidden bg-black text-white",
          full
            ? "min-h-[560px] flex-col justify-end px-6 pt-24 pb-10 @2xl:min-h-[865px] @2xl:justify-center @2xl:px-20 @2xl:pt-[200px] @2xl:pb-8"
            : "min-h-[420px] items-center rounded-2xl px-6 py-12 @2xl:px-10 @2xl:py-16 @5xl:px-20",
        )}
      >
        <div className="absolute inset-0 -z-10 bg-linear-135 from-gray-700 to-gray-800">
          {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover" />}
        </div>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            full
              ? "bg-[linear-gradient(to_bottom,rgb(0_0_0/0.2)_70%,#000_100%)]"
              : "bg-[linear-gradient(180deg,rgb(0_0_0/0.2)_45%,rgb(0_0_0/0.6)_100%)]",
          )}
        />

        <div className={cn("flex w-full flex-col gap-6 break-words", full ? "max-w-[920px]" : "max-w-[890px]", column[align])}>
          {eyebrow && <Pill>{eyebrow}</Pill>}
          <Heading
            className={cn(
              "m-0 font-display whitespace-pre-line",
              full
                ? "text-4xl leading-tight font-extrabold tracking-[-1.5px] @2xl:text-[58px] @2xl:leading-[72px]"
                : "text-[32px] leading-9 font-bold tracking-[-1.2px] @2xl:text-5xl @2xl:leading-14",
            )}
          >
            {title}
          </Heading>
          {subtitle && (
            <p className="m-0 text-lg leading-relaxed font-bold tracking-[0.45px] text-gray-200 @2xl:text-2xl @2xl:leading-[34px]">{subtitle}</p>
          )}
          {description && (
            <p
              className={cn(
                "m-0 whitespace-pre-line",
                full ? "max-w-[896px] text-base leading-6 font-bold" : "text-base leading-[26px] @2xl:text-lg @2xl:leading-[30px]",
              )}
            >
              {description}
            </p>
          )}
          {actions.length > 0 && (
            <div
              className={cn(
                "flex w-full flex-col items-stretch @2xl:w-auto @2xl:flex-row @2xl:flex-wrap",
                full ? "gap-3 pt-2 @2xl:gap-4 @2xl:pt-10" : "gap-4 pt-6 @2xl:pt-10 @2xl:pb-2",
                actionRow[align],
              )}
            >
              {actions.map((action) => (
                <ActionLink key={action.href + action.label} {...action} uppercase className="w-full @2xl:w-auto" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
