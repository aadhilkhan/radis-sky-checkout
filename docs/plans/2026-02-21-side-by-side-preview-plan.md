# Side-by-Side Configurator + Live Preview — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the configurator-then-launch flow with a side-by-side layout where the configurator sits on the left and a live checkout preview on the right, with a resizable divider and a drawer fallback on narrow viewports.

**Architecture:** The `ConfiguratorPage` becomes a two-column flex layout. A custom drag handle resizes the configurator column (clamped 280px–33.3vw). `CheckoutShell` gains `mode="inline"` for rendering the checkout card directly without fixed positioning. A `ResizeObserver` on the preview container detects width and toggles between desktop (card with background) and mobile (full-width) rendering. Below 1024px viewport, the configurator collapses into a Motion-animated left drawer.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Motion (framer-motion), existing shadcn/ui components, `ResizeObserver` API.

---

## Task 1: Remove `renderMode` from CheckoutConfigContext

**Files:**
- Modify: `src/context/CheckoutConfigContext.tsx`

**Step 1: Remove renderMode from types and state**

Remove `renderMode` from the `CheckoutConfig` interface, the `defaultConfig`, the context value interface, and the `setRenderMode` function.

```tsx
// In CheckoutConfig interface, REMOVE this line:
renderMode: "modal" | "fullpage"

// In defaultConfig, REMOVE this line:
renderMode: "fullpage",

// In CheckoutConfigContextValue interface, REMOVE this line:
setRenderMode: (mode: "modal" | "fullpage") => void

// REMOVE the entire setRenderMode function:
const setRenderMode = (mode: "modal" | "fullpage") => {
  setConfig((prev) => ({ ...prev, renderMode: mode }))
}

// In the Provider value prop, REMOVE setRenderMode from the object
```

**Step 2: Verify the build compiles (will fail — dependent files still reference it)**

Run: `pnpm build 2>&1 | head -30`
Expected: TypeScript errors in `ConfiguratorPage.tsx` referencing `renderMode` and `setRenderMode`

**Step 3: Commit**

```bash
git add src/context/CheckoutConfigContext.tsx
git commit -m "refactor: remove renderMode from checkout config context"
```

---

## Task 2: Add `mode="inline"` to CheckoutShell

**Files:**
- Modify: `src/checkout/CheckoutShell.tsx`

**Step 1: Update the mode type and add inline rendering**

Change the `mode` prop type from `"modal" | "fullpage"` to `"modal" | "fullpage" | "inline"`. Add a new `containerWidth` prop (optional, used only for inline mode). Add the inline rendering branch before the fullpage branch.

```tsx
interface CheckoutShellProps {
  mode: "modal" | "fullpage" | "inline"
  onClose?: () => void
  children: ReactNode
  containerWidth?: number
}

export function CheckoutShell({ mode, onClose, children, containerWidth }: CheckoutShellProps) {
  const { config } = useCheckout()

  if (mode === "inline") {
    const isMobile = containerWidth !== undefined && containerWidth < 448

    if (isMobile) {
      // Mobile: card fills entire container, no background
      return (
        <div className="bg-card flex h-full w-full flex-col overflow-hidden">
          <ShellHeader merchant={config.merchant} />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      )
    }

    // Desktop: full-page experience — card at max-w-md centered with background
    return (
      <div className="flex h-full w-full items-start justify-center bg-muted/30 p-8">
        <div className="bg-card ring-foreground/10 w-full max-w-md overflow-hidden rounded-2xl shadow-lg ring-1">
          <ShellHeader merchant={config.merchant} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }

  if (mode === "fullpage") {
    // ... existing fullpage code unchanged
  }

  // ... existing modal code unchanged
}
```

Note: In inline mode, `ShellHeader` is called without `onClose` — no close button.

**Step 2: Verify build compiles**

Run: `pnpm build 2>&1 | head -30`
Expected: Still errors from ConfiguratorPage (renderMode references), but no errors in CheckoutShell itself.

**Step 3: Commit**

```bash
git add src/checkout/CheckoutShell.tsx
git commit -m "feat: add inline mode to CheckoutShell with container-responsive layout"
```

---

## Task 3: Rewrite ConfiguratorPage — side-by-side layout

This is the largest task. It replaces the entire ConfiguratorPage with the new two-column layout.

**Files:**
- Modify: `src/pages/ConfiguratorPage.tsx`

**Step 1: Rewrite ConfiguratorPage**

The new component structure:

```tsx
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useCheckoutConfig, ALL_PLANS, type PaymentMethodType, type Currency } from "@/context/CheckoutConfigContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "@/components/ui/field"
import { CheckoutProvider } from "@/checkout/CheckoutProvider"
import { CheckoutShell } from "@/checkout/CheckoutShell"
import { CheckoutFlow } from "@/checkout/CheckoutFlow"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons"

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "SAR", label: "SAR - Saudi Riyal" },
  { value: "KWD", label: "KWD - Kuwaiti Dinar" },
  { value: "BHD", label: "BHD - Bahraini Dinar" },
  { value: "QAR", label: "QAR - Qatari Riyal" },
  { value: "OMR", label: "OMR - Omani Rial" },
  { value: "USD", label: "USD - US Dollar" },
]

const PAYMENT_METHODS: { value: PaymentMethodType; label: string }[] = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "google_pay", label: "Google Pay" },
]

const MIN_SIDEBAR_WIDTH = 280
const SIDE_BY_SIDE_BREAKPOINT = 1024

export function ConfiguratorPage() {
  const { config, updateMerchant, togglePlan, setPaymentMethods, setOrderAmount } = useCheckoutConfig()
  const [logoInputMode, setLogoInputMode] = useState<"url" | "upload">("url")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Layout state
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth >= SIDE_BY_SIDE_BREAKPOINT)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [previewContainerWidth, setPreviewContainerWidth] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // Max sidebar width is 1/3 of viewport
  const maxSidebarWidth = Math.floor(window.innerWidth / 3)

  // Track viewport width
  useEffect(() => {
    const onResize = () => {
      const wide = window.innerWidth >= SIDE_BY_SIDE_BREAKPOINT
      setIsWideViewport(wide)
      if (wide) setIsDrawerOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // ResizeObserver on preview container
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPreviewContainerWidth(entry.contentRect.width)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Drag handle logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const newWidth = Math.min(Math.max(e.clientX, MIN_SIDEBAR_WIDTH), Math.floor(window.innerWidth / 3))
      setSidebarWidth(newWidth)
    }

    const onMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }, [])

  const togglePaymentMethod = (method: PaymentMethodType) => {
    const current = config.paymentMethods
    if (current.includes(method)) {
      if (current.length > 1) {
        setPaymentMethods(current.filter((m) => m !== method))
      }
    } else {
      setPaymentMethods([...current, method])
    }
  }

  // --- Configurator content (reused in both sidebar and drawer) ---
  const configuratorContent = (
    <div className="flex flex-col gap-6">
      {/* All the existing Card sections: Merchant, Order, Checkout Flow, BNPL Plans, Payment Methods */}
      {/* Exactly the same JSX as current ConfiguratorPage cards */}
      {/* REMOVE: Rendering Mode card */}
      {/* REMOVE: Launch Checkout button */}
    </div>
  )

  // --- Wide viewport: side-by-side ---
  if (isWideViewport) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Left: Configurator sidebar */}
        <div
          className="flex-shrink-0 overflow-y-auto border-r bg-background"
          style={{ width: sidebarWidth }}
        >
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-lg font-semibold tracking-tight">Checkout Configurator</h1>
              <p className="text-muted-foreground mt-1 text-xs">
                Configure and preview the BNPL checkout experience.
              </p>
            </div>
            {configuratorContent}
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="flex-shrink-0 w-1.5 cursor-col-resize bg-border hover:bg-primary/30 transition-colors active:bg-primary/50"
          onMouseDown={handleMouseDown}
        />

        {/* Right: Live preview */}
        <div ref={previewRef} className="flex-1 overflow-y-auto">
          <CheckoutProvider config={config}>
            <CheckoutShell mode="inline" containerWidth={previewContainerWidth}>
              <CheckoutFlow />
            </CheckoutShell>
          </CheckoutProvider>
        </div>
      </div>
    )
  }

  // --- Narrow viewport: drawer overlay ---
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Toggle button */}
      <Button
        variant="outline"
        size="icon-sm"
        className="fixed top-4 left-4 z-40 shadow-md"
        onClick={() => setIsDrawerOpen(true)}
      >
        <HugeiconsIcon icon={Menu01Icon} size={18} />
      </Button>

      {/* Full-width preview */}
      <div ref={previewRef} className="h-full overflow-y-auto">
        <CheckoutProvider config={config}>
          <CheckoutShell mode="inline" containerWidth={previewContainerWidth}>
            <CheckoutFlow />
          </CheckoutShell>
        </CheckoutProvider>
      </div>

      {/* Drawer overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-background shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-lg font-semibold tracking-tight">Configurator</h1>
                  <Button variant="ghost" size="icon-sm" onClick={() => setIsDrawerOpen(false)}>
                    <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  </Button>
                </div>
                {configuratorContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
```

The `configuratorContent` variable contains the exact same card sections as the current page (Merchant, Order, Checkout Flow, BNPL Plans, Payment Methods) **minus** the Rendering Mode card and the Launch Checkout button.

**Step 2: Verify build compiles**

Run: `pnpm build 2>&1 | head -10`
Expected: Clean build (0 errors)

**Step 3: Verify dev server renders correctly**

Run: `pnpm dev`
- Open `http://localhost:5173/`
- Verify side-by-side layout with configurator on left, live checkout on right
- Verify drag handle resizes the configurator
- Resize browser below 1024px — verify drawer mode works

**Step 4: Commit**

```bash
git add src/pages/ConfiguratorPage.tsx
git commit -m "feat: rewrite configurator as side-by-side layout with live preview"
```

---

## Task 4: Update CLAUDE.md, design docs, and prompt log

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/plans/2026-02-20-project-setup-design.md`
- Modify: `docs/prompt.md`

**Step 1: Update CLAUDE.md**

In the `### Product` section, update the description of the configurator:

```markdown
- Checkout Configurator page at `/` — side-by-side layout with configurator options on the left and live checkout preview on the right. Resizable divider between columns. On narrow viewports (<1024px), configurator collapses into a slide-out drawer.
```

Remove any mention of "modal/bottom-sheet overlay OR full-page standalone" as the dual rendering mode choice from the configurator. Keep the modal mode mention in CheckoutShell since it still exists for external use.

In the `### Key stack choices` section, no changes needed.

In the `### Project structure` section, add note about inline mode:
```markdown
- `src/checkout/` — checkout widget; CheckoutShell supports three modes: `inline` (for configurator preview), `fullpage` (standalone page), `modal` (overlay)
```

**Step 2: Update the original design doc**

Add a note at the top of `docs/plans/2026-02-20-project-setup-design.md`:

```markdown
> **Note (2026-02-21):** The Rendering Modes section below has been superseded. The configurator now uses a side-by-side layout with live preview instead of a launch-and-render model. See [Side-by-Side Preview Design](./2026-02-21-side-by-side-preview-design.md).
```

**Step 3: Append to prompt log**

Append the user's request and the Q&A to `docs/prompt.md`.

**Step 4: Commit**

```bash
git add CLAUDE.md docs/plans/2026-02-20-project-setup-design.md docs/prompt.md
git commit -m "docs: update CLAUDE.md and plans for side-by-side configurator layout"
```

---

## Task 5: Final verification and cleanup

**Step 1: Run lint**

Run: `pnpm lint`
Expected: No errors

**Step 2: Run build**

Run: `pnpm build`
Expected: Clean build

**Step 3: Manual smoke test**

Run: `pnpm dev` and verify:
- [ ] Side-by-side layout at >=1024px viewport
- [ ] Configurator column maxes out at 1/3 viewport width
- [ ] Drag handle resizes configurator (min 280px, max 33.3vw)
- [ ] Live preview updates in real-time when config changes
- [ ] Preview shows desktop card layout when container >=448px
- [ ] Preview shows mobile full-width layout when container <448px
- [ ] Below 1024px viewport: drawer toggle button appears
- [ ] Drawer slides in from left, backdrop dismisses it
- [ ] Widening viewport past 1024px snaps back to side-by-side
- [ ] `/checkout` route still works independently
- [ ] `/design-system` route unaffected

**Step 4: Commit any remaining fixes**

```bash
git add -A
git commit -m "chore: final cleanup for side-by-side preview"
```
