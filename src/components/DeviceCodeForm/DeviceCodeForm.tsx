"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";

export interface DeviceCodeFormProps {
  /** Heading (h2). Label text; English default, pass German on DE screens. */
  title?: string;
  /** Hint under the heading. Label text; English default, pass German on DE screens. */
  description?: string;
  /** Field placeholder, also its accessible name. Label text; English default, pass German on DE screens. */
  placeholder?: string;
  /** Submit button text (default "Continue"). Label text; English default, pass German on DE screens. */
  submitLabel?: string;
  /** Initial code in the field (uncontrolled). */
  defaultValue?: string;
  /** Called on submit with the trimmed, upper-cased code; not called when the field is blank. */
  onSubmit?: (code: string) => void;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/**
 * Pair a TV or device (production /account/devices): heading, hint, the code field and Continue.
 * Built from TextInput and Button; Continue stays disabled until a code is entered.
 * Use for: entering a device pairing code on the account devices page.
 * Not for: email/password login or signup (use AuthForm).
 */
export function DeviceCodeForm({
  title = "Login in other devices",
  description = "Enter the code shown on your TV or device.",
  placeholder = "Enter your code",
  submitLabel = "Continue",
  defaultValue = "",
  onSubmit,
  className,
}: DeviceCodeFormProps) {
  const [code, setCode] = useState(defaultValue);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim()) onSubmit?.(code.trim().toUpperCase());
  };

  return (
    <form onSubmit={submit} className={cn("flex w-full flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-lg font-semibold text-white">{title}</h2>
        <p className="m-0 text-sm text-white/50">{description}</p>
      </div>
      <div className="flex w-full max-w-sm items-start gap-3">
        <TextInput
          type="text"
          aria-label={placeholder}
          placeholder={placeholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="one-time-code"
          className="min-w-0 flex-1"
        />
        <Button type="submit" size="lg" width="hug" disabled={!code.trim()}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
