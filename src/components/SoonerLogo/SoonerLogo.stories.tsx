import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SoonerLogo } from "./SoonerLogo";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/SoonerLogo",
  component: SoonerLogo,
  parameters: {
    ...figmaComponent("SoonerLogo"),
  },
} satisfies Meta<typeof SoonerLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Master f247698934b0bb50 at 149 × 28. */
export const Default: Story = {};
export const Large: Story = { args: { className: "h-16" } };
