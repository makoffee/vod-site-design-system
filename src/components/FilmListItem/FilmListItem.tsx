"use client";

import { Play, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SoonerBasket } from "../_shared/icons";

export interface FilmListItemProps {
  title: string;
  href: string;
  director?: string;
  /** Genre, runtime, year, … shown as "Documentary | 90 min | 2020". */
  meta?: string[];
  synopsis?: string;
  posterSrc?: string;
  /** Production "By" (de "Von"). */
  byLabel?: string;
  /** Design "Subscribe". Omit with null. */
  subscribeLabel?: string | null;
  /** Production "Rent"; design "Rent - 4,99€". Omit with null. */
  rentLabel?: string | null;
  /** Production "Add to Watchlist". */
  watchlistLabel?: string;
  onSubscribe?: () => void;
  onRent?: () => void;
  onAddToWatchlist?: () => void;
  className?: string;
}

const focus = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
// Icon-only 32px circles below 672px of container width (design "ListItemCard" 393), labelled 36px buttons above.
const action =
  "flex size-8 shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors @2xl:h-9 @2xl:w-auto @2xl:rounded-sooner @2xl:px-3";

/**
 * Collection list row (design "collection view | list"): 3:4 poster beside the title, director, meta line,
 * clamped synopsis and subscribe / rent / watchlist actions. Compact below 672px of container width.
 */
export function FilmListItem({
  title,
  href,
  director,
  meta = [],
  synopsis,
  posterSrc,
  byLabel = "By",
  subscribeLabel = "Subscribe",
  rentLabel = "Rent",
  watchlistLabel = "Add to Watchlist",
  onSubscribe,
  onRent,
  onAddToWatchlist,
  className,
}: FilmListItemProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <article className="flex w-full overflow-hidden rounded-sooner border border-white/10 @2xl:rounded-xl">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className="relative aspect-[3/4] w-[132px] shrink-0 bg-linear-135 from-gray-700 to-gray-800 @2xl:w-[260px]"
        >
          {posterSrc && <Image src={posterSrc} alt="" fill sizes="(min-width: 768px) 260px, 132px" className="object-cover" />}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 bg-surface-card p-3 @2xl:px-8 @2xl:py-6">
          <h3 className="m-0 font-display text-base leading-5 font-bold text-white @2xl:text-2xl @2xl:leading-7">
            <Link href={href} className={cn("rounded-sm hover:underline", focus)}>
              {title}
            </Link>
          </h3>
          {director && (
            <p className="m-0 hidden text-xs leading-4 font-bold text-white @2xl:block">
              {byLabel} {director}
            </p>
          )}
          {meta.length > 0 && (
            <p className="m-0 flex flex-wrap gap-1 text-[10px] leading-4 text-gray-500 @2xl:gap-2 @2xl:text-xs">
              {meta.map((item, i) => (
                <span key={`${i}-${item}`} className="flex gap-2">
                  {i > 0 && (
                    <span aria-hidden className="hidden @2xl:inline">
                      |
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>
          )}
          {synopsis && (
            <p className="m-0 line-clamp-3 text-[10px] leading-4 text-white @2xl:line-clamp-5 @2xl:text-base @2xl:leading-6">{synopsis}</p>
          )}

          <div className="flex items-center gap-2 pt-0.5 @2xl:pt-4">
            {subscribeLabel && (
              <button
                type="button"
                onClick={onSubscribe}
                aria-label={subscribeLabel}
                className={cn(action, focus, "bg-sooner-primary text-white hover:bg-sooner-primary-dark")}
              >
                <Play className="size-4" fill="currentColor" strokeWidth={1.5} aria-hidden />
                <span aria-hidden className="hidden @2xl:inline">
                  {subscribeLabel}
                </span>
              </button>
            )}
            {rentLabel && (
              <button
                type="button"
                onClick={onRent}
                aria-label={rentLabel}
                className={cn(action, focus, "bg-gray-100 text-gray-900 hover:bg-white")}
              >
                <SoonerBasket className="h-[17px] w-4" />
                <span aria-hidden className="hidden @2xl:inline">
                  {rentLabel}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onAddToWatchlist}
              aria-label={watchlistLabel}
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-white @2xl:size-10",
                focus,
              )}
            >
              <Plus className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
