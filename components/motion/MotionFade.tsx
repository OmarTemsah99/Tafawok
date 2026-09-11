"use client"

import { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

interface MotionFadeProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  scale?: boolean
}

export function MotionFade({
  children,
  className = "",
  delay = 0,
  duration = 0.4,
  direction = "up",
  distance = 16,
  scale = false,
}: MotionFadeProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitialTransform = () => {
    if (shouldReduceMotion) return "none"
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`
      case "down":
        return `translateY(-${distance}px)`
      case "left":
        return `translateX(${distance}px)`
      case "right":
        return `translateX(-${distance}px)`
      case "none":
      default:
        return "translate(0, 0)"
    }
  }

  const initial = {
    opacity: 0,
    transform: shouldReduceMotion
      ? "none"
      : scale
        ? `${getInitialTransform()} scale(0.98)`
        : getInitialTransform(),
  }

  const animate = {
    opacity: 1,
    transform: "translate(0, 0) scale(1)",
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0.05 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
