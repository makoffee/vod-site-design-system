import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { loremLong, placeholder } from "@/mocks/placeholder";
import { FeaturedFilmCard } from "./FeaturedFilmCard";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/FeaturedFilmCard",
  component: FeaturedFilmCard,
  args: {
    title: placeholder.filmTitle,
    href: "/film/film-1",
    director: placeholder.director,
    directorHref: "/cast/director",
    eyebrow: placeholder.eyebrow,
    description: loremLong,
    onRent: fn(),
    onAddToWatchlist: fn(),
  },
  decorators: [frame(619)],
  parameters: {
    ...figmaComponent("FeaturedFilmCard"),
  },
} satisfies Meta<typeof FeaturedFilmCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Subscribe, rent and watchlist actions. */
export const Default: Story = { args: { onSubscribe: fn() } };
