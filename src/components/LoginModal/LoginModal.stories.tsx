import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { plansEn } from "@/content/plans";
import { LoginModal } from "./LoginModal";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Components/LoginModal",
  component: LoginModal,
  args: {
    type: "login",
    state: "default",
    onClose: fn(),
    onSubmit: fn(),
    onForgotPassword: fn(),
    onSso: fn(),
    onInstitutionLogin: fn(),
    onRegister: fn(),
  },
  argTypes: {
    type: { control: false },
    state: { control: "inline-radio", options: ["default", "focus", "disabled"] },
  },
  decorators: [frame(400)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Focus: Story = { args: { state: "focus" } };
export const Disabled: Story = { args: { state: "disabled" } };

/** LoginModal.SelectedProduct, visible=on (the master shows the monthly product at 352px). */
export const SelectedProduct: Story = {
  decorators: [frame(352)],
  render: () => <LoginModal.SelectedProduct visible product={plansEn.monthly} onChangeProduct={fn()} />,
};

export const Checkout: Story = {
  args: { selectedProduct: { product: plansEn.yearly, onChangeProduct: fn() } },
};

export const AsOverlay: Story = {
  args: { overlay: true },
  decorators: [
    (Story) => (
      <div className="h-[900px]">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "fullscreen" },
};
