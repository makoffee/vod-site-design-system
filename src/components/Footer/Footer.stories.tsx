import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Components/Footer",
  component: Footer,
  args: { locale: "en" },
  argTypes: {
    locale: { control: "inline-radio", options: ["en", "de"] },
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const desktop: Decorator = frame(1440);
const mobile: Decorator = frame(393);

export const Desktop: Story = { decorators: [desktop] };
// The frame width picks the layout (the master's viewport axis).
export const Mobile: Story = { decorators: [mobile], globals: viewport("mobile") };

/** Instance override on "3 BE Review page". */
export const BeReviewTagline: Story = { args: { tagline: "Stream Different" }, decorators: [desktop] };

/** Instance override on "4 Sooner DE Marketing Pages". */
export const MarketingCopyright: Story = {
  args: { copyright: "© 2026 ContentScope GmbH • Adlershof-Berlin, Germany" },
  decorators: [desktop],
};
