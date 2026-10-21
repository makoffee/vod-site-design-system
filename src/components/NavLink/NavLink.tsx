import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Pick<LinkProps, "href" | "prefetch"> {
  /** Master axis active[false,true]: true adds the 2px violet bottom border. */
  active?: boolean;
}

/** Master 0bc97b853c801178: 64px tall header tab, typography.nav.tab. */
export function NavLink({ active = false, className, children, ...props }: NavLinkProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-16 items-center border-b-2 px-4 text-nav-tab uppercase text-white outline-none transition-colors",
        "focus-visible:bg-white/10",
        // Hover is not drawn in the design; kept subtle.
        active ? "border-sooner-primary" : "border-transparent hover:text-sooner-primary-light",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
