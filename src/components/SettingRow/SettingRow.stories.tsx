import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { Switch } from "../Switch/Switch";
import { SettingRow } from "./SettingRow";

const meta = {
  title: "Account/SettingRow",
  component: SettingRow,
  args: { title: "Language", description: "Interface language" },
  decorators: [(Story) => <div className="w-full max-w-[768px] rounded-xl border border-white/10 bg-white/5 p-5"><Story /></div>],
  parameters: { design: { type: "figma", url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l" } },
} satisfies Meta<typeof SettingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSelect: Story = { args: { control: <LanguageSelect label="Language" /> } };
export const WithSwitch: Story = {
  args: { title: "Newsletter", description: "Get information on exclusive content and offers.", control: <Switch width="hug" label={<span className="sr-only">Newsletter</span>} /> },
};
export const TitleOnly: Story = { args: { title: "Parental Controls", description: "Inactive" } };
