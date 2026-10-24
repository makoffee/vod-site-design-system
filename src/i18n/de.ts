// German labels for the German screens (sooner.de/de). Components default to English; screens pass these.
// Strings from Copy/production-strings.json (de) unless noted.
import type { FilmHeroProps } from "@/components/FilmHero/FilmHero";
import type { FeaturedFilmCardProps } from "@/components/FeaturedFilmCard/FeaturedFilmCard";
import type { FeedRowProps } from "@/components/FeedRow/FeedRow";
import type { FilmListItemProps } from "@/components/FilmListItem/FilmListItem";
import type { AccountNavItem } from "@/components/AccountNav/AccountNav";
import type { HeaderLabels } from "@/components/Header/Header";
import type { AccountLabels } from "@/screens/AccountScreen";
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
  subscribeLabel: "Abonnieren",
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

export const searchDe = {
  placeholder: "Filme, Regisseure, Schauspieler suchen…",
  label: "Suche",
};

/** Production "results for" / "No results for" / hint (strings file, de). */
export const searchResultsDe = {
  resultsFor: "Ergebnisse für",
  noResultsFor: "Keine Ergebnisse für",
  noResultsHint: "Versuchen Sie einen anderen Titel, Regisseur oder Schauspieler",
};

// Account and watchlist (production sooner.de/de/account/*, /de/watchlist).
export const accountNavDe = [
  { id: "profile", label: "Profil", href: "/account" },
  { id: "settings", label: "Einstellungen", href: "/account/settings" },
  { id: "subscriptions", label: "Abos | Cards", href: "/account/subscriptions" },
  { id: "rentals", label: "Ausleihen", href: "/account/purchases" },
  { id: "parental-pin", label: "Jugendschutz-PIN", href: "/account/parental_pin" },
  { id: "devices", label: "Geräte", href: "/account/devices" },
] satisfies AccountNavItem[];

export const accountDe = {
  navLabel: "Konto-Navigation",
  email: "E-Mail",
  name: "Vor- und Nachname",
  birthdate: "Geburtsdatum",
  memberId: "Benutzer ID",
  loginMethod: "Login-Methode",
  location: "Standort",
  edit: "bearbeiten",
  add: "hinzufügen",
  changePassword: "Passwort ändern",
  deleteAccount: "Account löschen",
  language: "Sprache",
  languageHint: "Oberflächensprache",
  newsletter: "Newsletter",
  newsletterHint: "Erhalte Informationen über exklusive Inhalte und Angebote.",
  save: "Speichern",
  noSubscription: "Du hast kein aktives Abo",
  subscribe: "Abonnieren",
  noRentals: "Du hast dir zur Zeit keine Titel ausgeliehen",
  parentalControls: "Kindersicherung",
  inactive: "Inaktiv",
  noPin: "Kein PIN festgelegt",
  setPin: "PIN festlegen",
  devicesTitle: "Einloggen in andere Geräte",
  // Production shows this hint untranslated on the German page.
  devicesHint: "Enter the code shown on your TV or device.",
  devicesPlaceholder: "Gib deinen Code ein",
  devicesSubmit: "Weiter",
} satisfies Partial<AccountLabels>;

export const watchlistDe = { title: "Meine Liste", empty: "Deine Watchlist ist leer" };
