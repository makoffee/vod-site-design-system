import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TextActionProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** xs for inline row actions (Edit, Add), sm for standalone actions (Set my PIN). */
  size?: "xs" | "sm";
  /** Accessible name when the visible label needs context ("Edit Name"). */
  label?: string;
  disabled?: boolean;
  className?: string;
}

const base =
  "inline-flex shrink-0 cursor-pointer items-center bg-transparent p-0 font-medium text-sooner-primary-light no-underline transition-colors hover:text-white " +
  "rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Inline text action (account "Edit", "Add", "Set my PIN"): text.accent-light, white on hover, never underlined.
 * Production mixes underlined violet and plain violet-light; this is the one style.
 */
export function TextAction({ children, href, onClick, size = "xs", label, disabled, className }: TextActionProps) {
  const cls = cn(base, size === "xs" ? "text-xs" : "text-sm", className);
  if (href) {
    return (
      <Link href={href} aria-label={label} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
