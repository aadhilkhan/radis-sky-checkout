import { useRef } from "react"
import { useCheckout } from "../CheckoutProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

const OTP_LENGTH = 4

export function StepLogin() {
  const { state, dispatch, next } = useCheckout()
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    dispatch({ type: "SET_PHONE", phone: value })
  }

  const handleOtpDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const newOtp = state.otp.padEnd(OTP_LENGTH, " ").split("")
    newOtp[index] = digit || " "
    const otp = newOtp.join("").trimEnd()
    dispatch({ type: "SET_OTP", otp })

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !state.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    dispatch({ type: "VERIFY_OTP" })
    next()
  }

  const isPhoneValid = state.phone.length >= 9
  const isOtpComplete = state.otp.replace(/\s/g, "").length === OTP_LENGTH

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Welcome</h2>
        <p className="text-muted-foreground text-sm">Enter your phone number to get started.</p>
      </div>

      <Field>
        <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
        <Input
          id="phone"
          type="tel"
          placeholder="5X XXX XXXX"
          value={state.phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
        <FieldDescription>We'll send you a one-time verification code.</FieldDescription>
      </Field>

      {isPhoneValid && (
        <Field>
          <FieldLabel>Verification Code</FieldLabel>
          <div className="flex gap-3">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <Input
                key={i}
                ref={(el) => { otpRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={state.otp[i]?.trim() || ""}
                onChange={(e) => handleOtpDigit(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="h-12 text-center text-lg"
                autoFocus={i === 0}
              />
            ))}
          </div>
          <FieldDescription>Enter the {OTP_LENGTH}-digit code sent to your phone. (Use 1234 for demo)</FieldDescription>
        </Field>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={!isPhoneValid || !isOtpComplete}
        onClick={handleVerify}
      >
        Verify & Continue
      </Button>
    </div>
  )
}
