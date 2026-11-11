import Link from "next/link";
import { cn } from "@/lib/cn";
import { accountNavItems, type AccountNavItem } from "../AccountNav/AccountNav";

export interface AccountMenuProps {
  /** Account sections with label and href; defaults to accountNavItems (English). Pass accountNavDe on DE screens. */
  items?: AccountNavItem[];
  /** Log out row text ("Log out"). Label text; English default, pass German on DE screens. */
  logoutLabel?: string;
  /** Accessible name of the menu ("Account"). Label text; English default, pass German on DE screens. */
  label?: string;
  /** Log out click. */
  onLogout?: () => void;
  /** Id for aria-controls on the button that opens it. */
  id?: string;
  /** Extra classes for the root (layout/position only; don't override colours). */
  className?: string;
}

const row =
  "block w-full px-4 py-3 text-left text-sm text-white no-underline outline-none transition-colors hover:bg-white/10 focus-visible:bg-white/10";

/**
 * Account dropdown under the Header Avatar (production sooner.de, logged in): the account sections as 44px rows, then
 * Log out in red behind a hairline. Floating glass (as LanguageSelect's menu), 208px wide.
 * Use for: the logged-in Header's avatar menu (Header renders it; pass `accountItems` / labels there).
 * Not for: the account pages' own section navigation (use AccountNav).
 */
export function AccountMenu({ items = accountNavItems, logoutLabel = "Log out", label = "Account", onLogout, id, className }: AccountMenuProps) {
  return (
    <div id={id} role="menu" aria-label={label} className={cn("surface-glass surface-glass-floating w-52 overflow-hidden rounded-xl", className)}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} role="menuitem" className={row}>
          {item.label}
        </Link>
      ))}
      <button type="button" role="menuitem" onClick={onLogout} className={cn(row, "border-t border-white/10 text-red-400")}>
        {logoutLabel}
      </button>
    </div>
  );
}
