import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FilmBadgeProps {
  children: ReactNode;
  /** label = uppercase typography.label ("Exclusive"); info = sentence case ("From 9 Nov 2026"). */
  tone?: "label" | "info";
  className?: string;
}

/** Black/50 pill over artwork (film cards, promo hero). Production: rounded-full bg-black/50 px-3 py-1 text-xs. */
export function FilmBadge({ children, tone = "label", className }: FilmBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center rounded-full bg-black/50 px-3 text-white",
        tone === "label" ? "text-label uppercase" : "text-xs font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}
