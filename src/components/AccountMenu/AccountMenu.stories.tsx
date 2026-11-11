import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AccountMenu } from "./AccountMenu";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/AccountMenu",
  component: AccountMenu,
  args: { onLogout: fn() },
  parameters: { layout: "centered", ...figmaComponent("AccountMenu") },
} satisfies Meta<typeof AccountMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Account sections, then Log out. */
export const Default: Story = {};
