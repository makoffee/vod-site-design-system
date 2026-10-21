"use client";

import { Check } from "lucide-react";
import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type CheckboxProps = ChoiceFieldProps;

// Master f9dae187dc319424: 24px box, 4px radius, gray-500 border (kept when checked), violet fill.
export function Checkbox(props: CheckboxProps) {
  return (
    <ChoiceField
      {...props}
      type="checkbox"
      boundaryClassName="size-9 rounded-sooner"
      control={
        <span
          className={
            "flex size-6 items-center justify-center rounded-sm border border-gray-500 bg-white/10 text-white " +
            "group-has-checked/choice:bg-sooner-primary " +
            "group-has-disabled/choice:border-gray-500/25 group-has-disabled/choice:bg-white/4 " +
            "group-has-disabled/choice:group-has-checked/choice:bg-gray-800 group-has-disabled/choice:text-gray-500"
          }
        >
          <Check className="hidden size-5 group-has-checked/choice:block" strokeWidth={2.5} aria-hidden />
        </span>
      }
    />
  );
}
