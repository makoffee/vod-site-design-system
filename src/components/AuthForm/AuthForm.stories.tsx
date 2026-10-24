import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { plansEn } from "@/content/plans";
import { AuthForm } from "./AuthForm";
import { frame, viewport } from "../_shared/storyFrames";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Components/AuthForm",
  component: AuthForm,
  args: {
    mode: "login",
    onSubmit: fn(),
    onForgotPassword: fn(),
    onSso: fn(),
    onInstitutionLogin: fn(),
    onSwitchMode: fn(),
    onChangeProduct: fn(),
  },
  argTypes: {
    mode: { control: "inline-radio", options: ["login", "signup"] },
  },
  decorators: [frame(400)],
  parameters: {
    ...figmaComponent("AuthForm"),
  },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "login | 1440px" form. Contextual copy: production strings. */
export const Login: Story = {};
/** "signup | 1440px" form. */
export const Signup: Story = { args: { mode: "signup" } };
/** "signup with product card | 1440px": the plan chosen at checkout above the form. */
export const SignupWithProduct: Story = { args: { mode: "signup", product: plansEn.monthly } };
export const Mobile: Story = { args: { mode: "signup", product: plansEn.monthly }, parameters: { frameWidth: 345 }, globals: viewport("mobile") };
