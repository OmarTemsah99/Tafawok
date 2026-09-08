"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sparkles } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { PropertyDropdown } from "@/components/layout/PropertyDropdown"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { MobileNav } from "@/components/layout/MobileNav"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { useUiStore } from "@/stores/useUiStore"
import { COMPANY_IDENTITY } from "@/content/cre-data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { locale } = useLocaleStore()
  const { setMobileNavOpen } = useUiStore()
  const [scrolled, setScrolled] = React.useState(false)
  const isArabic = locale === "ar"

  // Detect scroll to heighten border contrast / shadow
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-md transition-all duration-200",
          scrolled ? "border-border py-2 shadow-sm" : "border-border/60 py-3"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Start: Brand Identity */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden items-center gap-1 text-sm font-medium lg:flex xl:gap-2">
              <Link
                href="/"
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors duration-150",
                  pathname === "/"
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {isArabic ? "الرئيسية" : "Home"}
              </Link>

              <Link
                href="/about"
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors duration-150",
                  pathname === "/about"
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {isArabic ? "من نحن" : "About Us"}
              </Link>

              {/* Commercial Assets with Interactive Dropdown */}
              <PropertyDropdown />

              <Link
                href="/ceo-message"
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors duration-150",
                  pathname === "/ceo-message"
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {isArabic ? "رسالة الرئيس التنفيذي" : "CEO Message"}
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "rounded-lg px-3 py-2 transition-colors duration-150",
                  pathname === "/contact"
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {isArabic ? "اتصل بنا" : "Contact"}
              </Link>
            </nav>

            {/* End: Utilities, Contact & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Executive phone hotline (visible on xl screens) */}
              <div className="hidden items-center gap-2 border-e border-border/70 pe-2 text-xs xl:flex">
                <span className="text-muted-foreground">
                  {isArabic ? "المكتب الرئيسي:" : "Central Office:"}
                </span>
                <PhoneNumber
                  phone={COMPANY_IDENTITY.contact.primaryPhone}
                  className="text-xs font-bold text-foreground transition-colors hover:text-primary"
                />
              </div>

              {/* Theme & Language Toggles */}
              <div className="flex items-center gap-1.5">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              {/* Primary CTA Button */}
              <Link
                href="/contact"
                className="hidden cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-150 select-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95 sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground/90" />
                <span>{isArabic ? "استفسر الآن" : "Inquire Now"}</span>
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label={isArabic ? "فتح القائمة" : "Open navigation menu"}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border/60 text-foreground transition-colors hover:bg-secondary active:scale-95 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out mobile navigation sheet */}
      <MobileNav />
    </>
  )
}
