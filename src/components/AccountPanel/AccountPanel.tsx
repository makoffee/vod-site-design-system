import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccountPanelProps {
  children: ReactNode;
  /** rows = stacked rows with hairline dividers (profile details); padded = one padded block (settings, PIN). */
  variant?: "rows" | "padded";
  className?: string;
}

/** Account content panel (production sooner.de/account): white/5 on black, white/10 hairline, 12px radius. */
export function AccountPanel({ children, variant = "padded", className }: AccountPanelProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5",
        variant === "rows" ? "divide-y divide-white/10" : "flex flex-col gap-6 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface AccountPageTitleProps {
  children: ReactNode;
  className?: string;
}

/** Account section title: typography.text.2xl-bold. */
export function AccountPageTitle({ children, className }: AccountPageTitleProps) {
  return <h1 className={cn("m-0 text-2xl font-bold text-white", className)}>{children}</h1>;
}
