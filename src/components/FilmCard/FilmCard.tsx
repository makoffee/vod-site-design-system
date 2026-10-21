import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FilmBadge } from "../FilmBadge/FilmBadge";
import { SoonerBasket } from "../_shared/icons";

export type FilmCardAspect = "tall" | "wide";

export interface FilmCardProps {
  title: string;
  href: string;
  /** tall = 3:4 boxart (default), wide = 16:9 still. */
  aspect?: FilmCardAspect;
  imageSrc?: string;
  /** Top-left badge, e.g. "Exclusive". */
  badge?: string;
  /** Shows the violet rent basket (film is rentable). */
  rentable?: boolean;
  /** Coming-soon date shown as "From {availableFrom}" (de "Ab"). */
  availableFrom?: string;
  availableLabel?: string;
  /** Accessible name; production uses "Title. Directed by … . Year. Runtime. Genres." */
  ariaLabel?: string;
  /** Image `sizes`; defaults to production's feed value. */
  sizes?: string;
  className?: string;
}

/** Feed poster card (production `.filmcard`). Fills its feed slot; the artwork sets the height. */
export function FilmCard({
  title,
  href,
  aspect = "tall",
  imageSrc,
  badge,
  rentable = false,
  availableFrom,
  availableLabel = "From",
  ariaLabel,
  sizes = "(max-width: 640px) 30vw, (max-width: 900px) 25vw, 20vw",
  className,
}: FilmCardProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? title}
      className={cn(
        "group/card relative block w-full overflow-hidden rounded-sooner outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        aspect === "tall" ? "aspect-[3/4]" : "aspect-video",
        // Placeholder art until an image loads or when none exists (design: gray-700 → gray-800).
        "bg-linear-135 from-gray-700 to-gray-800",
        className,
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 motion-safe:group-hover/card:scale-[1.03]"
        />
      )}
      {(badge || rentable) && (
        <span className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between">
          {badge ? <FilmBadge>{badge}</FilmBadge> : <span />}
          {rentable && (
            <span className="ml-auto flex h-[26px] w-6 items-center justify-center text-sooner-primary drop-shadow-[0_1px_2px_rgb(0_0_0/0.6)]">
              <SoonerBasket className="h-5 w-[18px] scale-125" />
            </span>
          )}
        </span>
      )}
      {availableFrom && (
        <FilmBadge tone="info" className="pointer-events-none absolute bottom-3 left-3 z-10">
          {availableLabel} {availableFrom}
        </FilmBadge>
      )}
    </Link>
  );
}
