import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { TextAction } from "./TextAction";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Account/TextAction",
  component: TextAction,
  args: { children: "Edit", onClick: fn() },
  parameters: { ...figmaComponent("TextAction"), },
} satisfies Meta<typeof TextAction>;

export default meta;
type Story = StoryObj<typeof meta>;

/** xs: inline row actions. */
export const Default: Story = {};
/** sm: standalone actions. */
export const Small: Story = { args: { children: "Set my PIN", size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };
