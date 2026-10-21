import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps {
  children: ReactNode;
  /** Renders a link (suggested search, genre) instead of a button. */
  href?: string;
  onClick?: () => void;
  className?: string;
}

const chip =
  "inline-flex h-9 shrink-0 items-center rounded-full border border-white/10 bg-white/10 px-4 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-white/20 " +
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Suggestion pill (design search "Suggested" chips): 14px medium on white/10 with a white/10 border. */
export function Chip({ children, href, onClick, className }: ChipProps) {
  if (href) {
    return (
      <Link href={href} className={cn(chip, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(chip, className)}>
      {children}
    </button>
  );
}
