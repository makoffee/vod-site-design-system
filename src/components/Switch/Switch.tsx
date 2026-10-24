"use client";

import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type SwitchProps = ChoiceFieldProps;

// Production account settings toggle (w-11 h-6 bg-white/10 rounded-full, peer-checked:bg-[#AE00FF], 20px white thumb
// inset 2px): no border, no outline.
export function Switch(props: SwitchProps) {
  return (
    <ChoiceField
      {...props}
      type="checkbox"
      role="switch"
      boundaryClassName="rounded-full"
      control={
        <span className="flex h-6 w-11 items-center rounded-full bg-white/10 px-0.5 transition-colors group-has-checked/choice:bg-sooner-primary">
          <span className="size-5 rounded-full bg-white transition-transform group-has-checked/choice:translate-x-5" />
        </span>
      }
    />
  );
}
