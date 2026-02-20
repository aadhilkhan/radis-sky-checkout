import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "./field"
import { Input } from "./input"

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" aria-invalid="true" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>
        We will never share your email with anyone else.
      </FieldDescription>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
    </Field>
  ),
}

export const FieldGroupStory: Story = {
  name: "Field Group",
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel>First name</FieldLabel>
        <Input placeholder="John" />
      </Field>
      <Field>
        <FieldLabel>Last name</FieldLabel>
        <Input placeholder="Doe" />
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <Input placeholder="John Doe" />
      </Field>
    </FieldGroup>
  ),
}
