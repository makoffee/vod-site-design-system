import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TextActionProps {
  /** Visible action text ("Edit", "Add"). Label text; pass German on DE screens. */
  children: ReactNode;
  /** Renders a Link instead of a button. */
  href?: string;
  /** Click handler of the button (ignored when href is set). */
  onClick?: () => void;
  /** xs for inline row actions (Edit, Add), sm for standalone actions (Set my PIN). */
  size?: "xs" | "sm";
  /** Accessible name when the visible label needs context ("Edit Name"). */
  label?: string;
  /** Disables the button (50% opacity); has no effect when href is set. */
  disabled?: boolean;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const base =
  "inline-flex shrink-0 cursor-pointer items-center bg-transparent p-0 font-medium text-sooner-primary-light no-underline transition-colors hover:text-white " +
  "rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Inline text action (account "Edit", "Add", "Set my PIN"): text.accent-light, white on hover, never underlined.
 * Production mixes underlined violet and plain violet-light; this is the one style.
 * Use for: small inline actions in DetailRow or SettingRow.
 * Not for: primary or form-submitting actions (use Button).
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
