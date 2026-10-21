import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { loremLong, placeholder } from "@/mocks/placeholder";
import { FeaturedFilmCard } from "./FeaturedFilmCard";
import { frame } from "../_shared/storyFrames";

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
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof FeaturedFilmCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Production action set: rent and watchlist. */
export const Production: Story = {};

/** Design "Featured card with feed": adds Subscribe. */
export const Design: Story = {
  args: {
    directorHref: undefined,
    subscribeLabel: "Subscribe",
    onSubscribe: fn(),
  },
};
