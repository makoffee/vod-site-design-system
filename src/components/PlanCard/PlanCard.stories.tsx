import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { PlanCard } from "./PlanCard";
import { frame } from "../_shared/storyFrames";

// Story-only placeholder still (The Seventh Seal); the design screens keep their own artwork.
const placeholderStill = "/images/placeholder/seventh-seal.webp";

const meta = {
  title: "Components/PlanCard",
  component: PlanCard,
  args: { plan: "monthly", onSelect: fn(), imageSrc: placeholderStill, imageAlt: "" },
  argTypes: {
    plan: { control: "inline-radio", options: ["monthly", "yearly", "plus"] },
    pricePosition: { control: "inline-radio", options: ["top", "bottom"] },
  },
  decorators: [frame(384)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {};
export const Yearly: Story = { args: { plan: "yearly" } };
export const Plus: Story = { args: { plan: "plus" } };
/** Subscribe page: price after the features. */
export const PriceBottom: Story = { args: { plan: "yearly", pricePosition: "bottom" } };

/** Cards fill their grid cell; the grid goes to three columns at 896px of container width (@4xl). Switch the viewport to see it stack. */
export const AllPlans: Story = {
  parameters: { frameWidth: 1200 },
  render: (args) => (
    <div className="@container">
      <div className="grid gap-6 @4xl:grid-cols-3">
        <PlanCard {...args} plan="monthly" />
        <PlanCard {...args} plan="yearly" />
        <PlanCard {...args} plan="plus" />
      </div>
    </div>
  ),
};
