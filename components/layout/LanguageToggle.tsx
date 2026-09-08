"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
  variant?: "button" | "compact"
}

export function LanguageToggle({
  className,
  variant = "button",
}: LanguageToggleProps) {
  const { locale, toggleLocale } = useLocaleStore()
  const isArabic = locale === "ar"

  // When Arabic, show target "English"; when English, show target "العربية"
  const targetLabel = isArabic ? "English" : "العربية"
  const accessibleLabel = isArabic
    ? "التبديل إلى اللغة الإنجليزية"
    : "Switch to Arabic language"

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={accessibleLabel}
        title={accessibleLabel}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/50 px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors duration-150 hover:border-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95",
          className
        )}
      >
        <Globe className="h-3.5 w-3.5 text-primary" />
        <span>{isArabic ? "EN" : "عربي"}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-150 select-none hover:border-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95",
        className
      )}
    >
      <Globe className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="font-semibold">{targetLabel}</span>
      <span className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
        {isArabic ? "EN" : "AR"}
      </span>
    </button>
  )
}
