"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CEO_PROFILE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"

export function CeoAddressSection() {
  const { t } = useLocaleStore()

  return (
    <section
      id="formal-address"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionFade direction="up" delay={0.05}>
          <div className="flex items-center justify-end pb-4">
            <Quote className="size-6 rotate-180 text-primary/40" />
          </div>

          <Separator className="opacity-70" />

          {/* Salutation */}
          <div className="mt-8 text-base font-extrabold text-foreground sm:text-lg">
            {t(CEO_PROFILE.formalAddress.salutation)}
          </div>

          {/* Opening Thesis */}
          <div className="my-6 rounded-e-xl border-s-3 border-primary bg-muted/20 py-4 ps-6 pe-5">
            <blockquote className="text-base leading-relaxed font-bold text-foreground italic sm:text-lg">
              &ldquo;{t(CEO_PROFILE.formalAddress.opening)}&rdquo;
            </blockquote>
          </div>

          {/* Paragraphs */}
          <div className="mt-6 space-y-5 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            {CEO_PROFILE.formalAddress.paragraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {t(para)}
              </p>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-foreground sm:text-base">
              {t(CEO_PROFILE.formalAddress.closing)}
            </p>
          </div>

          <Separator className="mt-8 opacity-70" />

          {/* Signature & Title Block (Typographic, No Avatar) */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-base font-black text-foreground sm:text-lg">
                {t(CEO_PROFILE.name)}
              </div>
              <div className="text-xs font-bold text-primary">
                {t(CEO_PROFILE.role)}
              </div>
              <div className="text-xs text-muted-foreground">
                {t(CEO_PROFILE.company)}
              </div>
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
