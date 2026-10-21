import tailwindcss from '@tailwindcss/vite';

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
    '@storybook/addon-designs'
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  // Next.js compiles Tailwind via its Turbopack loader, so Storybook's Vite build needs the plugin too
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  }
};
export default config;
