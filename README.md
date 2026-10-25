This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Storybook in Figma (Storybook Connect)

The Storybook is published to Chromatic on every push to `main` (`.github/workflows/chromatic.yml`), and the
Storybook Connect plugin in Figma links each Figma component to its live story.

1. Create a Chromatic project from this GitHub repo (chromatic.com, sign in with GitHub) and copy its project token.
2. Add it as the repository secret `CHROMATIC_PROJECT_TOKEN` (GitHub → Settings → Secrets and variables → Actions),
   then push or run the "Publish Storybook to Chromatic" workflow.
3. List the links: `node scripts/storybook-connect-links.mjs <appId>` (the `appId` is in the Chromatic project URL;
   the Storybook dev server must be running for the story index).
4. In Figma, select a component, run Storybook Connect and paste its story URL from the list.
