import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/** Visual check that the default.ds tokens resolve through globals.css (production class names). */
const meta = {
  title: "Tokens",
  // No component to describe; the tokens live in globals.css.
  tags: ["!manifest"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// [token in default.ds, production class]
const colors = [
  ["color.sooner.primary", "bg-sooner-primary"],
  ["color.sooner.primary-light", "bg-sooner-primary-light"],
  ["color.sooner.primary-dark", "bg-sooner-primary-dark"],
  ["color.background.canvas", "bg-black"],
  ["color.surface.uni", "bg-surface-uni"],
  ["color.surface.muted", "bg-gray-100"],
  ["color.surface.glass", "bg-white/10"],
  ["color.surface.glass-hover", "bg-white/20"],
  ["color.surface.scrim /50", "bg-black/50"],
  ["color.surface.scrim /75", "bg-black/75"],
  ["color.surface.scrim /80", "bg-black/80"],
  ["color.border.subtle", "bg-white/10"],
  ["color.border.decorative", "bg-border-decorative"],
  ["color.border.control", "bg-gray-500"],
  ["color.text.primary", "bg-white"],
  ["color.text.secondary", "bg-gray-200"],
  ["color.text.muted", "bg-white/60"],
  ["color.text.subtle", "bg-white/40"],
  ["color.text.inverse", "bg-gray-900"],
  ["color.status.success", "bg-green-500"],
  ["color.status.error", "bg-red-500"],
  ["color.status.warning", "bg-yellow-400"],
] as const;

const radii = [
  ["sm · 4", "rounded-sm"],
  ["md · 6", "rounded-md"],
  ["lg · 8", "rounded-lg"],
  ["sooner · 10", "rounded-sooner"],
  ["xl · 12", "rounded-xl"],
  ["2xl · 16", "rounded-2xl"],
  ["3xl · 24", "rounded-3xl"],
  ["full", "rounded-full"],
] as const;

const typeRoles = [
  ["display.hero", "font-display text-display-hero", "Display Headline"],
  ["display.section", "font-display text-display-section", "Section Headline"],
  ["display.section-mobile", "font-display text-display-section-mobile", "Section Headline"],
  ["heading.section", "text-heading-section", "Section Title"],
  ["heading.plan", "text-heading-plan uppercase", "Plan Name"],
  ["button.cta", "text-button-cta uppercase", "Button"],
  ["button.sm", "text-button-sm uppercase", "Button"],
  ["label", "text-label uppercase", "Label"],
  ["nav.tab", "text-nav-tab uppercase", "Nav Tab"],
  ["nav.action", "text-nav-action uppercase", "Nav Action"],
] as const;

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {colors.map(([name, cls]) => (
        <div key={name} className="flex flex-col gap-2">
          {/* Checkerboard behind the swatch so translucent tokens are visible */}
          <div className="h-16 rounded-lg bg-[conic-gradient(#333_25%,#222_0_50%,#333_0_75%,#222_0)] bg-[length:16px_16px]">
            <div className={`size-full rounded-lg border border-white/10 ${cls}`} />
          </div>
          <span className="text-sm text-gray-200">{name}</span>
          <code className="text-xs text-white/60">{cls}</code>
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {radii.map(([name, cls]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className={`size-20 bg-sooner-primary ${cls}`} />
          <span className="text-sm text-gray-200">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {typeRoles.map(([name, cls, sample]) => (
        <div key={name} className="flex flex-col gap-1">
          <span className="text-xs text-white/60">
            typography.{name} · <code>{cls}</code>
          </span>
          <span className={cls}>{sample}</span>
        </div>
      ))}
    </div>
  ),
};
