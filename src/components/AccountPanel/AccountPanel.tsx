import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccountPanelProps {
  /** Panel content: DetailRows (rows) or SettingRows, forms and text (padded). */
  children: ReactNode;
  /** rows = stacked rows with hairline dividers (profile details); padded = one padded block (settings, PIN). */
  variant?: "rows" | "padded";
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Account content panel (production sooner.de/account): white/5 on black, white/10 hairline, 12px radius.
 * Use for: grouping DetailRows, SettingRows or DeviceCodeForm on account pages.
 * Not for: an empty list message (use EmptyState).
 */
export function AccountPanel({ children, variant = "padded", className }: AccountPanelProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5",
        variant === "rows" ? "divide-y divide-white/10" : "flex flex-col gap-6 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface AccountPageTitleProps {
  /** Title text. Label text; pass German on DE screens. */
  children: ReactNode;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Account section title: typography.text.2xl-bold.
 * Use for: the h1 above an account section's panels.
 * Not for: titles of content rows (use SectionHeader).
 */
export function AccountPageTitle({ children, className }: AccountPageTitleProps) {
  return <h1 className={cn("m-0 text-2xl font-bold text-white", className)}>{children}</h1>;
}
