import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { placeholderFaq } from "@/mocks/placeholder";
import { Faq } from "./Faq";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Marketing/Faq",
  component: Faq,
  args: { ...placeholderFaq, side: "left" },
  argTypes: { side: { control: "inline-radio", options: ["left", "right"] } },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    ...figmaComponent("Faq"),
  },
} satisfies Meta<typeof Faq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FirstOpen: Story = { args: { defaultOpen: [0] } };
export const ImageRight: Story = { args: { side: "right" } };
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };

/** A question toggles its answer region. */
export const Toggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [first] = canvas.getAllByRole("button", { name: "Question" });
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(first);
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getAllByRole("region")[0]).toBeVisible();
  },
};
