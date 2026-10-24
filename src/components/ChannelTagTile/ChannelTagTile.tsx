import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ChannelTagTileProps {
  /** Tag/collection name, centred bold white over the artwork. */
  title: string;
  /** Tag/collection link; the whole tile is the link. */
  href: string;
  /** Background artwork under a bottom scrim; gray gradient placeholder when omitted. */
  imageSrc?: string;
  /** landscape = film page "Featured in" (339×200); square = channels page tag collections. */
  aspect?: "landscape" | "square";
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Landscape channel tile with a centred title (film page "Featured in" row, production "Enthalten in"):
 * artwork under a black 0 → 30% scrim, bold white/90 title (20px landscape, 16px square), rounded-sooner, scales to 1.05 on hover.
 * Use for: film page "Featured in" (FeedRow kind="wide") and channels-page tag collections (FeedRow kind="square", aspect="square").
 * Not for: channel art that carries its own name (use ChannelTile).
 */
export function ChannelTagTile({ title, href, imageSrc, aspect = "landscape", className }: ChannelTagTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/tag block w-full rounded-sooner outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-sooner bg-linear-135 from-gray-700 to-gray-800 p-4 transition-transform duration-200 ease-out motion-safe:group-hover/tag:scale-105",
          aspect === "landscape" ? "aspect-[339/200]" : "aspect-square",
        )}
      >
        {imageSrc && <Image src={imageSrc} alt="" fill sizes="(max-width: 640px) 80vw, 25vw" className="object-cover" />}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30" />
        <h3
          className={cn(
            "relative m-0 text-center font-bold text-white/90",
            aspect === "landscape" ? "text-xl leading-5" : "text-base leading-5",
          )}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
