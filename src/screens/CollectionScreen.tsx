"use client";

import { useState } from "react";
import { CollectionHeader, type CollectionView } from "@/components/CollectionHeader/CollectionHeader";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { FilmListItem } from "@/components/FilmListItem/FilmListItem";
import { availabilityDe, filmCardDe, filmListItemDe } from "@/i18n/de";
import { collection } from "@/mocks/catalog";
import { AppShell } from "./AppShell";

export interface CollectionScreenProps {
  defaultView?: CollectionView;
  defaultExpanded?: boolean;
}

/** Collection page (design "collection view | list / Grid | 1440" and the 393 versions): banner, then a poster grid or film list. */
export function CollectionScreen({ defaultView = "list", defaultExpanded = false }: CollectionScreenProps) {
  const [view, setView] = useState(defaultView);

  return (
    <AppShell>
      <div className="@container mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6 pt-8 pb-16 @2xl:gap-8">
        <CollectionHeader
          title={collection.title}
          description={collection.description}
          view={view}
          onViewChange={setView}
          defaultExpanded={defaultExpanded}
          filterLabels={availabilityDe}
        />
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-4 @4xl:gap-y-12 @5xl:grid-cols-5">
            {collection.films.map((film) => (
              <FilmCard key={film.id} title={film.title} href={film.href} badge={film.badge} rentable={film.rentable} {...filmCardDe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 @2xl:gap-8">
            {collection.films.slice(0, 5).map((film) => (
              <FilmListItem key={film.id} {...film} {...filmListItemDe} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
