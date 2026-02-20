import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

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
  orderAmount: number
}

export const ALL_PLANS: BnplPlan[] = [
  { id: "pay-in-4", name: "Pay in 4", installments: 4, intervalWeeks: 2 },
  { id: "pay-in-3", name: "Pay in 3", installments: 3, intervalWeeks: 4 },
  { id: "pay-later", name: "Pay Later", installments: 1, intervalWeeks: 4 },
]

const defaultConfig: CheckoutConfig = {
  merchant: {
    name: "Demo Store",
    logoUrl: "",
    brandColor: "#4F46E5",
    currency: "AED",
  },
  plans: [...ALL_PLANS],
  paymentMethods: ["card"],
  orderAmount: 400,
}

interface CheckoutConfigContextValue {
  config: CheckoutConfig
  setConfig: (config: CheckoutConfig) => void
  updateMerchant: (merchant: Partial<MerchantConfig>) => void
  setPlans: (plans: BnplPlan[]) => void
  togglePlan: (planId: string) => void
  setPaymentMethods: (methods: PaymentMethodType[]) => void
  setOrderAmount: (amount: number) => void
}

const CheckoutConfigContext = createContext<CheckoutConfigContextValue | null>(null)

export function CheckoutConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<CheckoutConfig>(defaultConfig)

  const updateMerchant = useCallback((merchant: Partial<MerchantConfig>) => {
    setConfig((prev) => ({ ...prev, merchant: { ...prev.merchant, ...merchant } }))
  }, [])

  const setPlans = useCallback((plans: BnplPlan[]) => {
    setConfig((prev) => ({ ...prev, plans }))
  }, [])

  const togglePlan = useCallback((planId: string) => {
    setConfig((prev) => {
      const isSelected = prev.plans.some((p) => p.id === planId)
      if (isSelected) {
        if (prev.plans.length > 1) {
          return { ...prev, plans: prev.plans.filter((p) => p.id !== planId) }
        }
        return prev
      }
      const plan = ALL_PLANS.find((p) => p.id === planId)
      if (plan) {
        return { ...prev, plans: [...prev.plans, plan] }
      }
      return prev
    })
  }, [])

  const setPaymentMethods = useCallback((methods: PaymentMethodType[]) => {
    setConfig((prev) => ({ ...prev, paymentMethods: methods }))
  }, [])

  const setOrderAmount = useCallback((amount: number) => {
    setConfig((prev) => ({ ...prev, orderAmount: amount }))
  }, [])

  const value = useMemo(() => ({
    config, setConfig, updateMerchant, setPlans, togglePlan, setPaymentMethods, setOrderAmount,
  }), [config, updateMerchant, setPlans, togglePlan, setPaymentMethods, setOrderAmount])

  return (
    <CheckoutConfigContext.Provider value={value}>
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
