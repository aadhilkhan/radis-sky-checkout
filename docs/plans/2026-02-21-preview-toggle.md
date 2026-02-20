# Preview Mode Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a mobile/desktop preview toggle to the configurator header that constrains the preview to phone width (375px) when mobile is selected.

**Architecture:** Single state (`previewMode`) in ConfiguratorPage controls whether the preview container uses natural width or is constrained to 375px. The existing `containerWidth` prop to CheckoutShell handles responsive rendering automatically.

**Tech Stack:** React state, HugeIcons (`ComputerIcon`, `SmartPhone01Icon`), Tailwind CSS, existing Button component

---

### Task 1: Add preview mode state and icon imports

**Files:**
- Modify: `src/pages/ConfiguratorPage.tsx:1-46`

**Step 1: Add icon imports**

Add `ComputerIcon` and `SmartPhone01Icon` to the existing HugeIcons import on line 4:

```typescript
import { Cancel01Icon, Menu01Icon, Store01Icon, ShoppingBag01Icon, WorkflowSquare03Icon, Calendar01Icon, CreditCardIcon, ComputerIcon, SmartPhone01Icon } from "@hugeicons/core-free-icons"
```

**Step 2: Add previewMode state**

Add after line 44 (`const [previewContainerWidth, ...`):

```typescript
const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
```

**Step 3: Commit**

```bash
git add src/pages/ConfiguratorPage.tsx
git commit -m "feat: add preview mode state and icon imports"
```

---

### Task 2: Add toggle UI to wide viewport header

**Files:**
- Modify: `src/pages/ConfiguratorPage.tsx:380-383`

**Step 1: Replace the header div**

Replace the current header (lines 380-383):

```tsx
<div className="mb-6">
  <h1 className="text-lg font-semibold tracking-tight">Checkout Configurator</h1>
  <p className="text-muted-foreground mt-1 text-xs">Configure and preview the BNPL checkout experience.</p>
</div>
```

With:

```tsx
<div className="mb-6">
  <div className="flex items-center justify-between">
    <h1 className="text-lg font-semibold tracking-tight">Checkout Configurator</h1>
    <div className="flex items-center gap-0.5 rounded-lg border p-0.5">
      <Button
        variant="ghost"
        size="icon-sm"
        className={previewMode === "desktop" ? "bg-muted" : ""}
        onClick={() => setPreviewMode("desktop")}
      >
        <HugeiconsIcon icon={ComputerIcon} size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className={previewMode === "mobile" ? "bg-muted" : ""}
        onClick={() => setPreviewMode("mobile")}
      >
        <HugeiconsIcon icon={SmartPhone01Icon} size={16} />
      </Button>
    </div>
  </div>
  <p className="text-muted-foreground mt-1 text-xs">Configure and preview the BNPL checkout experience.</p>
</div>
```

**Step 2: Commit**

```bash
git add src/pages/ConfiguratorPage.tsx
git commit -m "feat: add device preview toggle to configurator header"
```

---

### Task 3: Wire toggle to preview container width

**Files:**
- Modify: `src/pages/ConfiguratorPage.tsx:394-401`

**Step 1: Update the preview container div**

Replace the current preview section (lines 394-401):

```tsx
{/* Right: Live preview */}
<div ref={previewRef} className="flex-1 overflow-y-auto">
  <CheckoutProvider config={config}>
    <CheckoutShell mode="inline" containerWidth={previewContainerWidth}>
      <CheckoutFlow />
    </CheckoutShell>
  </CheckoutProvider>
</div>
```

With:

```tsx
{/* Right: Live preview */}
<div ref={previewRef} className="flex-1 overflow-y-auto">
  <div className={previewMode === "mobile" ? "mx-auto max-w-[375px]" : ""}>
    <CheckoutProvider config={config}>
      <CheckoutShell mode="inline" containerWidth={previewMode === "mobile" ? 375 : previewContainerWidth}>
        <CheckoutFlow />
      </CheckoutShell>
    </CheckoutProvider>
  </div>
</div>
```

**Step 2: Verify the build compiles**

Run: `pnpm build`
Expected: No TypeScript errors, successful build.

**Step 3: Commit**

```bash
git add src/pages/ConfiguratorPage.tsx
git commit -m "feat: wire preview toggle to container width"
```

---

### Task 4: Visual verification

**Step 1: Start dev server and verify**

Run: `pnpm dev`

Verify in browser:
- Toggle shows in configurator header, right-aligned
- Desktop mode: preview uses full available width
- Mobile mode: preview shrinks to 375px centered, shows mobile checkout layout
- Switching between modes is instant

**Step 2: Final commit (if any adjustments needed)**

```bash
git add src/pages/ConfiguratorPage.tsx
git commit -m "fix: adjust preview toggle styling"
```
