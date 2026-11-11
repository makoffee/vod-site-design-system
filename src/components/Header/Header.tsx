"use client";

import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { AccountNavItem } from "../AccountNav/AccountNav";
import { AccountMenu } from "../AccountMenu/AccountMenu";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { LanguageSelect, type Language } from "../LanguageSelect/LanguageSelect";
import { NavLink } from "../NavLink/NavLink";
import { SoonerLogo } from "../SoonerLogo/SoonerLogo";

// auth[logged-out,logged-in] × active[none,…,watchlist].
// No viewport prop: the layout follows the container (desktop from 1024px).
export type HeaderAuth = "logged-out" | "logged-in";
export type HeaderTab = "discover" | "collections" | "genres" | "magazine" | "watchlist";

// Mobile menu rows (production sooner.de below 768px): not the desktop tabs.
export type MenuItem = "discover" | "channels" | "categories" | "search" | "watchlist";
const menuLinks: { id: Exclude<MenuItem, "search">; href: string; activeFor: HeaderTab | "none" }[] = [
  { id: "discover", href: "/discover", activeFor: "discover" },
  { id: "channels", href: "/channels", activeFor: "none" },
  { id: "categories", href: "/categories", activeFor: "genres" },
];

const tabs: { id: HeaderTab; href: string }[] = [
  { id: "discover", href: "/discover" },
  { id: "collections", href: "/collections" },
  { id: "genres", href: "/genres" },
  { id: "magazine", href: "/magazine" },
  { id: "watchlist", href: "/watchlist" },
];

/** Every string the Header renders. English by default; German screens pass `headerDe` from src/i18n/de.ts. */
export interface HeaderLabels {
  /** Accessible name of the logo link ("Sooner home"). */
  home: string;
  /** Accessible name of the tab nav ("Main navigation"). */
  navigation: string;
  /** Accessible name of the search icon button ("Search"). */
  search: string;
  /** Accessible name of the mobile menu button ("Menu"). */
  menu: string;
  /** Accessible name of the menu button while the menu is open ("Close menu"). */
  closeMenu: string;
  /** Mobile menu rows, as on production: Discover, Channels, Categories, Search, and Watchlist when logged in. */
  menuItems: Record<MenuItem, string>;
  /** Tab text, one per HeaderTab ("Discover", "Collections", "Genres", "Magazine", "Watchlist"). */
  tabs: Record<HeaderTab, string>;
  /** Login button text ("Login"). */
  login: string;
  /** Sign up button text ("Sign up"). */
  signUp: string;
  /** Accessible name of the LanguageSelect ("Interface language"). */
  language: string;
  /** Accessible name of the Avatar button and its menu ("Account"). */
  account: string;
  /** Log out row in the account menu ("Log out"). */
  logout: string;
}

export const headerLabels: HeaderLabels = {
  home: "Sooner home",
  navigation: "Main navigation",
  search: "Search",
  menu: "Menu",
  closeMenu: "Close menu",
  menuItems: { discover: "Discover", channels: "Channels", categories: "Categories", search: "Search", watchlist: "Watchlist" },
  tabs: { discover: "Discover", collections: "Collections", genres: "Genres", magazine: "Magazine", watchlist: "Watchlist" },
  login: "Login",
  signUp: "Sign up",
  language: "Interface language",
  account: "Account",
  logout: "Log out",
};

export interface HeaderProps {
  /** logged-out (default) shows Login + Sign up (desktop only); logged-in shows the Avatar instead. */
  auth?: HeaderAuth;
  /** Tab with the violet underline and aria-current; none (default) highlights no tab. */
  active?: HeaderTab | "none";
  /** Hides the Watchlist tab (DE/EN landing pages). */
  hideWatchlist?: boolean;
  /** LanguageSelect label ("DE" on the DE landing page). */
  language?: Language;
  /** Avatar initials when logged in (e.g. "MK"). */
  userInitials?: string;
  /** Full name for the Avatar's accessible name when logged in. */
  userName?: string;
  /** Called with the language picked in the LanguageSelect. */
  onLanguageChange?: (language: Language) => void;
  /** Search icon button click. */
  onSearch?: () => void;
  /** Login button click (logged out, desktop layout only). */
  onLogin?: () => void;
  /** Sign up button click (logged out, desktop layout only). */
  onSignUp?: () => void;
  /** Menu button click (mobile layout only), before the menu opens or closes. */
  onMenu?: () => void;
  /** Mobile menu open (controlled). Leave unset to let the menu button toggle it. Pass true to show the open state. */
  menuOpen?: boolean;
  /** Called with the new open state when the menu button is pressed. */
  onMenuOpenChange?: (open: boolean) => void;
  /** Account menu under the Avatar open (logged in; controlled). Leave unset to let the Avatar toggle it. */
  accountMenuOpen?: boolean;
  /** Account sections in the Avatar menu; defaults to the English account sections. Pass accountNavDe on DE screens. */
  accountItems?: AccountNavItem[];
  /** Log out click in the Avatar menu. */
  onLogout?: () => void;
  /** Tab, button and accessible-name text, merged over the English defaults (`headerLabels`). Label text; pass German on DE screens. */
  labels?: Partial<HeaderLabels>;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

// Mobile menu row: typography.nav.tab on a 44px row, violet/10 when active.
const menuItem =
  "rounded-lg px-4 py-3 text-nav-tab uppercase text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white";

const iconButton =
  "flex items-center justify-center rounded-sooner text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white";

/**
 * Sticky 64px site header: logo, nav tabs (Discover … Watchlist), search, LanguageSelect, and Login /
 * Sign up or the Avatar. Below 1024px of container width: logo, search, language, Avatar (logged in) and a menu
 * button that opens the menu (production rows: Discover, Channels, Categories, Search, Watchlist when logged in; Login /
 * Sign up when logged out). All text comes from
 * `labels` (English defaults).
 * Use for: the top bar of every page screen.
 * Not for: account-section navigation (use AccountNav).
 */
export function Header({
  auth = "logged-out",
  active = "none",
  hideWatchlist = false,
  language,
  userInitials = "MK",
  userName,
  onLanguageChange,
  onSearch,
  onLogin,
  onSignUp,
  onMenu,
  menuOpen,
  onMenuOpenChange,
  accountMenuOpen,
  accountItems,
  onLogout,
  labels,
  className,
}: HeaderProps) {
  const [openState, setOpenState] = useState(false);
  const open = menuOpen ?? openState;
  const [accountState, setAccountState] = useState(false);
  const accountOpen = accountMenuOpen ?? accountState;
  const toggleMenu = () => {
    onMenu?.();
    onMenuOpenChange?.(!open);
    if (menuOpen === undefined) setOpenState(!open);
  };
  const l = { ...headerLabels, ...labels, tabs: { ...headerLabels.tabs, ...labels?.tabs } };
  const loggedIn = auth === "logged-in";
  const visibleTabs = hideWatchlist ? tabs.filter((t) => t.id !== "watchlist") : tabs;

  const logo = (
    <Link
      href="/"
      aria-label={l.home}
      className="shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <SoonerLogo />
    </Link>
  );
  const languageSelect = <LanguageSelect value={language} onValueChange={onLanguageChange} label={l.language} />;
  // The Avatar opens the account menu (production: Account, Settings, … then Log out).
  const avatar = (
    <div className="relative">
      <button
        type="button"
        aria-label={l.account}
        aria-haspopup="menu"
        aria-expanded={accountOpen}
        onClick={() => accountMenuOpen === undefined && setAccountState(!accountOpen)}
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Avatar initials={userInitials} name={userName} aria-hidden />
      </button>
      {accountOpen && (
        <AccountMenu items={accountItems} label={l.account} logoutLabel={l.logout} onLogout={onLogout} className="absolute top-full right-0 z-50 mt-2" />
      )}
    </div>
  );

  return (
    <header className={cn("@container sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-glass", className)}>
      <div className="hidden h-16 items-center justify-between px-6 @5xl:flex">
        <div className="flex items-center gap-8">
          {logo}
          <nav aria-label={l.navigation} className="flex items-center gap-1">
            {visibleTabs.map((t) => (
              <NavLink key={t.id} href={t.href} active={active === t.id}>
                {l.tabs[t.id]}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={onSearch} aria-label={l.search} className={cn(iconButton, "size-9")}>
            <Search className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
          {languageSelect}
          {loggedIn ? (
            avatar
          ) : (
            <>
              <Button variant="cta-text" size="sm" onClick={onLogin}>
                {l.login}
              </Button>
              <Button variant="cta-primary" size="sm" onClick={onSignUp}>
                {l.signUp}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex h-16 items-center justify-between px-6 @5xl:hidden">
        {logo}
        <div className="flex items-center gap-4">
          <button type="button" onClick={onSearch} aria-label={l.search} className={cn(iconButton, "size-6")}>
            <Search className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
          {languageSelect}
          {loggedIn && avatar}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={open ? l.closeMenu : l.menu}
            aria-expanded={open}
            aria-controls="header-menu"
            className={cn(iconButton, "size-6")}
          >
            {open ? <X className="size-6" strokeWidth={1.5} aria-hidden /> : <Menu className="size-6" strokeWidth={1.5} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        // Mobile menu (production sooner.de below 768px): Discover, Channels, Categories, Search (+ Watchlist when logged
        // in) as full-width rows, then left-aligned Login / Sign up when logged out. It drops down inside the header.
        <div id="header-menu" className="border-t border-white/10 @5xl:hidden">
          <nav aria-label={l.navigation} className="flex flex-col gap-1 px-6 py-4">
            {menuLinks.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                aria-current={active !== "none" && active === m.activeFor ? "page" : undefined}
                className={cn(menuItem, active !== "none" && active === m.activeFor ? "bg-sooner-primary/10" : "hover:text-sooner-primary-light")}
              >
                {l.menuItems[m.id]}
              </Link>
            ))}
            <button type="button" onClick={onSearch} className={cn(menuItem, "text-left hover:text-sooner-primary-light")}>
              {l.menuItems.search}
            </button>
            {loggedIn && !hideWatchlist && (
              <Link
                href="/watchlist"
                aria-current={active === "watchlist" ? "page" : undefined}
                className={cn(menuItem, active === "watchlist" ? "bg-sooner-primary/10" : "hover:text-sooner-primary-light")}
              >
                {l.menuItems.watchlist}
              </Link>
            )}
            {!loggedIn && (
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="cta-text" size="sm" width="fill" onClick={onLogin} className="justify-start">
                  {l.login}
                </Button>
                <Button variant="cta-primary" size="sm" width="fill" onClick={onSignUp} className="justify-start">
                  {l.signUp}
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
