import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SsoButton, SsoButtonGroup } from "./SsoButton";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Components/SsoButton",
  component: SsoButton,
  args: { provider: "google", onClick: fn() },
  argTypes: { provider: { control: "inline-radio", options: ["google", "apple", "amazon"] } },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SsoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = {};
export const Apple: Story = { args: { provider: "apple" } };
export const Amazon: Story = { args: { provider: "amazon" } };

/** SsoButtonGroup master. */
export const Group: Story = {
  decorators: [frame(400)],
  render: () => <SsoButtonGroup onSelect={fn()} />,
};
