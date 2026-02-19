import type { Meta, StoryObj } from "@storybook/react-vite"
import { HugeiconsIcon } from "@hugeicons/react"
import { SettingsIcon } from "@hugeicons/core-free-icons"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card"
import { Button } from "./button"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const SmallCard: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>A compact card variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content in a small card.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card With Action</CardTitle>
        <CardDescription>
          This card has an action button in the header.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={SettingsIcon} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}
