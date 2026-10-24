"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";

export interface DeviceCodeFormProps {
  title?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
  defaultValue?: string;
  onSubmit?: (code: string) => void;
  className?: string;
}

/**
 * Pair a TV or device (production /account/devices): heading, hint, the code field and Continue.
 * Built from TextInput and Button; Continue stays disabled until a code is entered.
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
