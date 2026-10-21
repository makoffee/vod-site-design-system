import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderFilms, placeholderSlice } from "@/mocks/placeholder";
import { FilmCard } from "../FilmCard/FilmCard";
import { CollectionFeature } from "./CollectionFeature";
import { frame } from "../_shared/storyFrames";

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
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof CollectionFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Design "FeaturedCollectionStack". */
export const Default: Story = {};
