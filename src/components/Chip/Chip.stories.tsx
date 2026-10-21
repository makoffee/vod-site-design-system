import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Chip } from "./Chip";

const meta = {
  title: "Search/Chip",
  component: Chip,
  args: { children: "Label", onClick: fn() },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
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
