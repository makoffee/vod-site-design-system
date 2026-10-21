import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { placeholderPromoSlides } from "@/mocks/placeholder";
import { PromoHero } from "./PromoHero";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Discover/PromoHero",
  component: PromoHero,
  args: { slides: placeholderPromoSlides, onAddToList: fn() },
  decorators: [frame(1392)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof PromoHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Design "HeroSection" at 1392px (discover | 1440). */
export const Desktop: Story = {};
/** Below 672px of container width: 3:4 card, icon-only actions (production mobile). */
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
