import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  /** Text explaining that there is nothing here. Label text; pass German on DE screens. */
  message: string;
  /** Optional glyph above the message (watchlist bookmark). */
  icon?: ReactNode;
  /** Optional call to action below the message (a Button or link). */
  action?: ReactNode;
  /** panel = inside the account panel surface; plain = on the page (watchlist). */
  surface?: "panel" | "plain";
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Nothing-here state (production account subscriptions/rentals and the empty watchlist): centred message in
 * white/60 with an optional icon and action. Production left-aligns the watchlist icon; here it is centred with the text.
 * Use for: empty subscriptions, rentals or watchlist.
 * Not for: panels that have content (use AccountPanel).
 */
export function EmptyState({ message, icon, action, surface = "panel", className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4 text-center",
        surface === "panel" ? "rounded-xl border border-white/10 bg-white/5 p-6" : "py-16",
        className,
      )}
    >
      {icon && <div className="text-white/60 [&_svg]:size-10">{icon}</div>}
      <p className="m-0 text-white/60">{message}</p>
      {action}
    </div>
  );
}
