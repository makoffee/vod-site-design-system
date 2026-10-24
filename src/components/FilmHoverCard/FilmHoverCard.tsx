"use client";

import { Play, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SoonerBasket } from "../_shared/icons";

export interface FilmHoverCardProps {
  /** Film title (Playfair), linked to href; also the accessible name of the still link. */
  title: string;
  /** Film page link for the still and the title. */
  href: string;
  /** Wide still (16:9) shown on top. */
  imageSrc?: string;
  /** Director name after byLabel; line hidden when omitted. */
  director?: string;
  /** Production "By" (de "Von"). Label text; English default, pass German on DE screens. */
  byLabel?: string;
  /** Genre, runtime, year… joined with "|". */
  meta?: string[];
  /** Synopsis, clamped to 2 lines. */
  description?: string;
  /** Subscribe action; omit to hide. Label text; English default, pass German on DE screens. */
  subscribeLabel?: string;
  /** Rent action (e.g. "Rent - 4,99€"); omit to hide. Label text; English default, pass German on DE screens. */
  rentLabel?: string;
  /** Accessible name of the round + button; production "Add to Watchlist". Label text; English default, pass German on DE screens. */
  watchlistLabel?: string;
  /** Subscribe button click. */
  onSubscribe?: () => void;
  /** Rent button click. */
  onRent?: () => void;
  /** Watchlist (+) button click. */
  onAddToWatchlist?: () => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const focus = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sooner-primary";

/**
 * Expanded preview of a film card on hover: white card with a 16:9 still, Playfair
 * title, director, meta line, two-line synopsis and Subscribe / Rent / watchlist actions.
 * Use for: a hover/focus preview of a film (max 450px wide).
 * Not for: the card inside a feed (use FilmCard or FeaturedFilmCard).
 */
export function FilmHoverCard({
  title,
  href,
  imageSrc,
  director,
  byLabel = "By",
  meta = [],
  description,
  subscribeLabel,
  rentLabel,
  watchlistLabel = "Add to Watchlist",
  onSubscribe,
  onRent,
  onAddToWatchlist,
  className,
}: FilmHoverCardProps) {
  return (
    <article className={cn("w-full max-w-[450px] overflow-hidden rounded-[14px] bg-white shadow-[0_25px_50px_-12px_rgb(0_0_0/0.25)]", className)}>
      <Link href={href} aria-label={title} className={cn("relative block aspect-video bg-linear-135 from-gray-700 to-gray-900", focus)}>
        {imageSrc && <Image src={imageSrc} alt="" fill sizes="450px" className="object-cover" />}
      </Link>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="m-0 font-display text-lg leading-7 font-bold text-gray-900">
          <Link href={href} className={cn("rounded-sm hover:underline", focus)}>
            {title}
          </Link>
        </h3>
        {director && (
          <p className="m-0 text-xs leading-4 text-gray-600">
            {byLabel} {director}
          </p>
        )}
        {meta.length > 0 && (
          <p className="m-0 flex flex-wrap gap-2 text-xs leading-4 text-gray-500">
            {meta.map((item, i) => (
              <span key={`${item}-${i}`} className="flex gap-2">
                {i > 0 && <span aria-hidden>|</span>}
                {item}
              </span>
            ))}
          </p>
        )}
        {description && <p className="m-0 line-clamp-2 text-sm leading-[19px] text-gray-700">{description}</p>}
        <div className="flex items-center gap-2 pt-4">
          {subscribeLabel && (
            <button
              type="button"
              onClick={onSubscribe}
              className={cn("inline-flex h-9 items-center gap-2 rounded-sooner bg-sooner-primary px-3 text-sm font-semibold text-white", focus)}
            >
              <Play className="size-4" fill="currentColor" strokeWidth={1.33} aria-hidden />
              {subscribeLabel}
            </button>
          )}
          {rentLabel && (
            <button
              type="button"
              onClick={onRent}
              className={cn("inline-flex h-9 items-center gap-2 rounded-sooner bg-gray-100 px-3 text-sm font-semibold text-gray-900", focus)}
            >
              <SoonerBasket className="h-[17px] w-4" />
              {rentLabel}
            </button>
          )}
          <button
            type="button"
            aria-label={watchlistLabel}
            onClick={onAddToWatchlist}
            className={cn("flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-900", focus)}
          >
            <Plus className="size-4" strokeWidth={1.33} aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
