> **Note (2026-02-21):** The Rendering Modes and Checkout Configurator sections below have been superseded. The configurator now uses a side-by-side layout with live preview instead of a launch-and-render model. See [Side-by-Side Preview Design](./2026-02-21-side-by-side-preview-design.md).

# Project Setup & Architecture Design

**Date:** 2026-02-20
**Status:** Approved

## Product

Embeddable BNPL (Buy Now Pay Later) checkout product, similar to Tabby. A white-label checkout widget that merchants can integrate into their platforms.

### Checkout Flow (v1)

1. **Login** — OTP-based phone authentication
2. **Plan Selection** — Choose BNPL split (Pay in 4, Pay in 3, Pay later, etc.)
3. **Payment Method** — Card, Apple Pay, etc.
4. **Success** — Order confirmation

### Future

- Customer onboarding flow (details collection for credit scoring)
- Multiple flow variants and edge cases
- Merchant-customizable branding

## Architecture Decisions

### Self-contained widget (Approach 1)

The checkout is a single `<Checkout />` component with internal step management via `useReducer`. It does not depend on routing. A thin shell wraps it in either modal or full-page mode.

```
<CheckoutProvider config={config}>
  <CheckoutShell mode="modal|fullpage">
    <CheckoutFlow>
      <StepLogin />
      <StepPlanSelection />
      <StepPaymentMethod />
      <StepSuccess />
    </CheckoutFlow>
  </CheckoutShell>
</CheckoutProvider>
```

- **CheckoutProvider** — React context holding merchant config, selected plan, payment state.
- **CheckoutShell** — Modal mode: Motion-animated bottom sheet (mobile) / centered modal (desktop). Full-page mode: centered container.
- **CheckoutFlow** — Step machine with `useReducer`, transitions via Motion `AnimatePresence`.
- **Step components** — Pure presentational, built exclusively from `src/components/ui/`.

### Rendering Modes

- **Modal / bottom sheet** — Overlays the merchant page. Bottom sheet on mobile, centered modal on desktop.
- **Full-page** — Standalone page at `/checkout`.
- Mode is selected in the configurator.

### Routing

React Router with three routes:
- `/` — Checkout Configurator (setup wizard + launch CTA)
- `/design-system` — Living component showcase
- `/checkout` — Full-page checkout mode

### Animation

Motion (formerly framer-motion) for:
- Step transitions (`AnimatePresence` slide/fade)
- Modal open/close (spring animations)
- Micro-interactions (future)

Tailwind transitions for simple hover/focus states.

## Pages

### Checkout Configurator (`/`)

Setup wizard where you configure and launch a checkout:

| Section | Controls |
|---------|----------|
| Merchant | Name, logo, brand color, currency |
| Flow | Which checkout flow to run |
| Plans | Which BNPL split options are available, with amounts |
| Payment Methods | Toggle available methods (card, Apple Pay, etc.) |
| Rendering Mode | Full-page vs. Modal/bottom-sheet |
| Launch | CTA button that opens the configured checkout |

### Design System Page (`/design-system`)

All shadcn/ui components rendered with variants and states:

Button, Input, Textarea, Label, Field, Select, Combobox, Card, Badge, AlertDialog, DropdownMenu, Separator, Direction, plus Colors & Typography sections.

New components are added here as they're built.

## Tech Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (OKLCH tokens, light/dark mode)
- shadcn/ui (radix-vega style) + Radix UI
- Motion (framer-motion) for animations
- React Router for dev pages
- HugeIcons for iconography
- Storybook for component prop exploration

## Infrastructure

- **GitHub:** `radis-sky-checkout` repo
- **Vercel:** Connected for deployments, PR preview deployments enabled
- **Agentation:** Dev-only toolbar for debugging (adapted for Vite)
- **README:** Living document, updated with each significant commit
- **CLAUDE.md:** Updated after every key change for AI agent context

## Constraints

- Every UI element must use `src/components/ui/` components — no one-off styled elements
- Responsive: mobile-first, works on both mobile and desktop
- Pixel-perfect execution
- Clean, modular, reusable codebase
