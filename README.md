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

## Deploy to GitHub Pages

This repo includes GitHub Actions workflow to build the app and publish the generated static output to the `gh-pages` branch.

1. Create a GitHub repository named `curri-architect`.
2. Add the remote and push the current branch:

```bash
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin git@github.com:<your-username>/curri-architect.git
git push -u origin main
```

3. On GitHub, enable Pages for the repository and set the source to the `gh-pages` branch.
4. After the workflow runs, your site will be available at:

`https://<your-username>.github.io/curri-architect/`

If you prefer HTTPS remote access, replace the remote URL with `https://github.com/<your-username>/curri-architect.git`.
