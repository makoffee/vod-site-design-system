"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { AvailabilityFilter } from "@/components/AvailabilityFilter/AvailabilityFilter";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { Chip } from "@/components/Chip/Chip";
import { FeedRow } from "@/components/FeedRow/FeedRow";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { SearchField } from "@/components/SearchField/SearchField";
import { ViewToggle, type CollectionView } from "@/components/ViewToggle/ViewToggle";
import { FilmListItem } from "@/components/FilmListItem/FilmListItem";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Search } from "lucide-react";
import { availabilityDe, collectionHeaderDe, feedRowDe, filmCardDe, filmListItemDe, searchDe, searchResultsDe, statesDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";
import { placeholderCatalog } from "@/mocks/placeholder";
import { AppShell } from "./AppShell";
import type { Catalog, FilmSummary } from "./content";

export interface SearchScreenProps {
  defaultQuery?: string;
  /** Results for the query (films from the catalogue by default); an empty list shows the no-results state. */
  results?: FilmSummary[];
  /** Screen language: English (default, Storybook) or German (the /search route). */
  locale?: Locale;
  /** Suggestions, feeds and default results; placeholder content by default (the /search route passes the catalogue). */
  catalog?: Catalog;
}

/** Production EN strings (Copy/production-strings.json; "results for" capitalised as the heading's first word). */
const searchEn = {
  resultsFor: "Results for",
  noResultsFor: "No results for",
  noResultsHint: "Try a different title, director or actor",
};

/**
 * Search results page, desktop and mobile. Without a query: the large
 * field, suggested searches and feeds. With a query: in-nav field, availability filter, grid switch, results grid.
 */
export function SearchScreen({ defaultQuery = "", results, locale = "en", catalog = placeholderCatalog }: SearchScreenProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [view, setView] = useState<CollectionView>("grid");
  const de = locale === "de";
  const c = catalog;
  const hits = results ?? [...c.recommended, ...c.exclusives, ...c.newToRent, ...c.recommended, ...c.exclusives, ...c.newToRent].slice(0, 36);
  const t = de ? { resultsFor: searchResultsDe.resultsFor, noResultsFor: statesDe.noResultsFor, noResultsHint: statesDe.noResultsHint } : searchEn;
  const quoted = de ? `„${query}“` : `“${query}”`;
  const row = de ? feedRowDe : {};
  const card = de ? filmCardDe : {};
  const field = de ? searchDe : {};
  const filter = de ? availabilityDe : {};
  const toggle = de ? { gridViewLabel: collectionHeaderDe.gridViewLabel, listViewLabel: collectionHeaderDe.listViewLabel } : {};

  if (!query) {
    return (
      <AppShell locale={locale}>
        <div className="@container flex flex-col gap-12 px-6 pt-8 pb-16">
          <div className="mx-auto flex w-full max-w-[768px] flex-col gap-6">
            <SearchField {...field} size="lg" value={query} onValueChange={setQuery} autoFocus />
            <div className="flex flex-wrap gap-2">
              {c.searchSuggestions.map((term, i) => (
                <Chip key={`${term}-${i}`} onClick={() => setQuery(term)}>
                  {term}
                </Chip>
              ))}
            </div>
          </div>
          <FeedRow {...row} title={c.rows.recommended} href="/channel/recommended">
            {c.recommended.map((f) => (
              <FilmCard {...card} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...row} title={c.rows.newToRent} href="/channel/new-to-rent">
            {c.newToRent.map((f) => (
              <FilmCard {...card} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...row} title={c.rows.collections} kind="square" href="/channels">
            {c.festivals.map((channel) => (
              <ChannelTile key={channel.id} {...channel} />
            ))}
          </FeedRow>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell locale={locale}>
      <div className="@container flex flex-col gap-6 px-6 pt-8 pb-16">
        <div className="flex items-center gap-4">
          <SearchField {...field} size="md" value={query} onValueChange={setQuery} className="flex-1" />
          <AvailabilityFilter {...filter} className="hidden @3xl:inline-flex" />
          <ViewToggle {...toggle} view={view} onViewChange={setView} className="hidden @3xl:flex" />
        </div>
        {/* No results: the empty state says it once; the results heading and its filters would only repeat it. */}
        <div className={cn("flex items-center justify-between gap-4", hits.length === 0 && "hidden")}>
          <h1 className="m-0 text-xl leading-[26px] font-bold tracking-[0.6px] text-white @min-[640px]:text-heading-section">
            {t.resultsFor} {quoted}
          </h1>
          <div className="flex items-center gap-3 @3xl:hidden">
            <AvailabilityFilter {...filter} variant="menu" />
            <ViewToggle {...toggle} view={view} onViewChange={setView} />
          </div>
        </div>
        {hits.length === 0 ? (
          <EmptyState
            surface="plain"
            icon={<Search strokeWidth={1.5} aria-hidden />}
            message={`${t.noResultsFor} ${quoted}`}
            description={t.noResultsHint}
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-5 @6xl:grid-cols-6">
            {hits.map((f, i) => (
              <FilmCard {...card} key={`${f.id}-${i}`} {...f} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 @2xl:gap-8">
            {hits.slice(0, 6).map((f, i) => (
              <FilmListItem
                {...(de ? filmListItemDe : {})}
                key={`${f.id}-${i}`}
                title={f.title}
                href={f.href}
                meta={c.collection.films[0].meta}
                synopsis={c.collection.films[0].synopsis}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
