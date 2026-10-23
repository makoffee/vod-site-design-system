"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type Language = "en" | "de" | "fr";

export interface LanguageOption {
  value: Language;
  label: string;
}

export const defaultLanguages: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
];

export interface LanguageSelectProps {
  /** The label shown on the trigger (instance override in the design, e.g. "DE" on landing pages). */
  value?: Language;
  defaultValue?: Language;
  onValueChange?: (value: Language) => void;
  options?: LanguageOption[];
  /** Start with the menu open (documentation). The menu itself is not drawn in the design. */
  defaultOpen?: boolean;
  /** Accessible name for the trigger. */
  label?: string;
  className?: string;
}

/** Master 59970d9a5afd0647: hairline border-white/10 pill, typography.nav.action label, chevron. */
export function LanguageSelect({
  value,
  defaultValue = "en",
  onValueChange,
  options = defaultLanguages,
  defaultOpen = false,
  label = "Interface language",
  className,
}: LanguageSelectProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = value ?? uncontrolled;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (next: Language) => {
    setUncontrolled(next);
    onValueChange?.(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-label={`${current.toUpperCase()}, ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-sm border border-white/10 px-2 py-1",
          "text-nav-action uppercase text-white outline-none transition-colors",
          "hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white",
        )}
      >
        {current}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} strokeWidth={2} aria-hidden />
      </button>
      {open && (
        <ul
          id={listId}
          role="menu"
          aria-label={label}
          className="surface-glass surface-glass-floating absolute right-0 top-full z-50 mt-2 min-w-40 rounded-lg py-1"
        >
          {options.map((option) => {
            const selected = option.value === current;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => select(option.value)}
                  className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-sm text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                >
                  <span>
                    <span className="mr-2 inline-block w-6 font-medium uppercase text-white/60">{option.value}</span>
                    {option.label}
                  </span>
                  {selected && <Check className="size-4 text-sooner-primary-light" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
