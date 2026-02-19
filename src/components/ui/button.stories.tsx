import type { Meta, StoryObj } from "@storybook/react-vite"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"

import { Button } from "./button"

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button>
        <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
        Add Item
      </Button>
      <Button variant="outline">
        <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
        Add Item
      </Button>
      <Button variant="secondary">
        Add Item
        <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-end" />
      </Button>
      <Button variant="destructive">
        <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
        Delete
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button size="icon-xs" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={PlusSignIcon} />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={PlusSignIcon} />
      </Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={PlusSignIcon} />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Add">
        <HugeiconsIcon icon={PlusSignIcon} />
      </Button>
    </div>
  ),
}
