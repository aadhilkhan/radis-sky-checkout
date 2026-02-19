import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div>
      <div style={{ fontSize: "14px", fontWeight: 500 }}>Section One</div>
      <Separator orientation="horizontal" style={{ margin: "12px 0" }} />
      <div style={{ fontSize: "14px", fontWeight: 500 }}>Section Two</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "24px" }}>
      <span style={{ fontSize: "14px" }}>Item A</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: "14px" }}>Item B</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: "14px" }}>Item C</span>
    </div>
  ),
}
