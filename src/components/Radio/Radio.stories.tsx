import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Radio } from "./Radio";
import { frame } from "../_shared/storyFrames";

// Variants mirror the Radio master: checked[false,true] × state[default,focus,disabled].
const meta = {
  title: "Components/Radio",
  component: Radio,
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
  decorators: [frame(364)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof Radio>;

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

export const Group: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">Options</legend>
      <Radio name="options" value="one" defaultChecked label="Label" description="Description" />
      <Radio name="options" value="two" label="Label" description="Description" />
    </fieldset>
  ),
};
