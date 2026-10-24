import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Pick<LinkProps, "href" | "prefetch"> {
  /** true adds the 2px violet bottom border. */
  active?: boolean;
}

/**
 * 64px tall header tab, typography.nav.tab.
 * Use for: top-level navigation tabs in Header.
 * Not for: actions (use Button); small inline links (use TextAction).
 */
export function NavLink({ active = false, className, children, ...props }: NavLinkProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-16 items-center border-b-2 px-4 text-nav-tab uppercase text-white outline-none transition-colors",
        "focus-visible:bg-white/10",
        // Subtle hover.
        active ? "border-sooner-primary" : "border-transparent hover:text-sooner-primary-light",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
