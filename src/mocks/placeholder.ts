// Generic, unopinionated content for the component library (Storybook): component stories and the screens' default
// content. Production content lives in src/content and is passed in by the app routes only. Contextual components
// (plans, login, header, footer) keep production copy and don't use this file.

import type { FilmFact } from "@/components/FilmDetails/FilmDetails";
import type { GenreTint } from "@/components/GenreTile/GenreTile";
import type { PromoSlide } from "@/components/PromoHero/PromoHero";
import type { Catalog, ChannelSummary, DiscoverEditorial, FilmSummary, LandingContent } from "@/screens/content";

export const loremShort =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
export const loremLong = `${loremShort} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

/** Generic still for non-film image slots (hero, banner, editorial and marketing media). Film posters stay empty. */
export const placeholderImage = "/images/placeholder/seventh-seal.webp";

export const placeholder = {
  eyebrow: "Lorem ipsum",
  headline: "Headline",
  sectionTitle: "Section Title",
  filmTitle: "Film Title",
  director: "Director Name",
  channel: "Channel Name",
  genre: "Genre",
  badge: "Badge",
  date: "Date",
  button: "Button",
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const placeholderFilms = range(12).map((n) => ({
  id: `film-${n}`,
  title: placeholder.filmTitle,
  href: `/film/film-${n}`,
  director: placeholder.director,
  meta: [placeholder.genre, "90 min", "2024"],
  synopsis: loremLong,
  badge: placeholder.badge,
  rentable: true,
}));

export const placeholderChannels = range(7).map((n) => ({ id: `channel-${n}`, name: placeholder.channel, href: `/channel/channel-${n}` }));

const tints: GenreTint[] = ["violet", "yellow", "magenta", "pink", "red", "green"];
export const placeholderGenres = tints.map((tint, i) => ({
  id: `genre-${i + 1}`,
  name: placeholder.genre,
  href: `/categories/genre-${i + 1}`,
  tint,
}));

export const placeholderSlice = {
  eyebrow: placeholder.eyebrow,
  title: placeholder.headline,
  description: loremLong,
  cta: { label: placeholder.button, href: "/collection/example" },
  imageSrc: placeholderImage,
};

export const placeholderPromoSlides: PromoSlide[] = range(4).map((n) => ({
  id: `promo-${n}`,
  title: placeholder.filmTitle,
  badge: placeholder.badge,
  description: loremShort,
  href: `/film/film-${n}`,
}));

export const placeholderFacts: FilmFact[] = [
  { label: "Director", value: [placeholder.director] },
  { label: "Genres", value: ["Genre, Genre"] },
  { label: "Casting", value: ["Actor Name", "Actor Name", "Actor Name", "Actor Name"] },
  { label: "Duration", value: ["90"] },
  { label: "Year", value: ["2024"] },
  { label: "Country", value: ["Country"] },
  { label: "Language", value: ["Language"] },
];

export const placeholderFilm = {
  title: placeholder.filmTitle,
  director: placeholder.director,
  tagline: loremShort,
  synopsis: loremLong,
  festivals: ["Festival Name", "Festival Name", "Festival Name"].map((name) => ({ name })),
  facts: placeholderFacts,
};

export const placeholderQuote = { source: "Source Name", quote: loremShort, author: "Author Name" };

export const placeholderCollection = { title: "Collection Title", description: [loremLong, loremLong, loremLong].join(" ") };

export const placeholderBanner = {
  eyebrow: placeholder.eyebrow,
  title: placeholder.headline,
  subtitle: loremShort,
  description: "Lorem ipsum dolor sit amet",
  actions: [
    { label: placeholder.button, href: "/discover", tone: "primary" as const },
    { label: placeholder.button, href: "/signup", tone: "white" as const },
  ],
};

export const placeholderFeaturedCollection = {
  title: placeholder.headline,
  lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  cta: { label: placeholder.button, href: "/collection/example" },
};

export const placeholderTwoColumn = { title: placeholder.headline, description: loremShort };

export const placeholderFaq = {
  title: placeholder.sectionTitle,
  items: range(5).map(() => ({ question: "Question", answer: `${loremShort}\n\n${loremShort}` })),
  imageSrc: placeholderImage,
};

// ---------------------------------------------------------------------------------------------------------------
// Screens: the default content of every screen in src/screens.

const filmTitle = (n: number) => (n % 2 ? placeholder.filmTitle : "Another Film Title");

const screenFilms = (prefix: string, count: number, extra: (n: number) => Partial<FilmSummary> = () => ({})): FilmSummary[] =>
  range(count).map((n) => ({ id: `${prefix}-${n}`, title: filmTitle(n), href: `/film/${prefix}-${n}`, ...extra(n) }));

const screenChannels = (prefix: string, count: number, name = placeholder.channel): ChannelSummary[] =>
  range(count).map((n) => ({ id: `${prefix}-${n}`, name, href: `/channel/${prefix}-${n}` }));

const sectionTitle = (n: number) => (n % 2 ? placeholder.sectionTitle : "Another Section Title");

const festivals = screenChannels("festival", 8, "Festival Name");

export const placeholderCatalog: Catalog = {
  rows: {
    newToRent: sectionTitle(1),
    justReleased: sectionTitle(2),
    festivals: sectionTitle(1),
    cinemaHighlights: sectionTitle(2),
    onlyOnSooner: sectionTitle(1),
    curators: sectionTitle(2),
    userFavorites: sectionTitle(1),
    directorsFocus: sectionTitle(2),
    cultClassics: sectionTitle(1),
    comingSoon: sectionTitle(2),
    collections: "Collection Title",
    recommended: sectionTitle(1),
    recommendedForYou: sectionTitle(1),
    // Section names of the film page template.
    featuredIn: "Featured in",
    quotes: "Quotes and reviews",
  },
  newToRent: screenFilms("rent", 7, () => ({ rentable: true })),
  exclusives: screenFilms("exclusive", 7, () => ({ badge: placeholder.badge })),
  comingSoon: screenFilms("coming-soon", 6, () => ({ availableFrom: "Nov 1, 2026" })),
  recommended: screenFilms("recommended", 6, () => ({ badge: placeholder.badge, rentable: true })),
  comingSoonDirector: { name: placeholder.director, href: "/cast/director-name" },
  festivals,
  curators: screenChannels("curator", 7),
  directorFocus: screenChannels("director", 7),
  channelSections: range(6).map((n) => ({ title: sectionTitle(n), channels: screenChannels(`section-${n}`, 7) })),
  tagSections: range(3).map((n) => ({
    title: sectionTitle(n + 1),
    tags: range(6).map((i) => ({ title: "Channel Tag Title", href: `/channel/tag-${n}-${i}` })),
  })),
  genres: range(18).map((n) => ({ ...placeholderGenres[(n - 1) % placeholderGenres.length], id: `genre-${n}`, href: `/categories/genre-${n}` })),
  film: {
    id: "film-1",
    title: placeholder.filmTitle,
    director: placeholder.director,
    tagline: loremShort,
    synopsis: loremLong,
    festivals: ["Festival Name", "Festival Name"],
    meta: placeholderFacts,
    quotes: [],
    price: "€0.00",
  },
  featuredIn: range(4).map((n) => ({ title: "Channel Tag Title", href: `/channel/tag-${n}` })),
  collection: {
    title: placeholderCollection.title,
    description: [loremLong, loremLong, loremLong, loremLong].join(" "),
    films: range(35).map((n) => ({
      id: `collection-film-${n}`,
      title: filmTitle(n),
      href: `/film/collection-film-${n}`,
      director: placeholder.director,
      meta: [placeholder.genre, "90 min", "2024"],
      synopsis: loremLong,
      badge: placeholder.badge,
      rentable: true,
    })),
  },
  searchSuggestions: range(7).map(() => placeholder.genre),
};

const editorialBlock = placeholderSlice;

export const placeholderEditorial: DiscoverEditorial = {
  promoSlides: placeholderPromoSlides,
  feature: { ...editorialBlock, title: "Collection Title" },
  slices: [editorialBlock, { ...editorialBlock, title: "Another Headline" }, editorialBlock],
};

/** Plan card images on screens (monthly, yearly, plus). */
export const placeholderPlanImages = { monthly: placeholderImage, yearly: placeholderImage, plus: placeholderImage };

const landingCollection = (prefix: string, title: string, extra: (n: number) => Partial<FilmSummary>, lead?: string) => ({
  title,
  lead,
  description: loremShort,
  cta: { label: "View more", href: "/collection/example" },
  films: screenFilms(prefix, 9, extra),
});

export const placeholderLanding: LandingContent = {
  hero: {
    eyebrow: placeholder.eyebrow,
    title: placeholder.filmTitle,
    subtitle: loremShort,
    description: "Lorem ipsum dolor sit amet",
    href: "/film/film-1",
    rentLabel: "Rent",
    trailerLabel: "Trailer",
    imageSrc: placeholderImage,
  },
  collections: [
    landingCollection("highlights", "Collection Title", () => ({ rentable: true }), placeholderFeaturedCollection.lead),
    landingCollection("rent", "Another Collection Title", () => ({ rentable: true })),
    landingCollection("subscription", "Collection Title", () => ({}), placeholderFeaturedCollection.lead),
    landingCollection("coming-soon", "Another Collection Title", () => ({ rentable: true, availableFrom: "Nov 1, 2026" }), placeholderFeaturedCollection.lead),
  ],
  split: { title: placeholder.headline, description: loremLong, imageSrc: placeholderImage },
  devices: placeholderTwoColumn,
  banner: { title: placeholder.headline, description: loremShort, actions: placeholderBanner.actions.map((a, i) => ({ ...a, tone: i === 0 ? "white" : "primary" })), imageSrc: placeholderImage },
  faq: { ...placeholderFaq, title: "Frequently asked Questions" },
  planImages: placeholderPlanImages,
};
