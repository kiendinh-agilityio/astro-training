# REACT ADVANCED PRACTICE

## OVERVIEW

- This document provides the analysis and estimate for the Astro practice

## AUTHOR

- This is the author **[Kien.Dinh](https://gitlab.asoft-python.com/kien.dinh/astro-training/)**

## TIMELINE

- 5 days (Oct 28, 2025 - Nov 4, 2025)

## TECH STACKS

- Astro [^5.13.7]
- React [v19.1.0]
- Typescript
- TailwindCSS

## DEVELOPMENT TOOLS

- Eslint
- Husky
- Prettier

## EDITOR

- Visual Studio Code

## DESIGN

- **[Figma](https://www.figma.com/design/fk2e2XgE4TMg9GhRZsFJCq/Free-Blog-Template--copie-?node-id=1-177&t=7klBufweszmN4yqE-0)**

## TARGETS

- Understand and apply the latest knowledge of Astro to build websites
- Server Actions
- Session
- Middleware – add middleware.ts to guard /checkout when the user is not authenticated.
- SEO – metadata, sitemap, robots
- Performance and Accessibility: check this website with Axe Page Speed or Lighthouse tool.

## PAGE REQUIREMENTS

- Login Page
  - Simple login form (email + password).
  - Upon login, redirect to the homepage.

- Home Page
  - Display list of blog posts (title, description, thumbnail)
  - Redirect to /login if not logged in
  - Each post links to detail page
  - Include Logout button → clear login state → back to /login

- Blog Detail Page
  - Redirect to /login if not logged in
  - Show post title, author, date, content

## HOW TO RUN

| Syntax                                                     | Description                  |
| ---------------------------------------------------------- | ---------------------------- |
| `git@gitlab.asoft-python.com:kien.dinh/astro-training.git` | Clone repository from GitLab |
| `blog-template-page`                                       | Checkout branch              |
| `cd astro-practice/blog-template`                          | Change directory to folder   |
| `pnpm install`                                             | Install dependencies         |
| `pnpm dev`                                                 | Start dev server             |
| `pnpm build `                                              | Build for production         |

## SANITY CMS

- Create a `.env` file containing `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`, `PUBLIC_SANITY_READ_TOKEN`, `SANITY_WEBHOOK_SECRET`.
- Start the Studio with `pnpm studio` (available at http://localhost:3333/studio by default).
- Deploy your Studio to Cloudflare Pages or Sanity Managed Hosting:
  - Cloudflare Pages: use `pnpm studio:build` as the build command and `dist` as the output directory.
  - Sanity hosting: run `pnpm studio:deploy`.

## CLOUDFLARE + SANITY WORKFLOW

1. **Astro site on Cloudflare Pages/Workers**
   - Set all `PUBLIC_SANITY_*` variables and `SANITY_WEBHOOK_SECRET` in the project settings.
   - The Astro server caches Sanity responses in memory per worker isolate for faster navigation.

2. **Sanity Studio on Cloudflare Pages**
   - Create a second Cloudflare Pages project pointing to the same repository.
   - Set the **Root directory** to the repo root (where `sanity.config.ts` lives), build command `pnpm install && pnpm studio:build`, and output directory `dist`.
   - Configure a custom domain or use the default `*.pages.dev` URL for editors.

3. **Webhook-based cache invalidation**
   - In the Astro repo a webhook endpoint is available at `/api/sanity-revalidate`.
   - Set `SANITY_WEBHOOK_SECRET` in both Cloudflare projects (Astro + Studio).
   - Inside Sanity Manage → Project Settings → API → Webhooks create a webhook:
     - URL: `https://<your-astro-domain>/api/sanity-revalidate`
     - HTTP method: `POST`
     - Custom header: `Authorization: Bearer <SANITY_WEBHOOK_SECRET>`
     - Trigger on create/update/delete of `blogPost`.
   - When editors publish inside Studio, Sanity calls the webhook, the server invalidates its in-memory cache, and the next visitor automatically fetches fresh data without redeploying Astro.
