import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LanguageSelect } from "./LanguageSelect";

const meta = {
  title: "Components/LanguageSelect",
  component: LanguageSelect,
  args: { defaultValue: "en", onValueChange: fn() },
  argTypes: { defaultValue: { control: "inline-radio", options: ["en", "de", "fr"] } },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof LanguageSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const English: Story = {};
export const German: Story = { args: { defaultValue: "de" } };
export const French: Story = { args: { defaultValue: "fr" } };
/** The open menu is not drawn in the design; this shows the implementation. */
export const Open: Story = {
  args: { defaultOpen: true },
  decorators: [
    (Story) => (
      <div className="flex h-48 w-64 justify-end">
        <Story />
      </div>
    ),
  ],
};
