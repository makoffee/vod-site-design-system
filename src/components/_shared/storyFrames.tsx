import type { Decorator } from "@storybook/nextjs-vite";

// Story-only helpers (not exported from the component barrel).

/**
 * Fluid frame capped at the master's width on the design board. Components fill it, so the Viewport toolbar
 * (Mobile 393 · Tablet 768 · Laptop 1024 · Desktop 1440) shrinks them and their container queries respond.
 */
export function frame(maxWidth: number): Decorator {
  return function Frame(Story, { parameters }) {
    // A story can widen or narrow the component-level frame with parameters.frameWidth.
    return (
      <div style={{ width: "100%", maxWidth: parameters.frameWidth ?? maxWidth }}>
        <Story />
      </div>
    );
  };
}

/** Pins a story to one of the Sooner viewport presets in .storybook/preview.tsx. */
export const viewport = (value: "mobile" | "tablet" | "laptop" | "desktop" | "wide") => ({ viewport: { value, isRotated: false } });
