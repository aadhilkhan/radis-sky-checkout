import { useCheckoutConfig } from "@/context/CheckoutConfigContext"
import { CheckoutProvider } from "@/checkout/CheckoutProvider"
import { CheckoutShell } from "@/checkout/CheckoutShell"
import { CheckoutFlow } from "@/checkout/CheckoutFlow"

export function CheckoutPage() {
  const { config } = useCheckoutConfig()

  return (
    <CheckoutProvider config={config}>
      <CheckoutShell mode="fullpage" onClose={() => { window.location.href = "/" }}>
        <CheckoutFlow />
      </CheckoutShell>
    </CheckoutProvider>
  )
}
