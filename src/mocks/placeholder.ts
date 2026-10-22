// Generic, unopinionated content for the component library (Storybook) — the same copy as the masters on
// "2 Components". Screens keep their real content in catalog.ts / editorial.ts. Contextual components
// (plans, login, header, footer) keep production copy and don't use this file.

import type { FilmFact } from "@/components/FilmDetails/FilmDetails";
import type { GenreTint } from "@/components/GenreTile/GenreTile";
import type { PromoSlide } from "@/components/PromoHero/PromoHero";

export const loremShort =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
export const loremLong = `${loremShort} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

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
};
