import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderFilms, placeholderSlice } from "@/mocks/placeholder";
import { FilmCard } from "../FilmCard/FilmCard";
import { CollectionFeature } from "./CollectionFeature";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Discover/CollectionFeature",
  component: CollectionFeature,
  args: {
    ...placeholderSlice,
    children: placeholderFilms.slice(0, 4).map((f) => <FilmCard key={f.id} title={f.title} href={f.href} badge={f.badge} rentable />),
  },
  decorators: [frame(1392)],
  parameters: {
    layout: "padded",
    ...figmaComponent("CollectionFeature"),
  },
} satisfies Meta<typeof CollectionFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Design "FeaturedCollectionStack". */
export const Default: Story = {};
