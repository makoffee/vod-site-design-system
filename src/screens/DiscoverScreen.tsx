import { AvailabilityFilter } from "@/components/AvailabilityFilter/AvailabilityFilter";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { CollectionFeature } from "@/components/CollectionFeature/CollectionFeature";
import { EditorialSlice } from "@/components/EditorialSlice/EditorialSlice";
import { FeaturedFilmCard } from "@/components/FeaturedFilmCard/FeaturedFilmCard";
import { FeedItem, FeedRow } from "@/components/FeedRow/FeedRow";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { MaskTile } from "@/components/MaskTile/MaskTile";
import { PromoHero } from "@/components/PromoHero/PromoHero";
import { SocialIcons } from "@/components/SocialIcons/SocialIcons";
import { channelSections, comingSoon, directorFocus, exclusives, festivals, newToRent, recommended, type FilmSummary } from "@/mocks/catalog";
import { documentarySlice, iffrSlice, podcastSlice, promoSlides, sfccCollection } from "@/mocks/editorial";
import { AppShell } from "./AppShell";
import { availabilityDe, featuredFilmCardDe, feedRowDe, filmCardDe, promoHeroDe } from "@/i18n/de";

const curators = channelSections.find((section) => section.title === "The Sooner Curators")!.channels;

function TallRow({ title, films }: { title: string; films: FilmSummary[] }) {
  return (
    <FeedRow {...feedRowDe} title={title} href={`/channel/${films[0].id}`}>
      {films.map((f) => (
        <FilmCard {...filmCardDe} key={f.id} {...f} />
      ))}
    </FeedRow>
  );
}

function WideRow({ title, films }: { title: string; films: FilmSummary[] }) {
  return (
    <FeedRow {...feedRowDe} title={title} kind="wide">
      {films.map((f) => (
        <FilmCard {...filmCardDe} key={f.id} aspect="wide" {...f} />
      ))}
    </FeedRow>
  );
}

/**
 * Discover (design "discover | 1440", production /de/discover): promo hero + availability filter, then feeds and
 * editorial slices in the design's section order, filled with production row titles and films.
 */
export function DiscoverScreen() {
  const [featured, ...upcoming] = comingSoon;

  return (
    <AppShell active="discover">
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col">
          <PromoHero {...promoHeroDe} slides={promoSlides} />
          <AvailabilityFilter {...availabilityDe} className="mx-auto my-4" />
        </div>
        <div className="flex flex-col gap-12 pb-16">
          <TallRow title="New to Rent" films={newToRent} />
          <WideRow title="Neu im Abo" films={exclusives} />
          <CollectionFeature {...sfccCollection}>
            {exclusives.slice(0, 4).map((f) => (
              <FilmCard {...filmCardDe} key={f.id} {...f} />
            ))}
          </CollectionFeature>
          <FeedRow {...feedRowDe} title="Festivals" kind="square" href="/channels">
            {festivals.map((c) => (
              <ChannelTile key={c.id} {...c} />
            ))}
          </FeedRow>
          <EditorialSlice {...iffrSlice} />
          <WideRow title="Cinema Highlights" films={recommended} />
          <TallRow title="Nur bei Sooner" films={exclusives} />
          <EditorialSlice
            {...podcastSlice}
            media="mask"
            side="left"
            cta={{ ...podcastSlice.cta, icon: <SocialIcons platform="Spotify" size={20} className="text-white" /> }}
          />
          <FeedRow {...feedRowDe} title="The Sooner Curators" kind="square" href="/channels">
            {curators.map((c) => (
              <ChannelTile key={c.id} {...c} />
            ))}
          </FeedRow>
          <TallRow title="User Favorites: Top 25" films={recommended} />
          <EditorialSlice {...documentarySlice} media="mask" side="right" />
          <FeedRow {...feedRowDe} title="Director Focus" kind="square" href="/channels">
            {directorFocus.map((c) => (
              <ChannelTile key={c.id} {...c} />
            ))}
          </FeedRow>
          <WideRow title="Cult Classics: Early Works" films={newToRent} />
          <FeedRow {...feedRowDe} title="Coming Soon" href="/channel/coming-soon">
            <FeedItem className="basis-[min(619px,85%)]">
              <FeaturedFilmCard {...featuredFilmCardDe} title={featured.title} href={featured.href} director="Eric Gravel" directorHref="/cast/eric-gravel" />
            </FeedItem>
            {upcoming.map((f) => (
              <FilmCard {...filmCardDe} key={f.id} {...f} />
            ))}
          </FeedRow>
          <FeedRow {...feedRowDe} title="Collections" kind="wide">
            {[sfccCollection, iffrSlice, documentarySlice].map((c, i) => (
              <MaskTile key={c.title} title={c.title} href={c.cta.href} tinted={i === 0} />
            ))}
          </FeedRow>
        </div>
      </div>
    </AppShell>
  );
}
