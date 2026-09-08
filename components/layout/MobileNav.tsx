"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  X,
  ChevronDown,
  Building2,
  ShoppingBag,
  Warehouse,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { useUiStore } from "@/stores/useUiStore"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { Logo } from "@/components/layout/Logo"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { PROPERTIES, OWNER_DETAILS } from "@/content/cre-data"
import { cn } from "@/lib/utils"

const PROPERTY_ICONS: Record<string, React.ElementType> = {
  "building-360-business-park": Building2,
  "tafawok-retail-center": ShoppingBag,
  "tafawok-logistics-park": Warehouse,
}

export function MobileNav() {
  const pathname = usePathname()
  const { mobileNavOpen, setMobileNavOpen } = useUiStore()
  const { locale, t } = useLocaleStore()
  const [propertiesExpanded, setPropertiesExpanded] = React.useState(true)
  const isArabic = locale === "ar"

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  // Prevent background scroll when mobile nav is open
  React.useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileNavOpen])

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [setMobileNavOpen])

  const close = () => setMobileNavOpen(false)

  if (!mobileNavOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 animate-in bg-black/60 backdrop-blur-sm transition-opacity duration-300 fade-in"
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer panel (slides from start side: right in RTL, left in LTR) */}
      <div
        className={cn(
          "relative z-10 flex h-full w-[88vw] max-w-sm animate-in flex-col overflow-y-auto border-e border-border bg-background shadow-2xl duration-300",
          isArabic ? "slide-in-from-right" : "slide-in-from-left"
        )}
      >
        {/* Top Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/70 p-4">
          <Logo onClick={close} />
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageToggle variant="compact" />
            <button
              type="button"
              onClick={close}
              aria-label={isArabic ? "إغلاق القائمة" : "Close navigation"}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/60 text-foreground transition-colors hover:bg-secondary active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
          {/* Main Links */}
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={close}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                pathname === "/"
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary/70"
              )}
            >
              <span>{isArabic ? "الرئيسية" : "Home"}</span>
              <ArrowIcon className="h-4 w-4 text-muted-foreground" />
            </Link>

            <Link
              href="/about"
              onClick={close}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                pathname === "/about"
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary/70"
              )}
            >
              <span>{isArabic ? "من نحن" : "About Us"}</span>
              <ArrowIcon className="h-4 w-4 text-muted-foreground" />
            </Link>

            {/* Properties Accordion */}
            <div className="overflow-hidden rounded-xl border border-border/60 bg-secondary/20">
              <button
                type="button"
                onClick={() => setPropertiesExpanded(!propertiesExpanded)}
                className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50"
              >
                <span>
                  {isArabic
                    ? "الأصول التجارية (3 مواقع)"
                    : "Commercial Assets (3 Hubs)"}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    propertiesExpanded && "rotate-180 text-primary"
                  )}
                />
              </button>

              {propertiesExpanded && (
                <div className="space-y-1 border-t border-border/40 px-2 pt-1 pb-2.5">
                  {PROPERTIES.map((prop) => {
                    const Icon = PROPERTY_ICONS[prop.slug] || Building2
                    const isActive = pathname === `/properties/${prop.slug}`
                    return (
                      <Link
                        key={prop.id}
                        href={`/properties/${prop.slug}`}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                          isActive
                            ? "bg-primary/15 font-semibold text-primary"
                            : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="flex-1 truncate">{t(prop.name)}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {prop.keyStats.gla}
                        </span>
                      </Link>
                    )
                  })}
                  <Link
                    href="/properties"
                    onClick={close}
                    className="block pt-2 text-center text-xs font-semibold text-primary hover:underline"
                  >
                    {isArabic
                      ? "عرض كافة الأصول والمساحات"
                      : "View All Commercial Assets"}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/ceo-message"
              onClick={close}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                pathname === "/ceo-message"
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary/70"
              )}
            >
              <span>{isArabic ? "رسالة الرئيس التنفيذي" : "CEO Message"}</span>
              <ArrowIcon className="h-4 w-4 text-muted-foreground" />
            </Link>

            <Link
              href="/contact"
              onClick={close}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                pathname === "/contact"
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary/70"
              )}
            >
              <span>
                {isArabic ? "اتصل بنا والاستفسارات" : "Contact & Inquiries"}
              </span>
              <ArrowIcon className="h-4 w-4 text-muted-foreground" />
            </Link>
          </nav>

          {/* Direct Executive Reach Card */}
          <div className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <span className="block truncate text-xs font-bold text-foreground">
                  {t(OWNER_DETAILS.name)}
                </span>
                <span className="block truncate text-[10px] text-muted-foreground">
                  {t(OWNER_DETAILS.role)}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px]">
                  {isArabic ? "المكتب التنفيذي:" : "Direct Line:"}
                </span>
                <PhoneNumber
                  phone={OWNER_DETAILS.phone}
                  className="text-xs font-bold text-foreground hover:text-primary"
                />
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-[11px]">
                  {isArabic ? "البريد:" : "Email:"}
                </span>
                <a
                  href={`mailto:${OWNER_DETAILS.email}`}
                  className="max-w-[160px] truncate font-medium text-foreground transition-colors hover:text-primary"
                >
                  {OWNER_DETAILS.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href={`https://wa.me/${OWNER_DETAILS.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                isArabic
                  ? "مرحباً، أود الاستفسار بخصوص الأصول التجارية لشركة تفوق."
                  : "Hello, I would like to inquire regarding TAFAWOK commercial properties."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 active:scale-98"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>
                {isArabic
                  ? "محادثة واتساب مباشرة مع المالك"
                  : "Direct WhatsApp with Owner"}
              </span>
            </a>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="shrink-0 border-t border-border/70 bg-card p-4">
          <Link
            href="/contact"
            onClick={close}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-98"
          >
            <span>
              {isArabic
                ? "تقديم طلب استئجار / استفسار"
                : "Submit Leasing Inquiry"}
            </span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
