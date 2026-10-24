"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type AccountSection = "profile" | "settings" | "subscriptions" | "rentals" | "parental-pin" | "devices";

export interface AccountNavItem {
  id: AccountSection;
  label: string;
  href: string;
}

// Production /en/account navigation (routes as on sooner.de).
export const accountNavItems: AccountNavItem[] = [
  { id: "profile", label: "Profile", href: "/account" },
  { id: "settings", label: "Settings", href: "/account/settings" },
  { id: "subscriptions", label: "Subscription", href: "/account/subscriptions" },
  { id: "rentals", label: "Rentals", href: "/account/purchases" },
  { id: "parental-pin", label: "Parental & Adult Pin", href: "/account/parental_pin" },
  { id: "devices", label: "Devices", href: "/account/devices" },
];

export interface AccountNavProps {
  active: AccountSection;
  items?: AccountNavItem[];
  /** list = side navigation, menu = collapsed dropdown, auto = menu below a 48rem container and list above it. */
  layout?: "list" | "menu" | "auto";
  /** Accessible name of the navigation. */
  label?: string;
  className?: string;
}

const focus = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const item = "block w-full rounded-xl border px-4 py-3 text-left text-sm font-medium no-underline transition-colors";
const idle = "border-transparent text-white/60 hover:bg-white/5 hover:text-white";
const current = "border-sooner-primary/30 bg-sooner-primary/15 text-white";

/**
 * Account section navigation (production sooner.de/account): a sticky list with the active section on a violet tint,
 * collapsing into a dropdown on narrow containers. Place it inside an @container (AccountScreen does).
 */
export function AccountNav({ active, items = accountNavItems, layout = "auto", label = "Account navigation", className }: AccountNavProps) {
  const [open, setOpen] = useState(false);
  const activeItem = items.find((i) => i.id === active) ?? items[0];

  const list = (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {items.map((i) => (
        <li key={i.id}>
          <Link href={i.href} aria-current={i.id === active ? "page" : undefined} className={cn(item, focus, i.id === active ? current : idle)} onClick={() => setOpen(false)}>
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      {layout !== "list" && (
        <div className={cn("relative", layout === "auto" && "@3xl:hidden")}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn("flex w-full items-center justify-between rounded-xl border border-white/10 bg-black px-4 py-3 font-medium text-white", focus)}
          >
            {activeItem.label}
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
          </button>
          {open && <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-xl border border-white/10 bg-black p-1">{list}</div>}
        </div>
      )}
      {layout !== "menu" && <div className={cn(layout === "auto" && "hidden @3xl:block")}>{list}</div>}
    </nav>
  );
}
