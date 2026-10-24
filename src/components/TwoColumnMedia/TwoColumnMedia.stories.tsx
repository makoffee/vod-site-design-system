import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderTwoColumn } from "@/mocks/placeholder";
import { TwoColumnMedia } from "./TwoColumnMedia";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Marketing/TwoColumnMedia",
  component: TwoColumnMedia,
  args: { ...placeholderTwoColumn, side: "left" },
  argTypes: { side: { control: "inline-radio", options: ["left", "right"] } },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    ...figmaComponent("TwoColumnMedia"),
  },
} satisfies Meta<typeof TwoColumnMedia>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Variation withAppButtons (production logos). */
export const AppButtons: Story = {};
export const MediaRight: Story = { args: { side: "right" } };
export const WithoutApps: Story = { args: { apps: [] } };
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
