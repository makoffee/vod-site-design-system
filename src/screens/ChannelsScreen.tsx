import { ChannelTagTile } from "@/components/ChannelTagTile/ChannelTagTile";
import { ChannelTile } from "@/components/ChannelTile/ChannelTile";
import { FeedRow } from "@/components/FeedRow/FeedRow";
import type { Locale } from "@/i18n/locale";
import { getCatalog } from "@/mocks/catalog";
import { AppShell, PageTitle } from "./AppShell";
import { feedRowDe } from "@/i18n/de";

export interface ChannelsScreenProps {
  /** Screen language: English (default, Storybook) or German (the /channels route). */
  locale?: Locale;
  /** Page title; production "Channels" (EN) / "Kanäle" (DE). */
  title?: string;
}

/**
 * Channels (production /en/channels and /de/channels): page title, one square-tile row per
 * channel group, then the text-tile groups (Screen, Topic, Storyline) as tag collections.
 */
export function ChannelsScreen({ locale = "en", title = locale === "de" ? "Kanäle" : "Channels" }: ChannelsScreenProps) {
  const c = getCatalog(locale);
  const row = locale === "de" ? feedRowDe : {};
  return (
    <AppShell active="collections" locale={locale}>
      <div className="flex flex-col gap-8 px-6 pt-8 pb-16">
        <PageTitle>{title}</PageTitle>
        {c.channelSections.map((section) => (
          <FeedRow {...row} key={section.title} title={section.title} kind="square">
            {section.channels.map((ch) => (
              <ChannelTile key={ch.id} {...ch} />
            ))}
          </FeedRow>
        ))}
        {c.tagSections.map((section) => (
          <FeedRow {...row} key={section.title} title={section.title} kind="square">
            {section.tags.map((tag) => (
              <ChannelTagTile key={tag.href} {...tag} aspect="square" />
            ))}
          </FeedRow>
        ))}
      </div>
    </AppShell>
  );
}
