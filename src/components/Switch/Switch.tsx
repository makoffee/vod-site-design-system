"use client";

import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type SwitchProps = ChoiceFieldProps;

// Master 13d14bb8fdf62529: 48×28 track, 20px thumb inset 4px, violet track + border when checked.
export function Switch(props: SwitchProps) {
  return (
    <ChoiceField
      {...props}
      type="checkbox"
      role="switch"
      boundaryClassName="h-10 w-[60px] rounded-full"
      control={
        <span
          className={
            "flex h-7 w-12 items-center rounded-full border border-gray-500 bg-white/10 px-[3px] transition-colors " +
            "group-has-checked/choice:border-sooner-primary group-has-checked/choice:bg-sooner-primary " +
            "group-has-disabled/choice:border-gray-500/25 group-has-disabled/choice:bg-white/4 " +
            "group-has-disabled/choice:group-has-checked/choice:border-gray-500/25 group-has-disabled/choice:group-has-checked/choice:bg-gray-800"
          }
        >
          <span className="size-5 rounded-full bg-white transition-transform group-has-checked/choice:translate-x-5 group-has-disabled/choice:bg-gray-200" />
        </span>
      }
    />
  );
}
