"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { widthClass, type Sizing } from "./sizing";

/** Axes on the Checkbox / Radio / Switch masters: checked[false,true] × state[default,focus,disabled]. */
export type ChoiceState = "default" | "focus" | "disabled";

export interface ChoiceFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "role"> {
  label: ReactNode;
  description?: ReactNode;
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

/** Shared shell for Checkbox, Radio and Switch: native input, focus boundary, label and supporting text. */
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
      className={cn("group/choice flex items-center gap-4", widthClass[width], description ? "py-3" : "min-h-11", isDisabled ? "cursor-not-allowed" : "cursor-pointer", className)}
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
          "flex shrink-0 items-center justify-center border-2 border-transparent",
          "peer-focus-visible:border-white",
          state === "focus" && "border-white",
          boundaryClassName,
        )}
      >
        {control}
      </span>
      <span className="flex flex-col gap-1">
        <span className={cn("text-base font-medium", isDisabled ? "text-gray-200" : "text-white")}>{label}</span>
        {description && (
          <span id={`${inputId}-description`} className="text-sm text-gray-200">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}
