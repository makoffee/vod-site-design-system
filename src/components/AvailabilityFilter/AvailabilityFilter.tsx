"use client";

import { ChevronDown, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SoonerBasket } from "../_shared/icons";

export type Availability = "all" | "subscription" | "rentals";

/** bar = segmented glass bar (desktop discover/collection), menu = compact dropdown (design "Filter context menu", 393 screens). */
export type AvailabilityFilterVariant = "bar" | "menu";

export interface AvailabilityFilterProps {
  value?: Availability;
  defaultValue?: Availability;
  onValueChange?: (value: Availability) => void;
  variant?: AvailabilityFilterVariant;
  /** Option labels; defaults are the design's copy ("All", "Subscription", "Rentals"). */
  labels?: Partial<Record<Availability, string>>;
  /** Accessible group name (production string "Availability"). */
  label?: string;
  /** Opens the menu variant on mount (documentation of the open state). */
  defaultOpen?: boolean;
  className?: string;
}

const icons: Record<Availability, ReactNode> = {
  all: null,
  subscription: <Play className="size-4" fill="currentColor" strokeWidth={1.5} aria-hidden />,
  rentals: <SoonerBasket className="h-[18px] w-4" />,
};

const focusVisible = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Discover/collection availability switch (design "AvailabilityFilter"): glass bar with a white pill on the active
 * option, or a dropdown on mobile. Both use the shared surface-glass recipe, so the same component works over black
 * pages, collection art and bright film covers. Every option keeps its icon, active or not.
 */
export function AvailabilityFilter({
  value,
  defaultValue = "all",
  onValueChange,
  variant = "bar",
  labels,
  label = "Availability",
  defaultOpen = false,
  className,
}: AvailabilityFilterProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value ?? uncontrolled;
  const text: Record<Availability, string> = { all: "All", subscription: "Subscription", rentals: "Rentals", ...labels };
  const select = (option: Availability) => {
    setUncontrolled(option);
    onValueChange?.(option);
  };

  if (variant === "menu") {
    return (
      <AvailabilityMenu current={current} text={text} label={label} defaultOpen={defaultOpen} onSelect={select} className={className} />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("surface-glass inline-flex items-center gap-2 rounded-sooner p-1.5", className)}
    >
      {(Object.keys(text) as Availability[]).map((option) => {
        const active = option === current;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => select(option)}
            className={cn(
              "flex h-9 items-center gap-2 text-sm font-medium transition-colors",
              focusVisible,
              active ? "rounded-lg bg-white px-4 text-surface-uni" : "rounded-sooner px-2 text-white/60 hover:text-white",
            )}
          >
            {icons[option] && <span className={active ? undefined : "text-white"}>{icons[option]}</span>}
            {text[option]}
          </button>
        );
      })}
    </div>
  );
}

interface AvailabilityMenuProps {
  current: Availability;
  text: Record<Availability, string>;
  label: string;
  defaultOpen: boolean;
  onSelect: (option: Availability) => void;
  className?: string;
}

function AvailabilityMenu({ current, text, label, defaultOpen, onSelect, className }: AvailabilityMenuProps) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        aria-label={`${label}: ${text[current]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "surface-glass flex h-9 items-center gap-2 rounded-sooner px-3 text-sm font-medium text-white",
          focusVisible,
        )}
      >
        {text[current]}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} strokeWidth={2} aria-hidden />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute top-full left-0 z-30 mt-2 flex min-w-[139px] flex-col gap-1 rounded-xl border border-white/10 bg-surface-card/80 p-1 shadow-[0_4px_8px_rgb(0_0_0/0.25)] backdrop-blur-cta"
        >
          {(Object.keys(text) as Availability[]).map((option) => {
            const active = option === current;
            return (
              <button
                key={option}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-lg px-3 text-sm whitespace-nowrap transition-colors",
                  focusVisible,
                  active ? "justify-center bg-gray-100 text-gray-900" : "text-white hover:bg-white/10",
                )}
              >
                {icons[option]}
                {text[option]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
