"use client"

import React from "react"
import Link from "next/link"
import { Phone, Mail, MessageSquare, ArrowRight, ArrowLeft, ShieldCheck, Building2 } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { cn } from "@/lib/utils"

interface PropertyLeasingCardProps {
  property: Property
  className?: string
}

export function PropertyLeasingCard({ property, className }: PropertyLeasingCardProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight
  const contact = property.contact

  const cleanPhone = contact.phone.replace(/[^+\d]/g, "")
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
    isArabic
      ? `مرحباً، أود الاستفسار عن فرص التأجير المتاحة في ${property.name.ar}`
      : `Hello, I would like to inquire about commercial leasing opportunities at ${property.name.en}`
  )}`

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-b from-card via-card to-primary/5 p-6 shadow-xl sm:p-8 dark:from-card dark:via-card dark:to-primary/10",
        className
      )}
    >
      {/* Decorative architectural background watermark */}
      <Building2 className="pointer-events-none absolute -bottom-10 -inset-e-10 size-48 text-primary/5 select-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
              <ShieldCheck className="size-3.5" />
              <span>{t("propertyDetail.leasingContactTitle")}</span>
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {isArabic ? "احجز مساحتك التجارية الآن" : "Secure Your Commercial Space"}
            </h3>
          </div>

          {contact.leasingOffice && (
            <div className="rounded-xl border border-border/70 bg-background/80 p-3 text-xs sm:max-w-xs">
              <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                {t("propertyDetail.leasingOffice")}
              </span>
              <p className="mt-0.5 font-medium text-foreground">
                {t(contact.leasingOffice)}
              </p>
            </div>
          )}
        </div>

        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("propertyDetail.leasingContactSubtitle")}
        </p>

        {/* Action Buttons Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Direct Phone Call */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary px-4 py-3 text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 rtl:-scale-x-100" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-semibold opacity-90">
                  {t("propertyDetail.callNow")}
                </span>
                <PhoneNumber phone={contact.phone} className="text-xs font-bold font-mono text-primary-foreground" />
              </div>
            </div>
            <ArrowIcon className="size-4 shrink-0 opacity-80" />
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-600/10 px-4 py-3 text-emerald-700 transition-all hover:bg-emerald-600/20 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-98 dark:text-emerald-400"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="size-4 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  WhatsApp
                </span>
                <span className="text-xs font-bold">
                  {isArabic ? "محادثة فورية" : "Chat Direct"}
                </span>
              </div>
            </div>
            <ArrowIcon className="size-4 shrink-0 opacity-80" />
          </a>

          {/* Official Email / Inquiry Form */}
          <Link
            href={`/contact?property=${property.slug}`}
            className="flex items-center justify-between rounded-xl border border-border/80 bg-background/80 px-4 py-3 text-foreground transition-all hover:border-primary/50 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {t("contactForm.inquiryTypeLabel")}
                </span>
                <span className="text-xs font-bold">
                  {t("propertyDetail.inquireLease")}
                </span>
              </div>
            </div>
            <ArrowIcon className="size-4 shrink-0 text-primary opacity-80" />
          </Link>
        </div>

        {/* Executive Owner Direct Note */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {isArabic ? "طلب استئجار مبنى كامل أو شراكة استراتيجية؟" : "Full-building lease or strategic joint venture?"}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {isArabic ? "تواصل مباشر مع م. طارق أحمد (الرئيس التنفيذي)" : "Direct reach with Eng. Tarek Ahmed (CEO)"}
            </span>
          </div>

          <Link
            href="/ceo-message"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            <span>{isArabic ? "تواصل مع المالك" : "Owner Reach"}</span>
            <ArrowIcon className="size-3 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  )
}
