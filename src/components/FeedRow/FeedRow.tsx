"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, isValidElement, useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Skeleton, type SkeletonShape } from "../Skeleton/Skeleton";

/** tall = boxart feeds, wide = 16:9 stills, square = channel/festival tiles. */
export type FeedKind = "tall" | "wide" | "square";

// Cards per visible row by *container* width. Always whole numbers: a row never shows a cut-off card (rule since
// 2026-10-22; production's --items-per-screen uses fractional 2.3 / 3.5 to let the next card peek in). Wide stills
// show fewer, matching the 4-up "Wide cover feed".
const itemsPerRow: Record<FeedKind, string> = {
  tall: "[--items:2] @xl:[--items:3] @4xl:[--items:5] @7xl:[--items:6] @min-[1600px]:[--items:7]",
  wide: "[--items:1] @xl:[--items:2] @4xl:[--items:3] @7xl:[--items:4] @min-[1600px]:[--items:5]",
  square: "[--items:2] @xl:[--items:3] @4xl:[--items:5] @7xl:[--items:6] @min-[1600px]:[--items:7]",
};

const skeletonShape: Record<FeedKind, SkeletonShape> = { tall: "poster-tall", wide: "poster-wide", square: "square" };

export interface FeedItemProps {
  /** The card for this slot. */
  children: ReactNode;
  /** Slots this item spans (a FeaturedFilmCard takes 2, like production's filmcard--wide). */
  span?: 1 | 2;
  /** Extra classes for the slot (layout only, e.g. a custom basis). */
  className?: string;
}

/** One slot in a FeedRow. Children of FeedRow are wrapped in a FeedItem automatically. */
export function FeedItem({ children, span = 1, className }: FeedItemProps) {
  return (
    <div
      className={cn(
        "shrink-0 snap-start",
        span === 1
          ? "basis-[calc((100%_-_(var(--items)_-_1)_*_var(--gap))_/_var(--items))]"
          : "basis-[calc(2_*_(100%_-_(var(--items)_-_1)_*_var(--gap))_/_var(--items)_+_var(--gap))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface FeedRowProps {
  /** Row title (SectionHeader). Without one the row has no header, e.g. inside FeaturedCollectionBlock. */
  title?: string;
  /** Accessible name when there is no title. */
  label?: string;
  /** Links the title to the full feed (shows "more" + chevron). */
  href?: string;
  /** Hover label next to a linked title (SectionHeader default "more"). Label text; English default, pass German on DE screens (feedRowDe). */
  moreLabel?: string;
  /** Card shape; sets whole cards per row by container width: tall (default) 2–7, wide 1–5, square 2–7. */
  kind?: FeedKind;
  /** Accessible name of the previous arrow (default "Previous"). Label text; English default, pass German on DE screens (feedRowDe). */
  previousLabel?: string;
  /** Accessible name of the next arrow (default "Next"). Label text; English default, pass German on DE screens (feedRowDe). */
  nextLabel?: string;
  /** Cards; each child is wrapped in a FeedItem unless it already is one. Ignored while loading. */
  children?: ReactNode;
  /** Shows Skeleton cards in the row's card shape instead of children (whole cards, no arrows). The title shows if known, else a skeleton line. */
  loading?: boolean;
  /** Screen-reader text while loading (production "Loading…"). Label text; English default, pass German on DE screens (feedRowDe). */
  loadingLabel?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * A titled, horizontally scrolling feed (production Row / ScrollSlider). Scroll-snap track with 12px gaps;
 * 54px prev/next buttons appear from 768px of container width while there is more to scroll.
 * Use for: rows of FilmCard, ChannelTile, ChannelTagTile, MaskTile or QuoteCard; set kind to the card shape. Shows whole cards only, never a cut-off card.
 * Not for: the discover hero carousel (use PromoHero) or a wrapping grid of films (use CollectionFeature).
 */
export function FeedRow({
  title,
  label,
  href,
  moreLabel,
  kind = "tall",
  previousLabel = "Previous",
  nextLabel = "Next",
  children,
  loading = false,
  loadingLabel = "Loading…",
  className,
}: FeedRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const items = loading
    ? Array.from({ length: 7 }, (_, i) => <FeedItem key={i}><Skeleton shape={skeletonShape[kind]} /></FeedItem>)
    : Children.map(children, (child) =>
    isValidElement(child) && child.type === FeedItem ? (child as ReactElement<FeedItemProps>) : <FeedItem>{child}</FeedItem>,
  );

  const arrow =
    "absolute top-1/2 z-20 hidden size-[54px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white transition-colors hover:bg-black " +
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white @3xl:flex";

  return (
    <section aria-label={title ? undefined : label} aria-busy={loading || undefined} className={cn("@container flex w-full flex-col gap-4", className)}>
      {title ? <SectionHeader title={title} href={href} moreLabel={moreLabel} /> : loading && <Skeleton shape="text" className="h-6 w-48" />}
      {loading && <span role="status" className="sr-only">{loadingLabel}</span>}
      <div className={cn("relative [--gap:12px]", itemsPerRow[kind])}>
        <div
          ref={trackRef}
          onScroll={update}
          className={cn(
            "flex snap-x snap-mandatory gap-(--gap) overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            loading ? "overflow-hidden" : "overflow-x-auto",
          )}
        >
          {items}
        </div>
        {!loading && canPrev && (
          <button type="button" aria-label={previousLabel} onClick={() => scroll(-1)} className={cn(arrow, "left-2")}>
            <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
          </button>
        )}
        {!loading && canNext && (
          <button type="button" aria-label={nextLabel} onClick={() => scroll(1)} className={cn(arrow, "right-2")}>
            <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}
