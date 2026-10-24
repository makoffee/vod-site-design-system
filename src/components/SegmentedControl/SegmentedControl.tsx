"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string = string> {
  /** Segments in order (value + visible label). Label text; pass German on DE screens. */
  options: SegmentedOption<T>[];
  /** Selected value (controlled). */
  value?: T;
  /** Initial value when `value` is not set; defaults to the first option. */
  defaultValue?: T;
  /** Called with the clicked option's value. */
  onValueChange?: (value: T) => void;
  /** Accessible group name. */
  label: string;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const focusVisible = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Plan period switch on the plan-select screens (Monthly / Yearly / CinePass). Same pill
 * styling as AvailabilityFilter's bar: ghost glass track (surface-glass), white pill on the active option.
 * Use for: switching between a few mutually exclusive options, e.g. the plan period.
 * Not for: availability filtering (use AvailabilityFilter); grid/list view (use ViewToggle).
 */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  const [uncontrolled, setUncontrolled] = useState<T | undefined>(defaultValue ?? options[0]?.value);
  const current = value ?? uncontrolled;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("surface-glass inline-flex items-center gap-2 rounded-sooner p-1.5", className)}
    >
      {options.map((option) => {
        const active = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              setUncontrolled(option.value);
              onValueChange?.(option.value);
            }}
            className={cn(
              "flex h-9 items-center px-4 text-sm font-medium transition-colors",
              focusVisible,
              active ? "rounded-lg bg-white text-surface-uni" : "rounded-sooner text-white/60 hover:text-white",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
