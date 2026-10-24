import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ChannelTileProps {
  /** Channel name; accessible name of the link, printed on the tile when there is no artwork. */
  name: string;
  /** Channel page link; the whole tile is the link. */
  href: string;
  /** Square artwork; channel art carries its own name, so the image is decorative. */
  imageSrc?: string;
  /** Placeholder colour class (bg-*) when there is no artwork. */
  tint?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Square channel / festival / curator tile (production channels ScrollSlider slide;
 * also director focus rows): rounded-[10px] artwork, scales to 1.05 on hover.
 * Without artwork it prints the name so demos stay legible.
 * Use for: channel, festival and curator squares in a FeedRow kind="square".
 * Not for: tag collections with a title over the art (use ChannelTagTile) or genres (use GenreTile).
 */
export function ChannelTile({ name, href, imageSrc, tint, className }: ChannelTileProps) {
  return (
    <Link
      href={href}
      aria-label={name}
      className={cn(
        "group/tile block w-full rounded-sooner no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sooner transition-transform duration-200 ease-out motion-safe:group-hover/tile:scale-105",
          tint ?? "bg-linear-135 from-gray-700 to-gray-800",
        )}
      >
        {imageSrc ? (
          <Image src={imageSrc} alt="" fill sizes="(max-width: 640px) 45vw, 16vw" className="object-cover" />
        ) : (
          <span className="px-4 text-center text-lg leading-6 font-bold text-white uppercase">{name}</span>
        )}
      </div>
    </Link>
  );
}
