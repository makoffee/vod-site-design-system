import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderFeaturedCollection, placeholderFilms } from "@/mocks/placeholder";
import { FilmCard } from "../FilmCard/FilmCard";
import { FeaturedCollectionBlock } from "./FeaturedCollectionBlock";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const films = placeholderFilms.slice(0, 7).map(({ id, title, href, rentable }) => (
  <FilmCard key={id} title={title} href={href} rentable={rentable} />
));

const meta = {
  title: "Marketing/FeaturedCollectionBlock",
  component: FeaturedCollectionBlock,
  args: { ...placeholderFeaturedCollection, side: "left", children: films },
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right"] },
    kind: { control: "inline-radio", options: ["tall", "wide", "square"] },
  },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    ...figmaComponent("FeaturedCollectionBlock"),
  },
} satisfies Meta<typeof FeaturedCollectionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {};
export const Right: Story = { args: { side: "right" } };
/** Coming-soon cards carry their release date. */
export const ComingSoon: Story = {
  args: {
    children: placeholderFilms.slice(0, 7).map(({ id, title, href }) => (
      <FilmCard key={id} title={title} href={href} rentable availableFrom={"Date"} />
    )),
  },
};
/** Any feed type fits inside the block: wide stills here. */
export const WideFeed: Story = {
  args: {
    kind: "wide",
    children: placeholderFilms.slice(0, 6).map(({ id, title, href }) => <FilmCard key={id} title={title} href={href} aspect="wide" />),
  },
};
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
