import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ViewToggle } from "./ViewToggle";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Collections/ViewToggle",
  component: ViewToggle,
  args: { view: "list", onViewChange: fn() },
  argTypes: { view: { control: "inline-radio", options: ["grid", "list"] } },
  parameters: {
    ...figmaComponent("ViewToggle"),
  },
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Showing the list: offers the grid. */
export const OffersGrid: Story = {};
/** Showing the grid: offers the list. */
export const OffersList: Story = { args: { view: "grid" } };
