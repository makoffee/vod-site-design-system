import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderQuote } from "@/mocks/placeholder";
import { QuoteCard } from "./QuoteCard";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Film/QuoteCard",
  component: QuoteCard,
  args: placeholderQuote,
  decorators: [frame(341)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof QuoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutAuthor: Story = { args: { author: undefined } };
