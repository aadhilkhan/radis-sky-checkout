import { useRef, useEffect } from "react"
import { useCheckout } from "../CheckoutProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { PaymentMethodType } from "@/context/CheckoutConfigContext"
import { HugeiconsIcon } from "@hugeicons/react"
import { CreditCardIcon, SmartPhone01Icon, GoogleIcon } from "@hugeicons/core-free-icons"
import { cn, formatCurrency } from "@/lib/utils"

const METHOD_META: Record<PaymentMethodType, { label: string; icon: typeof CreditCardIcon }> = {
  card: { label: "Credit / Debit Card", icon: CreditCardIcon },
  apple_pay: { label: "Apple Pay", icon: SmartPhone01Icon },
  google_pay: { label: "Google Pay", icon: GoogleIcon },
}

export function StepPaymentMethod() {
  const { state, config, dispatch, next, back } = useCheckout()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleSelect = (method: PaymentMethodType) => {
    dispatch({ type: "SELECT_PAYMENT_METHOD", method })
  }

  const handlePay = () => {
    if (state.selectedPaymentMethod && !state.isProcessing) {
      dispatch({ type: "SET_PROCESSING", isProcessing: true })
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          dispatch({ type: "SET_PROCESSING", isProcessing: false })
          next()
        }
      }, 1500)
    }
  }

  const firstPayment = state.selectedPlan
    ? config.orderAmount / state.selectedPlan.installments
    : config.orderAmount

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <p className="text-muted-foreground text-sm">
          Choose how to pay {formatCurrency(firstPayment, config.merchant.currency)} today.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {config.paymentMethods.map((method) => {
          const meta = METHOD_META[method]
          const isSelected = state.selectedPaymentMethod === method

          return (
            <Card
              key={method}
              size="sm"
              className={cn(
                "cursor-pointer transition-colors",
                isSelected
                  ? "border-primary ring-primary/70 ring-2"
                  : "hover:border-foreground/20"
              )}
              onClick={() => handleSelect(method)}
            >
              <CardContent>
                <div className="flex items-center gap-3">
                  <HugeiconsIcon icon={meta.icon} strokeWidth={1.5} className="text-muted-foreground size-5" />
                  <span className="font-medium">{meta.label}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={back}>
          Back
        </Button>
        <Button
          className="flex-1"
          size="lg"
          disabled={!state.selectedPaymentMethod || state.isProcessing}
          onClick={handlePay}
        >
          {state.isProcessing ? "Processing..." : `Pay ${formatCurrency(firstPayment, config.merchant.currency)}`}
        </Button>
      </div>
    </div>
  )
}
