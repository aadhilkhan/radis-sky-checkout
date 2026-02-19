import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CheckoutConfig, BnplPlan, PaymentMethodType } from "@/context/CheckoutConfigContext"

export type CheckoutStep = "login" | "plan-selection" | "payment-method" | "success"

const STEP_ORDER: CheckoutStep[] = ["login", "plan-selection", "payment-method", "success"]

export interface CheckoutState {
  currentStep: CheckoutStep
  phone: string
  otp: string
  isVerified: boolean
  selectedPlan: BnplPlan | null
  selectedPaymentMethod: PaymentMethodType | null
  isProcessing: boolean
}

type CheckoutAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: CheckoutStep }
  | { type: "SET_PHONE"; phone: string }
  | { type: "SET_OTP"; otp: string }
  | { type: "VERIFY_OTP" }
  | { type: "SELECT_PLAN"; plan: BnplPlan }
  | { type: "SELECT_PAYMENT_METHOD"; method: PaymentMethodType }
  | { type: "SET_PROCESSING"; isProcessing: boolean }
  | { type: "RESET" }

const initialState: CheckoutState = {
  currentStep: "login",
  phone: "",
  otp: "",
  isVerified: false,
  selectedPlan: null,
  selectedPaymentMethod: null,
  isProcessing: false,
}

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "NEXT_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep)
      if (currentIndex < STEP_ORDER.length - 1) {
        return { ...state, currentStep: STEP_ORDER[currentIndex + 1] }
      }
      return state
    }
    case "PREV_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep)
      if (currentIndex > 0) {
        return { ...state, currentStep: STEP_ORDER[currentIndex - 1] }
      }
      return state
    }
    case "GO_TO_STEP":
      return { ...state, currentStep: action.step }
    case "SET_PHONE":
      return { ...state, phone: action.phone }
    case "SET_OTP":
      return { ...state, otp: action.otp }
    case "VERIFY_OTP":
      return { ...state, isVerified: true }
    case "SELECT_PLAN":
      return { ...state, selectedPlan: action.plan }
    case "SELECT_PAYMENT_METHOD":
      return { ...state, selectedPaymentMethod: action.method }
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.isProcessing }
    case "RESET":
      return initialState
    default:
      return state
  }
}

interface CheckoutContextValue {
  state: CheckoutState
  config: CheckoutConfig
  dispatch: React.Dispatch<CheckoutAction>
  next: () => void
  back: () => void
  goTo: (step: CheckoutStep) => void
  canGoBack: boolean
  stepIndex: number
  totalSteps: number
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null)

export function CheckoutProvider({
  config,
  children,
}: {
  config: CheckoutConfig
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  const stepIndex = STEP_ORDER.indexOf(state.currentStep)

  const value: CheckoutContextValue = {
    state,
    config,
    dispatch,
    next: () => dispatch({ type: "NEXT_STEP" }),
    back: () => dispatch({ type: "PREV_STEP" }),
    goTo: (step) => dispatch({ type: "GO_TO_STEP", step }),
    canGoBack: stepIndex > 0,
    stepIndex,
    totalSteps: STEP_ORDER.length,
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider")
  }
  return ctx
}
