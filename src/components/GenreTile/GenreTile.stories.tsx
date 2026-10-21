import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderGenres } from "@/mocks/placeholder";
import { GenreTile } from "./GenreTile";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Feeds/GenreTile",
  component: GenreTile,
  args: placeholderGenres[0],
  decorators: [frame(336)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof GenreTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Violet: Story = {};
/** All six duotones in the design's order. */
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
