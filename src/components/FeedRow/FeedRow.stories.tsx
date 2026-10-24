import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilmCard } from "../FilmCard/FilmCard";
import { placeholder, placeholderFilms } from "@/mocks/placeholder";
import { FeedRow } from "./FeedRow";
import { frame } from "../_shared/storyFrames";

const meta = {
  title: "Feeds/FeedRow",
  component: FeedRow,
  args: { title: placeholder.sectionTitle, href: "/channel/section", kind: "tall", children: null },
  argTypes: { kind: { control: "inline-radio", options: ["tall", "wide", "square"] } },
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
  decorators: [frame(1392)],
} satisfies Meta<typeof FeedRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Tall cover feed": 6 cards at 1392px, the 7th peeks in on wider containers. */
export const Tall: Story = {
  render: (args) => (
    <FeedRow {...args}>
      {placeholderFilms.map((f) => (
        <FilmCard key={f.id} title={f.title} href={f.href} badge={f.badge} rentable />
      ))}
    </FeedRow>
  ),
};

/** "Wide cover feed": 4 stills at 1392px. */
export const Wide: Story = {
  args: { kind: "wide" },
  render: (args) => (
    <FeedRow {...args}>
      {placeholderFilms.slice(0, 7).map((f) => (
        <FilmCard key={f.id} aspect="wide" title={f.title} href={f.href} badge={f.badge} rentable />
      ))}
    </FeedRow>
  ),
};

/** Coming-soon row: cards carry their availability date. */
export const ComingSoon: Story = {
  render: (args) => (
    <FeedRow {...args}>
      {placeholderFilms.map((f) => (
        <FilmCard key={f.id} title={f.title} href={f.href} rentable availableFrom={placeholder.date} />
      ))}
    </FeedRow>
  ),
};

/** Loading: skeleton cards in the row's shape (whole cards, no arrows); "Loading…" for screen readers. */
export const Loading: Story = { args: { loading: true } };
/** Loading a wide row whose title isn't known yet. */
export const LoadingWideNoTitle: Story = { args: { loading: true, kind: "wide", title: undefined, href: undefined } };
