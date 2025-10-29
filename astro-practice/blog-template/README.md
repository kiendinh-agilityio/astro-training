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
