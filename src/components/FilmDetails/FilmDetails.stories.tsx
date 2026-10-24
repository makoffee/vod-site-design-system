import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderFilm } from "@/mocks/placeholder";
import { FilmDetails } from "./FilmDetails";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Film/FilmDetails",
  component: FilmDetails,
  args: {
    ...placeholderFilm,
  },
  decorators: [frame(1392)],
  parameters: {
    ...figmaComponent("FilmDetails"),
  },
} satisfies Meta<typeof FilmDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop content width, 1392px (1440 minus the 24px page gutters). */
export const Default: Story = {};
export const Tablet: Story = { parameters: { frameWidth: 720 }, globals: viewport("tablet") };
export const Mobile: Story = { parameters: { frameWidth: 345 }, globals: viewport("mobile") };
