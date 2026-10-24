import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { frame, viewport } from "../_shared/storyFrames";

// Contextual component: keeps the production plan copy (no placeholder text).
const meta = {
  title: "Marketing/SubscriptionPlans",
  component: SubscriptionPlans,
  args: {
    images: {
      monthly: "/images/placeholder/seventh-seal.webp",
      yearly: "/images/placeholder/seventh-seal.webp",
      plus: "/images/placeholder/seventh-seal.webp",
    },
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["landing", "subscribe"] },
  },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SubscriptionPlans>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Onboarding page (sooner.de/subscribe): page title, price after the features, legal copy. */
export const Subscribe: Story = { args: { layout: "subscribe" } };
/** Two columns with the third card spanning (768–1023px). */
export const Tablet: Story = { parameters: { frameWidth: 768 }, globals: viewport("tablet") };
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
