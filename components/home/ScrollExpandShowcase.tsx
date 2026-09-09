"use client"

import React from "react"
import Link from "next/link"
import { ScrollExpand } from "@/components/motion/ScrollExpand"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES } from "@/content/cre-data"
import { ArrowRight, ArrowLeft, Building2, MapPin } from "lucide-react"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"

export function ScrollExpandShowcase() {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const flagship = PROPERTIES[0]

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <section className="relative w-full bg-background">
      {/* Outer Section Header */}
      <div className="container mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Building2 className="size-3.5" />
            <span>
              {isArabic
                ? "التوسع المعماري التفاعلي للأصول"
                : "Interactive Architectural Expansion"}
            </span>
          </div>

          <h2 className="mt-4 max-w-3xl text-2xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {isArabic
              ? "مساحات تجارية بحجم طموحك المؤسسي"
              : "Commercial Architecture at Institutional Scale"}
          </h2>

          <p className="mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm">
            {isArabic
              ? "مرر لفتح المشهد المعماري بالكامل واكتشاف تفاصيل صرح مبنى 360 للأعمال بالقاهرة الجديدة"
              : "Scroll down to expand the stage and enter Building 360 Business Park in New Cairo"}
          </p>
        </div>
      </div>

      {/* The ScrollExpand Interactive Canvas */}
      <ScrollExpand
        src={flagship.mainImage}
        alt={t(flagship.name)}
        title={isArabic ? "مبنى 360 للأعمال // القاهرة الجديدة" : "BUILDING 360 // PRIME OFFICE CAMPUS"}
        scrollHint={isArabic ? "مرر لفتح المشهد المعماري" : "SCROLL TO EXPAND ASSET"}
        useWindowScroll
        startWidth={isMobile ? 86 : 52}
        startHeight={isMobile ? 54 : 64}
        startRadius={isMobile ? 18 : 28}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.0}
        holdDistance={0.25}
        smoothing={0.12}
        overlayScrim={0.55}
        className="w-full"
      >
        <div className="mx-auto max-w-4xl px-3 sm:px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-white backdrop-blur-md">
            <MapPin className="size-3 text-primary sm:size-3.5" />
            <span>{t(flagship.location.address)}</span>
          </div>

          <h3 className="mt-3 text-2xl font-black tracking-tight sm:mt-4 sm:text-5xl md:text-6xl text-white drop-shadow-lg">
            {t(flagship.name)}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-white/90 sm:mt-3 sm:text-lg max-w-2xl mx-auto drop-shadow-md">
            {t(flagship.description)}
          </p>

          {/* Quick Specs Matrix — 3 Col Grid on Mobile, Flex on Tablet/Desktop */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 sm:rounded-2xl sm:px-5 sm:py-3 backdrop-blur-md">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">GLA</span>
              <span className="font-mono text-xs sm:text-2xl font-black text-white">
                <BiDiIsolate>{flagship.keyStats.gla}</BiDiIsolate>
              </span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 sm:rounded-2xl sm:px-5 sm:py-3 backdrop-blur-md">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">
                {isArabic ? "نسبة الإشغال" : "OCCUPANCY"}
              </span>
              <span className="font-mono text-xs sm:text-2xl font-black text-primary">
                <BiDiIsolate>{flagship.keyStats.occupancyRate}</BiDiIsolate>
              </span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 sm:rounded-2xl sm:px-5 sm:py-3 backdrop-blur-md">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">
                {isArabic ? "مواقف السيارات" : "PARKING"}
              </span>
              <span className="font-mono text-xs sm:text-2xl font-black text-white">
                <BiDiIsolate>{flagship.keyStats.parkingCapacity}</BiDiIsolate>
              </span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
            <Link
              href={`/properties/${flagship.slug}`}
              className="cursor-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm font-bold text-primary-foreground shadow-2xl transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              <span>{isArabic ? "استكشف أصل مبنى 360 بالتفصيل" : "Explore Building 360 Specs"}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
      </ScrollExpand>
    </section>
  )
}
