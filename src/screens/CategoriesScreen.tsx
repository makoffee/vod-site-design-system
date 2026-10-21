import { GenreTile } from "@/components/GenreTile/GenreTile";
import { genres } from "@/mocks/catalog";
import { AppShell, PageTitle } from "./AppShell";

/** Genres (design "Genres | 1440px", production /de/categories "Kategorien"): duotone genre tiles, 2 → 4 columns. */
export function CategoriesScreen({ title = "Kategorien" }: { title?: string }) {
  return (
    <AppShell active="genres">
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
