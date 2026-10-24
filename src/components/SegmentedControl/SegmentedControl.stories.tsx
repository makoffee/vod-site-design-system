import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  args: {
    label: "Billing period",
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly" },
    ],
    onValueChange: fn(),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Three segments. */
export const ThreeOptions: Story = {
  args: {
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly" },
      { value: "quarterly", label: "Quarterly" },
    ],
  },
};
export const Select: Story = {
  play: async ({ canvasElement, args }) => {
    const yearly = within(canvasElement).getByRole("radio", { name: "Yearly" });
    await userEvent.click(yearly);
    await expect(yearly).toHaveAttribute("aria-checked", "true");
    await expect(args.onValueChange).toHaveBeenCalledWith("yearly");
  },
};
