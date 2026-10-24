import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderSlice } from "@/mocks/placeholder";
import { SocialIcons } from "../SocialIcons/SocialIcons";
import { EditorialSlice } from "./EditorialSlice";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Discover/EditorialSlice",
  component: EditorialSlice,
  args: { ...placeholderSlice, media: "image", side: "right" },
  argTypes: {
    media: { control: "inline-radio", options: ["image", "mask"] },
    side: { control: "inline-radio", options: ["left", "right"] },
  },
  decorators: [frame(1392)],
  parameters: {
    layout: "padded",
    ...figmaComponent("EditorialSlice"),
  },
} satisfies Meta<typeof EditorialSlice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageRight: Story = {};
export const ImageLeft: Story = { args: { side: "left" } };
/** Binocular-masked image with an icon CTA (podcast slice). */
export const MaskLeft: Story = {
  args: {
    ...placeholderSlice,
    media: "mask",
    side: "left",
    cta: { ...placeholderSlice.cta, icon: <SocialIcons platform="Spotify" size={20} className="text-white" /> },
  },
};
/** Text first, mask on the right. */
export const MaskRight: Story = { args: { media: "mask", side: "right" } };
