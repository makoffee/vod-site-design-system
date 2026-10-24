import { cn } from "@/lib/cn";

export type SkeletonShape = "poster-tall" | "poster-wide" | "square" | "text" | "circle" | "block";

const shapes: Record<SkeletonShape, string> = {
  "poster-tall": "aspect-[3/4] w-full rounded-sooner",
  "poster-wide": "aspect-video w-full rounded-sooner",
  square: "aspect-square w-full rounded-sooner",
  text: "h-4 w-full rounded",
  circle: "aspect-square rounded-full",
  block: "w-full rounded-sooner",
};

export interface SkeletonProps {
  /** poster-tall = 3:4 FilmCard, poster-wide = 16:9 still, square = channel tile, text = one 16px line, circle = avatar/icon, block = any box sized with className. */
  shape?: SkeletonShape;
  /** Extra classes for size (width of a text line, height of a block). Don't recolour. */
  className?: string;
}

/**
 * Placeholder while content loads: white/10 on black, pulsing unless the viewer prefers reduced motion. Keeps the
 * shape of what it stands in for (posters keep 3:4 / 16:9), so the layout doesn't jump when content arrives.
 * Decorative (aria-hidden): the loading container announces "Loading…" once (FeedRow does).
 * Use for: content that is still loading (feeds, cards, text lines).
 * Not for: empty or failed content (use EmptyState).
 */
export function Skeleton({ shape = "block", className }: SkeletonProps) {
  return <div aria-hidden className={cn("bg-white/10 motion-safe:animate-pulse", shapes[shape], className)} />;
}
