import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Switch } from "./Switch";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

// Variants: checked[false,true] × state[default,focus,disabled].
const meta = {
  title: "Components/Switch",
  component: Switch,
  args: {
    label: "Label",
    description: "Description",
    checked: false,
    state: "default",
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: { control: "boolean" },
    state: { control: "inline-radio", options: ["default", "focus", "disabled"] },
  },
  decorators: [frame(420)],
  parameters: {
    ...figmaComponent("Switch"),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UncheckedDefault: Story = {};
export const UncheckedFocus: Story = { args: { state: "focus" } };
export const UncheckedDisabled: Story = { args: { state: "disabled" } };
export const CheckedDefault: Story = { args: { checked: true } };
export const CheckedFocus: Story = { args: { checked: true, state: "focus" } };
export const CheckedDisabled: Story = { args: { checked: true, state: "disabled" } };

/** Uncontrolled: click to toggle. */
export const Interactive: Story = { args: { checked: undefined, defaultChecked: false } };
