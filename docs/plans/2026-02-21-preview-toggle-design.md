# Preview Mode Toggle Design

## Summary

Add a mobile/desktop preview toggle to the configurator header (right-aligned) that controls the preview container width, letting users see how the checkout looks on different devices.

## Behavior

- **Desktop mode** (default): Preview uses natural container width (current behavior).
- **Mobile mode**: Preview container constrains to `375px` centered, with `bg-muted/30` background visible around it. The `containerWidth` prop passed to `CheckoutShell` becomes `375`, triggering the existing `< 448px` mobile layout.
- Toggle only appears on wide viewport (side-by-side mode) — narrow viewport is already mobile-constrained.

## UI

Header layout (wide viewport):

```
┌──────────────────────────────────────────┐
│ Checkout Configurator          [🖥] [📱] │
│ Configure and preview...                 │
└──────────────────────────────────────────┘
```

- Two icon buttons using HugeIcons (`ComputerIcon`, `SmartPhone01Icon`)
- Active mode gets a subtle background highlight (ghost variant with active state)
- Grouped visually as a segmented control

## State

- New `previewMode: "desktop" | "mobile"` state in `ConfiguratorPage`
- When `"mobile"`: preview container gets `max-w-[375px] mx-auto`, passes `375` as `containerWidth`
- When `"desktop"`: current natural container width behavior preserved

## Files Changed

- `src/pages/ConfiguratorPage.tsx` — add state, toggle UI, conditional preview container styling
