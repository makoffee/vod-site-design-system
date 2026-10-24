"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";

export type CollectionView = "grid" | "list";

export interface ViewToggleProps {
  /** The view currently shown; the button offers the other one. */
  view: CollectionView;
  /** Called with the other view on click; the component does not store the view. */
  onViewChange?: (view: CollectionView) => void;
  /** No production source; screen-reader names. Label text; English default, pass German on DE screens. */
  gridViewLabel?: string;
  /** Accessible name when the button switches to list (default "List view"). Label text; English default, pass German on DE screens. */
  listViewLabel?: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Grid / list switch (design "grid-icon"): 48px glass circle showing the icon of the view it switches to.
 * Use for: toggling a collection between grid and list view (CollectionHeader includes it).
 * Not for: choosing among more than two options (use SegmentedControl).
 */
export function ViewToggle({ view, onViewChange, gridViewLabel = "Grid view", listViewLabel = "List view", className }: ViewToggleProps) {
  const next: CollectionView = view === "grid" ? "list" : "grid";
  return (
    <button
      type="button"
      aria-label={next === "grid" ? gridViewLabel : listViewLabel}
      onClick={() => onViewChange?.(next)}
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-cta transition-colors hover:bg-white/18",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {next === "grid" ? (
        <LayoutGrid className="size-6" strokeWidth={2} aria-hidden />
      ) : (
        <List className="size-6" strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
