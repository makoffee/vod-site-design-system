import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderGenres } from "@/mocks/placeholder";
import { GenreTile } from "./GenreTile";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/GenreTile",
  component: GenreTile,
  args: placeholderGenres[0],
  decorators: [frame(336)],
  parameters: {
    ...figmaComponent("GenreTile"),
  },
} satisfies Meta<typeof GenreTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Violet: Story = {};
/** All six duotones in order. */
export const Tints: Story = {
  parameters: { frameWidth: 1392 },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {placeholderGenres.map((genre) => (
        <GenreTile key={genre.id} {...genre} />
      ))}
    </div>
  ),
};
