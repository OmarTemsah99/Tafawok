"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"

export function ParallaxScrollBands() {
  const { locale } = useLocaleStore()
  const isArabic = locale === "ar"

  const track1ItemsEn = [
    "BUILDING 360 NEW CAIRO",
    "GRADE-A CORPORATE HEADQUARTERS",
    "TAFAWOK RETAIL CENTER",
    "DESTINATION SHOPPING MALL",
    "TAFAWOK LOGISTICS COMPLEX",
    "HEAVY SUPPLY INFRASTRUCTURE",
  ]

  const track1ItemsAr = [
    "مجمع 360 الإداري بالتجمع الخامس",
    "مقرات إدارية للشركات فئة (A)",
    "مركز تفوق التجاري والمول",
    "وجهة التسوق والترفيه العائلي",
    "مجمع تفوق اللوجستي والتجاري",
    "بنية تحتية صناعية متطورة",
  ]

  const track2ItemsEn = [
    "25+ YEARS TRACK RECORD",
    "77,500 M² COMMERCIAL PORTFOLIO",
    "ISO 9001 QUALITY CERTIFIED",
    "1,320+ SECURE PARKING SLOTS",
    "ZERO-HARM SAFETY POLICY",
    "TURNKEY EPC CONTRACTING",
  ]

  const track2ItemsAr = [
    "25+ عاماً من الريادة الهندسية",
    "77,500 م² مساحات تأجيرية تجارية",
    "معايير الجودة العالمية ISO 9001",
    "أكثر من 1,320 موقف سيارات مؤمن",
    "ميثاق السلامة المهنية صفر حوادث",
    "مشروعات المقاولات المتكاملة EPC",
  ]

  const track1 = isArabic ? track1ItemsAr : track1ItemsEn
  const track2 = isArabic ? track2ItemsAr : track2ItemsEn

  return (
    <section
      aria-hidden="true"
      dir="ltr"
      className="relative overflow-hidden border-y border-border/80 bg-card/60 py-10 select-none md:py-16"
    >
      {/* Subtle Edge Vignette Fade — Responsive width to protect mobile viewport */}
      <div className="pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-12 sm:w-28 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-12 sm:w-28 bg-linear-to-l from-background to-transparent" />

      {/* Track 1: Gliding Left Continuously */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <div className="flex w-max shrink-0 items-center animate-marquee-left">
          {/* First Half */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8">
            {track1.map((item, idx) => {
              const isOutlined = idx % 2 === 1
              return (
                <span
                  key={`t1-a-${idx}`}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`font-mono text-2xl font-black tracking-widest sm:text-4xl md:text-5xl lg:text-6xl ${
                    isOutlined
                      ? "text-transparent [-webkit-text-stroke:1.5px_oklch(0.553_0.195_38.402/0.5)] dark:[-webkit-text-stroke:1.5px_oklch(0.8_0.15_45/0.45)]"
                      : "text-foreground/85 dark:text-foreground/95"
                  }`}
                >
                  {item}
                  <span className="ms-6 sm:ms-8 text-primary/60" dir="ltr">•</span>
                </span>
              )
            })}
          </div>
          {/* Second Half (Clone for seamless loop) */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8" aria-hidden="true">
            {track1.map((item, idx) => {
              const isOutlined = idx % 2 === 1
              return (
                <span
                  key={`t1-b-${idx}`}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`font-mono text-2xl font-black tracking-widest sm:text-4xl md:text-5xl lg:text-6xl ${
                    isOutlined
                      ? "text-transparent [-webkit-text-stroke:1.5px_oklch(0.553_0.195_38.402/0.5)] dark:[-webkit-text-stroke:1.5px_oklch(0.8_0.15_45/0.45)]"
                      : "text-foreground/85 dark:text-foreground/95"
                  }`}
                >
                  {item}
                  <span className="ms-6 sm:ms-8 text-primary/60" dir="ltr">•</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Track 2: Gliding Right Continuously (Opposite Direction) */}
      <div className="relative mt-4 sm:mt-6 flex overflow-hidden whitespace-nowrap">
        <div className="flex w-max shrink-0 items-center animate-marquee-right">
          {/* First Half */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8">
            {track2.map((item, idx) => {
              const isPrimary = idx % 2 === 0
              return (
                <span
                  key={`t2-a-${idx}`}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`font-mono text-2xl font-black tracking-widest sm:text-4xl md:text-5xl lg:text-6xl ${
                    isPrimary
                      ? "text-primary/95"
                      : "text-transparent [-webkit-text-stroke:1.5px_oklch(0.553_0.195_38.402/0.4)] dark:[-webkit-text-stroke:1.5px_oklch(0.8_0.15_45/0.35)]"
                  }`}
                >
                  {item}
                  <span className="ms-6 sm:ms-8 text-muted-foreground/50" dir="ltr">•</span>
                </span>
              )
            })}
          </div>
          {/* Second Half (Clone for seamless loop) */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8" aria-hidden="true">
            {track2.map((item, idx) => {
              const isPrimary = idx % 2 === 0
              return (
                <span
                  key={`t2-b-${idx}`}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`font-mono text-2xl font-black tracking-widest sm:text-4xl md:text-5xl lg:text-6xl ${
                    isPrimary
                      ? "text-primary/95"
                      : "text-transparent [-webkit-text-stroke:1.5px_oklch(0.553_0.195_38.402/0.4)] dark:[-webkit-text-stroke:1.5px_oklch(0.8_0.15_45/0.35)]"
                  }`}
                >
                  {item}
                  <span className="ms-6 sm:ms-8 text-muted-foreground/50" dir="ltr">•</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
