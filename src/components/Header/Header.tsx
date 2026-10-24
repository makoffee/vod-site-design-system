"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { LanguageSelect, type Language } from "../LanguageSelect/LanguageSelect";
import { NavLink } from "../NavLink/NavLink";
import { SoonerLogo } from "../SoonerLogo/SoonerLogo";

// Axes mirror the Header master (57ed19848119b0dc): auth[logged-out,logged-in] × active[none,…,watchlist].
// The master's viewport[desktop,mobile] axis is not a prop: the layout follows the container (desktop from 1024px).
export type HeaderAuth = "logged-out" | "logged-in";
export type HeaderTab = "discover" | "collections" | "genres" | "magazine" | "watchlist";

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
  /** Tab text, one per HeaderTab ("Discover", "Collections", "Genres", "Magazine", "Watchlist"). */
  tabs: Record<HeaderTab, string>;
  /** Login button text ("Login"). */
  login: string;
  /** Sign up button text ("Sign up"). */
  signUp: string;
  /** Accessible name of the LanguageSelect ("Interface language"). */
  language: string;
}

export const headerLabels: HeaderLabels = {
  home: "Sooner home",
  navigation: "Main navigation",
  search: "Search",
  menu: "Menu",
  tabs: { discover: "Discover", collections: "Collections", genres: "Genres", magazine: "Magazine", watchlist: "Watchlist" },
  login: "Login",
  signUp: "Sign up",
  language: "Interface language",
};

export interface HeaderProps {
  /** logged-out (default) shows Login + Sign up (desktop only); logged-in shows the Avatar instead. */
  auth?: HeaderAuth;
  /** Tab with the violet underline and aria-current; none (default) highlights no tab. */
  active?: HeaderTab | "none";
  /** Instance override: the DE/EN landing pages hide the Watchlist tab. */
  hideWatchlist?: boolean;
  /** Instance override: LanguageSelect label ("DE" on the DE landing page). */
  language?: Language;
  /** Avatar initials when logged in ("MK" on the master). */
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
  /** Menu button click (mobile layout only). */
  onMenu?: () => void;
  /** Tab, button and accessible-name text, merged over the English defaults (`headerLabels`). Label text; pass German on DE screens. */
  labels?: Partial<HeaderLabels>;
  /** Extra classes for the root (layout/spacing only; don't override colours). */
  className?: string;
}

const iconButton =
  "flex items-center justify-center rounded-sooner text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white";

/**
 * Sticky 64px site header (Header master): logo, nav tabs (Discover … Watchlist), search, LanguageSelect, and Login /
 * Sign up or the Avatar. Below 1024px of container width: logo, search, language, Avatar (logged in) and a menu
 * button; tabs and Login / Sign up are hidden. All text comes from `labels` (English defaults).
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
  labels,
  className,
}: HeaderProps) {
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
  const avatar = <Avatar initials={userInitials} name={userName} />;

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
          <button type="button" onClick={onMenu} aria-label={l.menu} className={cn(iconButton, "size-6")}>
            <Menu className="size-6" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
