"use client"

import React from "react"
import Link from "next/link"
import { Phone, ArrowRight, ArrowLeft } from "lucide-react"
import { Property } from "@/types/cre"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { cn } from "@/lib/utils"
import { useLocaleStore } from "@/stores/useLocaleStore"

interface PropertyLeasingCardProps {
  property: Property
  className?: string
}

export function PropertyLeasingCard({
  property,
  className,
}: PropertyLeasingCardProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight
  const contact = property.contact

  const cleanPhone = contact.phone.replace(/[^+\d]/g, "")

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/40 p-8 text-center sm:p-12",
        className
      )}
    >
      <div className="mx-auto max-w-2xl">
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {t("propertyDetail.secureSpaceTitle")}
        </h3>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("propertyDetail.leasingContactSubtitle")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${cleanPhone}`}
            className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto sm:text-sm"
          >
            <Phone className="size-4 rtl:-scale-x-100" />
            <span>
              {t("propertyDetail.callDirect")}:{" "}
              <PhoneNumber phone={contact.phone} />
            </span>
          </a>

          <Link
            href={`/contact?property=${property.slug}`}
            className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-6 py-3.5 text-xs font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary active:scale-[0.98] sm:w-auto sm:text-sm"
          >
            <span>{t("propertyDetail.inquireLease")}</span>
            <ArrowIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
