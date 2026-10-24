import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DetailRowProps {
  label: string;
  /** Empty values show the placeholder in text.subtle. */
  value?: string;
  placeholder?: string;
  /** Trailing action, usually a TextAction ("Edit", "Add"). */
  action?: ReactNode;
  /** compact = ids and codes (12px, breaks anywhere). */
  compact?: boolean;
  className?: string;
}

/** Read-only account detail (production profile rows): 12px label in white/40, 14px value in white/80, optional action. */
export function DetailRow({ label, value, placeholder, action, compact = false, className }: DetailRowProps) {
  return (
    <div className={cn("flex flex-col gap-1 px-4 py-3", className)}>
      <p className="m-0 text-xs tracking-wider text-white/40">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <span className={cn("min-w-0", compact ? "text-xs break-all" : "text-sm", value ? "text-white/80" : "text-white/30")}>
          {value || placeholder}
        </span>
        {action}
      </div>
    </div>
  );
}
