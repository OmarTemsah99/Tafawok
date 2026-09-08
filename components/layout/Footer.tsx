"use client"

import * as React from "react"
import Link from "next/link"
import {
  MapPin,
  Mail,
  MessageSquare,
  ShieldCheck,
  ArrowUp,
  ExternalLink,
  Phone,
} from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useLocaleStore } from "@/stores/useLocaleStore"
import {
  COMPANY_IDENTITY,
  OWNER_DETAILS,
  PROPERTIES,
  UI_DICTIONARY,
} from "@/content/cre-data"

export function Footer() {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="mt-auto w-full border-t border-border/70 bg-card text-card-foreground">
      {/* Top Architectural Banner: Quick Direct Connect */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3 text-center md:text-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {isArabic
                    ? "تواصل استثماري مباشر مع الإدارة العليا"
                    : "Direct Executive Reach for Institutional Tenants & Investors"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isArabic
                    ? "نرحب بطلبات المعاينة واستفسارات عقود الإيجار طويلة الأجل والمشروعات المشتركة"
                    : "Direct executive engagement for corporate leasing, joint ventures, and turnkey EPC"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <PhoneNumber
                phone={OWNER_DETAILS.phone}
                className="rounded-lg border border-border/80 bg-background px-3.5 py-2 text-xs font-bold transition-colors hover:border-primary"
              />
              <a
                href={`https://wa.me/${OWNER_DETAILS.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  isArabic
                    ? "مرحباً، أود الاستفسار بخصوص الأصول التجارية لشركة تفوق."
                    : "Hello, I would like to inquire regarding TAFAWOK commercial properties."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 active:scale-95"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{isArabic ? "واتساب المالك" : "Owner WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Architectural Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Corporate Profile & Credentials */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(UI_DICTIONARY.footer.corporateDesc)}
            </p>

            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/80 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span>
                  {isArabic
                    ? "سجل تجاري وتصنيف مقاولات أول"
                    : "Tier-1 Licensed CRE & EPC Developer"}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {isArabic
                  ? "أكثر من 25 عاماً من الإنجاز وخمسة عقود من الخبرة الإقليمية."
                  : "25+ years track record backed by 5 decades of Gulf leadership."}
              </p>
            </div>
          </div>

          {/* Column 2: Flagship Commercial Assets (3 Locations) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t(UI_DICTIONARY.footer.propertiesNav)}
            </h4>
            <ul className="space-y-3">
              {PROPERTIES.map((prop) => (
                <li key={prop.id}>
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="group block text-xs transition-colors hover:text-primary"
                  >
                    <div className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {t(prop.name)}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="font-mono text-primary">
                        {prop.keyStats.gla}
                      </span>
                      <span>•</span>
                      <span>{t(prop.category)}</span>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>
                    {isArabic
                      ? "استعراض كافة الأصول"
                      : "View All Properties Directory"}
                  </span>
                  <ExternalLink className="ms-1 h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Sitemap */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t(UI_DICTIONARY.footer.quickLinks)}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isArabic ? "الصفحة الرئيسية" : "Corporate Home"}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isArabic
                    ? "عن الشركة ومسيرة الإنجاز"
                    : "About TAFAWOK & Heritage"}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isArabic
                    ? "المحفظة العقارية والمساحات"
                    : "Commercial Real Estate Portfolio"}
                </Link>
              </li>
              <li>
                <Link
                  href="/ceo-message"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isArabic
                    ? "رسالة الرئيس التنفيذي ورؤية الاستثمار"
                    : "CEO Strategic Vision & Message"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isArabic
                    ? "بوابة الاستفسار والتعاقد الرسمي"
                    : "Official RFQ & Inquiry Portal"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Executive Access & Cairo HQ */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t(UI_DICTIONARY.footer.ownerDirect)}
            </h4>
            <div className="space-y-3 rounded-xl border border-border/70 bg-secondary/30 p-3.5 text-xs">
              <div>
                <span className="block text-[11px] text-muted-foreground">
                  {t(OWNER_DETAILS.role)}
                </span>
                <span className="block font-bold text-foreground">
                  {t(OWNER_DETAILS.name)}
                </span>
              </div>

              <div className="space-y-2 border-t border-border/50 pt-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="phone-icon h-3.5 w-3.5 shrink-0 text-primary" />
                  <PhoneNumber
                    phone={OWNER_DETAILS.phone}
                    showIcon={false}
                    className="font-bold text-foreground hover:text-primary"
                  />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <a
                    href={`mailto:${OWNER_DETAILS.email}`}
                    className="truncate transition-colors hover:text-primary"
                  >
                    {OWNER_DETAILS.email}
                  </a>
                </div>

                <div className="flex items-start gap-2 pt-1 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <a
                    href={COMPANY_IDENTITY.headquarters.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] leading-snug transition-colors hover:text-primary"
                  >
                    {t(COMPANY_IDENTITY.headquarters.address)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back-to-Top Bar */}
      <div className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
            {/* Copyright & License */}
            <div className="space-y-1 text-center md:text-start">
              <p>{t(UI_DICTIONARY.footer.copyright)}</p>
              <p className="text-[11px] text-muted-foreground/80">
                {t(UI_DICTIONARY.footer.licenseNote)}
              </p>
            </div>

            {/* Quick Actions & Scroll-to-Top */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle variant="compact" />
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label={isArabic ? "الرجوع لأعلى الصفحة" : "Scroll to top"}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/70 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-secondary active:scale-95"
              >
                <span>{isArabic ? "لأعلى الصفحة" : "Back to top"}</span>
                <ArrowUp className="h-3.5 w-3.5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
