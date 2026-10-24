"use client";

import { Play, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BinocularIcon } from "../_shared/BinocularMask";
import { SoonerBasket } from "../_shared/icons";

export interface FeaturedFilmCardProps {
  /** Film title (Playfair, clamped to 2 lines), linked to href. */
  title: string;
  /** Film page link for the title and the poster. */
  href: string;
  /** Director name after byLabel; line hidden when omitted. */
  director?: string;
  /** Links the director name when set. */
  directorHref?: string;
  /** Synopsis; clamped to 3 lines (4 from a 512px-wide container). */
  description?: string;
  /** 3:4 poster on the right (always carries the rent basket); gray gradient placeholder when omitted. */
  imageSrc?: string;
  /** Eyebrow next to the binocular icon; production "Sooner Selection". Label text; English default, pass German on DE screens. */
  eyebrow?: string;
  /** Production "By" (de "Von"). Label text; English default, pass German on DE screens (featuredFilmCardDe). */
  byLabel?: string;
  /** Rent action label; production "Rent", design "Rent - 4,99€". Default "Rent"; pass "" to hide. Label text; English default, pass German on DE screens (featuredFilmCardDe). */
  rentLabel?: string;
  /** Subscribe action (design "Subscribe"). Default "Subscribe"; pass "" to hide. Label text; English default, pass German on DE screens (featuredFilmCardDe). */
  subscribeLabel?: string;
  /** Accessible name of the round + button; production "Add to Watchlist". Label text; English default, pass German on DE screens (featuredFilmCardDe). */
  watchlistLabel?: string;
  /** Rent button click. */
  onRent?: () => void;
  /** Subscribe button click. */
  onSubscribe?: () => void;
  /** Watchlist (+) button click. */
  onAddToWatchlist?: () => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * White feature card inside a feed (production `filmcard--wide`, design "Featured card with feed").
 * Takes two feed slots: eyebrow, Playfair title, director, clamped synopsis, actions, and the poster.
 * Use for: one highlighted film inside a FeedRow, wrapped in a FeedItem (span={2} or a wider basis).
 * Not for: regular feed posters (use FilmCard) or the film page header (use FilmHero).
 */
export function FeaturedFilmCard({
  title,
  href,
  director,
  directorHref,
  description,
  imageSrc,
  eyebrow = "Sooner Selection",
  byLabel = "By",
  rentLabel = "Rent",
  subscribeLabel = "Subscribe",
  watchlistLabel = "Add to Watchlist",
  onRent,
  onSubscribe,
  onAddToWatchlist,
  className,
}: FeaturedFilmCardProps) {
  const focus = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sooner-primary";

  return (
    <div className={cn("@container h-full w-full", className)}>
      <article className="flex h-full w-full items-center gap-4 overflow-hidden rounded-2xl bg-white p-3 @lg:gap-6 @lg:p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-2 pl-2 @lg:py-4 @lg:pl-4">
          <div className="flex items-center gap-2.5 pb-2">
            <BinocularIcon className="h-[15px] w-7 shrink-0 text-sooner-primary" />
            <span className="text-xs leading-4 font-bold tracking-[0.3px] text-sooner-primary uppercase">{eyebrow}</span>
          </div>
          <h3 className="m-0 line-clamp-2 font-display text-2xl leading-8 font-normal tracking-[-0.75px] text-gray-900 @lg:text-3xl @lg:leading-9">
            <Link href={href} className={cn("rounded-sm hover:underline", focus)}>
              {title}
            </Link>
          </h3>
          {director && (
            <p className="m-0 text-xs leading-4 font-bold text-gray-900">
              {byLabel}{" "}
              {directorHref ? (
                <Link href={directorHref} className={cn("rounded-sm hover:underline", focus)}>
                  {director}
                </Link>
              ) : (
                director
              )}
            </p>
          )}
          {description && <p className="m-0 line-clamp-3 text-sm leading-5 text-gray-700 @lg:line-clamp-4">{description}</p>}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {subscribeLabel && (
              <button
                type="button"
                onClick={onSubscribe}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-sooner bg-black px-3 text-sm font-semibold text-white transition-colors hover:bg-gray-900",
                  focus,
                )}
              >
                <Play className="size-4" fill="currentColor" aria-hidden />
                {subscribeLabel}
              </button>
            )}
            {rentLabel && (
              <button
                type="button"
                onClick={onRent}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-sooner bg-gray-100 px-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200",
                  focus,
                )}
              >
                <SoonerBasket className="h-[18px] w-4" />
                {rentLabel}
              </button>
            )}
            <button
              type="button"
              onClick={onAddToWatchlist}
              aria-label={`${watchlistLabel}. ${title}`}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-gray-200",
                focus,
              )}
            >
              <Plus className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[3/4] w-[40%] max-w-[238px] shrink-0 overflow-hidden rounded-sooner bg-linear-135 from-gray-700 to-gray-800"
        >
          {imageSrc && <Image src={imageSrc} alt="" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover" />}
          <span className="pointer-events-none absolute top-3 right-3 z-10 flex h-[26px] w-6 items-center justify-center text-sooner-primary drop-shadow-[0_1px_2px_rgb(0_0_0/0.6)]">
            <SoonerBasket className="h-5 w-[18px] scale-125" />
          </span>
        </Link>
      </article>
    </div>
  );
}
