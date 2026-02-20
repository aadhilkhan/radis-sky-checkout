# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs `tsc -b && vite build`)
- **Lint:** `pnpm lint`
- **Preview prod build:** `pnpm preview`
- **Storybook:** `pnpm storybook` (port 6006)
- **Build Storybook:** `pnpm build-storybook`
- **Always use pnpm** instead of npm for package management

## Architecture

Embeddable BNPL (Buy Now Pay Later) checkout product, similar to Tabby. React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + shadcn/ui.

### Product
- Self-contained `<Checkout />` widget with internal step machine (`useReducer`)
- Three rendering modes: `inline` (configurator preview), `fullpage` (standalone page), `modal` (overlay)
- Flow: Login (OTP) → Plan Selection → Payment Method → Success
- Checkout Configurator page at `/` — side-by-side layout with configurator options on the left and live checkout preview on the right. Resizable divider between columns. On narrow viewports (<1024px), configurator collapses into a slide-out drawer.
- Design system page at `/design-system` showing all components

### Key stack choices
- **UI components:** shadcn/ui (radix-vega style) built on Radix UI primitives, with Base UI React for additional headless components
- **Icons:** HugeIcons (`@hugeicons/react` + `@hugeicons/core-free-icons`)
- **Styling:** Tailwind CSS v4 via Vite plugin, class merging with `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- **Component variants:** Class Variance Authority (CVA)
- **Animation:** Motion (framer-motion) for step transitions, modal animations, micro-interactions
- **Routing:** React Router — only for dev pages, checkout manages its own steps internally
- **Font:** Figtree variable font via `@fontsource-variable/figtree`
- **RTL support:** enabled in shadcn config

### Critical constraints
- **Every UI element** must use components from `src/components/ui/` — no one-off styled elements
- **Responsive:** mobile-first, must work on both mobile and desktop
- **CLAUDE.md** must be updated after every key change
- **README** must be updated after every significant commit
- **Prompt log:** Append every user prompt (and any clarifying Q&A) to `docs/prompt.md` at the end of each session or commit

### Path aliases
`@/*` maps to `./src/*` (configured in both vite.config.ts and tsconfig.app.json).

### Project structure
- `src/components/ui/` — shadcn/ui components. All use data-slot attributes and `cn()`. Every new component goes here.
- `src/components/` — app-level composed components
- `src/pages/` — route pages (ConfiguratorPage, DesignSystemPage)
- `src/checkout/` — checkout widget; CheckoutShell supports three modes: `inline` (configurator preview), `fullpage` (standalone page), `modal` (overlay)
- `src/context/` — React contexts (CheckoutConfigContext)
- `src/lib/utils.ts` — `cn()` helper combining clsx and tailwind-merge
- `src/index.css` — Tailwind imports, shadcn theme, OKLCH design tokens (light/dark mode)
- `components.json` — shadcn/ui configuration (stone base color, CSS variables, HugeIcons, RTL)
- `docs/plans/` — design documents and implementation plans

### Routes
- `/` — Checkout Configurator (side-by-side layout with live preview)
- `/design-system` — Living component showcase (all shadcn/ui components)
- `/checkout` — Full-page checkout mode

### Storybook
- Stories live alongside components: `src/components/ui/*.stories.tsx`
- Story files are excluded from the app TypeScript build (`tsconfig.app.json`)
- Import types from `@storybook/react-vite` (NOT `@storybook/react`)
- Storybook preview imports `src/index.css` for Tailwind/theme styles
- CSF3 format with `tags: ["autodocs"]`

### Theme
Design tokens use OKLCH color space defined as CSS custom properties in `src/index.css`. Light and dark modes are both configured with semantic color tokens (primary, secondary, destructive, accent, muted) plus sidebar and chart color sets.

### Deployment
- **GitHub:** https://github.com/aadhilkhan/radis-sky-checkout
- **Vercel:** SPA routing configured via `vercel.json` rewrites
- PR preview deployments enabled via Vercel GitHub integration
- **Agentation:** Dev-only toolbar for visual debugging (`<Agentation />` in App.tsx)
