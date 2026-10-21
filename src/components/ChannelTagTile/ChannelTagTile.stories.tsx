import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChannelTagTile } from "./ChannelTagTile";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Film/ChannelTagTile",
  component: ChannelTagTile,
  args: { title: "Channel Tag Title", href: "/channel/tag" },
  decorators: [frame(339)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof ChannelTagTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Channels page "Tag Collection" rows. */
export const Square: Story = { args: { aspect: "square" }, parameters: { frameWidth: 222 } };
