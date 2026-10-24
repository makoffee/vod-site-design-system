import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BinocularMask } from "../_shared/BinocularMask";

export interface MaskTileProps {
  /** Collection title, centred in Playfair over the image. */
  title: string;
  /** Collection link; the whole tile is the link. */
  href: string;
  /** Artwork, shown grayscale and clipped to the binocular shape. */
  imageSrc?: string;
  /** Violet duotone wash (the first tile in the design row). */
  tinted?: boolean;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Collection tile clipped to the binocular shape with a centred Playfair title (design "Collection row with icon-mask").
 * Use for: collection tiles in a FeedRow kind="wide" (discover "Collections").
 * Not for: a collection intro with text and CTA (use EditorialSlice) or channel squares (use ChannelTile).
 */
export function MaskTile({ title, href, imageSrc, tinted = false, className }: MaskTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/mask block w-full rounded-sooner outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        className,
      )}
    >
      <BinocularMask className="transition-transform duration-200 ease-out motion-safe:group-hover/mask:scale-[1.03]">
        {imageSrc && <Image src={imageSrc} alt="" fill sizes="(max-width: 640px) 80vw, 33vw" className="object-cover grayscale" />}
        {tinted && <div className="absolute inset-0 bg-sooner-primary mix-blend-multiply" />}
        <span className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-[28px] leading-8 text-white [text-shadow:var(--text-shadow-on-image)]">
          {title}
        </span>
      </BinocularMask>
    </Link>
  );
}
