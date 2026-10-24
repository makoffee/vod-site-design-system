"use client";

import { ChoiceField, type ChoiceFieldProps } from "../_shared/ChoiceField";

export type RadioProps = ChoiceFieldProps;

// Production has no radio; this follows the signup checkbox: 16px circle, white/40 hairline when off,
// solid violet with a 6px white dot when on.
export function Radio(props: RadioProps) {
  return (
    <ChoiceField
      {...props}
      type="radio"
      boundaryClassName="rounded-full"
      control={
        <span
          className={
            "flex size-4 items-center justify-center rounded-full border border-white/40 bg-white/10 " +
            "group-has-checked/choice:border-sooner-primary group-has-checked/choice:bg-sooner-primary"
          }
        >
          <span className="hidden size-1.5 rounded-full bg-white group-has-checked/choice:block" />
        </span>
      }
    />
  );
}
