import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "./label"

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Email address",
  },
}

export const Disabled: Story = {
  render: () => (
    <div data-disabled="true" className="group">
      <Label>Email address</Label>
    </div>
  ),
}
