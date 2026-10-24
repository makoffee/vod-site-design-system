import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import { fontVariables } from '../src/app/fonts'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans text-white antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Tokens → Screens → components (in the order of the design boards).
    options: {
      storySort: {
        order: ["Tokens", "Screens", "Components", "Account", "Feeds", "Discover", "Film", "Search", "Collections", "Marketing", "*"],
      },
    },
    // Sooner is a dark-only UI; the canvas background comes from globals.css
    backgrounds: { disable: true },
    // Toolbar presets = the widths of the design screens. Components use container queries, so stories
    // (fluid frames, see _shared/storyFrames) respond when you switch viewport.
    viewport: {
      options: {
        mobile: { name: "Mobile · 393", styles: { width: "393px", height: "852px" }, type: "mobile" },
        tablet: { name: "Tablet · 768", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        laptop: { name: "Laptop · 1024", styles: { width: "1024px", height: "768px" }, type: "desktop" },
        desktop: { name: "Desktop · 1440", styles: { width: "1440px", height: "900px" }, type: "desktop" },
        wide: { name: "Wide · 1600", styles: { width: "1600px", height: "1000px" }, type: "desktop" },
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
