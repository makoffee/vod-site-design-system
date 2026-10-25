import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ActionLink } from "../_shared/ActionLink";
import { BinocularMask } from "../_shared/BinocularMask";

/** image = full-bleed half panel; mask = image clipped to the Sooner binocular. */
export type EditorialMedia = "image" | "mask";
/** Which side the media sits on from 768px of container width (it always stacks on top below). */
export type EditorialSide = "left" | "right";

export interface EditorialCta {
  /** Button text. */
  label: string;
  /** Link target. */
  href: string;
  /** Optional leading icon (e.g. a Spotify glyph for the podcast slice). */
  icon?: ReactNode;
}

export interface EditorialContentProps {
  /** Small uppercase gray label above the title; omitted when empty. */
  eyebrow?: string;
  /** Playfair heading text. */
  title: string;
  /** Body paragraph under the title; omitted when empty. */
  description?: string;
  /** Black link button under the text ({ label, href, icon? }); omitted when unset. */
  cta?: EditorialCta;
  /** Title level; slices sit under page-level h1/h2 rows. Default h2. */
  as?: "h2" | "h3";
}

/** Text block shared by EditorialSlice and CollectionFeature. */
export function EditorialContent({ eyebrow, title, description, cta, as: Heading = "h2" }: EditorialContentProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex flex-col gap-3">
        {eyebrow && <p className="m-0 text-xs leading-4 font-bold tracking-[0.3px] text-gray-600 uppercase">{eyebrow}</p>}
        <Heading className="m-0 font-display text-[32px] leading-9 font-normal tracking-[-1.2px] text-gray-900 @3xl:text-5xl @3xl:leading-none">
          {title}
        </Heading>
      </div>
      {description && <p className="m-0 text-lg leading-[1.64] text-gray-700">{description}</p>}
      {cta && (
        <div className="pt-4">
          {/* Black action on the white panel; a violet focus ring, since white would vanish here. */}
          <ActionLink label={cta.label} href={cta.href} icon={cta.icon} tone="black" className="focus-visible:outline-sooner-primary" />
        </div>
      )}
    </div>
  );
}

export interface EditorialSliceProps extends EditorialContentProps {
  /** image = full-bleed half panel (default); mask = image clipped to the Sooner binocular. */
  media?: EditorialMedia;
  /** Which side the media sits on from 768px of container width; default right. */
  side?: EditorialSide;
  /** Image URL; a gray gradient placeholder shows when omitted. */
  imageSrc?: string;
  /** Image alt text; default "" (decorative). */
  imageAlt?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * White editorial panel on discover (media[image,mask] × side[left,right]):
 * a festival/collection/podcast feature. image splits text and a full-bleed image; mask clips the image to the
 * Sooner binocular. Stacks (media on top) below 768px of container width.
 * Use for: a standalone text + image feature (festival, collection, podcast) between discover rows.
 * Not for: a collection intro followed by its film cards (use CollectionFeature) or a dark landing teaser with a film row (use FeaturedCollectionBlock).
 */
export function EditorialSlice({ media = "image", side = "right", imageSrc, imageAlt = "", className, ...content }: EditorialSliceProps) {
  const picture = imageSrc && <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />;
  const mediaOrder = side === "right" && "@3xl:order-last";

  if (media === "mask") {
    return (
      <section className={cn("@container w-full overflow-hidden rounded-2xl bg-white", className)}>
        <div className="grid items-center gap-8 p-6 @3xl:grid-cols-2 @3xl:gap-16 @3xl:px-16 @3xl:py-8">
          <BinocularMask className={cn(mediaOrder)}>{picture}</BinocularMask>
          <EditorialContent {...content} />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("@container w-full overflow-hidden rounded-2xl bg-white", className)}>
      <div className="grid @3xl:min-h-[400px] @3xl:grid-cols-2">
        <div className={cn("relative min-h-60 bg-linear-135 from-gray-700 to-gray-800 @3xl:min-h-0", mediaOrder)}>{picture}</div>
        <div className="p-6 @3xl:p-16">
          <EditorialContent {...content} />
        </div>
      </div>
    </section>
  );
}
