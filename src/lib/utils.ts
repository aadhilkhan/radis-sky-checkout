import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency } from "@/context/CheckoutConfigContext"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: Currency): string {
  return `${currency} ${amount.toFixed(2)}`
}
