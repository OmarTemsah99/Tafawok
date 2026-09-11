"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { useInView, animate, useReducedMotion } from "motion/react"

interface CounterTickerProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
  suffixClassName?: string
}

const emptySubscribe = () => () => {}

export function CounterTicker({
  value,
  suffix = "",
  duration = 1.6,
  className = "",
  suffixClassName = "",
}: CounterTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState<number>(0)
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  useEffect(() => {
    if (!mounted || !isInView || shouldReduceMotion) return

    const controls = animate(0, value, {
      duration,
      ease: [0.23, 1, 0.32, 1], // Custom strong ease-out
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest))
      },
    })

    return () => controls.stop()
  }, [mounted, isInView, value, duration, shouldReduceMotion])

  const activeValue = !mounted || shouldReduceMotion ? value : displayValue
  const formattedNumber = new Intl.NumberFormat("en-US").format(activeValue)

  return (
    <span
      ref={ref}
      className={`unit-number inline-flex items-baseline font-bold ${className}`}
      data-unit-number
    >
      <span className="tabular-nums" suppressHydrationWarning>
        {formattedNumber}
      </span>
      {suffix && (
        <span className={`ms-1 font-semibold ${suffixClassName}`}>
          {suffix}
        </span>
      )}
    </span>
  )
}
