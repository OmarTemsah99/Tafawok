import React from "react"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhoneNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  phone: string
  showIcon?: boolean
  iconClassName?: string
}

/**
 * Standard phone number component that guarantees LTR rendering
 * and prevents symbol/digit flipping in RTL contexts.
 * Automatically mirrors the phone handset icon in RTL (`rtl:-scale-x-100`)
 * to match natural reading flow and keep the icon + dial code unified.
 */
export function PhoneNumber({
  phone,
  showIcon = false,
  iconClassName,
  className,
  ...props
}: PhoneNumberProps) {
  return (
    <span
      dir="ltr"
      data-phone
      style={{ unicodeBidi: "isolate" }}
      className={cn(
        "phone-number inline-flex items-center gap-1.5 text-left tabular-nums",
        className
      )}
      {...props}
    >
      {showIcon && (
        <Phone
          data-phone-icon
          className={cn(
            "size-3.5 shrink-0 transition-transform rtl:-scale-x-100",
            iconClassName
          )}
        />
      )}
      <span className="font-mono tabular-nums">{phone}</span>
    </span>
  )
}
