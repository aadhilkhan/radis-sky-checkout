import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CheckoutConfigProvider } from "@/context/CheckoutConfigContext"

const ConfiguratorPage = lazy(() => import("@/pages/ConfiguratorPage").then(m => ({ default: m.ConfiguratorPage })))
const DesignSystemPage = lazy(() => import("@/pages/DesignSystemPage").then(m => ({ default: m.DesignSystemPage })))
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage").then(m => ({ default: m.CheckoutPage })))
const LazyAgentation = lazy(() => import("agentation").then(m => ({ default: m.Agentation })))

export function App() {
  return (
    <CheckoutConfigProvider>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<ConfiguratorPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Suspense>
        {import.meta.env.DEV && (
          <Suspense>
            <LazyAgentation />
          </Suspense>
        )}
      </BrowserRouter>
    </CheckoutConfigProvider>
  )
}

export default App
