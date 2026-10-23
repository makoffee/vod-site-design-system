import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AvailabilityFilter } from "./AvailabilityFilter";

const meta = {
  title: "Discover/AvailabilityFilter",
  component: AvailabilityFilter,
  args: { defaultValue: "all", onValueChange: fn() },
  argTypes: { defaultValue: { control: "inline-radio", options: ["all", "subscription", "rentals"] } },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof AvailabilityFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
export const Subscription: Story = { args: { defaultValue: "subscription" } };
export const Rentals: Story = { args: { defaultValue: "rentals" } };

/** Worst case for the glass surface: floating over a white film cover. */
export const OnBrightCover: Story = {
  args: { defaultValue: "subscription" },
  decorators: [
    (Story) => (
      <div className="bg-white p-6">
        <Story />
      </div>
    ),
  ],
};

/** Mobile dropdown (design "Filter context menu" on the 393 collection screens). */
export const Menu: Story = { args: { variant: "menu" }, parameters: { layout: "padded" } };
export const MenuOpen: Story = {
  args: { variant: "menu", defaultOpen: true },
  decorators: [
    (Story) => (
      <div className="h-44">
        <Story />
      </div>
    ),
  ],
};
