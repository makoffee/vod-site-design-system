"use client";

import { CircleX, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AnnouncementBarProps {
  message: string;
  /** Optional call to action on the right (design "Code einlösen"). */
  action?: { label: string; href: string };
  /** Screen-reader name of the close button; no production source. */
  closeLabel?: string;
  onClose?: () => void;
  className?: string;
}

const focusVisible = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

/**
 * Promo strip above the header (design "Pushdown Alert banner"): yellow bar, party icon + bold 14px message,
 * black action button and a close button. Dismissible.
 */
export function AnnouncementBar({ message, action, closeLabel = "Close", onClose, className }: AnnouncementBarProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div role="region" aria-label={message} className={cn("w-full border-b border-white/10 bg-announcement text-black", className)}>
      <div className="mx-auto flex min-h-16 w-full max-w-[1920px] items-center justify-between gap-4 px-6 py-2">
        <p className="m-0 flex min-w-0 items-center gap-4 text-sm leading-5 font-bold tracking-[0.35px]">
          <PartyPopper className="size-6 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0">{message}</span>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          {action && (
            <Link
              href={action.href}
              className={cn(
                "inline-flex h-9 items-center rounded-sooner bg-black px-4 text-sm font-medium tracking-[0.7px] text-white uppercase no-underline",
                focusVisible,
              )}
            >
              {action.label}
            </Link>
          )}
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
            className={cn("flex size-6 items-center justify-center rounded-full", focusVisible)}
          >
            <CircleX className="size-6" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
