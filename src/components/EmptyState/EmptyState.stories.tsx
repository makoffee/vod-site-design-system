import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bookmark } from "lucide-react";
import { ActionLink } from "../_shared/ActionLink";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Account/EmptyState",
  component: EmptyState,
  args: { message: "You do not have active purchases" },
  decorators: [(Story) => <div className="w-full max-w-[768px]"><Story /></div>],
  parameters: { design: { type: "figma", url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l" } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Panel: Story = {};
export const WithAction: Story = { args: { message: "You do not have an active subscription", action: <ActionLink label="Subscribe" href="/subscribe" /> } };
/** On the page (watchlist). */
export const Plain: Story = { args: { message: "Your watchlist is empty", surface: "plain", icon: <Bookmark strokeWidth={1.5} aria-hidden /> } };
