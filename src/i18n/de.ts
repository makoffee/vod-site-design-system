// German labels for the German screens (sooner.de/de). Components default to English; screens pass these.
// Strings from Copy/production-strings.json (de) unless noted.
import type { FilmHeroProps } from "@/components/FilmHero/FilmHero";
import type { FeaturedFilmCardProps } from "@/components/FeaturedFilmCard/FeaturedFilmCard";
import type { FeedRowProps } from "@/components/FeedRow/FeedRow";
import type { FilmListItemProps } from "@/components/FilmListItem/FilmListItem";
import type { HeaderLabels } from "@/components/Header/Header";
import type { PromoHeroProps } from "@/components/PromoHero/PromoHero";

export const filmHeroDe = {
  directorLabel: "Regie:",
  subscribeLabel: "Abonnieren",
  rentLabel: "Leihen",
  trailerLabel: "Trailer",
  watchlistLabel: "Zur Merkliste hinzufügen",
  shareLabel: "Teilen",
  muteLabel: "Stumm",
  unmuteLabel: "Stumm aus",
} satisfies Partial<FilmHeroProps>;

export const promoHeroDe = {
  // Production markup (not in the strings file).
  watchLabel: "Hier anschauen",
  addToListLabel: "Zur Liste hinzufügen",
  nextLabel: "Nächste Promo",
  slidesLabel: "Vorgestellte Titel",
} satisfies Partial<PromoHeroProps>;

export const feedRowDe = {
  // Production markup "mehr".
  moreLabel: "mehr",
  previousLabel: "Zurück",
  nextLabel: "Weiter",
} satisfies Partial<FeedRowProps>;

export const featuredFilmCardDe = {
  byLabel: "Von",
  rentLabel: "Leihen",
  watchlistLabel: "Zur Merkliste hinzufügen",
} satisfies Partial<FeaturedFilmCardProps>;

export const filmCardDe = { availableLabel: "Ab" };

// CollectionHeader's toggle names ("Show more", "Grid view", …) have no production source and stay English.
export const filmListItemDe = {
  byLabel: "Von",
  subscribeLabel: "Abonnieren",
  rentLabel: "Leihen",
  watchlistLabel: "Zur Merkliste hinzufügen",
} satisfies Partial<FilmListItemProps>;

export const headerDe: HeaderLabels = { home: "Sooner Startseite", navigation: "Hauptnavigation", search: "Suche", menu: "Menü" };

export const availabilityDe = {
  label: "Verfügbarkeit",
  // No German "All" exists in production; it stays as designed.
  labels: { subscription: "Abonnement", rentals: "Mieten & Kaufen" },
};
