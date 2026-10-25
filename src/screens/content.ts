// Content shapes the screens render. Screens take their content as props: the defaults are the placeholders in
// src/mocks/placeholder.ts (what Storybook shows); the app routes pass production content from src/content.

import type { Action } from "@/components/_shared/ActionLink";
import type { FaqItem } from "@/components/Faq/Faq";
import type { GenreTint } from "@/components/GenreTile/GenreTile";
import type { PromoSlide } from "@/components/PromoHero/PromoHero";
import type { PlanId } from "@/components/_shared/plans";

export interface FilmSummary {
  id: string;
  title: string;
  href: string;
  badge?: string;
  rentable?: boolean;
  availableFrom?: string;
  ariaLabel?: string;
}

/** A film in a list view (collection, search results as list). */
export interface FilmListEntry extends FilmSummary {
  director: string;
  meta: string[];
  synopsis: string;
}

export interface ChannelSummary {
  id: string;
  name: string;
  href: string;
  /** Square artwork; channel tiles carry their name in the image, so name is the accessible label. */
  imageSrc?: string;
  /** Fallback tile colour when no artwork (festival tiles). */
  tint?: string;
}

export interface GenreSummary {
  id: string;
  name: string;
  href: string;
  tint: GenreTint;
  imageSrc?: string;
}

export interface TagLink {
  title: string;
  href: string;
}

export interface FilmPage {
  id: string;
  title: string;
  director: string;
  tagline: string;
  synopsis: string;
  festivals: string[];
  meta: { label: string; value: string[] }[];
  /** Press quotes; the quotes row only shows when there are some. */
  quotes: { source: string; quote: string; author?: string }[];
  price: string;
}

/** Row titles the screens show. */
export interface RowTitles {
  newToRent: string;
  justReleased: string;
  festivals: string;
  cinemaHighlights: string;
  onlyOnSooner: string;
  curators: string;
  userFavorites: string;
  directorsFocus: string;
  cultClassics: string;
  comingSoon: string;
  collections: string;
  recommended: string;
  recommendedForYou: string;
  featuredIn: string;
  quotes: string;
}

/** Everything the catalogue screens (discover, channels, genres, film, collection, search) show, in one language. */
export interface Catalog {
  rows: RowTitles;
  newToRent: FilmSummary[];
  exclusives: FilmSummary[];
  comingSoon: FilmSummary[];
  recommended: FilmSummary[];
  /** Director of the first coming-soon film (the featured card on discover). */
  comingSoonDirector: { name: string; href: string };
  /** Synopsis on the featured card; the card shows none when omitted. */
  comingSoonDescription?: string;
  festivals: ChannelSummary[];
  curators: ChannelSummary[];
  directorFocus: ChannelSummary[];
  /** Square-tile rows on the channels page. */
  channelSections: { title: string; channels: ChannelSummary[] }[];
  /** Text-tile rows on the channels page. */
  tagSections: { title: string; tags: TagLink[] }[];
  genres: GenreSummary[];
  film: FilmPage;
  featuredIn: TagLink[];
  collection: { title: string; description: string; films: FilmListEntry[] };
  searchSuggestions: string[];
}

export interface EditorialBlock {
  eyebrow?: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  imageSrc?: string;
}

/** Editorial blocks on discover: the promo hero, the collection feature and three editorial slices. */
export interface DiscoverEditorial {
  promoSlides: PromoSlide[];
  feature: EditorialBlock;
  slices: [EditorialBlock, EditorialBlock, EditorialBlock];
}

export interface LandingCollection {
  title: string;
  lead?: string;
  description: string;
  cta: Action;
  films: FilmSummary[];
}

export interface LandingContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    href: string;
    rentLabel: string;
    trailerLabel: string;
    imageSrc?: string;
  };
  /** Four collection blocks; the plans sit after the third. */
  collections: [LandingCollection, LandingCollection, LandingCollection, LandingCollection];
  split: { title: string; description: string; imageSrc?: string };
  /** Devices block; the image defaults to the devices illustration. */
  devices: { title: string; description: string; imageSrc?: string };
  /** Plan card images (monthly, yearly, plus); none by default. */
  planImages?: Partial<Record<PlanId, string>>;
  banner: { title: string; description: string; actions: Action[]; imageSrc?: string };
  faq: { title: string; items: FaqItem[]; imageSrc?: string };
}
