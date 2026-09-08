"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const { locale } = useLocaleStore()

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground opacity-60",
          className
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === "dark"
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const label =
    locale === "ar"
      ? isDark
        ? "التبديل إلى الوضع الفاتح"
        : "التبديل إلى الوضع الداكن"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-secondary/50 text-foreground transition-colors duration-150 hover:border-border hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95",
        className
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-transform duration-200 ease-out",
          isDark ? "hidden scale-0 rotate-90" : "block scale-100 rotate-0"
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-transform duration-200 ease-out",
          isDark ? "block scale-100 rotate-0" : "hidden scale-0 -rotate-90"
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  )
}
