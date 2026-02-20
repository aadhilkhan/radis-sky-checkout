import type { Meta, StoryObj } from "@storybook/react-vite"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, MailIcon, EyeIcon } from "@hugeicons/core-free-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
} from "./input-group"

const meta = {
  title: "UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithIconPrefix: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon position="inline-start">
        <HugeiconsIcon icon={SearchIcon} />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

export const WithTextPrefix: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon position="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const WithButtonSuffix: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter your email" />
      <InputGroupAddon position="inline-end">
        <InputGroupButton aria-label="Show password">
          <HugeiconsIcon icon={EyeIcon} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithBothSides: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon position="inline-start">
        <HugeiconsIcon icon={MailIcon} />
      </InputGroupAddon>
      <InputGroupInput placeholder="you@example.com" />
      <InputGroupAddon position="inline-end">
        <InputGroupButton aria-label="Show password">
          <HugeiconsIcon icon={EyeIcon} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
