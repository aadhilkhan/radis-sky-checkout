import { useCheckout } from "../CheckoutProvider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { formatCurrency } from "@/lib/utils"

export function StepSuccess() {
  const { state, config, dispatch } = useCheckout()

  const plan = state.selectedPlan
  const installmentAmount = plan ? config.orderAmount / plan.installments : config.orderAmount
  const currency = config.merchant.currency

  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="text-primary">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={1.5} className="size-16" />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Payment Confirmed</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Your order with {config.merchant.name} is confirmed.
        </p>
      </div>

      <div className="bg-muted/50 w-full rounded-xl p-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Total</span>
            <span className="font-medium">{formatCurrency(config.orderAmount, currency)}</span>
          </div>
          {plan && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              {plan.installments > 1 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Per Payment</span>
                  <span className="font-medium">{formatCurrency(installmentAmount, currency)}</span>
                </div>
              )}
            </>
          )}
          <Separator className="my-1" />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Paid Today</span>
            <span className="font-semibold">{formatCurrency(installmentAmount, currency)}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={() => dispatch({ type: "RESET" })}>
        Done
      </Button>
    </div>
  )
}
