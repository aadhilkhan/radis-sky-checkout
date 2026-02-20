import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useCheckout } from "./CheckoutProvider"
import { StepLogin } from "./steps/StepLogin"
import { StepPlanSelection } from "./steps/StepPlanSelection"
import { StepPaymentMethod } from "./steps/StepPaymentMethod"
import { StepSuccess } from "./steps/StepSuccess"

const stepComponents = {
  login: StepLogin,
  "plan-selection": StepPlanSelection,
  "payment-method": StepPaymentMethod,
  success: StepSuccess,
} as const

export function CheckoutFlow() {
  const { state, stepIndex, totalSteps } = useCheckout()
  const StepComponent = stepComponents[state.currentStep]

  return (
    <div className="relative min-h-[320px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={state.currentStep}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {/* Step progress */}
          <div className="mb-6 flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= stepIndex ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
