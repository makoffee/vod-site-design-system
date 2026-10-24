import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextInput } from "./TextInput";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  args: {
    type: "email",
    state: "default",
    label: "Label",
    placeholder: "Placeholder",
    supportingText: "Helper text",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["email", "password"] },
    state: { control: "inline-radio", options: ["default", "filled", "focus", "error", "disabled"] },
  },
  decorators: [frame(380)],
  parameters: {
    ...figmaComponent("TextInput"),
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailDefault: Story = {};
export const EmailFilled: Story = { args: { state: "filled", defaultValue: "Input value" } };
export const EmailFocus: Story = { args: { state: "focus" } };
export const EmailError: Story = {
  args: { state: "error", defaultValue: "Input", supportingText: "Error message" },
};
export const EmailDisabled: Story = {
  args: { state: "disabled", placeholder: "Disabled", supportingText: "Helper text" },
};
export const PasswordDefault: Story = {
  args: {
    type: "password",
    label: "Label",
    placeholder: "Placeholder",
    defaultValue: "password",
    supportingText: "Helper text",
  },
};
