import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderChannels } from "@/mocks/placeholder";
import { ChannelTile } from "./ChannelTile";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/ChannelTile",
  component: ChannelTile,
  args: { ...placeholderChannels[0], tint: "bg-sooner-primary" },
  decorators: [frame(222)],
  parameters: {
    ...figmaComponent("ChannelTile"),
  },
} satisfies Meta<typeof ChannelTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tinted tile ("Collection row squares"); real festival tiles carry their artwork. */
export const Festival: Story = {};
/** Curator / director tile without artwork. */
export const Person: Story = { args: { tint: undefined } };
