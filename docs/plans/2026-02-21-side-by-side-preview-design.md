# Side-by-Side Configurator + Live Preview

**Date:** 2026-02-21
**Status:** Approved
**Supersedes:** Configurator sections in [Project Setup Design](./2026-02-20-project-setup-design.md)

## Summary

Replace the current configurator-then-launch flow with a side-by-side layout: configurator options on the left, live checkout preview on the right. The preview column is resizable via a drag handle so the user can test desktop and mobile breakpoints in real time.

## Layout

### Wide viewport (>=1024px) — Side-by-side

```
┌──────────────────────┬──┬─────────────────────────┐
│   Configurator       │▐▐│     Live Preview         │
│   (left column)      │▐▐│     (right column)       │
│                      │▐▐│                           │
│  - Merchant Settings │▐▐│  ┌───────────────────┐   │
│  - Order Settings    │▐▐│  │   CheckoutShell   │   │
│  - Checkout Flow     │▐▐│  │   mode="inline"   │   │
│  - BNPL Plans        │▐▐│  │                   │   │
│  - Payment Methods   │▐▐│  └───────────────────┘   │
│                      │▐▐│                           │
└──────────────────────┴──┴─────────────────────────┘
                        ▲
                   drag handle
```

- Left column: fixed width, scrollable independently, **max 1/3 of viewport width**
- Right column: fills remaining space, checkout preview centered within it
- Drag handle between columns resizes the configurator width (min `280px`, max `33.3vw`)

### Narrow viewport (<1024px) — Drawer overlay

```
┌─────────────────────────────┐
│  [≡]   Live Preview         │
│        (full width)         │
│                             │
│  ┌───────────────────┐      │
│  │  CheckoutShell    │      │
│  │  mode="inline"    │      │
│  └───────────────────┘      │
│                             │
└─────────────────────────────┘
```

- Preview takes full width
- Floating toggle button (top-left) opens configurator as a left drawer
- Drawer slides in from left via Motion animation (width: min(`320px`, `85vw`))
- Semi-transparent backdrop behind drawer (click to dismiss)
- Close button in drawer header
- If viewport widens past 1024px while drawer is open, snaps back to side-by-side

## Checkout Preview Behavior

The checkout renders in a new `mode="inline"` — no fixed positioning, no modal backdrop, no close button. Just the checkout card rendered directly in the preview container.

**Desktop breakpoint (container >=448px):**
- Full-page experience — card at `max-w-md`, centered, with background surface behind it

**Mobile breakpoint (container <448px):**
- Card fills entire container, no surrounding background — true mobile full-screen experience

A `ResizeObserver` on the preview container detects width changes and passes the breakpoint to CheckoutShell.

## Resize Handle

- Vertical divider (4-6px wide) between the two columns
- Cursor changes to `col-resize` on hover
- `mousedown` starts tracking, `mousemove` updates configurator width, `mouseup` stops
- Configurator width clamped: min `280px`, max `33.3vw`
- No new dependencies — implemented with native mouse events (~50 lines)

## What Changes

### New
- `ConfiguratorPage` rewritten as two-column layout with resize logic and drawer fallback
- `CheckoutShell` gains `mode="inline"` — renders card directly, responsive to container width

### Modified
- `CheckoutConfigContext` — `renderMode` state removed (no longer needed)

### Removed from Configurator
- Rendering Mode selector (Full Page / Modal toggle)
- "Launch Checkout" button (preview is always live)

### Unchanged
- All checkout steps (Login, PlanSelection, PaymentMethod, Success)
- `/checkout` route (still available for direct fullpage access)
- `/design-system` route
- Modal rendering mode in CheckoutShell (kept for potential external use)

## Technical Approach

**CSS resize + container observation (no new dependencies):**
- Manual drag handle with native mouse events
- `ResizeObserver` on preview container to detect breakpoint
- Motion (framer-motion) for drawer slide animation (already in project)
- All styling via Tailwind + `cn()` utility

## Constraints

- Every UI element uses `src/components/ui/` components
- Mobile-first, responsive
- Smooth Motion animations for drawer transitions
- Configurator column never exceeds 1/3 of viewport width
