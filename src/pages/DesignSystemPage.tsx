import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

// UI Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DirectionProvider } from "@/components/ui/direction"

// Icons
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SearchIcon,
  MailIcon,
  UserIcon,
  EyeIcon,
  PlusSignIcon,
  BluetoothIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  DownloadIcon,
  ArrowRight01Icon,
  Delete01Icon,
  Edit01Icon,
  LinkIcon,
} from "@hugeicons/core-free-icons"

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "inputs", label: "Inputs" },
  { id: "input-groups", label: "Input Groups" },
  { id: "textarea", label: "Textarea" },
  { id: "labels-fields", label: "Labels & Fields" },
  { id: "select", label: "Select" },
  { id: "combobox", label: "Combobox" },
  { id: "cards", label: "Cards" },
  { id: "alert-dialog", label: "Alert Dialog" },
  { id: "dropdown-menu", label: "Dropdown Menu" },
  { id: "separator", label: "Separator" },
  { id: "direction", label: "Direction" },
] as const

// ─── Shared layout ──────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-foreground mb-4 text-xl font-semibold">{title}</h2>
      <div className="bg-background rounded-lg border border-dashed p-6">
        {children}
      </div>
    </section>
  )
}

function Row({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
      )}
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {children}
      </div>
    </div>
  )
}

// ─── Color tokens ───────────────────────────────────────────────

const COLOR_TOKENS = [
  { name: "background", var: "--background" },
  { name: "foreground", var: "--foreground" },
  { name: "primary", var: "--primary" },
  { name: "primary-foreground", var: "--primary-foreground" },
  { name: "secondary", var: "--secondary" },
  { name: "secondary-foreground", var: "--secondary-foreground" },
  { name: "muted", var: "--muted" },
  { name: "muted-foreground", var: "--muted-foreground" },
  { name: "accent", var: "--accent" },
  { name: "accent-foreground", var: "--accent-foreground" },
  { name: "destructive", var: "--destructive" },
  { name: "border", var: "--border" },
  { name: "input", var: "--input" },
  { name: "ring", var: "--ring" },
]

const CHART_TOKENS = [
  { name: "chart-1", var: "--chart-1" },
  { name: "chart-2", var: "--chart-2" },
  { name: "chart-3", var: "--chart-3" },
  { name: "chart-4", var: "--chart-4" },
  { name: "chart-5", var: "--chart-5" },
]

function ColorsSection() {
  return (
    <Section id="colors" title="Colors">
      <div className="space-y-6">
        <Row label="Semantic tokens">
          {COLOR_TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-1.5">
              <div
                className="size-12 rounded-md border shadow-sm"
                style={{ backgroundColor: `var(${token.var})` }}
              />
              <span className="text-muted-foreground max-w-16 truncate text-center text-[10px]">
                {token.name}
              </span>
              <span className="text-muted-foreground max-w-20 truncate text-center font-mono text-[9px]">
                var({token.var})
              </span>
            </div>
          ))}
        </Row>
        <Row label="Chart colors">
          {CHART_TOKENS.map((token) => (
            <div key={token.name} className="flex flex-col items-center gap-1.5">
              <div
                className="size-12 rounded-md border shadow-sm"
                style={{ backgroundColor: `var(${token.var})` }}
              />
              <span className="text-muted-foreground text-[10px]">
                {token.name}
              </span>
              <span className="text-muted-foreground max-w-20 truncate text-center font-mono text-[9px]">
                var({token.var})
              </span>
            </div>
          ))}
        </Row>
      </div>
    </Section>
  )
}

// ─── Typography ─────────────────────────────────────────────────

function TypographySection() {
  return (
    <Section id="typography" title="Typography">
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-medium">
            Font: Figtree (variable)
          </p>
          {[
            { label: "text-4xl font-bold", className: "text-4xl font-bold" },
            { label: "text-3xl font-bold", className: "text-3xl font-bold" },
            { label: "text-2xl font-semibold", className: "text-2xl font-semibold" },
            { label: "text-xl font-semibold", className: "text-xl font-semibold" },
            { label: "text-lg font-medium", className: "text-lg font-medium" },
            { label: "text-base", className: "text-base" },
            { label: "text-sm", className: "text-sm" },
            { label: "text-xs", className: "text-xs" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-48 shrink-0 text-xs font-mono">
                {item.label}
              </span>
              <span className={cn("text-foreground", item.className)}>
                The quick brown fox jumps
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Buttons ────────────────────────────────────────────────────

function ButtonsSection() {
  const variants = [
    "default",
    "secondary",
    "outline",
    "ghost",
    "destructive",
    "link",
  ] as const
  const sizes = ["xs", "sm", "default", "lg"] as const
  const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

  return (
    <Section id="buttons" title="Buttons">
      <div className="space-y-6">
        <Row label="Variants">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </Row>
        <Row label="Sizes">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Size {s}
            </Button>
          ))}
        </Row>
        <Row label="With icons">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} data-icon="inline-start" />
            Create
          </Button>
          <Button variant="outline">
            <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} data-icon="inline-start" />
            Download
          </Button>
          <Button variant="secondary">
            Next
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />
          </Button>
        </Row>
        <Row label="Icon buttons">
          {iconSizes.map((s) => (
            <Button key={s} size={s} variant="outline">
              <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
            </Button>
          ))}
        </Row>
        <Row label="States">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </Row>
      </div>
    </Section>
  )
}

// ─── Badges ─────────────────────────────────────────────────────

function BadgesSection() {
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
  ] as const

  return (
    <Section id="badges" title="Badges">
      <Row label="Variants">
        {variants.map((v) => (
          <Badge key={v} variant={v}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Badge>
        ))}
      </Row>
    </Section>
  )
}

// ─── Inputs ─────────────────────────────────────────────────────

function InputsSection() {
  return (
    <Section id="inputs" title="Inputs">
      <div className="max-w-sm space-y-6">
        <Row label="Default" className="flex-col items-stretch">
          <Input placeholder="Enter your email" />
        </Row>
        <Row label="With type" className="flex-col items-stretch">
          <Input type="email" placeholder="email@example.com" />
        </Row>
        <Row label="Disabled" className="flex-col items-stretch">
          <Input placeholder="Disabled input" disabled />
        </Row>
        <Row label="Invalid" className="flex-col items-stretch">
          <Input placeholder="Invalid input" aria-invalid="true" />
        </Row>
      </div>
    </Section>
  )
}

// ─── Input Groups ───────────────────────────────────────────────

function InputGroupsSection() {
  return (
    <Section id="input-groups" title="Input Groups">
      <div className="max-w-sm space-y-6">
        <Row label="With icon prefix" className="flex-col items-stretch">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        </Row>
        <Row label="With text prefix" className="flex-col items-stretch">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
          </InputGroup>
        </Row>
        <Row label="With button suffix" className="flex-col items-stretch">
          <InputGroup>
            <InputGroupInput placeholder="Enter email" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="ghost" size="icon-xs">
                <HugeiconsIcon icon={MailIcon} strokeWidth={2} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Row>
        <Row label="With both sides" className="flex-col items-stretch">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
            </InputGroupAddon>
            <InputGroupInput placeholder="Username" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="ghost" size="icon-xs">
                <HugeiconsIcon icon={EyeIcon} strokeWidth={2} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      </div>
    </Section>
  )
}

// ─── Textarea ───────────────────────────────────────────────────

function TextareaSection() {
  return (
    <Section id="textarea" title="Textarea">
      <div className="max-w-sm space-y-6">
        <Row label="Default" className="flex-col items-stretch">
          <Textarea placeholder="Enter your message..." />
        </Row>
        <Row label="Disabled" className="flex-col items-stretch">
          <Textarea placeholder="Disabled textarea" disabled />
        </Row>
      </div>
    </Section>
  )
}

// ─── Labels & Fields ────────────────────────────────────────────

function LabelsFieldsSection() {
  return (
    <Section id="labels-fields" title="Labels & Fields">
      <div className="max-w-sm space-y-6">
        <Row label="Label" className="flex-col items-stretch">
          <Label>Email address</Label>
        </Row>
        <Row label="Field (vertical)" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-field-name">Full name</FieldLabel>
            <Input id="ds-field-name" placeholder="John Doe" />
            <FieldDescription>Enter your legal name.</FieldDescription>
          </Field>
        </Row>
        <Row label="Field with error" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-field-email">Email</FieldLabel>
            <Input
              id="ds-field-email"
              placeholder="email@example.com"
              aria-invalid="true"
            />
            <FieldError>Please enter a valid email address.</FieldError>
          </Field>
        </Row>
        <Row label="Field (horizontal)" className="flex-col items-stretch">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="ds-field-phone">Phone</FieldLabel>
            <Input id="ds-field-phone" placeholder="+1 (555) 000-0000" />
          </Field>
        </Row>
        <Row label="Field group" className="flex-col items-stretch">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ds-fg-first">First name</FieldLabel>
              <Input id="ds-fg-first" placeholder="John" />
            </Field>
            <Field>
              <FieldLabel htmlFor="ds-fg-last">Last name</FieldLabel>
              <Input id="ds-fg-last" placeholder="Doe" />
            </Field>
            <FieldSeparator>or</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="ds-fg-username">Username</FieldLabel>
              <Input id="ds-fg-username" placeholder="johndoe" />
            </Field>
          </FieldGroup>
        </Row>
      </div>
    </Section>
  )
}

// ─── Select ─────────────────────────────────────────────────────

function SelectSection() {
  return (
    <Section id="select" title="Select">
      <div className="max-w-sm space-y-6">
        <Row label="Default" className="flex-col items-stretch">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Row>
        <Row label="Small trigger" className="flex-col items-stretch">
          <Select>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Choose..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="option-a">Option A</SelectItem>
                <SelectItem value="option-b">Option B</SelectItem>
                <SelectItem value="option-c">Option C</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Row>
        <Row label="Disabled" className="flex-col items-stretch">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="x">X</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Row>
      </div>
    </Section>
  )
}

// ─── Combobox ───────────────────────────────────────────────────

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
] as const

function ComboboxSection() {
  return (
    <Section id="combobox" title="Combobox">
      <div className="max-w-sm space-y-6">
        <Row label="Searchable" className="flex-col items-stretch">
          <Combobox items={COUNTRIES}>
            <ComboboxInput placeholder="Select a country" />
            <ComboboxContent>
              <ComboboxEmpty>No countries found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Row>
      </div>
    </Section>
  )
}

// ─── Cards ──────────────────────────────────────────────────────

function CardsSection() {
  return (
    <Section id="cards" title="Cards">
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Default card</CardTitle>
            <CardDescription>
              A standard card with header, content, and footer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              This is the card content area. You can put any content here.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Small card</CardTitle>
            <CardDescription>Compact variant with less padding.</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-xs">
                <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Useful for dense layouts and sidebars.
            </p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Card with form</CardTitle>
            <CardDescription>
              Cards compose well with form elements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="ds-card-name">Name</FieldLabel>
                  <Input id="ds-card-name" placeholder="Your name" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ds-card-email">Email</FieldLabel>
                  <Input
                    id="ds-card-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  )
}

// ─── Alert Dialog ───────────────────────────────────────────────

function AlertDialogSection() {
  return (
    <Section id="alert-dialog" title="Alert Dialog">
      <div className="flex flex-wrap gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Default dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Small with icon</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <HugeiconsIcon icon={BluetoothIcon} strokeWidth={2} />
              </AlertDialogMedia>
              <AlertDialogTitle>Allow connection?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to allow this device to connect?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Deny</AlertDialogCancel>
              <AlertDialogAction>Allow</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Section>
  )
}

// ─── Dropdown Menu ──────────────────────────────────────────────

function DropdownMenuSection() {
  const [checked, setChecked] = React.useState(true)
  const [radio, setRadio] = React.useState("light")

  return (
    <Section id="dropdown-menu" title="Dropdown Menu">
      <div className="flex flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={LinkIcon} strokeWidth={2} />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                  Assign to
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Alice</DropdownMenuItem>
                    <DropdownMenuItem>Bob</DropdownMenuItem>
                    <DropdownMenuItem>Charlie</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={(c) => setChecked(c === true)}
              >
                <HugeiconsIcon icon={EyeIcon} strokeWidth={2} />
                Show preview
              </DropdownMenuCheckboxItem>
              <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
                <DropdownMenuRadioItem value="light">
                  <HugeiconsIcon icon={SunIcon} strokeWidth={2} />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <HugeiconsIcon icon={MoonIcon} strokeWidth={2} />
                  Dark
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Section>
  )
}

// ─── Separator ──────────────────────────────────────────────────

function SeparatorSection() {
  return (
    <Section id="separator" title="Separator">
      <div className="space-y-6">
        <Row label="Horizontal" className="flex-col items-stretch">
          <div className="space-y-3">
            <p className="text-sm">Content above</p>
            <Separator />
            <p className="text-sm">Content below</p>
          </div>
        </Row>
        <Row label="Vertical">
          <div className="flex h-8 items-center gap-3">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Center</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </Row>
      </div>
    </Section>
  )
}

// ─── Direction ──────────────────────────────────────────────────

function DirectionSection() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")

  return (
    <Section id="direction" title="Direction">
      <div className="space-y-6">
        <Row label="Toggle direction">
          <Button
            variant={dir === "ltr" ? "default" : "outline"}
            size="sm"
            onClick={() => setDir("ltr")}
          >
            LTR
          </Button>
          <Button
            variant={dir === "rtl" ? "default" : "outline"}
            size="sm"
            onClick={() => setDir("rtl")}
          >
            RTL
          </Button>
        </Row>
        <DirectionProvider dir={dir}>
          <div className="max-w-sm space-y-4">
            <Field>
              <FieldLabel htmlFor="ds-dir-name">Name</FieldLabel>
              <Input
                id="ds-dir-name"
                placeholder={dir === "rtl" ? "ادخل اسمك" : "Enter your name"}
              />
            </Field>
            <Button>
              {dir === "rtl" ? "التالي" : "Next"}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                data-icon="inline-end"
              />
            </Button>
          </div>
        </DirectionProvider>
      </div>
    </Section>
  )
}

// ─── Page ───────────────────────────────────────────────────────

export function DesignSystemPage() {
  const [activeSection, setActiveSection] = React.useState("")
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark")
  )

  const toggleDark = React.useCallback(() => {
    document.documentElement.classList.toggle("dark")
    setIsDark((prev) => !prev)
  }, [])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground text-sm hover:underline">
              &larr; Back
            </Link>
            <h1 className="text-foreground text-lg font-semibold">
              Design System
            </h1>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={toggleDark}>
            <HugeiconsIcon
              icon={isDark ? SunIcon : MoonIcon}
              strokeWidth={2}
            />
          </Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        {/* Sidebar nav */}
        <nav className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-20 space-y-1">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="min-w-0 flex-1 space-y-12">
          <ColorsSection />
          <TypographySection />
          <ButtonsSection />
          <BadgesSection />
          <InputsSection />
          <InputGroupsSection />
          <TextareaSection />
          <LabelsFieldsSection />
          <SelectSection />
          <ComboboxSection />
          <CardsSection />
          <AlertDialogSection />
          <DropdownMenuSection />
          <SeparatorSection />
          <DirectionSection />
        </main>
      </div>
    </div>
  )
}
