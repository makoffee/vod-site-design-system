import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { UniOffer } from "./UniOffer";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Components/UniOffer",
  component: UniOffer,
  args: { onSelect: fn() },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof UniOffer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Master at 1200px. */
export const Default: Story = {
  decorators: [frame(1200)],
};

export const Mobile: Story = {
  parameters: { frameWidth: 345 },
  globals: viewport("mobile"),
};
