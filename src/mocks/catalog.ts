// Demo data for stories and the demo routes. Titles and row names are taken from sooner.de/de/discover
// (2026-10-20); film-page details come from the "single film view" design screen. No artwork: cards render
// the design's placeholder gradient. Replace with the real catalog API once the repo is connected.

import type { GenreTint } from "@/components/GenreTile/GenreTile";

export interface FilmSummary {
  id: string;
  title: string;
  href: string;
  badge?: string;
  rentable?: boolean;
  availableFrom?: string;
  ariaLabel?: string;
}

const film = (id: string, title: string, extra: Partial<FilmSummary> = {}): FilmSummary => ({
  id,
  title,
  href: `/film/${id}`,
  ...extra,
});

export const newToRent: FilmSummary[] = [
  film("cetait-mieux-demain", "Die progressiven Nostalgiker", {
    rentable: true,
    ariaLabel: "Die progressiven Nostalgiker. Regie: Vinciane Millereau",
  }),
  film("animale", "Animale", { rentable: true, ariaLabel: "Animale. Regie: Emma Benestan. 2024. 98 Minuten. Drama, Horror" }),
  film("mi-amiga-eva", "Ein Leben ohne Liebe ist möglich, aber sinnlos", { rentable: true }),
  film("compostelle", "Die Camino-Therapie - Finde deinen Weg", { rentable: true }),
  film("dj-ahmet", "DJ Ahmet", { rentable: true, ariaLabel: "DJ Ahmet. Regie: Georgi M. Unkovski. 2026. 99 Minuten" }),
  film("foxcatcher", "Foxcatcher", { rentable: true }),
  film("american-hustle", "American Hustle", { rentable: true }),
];

export const exclusives: FilmSummary[] = [
  film("cold-war", "Cold War", { badge: "Exclusive" }),
  film("exit-8", "Exit 8", { badge: "Exclusive" }),
  film("titane", "Titane", { badge: "Exclusive" }),
  film("the-love-that-remains", "The Love That Remains", { badge: "Exclusive" }),
  film("nouvelle-vague", "Nouvelle Vague", { badge: "Exclusive" }),
  film("la-flor", "La Flor", { badge: "Exclusive" }),
  film("mistress-dispeller", "Mistress Dispeller", { badge: "Exclusive" }),
];

export const comingSoon: FilmSummary[] = [
  film("plein-temps", "Julie - eine Frau gibt nicht auf", { rentable: true, availableFrom: "9. Nov. 2026" }),
  film("shoah", "Shoah", { availableFrom: "14. Nov. 2026" }),
  film("variety", "Variety", { availableFrom: "21. Nov. 2026" }),
  film("the-flats", "The Flats", { availableFrom: "28. Nov. 2026" }),
  film("a-useful-ghost", "A Useful Ghost", { availableFrom: "5. Dez. 2026" }),
  film("ballroom", "Ballroom", { availableFrom: "12. Dez. 2026" }),
];

export const recommended: FilmSummary[] = [
  film("la-femme-du-veme", "La femme du Vème", { badge: "Exclusive", rentable: true }),
  film("la-vie-me-va-bien", "La vie me va bien", { badge: "Exclusive", rentable: true }),
  film("six-feet-over", "Six Feet Over", { badge: "Exclusive", rentable: true }),
  film("coeur-ouvert", "À coeur ouvert", { badge: "Exclusive", rentable: true }),
  film("manderlay", "Manderlay", { badge: "Exclusive", rentable: true }),
  film("cold-war", "Cold War", { badge: "Exclusive", rentable: true }),
];

/** Row titles on sooner.de/de/discover, in order. */
export const discoverRowTitles = [
  "New to Rent",
  "Neu im Abo",
  "Coming Soon",
  "Nur bei Sooner",
  "Cinema Highlights",
  "User Favorites: Top 25",
  "Cult Classics: Early Works",
  "Queerness: Living Out Loud",
  "Love+: Sexuality",
  "Neue Serien",
];

export interface ChannelSummary {
  id: string;
  name: string;
  href: string;
  /** Square artwork; channel tiles carry their name in the image, so name is the accessible label. */
  imageSrc?: string;
  /** Fallback tile colour when no artwork (design festival tiles). */
  tint?: string;
}

/** "Collection row squares" / production channel tiles. Festival names from the design screen. */
export const festivals: ChannelSummary[] = [
  { id: "idfa", name: "IDFA", href: "/channel/idfa", tint: "bg-[#29c5e6]" },
  { id: "iffr", name: "International Film Festival Rotterdam", href: "/channel/iffr", tint: "bg-[#ee7368]" },
  { id: "interfilm", name: "Interfilm", href: "/channel/interfilm", tint: "bg-[#ffd400]" },
  { id: "un-certain-regard", name: "Un Certain Regard", href: "/channel/un-certain-regard", tint: "bg-[#dcc58a]" },
  { id: "panorama", name: "Berlinale Panorama", href: "/channel/panorama", tint: "bg-[#6c3fe0]" },
  { id: "perspektive", name: "Perspektive Deutsches Kino", href: "/channel/perspektive", tint: "bg-[#ff5a1f]" },
];

/** "The Sooner Curators" on sooner.de/de/channels (the two tiles confirmed in production markup). */
export const curators: ChannelSummary[] = [
  { id: "sophie-linnenbaum", name: "Sophie Linnenbaum's Picks", href: "/channel/sophie-linnenbaums-picks" },
  { id: "josephine-demerliac", name: "Joséphine Demerliac", href: "/channel/josephine-demerliac" },
];

/** "Director Focus" row on the discover design screen (names from the tile layers). */
export const directorFocus: ChannelSummary[] = [
  { id: "albert-serra", name: "Albert Serra", href: "/channel/albert-serra" },
  { id: "michael-brynntrup", name: "Michael Brynntrup", href: "/channel/michael-brynntrup" },
  { id: "jochen-hick", name: "Jochen Hick", href: "/channel/jochen-hick" },
  { id: "denis-villeneuve", name: "Denis Villeneuve", href: "/channel/denis-villeneuve" },
  { id: "maren-kea-freese", name: "Maren-Kea Freese", href: "/channel/maren-kea-freese" },
  { id: "angela-christlieb", name: "Angela Christlieb", href: "/channel/angela-christlieb" },
  { id: "gessica-geneus", name: "Gessica Généus", href: "/channel/gessica-geneus" },
];

/** Single film view (design screen "single film view | 1440"). */
export const marieAntoinette = {
  id: "marie-antoinette",
  title: "Marie Antoinette",
  director: "Sofia Coppola",
  tagline:
    "The retelling of France's iconic but ill-fated queen, Marie Antoinette. From her betrothal and marriage to Louis XVI at 15 to her reign as queen at 19 and to the end of her reign as queen, and ultimately the fall of Versailles.",
  synopsis:
    'Marie-Antoinette, 14, left Vienna for Versailles to marry the Louis dolphin. The marriage celebrated, Louis XV asks the bride and groom to get "at work". But Louis sleeps and the princess is bored: the protocol rites horripile him. So she distracts herself, with the Polignac, in a debauchery of pastries, games, jewelry, shoes, clothes and fashionable wigs.',
  festivals: ["Cannes", "Venice", "Berlin", "Toronto (TIFF)", "Sundance"],
  meta: [
    { label: "Director", value: ["Sofia Coppola"] },
    { label: "Genres", value: ["Drame, Biopic, History"] },
    {
      label: "Casting",
      value: ["Kirsten Dunst", "Jason Schwartzman", "Rip Torn", "Steve Coogan", "Judy Davis", "Asia Argento", "William Gallienne"],
    },
    { label: "Duration", value: ["123"] },
    { label: "Year", value: ["2006"] },
    { label: "Country", value: ["USA, France, Japan"] },
    { label: "Language", value: ["English, French, Japanese"] },
  ],
  price: "4,99€",
};

/** "Featured in" row on the film design screen (the tiles carry the design placeholder title). */
export const featuredIn = [1, 2, 3, 4].map((n) => ({ title: "Channel Tag Title", href: `/channel/tag-${n}` }));

/** "Quotes and reviews" card on the film design screen. */
export const filmQuotes = [
  {
    source: "DOK Leipzig 2018 German Competition",
    quote: 'Awarded with the Golden Dove: "smart, differentiated, extremely courageous and of a painful political explosive nature"',
    author: "Jane Done",
  },
];

const slug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const channels = (names: string[]): ChannelSummary[] => names.map((name) => ({ id: slug(name), name, href: `/channel/${slug(name)}` }));

/** Square-tile rows on the channels design screen ("Collections"); names are the tile layers' channel names. */
export const channelSections: { title: string; channels: ChannelSummary[] }[] = [
  { title: "Festivals", channels: festivals },
  {
    title: "The Sooner Curators",
    channels: channels([
      "Kim Münster",
      "Natalie MacMahon",
      "Jannis Alexander Kiefer",
      "Ivette Löcker",
      "Yony Leyser",
      "Jasmin Astaki Bardeh",
      "Ayla Yildiz",
    ]),
  },
  {
    title: "Specials",
    channels: channels([
      "A Sense of Place",
      "#GiveToGain | Internationaler Frauentag 2026",
      "Young Talent",
      "Sooner Exclusives",
      "DEFA Märchenfilme",
      "Award Winning",
      "Made in Germany",
    ]),
  },
  { title: "Director Focus", channels: directorFocus },
  {
    title: "Next-Gen",
    channels: channels([
      "Filmuniversität Babelsberg KONRAD WOLF",
      "ifs internationale filmschule köln",
      "Universität der Künste Berlin",
      "Filmakademie Baden-Württemberg",
      "DFFB - German Film and Television Academy Berlin",
      "HFBK Hochschule für bildende Künste Hamburg",
    ]),
  },
  {
    title: "Timeless Directors",
    channels: channels([
      "Robert Bramkamp",
      "Pia Frankenberg",
      "Rüdiger Sünner",
      "Ruth Beckermann",
      "Lutz Dammbeck",
      "Rosa von Praunheim",
      "Thomas Imbach",
      "Thomas Arslan",
    ]),
  },
  {
    title: "Labels",
    channels: channels(["Filmgalerie 451", "Most Wanted Music", "mec film", "Rapid Eye Movies", "missingFILMs", "Rapid Eye Movies Asia"]),
  },
];

export interface GenreSummary {
  id: string;
  name: string;
  href: string;
  tint: GenreTint;
  imageSrc?: string;
}

const genre = (name: string, tint: GenreTint): GenreSummary => ({ id: slug(name), name, href: `/categories/${slug(name)}`, tint });

/** Genres design screen ("Triller" on the canvas is corrected to "Thriller"). */
export const genres: GenreSummary[] = [
  genre("Drama", "violet"),
  genre("Documentary", "yellow"),
  genre("LGBTQ+", "magenta"),
  genre("Romance", "pink"),
  genre("Thriller", "red"),
  genre("Comedy", "green"),
  genre("World Cinema", "violet"),
  genre("Short Films", "yellow"),
  genre("Animation", "magenta"),
  genre("Experimental", "pink"),
  genre("Horror", "red"),
  genre("Biography", "green"),
  genre("Festival Winners", "violet"),
  genre("Classics", "yellow"),
  genre("Coming of Age", "magenta"),
];

/** Collection view design screens ("collection view | list / Grid | 1440"); copy is the design's placeholder. */
const collectionLorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.";
export const collection = {
  title: "Collection Title",
  description: Array.from({ length: 6 }, () => collectionLorem).join(" "),
  films: Array.from({ length: 35 }, (_, i) => ({
    id: `example-film-${i + 1}`,
    title: "Example Film Title",
    href: `/film/example-film-${i + 1}`,
    director: "Sofia Coppola",
    meta: ["Documentary", "90 min", "2020"],
    synopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.",
    badge: "Exclusive",
    rentable: true,
  })),
};

/** Search design screens ("search results | Static / Sticky in-nav | 1440px", "| 393px"). */
export const searchSuggestions = ["Drama", "Documentary", "Short Films", "LGBTQ+", "World Cinema", "Animation", "Festival Winners"];
export const searchQuery = "Drama";
