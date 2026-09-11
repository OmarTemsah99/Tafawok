"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { OWNER_DETAILS } from "@/content/cre-data"
import { Clock, ShieldCheck, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface OperatingHoursSectionProps {
  className?: string
}

export function OperatingHoursSection({
  className = "",
}: OperatingHoursSectionProps) {
  const { t } = useLocaleStore()
  const cleanPhone = OWNER_DETAILS.phone.replace(/[^+\d]/g, "")

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/50 p-6 shadow-xs sm:p-8",
        className
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Schedule Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock className="size-4" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
              {t("contactPage.hoursBadge")}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t("contactPage.hoursTitle")}
          </h3>

          <div className="space-y-1.5 text-xs text-muted-foreground sm:text-sm">
            <p className="font-semibold text-foreground">
              {t("contactPage.hoursValue")}
            </p>
            <p className="text-muted-foreground">
              {t("contactPage.weekendValue")}
            </p>
          </div>
        </div>

        {/* Right: SLA Assurance & Quick Dial */}
        <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/60 p-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-foreground">
                {t("contactPage.slaBadge")}
              </span>
              <p className="max-w-xs text-[11px] leading-relaxed text-muted-foreground">
                {t("contactPage.slaNote")}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-2 sm:border-s sm:border-border/70 sm:ps-6 sm:pt-0">
            <a
              href={`tel:${cleanPhone}`}
              className="cursor-target inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <Phone className="size-3.5 rtl:-scale-x-100" />
              <span>{t("contactPage.callDirect")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
