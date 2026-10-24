import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderQuote } from "@/mocks/placeholder";
import { QuoteCard } from "./QuoteCard";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Film/QuoteCard",
  component: QuoteCard,
  args: placeholderQuote,
  decorators: [frame(341)],
  parameters: {
    ...figmaComponent("QuoteCard"),
  },
} satisfies Meta<typeof QuoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutAuthor: Story = { args: { author: undefined } };
