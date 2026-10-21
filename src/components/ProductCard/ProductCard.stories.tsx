import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ProductCard } from "./ProductCard";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  args: { product: "monthly", onChangeProduct: fn() },
  argTypes: { product: { control: "inline-radio", options: ["monthly", "yearly", "plus"] } },
  decorators: [frame(400)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {};
export const Yearly: Story = { args: { product: "yearly" } };
export const Plus: Story = { args: { product: "plus" } };
export const WithoutChangeLink: Story = { args: { onChangeProduct: undefined } };
