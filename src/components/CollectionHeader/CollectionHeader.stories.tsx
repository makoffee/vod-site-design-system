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
  decorators: [frame(1152)],
  parameters: {
    ...figmaComponent("CollectionHeader"),
  },
} satisfies Meta<typeof CollectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "collection view | list | 1440": the switch offers the grid. */
export const Default: Story = {};
/** "collection view new | Grid | 1440": the switch offers the list. */
export const GridView: Story = { args: { view: "grid" } };
/** "collection view | list | expanded text | 1440". */
export const Expanded: Story = { args: { defaultExpanded: true } };
/** "collection view | 393px": dropdown filter, centered expand toggle. */
export const Mobile: Story = { parameters: { frameWidth: 345 }, globals: viewport("mobile") };
