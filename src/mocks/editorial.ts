// Editorial copy exactly as on the discover design screen ("discover | 1440", 2 Key Screens).

export const iffrSlice = {
  eyebrow: "Festival Highlights",
  title: "IFF Rotterdam Collection",
  description:
    "The International Film Festival Rotterdam 2026 has wrapped. Missed it? Discover the highlights on our exclusive Sooner IFFR channel with curated selections from emerging filmmakers.",
  cta: { label: "View films", href: "/channel/iffr" },
};

export const podcastSlice = {
  eyebrow: "Sooner Podcast",
  title: "Paris in Film",
  description:
    "Join us for intimate conversations with independent filmmakers, exploring their creative process, challenges, and breakthrough moments in cinema.",
  cta: { label: "Listen on Spotify", href: "https://open.spotify.com/" },
};

export const sfccCollection = {
  eyebrow: "Collection",
  title: "80 Years of French Film Critics Society",
  description:
    "Since 1946, the French Film Critics Society has defended free, independent, and vibrant criticism. Each year, it honors the best in cinematic creation by awarding the SFCC Critics' Prizes. Classics, revelations, films from around the world: (re)discover a selection of award-winning works from across the decades.",
  cta: { label: "View films", href: "/collection/sfcc" },
};

/** Hero slide on the design screen; the remaining titles are the production promo order (no copy captured). */
export const promoSlides = [
  {
    id: "dear-prudence",
    title: "Dear Prudence",
    badge: "Exclusive",
    description:
      "17-year-old Prudence lives alone in Paris. After a botched shoplifting attempt she meets Marilyne at the police station.",
    href: "/film/dear-prudence",
  },
  { id: "cold-war", title: "Cold War", href: "/film/cold-war" },
  { id: "exit-8", title: "Exit 8", href: "/film/exit-8" },
  { id: "titane", title: "Titane", href: "/film/titane" },
];

export const documentarySlice = {
  eyebrow: "Documentary Collection",
  title: "Documentary Spotlight",
  description:
    "Dive deep into powerful real-life stories that challenge perspectives and inspire change. Experience documentaries that go beyond the surface.",
  cta: { label: "View films", href: "/collection/documentary" },
};
