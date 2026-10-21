import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Feeds/SectionHeader",
  component: SectionHeader,
  args: { title: "Section Title", href: "/channel/section" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Linked feed title; hover reveals "more". */
export const Linked: Story = {};
/** Plain section title (channels page, film page rows). */
export const Plain: Story = { args: { href: undefined } };
