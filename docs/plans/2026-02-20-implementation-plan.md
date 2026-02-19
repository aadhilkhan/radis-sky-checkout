# Implementation Plan

**Date:** 2026-02-20
**Design:** [Project Setup Design](./2026-02-20-project-setup-design.md)

## Phase 1: Infrastructure Setup

### Step 1.1: GitHub repo + README
- Create `radis-sky-checkout` repo on GitHub using `gh repo create`
- Write README with project description, tech stack, setup instructions
- Push current code to remote

### Step 1.2: Install dependencies
- `pnpm add motion react-router-dom`
- `pnpm add -D storybook @storybook/react-vite @storybook/addon-essentials @storybook/react`
- `pnpm add agentation` (adapt for Vite if needed)

### Step 1.3: Storybook setup
- Initialize Storybook with `pnpm storybook init` or manual config
- Configure for Vite + React + Tailwind
- Verify it runs

### Step 1.4: Agentation setup
- Add `<Agentation />` to app root with dev-only guard
- Test if it works in Vite (flag if not)
- Recommend MCP server setup to user

### Step 1.5: Vercel readiness
- Ensure `dist/` output works for Vercel
- Add `vercel.json` if needed for SPA fallback routing
- User connects repo to Vercel manually

## Phase 2: Design System Page

### Step 2.1: React Router setup
- Install and configure `react-router-dom`
- Set up routes: `/`, `/design-system`, `/checkout`
- Move current `ComponentExample` content appropriately

### Step 2.2: Design system page layout
- Create `src/pages/DesignSystemPage.tsx`
- Build page structure with sidebar navigation (jump to sections)
- Use existing `ExampleWrapper` / `Example` components
- Add dark mode toggle

### Step 2.3: Colors & Typography section
- Render all OKLCH token swatches from CSS variables
- Show Figtree type scale at all sizes
- Display CSS class names alongside each sample

### Step 2.4: Component sections
- **Button:** All 6 variants × 4 sizes, with/without icons
- **Input + InputGroup:** Default, focused, disabled, with prefix/suffix
- **Textarea:** Default, disabled
- **Label + Field:** Standalone, with validation states
- **Select:** Default, with groups
- **Combobox:** Searchable, with groups
- **Card:** Multiple compositions
- **Badge:** All variants
- **AlertDialog:** Interactive demo
- **DropdownMenu:** Full demo with checkboxes, radios, sub-menus
- **Separator:** Horizontal, vertical
- **Direction:** RTL/LTR toggle demo

### Step 2.5: Storybook stories
- Write `*.stories.tsx` for each component in `src/components/ui/`
- Configure controls for all props

## Phase 3: Checkout Configurator (`/`)

### Step 3.1: Configurator page layout
- Create `src/pages/ConfiguratorPage.tsx`
- Build form sections: Merchant, Flow, Plans, Payment Methods, Rendering Mode
- All form controls use `src/components/ui/` components

### Step 3.2: Config context
- Create `src/context/CheckoutConfigContext.tsx`
- Define TypeScript types for checkout configuration
- Wire configurator form to context

### Step 3.3: Launch CTA
- Button that reads config and launches checkout in selected mode
- Modal mode: opens overlay on configurator page
- Full-page mode: navigates to `/checkout` with config

## Phase 4: Checkout Component

### Step 4.1: CheckoutProvider + types
- Create `src/checkout/CheckoutProvider.tsx`
- Define step types, config types, state shape

### Step 4.2: CheckoutShell
- Create `src/checkout/CheckoutShell.tsx`
- Modal mode: Motion-animated bottom sheet (mobile) / modal (desktop)
- Full-page mode: centered container
- Responsive breakpoint handling

### Step 4.3: CheckoutFlow + step machine
- Create `src/checkout/CheckoutFlow.tsx`
- `useReducer` for step management (next, back, go-to)
- `AnimatePresence` for step transitions

### Step 4.4: Step components (skeleton)
- `src/checkout/steps/StepLogin.tsx` — OTP input UI
- `src/checkout/steps/StepPlanSelection.tsx` — BNPL plan cards
- `src/checkout/steps/StepPaymentMethod.tsx` — Method selector
- `src/checkout/steps/StepSuccess.tsx` — Confirmation

### Step 4.5: Polish
- Motion transitions between steps
- Responsive testing (mobile + desktop)
- Dark mode support
- Accessibility review

## Phase 5: CLAUDE.md + README updates
- Update CLAUDE.md with new architecture, routes, file structure
- Update README with current project state

---

## Execution Order

Phases 1 → 2 → 3 → 4 → 5 (sequential, each builds on the previous).

Within Phase 1, steps 1.1-1.5 can be partially parallelized.
Within Phase 2, step 2.1 must come first, then 2.2-2.5 can be parallelized.
Phase 3 and 4 are sequential (configurator feeds into checkout).

## What We Build First

**This session:** Phase 1 (infrastructure) + Phase 2 (design system page).
**Next sessions:** Phase 3 (configurator) + Phase 4 (checkout) — driven by Conductor.build.
