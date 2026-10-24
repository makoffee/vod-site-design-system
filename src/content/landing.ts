// Production landing page content (sooner.de and sooner.de/en home, 2026-10-22). Copy, film rows and release dates
// are taken from production, including the section order. No artwork: blocks render the placeholder gradient.
// The / and /en routes pass getLanding(locale) to LandingScreen; Storybook shows the placeholders.

import type { Action } from "@/components/_shared/ActionLink";
import type { FaqItem } from "@/components/Faq/Faq";
import type { Locale } from "@/i18n/locale";
import type { FilmSummary, LandingContent } from "@/screens/content";

const film = (id: string, title: string, extra: Partial<FilmSummary> = {}): FilmSummary => ({ id, title, href: `/film/${id}`, ...extra });

type Dates = Record<Locale, string>;
const date = (en: string, de: string): Dates => ({ en, de });

// Rentable films carry the basket; coming-soon films a release date.
const rows = {
  highlights: [
    ["heldin", "HELDIN", date("Nov 3, 2026", "3. Nov. 2026")],
    ["cetait-mieux-demain", "C'était mieux demain"],
    ["marty-supreme", "Marty Supreme", date("Nov 2, 2026", "2. Nov. 2026")],
    ["mi-amiga-eva", "Mi amiga Eva - Ein Leben ohne Liebe ist möglich, aber sinnlos"],
    ["parasite", "Parasite", date("Nov 3, 2026", "3. Nov. 2026")],
    ["alpha", "Alpha"],
    ["la-femme-la-plus-riche-du-monde", "La femme la plus riche du monde"],
    ["no-other-choice", "Eo-jjeol su-ga eop-da - No Other Choice"],
    ["sentimental-value", "Sentimental Value"],
  ],
  newToRent: [
    ["cetait-mieux-demain", "C'était mieux demain"],
    ["animale", "Animale"],
    ["mi-amiga-eva", "Mi amiga Eva - Ein Leben ohne Liebe ist möglich, aber sinnlos"],
    ["compostelle", "Compostelle - Die Camino-Therapie"],
    ["dj-ahmet", "DJ Ahmet"],
    ["alpha", "Alpha"],
    ["la-femme-la-plus-riche-du-monde", "La femme la plus riche du monde"],
    ["no-other-choice", "Eo-jjeol su-ga eop-da - No Other Choice"],
    ["kuang-ye-shi-dai", "Kuang ye shi dai"],
  ],
  newInSubscription: [
    ["benedetta", "Benedetta"],
    ["titane", "Titane"],
    ["proxima", "Proxima"],
    ["cold-war", "Cold War"],
    ["die-taschendiebin", "Ah-ga-ssi - Die Taschendiebin"],
    ["foxcatcher", "Foxcatcher"],
    ["aicha", "Aïcha"],
    ["lunar-sway", "Lunar Sway"],
    ["mistress-dispeller", "Mistress Dispeller"],
  ],
  comingSoon: [
    ["a-plein-temps", "À plein temps", date("Nov 9, 2026", "9. Nov. 2026")],
    ["american-hustle", "American Hustle", date("Nov 8, 2026", "8. Nov. 2026")],
    ["christy", "Christy - That's Why the Lady Is A Champ", date("Nov 17, 2026", "17. Nov. 2026")],
    ["rodeo", "Rodéo", date("Nov 5, 2026", "5. Nov. 2026")],
    ["i-love-you-phillip-morris", "I Love You Phillip Morris", date("Nov 6, 2026", "6. Nov. 2026")],
    ["marty-supreme", "Marty Supreme", date("Nov 2, 2026", "2. Nov. 2026")],
    ["heldin", "HELDIN", date("Nov 3, 2026", "3. Nov. 2026")],
    ["parasite", "Parasite", date("Nov 3, 2026", "3. Nov. 2026")],
  ],
} satisfies Record<string, [string, string, Dates?][]>;

type RowId = keyof typeof rows;
const rentable: Record<RowId, boolean> = { highlights: true, newToRent: true, newInSubscription: false, comingSoon: true };

function landingFilms(row: RowId, locale: Locale): FilmSummary[] {
  return rows[row].map(([id, title, dates]: [string, string, Dates?]) =>
    film(id, title, { rentable: rentable[row], availableFrom: dates?.[locale] }),
  );
}

interface Collection {
  row: RowId;
  title: string;
  lead?: string;
  description: string;
  cta: Action;
}

interface Landing {
  hero: { eyebrow: string; title: string; subtitle: string; description: string; rentLabel: string; trailerLabel: string };
  collections: [Collection, Collection, Collection, Collection];
  split: { title: string; description: string };
  devices: { title: string; description: string };
  banner: { title: string; description: string; actions: Action[] };
  faq: { title: string; items: FaqItem[] };
}

const landing: Record<Locale, Landing> = {
  en: {
    hero: {
      eyebrow: "Sooner recommends",
      title: "Nouvelle Vague",
      subtitle: "Richard Linklater brings the Nouvelle Vague back to life – a playful love letter to Jean-Luc Godard and the making of BREATHLESS.",
      description: "Now available to rent · €4.99",
      rentLabel: "Rent film",
      trailerLabel: "Watch trailer",
    },
    collections: [
      {
        row: "highlights",
        title: "Curated cinema.\nYour Choice.",
        lead: "Discover standout films – from recent cinema highlights and festival favourites to new voices.",
        description: "With Sooner, you decide how to watch: with a subscription or by renting individual films.",
        cta: { label: "View cinema highlights", href: "/channel/cinema-highlights" },
      },
      {
        row: "newToRent",
        title: "New to rent",
        description: "Now also on Sooner: selected cinema highlights available to rent individually – no subscription required.",
        cta: { label: "View more", href: "/channel/new-to-rent" },
      },
      {
        row: "newInSubscription",
        title: "New in subscription",
        lead: "New films, festival favourites and distinctive discoveries – hand-picked for Sooner.",
        description: "With your subscription, you can watch every film in this section without limits and at no extra cost.",
        cta: { label: "View more", href: "/channel/new-in-subscription" },
      },
      {
        row: "comingSoon",
        title: "Coming Soon",
        lead: "Look forward to new films, festival discoveries and selected premieres – coming soon to Sooner.",
        description: "Selected rentals arrive on Sooner from the day of their digital release.",
        cta: { label: "Discover more", href: "/channel/coming-soon" },
      },
    ],
    split: {
      title: "Based in Berlin.\nConnected across Europe.",
      description:
        "Sooner.de is made in Berlin – with German-French roots and connected to a European network of streaming platforms. We share one idea: to make exceptional films visible and connect them with audiences across Europe.",
    },
    devices: { title: "Your films. Your devices.", description: "Watch Sooner at home or on the go – on the devices you already use." },
    banner: {
      title: "Your next film is waiting.",
      description: "Discover films with a subscription or simply rent the one you want to watch.",
      actions: [
        { label: "Discover films", href: "/discover", tone: "white" },
        { label: "Choose a plan", href: "/signup", tone: "primary" },
      ],
    },
    faq: {
      title: "Sooner, in brief.",
      items: [
        {
          question: "What is Sooner?",
          answer:
            "Sooner is an independent streaming platform based in Berlin, with a European perspective on film. Sooner is available in Germany, Austria, Switzerland, France, Belgium, Luxembourg, the UK, Sweden, Poland, the US and Mexico.\n\nWhat connects us is the idea of making cinema from different countries and perspectives visible and accessible. Sooner has a clear point of view: open, progressive and curious about different lives, voices and ways of seeing the world.",
        },
        {
          question: "What kind of films can I find on Sooner?",
          answer:
            "On Sooner, you’ll find films with a distinctive voice — films where you can feel that someone truly needed to make them. They offer a personal way of looking at the world. You don’t have to share that perspective. That is part of what makes them interesting: discovering different lives, experiences, worlds and points of view — fictional or documentary, entertaining, surprising, moving or sometimes challenging.\n\nSome of these films may be ones you missed at the cinema. Others gained attention at festivals or in cinemas internationally but were never released in Germany. On Sooner, you can discover them for the first time — and sometimes exclusively.",
        },
        {
          question: "Subscription or rental — how does Sooner work?",
          answer:
            "You decide. With a Sooner subscription, you can stream every film in the subscription catalogue without limits. Other films can be rented individually — no subscription required.\n\nSooner Plus combines both: the complete subscription plus three rental films every month.",
        },
        {
          question: "What does the shopping-basket icon on a film mean?",
          answer:
            "The shopping-basket icon marks films that are available to rent individually. They are not part of the regular subscription catalogue — but you do not need a Sooner subscription to rent them.\n\nWith Sooner Plus, three rental films per month are already included.",
        },
        {
          question: "Which devices can I use to watch Sooner?",
          answer:
            "You can watch Sooner at home or on the go: in your browser, on smartphones and tablets, and on Apple TV, Android TV / Google TV, Fire TV and Samsung TV.\n\nYou can stream on up to four screens at the same time.",
        },
      ],
    },
  },
  de: {
    hero: {
      eyebrow: "Sooner empfiehlt",
      title: "Nouvelle Vague",
      subtitle:
        "Richard Linklater lässt die Nouvelle Vague neu aufleben – eine verspielte Liebeserklärung an Jean-Luc Godard und die Entstehung von AUSSER ATEM.",
      description: "Jetzt zum Leihen · 4,99 €",
      rentLabel: "Film leihen",
      trailerLabel: "Trailer ansehen",
    },
    collections: [
      {
        row: "highlights",
        title: "Kuratiertes Kino.\nDeine Wahl.",
        lead: "Entdecke außergewöhnliche Filme – von aktuellen Kino-Highlights und Festivalfavoriten bis zu neuen Stimmen.",
        description: "Bei Sooner entscheidest du, wie du schaust: im Abo oder einzeln zum Leihen.",
        // Production shows the channel name as the button label here.
        cta: { label: "Cinema Highlights", href: "/channel/cinema-highlights" },
      },
      {
        row: "newToRent",
        title: "Neu zum Leihen",
        description: "Jetzt auch bei Sooner: ausgewählte Kino-Highlights einzeln leihen – ganz ohne Abo.",
        cta: { label: "Mehr anzeigen", href: "/channel/new-to-rent" },
      },
      {
        row: "newInSubscription",
        title: "Neu im Abo",
        lead: "Neue Filme, Festivalfavoriten und besondere Entdeckungen – handverlesen für Sooner.",
        description: "Mit deinem Abo schaust du alle Filme in diesem Bereich unbegrenzt und ohne zusätzliche Kosten.",
        cta: { label: "Mehr anzeigen", href: "/channel/new-in-subscription" },
      },
      {
        row: "comingSoon",
        title: "Demnächst",
        lead: "Freu dich auf neue Filme, Festivalentdeckungen und ausgewählte Premieren – bald bei Sooner.",
        description: "Ausgewählte Leihfilme starten bei Sooner direkt zum digitalen Start. Das Datum auf dem Filmcover zeigt dir, wann es losgeht.",
        cta: { label: "Mehr entdecken", href: "/channel/coming-soon" },
      },
    ],
    split: {
      title: "In Berlin zu Hause.\nIn Europa verbunden.",
      description:
        "Sooner.de wird in Berlin gemacht – mit deutsch-französischen Wurzeln und verbunden mit einem europäischen Netzwerk von Streaming-Plattformen. Gemeinsam teilen wir eine Idee: außergewöhnliche Filme sichtbar zu machen und ihnen ein Publikum in ganz Europa zu geben.",
    },
    devices: { title: "Deine Filme. Deine Geräte.", description: "Schau Sooner zu Hause oder unterwegs – auf den Geräten, die du ohnehin nutzt." },
    banner: {
      title: "Dein nächster Film wartet.",
      description: "Entdecke Filme im Abo oder leih genau den, den du sehen möchtest.",
      actions: [
        { label: "Filme entdecken", href: "/discover", tone: "white" },
        { label: "Abo wählen", href: "/signup", tone: "primary" },
      ],
    },
    faq: {
      // Production sets this one in caps ("SOONER, KURZ ERKLÄRT.").
      title: "Sooner, kurz erklärt.",
      items: [
        {
          question: "Was ist Sooner?",
          answer:
            "Sooner ist eine unabhängige Streaming-Plattform aus Berlin – mit einem europäischen Blick auf Film. Sooner gibt es in Deutschland, Österreich, der Schweiz, Frankreich, Belgien, Luxemburg, Großbritannien, Schweden, Polen, den USA und Mexiko.",
        },
        {
          question: "Welche Filme finde ich bei Sooner?",
          answer:
            "Bei Sooner findest du Filme mit einer eigenen Handschrift – Filme, bei denen man spürt, dass jemand sie unbedingt machen wollte. Sie zeigen einen persönlichen Blick auf die Welt. Den musst du nicht teilen. Gerade darin liegt der Reiz: andere Leben, Erfahrungen, Milieus und Perspektiven zu entdecken – fiktional oder dokumentarisch, unterhaltsam, überraschend, bewegend oder auch unbequem.",
        },
        {
          question: "Abo oder Leihen – wie funktioniert Sooner?",
          answer:
            "Du entscheidest. Mit einem Sooner-Abo streamst du alle Filme aus dem Abo-Katalog unbegrenzt. Andere Filme kannst du einzeln leihen – auch ganz ohne Abo.",
        },
        {
          question: "Was bedeutet das Warenkorb-Symbol auf einem Film?",
          answer:
            "Das Warenkorb-Symbol kennzeichnet Filme, die du einzeln leihen kannst. Sie gehören nicht zum regulären Abo-Katalog – ein Sooner-Abo brauchst du zum Leihen aber nicht.",
        },
        {
          question: "Auf welchen Geräten kann ich Sooner schauen?",
          answer:
            "Sooner kannst du zu Hause und unterwegs schauen: im Browser, auf Smartphone und Tablet sowie auf Apple TV, Android TV / Google TV, Fire TV und Samsung TV.",
        },
      ],
    },
  },
};

/** The landing page in one language, film rows resolved. */
export function getLanding(locale: Locale): LandingContent {
  const { hero, collections, ...rest } = landing[locale];
  const [a, b, c, d] = collections.map(({ row, ...block }) => ({ ...block, films: landingFilms(row, locale) }));
  return { ...rest, hero: { ...hero, href: "/film/nouvelle-vague" }, collections: [a, b, c, d] };
}
