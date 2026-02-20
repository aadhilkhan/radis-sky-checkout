# Radis Sky Checkout

An embeddable BNPL (Buy Now Pay Later) checkout product built with React, similar to Tabby. A white-label checkout widget that merchants can integrate into their platforms.

## Current State

**Phase: Configurator + Live Preview**

- Side-by-side checkout configurator with live preview at `/`
- Resizable divider to test desktop and mobile breakpoints
- Drawer fallback on narrow viewports (<1024px)
- Design system page with all shadcn/ui components showcased
- Storybook for individual component exploration

### Checkout Flow (v1)

1. Login (OTP-based phone authentication)
2. BNPL plan selection (Pay in 4, Pay in 3, Pay later)
3. Payment method selection (Card, Apple Pay, Google Pay)
4. Success confirmation

### Rendering Modes

- **Inline** — live preview inside the configurator (container-responsive)
- **Full-page** — standalone checkout page at `/checkout`
- **Modal** — overlay mode (available for external integration)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4 (OKLCH design tokens, light/dark mode)
- **Components:** shadcn/ui (radix-vega) + Radix UI
- **Animation:** Motion (framer-motion)
- **Icons:** HugeIcons
- **Font:** Figtree (variable)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run Storybook
pnpm storybook

# Build for production
pnpm build

# Lint
pnpm lint
```

## Project Structure

```
src/
  components/ui/   # shadcn/ui component library
  components/      # App-level composed components
  pages/           # Route pages (Configurator, Design System)
  checkout/        # Checkout widget (Provider, Shell, Flow, Steps)
  context/         # React contexts
  lib/             # Utilities (cn helper)
  index.css        # Tailwind + OKLCH theme tokens
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Checkout Configurator — side-by-side layout with live preview |
| `/design-system` | Living component showcase — all UI components with variants and states |
| `/checkout` | Full-page checkout mode |

## Deployment

Deployed on Vercel with automatic PR preview deployments.
