import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SoonerLogo } from "./SoonerLogo";

const meta = {
  title: "Components/SoonerLogo",
  component: SoonerLogo,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SoonerLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Master f247698934b0bb50 at 149 × 28. */
export const Default: Story = {};
export const Large: Story = { args: { className: "h-16" } };
