import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer, beFundingLogos } from "./Footer";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    ...figmaComponent("Footer"),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const desktop: Decorator = frame(1440);
const mobile: Decorator = frame(393);

export const Desktop: Story = { decorators: [desktop] };
// The frame width picks the layout (desktop or mobile).
export const Mobile: Story = { decorators: [mobile], globals: viewport("mobile") };

/** Belgian site: three sponsor logos. */
export const BelgiumSponsors: Story = {
  args: { fundingLogos: beFundingLogos },
  decorators: [desktop],
};
