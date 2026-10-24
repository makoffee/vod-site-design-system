import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader } from "./SectionHeader";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/SectionHeader",
  component: SectionHeader,
  args: { title: "Section Title", href: "/channel/section" },
  parameters: {
    ...figmaComponent("SectionHeader"),
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Linked feed title; hover reveals "more". */
export const Linked: Story = {};
/** Plain section title (channels page, film page rows). */
export const Plain: Story = { args: { href: undefined } };
