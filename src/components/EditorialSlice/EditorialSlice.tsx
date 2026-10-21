import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BinocularMask } from "../_shared/BinocularMask";

/** image = full-bleed half panel; mask = image clipped to the Sooner binocular. */
export type EditorialMedia = "image" | "mask";
/** Which side the media sits on from 768px of container width (it always stacks on top below). */
export type EditorialSide = "left" | "right";

export interface EditorialCta {
  label: string;
  href: string;
  /** Optional leading icon (e.g. a Spotify glyph for the podcast slice). */
  icon?: ReactNode;
}

export interface EditorialContentProps {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: EditorialCta;
  /** Title level; slices sit under page-level h1/h2 rows. */
  as?: "h2" | "h3";
}

/** Text block shared by EditorialSlice and CollectionFeature (design "ContentBlock"). */
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
          <Link
            href={cta.href}
            className="inline-flex h-12 items-center gap-2 rounded-sooner bg-black px-6 text-base font-medium text-white transition-colors hover:bg-gray-900 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sooner-primary"
          >
            {cta.icon}
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}

export interface EditorialSliceProps extends EditorialContentProps {
  media?: EditorialMedia;
  side?: EditorialSide;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * White editorial panel on discover (design "EditorialSlice", master axes media[image,mask] × side[left,right]):
 * a festival/collection/podcast feature. image splits text and a full-bleed image; mask clips the image to the
 * Sooner binocular. Stacks (media on top) below 768px of container width.
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
