import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps {
  /** Pill text (search term, genre). */
  children: ReactNode;
  /** Renders a link (suggested search, genre) instead of a button. */
  href?: string;
  /** Click handler of the button (ignored when href is set). */
  onClick?: () => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const chip =
  "inline-flex h-9 max-w-full shrink-0 items-center rounded-full border border-white/10 bg-white/10 px-4 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-white/20 " +
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Suggestion pill (design search "Suggested" chips): 14px medium on white/10 with a white/10 border. One line; a label
 * longer than its container truncates with an ellipsis.
 * Use for: suggested search terms or genre shortcuts.
 * Not for: badges on film artwork (use FilmBadge); selecting one of several options (use SegmentedControl).
 */
export function Chip({ children, href, onClick, className }: ChipProps) {
  if (href) {
    return (
      <Link href={href} className={cn(chip, className)}>
        <span className="truncate">{children}</span>
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(chip, className)}>
      <span className="truncate">{children}</span>
    </button>
  );
}
