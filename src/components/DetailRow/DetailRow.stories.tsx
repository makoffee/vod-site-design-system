import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextAction } from "../TextAction/TextAction";
import { DetailRow } from "./DetailRow";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Account/DetailRow",
  component: DetailRow,
  args: { label: "Email", value: "name@example.com" },
  decorators: [(Story) => <div className="w-full max-w-[768px] rounded-xl border border-white/10 bg-white/5"><Story /></div>],
  parameters: { ...figmaComponent("DetailRow"), },
} satisfies Meta<typeof DetailRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { label: "Name", value: "User Name", action: <TextAction label="Edit Name">Edit</TextAction> } };
/** No value yet: the placeholder shows in text.subtle. */
export const Empty: Story = { args: { label: "Date of birth", value: undefined, placeholder: "Date of birth", action: <TextAction>Add</TextAction> } };
/** Ids and codes: 12px, break anywhere. */
export const Compact: Story = { args: { label: "Member ID", value: "00000000-0000-0000-0000-000000000000", compact: true } };
