import React from "react"
import { cn } from "@/lib/utils"
import { Locale, LocalizedString } from "@/types/cre"

interface FormattedUnitProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number
  unit?: LocalizedString | string
  locale?: Locale
  prefix?: string
  reverseInRtl?: boolean
}

/**
 * FormattedUnit guarantees that numbers with measurement units
 * (e.g., m², tons, floors, %, ft²) maintain strictly correct BiDi ordering
 * in both LTR and RTL rendering contexts, preventing numbers or units from flipping.
 */
export function FormattedUnit({
  value,
  unit,
  locale = "ar",
  prefix,
  className,
  ...props
}: FormattedUnitProps) {
  const resolvedUnit =
    typeof unit === "string" ? unit : unit ? unit[locale] || unit.en : ""

  return (
    <span
      className={cn("inline-flex items-baseline gap-1", className)}
      style={{ unicodeBidi: "isolate" }}
      {...props}
    >
      {prefix && <span className="shrink-0">{prefix}</span>}
      {/* Number value strictly isolated as LTR */}
      <bdi
        dir="ltr"
        style={{ unicodeBidi: "isolate" }}
        className="inline-block font-semibold text-foreground tabular-nums"
      >
        {value}
      </bdi>
      {/* Unit isolated to follow natural reading direction */}
      {resolvedUnit && (
        <bdi
          style={{ unicodeBidi: "isolate" }}
          className="inline-block text-[0.875em] text-muted-foreground select-none"
        >
          {resolvedUnit}
        </bdi>
      )}
    </span>
  )
}

/**
 * Helper to safely isolate raw combined metric strings like "18,500 m²" or "94%"
 */
export function BiDiIsolate({
  children,
  className,
  dir = "auto",
  ...props
}: React.HTMLAttributes<HTMLElement> & { dir?: "ltr" | "rtl" | "auto" }) {
  return (
    <bdi
      dir={dir}
      style={{ unicodeBidi: "isolate" }}
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      {children}
    </bdi>
  )
}
