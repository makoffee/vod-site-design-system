import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { plansEn } from "@/content/plans";
import { ProductCard } from "./ProductCard";
import { frame } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  args: { product: plansEn.monthly, onChangeProduct: fn() },
  argTypes: { product: { control: "inline-radio", options: ["monthly", "yearly", "plus"], mapping: plansEn } },
  decorators: [frame(400)],
  parameters: {
    ...figmaComponent("ProductCard"),
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {};
export const Yearly: Story = { args: { product: plansEn.yearly } };
export const Plus: Story = { args: { product: plansEn.plus } };
export const WithoutChangeLink: Story = { args: { onChangeProduct: undefined } };
