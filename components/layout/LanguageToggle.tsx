"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
  variant?: "button" | "compact"
}

export function LanguageToggle({
  className,
}: LanguageToggleProps) {
  const { locale, setLocale } = useLocaleStore()
  const isArabic = locale === "ar"

  // Only show AR (when active is Arabic) or EN (when active is English)
  const currentCode = isArabic ? "AR" : "EN"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-lg border border-border/70 bg-secondary/30 px-2.5 text-xs font-bold text-foreground transition-colors duration-150 select-none hover:border-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95",
          className
        )}
        aria-label={isArabic ? "تغيير لغة الموقع (Ctrl+L)" : "Change language (Ctrl+L)"}
      >
        <span className="font-mono text-xs font-bold tracking-wider">{currentCode}</span>
        <ChevronDown className="h-3 w-3 opacity-60 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 p-1.5 shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground">
            {isArabic ? "لغة العرض" : "Display Language"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => setLocale("ar")}
            className="flex items-center justify-between py-2 cursor-pointer font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">العربية</span>
              <span className="font-mono text-[10px] text-muted-foreground">(AR)</span>
            </div>
            {isArabic && <Check className="h-4 w-4 text-primary shrink-0" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setLocale("en")}
            className="flex items-center justify-between py-2 cursor-pointer font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">English</span>
              <span className="font-mono text-[10px] text-muted-foreground">(EN)</span>
            </div>
            {!isArabic && <Check className="h-4 w-4 text-primary shrink-0" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />
        <div className="flex items-center justify-between px-2 py-1 text-[10px] text-muted-foreground select-none">
          <span>{isArabic ? "تبديل سريع" : "Quick Toggle"}</span>
          <kbd className="rounded border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
            Ctrl+L
          </kbd>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
