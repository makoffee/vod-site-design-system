import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Header } from "./Header";
import { frame, viewport } from "../_shared/storyFrames";

const meta = {
  title: "Components/Header",
  component: Header,
  args: {
    auth: "logged-out",
    active: "none",
    onSearch: fn(),
    onLogin: fn(),
    onSignUp: fn(),
    onMenu: fn(),
    onLanguageChange: fn(),
  },
  argTypes: {
    auth: { control: "inline-radio", options: ["logged-out", "logged-in"] },
    active: {
      control: "select",
      options: ["none", "discover", "collections", "genres", "magazine", "watchlist"],
    },
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const desktop: Decorator = frame(1440);
const mobile: Decorator = frame(393);

// One story per master variant; ids match design-refs/components-header--*.png. The frame width picks the layout
// (the master's viewport axis): 1440 renders desktop, 393 mobile.
export const DesktopLoggedOutNone: Story = { decorators: [desktop] };
export const DesktopLoggedOutDiscover: Story = { args: { active: "discover" }, decorators: [desktop] };
export const DesktopLoggedOutCollections: Story = { args: { active: "collections" }, decorators: [desktop] };
export const DesktopLoggedOutGenres: Story = { args: { active: "genres" }, decorators: [desktop] };
export const DesktopLoggedOutMagazine: Story = { args: { active: "magazine" }, decorators: [desktop] };
export const DesktopLoggedOutWatchlist: Story = { args: { active: "watchlist" }, decorators: [desktop] };
export const DesktopLoggedInNone: Story = { args: { auth: "logged-in" }, decorators: [desktop] };
export const DesktopLoggedInDiscover: Story = { args: { auth: "logged-in", active: "discover" }, decorators: [desktop] };
export const DesktopLoggedInCollections: Story = { args: { auth: "logged-in", active: "collections" }, decorators: [desktop] };
export const DesktopLoggedInGenres: Story = { args: { auth: "logged-in", active: "genres" }, decorators: [desktop] };
export const DesktopLoggedInMagazine: Story = { args: { auth: "logged-in", active: "magazine" }, decorators: [desktop] };
export const DesktopLoggedInWatchlist: Story = { args: { auth: "logged-in", active: "watchlist" }, decorators: [desktop] };
export const MobileLoggedOut: Story = { decorators: [mobile], globals: viewport("mobile") };
export const MobileLoggedIn: Story = { args: { auth: "logged-in" }, decorators: [mobile], globals: viewport("mobile") };

/** Instance on "4 Sooner DE Marketing Pages" › Landing Page DE: Watchlist hidden, language DE. */
export const LandingPageDe: Story = { args: { hideWatchlist: true, language: "de" }, decorators: [desktop] };
