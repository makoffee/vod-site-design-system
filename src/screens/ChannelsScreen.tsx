import { ChannelTagTile } from "@/components/ChannelTagTile/ChannelTagTile";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { FeedRow } from "@/components/FeedRow/FeedRow";
import { channelSections, featuredIn } from "@/mocks/catalog";
import { AppShell, PageTitle } from "./AppShell";
import { feedRowDe } from "@/i18n/de";

/** Design "Tag Collection Title" rows: tag channels as landscape tiles (placeholder copy on the canvas). */
const tagCollections = [1, 2, 3].map((n) => ({ title: "Tag Collection Title", id: `tag-collection-${n}` }));

/**
 * Channels (design "channels | 1440", production /de/channels "Kanäle"): page title, then one square-tile
 * row per channel group, then the tag collections.
 */
export function ChannelsScreen({ title = "Kanäle" }: { title?: string }) {
  return (
    <AppShell active="collections">
      <div className="flex flex-col gap-8 px-6 pt-8 pb-16">
        <PageTitle>{title}</PageTitle>
        {channelSections.map((section) => (
          <FeedRow {...feedRowDe} key={section.title} title={section.title} kind="square">
            {section.channels.map((c) => (
              <ChannelTile key={c.id} {...c} />
            ))}
          </FeedRow>
        ))}
        {tagCollections.map((collection) => (
          <FeedRow {...feedRowDe} key={collection.id} title={collection.title} kind="square">
            {[...featuredIn, ...featuredIn.slice(0, 2)].map((tag, i) => (
              <ChannelTagTile key={i} {...tag} aspect="square" />
            ))}
          </FeedRow>
        ))}
      </div>
    </AppShell>
  );
}
