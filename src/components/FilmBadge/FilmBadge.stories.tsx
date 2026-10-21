import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilmBadge } from "./FilmBadge";

const meta = {
  title: "Feeds/FilmBadge",
  component: FilmBadge,
  args: { children: "Badge", tone: "label" },
  argTypes: { tone: { control: "inline-radio", options: ["label", "info"] } },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof FilmBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Master FilmBadge tone(label): film cards and the promo hero. */
export const Label: Story = {};
/** Master FilmBadge tone(info): the coming-soon date. */
export const Info: Story = { args: { children: "From Date", tone: "info" } };
