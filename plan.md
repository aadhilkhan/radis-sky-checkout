# Implementation Plan — radis-sky-checkout

## Summary

Set up infrastructure and build the design system page for an embeddable BNPL checkout product.

**Design doc:** `docs/plans/2026-02-20-project-setup-design.md`
**Full plan:** `docs/plans/2026-02-20-implementation-plan.md`

---

## This Session: Phase 1 (Infrastructure) + Phase 2 (Design System Page)

### Phase 1: Infrastructure Setup

- [ ] **1.1** Create GitHub repo `radis-sky-checkout`, write README, push code
- [ ] **1.2** Install dependencies: `motion`, `react-router-dom`, `storybook`, `agentation`
- [ ] **1.3** Set up Storybook for Vite + React + Tailwind
- [ ] **1.4** Add Agentation toolbar (dev-only, adapted for Vite)
- [ ] **1.5** Ensure Vercel readiness (SPA routing fallback)

### Phase 2: Design System Page

- [ ] **2.1** Set up React Router with routes: `/`, `/design-system`, `/checkout`
- [ ] **2.2** Build design system page layout with section navigation
- [ ] **2.3** Colors & Typography section (OKLCH swatches, Figtree type scale)
- [ ] **2.4** All 14 component sections (Button, Input, Textarea, Label, Field, Select, Combobox, Card, Badge, AlertDialog, DropdownMenu, Separator, Direction, InputGroup)
- [ ] **2.5** Write Storybook stories for each component

### Phase 5: Housekeeping

- [ ] **5.1** Update CLAUDE.md with final state
- [ ] **5.2** Update README
- [ ] **5.3** Build and run locally to verify everything works

---

## Future Sessions (via Conductor.build)

### Phase 3: Checkout Configurator (`/`)
- Configurator page with merchant, flow, plans, payment methods, rendering mode controls
- Config context + launch CTA

### Phase 4: Checkout Component
- CheckoutProvider, CheckoutShell, CheckoutFlow
- Step components: Login, PlanSelection, PaymentMethod, Success
- Motion transitions, responsive, dark mode
