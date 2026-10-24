"use client";

import Image from "next/image";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { widthClass, type Sizing } from "../_shared/sizing";

// Axes mirror the SsoButton master (aaddcace0e7059b4): provider[google,apple,amazon]; 50px circle.
export type SsoProvider = "google" | "apple" | "amazon";

const GoogleGlyph = () => (
  <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const providers: Record<SsoProvider, { name: string; className: string; glyph: ReactNode }> = {
  google: { name: "Google", className: "bg-gray-100", glyph: <GoogleGlyph /> },
  apple: { name: "Apple", className: "bg-white text-black", glyph: <AppleGlyph /> },
  // No vector source for the Amazon mark yet (simple-icons dropped it); the master's PNG stays until one is supplied.
  amazon: {
    name: "Amazon",
    className: "overflow-hidden",
    glyph: <Image src="/images/sso/amazon.png" alt="" width={50} height={50} className="size-full" />,
  },
};

export interface SsoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Native button type; "button" unless set ("submit" only inside a form that should submit). */
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /** google (gray-100 circle), apple (white circle, black mark) or amazon (raster mark). */
  provider: SsoProvider;
  /** Accessible label; English default "Sign in with <Provider>", pass German on DE screens. */
  label?: string;
}

/**
 * 50px round sign-in button showing only the provider mark (SsoButton master). Native <button>, type="button" unless set.
 * Use for: SSO provider choices on login/signup; SsoButtonGroup renders the standard Google / Apple / Amazon row.
 * Not for: text actions such as the institute login (use Button).
 */
export function SsoButton({ provider, label, className, type = "button", ...props }: SsoButtonProps) {
  const p = providers[provider];
  return (
    <button
      type={type}
      aria-label={label ?? `Sign in with ${p.name}`}
      className={cn(
        "flex size-[50px] shrink-0 items-center justify-center rounded-full outline-none transition-opacity hover:opacity-85",
        "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        p.className,
        className,
      )}
      {...props}
    >
      {p.glyph}
    </button>
  );
}

export interface SsoButtonGroupProps {
  /** Providers to show, in order; defaults to google, apple, amazon. */
  providers?: SsoProvider[];
  /** Called with the provider whose button was clicked. */
  onSelect?: (provider: SsoProvider) => void;
  /** Accessible label per provider name; English default "Sign in with <Provider>", pass German on DE screens. */
  labelFor?: (providerName: string) => string;
  /** fill (default, as on the design instances) centres the buttons in the parent; hug fits them. */
  width?: Sizing;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

/** Master dff7da5cebbb4728: the three providers centred with a 16px gap. */
export function SsoButtonGroup({
  providers: list = ["google", "apple", "amazon"],
  onSelect,
  labelFor,
  width = "fill",
  className,
}: SsoButtonGroupProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4", widthClass[width], className)}>
      {list.map((p) => (
        <SsoButton key={p} provider={p} label={labelFor?.(providers[p].name)} onClick={() => onSelect?.(p)} />
      ))}
    </div>
  );
}
