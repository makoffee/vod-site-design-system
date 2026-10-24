import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { placeholderFilms } from "@/mocks/placeholder";
import { FilmListItem } from "./FilmListItem";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const [film] = placeholderFilms;

const meta = {
  title: "Collections/FilmListItem",
  component: FilmListItem,
  args: { ...film, onSubscribe: fn(), onRent: fn(), onAddToWatchlist: fn() },
  decorators: [frame(1152)],
  parameters: {
    ...figmaComponent("FilmListItem"),
  },
} satisfies Meta<typeof FilmListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Production labels at the 1152px content width of "collection view | list | 1440". */
export const Default: Story = {};
/** Icon-only actions, as on "collection view | 393px". */
export const Mobile: Story = { parameters: { frameWidth: 345 }, globals: viewport("mobile") };
