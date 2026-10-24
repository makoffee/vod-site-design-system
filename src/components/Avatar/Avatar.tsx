import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Full name; initials are derived from it unless `initials` is given. */
  name?: string;
  /** Text in the circle; overrides the initials derived from `name` (first letters of the first two words). */
  initials?: string;
}

const toInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");

/**
 * 32px violet circle, initials in text.xs-semibold.
 * Use for: the logged-in user in Header and other compact user references.
 */
export function Avatar({ name, initials, className, ...props }: AvatarProps) {
  const text = initials ?? (name ? toInitials(name) : "");
  return (
    <span
      role="img"
      aria-label={name ?? text}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-sooner-primary text-xs font-semibold text-white",
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
