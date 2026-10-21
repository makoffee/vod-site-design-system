import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { placeholder } from "@/mocks/placeholder";
import { FilmCard } from "./FilmCard";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Feeds/FilmCard",
  component: FilmCard,
  args: { title: placeholder.filmTitle, href: "/film/film-1", aspect: "tall", badge: placeholder.badge, rentable: true },
  argTypes: { aspect: { control: "inline-radio", options: ["tall", "wide"] } },
  decorators: [frame(222)],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof FilmCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Tall cover feed" card on the discover screen (222 × 295 at 1392px). */
export const Tall: Story = {};
/** "Wide cover feed" card (339 × 191). */
export const Wide: Story = { args: { aspect: "wide" }, parameters: { frameWidth: 339 } };
export const RentableOnly: Story = { args: { badge: undefined } };
export const BadgeOnly: Story = { args: { rentable: false } };
/** Coming-soon card: availability date badge. */
export const ComingSoon: Story = { args: { badge: undefined, availableFrom: placeholder.date } };
