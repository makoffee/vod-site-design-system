import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** primary = violet, white = white on dark imagery, black = the yearly plan's button on violet. */
export type ActionTone = "primary" | "white" | "black";

export interface Action {
  label: string;
  href: string;
  tone?: ActionTone;
  /** Optional leading icon (e.g. the rent basket on the hero). */
  icon?: ReactNode;
}

const tones: Record<ActionTone, string> = {
  primary: "bg-sooner-primary text-white hover:bg-sooner-primary-dark",
  white: "bg-white text-black hover:bg-white/90",
  black: "border border-black bg-black text-white hover:bg-black/80",
};

export interface ActionLinkProps extends Action {
  /** Hero and CTA banners set their labels in caps; collection blocks don't. */
  uppercase?: boolean;
  className?: string;
}

/**
 * Link styled as a button, as on the production marketing slices (hero, image_cta_banner,
 * featured_collection_block): 48px min height, 10px radius, 16/24 medium.
 */
export function ActionLink({ label, href, tone = "primary", icon, uppercase = false, className }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 max-w-full items-center justify-center gap-2.5 rounded-sooner px-6 py-3 text-center text-base leading-6 font-medium no-underline transition-colors",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-80 motion-reduce:transition-none",
        uppercase && "uppercase",
        tones[tone],
        className,
      )}
    >
      {icon}
      <span className="min-w-0 break-words">{label}</span>
    </Link>
  );
}
