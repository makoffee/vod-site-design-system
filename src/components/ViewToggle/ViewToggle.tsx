"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";

export type CollectionView = "grid" | "list";

export interface ViewToggleProps {
  /** The view currently shown; the button offers the other one. */
  view: CollectionView;
  onViewChange?: (view: CollectionView) => void;
  /** No production source; screen-reader names. */
  gridViewLabel?: string;
  listViewLabel?: string;
  className?: string;
}

/** Grid / list switch (design "grid-icon"): 48px glass circle showing the icon of the view it switches to. */
export function ViewToggle({ view, onViewChange, gridViewLabel = "Grid view", listViewLabel = "List view", className }: ViewToggleProps) {
  const next: CollectionView = view === "grid" ? "list" : "grid";
  return (
    <button
      type="button"
      aria-label={next === "grid" ? gridViewLabel : listViewLabel}
      onClick={() => onViewChange?.(next)}
      className={cn(
        "surface-glass flex size-12 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:[--glass-tint:rgb(0_0_0/0.55)]",
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
