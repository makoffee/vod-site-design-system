import { Bookmark } from "lucide-react";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import type { Locale } from "@/i18n/locale";
import { filmCardDe, watchlistDe } from "@/i18n/de";
import { AppShell, PageTitle } from "./AppShell";
import type { FilmSummary } from "./content";

export interface WatchlistScreenProps {
  /** Saved titles; empty shows the empty state. */
  films?: FilmSummary[];
  locale?: Locale;
}

/**
 * Watchlist (production sooner.de/watchlist "My list"): page title, then the saved titles as a poster grid (the
 * collection grid) or the empty state. Production sets this title in Playfair; it uses PageTitle like the other list pages.
 */
export function WatchlistScreen({ films = [], locale = "en" }: WatchlistScreenProps) {
  const de = locale === "de";
  const l = de ? watchlistDe : { title: "My list", empty: "Your watchlist is empty" };
  return (
    <AppShell active="watchlist" auth="logged-in" locale={locale}>
      <div className="@container flex flex-col gap-8 px-6 pt-8 pb-24">
        <PageTitle>{l.title}</PageTitle>
        {films.length ? (
          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-4 @4xl:gap-y-12 @5xl:grid-cols-5 @7xl:grid-cols-6">
            {films.map((film) => (
              <FilmCard key={film.id} title={film.title} href={film.href} badge={film.badge} rentable={film.rentable} {...(de ? filmCardDe : {})} />
            ))}
          </div>
        ) : (
          <EmptyState surface="plain" icon={<Bookmark strokeWidth={1.5} aria-hidden />} message={l.empty} />
        )}
      </div>
    </AppShell>
  );
}
