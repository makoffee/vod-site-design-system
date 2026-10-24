import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountNav } from "./AccountNav";

const meta = {
  title: "Account/AccountNav",
  component: AccountNav,
  args: { active: "profile" },
  decorators: [
    (Story) => (
      <div className="@container w-full max-w-[960px]">
        <Story />
      </div>
    ),
  ],
  parameters: { design: { type: "figma", url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l" } },
} satisfies Meta<typeof AccountNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Side list (48rem+ containers). */
export const List: Story = { args: { layout: "list" }, decorators: [(Story) => <div className="w-48"><Story /></div>] };
export const ActiveSettings: Story = { args: { layout: "list", active: "settings" }, decorators: [(Story) => <div className="w-48"><Story /></div>] };
/** Collapsed dropdown (narrow containers). */
export const Menu: Story = { args: { layout: "menu" }, decorators: [(Story) => <div className="w-[345px]"><Story /></div>] };
