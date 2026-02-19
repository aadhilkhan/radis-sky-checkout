import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "text" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": "true",
  },
}

export const WithType: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
  },
}
