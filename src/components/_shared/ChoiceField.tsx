"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { widthClass, type Sizing } from "./sizing";

/** Checkbox / Radio / Switch variants: checked[false,true] × state[default,focus,disabled]. */
export type ChoiceState = "default" | "focus" | "disabled";

export interface ChoiceFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "role"> {
  /** Visible text right of the control (14px, white/80); also the input's accessible name. Label text; pass German on DE screens. */
  label: ReactNode;
  /** Optional 12px white/40 line under the label, linked via aria-describedby. */
  description?: ReactNode;
  /** Called with the new checked value. Without it, a controlled `checked` renders read-only (static documentation). */
  onCheckedChange?: (checked: boolean) => void;
  /** focus pins the focus ring for documentation; real focus uses :focus-visible. */
  state?: ChoiceState;
  /** fill (default) stretches the row to the parent; hug fits control + label. */
  width?: Sizing;
}

interface ControlProps {
  type: "checkbox" | "radio";
  role?: "switch";
  /** Size and shape of the focus boundary around the control. */
  boundaryClassName: string;
  /** Styled with group-has-checked/choice: so the native input stays the source of truth. */
  control: ReactNode;
}

/** Shared shell for Checkbox, Radio and Switch (production sooner.de signup / account settings): native input, focus ring, 14px label in white/80, optional 12px description. Disabled dims the whole row to 40%. */
export function ChoiceField({
  label,
  description,
  onCheckedChange,
  state = "default",
  width = "fill",
  disabled,
  id,
  className,
  type,
  role,
  boundaryClassName,
  control,
  ...props
}: ChoiceFieldProps & ControlProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isDisabled = disabled || state === "disabled";

  return (
    <label
      htmlFor={inputId}
      className={cn("group/choice flex items-start gap-3", widthClass[width], isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer", className)}
    >
      <input
        id={inputId}
        type={type}
        role={role}
        disabled={isDisabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        // Controlled `checked` without a handler is intentional for static documentation states.
        readOnly={props.checked !== undefined && !onCheckedChange}
        className="peer sr-only"
        aria-describedby={description ? `${inputId}-description` : undefined}
        {...props}
      />
      <span
        aria-hidden
        className={cn(
          // Production focus: ring-2 white with a 2px offset, on keyboard focus only (never on the selected state).
          "mt-0.5 flex shrink-0 items-center justify-center ring-offset-2 ring-offset-black peer-focus-visible:ring-2 peer-focus-visible:ring-white",
          state === "focus" && "ring-2 ring-white",
          boundaryClassName,
        )}
      >
        {control}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm text-white/80">{label}</span>
        {description && (
          <span id={`${inputId}-description`} className="text-xs text-white/40">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
