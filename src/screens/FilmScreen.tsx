import { ChannelTagTile } from "@/components/ChannelTagTile/ChannelTagTile";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { FeedRow } from "@/components/FeedRow/FeedRow";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilmHero } from "@/components/FilmHero/FilmHero";
import { QuoteCard } from "@/components/QuoteCard/QuoteCard";
import { getCatalog, type FilmPage } from "@/mocks/catalog";
import type { Locale } from "@/i18n/locale";
import { AppShell } from "./AppShell";
import { feedRowDe, filmCardDe, filmDetailsDe, filmHeroDe } from "@/i18n/de";

export interface FilmScreenProps {
  /** Screen language: English (default, Storybook) or German (the /film/[id] route). */
  locale?: Locale;
  /** Film page data in the same language; the catalogue's Animale page by default. */
  film?: FilmPage;
}

/**
 * Single film view (production /en/id/… and /de/id/…): hero with the CTAs, the info
 * grid, then recommendations, festivals, channels it is featured in, and quotes (only when the film has some).
 */
export function FilmScreen({ locale = "en", film }: FilmScreenProps) {
  const de = locale === "de";
  const c = getCatalog(locale);
  const f = film ?? c.film;
  const row = de ? feedRowDe : {};
  return (
    <AppShell locale={locale}>
      <FilmHero {...(de ? filmHeroDe : {})} title={f.title} director={f.director} />
      <div className="flex flex-col gap-16 px-6 pt-12 pb-16">
        <FilmDetails
          {...(de ? filmDetailsDe : {})}
          title={f.title}
          tagline={f.tagline}
          synopsis={f.synopsis}
          festivals={f.festivals.map((name) => ({ name }))}
          facts={f.meta}
        />
        <div className="flex flex-col gap-10">
          <FeedRow {...row} title={c.rows.recommendedForYou}>
            {c.recommended.map((r) => (
              <FilmCard {...(de ? filmCardDe : {})} key={r.id} {...r} />
            ))}
          </FeedRow>
          <FeedRow {...row} title={c.rows.festivals} kind="square">
            {c.festivals.map((ch) => (
              <ChannelTile key={ch.id} {...ch} />
            ))}
          </FeedRow>
          <FeedRow {...row} title={c.rows.featuredIn} kind="wide">
            {c.featuredIn.map((tag) => (
              <ChannelTagTile key={tag.href} {...tag} />
            ))}
          </FeedRow>
          {f.quotes.length > 0 && (
            <FeedRow {...row} title={c.rows.quotes} kind="wide">
              {f.quotes.map((q) => (
                <QuoteCard key={q.source} {...q} />
              ))}
            </FeedRow>
          )}
        </div>
      </div>
    </AppShell>
  );
}
