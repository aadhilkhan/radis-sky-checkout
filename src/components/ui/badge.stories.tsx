import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => <Badge>Default</Badge>,
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}
