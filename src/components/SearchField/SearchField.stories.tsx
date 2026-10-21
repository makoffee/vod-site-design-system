import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SearchField } from "./SearchField";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Search/SearchField",
  component: SearchField,
  args: { size: "lg", onValueChange: fn(), onSearch: fn() },
  argTypes: { size: { control: "inline-radio", options: ["lg", "md"] } },
  decorators: [frame(720)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Search overlay field (design "Form"). */
export const Overlay: Story = {};
/** With a query: the clear button appears. */
export const Filled: Story = { args: { defaultValue: "Search term" } };
/** In-nav bar on the results page (design "Search Nav"). */
export const InNav: Story = { args: { size: "md", defaultValue: "Search term" } };
export const Mobile: Story = { args: { size: "md" }, parameters: { frameWidth: 345 }, globals: viewport("mobile") };
