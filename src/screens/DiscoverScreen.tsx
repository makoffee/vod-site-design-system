import { AvailabilityFilter } from "@/components/AvailabilityFilter/AvailabilityFilter";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { CollectionFeature } from "@/components/CollectionFeature/CollectionFeature";
import { EditorialSlice } from "@/components/EditorialSlice/EditorialSlice";
import { FeaturedFilmCard } from "@/components/FeaturedFilmCard/FeaturedFilmCard";
import { FeedItem, FeedRow } from "@/components/FeedRow/FeedRow";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { MaskTile } from "@/components/MaskTile/MaskTile";
import { PromoHero } from "@/components/PromoHero/PromoHero";
import type { Locale } from "@/i18n/locale";
import { placeholderCatalog, placeholderEditorial } from "@/mocks/placeholder";
import type { Catalog, DiscoverEditorial, FilmSummary } from "./content";
import { AppShell } from "./AppShell";
import { availabilityDe, featuredFilmCardDe, feedRowDe, filmCardDe, promoHeroDe } from "@/i18n/de";

export interface DiscoverScreenProps {
  /** Screen language: English (default, Storybook) or German (the /discover route). */
  locale?: Locale;
  /** Films, channels and row titles; placeholder content by default (the /discover route passes the catalogue). */
  catalog?: Catalog;
  /** Promo hero and editorial blocks; placeholder content by default. */
  editorial?: DiscoverEditorial;
}

/**
 * Discover (production /en/discover and /de/discover): promo hero + availability filter,
 * then feeds and editorial slices in production's section order.
 */
export function DiscoverScreen({ locale = "en", catalog = placeholderCatalog, editorial = placeholderEditorial }: DiscoverScreenProps) {
  const de = locale === "de";
  const c = catalog;
  const e = editorial;
  const [slice1, slice2, slice3] = e.slices;
  const row = de ? feedRowDe : {};
  const card = de ? filmCardDe : {};
  const [featured, ...upcoming] = c.comingSoon;

  const tallRow = (title: string, films: FilmSummary[], href?: string) => (
    <FeedRow {...row} title={title} href={href}>
      {films.map((f) => (
        <FilmCard {...card} key={f.id} {...f} />
      ))}
    </FeedRow>
  );
  const wideRow = (title: string, films: FilmSummary[]) => (
    <FeedRow {...row} title={title} kind="wide">
      {films.map((f) => (
        <FilmCard {...card} key={f.id} aspect="wide" {...f} />
      ))}
    </FeedRow>
  );

  return (
    <AppShell active="discover" locale={locale}>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col">
          <PromoHero {...(de ? promoHeroDe : {})} slides={e.promoSlides} />
          <AvailabilityFilter {...(de ? availabilityDe : {})} surface="floating" className="mx-auto my-4" />
        </div>
        <div className="flex flex-col gap-12 pb-16">
          {tallRow(c.rows.newToRent, c.newToRent, "/channel/new-to-rent")}
          {wideRow(c.rows.justReleased, c.exclusives)}
          <CollectionFeature {...e.feature}>
            {c.exclusives.slice(0, 4).map((f) => (
              <FilmCard {...card} key={f.id} {...f} />
            ))}
          </CollectionFeature>
          <FeedRow {...row} title={c.rows.festivals} kind="square" href="/channels">
            {c.festivals.map((ch) => (
              <ChannelTile key={ch.id} {...ch} />
            ))}
          </FeedRow>
          <EditorialSlice {...slice1} />
          {wideRow(c.rows.cinemaHighlights, c.recommended)}
          {tallRow(c.rows.onlyOnSooner, c.exclusives)}
          <EditorialSlice {...slice2} media="mask" side="left" />
          <FeedRow {...row} title={c.rows.curators} kind="square" href="/channels">
            {c.curators.map((ch) => (
              <ChannelTile key={ch.id} {...ch} />
            ))}
          </FeedRow>
          {tallRow(c.rows.userFavorites, c.recommended)}
          <EditorialSlice {...slice3} media="mask" side="right" />
          <FeedRow {...row} title={c.rows.directorsFocus} kind="square" href="/channels">
            {c.directorFocus.map((ch) => (
              <ChannelTile key={ch.id} {...ch} />
            ))}
          </FeedRow>
          {wideRow(c.rows.cultClassics, c.newToRent)}
          <FeedRow {...row} title={c.rows.comingSoon} href="/channel/coming-soon">
            {/* Three card slots (the whole row when fewer fit); the film cards set the row height and the featured card fills it. */}
            <FeedItem className="relative basis-[min(100%,calc(3_*_(100%_-_(var(--items)_-_1)_*_var(--gap))_/_var(--items)_+_2_*_var(--gap)))]">
              <FeaturedFilmCard
                fitHeight
                className="absolute inset-0"
                {...(de ? featuredFilmCardDe : {})}
                title={featured.title}
                href={featured.href}
                director={c.comingSoonDirector.name}
                directorHref={c.comingSoonDirector.href}
                description={c.comingSoonDescription}
              />
            </FeedItem>
            {upcoming.map((f) => (
              <FilmCard {...card} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...row} title={c.rows.collections} kind="wide">
            {[e.feature, slice1, slice2].map((block, i) => (
              <MaskTile key={i} title={block.title} href={block.cta.href} tinted={i === 0} />
            ))}
          </FeedRow>
        </div>
      </div>
    </AppShell>
  );
}
