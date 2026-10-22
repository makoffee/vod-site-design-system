"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, isValidElement, useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "../SectionHeader/SectionHeader";

/** tall = boxart feeds, wide = 16:9 stills, square = channel/festival tiles. */
export type FeedKind = "tall" | "wide" | "square";

// Cards per visible row by *container* width, after production's --items-per-screen (2.3 → 3.5 → 5 → 6 → 7);
// fractional counts let the next card peek in. Wide stills show fewer, matching the 4-up "Wide cover feed".
const itemsPerRow: Record<FeedKind, string> = {
  tall: "[--items:2.3] @xl:[--items:3.5] @4xl:[--items:5] @7xl:[--items:6] @min-[1600px]:[--items:7]",
  wide: "[--items:1.3] @xl:[--items:2] @4xl:[--items:3] @7xl:[--items:4] @min-[1600px]:[--items:5]",
  square: "[--items:2.3] @xl:[--items:3.5] @4xl:[--items:5] @7xl:[--items:6] @min-[1600px]:[--items:7]",
};

export interface FeedItemProps {
  children: ReactNode;
  /** Slots this item spans (a FeaturedFilmCard takes 2, like production's filmcard--wide). */
  span?: 1 | 2;
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
  moreLabel?: string;
  kind?: FeedKind;
  previousLabel?: string;
  nextLabel?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A titled, horizontally scrolling feed (production Row / ScrollSlider). Scroll-snap track with 12px gaps;
 * 54px prev/next buttons appear from 768px of container width while there is more to scroll.
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

  const items = Children.map(children, (child) =>
    isValidElement(child) && child.type === FeedItem ? (child as ReactElement<FeedItemProps>) : <FeedItem>{child}</FeedItem>,
  );

  const arrow =
    "absolute top-1/2 z-20 hidden size-[54px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white transition-colors hover:bg-black " +
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white @3xl:flex";

  return (
    <section aria-label={title ? undefined : label} className={cn("@container flex w-full flex-col gap-4", className)}>
      {title && <SectionHeader title={title} href={href} moreLabel={moreLabel} />}
      <div className={cn("relative [--gap:12px]", itemsPerRow[kind])}>
        <div
          ref={trackRef}
          onScroll={update}
          className="flex snap-x snap-mandatory gap-(--gap) overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items}
        </div>
        {canPrev && (
          <button type="button" aria-label={previousLabel} onClick={() => scroll(-1)} className={cn(arrow, "left-2")}>
            <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
          </button>
        )}
        {canNext && (
          <button type="button" aria-label={nextLabel} onClick={() => scroll(1)} className={cn(arrow, "right-2")}>
            <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}
