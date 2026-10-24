import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { placeholder } from "@/mocks/placeholder";
import { FilmHoverCard } from "./FilmHoverCard";
import { figmaComponent } from "../_shared/figma";

const meta = {
  title: "Feeds/FilmHoverCard",
  component: FilmHoverCard,
  args: {
    title: placeholder.filmTitle,
    href: "/film/example",
    director: placeholder.director,
    meta: ["Genre", "90 min", "2024"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    subscribeLabel: "Subscribe",
    rentLabel: "Rent",
    onSubscribe: fn(),
    onRent: fn(),
    onAddToWatchlist: fn(),
  },
  parameters: {
    ...figmaComponent("FilmHoverCard"),
  },
} satisfies Meta<typeof FilmHoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SubscriptionOnly: Story = { args: { rentLabel: undefined } };
export const RentOnly: Story = { args: { subscribeLabel: undefined } };
