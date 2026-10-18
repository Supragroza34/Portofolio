# Amey Tripathi — Portfolio

Personal portfolio site built with React, Vite, TypeScript and Tailwind CSS, deployed to
GitHub Pages at [supragroza34.github.io/Portofolio](https://supragroza34.github.io/Portofolio/).

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for the animation that's actually worth it (hero entrance, timeline
  reveal, dashboard bars, modal/toast transitions)
- All animation respects `prefers-reduced-motion`

## Running locally

```bash
npm install
npm run dev       # starts the dev server with HMR
npm run build     # type-checks and builds to dist/
npm run preview   # serves the production build locally
npm run lint      # ESLint (TypeScript, React hooks, jsx-a11y)
npm run format    # Prettier --write
```

## Editing content

Almost everything on the page — name, pitch, experience, projects, skills, education,
awards, certifications, social links — lives in **one file**:

```
src/data/profile.ts
```

Edit the arrays/objects there and the site updates automatically; no component changes
needed. The only exceptions:

- **GitHub repos** (the "Live from GitHub" section): fetched at runtime from the GitHub
  REST API (`/users/Supragroza34/repos`), cached in `localStorage` for one hour, with a
  static fallback (drawn from `profile.ts`'s `projects`) if the API call fails. To change
  which repos are excluded, edit `github.excludeRepos` in `profile.ts`.
- **Frontend Playground demos**: each demo is its own file under
  `src/components/playground/demos/`, lazy-loaded and listed in
  `src/components/playground/PlaygroundNav.tsx`.

## Project structure

```
src/
  data/profile.ts        # single source of truth for all CV content
  components/
    layout/               # header, footer, theme toggle, shared section heading
    hero/                 # hero + animated canvas background
    about/ experience/ projects/ github/ skills/ education/ contact/
    playground/
      PlaygroundShell.tsx  # tab rail + source-link workbench layout
      PlaygroundNav.tsx     # demo metadata (label, description, source file)
      demos/                # the 5 interactive demos, each lazy-loaded
  hooks/                  # useTheme, usePrefersReducedMotion
  lib/github.ts           # GitHub API fetch + cache + repo filtering
```

## Theming & accessibility

- Dark mode respects the OS preference by default (`prefers-color-scheme`); the header
  toggle stores an explicit override in `localStorage`.
- Semantic landmarks (`header`, `main`, `footer`), a skip-to-content link, visible focus
  rings everywhere, and `aria-live` regions for the toast/kanban announcements.
- All imagery is decorative and marked `aria-hidden`, or carries real `aria-label`s on the
  canvas-based demos.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which installs dependencies,
lints, builds, and publishes `dist/` to GitHub Pages via `actions/deploy-pages`.

One-time repo setup (only needed once):

1. In the repo's **Settings → Pages**, set **Source** to "GitHub Actions".
2. Push to `master` — the workflow builds and deploys automatically.

To deploy manually instead: `npm run build && npm run deploy` (uses `gh-pages` to push
`dist/` to the `gh-pages` branch — only needed if you're not using the Actions workflow).
