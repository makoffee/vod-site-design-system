import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavLink } from "./NavLink";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/NavLink",
  component: NavLink,
  args: { href: "/discover", children: "Link", active: false },
  parameters: {
    ...figmaComponent("NavLink"),
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {};
export const Active: Story = { args: { active: true } };
