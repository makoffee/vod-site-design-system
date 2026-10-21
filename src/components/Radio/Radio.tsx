"use client";

import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type RadioProps = ChoiceFieldProps;

// Master a7d0b1715fdbf208: 24px circle, gray-500 border, 10px white dot when checked.
export function Radio(props: RadioProps) {
  return (
    <ChoiceField
      {...props}
      type="radio"
      boundaryClassName="size-9 rounded-full"
      control={
        <span
          className={
            "flex size-6 items-center justify-center rounded-full border border-gray-500 bg-white/10 " +
            "group-has-checked/choice:bg-sooner-primary " +
            "group-has-disabled/choice:border-gray-500/25 group-has-disabled/choice:bg-white/4 " +
            "group-has-disabled/choice:group-has-checked/choice:bg-gray-800"
          }
        >
          <span className="hidden size-2.5 rounded-full bg-white group-has-checked/choice:block group-has-disabled/choice:bg-gray-500" />
        </span>
      }
    />
  );
}
