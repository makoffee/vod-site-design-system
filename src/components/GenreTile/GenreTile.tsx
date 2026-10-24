import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type GenreTint = "violet" | "yellow" | "magenta" | "pink" | "red" | "green";

const tints: Record<GenreTint, string> = {
  violet: "bg-genre-violet/50",
  yellow: "bg-genre-yellow/50",
  magenta: "bg-genre-magenta/50",
  pink: "bg-genre-pink/50",
  red: "bg-genre-red/50",
  green: "bg-genre-green/50",
};

export interface GenreTileProps {
  /** Genre name, bold in the bottom-left corner. */
  name: string;
  /** Genre page link; the whole tile is the link. */
  href: string;
  /** Colour wash over still and title: violet | yellow | magenta | pink | red | green (genre-* tokens at 50%). */
  tint: GenreTint;
  /** 16:9 still; gray gradient placeholder when omitted. */
  imageSrc?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Genre entry on the categories page (design "Genres | 1440px", master GenreTile): 16:9 still under a 50% hard-light colour wash
 * that also tints the bold title (18px below 280px of tile width, 28px above), rounded-[14px] with a white/10 inner border.
 * Use for: the genre grid on the categories page.
 * Not for: channel/festival squares (use ChannelTile) or collection tiles (use MaskTile or ChannelTagTile).
 */
export function GenreTile({ name, href, tint, imageSrc, className }: GenreTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "@container group/genre block w-full rounded-[14px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <div className="relative isolate flex aspect-video w-full items-end overflow-hidden rounded-[14px] bg-linear-135 from-gray-500 to-gray-700 p-3 inset-ring @[280px]:p-4 inset-ring-white/10">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover/genre:scale-105"
          />
        )}
        <span className="relative text-lg leading-none font-bold text-white @[280px]:text-[28px]">{name}</span>
        <div className={cn("pointer-events-none absolute inset-0 mix-blend-hard-light", tints[tint])} />
      </div>
    </Link>
  );
}
