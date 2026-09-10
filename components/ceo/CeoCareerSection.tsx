"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CEO_PROFILE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Calendar } from "lucide-react"

export function CeoCareerSection() {
  const { t } = useLocaleStore()

  return (
    <section
      id="career-milestones"
      className="relative border-b border-border/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <MotionFade direction="up" delay={0.05}>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("ceoMessage.bioTitle")}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("ceoMessage.bioSubtitle")}
            </p>
          </MotionFade>
        </div>

        {/* Milestones - Swiss Editorial Rows */}
        <div className="mt-12 divide-y divide-border/60 sm:mt-16">
          {CEO_PROFILE.careerMilestones.map((milestone, idx) => (
            <MotionFade key={idx} direction="up" delay={0.06 + idx * 0.03}>
              <div className="group -mx-2 grid grid-cols-1 gap-4 rounded-xl px-2 py-6 transition-colors duration-200 hover:bg-muted/20 sm:-mx-4 sm:gap-6 sm:px-4 sm:py-7 md:grid-cols-12">
                {/* Period Text */}
                <div className="flex items-start gap-2 md:col-span-3">
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                    <Calendar className="size-3.5 text-primary" />
                    <span>{milestone.period}</span>
                  </div>
                </div>

                {/* Role & Scope */}
                <div className="md:col-span-4">
                  <h3 className="text-base font-extrabold text-foreground transition-colors group-hover:text-primary">
                    {t(milestone.role)}
                  </h3>
                  <div className="mt-1 text-xs font-medium text-primary/90">
                    {t(milestone.scope)}
                  </div>
                </div>

                {/* Highlight narrative */}
                <div className="md:col-span-5">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t(milestone.highlight)}
                  </p>
                </div>
              </div>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
