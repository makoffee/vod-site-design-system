import { GenreTile } from "@/components/GenreTile/GenreTile";
import type { Locale } from "@/i18n/locale";
import { placeholderCatalog } from "@/mocks/placeholder";
import { AppShell, PageTitle } from "./AppShell";
import type { Catalog } from "./content";

export interface CategoriesScreenProps {
  /** Screen language: English (default, Storybook) or German (the /categories route). */
  locale?: Locale;
  /** Page title; production "Genres" (EN) / "Genre" (DE). */
  title?: string;
  /** Genres; placeholder content by default (the /categories route passes the catalogue). */
  catalog?: Catalog;
}

/** Genres (production /en/categories and /de/categories): duotone genre tiles, 2 → 4 columns. */
export function CategoriesScreen({ locale = "en", title = locale === "de" ? "Genre" : "Genres", catalog = placeholderCatalog }: CategoriesScreenProps) {
  const { genres } = catalog;
  return (
    <AppShell active="genres" locale={locale}>
      <div className="@container flex flex-col gap-8 px-6 pt-8 pb-16">
        <PageTitle>{title}</PageTitle>
        <div className="grid grid-cols-2 gap-4 @4xl:grid-cols-3 @6xl:grid-cols-4">
          {genres.map((genre) => (
            <GenreTile key={genre.id} {...genre} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
