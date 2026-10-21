import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialIcons, socialGlyphs, type SocialPlatform } from "./SocialIcons";

const platforms = Object.keys(socialGlyphs) as SocialPlatform[];

const meta = {
  title: "Components/SocialIcons",
  component: SocialIcons,
  args: { platform: "Instagram", color: "negative", size: 48 },
  argTypes: {
    platform: { control: "select", options: platforms },
    color: { control: "inline-radio", options: ["negative", "original"] },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bl-mvauqmo6-kg62ml22147e174l",
    },
  },
} satisfies Meta<typeof SocialIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

// The four footer platforms, exported from the master, in both colors.
export const InstagramNegative: Story = {};
export const YoutubeNegative: Story = { args: { platform: "YouTube" } };
export const SpotifyNegative: Story = { args: { platform: "Spotify" } };
export const FacebookNegative: Story = { args: { platform: "Facebook" } };
export const InstagramOriginal: Story = { args: { color: "original" } };
export const YoutubeOriginal: Story = { args: { platform: "YouTube", color: "original" } };
export const SpotifyOriginal: Story = { args: { platform: "Spotify", color: "original" } };
export const FacebookOriginal: Story = { args: { platform: "Facebook", color: "original" } };

export const AllPlatforms: Story = {
  render: (args) => (
    <div className="grid w-fit grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-3">
      {platforms.map((p) => (
        <div key={p} className="contents">
          <span className="text-sm text-white/60">{p}</span>
          <SocialIcons {...args} platform={p} color="negative" size={32} />
          <SocialIcons {...args} platform={p} color="original" size={32} />
        </div>
      ))}
    </div>
  ),
};
