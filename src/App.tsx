import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Agentation } from "agentation"
import { DesignSystemPage } from "@/pages/DesignSystemPage"
import { ConfiguratorPage } from "@/pages/ConfiguratorPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { CheckoutConfigProvider } from "@/context/CheckoutConfigContext"

export function App() {
  return (
    <CheckoutConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConfiguratorPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        {import.meta.env.DEV && <Agentation />}
      </BrowserRouter>
    </CheckoutConfigProvider>
  )
}

export default App
