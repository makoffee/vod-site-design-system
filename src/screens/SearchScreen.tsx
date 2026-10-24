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
import { availabilityDe, feedRowDe, filmCardDe, filmListItemDe, searchDe, searchResultsDe, statesDe } from "@/i18n/de";
import { collection, exclusives, festivals, newToRent, recommended, searchSuggestions, type FilmSummary } from "@/mocks/catalog";
import { AppShell } from "./AppShell";

export interface SearchScreenProps {
  defaultQuery?: string;
  /** Results for the query (mock catalogue by default); an empty list shows the no-results state. */
  results?: FilmSummary[];
}

const mockResults = [...recommended, ...exclusives, ...newToRent, ...recommended, ...exclusives, ...newToRent].slice(0, 36);

/**
 * Search (design "search results | Static / Sticky in-nav | 1440px" and "| 393px"). Without a query: the large
 * field, suggested searches and feeds. With a query: in-nav field, availability filter, grid switch, results grid.
 */
export function SearchScreen({ defaultQuery = "", results = mockResults }: SearchScreenProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [view, setView] = useState<CollectionView>("grid");

  if (!query) {
    return (
      <AppShell>
        <div className="@container flex flex-col gap-12 px-6 pt-8 pb-16">
          <div className="mx-auto flex w-full max-w-[768px] flex-col gap-6">
            <SearchField {...searchDe} size="lg" value={query} onValueChange={setQuery} autoFocus />
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((term) => (
                <Chip key={term} onClick={() => setQuery(term)}>
                  {term}
                </Chip>
              ))}
            </div>
          </div>
          <FeedRow {...feedRowDe} title="Recommended" href="/channel/recommended">
            {recommended.map((f) => (
              <FilmCard {...filmCardDe} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Recently Added" href="/channel/new-to-rent">
            {newToRent.map((f) => (
              <FilmCard {...filmCardDe} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Collections" kind="square" href="/channels">
            {festivals.map((channel) => (
              <ChannelTile key={channel.id} {...channel} />
            ))}
          </FeedRow>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="@container flex flex-col gap-6 px-6 pt-8 pb-16">
        <div className="flex items-center gap-4">
          <SearchField {...searchDe} size="md" value={query} onValueChange={setQuery} className="flex-1" />
          <AvailabilityFilter {...availabilityDe} className="hidden @3xl:inline-flex" />
          <ViewToggle view={view} onViewChange={setView} className="hidden @3xl:flex" />
        </div>
        {/* No results: the empty state says it once; the results heading and its filters would only repeat it. */}
        <div className={cn("flex items-center justify-between gap-4", results.length === 0 && "hidden")}>
          <h1 className="m-0 text-xl leading-[26px] font-bold tracking-[0.6px] text-white @min-[640px]:text-heading-section">
            {searchResultsDe.resultsFor} „{query}“
          </h1>
          <div className="flex items-center gap-3 @3xl:hidden">
            <AvailabilityFilter {...availabilityDe} variant="menu" />
            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>
        {results.length === 0 ? (
          <EmptyState
            surface="plain"
            icon={<Search strokeWidth={1.5} aria-hidden />}
            message={`${statesDe.noResultsFor} „${query}“`}
            description={statesDe.noResultsHint}
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-5 @6xl:grid-cols-6">
            {results.map((f, i) => (
              <FilmCard {...filmCardDe} key={`${f.id}-${i}`} {...f} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 @2xl:gap-8">
            {results.slice(0, 6).map((f, i) => (
              <FilmListItem
                {...filmListItemDe}
                key={`${f.id}-${i}`}
                title={f.title}
                href={f.href}
                meta={collection.films[0].meta}
                synopsis={collection.films[0].synopsis}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
