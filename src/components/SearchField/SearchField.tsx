"use client";

import { Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

/** lg = search overlay (16px radius, two shadows), md = in-nav bar on results (10px radius, blur). */
export type SearchFieldSize = "lg" | "md";

export interface SearchFieldProps {
  /** Controlled query; when set, the field shows it and onValueChange must update it. */
  value?: string;
  /** Initial query when uncontrolled (default ""). */
  defaultValue?: string;
  /** Called on every edit and with "" when the clear button is pressed. */
  onValueChange?: (value: string) => void;
  /** Enter / submit. */
  onSearch?: (value: string) => void;
  /** lg = search overlay, md = in-nav bar on results (default). */
  size?: SearchFieldSize;
  /** Production "Search films, directors, actors…" (de "Filme, Regisseure, Schauspieler suchen…"). Label text; English default, pass German on DE screens. */
  placeholder?: string;
  /** Accessible name of the field and the search landmark (default "Search"). Label text; English default, pass German on DE screens. */
  label?: string;
  /** Accessible name of the clear button (default "Clear search"). No production source. Label text; English default, pass German on DE screens. */
  clearLabel?: string;
  /** Focuses the input on mount. */
  autoFocus?: boolean;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const sizes: Record<SearchFieldSize, string> = {
  lg: "rounded-2xl py-4 shadow-[0_8px_10px_-6px_rgb(0_0_0/0.1),0_20px_25px_-5px_rgb(0_0_0/0.1)]",
  md: "rounded-sooner py-[11px] backdrop-blur-cta shadow-[0_8px_10px_-6px_rgb(0_0_0/0.1)]",
};

/**
 * Search input (design "Search Nav" / search overlay "Form"): lucide search icon, 18px text, clear button once there is a query.
 * Use for: the film search query on the search overlay and results page.
 * Not for: form fields such as email or device code (use TextInput).
 */
export function SearchField({
  value,
  defaultValue = "",
  onValueChange,
  onSearch,
  size = "md",
  placeholder = "Search films, directors, actors…",
  label = "Search",
  clearLabel = "Clear search",
  autoFocus,
  className,
}: SearchFieldProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value ?? uncontrolled;
  const change = (next: string) => {
    setUncontrolled(next);
    onValueChange?.(next);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch?.(current);
  };

  return (
    <form role="search" aria-label={label} onSubmit={submit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex w-full items-center gap-3 border border-white/20 bg-white/10 px-5 text-white focus-within:border-white/40",
          sizes[size],
        )}
      >
        <Search className="size-6 shrink-0" strokeWidth={2} aria-hidden />
        <input
          type="search"
          value={current}
          onChange={(event) => change(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
          autoFocus={autoFocus}
          className="h-7 min-w-0 flex-1 bg-transparent text-lg leading-[1.28] text-white outline-none placeholder:text-white/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {current && (
          <button
            type="button"
            aria-label={clearLabel}
            onClick={() => change("")}
            className="flex size-5 shrink-0 items-center justify-center rounded-full text-white outline-none hover:text-white/70 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="size-5" strokeWidth={1.67} aria-hidden />
          </button>
        )}
      </div>
    </form>
  );
}
