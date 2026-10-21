"use client";

import { Play } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { widthClass, type Sizing } from "../_shared/sizing";

// Axes mirror the Button master on "1 Design System" (0b03c8fea86a51a4); values follow production's
// .sooner-cta-* / .sooner-filled-btn classes on sooner.de, which are the source of truth.
export type ButtonVariant =
  | "cta-primary"
  | "cta-ghost"
  | "cta-white"
  | "cta-text"
  | "cta-light"
  | "cta-round";
/** hover pins the hover look for documentation; real interaction uses CSS. */
export type ButtonState = "default" | "hover" | "disabled";
/** sm = 36 (header, .sooner-filled-btn), md = 48 (compact design size, no production equivalent), lg = 56 (.sooner-cta-*). */
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  state?: ButtonState;
  size?: ButtonSize;
  /** fill = stretch to the parent (default for md/lg, as on every design instance); hug = fit the label (default for sm). */
  width?: Sizing;
}

// Production has no focus variant; keyboard focus uses its skip-link pattern (2px white outline, 2px offset).
const focusVisible = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const variants: Record<ButtonVariant, { idle: string; hover: string; hovered: string; disabled: string }> = {
  // .sooner-cta-primary: 600, uppercase, 0.03em
  "cta-primary": {
    idle: "bg-sooner-primary text-white font-semibold uppercase tracking-[0.03em]",
    hover: "hover:bg-sooner-primary-dark",
    hovered: "bg-sooner-primary-dark",
    disabled: "bg-white/10 text-gray-200 backdrop-blur-cta font-semibold uppercase tracking-[0.03em]",
  },
  // .sooner-cta-ghost: 500, 0.025em, white/10 + blur 10, hover white/18
  "cta-ghost": {
    idle: "bg-white/10 text-white backdrop-blur-cta font-medium tracking-[0.025em]",
    hover: "hover:bg-white/18",
    hovered: "bg-white/18",
    disabled: "bg-white/10 text-gray-200 backdrop-blur-cta font-medium tracking-[0.025em]",
  },
  // .sooner-cta-white: 600, hover white/85 (color.action.white-hover), disabled 60% opacity
  "cta-white": {
    idle: "bg-white text-black font-semibold",
    hover: "hover:bg-white/85",
    hovered: "bg-white/85",
    disabled: "bg-white text-black font-semibold opacity-60",
  },
  "cta-text": {
    idle: "bg-transparent text-white",
    hover: "hover:bg-white/10",
    hovered: "bg-white/10",
    disabled: "text-white/40",
  },
  "cta-light": {
    idle: "bg-gray-100 text-gray-900",
    hover: "hover:bg-white",
    hovered: "bg-white",
    disabled: "bg-white/25 text-gray-200",
  },
  // .sooner-cta-round: 56 circle, white/10 + blur 10, hover white/18
  "cta-round": {
    idle: "bg-white/10 text-white backdrop-blur-cta",
    hover: "hover:bg-white/18",
    hovered: "bg-white/18",
    disabled: "bg-white/5 text-white/40",
  },
};

// md/lg are 16/24 with the variant's weight and case (above); sm uses typography.nav.action.
const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

export function Button({
  variant = "cta-primary",
  state = "default",
  size = "md",
  width,
  disabled,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === "disabled";
  const styles = variants[variant];
  const isRound = variant === "cta-round";

  return (
    <button
      type={type}
      disabled={isDisabled}
      data-state={state}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-colors outline-none",
        focusVisible,
        "disabled:cursor-not-allowed",
        isRound ? "size-14 rounded-full" : cn("rounded-sooner", sizes[size]),
        !isRound && cn(widthClass[width ?? (size === "sm" ? "hug" : "fill")], "shrink"),
        isDisabled ? styles.disabled : cn(styles.idle, state === "hover" ? styles.hovered : styles.hover),
        // sm keeps typography.nav.action (14/500, 0.05em, uppercase) regardless of variant.
        size === "sm" && "text-nav-action font-medium uppercase tracking-[0.05em]",
        // cta-light keeps typography.text.sm-semibold (UNI banner).
        variant === "cta-light" && "px-3 text-sm font-semibold normal-case tracking-normal",
        className,
      )}
      {...props}
    >
      {isRound && !children ? <Play className="size-8 translate-x-0.5" strokeWidth={1.5} aria-hidden /> : children}
    </button>
  );
}
