import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholderBanner } from "@/mocks/placeholder";
import { SoonerBasket } from "../_shared/icons";
import { ImageCtaBanner } from "./ImageCtaBanner";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Marketing/ImageCtaBanner",
  component: ImageCtaBanner,
  args: {
    layout: "contained",
    align: "center",
    title: placeholderBanner.title,
    description: placeholderBanner.subtitle,
    actions: placeholderBanner.actions.map((a, i) => ({ ...a, tone: i === 0 ? "white" : "primary" })),
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["full", "contained"] },
    align: { control: "inline-radio", options: ["left", "center", "right"] },
  },
  decorators: [frame(1280)],
  parameters: {
    layout: "padded",
    ...figmaComponent("ImageCtaBanner"),
  },
} satisfies Meta<typeof ImageCtaBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Closing banner (production image_cta_banner). */
export const ContainedCenter: Story = {};
export const ContainedLeft: Story = { args: { align: "left" } };
export const ContainedRight: Story = { args: { align: "right" } };

const hero = {
  layout: "full" as const,
  eyebrow: placeholderBanner.eyebrow,
  title: placeholderBanner.title,
  subtitle: placeholderBanner.subtitle,
  description: placeholderBanner.description,
  actions: [
    { label: "Rent", href: "/film/example", tone: "primary" as const, icon: <SoonerBasket className="h-[18px] w-4" /> },
    { label: "Trailer", href: "/film/example", tone: "white" as const },
  ],
};

/** Landing hero: full-bleed, copy on the left. */
export const FullLeft: Story = { args: { ...hero, align: "left" }, parameters: { layout: "fullscreen", frameWidth: 1440 } };
export const FullCenter: Story = { args: { ...hero, align: "center" }, parameters: { layout: "fullscreen", frameWidth: 1440 } };
export const FullRight: Story = { args: { ...hero, align: "right" }, parameters: { layout: "fullscreen", frameWidth: 1440 } };
export const FullMobile: Story = {
  args: { ...hero, align: "left" },
  parameters: { layout: "fullscreen", frameWidth: 393 },
  globals: viewport("mobile"),
};
