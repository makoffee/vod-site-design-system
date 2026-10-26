import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { placeholderCollection } from "@/mocks/placeholder";
import { CollectionHeader } from "./CollectionHeader";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Collections/CollectionHeader",
  component: CollectionHeader,
  args: { ...placeholderCollection, view: "list", onViewChange: fn(), onAvailabilityChange: fn() },
  argTypes: { view: { control: "inline-radio", options: ["grid", "list"] } },
  decorators: [frame(1872)],
  parameters: {
    ...figmaComponent("CollectionHeader"),
  },
} satisfies Meta<typeof CollectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** List view: the switch offers the grid. */
export const Default: Story = {};
/** Grid view: the switch offers the list. */
export const GridView: Story = { args: { view: "grid" } };
/** List view with the description expanded. */
export const Expanded: Story = { args: { defaultExpanded: true } };
/** Mobile: dropdown filter, centered expand toggle. */
export const Mobile: Story = { parameters: { frameWidth: 345 }, globals: viewport("mobile") };
