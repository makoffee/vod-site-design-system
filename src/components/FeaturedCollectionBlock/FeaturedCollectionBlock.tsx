import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FeedRow, type FeedKind } from "../FeedRow/FeedRow";
import { ActionLink, type Action } from "../_shared/ActionLink";

/** Which side the copy sits on; the film row always spans the full width. */
export type FeaturedCollectionSide = "left" | "right";

export interface FeaturedCollectionBlockProps {
  /** Small caps label above the title (hidden on the current landing design). */
  eyebrow?: string;
  /** Line breaks are kept ("Curated cinema.\nYour choice."). */
  title: string;
  /** Bold opening sentence of the description. */
  lead?: string;
  description?: string;
  cta?: Action;
  side?: FeaturedCollectionSide;
  imageSrc?: string;
  imageAlt?: string;
  /** The collection's cards, shown in a FeedRow without a header. */
  children?: ReactNode;
  /** Feed type of the row (tall boxart by default; wide stills or square tiles also work). */
  kind?: FeedKind;
  /** Accessible name of the film row; defaults to the title. */
  rowLabel?: string;
  /** Passed to the film row (German screens). */
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
}

/**
 * Landing collection teaser (design and production slice "featured_collection_block", master axis side[left,right]):
 * full-bleed artwork fading to black at top and bottom, a 620px copy column with a violet CTA, and a FeedRow of
 * the collection inside the artwork's bounds (any feed kind; the master nests a FeedRow instance). The artwork band
 * shrinks with the container (256px top inset from 1024px).
 */
export function FeaturedCollectionBlock({
  eyebrow,
  title,
  lead,
  description,
  cta,
  side = "left",
  imageSrc,
  imageAlt = "",
  children,
  kind = "tall",
  rowLabel,
  previousLabel,
  nextLabel,
  className,
}: FeaturedCollectionBlockProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <section className="relative isolate w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 -z-10 bg-linear-135 from-gray-700 to-gray-800">
          {imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover" />}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#000_0%,rgb(0_0_0/0)_24.729%,rgb(0_0_0/0.2)_48.928%,#000_93.229%)]"
        />

        <div className="flex flex-col gap-5 px-6 pt-16 pb-10 @2xl:px-12 @2xl:pt-24 @5xl:px-20 @5xl:pt-64 @5xl:pb-16">
          <div
            className={cn(
              "flex w-full max-w-[620px] flex-col gap-6 pb-8 @2xl:pb-16",
              side === "right" ? "items-end self-end text-right" : "items-start",
            )}
          >
            {eyebrow && <p className="m-0 text-xs leading-4 font-bold tracking-[0.3px] text-white/70 uppercase">{eyebrow}</p>}
            <h2 className="m-0 font-display text-[32px] leading-9 font-bold tracking-[-1.2px] whitespace-pre-line @2xl:text-5xl @2xl:leading-14">
              {title}
            </h2>
            {(lead || description) && (
              <p className="m-0 text-base leading-[26px] @2xl:text-lg @2xl:leading-[30px]">
                {lead && <strong>{lead}</strong>}
                {lead && description && " "}
                {description}
              </p>
            )}
            {cta && (
              <div className="pt-2 @2xl:pt-6">
                <ActionLink {...cta} />
              </div>
            )}
          </div>
          {children && (
            <FeedRow kind={kind} label={rowLabel ?? title} previousLabel={previousLabel} nextLabel={nextLabel}>
              {children}
            </FeedRow>
          )}
        </div>
      </section>
    </div>
  );
}
