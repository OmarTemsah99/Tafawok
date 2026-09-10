"use client"

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  type CSSProperties,
} from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"

type Falloff = "linear" | "smooth" | "sharp"

export interface LineSidebarProps {
  items?: string[]
  accentColor?: string
  textColor?: string
  markerColor?: string
  showIndex?: boolean
  showMarker?: boolean
  proximityRadius?: number
  maxShift?: number
  falloff?: Falloff
  markerLength?: number
  markerGap?: number
  tickScale?: number
  scaleTick?: boolean
  itemGap?: number
  fontSize?: number
  smoothing?: number
  defaultActive?: number | null
  activeItem?: number | null
  onItemClick?: (index: number, label: string) => void
  className?: string
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
}

const DEFAULT_ITEMS = [
  "Overview",
  "Components",
  "Animations",
  "Backgrounds",
  "Showcase",
  "Playground",
  "Templates",
  "Changelog",
  "Community",
  "Resources",
  "Documentation",
  "Support",
]

export function LineSidebar({
  items = DEFAULT_ITEMS,
  accentColor = "var(--primary)",
  textColor = "var(--muted-foreground)",
  markerColor = "var(--border)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  activeItem,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const targetsRef = useRef<number[]>([])
  const currentRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const [internalActive, setInternalActive] = useState<number | null>(
    defaultActive
  )

  const activeIndex = activeItem !== undefined ? activeItem : internalActive
  const activeRef = useRef<number | null>(activeIndex)
  const smoothingRef = useRef(smoothing)
  const runFrameRef = useRef<(now: number) => void>(() => {})

  useEffect(() => {
    activeRef.current = activeIndex
    smoothingRef.current = smoothing
  }, [activeIndex, smoothing])

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  useEffect(() => {
    runFrameRef.current = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05)
      lastRef.current = now
      const tau = Math.max(smoothingRef.current, 1) / 1000
      const k = 1 - Math.exp(-dt / tau)

      let moving = false
      const currentItems = itemRefs.current
      for (let i = 0; i < currentItems.length; i++) {
        const el = currentItems[i]
        if (!el) continue
        const target = Math.max(
          targetsRef.current[i] || 0,
          activeRef.current === i ? 1 : 0
        )
        const cur = currentRef.current[i] || 0
        const next = cur + (target - cur) * k
        const settled = Math.abs(target - next) < 0.0015
        const value = settled ? target : next
        currentRef.current[i] = value
        el.style.setProperty("--effect", value.toFixed(4))
        if (!settled) moving = true
      }

      rafRef.current = moving
        ? requestAnimationFrame((t) => runFrameRef.current(t))
        : null
    }
  })

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
    }
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame((t) => runFrameRef.current(t))
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      const pointerY = e.clientY - rect.top
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear
      const currentItems = itemRefs.current
      for (let i = 0; i < currentItems.length; i++) {
        const el = currentItems[i]
        if (!el) continue
        const center = el.offsetTop + el.offsetHeight / 2
        const distance = Math.abs(pointerY - center)
        targetsRef.current[i] = ease(
          Math.max(0, 1 - distance / proximityRadius)
        )
      }
      startLoop()
    },
    [falloff, proximityRadius, startLoop]
  )

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0)
    startLoop()
  }, [startLoop])

  const handleClick = useCallback(
    (index: number, label: string) => {
      setInternalActive(index)
      onItemClick?.(index, label)
    },
    [onItemClick]
  )

  useEffect(() => {
    startLoop()
  }, [activeIndex, startLoop])

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    },
    []
  )

  const tickClass = showMarker
    ? `after:absolute ${
        isRtl
          ? "after:right-[calc(-1*var(--marker-length)-var(--marker-gap))]"
          : "after:left-[calc(-1*var(--marker-length)-var(--marker-gap))]"
      } after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? isRtl
            ? "after:origin-right after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
            : "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : "after:-translate-y-1/2"
      }`
    : ""

  return (
    <nav
      className={`relative flex justify-start${
        showMarker
          ? isRtl
            ? " pr-[calc(var(--marker-length)+var(--marker-gap))]"
            : " pl-[calc(var(--marker-length)+var(--marker-gap))]"
          : ""
      }${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col gap-(--item-gap) py-4"
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
            className={`relative cursor-pointer before:absolute before:-inset-x-12 before:-inset-y-1.5 before:content-[''] ${tickClass}`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className={`absolute top-1/2 h-px w-(--marker-length) transform-[translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))] bg-[color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] ${
                  isRtl
                    ? "right-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-right"
                    : "left-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-left"
                }`}
              />
            )}
            <span
              className={`relative inline-flex items-baseline [font-size:var(--font-size)] leading-[1.2] text-[color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] ${
                isRtl
                  ? "transform-[translateX(calc(var(--effect,0)*var(--max-shift)*-1))]"
                  : "transform-[translateX(calc(var(--effect,0)*var(--max-shift)))]"
              }`}
            >
              {showIndex && (
                <span
                  className={`${
                    isRtl ? "ml-[0.6rem]" : "mr-[0.6rem]"
                  } font-mono text-[0.85em] opacity-[calc(0.55+var(--effect,0)*0.45)]`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LineSidebar
