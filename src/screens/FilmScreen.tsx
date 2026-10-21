import { ChannelTagTile } from "@/components/ChannelTagTile/ChannelTagTile";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { FeedRow } from "@/components/FeedRow/FeedRow";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { FilmDetails } from "@/components/FilmDetails/FilmDetails";
import { FilmHero } from "@/components/FilmHero/FilmHero";
import { QuoteCard } from "@/components/QuoteCard/QuoteCard";
import { featuredIn, festivals, filmQuotes, marieAntoinette, recommended } from "@/mocks/catalog";
import { AppShell } from "./AppShell";
import { feedRowDe, filmCardDe, filmHeroDe } from "@/i18n/de";

/**
 * Single film view (design "single film view | 1440", production /de/id/…): hero with the CTAs, the info grid,
 * then recommendations ("Das könnte dir gefallen"), festivals, channels it is featured in, and quotes.
 */
export function FilmScreen({ film = marieAntoinette }: { film?: typeof marieAntoinette }) {
  return (
    <AppShell>
      <FilmHero {...filmHeroDe} title={film.title} director={film.director} />
      <div className="flex flex-col gap-16 px-6 pt-12 pb-16">
        <FilmDetails
          title={film.title}
          tagline={film.tagline}
          synopsis={film.synopsis}
          festivals={film.festivals.map((name) => ({ name }))}
          facts={film.meta}
        />
        <div className="flex flex-col gap-10">
          <FeedRow {...feedRowDe} title="Das könnte dir gefallen">
            {recommended.map((f) => (
              <FilmCard {...filmCardDe} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Festivals" kind="square">
            {festivals.map((c) => (
              <ChannelTile key={c.id} {...c} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Enthalten in" kind="wide">
            {featuredIn.map((tag) => (
              <ChannelTagTile key={tag.href} {...tag} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Quotes and reviews" kind="wide">
            {filmQuotes.map((q) => (
              <QuoteCard key={q.source} {...q} />
            ))}
          </FeedRow>
        </div>
      </div>
    </AppShell>
  );
}
