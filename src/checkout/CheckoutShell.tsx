import type { ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { useCheckout } from "./CheckoutProvider"
import type { MerchantConfig } from "@/context/CheckoutConfigContext"

interface CheckoutShellProps {
  mode: "modal" | "fullpage" | "inline"
  onClose?: () => void
  containerWidth?: number
  children: ReactNode
}

export function CheckoutShell({ mode, onClose, containerWidth, children }: CheckoutShellProps) {
  const { config } = useCheckout()

  if (mode === "inline") {
    const isMobile = containerWidth !== undefined && containerWidth < 448

    if (isMobile) {
      return (
        <div className="bg-card flex h-full w-full flex-col overflow-hidden">
          <ShellHeader merchant={config.merchant} />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      )
    }

    return (
      <div className="flex h-full w-full items-start justify-center bg-muted/30 p-8">
        <div className="bg-card ring-foreground/10 w-full max-w-md overflow-hidden rounded-2xl shadow-lg ring-1">
          <ShellHeader merchant={config.merchant} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }

  if (mode === "fullpage") {
    return (
      <div className="bg-muted/30 flex min-h-screen items-start justify-center px-4 py-8">
        <div className="bg-card ring-foreground/10 w-full max-w-md overflow-hidden rounded-2xl shadow-lg ring-1">
          <ShellHeader merchant={config.merchant} onClose={onClose} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal / Bottom sheet */}
        <motion.div
          className={cn(
            "bg-card relative z-10 w-full overflow-hidden shadow-xl",
            "max-h-[90vh] md:max-h-[85vh]",
            "rounded-t-2xl md:max-w-md md:rounded-2xl"
          )}
          initial={{ y: "100%", opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center py-2 md:hidden">
            <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
          </div>

          <ShellHeader merchant={config.merchant} onClose={onClose} />
          <div className="overflow-y-auto p-6">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function ShellHeader({ merchant, onClose }: { merchant: MerchantConfig; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        {merchant.logoUrl && /^(https?:|blob:|data:image\/)/.test(merchant.logoUrl) && (
          <img
            src={merchant.logoUrl}
            alt={`${merchant.name} logo`}
            className="h-7 w-7 rounded-md object-contain"
            referrerPolicy="no-referrer"
          />
        )}
        <span className="text-sm font-semibold">{merchant.name}</span>
      </div>
      {onClose && (
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close checkout">
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
        </Button>
      )}
    </div>
  )
}
