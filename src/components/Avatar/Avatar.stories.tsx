import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: { initials: "AB" },
  parameters: {
    ...figmaComponent("Avatar"),
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FromName: Story = { args: { initials: undefined, name: "User Name" } };
