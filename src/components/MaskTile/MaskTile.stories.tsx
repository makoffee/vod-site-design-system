import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MaskTile } from "./MaskTile";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Feeds/MaskTile",
  component: MaskTile,
  args: { title: "Headline", href: "/collection/example" },
  decorators: [frame(455)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof MaskTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Design "Collection row with icon-mask". */
export const Default: Story = {};
export const Tinted: Story = { args: { tinted: true } };
