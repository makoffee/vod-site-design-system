// Demo data for the screens and the demo routes, in both site languages. Titles, row names, channel names and genre
// names are taken from production (sooner.de/en/… and sooner.de/de/…, 2026-10-24): discover, channels,
// categories, the Animale film page and the "Only on Sooner" channel page. No artwork: cards render the
// placeholder gradient. Replace with the real catalog API once the repo is connected.
// Screens read everything through getCatalog(locale); Storybook renders English, the German app routes German.

import type { GenreTint } from "@/components/GenreTile/GenreTile";
import { proposedDe } from "@/i18n/de";
import type { Locale } from "@/i18n/locale";

export interface FilmSummary {
  id: string;
  title: string;
  href: string;
  badge?: string;
  rentable?: boolean;
  availableFrom?: string;
  ariaLabel?: string;
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

/** One string per site language. */
type L10n = Record<Locale, string>;
const same = (s: string): L10n => ({ en: s, de: s });

const slug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ---------------------------------------------------------------------------------------------------------------
// Films. Titles as production shows them per language (German cards use the German release title where there is one).

interface FilmEntry {
  id: string;
  title: L10n;
  exclusive?: boolean;
  rentable?: boolean;
  availableFrom?: L10n;
}

const f = (id: string, title: string | L10n, extra: Omit<FilmEntry, "id" | "title"> = {}): FilmEntry => ({
  id,
  title: typeof title === "string" ? same(title) : title,
  ...extra,
});

const newToRentFilms: FilmEntry[] = [
  f("animale", "Animale", { rentable: true }),
  f("cetait-mieux-demain", { en: "Cycle of Time - It Was Better Tomorrow", de: "Die progressiven Nostalgiker" }, { rentable: true }),
  f("mi-amiga-eva", { en: "My Friend Eva", de: "Ein Leben ohne Liebe ist möglich, aber sinnlos" }, { rentable: true }),
  f("heldin", "Heldin", { rentable: true }),
  f("rodeo", "Rodéo", { rentable: true }),
  f("foxcatcher", "Foxcatcher", { rentable: true }),
  f("american-hustle", "American Hustle", { rentable: true }),
];

const exclusiveFilms: FilmEntry[] = [
  f("cold-war", "Cold War", { exclusive: true }),
  f("exit-8", "Exit 8", { exclusive: true }),
  f("titane", "Titane", { exclusive: true }),
  f("the-love-that-remains", "The Love That Remains", { exclusive: true }),
  f("nouvelle-vague", "Nouvelle Vague", { exclusive: true }),
  f("la-flor", "La Flor", { exclusive: true }),
  f("mistress-dispeller", "Mistress Dispeller", { exclusive: true }),
];

const comingSoonFilms: FilmEntry[] = [
  f("plein-temps", "À plein temps", { rentable: true, availableFrom: { en: "Nov 9, 2026", de: "9. Nov. 2026" } }),
  f("shoah", "Shoah", { availableFrom: { en: "Nov 14, 2026", de: "14. Nov. 2026" } }),
  f("variety", "Variety", { availableFrom: { en: "Nov 21, 2026", de: "21. Nov. 2026" } }),
  f("the-flats", "The Flats", { availableFrom: { en: "Nov 28, 2026", de: "28. Nov. 2026" } }),
  f("a-useful-ghost", "A Useful Ghost", { availableFrom: { en: "Dec 5, 2026", de: "5. Dez. 2026" } }),
  f("ballroom", "Ballroom", { availableFrom: { en: "Dec 12, 2026", de: "12. Dez. 2026" } }),
];

const recommendedFilms: FilmEntry[] = [
  f("la-femme-du-veme", "La femme du Vème", { exclusive: true, rentable: true }),
  f("la-vie-me-va-bien", "La vie me va bien", { exclusive: true, rentable: true }),
  f("six-feet-over", "Six Feet Over", { exclusive: true, rentable: true }),
  f("coeur-ouvert", "À coeur ouvert", { exclusive: true, rentable: true }),
  f("manderlay", "Manderlay", { exclusive: true, rentable: true }),
  f("cold-war", "Cold War", { exclusive: true, rentable: true }),
];

const exclusiveBadge: L10n = { en: "Exclusive", de: proposedDe.exclusive };

const films = (entries: FilmEntry[], locale: Locale): FilmSummary[] =>
  entries.map(({ id, title, exclusive, rentable, availableFrom }) => ({
    id,
    title: title[locale],
    href: `/film/${id}`,
    ...(exclusive && { badge: exclusiveBadge[locale] }),
    ...(rentable && { rentable }),
    ...(availableFrom && { availableFrom: availableFrom[locale] }),
  }));

// ---------------------------------------------------------------------------------------------------------------
// Channels (sooner.de/en/channels and /de/channels; tile names from the tiles' accessible names).

const channels = (names: string[]): ChannelSummary[] => names.map((name) => ({ id: slug(name), name, href: `/channel/${slug(name)}` }));

const festivalNames: L10n[] = [
  same("Locarno Film Festival"),
  same("Berlinale - Forum"),
  { en: "Diagonale - Festival of Austrian Film", de: "Diagonale – Festival des österreichischen Films" },
  same("Crossing Europe"),
  same("Berlinale"),
  same("Toronto International Film Festival"),
  same("Berlinale - Panorama"),
  same("Cannes - La Semaine de la Critique"),
];
const festivalTints = ["bg-[#29c5e6]", "bg-[#ee7368]", "bg-[#ffd400]", "bg-[#dcc58a]", "bg-[#6c3fe0]", "bg-[#ff5a1f]"];

const curatorNames = [
  "Jannis Alexander Kiefer | Interfilm 2025",
  "Justina Jürgensen",
  "Sebastian Urzendowsky",
  "Erik Lemke",
  "Sophie Linnenbaum's Picks",
  "Ivette Löcker",
  "Afsaneh Salari",
];

const directorFocusNames = [
  "Jochen Hick",
  "Michael Brynntrup",
  "Denis Villeneuve",
  "Maren-Kea Freese",
  "Angela Christlieb",
  "Gessica Généus",
  "Directors Focus: Albert Serra",
];

// The school names are the channels' official names on both sites.
const nextGenNames = [
  "Next Generation: DFFB - German Film and Television Academy Berlin",
  "Next Generation: ifs internationale filmschule köln",
  "Next Generation: Filmakademie Baden-Württemberg",
  "Next Generation: Filmuniversität Babelsberg KONRAD WOLF",
  "Next Generation: HFBK Hochschule für bildende Künste Hamburg",
  "Next Gen: Universität der Künste Berlin",
];

const timelessNames = ["Rüdiger Sünner", "Rosa von Praunheim", "Lutz Dammbeck", "Thomas Imbach", "Thomas Arslan", "Robert Bramkamp", "Ruth Beckermann"];

const labelNames = ["Most Wanted Music", "Label: Darling Berlin", "Label: docfilm42", "Label: SWISS FILMS", "mec film", "filmdelights", "Filmgalerie 451"];

// "#GiveToGain | Internationaler Frauentag 2026" (first Specials tile on both sites) is left out: German name on the EN site.
const specialsNames: L10n[] = [
  { en: "Only on Sooner", de: "Nur bei Sooner" },
  same("Made in Germany"),
  same("A Sense of Place"),
  { en: "Award Winning", de: "Preisgekrönt" },
  same("Young Talent"),
];

/** Text-tile groups on the channels page (Screen, Topic, Storyline). */
const tagGroups: { title: string; names: L10n[] }[] = [
  {
    title: "Screen",
    names: [
      { en: "Screen: Switzerland", de: "Films Schweiz" },
      { en: "Screen: Scandinavia", de: "Skandinavische Filme" },
      { en: "Italian Movies", de: "Italienische Filme" },
      { en: "Screen: Turkey", de: "Türkische Filme" },
      { en: "Austrian Films", de: "Österreichische Filme" },
      same("Screen: Iran"),
    ],
  },
  {
    title: "Topic",
    names: ["Topic: No war!", "Topic: Refugees", "Topic: Facts & Alternatives", "Topic: Oral History", "Topic: No Planet B", "Topic: Mental Health"].map(same),
  },
  {
    title: "Storyline",
    names: ["Storyline: Sons", "Storyline: True Romance", "Storyline: Global Village", "Storyline: Daughters", "Storyline: Not just Sex", "Storyline: Queer Love"].map(same),
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Genres (sooner.de/en/categories and /de/categories, in production order). Production EN shows "Action & Aventure"
// and "Sci-Fi & Fantaisie"; corrected here to the English the DE site and the rest of the EN site use.

const genreNames: L10n[] = [
  same("Timeless"),
  { en: "Kids & Family", de: "Kinder & Familie" },
  { en: "Biography", de: "Biografie" },
  same("Drama"),
  same("Romance"),
  same("Icons & Media Art"),
  same("Shorts"),
  same("Independent"),
  { en: "Documentary", de: "Dokus" },
  same("Crime"),
  { en: "Action & Adventure", de: "Action & Abenteuer" },
  same("Horror"),
  { en: "Comedy", de: "Komödie" },
  same("Sci-Fi & Fantasy"),
  { en: "Music, Dance, Theater", de: "Musik, Tanz, Theater" },
  same("Animation"),
  same("Thriller"),
  same("Queer"),
  same("Love & Sex"),
];
const genreTints: GenreTint[] = ["violet", "yellow", "magenta", "pink", "red", "green"];

// ---------------------------------------------------------------------------------------------------------------
// Film page: Animale (production /en/id/1972094000164670082/animale and /de/id/…/animale).

export interface FilmPage {
  id: string;
  title: string;
  director: string;
  tagline: string;
  synopsis: string;
  festivals: string[];
  meta: { label: string; value: string[] }[];
  /** Press quotes; the quotes row only shows when there are some (Animale has none in production). */
  quotes: { source: string; quote: string; author?: string }[];
  price: string;
}

const animaleCast = ["Oulaya Amamra", "Damien Rebattel", "Vivien Rodriguez", "Claude Chaballier", "Elies-Morgan", "Admi-Bensellam", "Pierre Roux"];

const animale: Record<Locale, FilmPage> = {
  en: {
    id: "animale",
    title: "Animale",
    director: "Emma Benestan",
    tagline:
      "ANIMALE follows a young bull-runner in a macho arena, blending body horror with a sharp look at gender, power and belonging under pressure.",
    synopsis:
      "ANIMALE centers on Nejma, a 22-year-old bull-runner in the Camargue, where bulls are raised for the arena and physical strength rules the day. In ANIMALE, Emma Benestan places a young woman inside a stubbornly masculine world, letting the tension come from the way she is seen before she is fully known. At the ranch, Nejma's work exposes her to mockery, guarded acceptance, and pressure from all sides. Some men treat her presence as a novelty, others as an excuse for off-color teasing, while her mother worries about the bodily danger of the job. ANIMALE draws its drama from these small but constant frictions, building a sense of unease without resorting to easy shocks. The film also links Nejma to the bulls themselves, creatures filmed as both powerful and vulnerable. That parallel gives ANIMALE a sharper edge, because the same system that celebrates strength also subdues bodies and turns them into symbols. When the film works best in its visual, visceral passages, it points to a style that favors feeling and observation over explanation. ANIMALE ends up as a careful study of gender, control, and vulnerability.",
    festivals: ["Cannes - La Semaine de la Critique", "Festival de Cannes"],
    meta: [
      { label: "Director", value: ["Emma Benestan"] },
      { label: "Genres", value: ["Drama, Horror"] },
      { label: "Casting", value: animaleCast },
      { label: "Duration (min)", value: ["98"] },
      { label: "Year", value: ["2024"] },
      { label: "Country", value: ["France, Belgium, Saudi Arabia"] },
      { label: "Rating", value: ["16+"] },
      { label: "Audio", value: ["German, French"] },
      { label: "Subtitles", value: ["German"] },
    ],
    quotes: [],
    price: "€3.99",
  },
  de: {
    id: "animale",
    title: "Animale",
    director: "Emma Benestan",
    tagline:
      "ANIMALE folgt einer jungen Stierläuferin in einer machohaften Welt und verbindet Body-Horror mit Fragen nach Macht, Körper und Zugehörigkeit.",
    synopsis:
      "ANIMALE folgt Nejma, 22, auf einer Farm in der Camargue, wo Bullen für die Arena gezüchtet werden und Härte den Ton angibt. Emma Benestan stellt eine junge Frau ins Zentrum, die sich in einem streng männlich geprägten Umfeld behaupten muss, zwischen Neugier, Anspannung und latenter Gefahr. Je länger Nejma dort arbeitet, desto deutlicher wird, wie sehr sie beobachtet, geprüft und auch benutzt wird. Einige Männer machen sich über sie lustig, andere behandeln ihre Anwesenheit als Anlass für zweifelhafte Annäherungen, während die Sorge der Mutter das körperliche Risiko noch einmal verschärft. Der Konflikt wächst aus diesen Begegnungen und aus dem Druck, sich in einer Ordnung zurechtzufinden, die nicht für sie gemacht ist. Gleichzeitig verbindet ANIMALE Nejmas Geschichte mit den Stieren selbst: Sie sind stark, ausgestellt und doch unter Kontrolle. Gerade dort, wo der Film vom Dialog weg in visuelle und körperliche Eindrücke übergeht, entfaltet er seine größte Wirkung. ANIMALE bleibt ein konzentriertes, offenes Werk, das seinen Figuren aufmerksam folgt und den Blick ruhig hält.",
    festivals: ["Cannes - La Semaine de la Critique", "Festival de Cannes"],
    // Production DE labels, except "Casting" (shown in English on the DE page): proposed German.
    meta: [
      { label: "Regie", value: ["Emma Benestan"] },
      { label: "Genre", value: ["Drama, Horror"] },
      { label: proposedDe.casting, value: animaleCast },
      { label: "Laufzeit (Min.)", value: ["98"] },
      { label: "Jahr", value: ["2024"] },
      { label: "Land", value: ["Frankreich, Belgien, Saudi-Arabien"] },
      { label: "Altersfreigabe", value: ["16+"] },
      { label: "Ton", value: ["Deutsch, Französisch"] },
      { label: "Untertitel", value: ["Deutsch"] },
    ],
    quotes: [],
    price: "3,99 €",
  },
};

/** "Featured in" on the Animale page: channels Animale belongs to in production (its row, festival and genres). */
const animaleFeaturedIn: { title: L10n; href: string }[] = [
  { title: { en: "New To Rent", de: "Neu zum Leihen" }, href: "/channel/new-to-rent" },
  { title: same("Cannes - La Semaine de la Critique"), href: "/channel/cannes-la-semaine-de-la-critique" },
  { title: same("Drama"), href: "/categories/drama" },
  { title: same("Horror"), href: "/categories/horror" },
];

// ---------------------------------------------------------------------------------------------------------------
// Collection page: a placeholder collection (long text, so the clamp and "expanded" states show).

const collectionLorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const placeholderCollection: Record<Locale, { title: string; description: string }> = {
  en: { title: "Collection Title", description: Array.from({ length: 4 }, () => collectionLorem).join(" ") },
  // placeholder collection, German screen
  de: { title: "Titel der Kollektion", description: Array.from({ length: 4 }, () => collectionLorem).join(" ") },
};

const collectionFilm: Record<Locale, { title: string; meta: string[] }> = {
  en: { title: "Film Title", meta: ["Documentary", "90 min", "2020"] },
  // placeholder film, German screen
  de: { title: "Filmtitel", meta: ["Dokus", "90 Min", "2020"] },
};

// ---------------------------------------------------------------------------------------------------------------

/** Discover row titles per language (production sooner.de/en/discover and /de/discover). */
const rows = {
  en: {
    newToRent: "New To Rent",
    justReleased: "Just released",
    festivals: "Festivals",
    cinemaHighlights: "Cinema Highlights",
    onlyOnSooner: "Only on Sooner",
    curators: "The Sooner Curators",
    userFavorites: "User Favorites: Top 25",
    directorsFocus: "Directors Focus",
    cultClassics: "Cult Classics: Early Works",
    comingSoon: "Coming Soon",
    collections: "Collections",
    recommended: "Recommended",
    recommendedForYou: "Recommended for You",
    featuredIn: "Featured in",
    quotes: "Quotes and reviews",
  },
  de: {
    newToRent: "Neu zum Leihen",
    justReleased: "Aktuell erschienen",
    festivals: "Festivals",
    cinemaHighlights: "Cinema Highlights",
    onlyOnSooner: "Nur bei Sooner",
    curators: "The Sooner Curators",
    userFavorites: "User Favorites: Top 25",
    directorsFocus: "Directors Focus",
    cultClassics: "Cult Classics: Early Works",
    // Production keeps "Coming Soon" as the row name on the DE site.
    comingSoon: "Coming Soon",
    collections: proposedDe.collections,
    recommended: "Empfohlen",
    recommendedForYou: "Das könnte dir gefallen",
    featuredIn: "Enthalten in",
    quotes: proposedDe.quotes,
  },
} satisfies Record<Locale, Record<string, string>>;

/** Everything a screen shows, in one language. */
export function getCatalog(locale: Locale) {
  const festivals: ChannelSummary[] = festivalNames.map((name, i) => {
    const id = slug(name.en);
    return { id, name: name[locale], href: `/channel/${id}`, tint: festivalTints[i % festivalTints.length] };
  });
  const localized = (names: L10n[]): ChannelSummary[] => names.map((n) => ({ id: slug(n.en), name: n[locale], href: `/channel/${slug(n.en)}` }));
  const curators = channels(curatorNames);
  const directorFocus = channels(directorFocusNames);

  return {
    rows: rows[locale],
    newToRent: films(newToRentFilms, locale),
    exclusives: films(exclusiveFilms, locale),
    comingSoon: films(comingSoonFilms, locale),
    recommended: films(recommendedFilms, locale),
    festivals,
    curators,
    directorFocus,
    /** Square-tile rows on the channels page, production order. */
    channelSections: [
      { title: "The Sooner Curators", channels: curators },
      { title: "Festivals", channels: festivals },
      { title: "Next-Gen", channels: channels(nextGenNames) },
      { title: "Timeless Directors", channels: channels(timelessNames) },
      { title: "Labels", channels: channels(labelNames) },
      { title: "Directors Focus", channels: directorFocus },
      { title: "Specials", channels: localized(specialsNames) },
    ],
    /** Text-tile rows on the channels page. */
    tagSections: tagGroups.map((g) => ({
      title: g.title,
      tags: g.names.map((n) => ({ title: n[locale], href: `/channel/${slug(n.en)}` })),
    })),
    genres: genreNames.map(
      (n, i): GenreSummary => ({ id: slug(n.en), name: n[locale], href: `/categories/${slug(n.en)}`, tint: genreTints[i % genreTints.length] }),
    ),
    film: animale[locale],
    featuredIn: animaleFeaturedIn.map((t) => ({ title: t.title[locale], href: t.href })),
    collection: {
      ...placeholderCollection[locale],
      films: Array.from({ length: 35 }, (_, i) => ({
        id: `example-film-${i + 1}`,
        title: collectionFilm[locale].title,
        href: `/film/example-film-${i + 1}`,
        director: "Sofia Coppola",
        meta: collectionFilm[locale].meta,
        synopsis: collectionLorem,
        badge: exclusiveBadge[locale],
        rentable: true,
      })),
    },
    /** Search suggestions: production genre names. */
    searchSuggestions: [3, 8, 6, 17, 15, 12, 16].map((i) => genreNames[i][locale]),
  };
}

export type Catalog = ReturnType<typeof getCatalog>;
