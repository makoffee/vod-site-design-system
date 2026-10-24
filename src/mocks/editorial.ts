// Editorial blocks on discover, in both site languages, copied from production sooner.de/en/discover and
// /de/discover (2026-10-24): the promo hero, the "Collection" slices and the "Only on Sooner" channel text.
// Production keeps the "Collection" eyebrow in English on the DE site. Never write new editorial copy here.

import type { Locale } from "@/i18n/locale";

interface Editorial {
  eyebrow?: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}

const content: Record<
  Locale,
  {
    promoSlides: { id: string; title: string; description?: string; badge?: string; href: string }[];
    onlyOnSooner: Editorial;
    theBeast: Editorial;
    veniVidiVici: Editorial;
    sooner365: Editorial;
  }
> = {
  en: {
    promoSlides: [
      {
        id: "the-invite",
        title: "The Invite",
        description:
          "A dinner between neighbors turns into a provocative game of desire and jealousy. Olivia Wilde’s wickedly funny comedy stars Seth Rogen, Penélope Cruz, and Edward Norton.",
        href: "/film/the-invite",
      },
      { id: "cold-war", title: "Cold War", href: "/film/cold-war" },
      { id: "exit-8", title: "Exit 8", href: "/film/exit-8" },
      { id: "titane", title: "Titane", href: "/film/titane" },
    ],
    onlyOnSooner: {
      eyebrow: "Collection",
      title: "Only on Sooner",
      description:
        "Discover distinctive films available exclusively on Sooner in Germany — acclaimed festival and international cinema that never received a German release.",
      cta: { label: "View all", href: "/channel/only-on-sooner" },
    },
    theBeast: {
      eyebrow: "Collection",
      title: "The Beast",
      description:
        "What remains of us when emotions are meant to be erased? Bertrand Bonello’s hypnotic drama with Léa Seydoux and George MacKay traces love, fear, and fate across time.",
      cta: { label: "Watch here", href: "/film/la-bete" },
    },
    veniVidiVici: {
      eyebrow: "Collection",
      title: "Veni Vidi Vici",
      description: "A razor-sharp satire on the ultra-wealthy and a life untouched by consequence. A precise look at power, privilege, and moral detachment.",
      cta: { label: "Watch here", href: "/film/veni-vidi-vici" },
    },
    sooner365: {
      eyebrow: "Collection",
      title: "Give the gift of great cinema with Sooner 365",
      description: "A gift for anyone who loves truly great films.",
      cta: { label: "Gift now", href: "/gift" },
    },
  },
  de: {
    promoSlides: [
      {
        id: "the-invite",
        title: "The Invite",
        description:
          "Ein Abendessen unter Nachbarn wird zum riskanten Spiel mit Begehren und Eifersucht. Olivia Wildes bissige Komödie mit Seth Rogen, Penélope Cruz und Edward Norton.",
        href: "/film/the-invite",
      },
      { id: "cold-war", title: "Cold War", href: "/film/cold-war" },
      { id: "exit-8", title: "Exit 8", href: "/film/exit-8" },
      { id: "titane", title: "Titane", href: "/film/titane" },
    ],
    onlyOnSooner: {
      eyebrow: "Collection",
      title: "Only on Sooner",
      description:
        "Entdecke besondere Filme, die in Deutschland exklusiv bei Sooner zu sehen sind – international gefeiertes Kino und Festivalentdeckungen, die hier nie veröffentlicht wurden.",
      cta: { label: "Alle ansehen", href: "/channel/only-on-sooner" },
    },
    theBeast: {
      eyebrow: "Collection",
      title: "The Beast",
      description:
        "Was bleibt vom Menschen, wenn Gefühle verschwinden sollen? Bertrand Bonello erzählt mit Léa Seydoux und George MacKay von Liebe, Angst und Schicksal über die Grenzen der Zeit hinweg.",
      cta: { label: "Hier anschauen", href: "/film/la-bete" },
    },
    veniVidiVici: {
      eyebrow: "Collection",
      title: "Veni Vidi Vici",
      description:
        "Eine bitterböse Politsatire über die Superreichen und ein Leben ohne sichtbare Konsequenzen. Ein präziser Blick auf Macht, Kapital und moralische Blindstellen.",
      cta: { label: "Hier anschauen", href: "/film/veni-vidi-vici" },
    },
    sooner365: {
      eyebrow: "Collection",
      title: "Verschenke einzigartige Geschichten mit Sooner 365",
      description: "Ein Geschenk für alle, die gutes Kino lieben.",
      cta: { label: "Jetzt verschenken", href: "/gift" },
    },
  },
};

/** Discover's editorial blocks in one language. */
export const getEditorial = (locale: Locale) => content[locale];
