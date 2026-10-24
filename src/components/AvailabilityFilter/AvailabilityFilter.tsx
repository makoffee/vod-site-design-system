"use client";

import { ChevronDown, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SoonerBasket } from "../_shared/icons";

export type Availability = "all" | "subscription" | "rentals";

/** bar = segmented glass bar (desktop discover/collection), menu = compact dropdown (mobile). */
export type AvailabilityFilterVariant = "bar" | "menu";

/** ghost = ghost-button glass (default); floating = darker tint where content scrolls under the filter (discover). */
export type AvailabilityFilterSurface = "ghost" | "floating";

export interface AvailabilityFilterProps {
  /** Selected option (controlled): all, subscription or rentals. */
  value?: Availability;
  /** Initial option when uncontrolled; default "all". */
  defaultValue?: Availability;
  /** Called with the option the user picks. */
  onValueChange?: (value: Availability) => void;
  /** bar = segmented glass bar (default); menu = compact dropdown for narrow screens. */
  variant?: AvailabilityFilterVariant;
  /** ghost = ghost-button glass (default); floating = darker tint where content scrolls underneath. */
  surface?: AvailabilityFilterSurface;
  /** Option labels; defaults "All", "Subscription", "Rentals". Label text; English default, pass German on DE screens. */
  labels?: Partial<Record<Availability, string>>;
  /** Accessible group name (production string "Availability"). Label text; English default, pass German on DE screens. */
  label?: string;
  /** Opens the menu variant on mount (documentation of the open state). */
  defaultOpen?: boolean;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const icons: Record<Availability, ReactNode> = {
  all: null,
  subscription: <Play className="size-4" fill="currentColor" strokeWidth={1.5} aria-hidden />,
  rentals: <SoonerBasket className="h-[18px] w-4" />,
};

const focusVisible = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Discover/collection availability switch: glass bar with a white pill on the active
 * option, or a dropdown on mobile. surface ghost (default) is the ghost-button glass; floating adds a dark tint for
 * places where content scrolls under the filter. The dropdown panel is always floating. Every option keeps its icon.
 * Use for: filtering a film grid or feed by All / Subscription / Rentals on discover and collection pages.
 * Not for: other option switches such as plan periods (use SegmentedControl) or grid/list view (use ViewToggle).
 */
export function AvailabilityFilter({
  value,
  defaultValue = "all",
  onValueChange,
  variant = "bar",
  surface = "ghost",
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
      <AvailabilityMenu
        current={current}
        text={text}
        label={label}
        surface={surface}
        defaultOpen={defaultOpen}
        onSelect={select}
        className={className}
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("surface-glass inline-flex items-center gap-2 rounded-sooner p-1.5", surface === "floating" && "surface-glass-floating", className)}
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
  surface: AvailabilityFilterSurface;
  defaultOpen: boolean;
  onSelect: (option: Availability) => void;
  className?: string;
}

function AvailabilityMenu({ current, text, label, surface, defaultOpen, onSelect, className }: AvailabilityMenuProps) {
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
          surface === "floating" && "surface-glass-floating",
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
          className="surface-glass surface-glass-floating absolute top-full left-0 z-30 mt-2 flex min-w-[139px] flex-col gap-1 rounded-xl p-1 shadow-[0_4px_8px_rgb(0_0_0/0.25)]"
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
