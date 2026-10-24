import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailRow } from "../DetailRow/DetailRow";
import { SettingRow } from "../SettingRow/SettingRow";
import { TextAction } from "../TextAction/TextAction";
import { AccountPageTitle, AccountPanel } from "./AccountPanel";

const meta = {
  title: "Account/AccountPanel",
  component: AccountPanel,
  args: { children: null },
  decorators: [(Story) => <div className="w-full max-w-[768px]"><Story /></div>],
  parameters: { design: { type: "figma", url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l" } },
} satisfies Meta<typeof AccountPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** rows: profile details with hairline dividers. */
export const Rows: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <AccountPageTitle>Profile</AccountPageTitle>
      <AccountPanel variant="rows">
        <DetailRow label="Email" value="name@example.com" />
        <DetailRow label="Name" value="Jane Doe" action={<TextAction>Edit</TextAction>} />
        <DetailRow label="Date of birth" placeholder="Date of birth" action={<TextAction>Add</TextAction>} />
      </AccountPanel>
    </div>
  ),
};
/** padded: settings rows in one block. */
export const Padded: Story = {
  render: () => (
    <AccountPanel>
      <SettingRow title="Parental Controls" description="Inactive" />
      <SettingRow divided title="No PIN set" control={<TextAction size="sm">Set my PIN</TextAction>} />
    </AccountPanel>
  ),
};
