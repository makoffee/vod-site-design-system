import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Badge on PlanCard and ProductCard: surface.uni pill, typography.label. */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 rounded-full bg-surface-uni px-3 py-1 text-label uppercase text-white", className)}>
      {children}
    </span>
  );
}
