import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { placeholder } from "@/mocks/placeholder";
import { AnnouncementBar } from "./AnnouncementBar";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Marketing/AnnouncementBar",
  component: AnnouncementBar,
  args: {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    action: { label: placeholder.button, href: "/redeem" },
    onClose: fn(),
  },
  decorators: [frame(1440)],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutAction: Story = { args: { action: undefined } };
export const Mobile: Story = { parameters: { frameWidth: 393 }, globals: viewport("mobile") };
export const Dismiss: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Close" }));
    await expect(within(canvasElement).queryByRole("region")).toBeNull();
    await expect(args.onClose).toHaveBeenCalled();
  },
};
