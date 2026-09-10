"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { HeroSection } from "@/components/home/HeroSection"
import { MetricsSection } from "@/components/home/MetricsSection"
import { ScrollExpandShowcase } from "@/components/home/ScrollExpandShowcase"
import { FeaturedProperties } from "@/components/home/FeaturedProperties"
import { CeoQuoteSection } from "@/components/home/CeoQuoteSection"
import { ParallaxScrollBands } from "@/components/motion/ParallaxScrollBands"
import { ClientMarquee } from "@/components/home/ClientMarquee"

export function HomeClient() {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const homeChapters = [
    { id: "hero", label: isRtl ? "الرئيسية" : "Overview" },
    { id: "metrics", label: isRtl ? "المؤشرات" : "Metrics" },
    { id: "showcase", label: isRtl ? "الأصول" : "Showcase" },
    { id: "portfolio", label: isRtl ? "المشروعات" : "Portfolio" },
    { id: "leadership", label: isRtl ? "القيادة" : "Leadership" },
    { id: "partners", label: isRtl ? "الشركاء" : "Partners" },
  ]

  return (
    <div className="relative flex w-full flex-col">
      <PageLineSidebar items={homeChapters} />
      <HeroSection />
      <MetricsSection />
      <ScrollExpandShowcase />
      <FeaturedProperties />
      <CeoQuoteSection />
      <ParallaxScrollBands />
      <ClientMarquee />
    </div>
  )
}
