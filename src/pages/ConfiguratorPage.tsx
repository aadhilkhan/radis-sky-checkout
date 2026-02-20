import { useState } from "react"
import { useCheckoutConfig, type PaymentMethodType, type Currency } from "@/context/CheckoutConfigContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export function ConfiguratorPage() {
  const { config, updateMerchant, setPaymentMethods, setRenderMode, setOrderAmount } = useCheckoutConfig()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

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

  const handleLaunch = () => {
    if (config.renderMode === "modal") {
      setIsCheckoutOpen(true)
    } else {
      window.location.href = "/checkout"
    }
  }

  const formatAmount = (amount: number) => {
    return `${config.merchant.currency} ${amount.toFixed(2)}`
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Checkout Configurator</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Configure and preview the BNPL checkout experience.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Merchant Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Merchant</CardTitle>
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
                  <FieldLabel htmlFor="merchant-logo">Logo URL</FieldLabel>
                  <Input
                    id="merchant-logo"
                    value={config.merchant.logoUrl}
                    onChange={(e) => updateMerchant({ logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
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
              <CardTitle>Order</CardTitle>
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
                <FieldDescription>
                  Installment preview: {config.plans.map((p) => (
                    <span key={p.id} className="mr-2">
                      {p.installments}x {formatAmount(config.orderAmount / p.installments)}
                    </span>
                  ))}
                </FieldDescription>
              </Field>
            </CardContent>
          </Card>

          {/* Checkout Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Checkout Flow</CardTitle>
              <CardDescription>Select which checkout journey to use.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground"
                >
                  <div>
                    <span className="font-medium">Standard BNPL</span>
                    <p className="text-muted-foreground text-xs mt-0.5">Login → Plan Selection → Payment → Success</p>
                  </div>
                  <Badge variant="default" className="text-xs">Active</Badge>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground opacity-60 cursor-not-allowed"
                >
                  <div>
                    <span className="font-medium">Quick Pay</span>
                    <p className="text-xs mt-0.5">Simplified one-step checkout</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground opacity-60 cursor-not-allowed"
                >
                  <div>
                    <span className="font-medium">Onboarding + BNPL</span>
                    <p className="text-xs mt-0.5">Customer details → Credit scoring → BNPL</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* BNPL Plans */}
          <Card>
            <CardHeader>
              <CardTitle>BNPL Plans</CardTitle>
              <CardDescription>Available split payment options.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {config.plans.map((plan) => (
                  <Badge key={plan.id} variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    {plan.name}
                    <span className="text-muted-foreground">
                      ({plan.installments}x, every {plan.intervalWeeks}w)
                    </span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
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

          {/* Rendering Mode */}
          <Card>
            <CardHeader>
              <CardTitle>Rendering Mode</CardTitle>
              <CardDescription>How the checkout appears to customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRenderMode("modal")}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition-colors ${
                    config.renderMode === "modal"
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="bg-muted flex h-12 w-16 items-center justify-center rounded-md border">
                    <div className="bg-card h-8 w-10 rounded border shadow-sm" />
                  </div>
                  <span className="font-medium">Modal</span>
                  <span className="text-muted-foreground text-xs">Overlay on current page</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRenderMode("fullpage")}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition-colors ${
                    config.renderMode === "fullpage"
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="bg-card flex h-12 w-16 items-center justify-center rounded-md border">
                    <div className="bg-muted h-10 w-12 rounded" />
                  </div>
                  <span className="font-medium">Full Page</span>
                  <span className="text-muted-foreground text-xs">Standalone checkout page</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Launch */}
          <Button size="lg" className="w-full" onClick={handleLaunch}>
            Launch Checkout — {formatAmount(config.orderAmount)}
          </Button>
        </div>
      </div>

      {/* Modal checkout overlay */}
      {isCheckoutOpen && (
        <CheckoutProvider config={config}>
          <CheckoutShell mode="modal" onClose={() => setIsCheckoutOpen(false)}>
            <CheckoutFlow />
          </CheckoutShell>
        </CheckoutProvider>
      )}
    </div>
  )
}
