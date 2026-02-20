import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Menu01Icon, Store01Icon, ShoppingBag01Icon, WorkflowSquare03Icon, Calendar01Icon, CreditCardIcon } from "@hugeicons/core-free-icons"
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

  const [sidebarWidth, setSidebarWidth] = useState(Math.floor(window.innerWidth / 3))
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth >= SIDE_BY_SIDE_BREAKPOINT)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [previewContainerWidth, setPreviewContainerWidth] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // Track viewport width and toggle layout mode
  useEffect(() => {
    const handleResize = () => {
      const wide = window.innerWidth >= SIDE_BY_SIDE_BREAKPOINT
      setIsWideViewport(wide)
      if (wide) setIsDrawerOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track preview container width via ResizeObserver (debounced to avoid layout thrashing)
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    let rafId: number
    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          setPreviewContainerWidth(entry.contentRect.width)
        }
      })
    })
    observer.observe(el)
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  // Drag handle for resizing sidebar
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

  /* ── Configurator form cards (shared between sidebar and drawer) ── */
  const configuratorContent = (
    <div className="flex flex-col gap-6">
      {/* Merchant Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Store01Icon} size={18} className="text-muted-foreground" />
            Merchant
          </CardTitle>
          <CardDescription>Store identity and currency settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="merchant-name">Store Name</FieldLabel>
              <Input
                id="merchant-name"
                value={config.merchant.name}
                onChange={(e) => updateMerchant({ name: e.target.value })}
                placeholder="My Store"
              />
            </Field>

            <Field>
              <FieldLabel>Logo</FieldLabel>
              <div className="mb-2 flex gap-2">
                <Button
                  type="button"
                  variant={logoInputMode === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLogoInputMode("url")}
                >
                  URL
                </Button>
                <Button
                  type="button"
                  variant={logoInputMode === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLogoInputMode("upload")}
                >
                  Upload
                </Button>
              </div>
              {logoInputMode === "url" ? (
                <Input
                  id="merchant-logo"
                  value={config.merchant.logoUrl}
                  onChange={(e) => updateMerchant({ logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              ) : (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        updateMerchant({ logoUrl: url })
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {config.merchant.logoUrl ? "Change Image" : "Choose Image"}
                  </Button>
                </>
              )}
              {config.merchant.logoUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={config.merchant.logoUrl}
                    alt="Logo preview"
                    className="h-8 w-8 rounded border object-contain"
                  />
                  <span className="text-muted-foreground max-w-48 truncate text-xs">
                    {config.merchant.logoUrl}
                  </span>
                </div>
              )}
              <FieldDescription>Optional merchant logo for the checkout header.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="merchant-currency">Currency</FieldLabel>
              <Select
                value={config.merchant.currency}
                onValueChange={(v) => updateMerchant({ currency: v as Currency })}
              >
                <SelectTrigger id="merchant-currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Order */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={ShoppingBag01Icon} size={18} className="text-muted-foreground" />
            Order
          </CardTitle>
          <CardDescription>Set the demo order total.</CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="order-amount">Amount</FieldLabel>
            <Input
              id="order-amount"
              type="number"
              min={1}
              step={0.01}
              value={config.orderAmount}
              onChange={(e) => setOrderAmount(Number(e.target.value))}
            />
          </Field>
        </CardContent>
      </Card>

      {/* Checkout Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={WorkflowSquare03Icon} size={18} className="text-muted-foreground" />
            Checkout Flow
          </CardTitle>
          <CardDescription>Select which checkout journey to use.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground"
            >
              <div className="text-left">
                <span className="font-medium">Standard BNPL</span>
                <p className="text-muted-foreground mt-0.5 text-xs">Login → Plan Selection → Payment → Success</p>
              </div>
              <Badge variant="default" className="text-xs">Active</Badge>
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground opacity-60"
            >
              <div className="text-left">
                <span className="font-medium">Quick Pay</span>
                <p className="mt-0.5 text-xs">Simplified one-step checkout</p>
              </div>
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground opacity-60"
            >
              <div className="text-left">
                <span className="font-medium">Onboarding + BNPL</span>
                <p className="mt-0.5 text-xs">Customer details → Credit scoring → BNPL</p>
              </div>
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* BNPL Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={Calendar01Icon} size={18} className="text-muted-foreground" />
            BNPL Plans
          </CardTitle>
          <CardDescription>Select which split payment options to offer.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {ALL_PLANS.map((plan) => {
              const isSelected = config.plans.some((p) => p.id === plan.id)
              return (
                <label
                  key={plan.id}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => togglePlan(plan.id)}
                  />
                  <div>
                    <span className="text-sm font-medium">{plan.name}</span>
                    <span className="text-muted-foreground ml-1.5 text-sm">
                      ({plan.installments}x, every {plan.intervalWeeks}w)
                    </span>
                  </div>
                </label>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={CreditCardIcon} size={18} className="text-muted-foreground" />
            Payment Methods
          </CardTitle>
          <CardDescription>Choose which methods customers can use.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map((method) => {
              const isActive = config.paymentMethods.includes(method.value)
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => togglePaymentMethod(method.value)}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "border-primary/30 bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <span>{method.label}</span>
                  {isActive && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /* ── Wide viewport: side-by-side layout ── */
  if (isWideViewport) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Left: Configurator sidebar */}
        <div className="flex-shrink-0 overflow-y-auto border-r bg-background" style={{ width: sidebarWidth }}>
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-lg font-semibold tracking-tight">Checkout Configurator</h1>
              <p className="text-muted-foreground mt-1 text-xs">Configure and preview the BNPL checkout experience.</p>
            </div>
            {configuratorContent}
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="w-1.5 flex-shrink-0 cursor-col-resize bg-border transition-colors hover:bg-primary/30 active:bg-primary/50"
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

  /* ── Narrow viewport: drawer overlay ── */
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Toggle button */}
      <Button
        variant="outline"
        size="icon-sm"
        className="fixed bottom-4 left-4 z-40 shadow-md"
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
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-[80vw] overflow-y-auto bg-background shadow-xl"
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
