import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DirectionProvider, useDirection } from "./direction"
import { Button } from "./button"

const meta = {
  title: "UI/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

function DirectionDisplay() {
  const direction = useDirection()
  return <p>Current direction: <strong>{direction}</strong></p>
}

export const LTR: Story = {
  render: () => (
    <DirectionProvider dir="ltr">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <DirectionDisplay />
        <p>This content is rendered left-to-right.</p>
      </div>
    </DirectionProvider>
  ),
}

export const RTL: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", direction: "rtl" }}>
        <DirectionDisplay />
        <p>هذا المحتوى يُعرض من اليمين إلى اليسار.</p>
        <p>This paragraph also follows RTL direction.</p>
      </div>
    </DirectionProvider>
  ),
}

function ToggleDirectionDemo() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  return (
    <DirectionProvider dir={dir}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", direction: dir }}>
        <DirectionDisplay />
        <Button onClick={() => setDir((d) => (d === "ltr" ? "rtl" : "ltr"))}>
          Toggle to {dir === "ltr" ? "RTL" : "LTR"}
        </Button>
        <p>
          {dir === "rtl"
            ? "هذا النص يتبع اتجاه اليمين إلى اليسار."
            : "This text follows left-to-right direction."}
        </p>
      </div>
    </DirectionProvider>
  )
}

export const Toggle: Story = {
  render: () => <ToggleDirectionDemo />,
}
