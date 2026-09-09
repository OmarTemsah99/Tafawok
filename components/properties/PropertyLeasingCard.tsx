"use client"

import React from "react"
import Link from "next/link"
import { Phone, MessageSquare, ShieldCheck, Building } from "lucide-react"
import { Property } from "@/types/cre"
import { OWNER_DETAILS } from "@/content/cre-data"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { Card } from "@/components/ui/card"
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
  const contact = property.contact

  const cleanPhone = contact.phone.replace(/[^+\d]/g, "")
  const ownerCleanWhatsapp = OWNER_DETAILS.whatsapp
    .replace(/[^+\d]/g, "")
    .replace("+", "")
  const ownerWhatsappUrl = `https://wa.me/${ownerCleanWhatsapp}?text=${encodeURIComponent(
    isArabic
      ? `مرحباً مهندس طارق، أود التواصل معكم مباشرة بشأن مشروع ${property.name.ar}`
      : `Hello Eng. Tarek, I would like to connect with you directly regarding ${property.name.en}`
  )}`

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12",
        className
      )}
    >
      {/* Column 1 (7 cols): Unboxed Editorial Commercial Leasing Desk */}
      <div className="flex flex-col justify-between py-2 lg:col-span-7 lg:pe-6">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Building className="size-4" />
            <span className="text-xs font-bold tracking-wider uppercase">
              {t("propertyDetail.leasingContactTitle")}
            </span>
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {t("propertyDetail.secureSpaceTitle")}
          </h3>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("propertyDetail.leasingContactSubtitle")}
          </p>

          {contact.leasingOffice && (
            <div className="mt-6 border-s-2 border-primary/50 py-1 ps-4">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {t("propertyDetail.executiveConcierge")}
              </span>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {t(contact.leasingOffice)}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/contact?property=${property.slug}`}
            className="cursor-target inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span>{t("propertyDetail.inquireLease")}</span>
          </Link>

          <a
            href={`tel:${cleanPhone}`}
            className="cursor-target inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-5 py-3 text-xs font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <Phone className="size-3.5 text-primary rtl:-scale-x-100" />
            <span>{t("propertyDetail.callNow")}</span>
          </a>
        </div>
      </div>

      {/* Column 2 (5 cols): The ONLY Card - Executive Founder & Stewardship Consultation */}
      <Card className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/30 bg-card p-6 shadow-xl sm:p-8 lg:col-span-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
              <ShieldCheck className="size-3.5" />
              <span>{t("propertyDetail.stewardshipBadge")}</span>
            </span>

            <span className="text-[11px] font-medium text-muted-foreground">
              {t("propertyDetail.experienceYears")}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3.5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-sm font-black text-primary">
              <span>TA</span>
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-base font-bold text-foreground">
                {t(OWNER_DETAILS.name)}
              </h4>
              <p className="truncate text-xs font-medium text-primary">
                {t(OWNER_DETAILS.role)}
              </p>
            </div>
          </div>

          <blockquote className="mt-6 border-s-2 border-primary/60 ps-4 text-xs leading-relaxed text-foreground/90 italic sm:text-sm">
            &ldquo;{t("propertyDetail.founderQuote")}&rdquo;
          </blockquote>
        </div>

        <div className="mt-8 space-y-3 border-t border-border/60 pt-5">
          <a
            href={ownerWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-600/10 px-4 py-2.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-600/20 active:scale-98 dark:text-emerald-400"
          >
            <MessageSquare className="size-3.5" />
            <span>{t("propertyDetail.founderDirectWhatsApp")}</span>
          </a>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("propertyDetail.founderCallDirect")}:</span>
            <PhoneNumber
              phone={OWNER_DETAILS.phone}
              className="font-mono font-bold text-foreground hover:text-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
