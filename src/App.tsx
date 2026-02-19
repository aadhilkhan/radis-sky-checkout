import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Agentation } from "agentation"
import { DesignSystemPage } from "@/pages/DesignSystemPage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Configurator coming soon</div>} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/checkout" element={<div>Checkout coming soon</div>} />
      </Routes>
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  )
}

export default App
