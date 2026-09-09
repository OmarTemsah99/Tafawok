"use client"

import React from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { useLocaleStore } from "@/stores/useLocaleStore"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.75 bg-transparent"
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: isRtl ? "right" : "left",
        }}
        className="h-full w-full bg-primary shadow-[0_0_10px_oklch(0.553_0.195_38.402/0.8)]"
      />
    </div>
  )
}
