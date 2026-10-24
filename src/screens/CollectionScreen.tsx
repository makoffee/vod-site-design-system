"use client";

import { useState } from "react";
import { CollectionHeader, type CollectionView } from "@/components/CollectionHeader/CollectionHeader";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { FilmListItem } from "@/components/FilmListItem/FilmListItem";
import { availabilityDe, collectionHeaderDe, filmCardDe, filmListItemDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";
import { getCatalog } from "@/mocks/catalog";
import { AppShell } from "./AppShell";

export interface CollectionScreenProps {
  defaultView?: CollectionView;
  defaultExpanded?: boolean;
  /** Screen language: English (default, Storybook) or German (the /collection/[id] route). */
  locale?: Locale;
}

/**
 * Collection page (design "collection view | list / Grid | 1440" and the 393 versions): banner, then a poster grid or
 * film list. Collection and films are the design's placeholders.
 */
export function CollectionScreen({ defaultView = "list", defaultExpanded = false, locale = "en" }: CollectionScreenProps) {
  const [view, setView] = useState(defaultView);
  const de = locale === "de";
  const { collection } = getCatalog(locale);

  return (
    <AppShell locale={locale}>
      {/* Content caps at 1920 (widest gutter target, 2026-10-22); 1440 screens and laptops are the primary target. */}
      <div className="@container mx-auto flex w-full max-w-[1920px] flex-col gap-4 px-6 pt-8 pb-16 @2xl:gap-8">
        <CollectionHeader
          title={collection.title}
          description={collection.description}
          view={view}
          onViewChange={setView}
          defaultExpanded={defaultExpanded}
          {...(de ? { ...collectionHeaderDe, filterLabels: availabilityDe } : {})}
        />
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-4 @4xl:gap-y-12 @5xl:grid-cols-5 @7xl:grid-cols-6">
            {collection.films.map((film) => (
              <FilmCard key={film.id} title={film.title} href={film.href} badge={film.badge} rentable={film.rentable} {...(de ? filmCardDe : {})} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 @2xl:gap-8">
            {collection.films.slice(0, 5).map((film) => (
              <FilmListItem key={film.id} {...film} {...(de ? filmListItemDe : {})} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
