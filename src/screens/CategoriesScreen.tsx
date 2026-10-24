import { GenreTile } from "@/components/GenreTile/GenreTile";
import type { Locale } from "@/i18n/locale";
import { getCatalog } from "@/mocks/catalog";
import { AppShell, PageTitle } from "./AppShell";

export interface CategoriesScreenProps {
  /** Screen language: English (default, Storybook) or German (the /categories route). */
  locale?: Locale;
  /** Page title; production "Genres" (EN) / "Genre" (DE). */
  title?: string;
}

/** Genres (production /en/categories and /de/categories): duotone genre tiles, 2 → 4 columns. */
export function CategoriesScreen({ locale = "en", title = locale === "de" ? "Genre" : "Genres" }: CategoriesScreenProps) {
  const { genres } = getCatalog(locale);
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
