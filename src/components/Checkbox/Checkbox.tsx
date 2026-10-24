"use client";

import { Check } from "lucide-react";
import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type CheckboxProps = ChoiceFieldProps;

/**
 * Production signup checkbox (h-4 w-4 rounded border-white/40 bg-white/10, accent #AE00FF): 16px box,
 * white/40 hairline when off, solid violet with a white tick when on (no border, no outline).
 * Use for: opt-ins and independent yes/no choices submitted with a form (e.g. "Stay logged in" in LoginModal).
 * Not for: settings that apply immediately (use Switch); one choice out of several (use Radio).
 */
export function Checkbox(props: CheckboxProps) {
  return (
    <ChoiceField
      {...props}
      type="checkbox"
      boundaryClassName="rounded"
      control={
        <span
          className={
            "flex size-4 items-center justify-center rounded border border-white/40 bg-white/10 text-white " +
            "group-has-checked/choice:border-sooner-primary group-has-checked/choice:bg-sooner-primary"
          }
        >
          <Check className="hidden size-3 group-has-checked/choice:block" strokeWidth={3} aria-hidden />
        </span>
      }
    />
  );
}
