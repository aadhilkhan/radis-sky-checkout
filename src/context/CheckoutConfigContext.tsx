import { createContext, useContext, useState, type ReactNode } from "react"

export type Currency = "AED" | "SAR" | "KWD" | "BHD" | "QAR" | "OMR" | "USD"

export type PaymentMethodType = "card" | "apple_pay" | "google_pay"

export interface BnplPlan {
  id: string
  name: string
  installments: number
  intervalWeeks: number
}

export interface MerchantConfig {
  name: string
  logoUrl: string
  brandColor: string
  currency: Currency
}

export interface CheckoutConfig {
  merchant: MerchantConfig
  plans: BnplPlan[]
  paymentMethods: PaymentMethodType[]
  renderMode: "modal" | "fullpage"
  orderAmount: number
}

const defaultConfig: CheckoutConfig = {
  merchant: {
    name: "Demo Store",
    logoUrl: "",
    brandColor: "#4F46E5",
    currency: "AED",
  },
  plans: [
    { id: "pay-in-4", name: "Pay in 4", installments: 4, intervalWeeks: 2 },
    { id: "pay-in-3", name: "Pay in 3", installments: 3, intervalWeeks: 4 },
    { id: "pay-later", name: "Pay Later", installments: 1, intervalWeeks: 4 },
  ],
  paymentMethods: ["card"],
  orderAmount: 400,
  renderMode: "modal",
}

interface CheckoutConfigContextValue {
  config: CheckoutConfig
  setConfig: (config: CheckoutConfig) => void
  updateMerchant: (merchant: Partial<MerchantConfig>) => void
  setPlans: (plans: BnplPlan[]) => void
  setPaymentMethods: (methods: PaymentMethodType[]) => void
  setRenderMode: (mode: "modal" | "fullpage") => void
  setOrderAmount: (amount: number) => void
}

const CheckoutConfigContext = createContext<CheckoutConfigContextValue | null>(null)

export function CheckoutConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<CheckoutConfig>(defaultConfig)

  const updateMerchant = (merchant: Partial<MerchantConfig>) => {
    setConfig((prev) => ({ ...prev, merchant: { ...prev.merchant, ...merchant } }))
  }

  const setPlans = (plans: BnplPlan[]) => {
    setConfig((prev) => ({ ...prev, plans }))
  }

  const setPaymentMethods = (methods: PaymentMethodType[]) => {
    setConfig((prev) => ({ ...prev, paymentMethods: methods }))
  }

  const setRenderMode = (mode: "modal" | "fullpage") => {
    setConfig((prev) => ({ ...prev, renderMode: mode }))
  }

  const setOrderAmount = (amount: number) => {
    setConfig((prev) => ({ ...prev, orderAmount: amount }))
  }

  return (
    <CheckoutConfigContext.Provider
      value={{ config, setConfig, updateMerchant, setPlans, setPaymentMethods, setRenderMode, setOrderAmount }}
    >
      {children}
    </CheckoutConfigContext.Provider>
  )
}

export function useCheckoutConfig() {
  const ctx = useContext(CheckoutConfigContext)
  if (!ctx) {
    throw new Error("useCheckoutConfig must be used within CheckoutConfigProvider")
  }
  return ctx
}
