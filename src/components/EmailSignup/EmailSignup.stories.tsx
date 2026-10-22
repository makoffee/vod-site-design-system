import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { placeholder } from "@/mocks/placeholder";
import { EmailSignup } from "./EmailSignup";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Marketing/EmailSignup",
  component: EmailSignup,
  args: {
    title: placeholder.headline,
    description: "Lorem ipsum dolor sit amet.\nConsectetur adipiscing elit.",
    submitLabel: placeholder.button,
    onSubmit: fn(),
  },
  decorators: [frame(1280)],
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof EmailSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Stacks under 768px of container width. */
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
export const Submit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("E-Mail"), "cinema@example.com");
    await userEvent.click(canvas.getByRole("button", { name: placeholder.button }));
    await expect(args.onSubmit).toHaveBeenCalledWith("cinema@example.com");
  },
};
