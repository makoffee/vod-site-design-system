import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilmBadge } from "./FilmBadge";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/FilmBadge",
  component: FilmBadge,
  args: { children: "Badge", tone: "label" },
  argTypes: { tone: { control: "inline-radio", options: ["label", "info"] } },
  parameters: {
    ...figmaComponent("FilmBadge"),
  },
} satisfies Meta<typeof FilmBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Master FilmBadge tone(label): film cards and the promo hero. */
export const Label: Story = {};
/** Master FilmBadge tone(info): the coming-soon date. */
export const Info: Story = { args: { children: "From Date", tone: "info" } };
