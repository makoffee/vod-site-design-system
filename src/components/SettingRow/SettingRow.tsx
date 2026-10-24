import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SettingRowProps {
  /** Setting name. Label text; pass German on DE screens. */
  title: string;
  /** Secondary line under the title, omitted when empty. Label text; pass German on DE screens. */
  description?: string;
  /** The control on the right: LanguageSelect, Switch, TextAction. */
  control?: ReactNode;
  /** Draws a hairline above the row when it follows another row in the same panel. */
  divided?: boolean;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Account setting (production settings / parental PIN): 16/500 title, 14px white/40 description, control on the right.
 * Use for: a setting with a control (Switch, LanguageSelect, TextAction) inside an AccountPanel variant="padded".
 * Not for: read-only values (use DetailRow).
 */
export function SettingRow({ title, description, control, divided = false, className }: SettingRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", divided && "border-t border-white/10 pt-4", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="m-0 font-medium text-white">{title}</p>
        {description && <p className="m-0 text-sm text-white/40">{description}</p>}
      </div>
      {control && <div className="shrink-0">{control}</div>}
    </div>
  );
}
