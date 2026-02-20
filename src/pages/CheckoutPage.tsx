import { useNavigate } from "react-router-dom"
import { useCheckoutConfig } from "@/context/CheckoutConfigContext"
import { CheckoutProvider } from "@/checkout/CheckoutProvider"
import { CheckoutShell } from "@/checkout/CheckoutShell"
import { CheckoutFlow } from "@/checkout/CheckoutFlow"

export function CheckoutPage() {
  const { config } = useCheckoutConfig()
  const navigate = useNavigate()

  return (
    <CheckoutProvider config={config}>
      <CheckoutShell mode="fullpage" onClose={() => navigate("/")}>
        <CheckoutFlow />
      </CheckoutShell>
    </CheckoutProvider>
  )
}
