import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AvailabilityFilter } from "./AvailabilityFilter";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Discover/AvailabilityFilter",
  component: AvailabilityFilter,
  args: { defaultValue: "all", onValueChange: fn() },
  argTypes: {
    defaultValue: { control: "inline-radio", options: ["all", "subscription", "rentals"] },
    surface: { control: "inline-radio", options: ["ghost", "floating"] },
  },
  parameters: {
    ...figmaComponent("AvailabilityFilter"),
  },
} satisfies Meta<typeof AvailabilityFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
export const Subscription: Story = { args: { defaultValue: "subscription" } };
export const Rentals: Story = { args: { defaultValue: "rentals" } };

/** Discover: content scrolls under the filter, so it takes the darker floating glass (worst case: a white cover). */
export const Floating: Story = {
  args: { defaultValue: "subscription", surface: "floating" },
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
