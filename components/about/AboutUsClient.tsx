"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { AboutHeroSection } from "@/components/about/AboutHeroSection"
import { TimelineSection } from "@/components/about/TimelineSection"
import { InvestmentThesisSection } from "@/components/about/InvestmentThesisSection"
import { CorporateValuesSection } from "@/components/about/CorporateValuesSection"
import { HseSection } from "@/components/about/HseSection"
import { AboutCtaSection } from "@/components/about/AboutCtaSection"

export function AboutUsClient() {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const aboutChapters = [
    { id: "heritage", label: isRtl ? "نبذة عن الشركة" : "Heritage" },
    { id: "timeline", label: isRtl ? "المسيرة التاريخية" : "Timeline" },
    { id: "thesis", label: isRtl ? "فلسفة الاستثمار" : "Investment Thesis" },
    { id: "values", label: isRtl ? "القيم المؤسسية" : "Corporate Values" },
    { id: "hse", label: isRtl ? "ميثاق السلامة" : "Safety Charter" },
    { id: "outreach", label: isRtl ? "التواصل والشراكات" : "Partnerships" },
  ]

  return (
    <div className="relative flex flex-col">
      <PageLineSidebar items={aboutChapters} />
      <AboutHeroSection />
      <TimelineSection />
      <InvestmentThesisSection />
      <CorporateValuesSection />
      <HseSection />
      <AboutCtaSection />
    </div>
  )
}
