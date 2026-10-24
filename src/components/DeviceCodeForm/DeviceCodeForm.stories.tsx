import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { DeviceCodeForm } from "./DeviceCodeForm";

const meta = {
  title: "Account/DeviceCodeForm",
  component: DeviceCodeForm,
  args: { onSubmit: fn() },
  decorators: [(Story) => <div className="w-full max-w-[768px]"><Story /></div>],
  parameters: { design: { type: "figma", url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l" } },
} satisfies Meta<typeof DeviceCodeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Continue enables once a code is entered and submits it uppercased. */
export const Submits: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    const button = c.getByRole("button", { name: "Continue" });
    await expect(button).toBeDisabled();
    await userEvent.type(c.getByRole("textbox"), "ab12cd");
    await userEvent.click(button);
    await expect(args.onSubmit).toHaveBeenCalledWith("AB12CD");
  },
};
