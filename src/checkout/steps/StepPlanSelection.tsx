import { useCheckout } from "../CheckoutProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BnplPlan } from "@/context/CheckoutConfigContext"
import { formatCurrency } from "@/lib/utils"

export function StepPlanSelection() {
  const { state, config, dispatch, next, back } = useCheckout()

  const handleSelect = (plan: BnplPlan) => {
    dispatch({ type: "SELECT_PLAN", plan })
  }

  const handleContinue = () => {
    if (state.selectedPlan) {
      next()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Choose Your Plan</h2>
        <p className="text-muted-foreground text-sm">
          Split {formatCurrency(config.orderAmount, config.merchant.currency)} into easy payments.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {config.plans.map((plan) => {
          const isSelected = state.selectedPlan?.id === plan.id
          const installmentAmount = config.orderAmount / plan.installments

          return (
            <Card
              key={plan.id}
              size="sm"
              className={`cursor-pointer transition-colors ${
                isSelected
                  ? "border-primary ring-primary/20 ring-2"
                  : "hover:border-foreground/20"
              }`}
              onClick={() => handleSelect(plan)}
            >
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{plan.name}</span>
                      {plan.installments === 1 && (
                        <Badge variant="secondary" className="text-xs">
                          No split
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {plan.installments > 1
                        ? `${plan.installments} payments of ${formatCurrency(installmentAmount, config.merchant.currency)} every ${plan.intervalWeeks} weeks`
                        : `Pay ${formatCurrency(config.orderAmount, config.merchant.currency)} in ${plan.intervalWeeks} weeks`}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(installmentAmount, config.merchant.currency)}</div>
                    {plan.installments > 1 && (
                      <div className="text-muted-foreground text-xs">per payment</div>
                    )}
                  </div>
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
        <Button className="flex-1" size="lg" disabled={!state.selectedPlan} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
