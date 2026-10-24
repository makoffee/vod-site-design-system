import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChannelTagTile } from "./ChannelTagTile";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Film/ChannelTagTile",
  component: ChannelTagTile,
  args: { title: "Channel Tag Title", href: "/channel/tag" },
  decorators: [frame(339)],
  parameters: {
    ...figmaComponent("ChannelTagTile"),
  },
} satisfies Meta<typeof ChannelTagTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Channels page "Tag Collection" rows. */
export const Square: Story = { args: { aspect: "square" }, parameters: { frameWidth: 222 } };
