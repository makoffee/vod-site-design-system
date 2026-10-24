import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { UniOffer } from "./UniOffer";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/UniOffer",
  component: UniOffer,
  args: { onSelect: fn() },
  parameters: {
    ...figmaComponent("UniOffer"),
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
