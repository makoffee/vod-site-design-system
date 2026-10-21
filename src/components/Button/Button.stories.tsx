import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

// One story per variant on the master; ids match design-refs/components-button--*.png.
// The master's focus variants were removed: production has none (keyboard focus = 2px white outline).
const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button", variant: "cta-primary", state: "default", size: "md", onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["cta-primary", "cta-ghost", "cta-white", "cta-text", "cta-light", "cta-round"],
    },
    state: { control: "inline-radio", options: ["default", "hover", "disabled"] },
    size: { control: "inline-radio", options: ["md", "lg", "sm"] },
  },
  decorators: [
    // md/lg default to width="fill": cap them at the master's 401px; sm and round hug their content.
    function ButtonFrame(Story, { args }) {
      return (
        <div className={args.size === "sm" || args.variant === "cta-round" ? "w-fit" : "w-full max-w-[401px]"}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryMdDefault: Story = { args: {} };
export const PrimaryMdHover: Story = { args: { state: "hover" } };
export const PrimaryMdDisabled: Story = { args: { state: "disabled" } };
export const GhostMdDefault: Story = { args: { variant: "cta-ghost" } };
export const GhostMdHover: Story = { args: { variant: "cta-ghost", state: "hover" } };
export const GhostMdDisabled: Story = { args: { variant: "cta-ghost", state: "disabled" } };
export const WhiteMdDefault: Story = { args: { variant: "cta-white" } };
export const WhiteMdHover: Story = { args: { variant: "cta-white", state: "hover" } };
export const WhiteMdDisabled: Story = { args: { variant: "cta-white", state: "disabled" } };
export const PrimaryLgDefault: Story = { args: { size: "lg" } };
export const GhostLgDefault: Story = { args: { size: "lg", variant: "cta-ghost" } };
export const PrimarySmDefault: Story = { args: { size: "sm", children: "Button" } };
export const PrimarySmHover: Story = { args: { size: "sm", state: "hover", children: "Button" } };
export const TextSmDefault: Story = { args: { size: "sm", variant: "cta-text", children: "Button" } };
export const TextSmHover: Story = { args: { size: "sm", variant: "cta-text", state: "hover", children: "Button" } };
export const LightSmDefault: Story = { args: { size: "sm", variant: "cta-light", children: "Button" } };
export const LightSmHover: Story = { args: { size: "sm", variant: "cta-light", state: "hover", children: "Button" } };
export const RoundLgDefault: Story = { args: { size: "lg", variant: "cta-round", children: undefined, "aria-label": "Play" } };
/** width="hug": the button fits its label instead of filling the frame. */
export const PrimaryMdHug: Story = { args: { width: "hug" } };
export const RoundLgHover: Story = {
  args: { size: "lg", variant: "cta-round", state: "hover", children: undefined, "aria-label": "Play" },
};
