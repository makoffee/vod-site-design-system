"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { widthClass, type Sizing } from "../_shared/sizing";

// Axes mirror the TextInput master (3cba7ff2b88f51f2). The master only draws password/default;
// the other password states reuse the email styling. text = plain field (device codes).
export type TextInputType = "email" | "password" | "text";
export type TextInputState = "default" | "filled" | "focus" | "error" | "disabled";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** email (default); password adds a show/hide toggle; text is a plain field (device codes). */
  type?: TextInputType;
  /** filled follows the value; focus pins the focus look for documentation. */
  state?: TextInputState;
  /** Optional uppercase label above the field. Without it pass `aria-label`. Label text; pass German on DE screens. */
  label?: string;
  /** Helper or error message under the field (red when state is error), linked via aria-describedby. */
  supportingText?: string;
  /** fill (default) stretches to the parent; hug keeps the input's intrinsic width. */
  width?: Sizing;
  /** Accessible name of the reveal button (password only). Label text; English default, pass German on DE screens. */
  showPasswordLabel?: string;
  /** Accessible name of the hide button (password only). Label text; English default, pass German on DE screens. */
  hidePasswordLabel?: string;
}

/**
 * Form field (TextInput master): 56px glass input with optional label and supporting text. error sets aria-invalid
 * and a red border; disabled greys it out. Other input attributes (name, value, placeholder, …) pass through.
 * Use for: e-mail, password and plain text entry in forms (AuthForm, LoginModal, DeviceCodeForm).
 * Not for: search (use SearchField); the newsletter e-mail capture card (use EmailSignup).
 */
export function TextInput({
  type = "email",
  state = "default",
  label,
  supportingText,
  width = "fill",
  showPasswordLabel = "Show password",
  hidePasswordLabel = "Hide password",
  disabled,
  id,
  className,
  ...props
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;
  const [revealed, setRevealed] = useState(false);

  const isDisabled = disabled || state === "disabled";
  const isError = state === "error";

  return (
    <div className={cn("flex flex-col gap-2", widthClass[width], className)}>
      {label && (
        <label htmlFor={inputId} className="text-label uppercase text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type === "password" && revealed ? "text" : type}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          aria-describedby={supportingText ? messageId : undefined}
          className={cn(
            "h-14 w-full rounded-lg border px-4 text-base text-white outline-none transition-colors",
            "placeholder:text-white/70",
            type === "password" && "pr-12",
            isDisabled
              ? "cursor-not-allowed border-white/13 bg-white/4 text-gray-200 placeholder:text-gray-200"
              : cn(
                  "bg-white/10 backdrop-blur-glass focus:border-2 focus:border-white focus:px-[15px]",
                  // Design gap: the master's error state is a white border; we use status.error (red-500).
                  isError ? "border-2 border-red-500 px-[15px] text-gray-200" : "border-white/30",
                  state === "focus" && "border-2 border-white px-[15px]",
                ),
          )}
          {...props}
        />
        {type === "password" && !isDisabled && (
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            disabled={isDisabled}
            aria-label={revealed ? hidePasswordLabel : showPasswordLabel}
            className="absolute inset-y-0 right-4 my-auto flex size-5 items-center justify-center rounded-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none"
          >
            {revealed ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
          </button>
        )}
      </div>
      {supportingText && (
        <p
          id={messageId}
          className={cn("text-sm", isError ? "text-red-500" : isDisabled ? "text-gray-200" : "text-gray-400")}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}
