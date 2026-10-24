import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Chip } from "./Chip";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Search/Chip",
  component: Chip,
  args: { children: "Label", onClick: fn() },
  parameters: {
    ...figmaComponent("Chip"),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AsLink: Story = { args: { href: "/search?q=label", onClick: undefined } };
/** Suggested searches wrap onto new lines. */
export const Group: Story = {
  render: () => (
    <div className="flex max-w-[720px] flex-wrap gap-2">
      {Array.from({ length: 7 }, (_, i) => (
        <Chip key={i}>Label</Chip>
      ))}
    </div>
  ),
};
