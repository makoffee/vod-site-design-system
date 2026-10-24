import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { placeholderFilm } from "@/mocks/placeholder";
import { FilmHero } from "./FilmHero";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Film/FilmHero",
  component: FilmHero,
  args: {
    title: placeholderFilm.title,
    director: placeholderFilm.director,
    onSubscribe: fn(),
    onRent: fn(),
    onTrailer: fn(),
    onAddToWatchlist: fn(),
    onShare: fn(),
  },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    ...figmaComponent("FilmHero"),
  },
} satisfies Meta<typeof FilmHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Production labels (Subscribe, Rent, Trailer). */
export const Default: Story = {};
/** With the trailer mute toggle. */
export const WithMuteToggle: Story = { args: { muted: true, onMutedChange: fn() } };
/** Not available to rent: subscribe and trailer only. */
export const SubscriptionOnly: Story = { args: { rentLabel: null } };
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
