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
import type { FooterProps } from "@/components/Footer/Footer";
import type { AuthFormLabels } from "@/components/AuthForm/AuthForm";
import type { LoginModalLabels } from "@/components/LoginModal/LoginModal";
import type { ProductCardProps } from "@/components/ProductCard/ProductCard";
import type { SubscriptionPlansProps } from "@/components/SubscriptionPlans/SubscriptionPlans";
import type { FilmDetailsProps } from "@/components/FilmDetails/FilmDetails";
import type { CollectionHeaderProps } from "@/components/CollectionHeader/CollectionHeader";

/**
 * Proposed German (no production string yet) — needs copy review.
 * UI labels production has no German for (or shows in English on the DE site). Every German screen references these
 * keys, so the copy team can replace them here in one place. Short, neutral UI terms only; no marketing copy.
 */
export const proposedDe = {
  /** Header tab "Collections". */
  collections: "Kollektionen",
  /** Header tab "Magazine". */
  magazine: "Magazin",
  /** AvailabilityFilter "All". */
  all: "Alle",
  /** FilmBadge "Exclusive". */
  exclusive: "Exklusiv",
  /** FilmDetails "Synopsis" (production DE film pages show "Synopsis"). */
  synopsis: "Inhalt",
  /** Film fact "Casting" (production DE film pages show "Casting"). */
  casting: "Besetzung",
  /** FilmDetails "Festivals & Awards" (production DE film pages show "Festivals & Awards"). */
  festivalsAwards: "Festivals & Preise",
  /** Film page row "Quotes and reviews" (shown only for films with quotes). */
  quotes: "Pressestimmen",
  /** CollectionHeader collapse toggle "Show less" (production expand label is "Zeig mehr"). */
  showLess: "Zeig weniger",
  /** ViewToggle / CollectionHeader "Grid view". */
  gridView: "Rasteransicht",
  /** ViewToggle / CollectionHeader "List view". */
  listView: "Listenansicht",
  /** SearchField clear button "Clear search". */
  clearSearch: "Suche löschen",
  /** Footer "Help & Support" (production DE footer shows "Help & Support"). */
  helpSupport: "Hilfe & Support",
  /** Footer "Press". */
  press: "Presse",
  /** Footer "Cookie Policy". */
  cookiePolicy: "Cookie-Richtlinie",
};

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
  previousLabel: "Vorherige Promo",
  nextLabel: "Nächste Promo",
  slideLabel: (i: number, n: number, title: string) => `Promo ${i} von ${n}: ${title}`,
  slidesLabel: "Vorgestellte Titel",
} satisfies Partial<PromoHeroProps>;

export const feedRowDe = {
  // Production markup "mehr".
  moreLabel: "mehr",
  previousLabel: "Zurück",
  nextLabel: "Weiter",
  loadingLabel: "Laden…",
} satisfies Partial<FeedRowProps>;

export const featuredFilmCardDe = {
  byLabel: "Von",
  rentLabel: "Leihen",
  subscribeLabel: "Abonnieren",
  watchlistLabel: "Zur Merkliste hinzufügen",
} satisfies Partial<FeaturedFilmCardProps>;

export const filmCardDe = { availableLabel: "Ab" };

/** FilmDetails headings (proposed: production DE film pages show them in English). */
export const filmDetailsDe = {
  synopsisLabel: proposedDe.synopsis,
  festivalsLabel: proposedDe.festivalsAwards,
} satisfies Partial<FilmDetailsProps>;

/** CollectionHeader toggles: "Zeig mehr" is production (DE channel page); the others are proposed. */
export const collectionHeaderDe = {
  showMoreLabel: "Zeig mehr",
  showLessLabel: proposedDe.showLess,
  gridViewLabel: proposedDe.gridView,
  listViewLabel: proposedDe.listView,
} satisfies Partial<CollectionHeaderProps>;

export const filmListItemDe = {
  byLabel: "Von",
  subscribeLabel: "Abonnieren",
  rentLabel: "Leihen",
  watchlistLabel: "Zur Merkliste hinzufügen",
} satisfies Partial<FilmListItemProps>;

/** Header: production DE strings (footer "Entdecken", strings file "Genre", "Meine Liste", "Anmelden", "Registrieren", "Oberflächensprache"). */
export const headerDe: HeaderLabels = {
  home: "Sooner Startseite",
  navigation: "Hauptnavigation",
  search: "Suche",
  menu: "Menü",
  tabs: {
    discover: "Entdecken",
    collections: proposedDe.collections,
    genres: "Genre",
    magazine: proposedDe.magazine,
    watchlist: "Meine Liste",
  },
  login: "Anmelden",
  signUp: "Registrieren",
  language: "Oberflächensprache",
};

export const availabilityDe = {
  label: "Verfügbarkeit",
  labels: { all: proposedDe.all, subscription: "Abonnement", rentals: "Mieten & Kaufen" },
};

export const searchDe = {
  placeholder: "Filme, Regisseure, Schauspieler suchen…",
  label: "Suche",
  clearLabel: proposedDe.clearSearch,
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

/** Production strings (de): search with no results, a failed load, page not found. */
export const statesDe = {
  noResultsFor: "Keine Ergebnisse für",
  noResultsHint: "Versuchen Sie einen anderen Titel, Regisseur oder Schauspieler",
  error: "Etwas ist schiefgelaufen",
  notFound: "Die Seite wurde nicht gefunden",
  notFoundHint: "Wir können die gesuchte Seite nicht finden",
  home: "Startseite",
};

export const footerDe = {
  columns: [
    [
      { label: "Entdecken", href: "/discover" },
      { label: proposedDe.helpSupport, href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/contact" },
    ],
    [
      { label: "AGB", href: "/terms" },
      { label: "Impressum", href: "/imprint" },
      { label: "Partner Programm", href: "/partners" },
    ],
    [
      { label: proposedDe.press, href: "/press" },
      { label: "Datenschutz", href: "/privacy" },
      { label: proposedDe.cookiePolicy, href: "/cookies" },
    ],
  ],
  copyright: "© 2026 ContentScope GmbH • Adlershof-Berlin, Deutschland",
} satisfies Partial<FooterProps>;

// "Mit Hochschul-Login anmelden" has no strings-file entry (LoginModal master). The SSO accessible names
// ("Mit Google anmelden") are production markup.
export const authFormDe: AuthFormLabels = {
  login: "Anmelden",
  signup: "Konto erstellen",
  email: "E-Mail",
  password: "Passwort",
  showPassword: "Passwort anzeigen",
  hidePassword: "Passwort verbergen",
  submitLogin: "Anmelden",
  submitSignup: "Weiter",
  forgot: "Passwort vergessen",
  sso: "oder mit SSO anmelden",
  ssoProvider: "Mit {provider} anmelden",
  institution: "Mit Hochschul-Login anmelden",
  terms: "Mit der Registrierung stimmst du unseren AGB, der Datenschutzerklärung und den Servicebedingungen zu.",
  noAccount: "Noch kein Konto?",
  toSignup: "Registrieren",
  hasAccount: "Hast du bereits ein Konto?",
  toLogin: "Anmelden",
  changePlan: "< Anderes Abo wählen",
};

/** The LoginModal master as it shipped. */
export const loginModalDe: LoginModalLabels = {
  title: "Willkommen zurück",
  close: "Schließen",
  email: "E-Mail",
  emailFocus: "E-Mail eingeben",
  sampleEmail: "kino@beispiel.de",
  password: "Passwort",
  remember: "Angemeldet bleiben",
  forgot: "Passwort vergessen?",
  cancel: "Abbrechen",
  submit: "Login",
  sso: "oder mit SSO",
  institution: "Mit Hochschul-Login anmelden",
  noAccount: "Noch kein Konto?",
  register: "Jetzt registrieren.",
};

/** ProductCard master (de). AuthForm passes its own changePlan label instead. */
export const productCardDe = { changeLabel: "< Produkt ändern" } satisfies Partial<ProductCardProps>;

// SubscriptionPlans headings. Plan and UNI copy is content: plansDe / uniOfferDe in src/content/plans.ts.
export const subscriptionPlansDe = {
  title: "Wähle dein Sooner-Abo",
  description: "Unbegrenzt Filme im Abo streamen – flexibel monatlich, mit 3 Leihfilmen inklusive oder günstiger im Jahresabo.",
} satisfies Partial<SubscriptionPlansProps>;

/** layout="subscribe" (sooner.de/de/subscribe): heading, intro and the legal paragraph. */
export const subscriptionPlansSubscribeDe = {
  ...subscriptionPlansDe,
  legal:
    "Durch Klicken auf „Tarif auswählen“ stimmst du unseren Allgemeinen Geschäftsbedingungen zu und bestätigst unsere Datenschutzerklärung. Eine 7-tägige kostenlose Testphase gilt ausschließlich für den Monatstarif und den Studierendentarif. Du kannst während dieser Testphase jederzeit kündigen, um keine Gebühren zu zahlen. Wenn du nicht kündigst, beginnt dein kostenpflichtiges Abonnement automatisch am Tag 15 und wird mit 7,99 €/Monat bzw. 5,99 €/Monat berechnet. Beide Tarife sind monatlich kündbar. Der Jahrestarif hat keine kostenlose Testphase; eine einmalige Zahlung von 59,95 € fällt bei Vertragsabschluss für 12 Monate an. Er verlängert sich automatisch um weitere 12 Monate, sofern nicht mindestens einen Tag vor Vertragsende gekündigt wird. Die Streaming-Qualität (Full HD, Ultra HD, 5.1) hängt von deiner Internetverbindung, der Gerätekompatibilität und der Inhaltsverfügbarkeit ab.",
} satisfies Partial<SubscriptionPlansProps>;
