"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const { locale } = useLocaleStore()
  const isArabic = locale === "ar"

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/30 text-muted-foreground opacity-60",
          className
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/70 bg-secondary/30 text-foreground transition-colors duration-150 select-none hover:border-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95",
          className
        )}
        aria-label={isArabic ? "مظهر الموقع (Ctrl+D)" : "Theme preference (Ctrl+D)"}
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
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 p-1.5 shadow-xl">
        <DropdownMenuLabel className="text-[11px] font-semibold text-muted-foreground">
          {isArabic ? "مظهر الموقع" : "Theme Preference"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between py-1.5 cursor-pointer font-medium"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs">{isArabic ? "فاتح" : "Light"}</span>
          </div>
          {theme === "light" && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between py-1.5 cursor-pointer font-medium"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-blue-400 shrink-0" />
            <span className="text-xs">{isArabic ? "داكن" : "Dark"}</span>
          </div>
          {theme === "dark" && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between py-1.5 cursor-pointer font-medium"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-xs">{isArabic ? "تلقائي (النظام)" : "System"}</span>
          </div>
          {theme === "system" && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />
        <div className="flex items-center justify-between px-2 py-1 text-[10px] text-muted-foreground select-none">
          <span>{isArabic ? "تبديل سريع" : "Quick Toggle"}</span>
          <kbd className="rounded border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
            Ctrl+D
          </kbd>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
