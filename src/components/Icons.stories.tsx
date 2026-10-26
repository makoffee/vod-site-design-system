import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType, SVGProps } from "react";
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleX,
  Eye,
  EyeOff,
  FileQuestion,
  LayoutGrid,
  List,
  Menu,
  Minus,
  PartyPopper,
  Play,
  Plus,
  Search,
  Share2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { BinocularIcon } from "./_shared/BinocularMask";
import { SoonerBasket } from "./_shared/icons";

/** Icons: the two Sooner glyphs, and the Lucide icons the components use. Any other icon comes from lucide.dev. */
const meta = {
  title: "Icons",
  // No component to describe; icons are lucide-react plus the two glyphs in src/components/_shared.
  tags: ["!manifest"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

// Name shown = the lucide-react export, which is also the Figma component "Lucide/<kebab-name>".
const used: [string, Icon][] = [
  ["Play", Play],
  ["Plus", Plus],
  ["Minus", Minus],
  ["Share2", Share2],
  ["Bookmark", Bookmark],
  ["Check", Check],
  ["X", X],
  ["CircleX", CircleX],
  ["CircleAlert", CircleAlert],
  ["FileQuestion", FileQuestion],
  ["Search", Search],
  ["Menu", Menu],
  ["ChevronDown", ChevronDown],
  ["ChevronLeft", ChevronLeft],
  ["ChevronRight", ChevronRight],
  ["LayoutGrid", LayoutGrid],
  ["List", List],
  ["Eye", Eye],
  ["EyeOff", EyeOff],
  ["Volume2", Volume2],
  ["VolumeX", VolumeX],
  ["PartyPopper", PartyPopper],
];

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9])/g, "$1-$2").toLowerCase();

function Tile({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex w-36 flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="flex size-10 items-center justify-center text-white">{children}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-white">{label}</span>
        <span className="text-xs text-white/40">{sub}</span>
      </div>
    </div>
  );
}

/** The two Sooner glyphs (not Lucide). The basket marks rentable films; the binocular is the brand mark. */
export const Sooner: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tile label="SoonerBasket" sub="rent">
        <SoonerBasket className="h-7 w-6 text-sooner-primary" />
      </Tile>
      <Tile label="BinocularIcon" sub="brand mark">
        <BinocularIcon className="h-5 w-9 text-sooner-primary" />
      </Tile>
    </div>
  ),
};

/**
 * Lucide icons the components use, by their lucide-react name (Figma: "Lucide/<name>"). Any other icon: search
 * lucide.dev; the same name works in code and in Figma's icon picker.
 */
export const Lucide: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {used.map(([name, Icon]) => (
          <Tile key={name} label={name} sub={kebab(name)}>
            <Icon className="size-6" strokeWidth={2} aria-hidden />
          </Tile>
        ))}
      </div>
      <p className="m-0 text-sm text-white/60">
        All 1,899 icons:{" "}
        <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-sooner-primary-light underline">
          lucide.dev/icons
        </a>
      </p>
    </div>
  ),
};
