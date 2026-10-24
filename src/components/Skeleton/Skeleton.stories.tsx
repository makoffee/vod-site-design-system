import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  decorators: [(Story) => <div className="w-[222px]"><Story /></div>],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Stands in for a FilmCard (3:4). */
export const PosterTall: Story = { args: { shape: "poster-tall" } };
/** Stands in for a wide FilmCard (16:9). */
export const PosterWide: Story = { args: { shape: "poster-wide" } };
export const Square: Story = { args: { shape: "square" } };
/** Text lines: set the width per line. */
export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton shape="text" className="w-3/4" />
      <Skeleton shape="text" />
      <Skeleton shape="text" className="w-1/2" />
    </div>
  ),
};
export const Circle: Story = { args: { shape: "circle", className: "size-10" } };
