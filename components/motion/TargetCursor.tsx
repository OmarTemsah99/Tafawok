"use client"

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react"
import { createPortal } from "react-dom"
import { gsap } from "gsap"

const emptySubscribe = () => () => {}

// A position: fixed element is positioned relative to the viewport UNLESS an
// ancestor establishes a containing block (transform, perspective, filter,
// will-change of those, or contain). When that happens, the cursor's translate
// no longer maps to viewport coordinates, so we measure and compensate for it.
const getContainingBlock = (
  element: HTMLElement | null
): HTMLElement | null => {
  let node = element?.parentElement ?? null
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node)
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.willChange.includes("transform") ||
      style.willChange.includes("perspective") ||
      style.willChange.includes("filter") ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node
    }
    node = node.parentElement
  }
  return null
}

const getContainingBlockOffset = (
  block: HTMLElement | null
): { x: number; y: number } => {
  if (!block) return { x: 0, y: 0 }
  const rect = block.getBoundingClientRect()
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop }
}

export interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  hoverDuration?: number
  parallaxOn?: boolean
  cursorColor?: string
  cursorColorOnTarget?: string
}

function checkIsTouchOrTablet(): boolean {
  if (typeof window === "undefined") return true

  // 1. Viewport width below laptop threshold (< 1024px, includes tablets and phones)
  if (window.innerWidth < 1024) return true

  // 2. Touch capability & coarse pointer (tablets, iPads, phones)
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const isCoarse = window.matchMedia("(pointer: coarse)").matches
  const noHover = window.matchMedia("(hover: none)").matches
  if (hasTouch && (isCoarse || noHover)) return true

  // 3. User agent checks for mobile & tablet devices (including iPadOS desktop mode)
  const ua = (navigator.userAgent || navigator.vendor || "").toLowerCase()
  const isMobileOrTabletUA =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|tablet|kindle|silk|playbook/i.test(
      ua
    )
  const isIPadOS = navigator.maxTouchPoints > 1 && /macintosh/i.test(ua)

  return isMobileOrTabletUA || isIPadOS
}

function subscribeTouchOrTablet(callback: () => void) {
  if (typeof window === "undefined") return () => {}

  window.addEventListener("resize", callback)
  const mqlCoarse = window.matchMedia("(pointer: coarse)")
  const mqlHover = window.matchMedia("(hover: none)")
  const mqlWidth = window.matchMedia("(max-width: 1023px)")

  mqlCoarse.addEventListener?.("change", callback)
  mqlHover.addEventListener?.("change", callback)
  mqlWidth.addEventListener?.("change", callback)

  return () => {
    window.removeEventListener("resize", callback)
    mqlCoarse.removeEventListener?.("change", callback)
    mqlHover.removeEventListener?.("change", callback)
    mqlWidth.removeEventListener?.("change", callback)
  }
}

export function TargetCursor({
  targetSelector = "a, button, [role='button'], input, select, textarea, .cursor-target",
  spinDuration = 3,
  hideDefaultCursor = false,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#c8702a",
  cursorColorOnTarget = "#f59e0b",
}: TargetCursorProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const isTouchOrTablet = useSyncExternalStore(
    subscribeTouchOrTablet,
    checkIsTouchOrTablet,
    () => true
  )

  const cursorRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null)
  const spinTl = useRef<gsap.core.Timeline | null>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const containingBlockRef = useRef<HTMLElement | null>(null)

  const isActiveRef = useRef(false)
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(
    null
  )
  const tickerFnRef = useRef<(() => void) | null>(null)
  const activeStrengthRef = useRef({ current: 0 })

  const constants = useMemo(() => ({ borderWidth: 2.5, cornerSize: 10 }), [])

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(
      containingBlockRef.current
    )
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.08,
      ease: "power3.out",
    })
  }, [])

  useEffect(() => {
    if (!mounted || isTouchOrTablet || !cursorRef.current) return

    const activeStrength = activeStrengthRef.current
    const originalCursor = document.body.style.cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none"
    }

    const cursor = cursorRef.current
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      ".target-cursor-corner"
    )

    containingBlockRef.current = getContainingBlock(cursor)
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current)

    let activeTarget: Element | null = null
    let currentLeaveHandler: (() => void) | null = null
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null

    const cleanupTarget = (target: Element) => {
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler)
      }
      currentLeaveHandler = null
    }

    const initialOffset = getOffset()
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y,
    })

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill()
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" })
    }

    createSpinTimeline()

    const tickerFn = () => {
      if (!cursorRef.current || !cornersRef.current || !activeTarget) {
        return
      }
      const strength = activeStrengthRef.current.current
      if (strength === 0) return

      // DYNAMICALLY RECALCULATE TARGET CORNERS ON EVERY FRAME:
      // If the target element is animating or resizing (e.g. accordion expanding on hover),
      // the corner targets follow the expanding element in real time!
      const rect = activeTarget.getBoundingClientRect()
      const { borderWidth, cornerSize } = constants
      const { x: offsetX, y: offsetY } = getOffset()
      const cursorX = gsap.getProperty(cursorRef.current, "x") as number
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number

      const targetCornerPositions = [
        {
          x: rect.left - borderWidth - offsetX,
          y: rect.top - borderWidth - offsetY,
        },
        {
          x: rect.right + borderWidth - cornerSize - offsetX,
          y: rect.top - borderWidth - offsetY,
        },
        {
          x: rect.right + borderWidth - cornerSize - offsetX,
          y: rect.bottom + borderWidth - cornerSize - offsetY,
        },
        {
          x: rect.left - borderWidth - offsetX,
          y: rect.bottom + borderWidth - cornerSize - offsetY,
        },
      ]

      const corners = Array.from(cornersRef.current)
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, "x") as number
        const currentY = gsap.getProperty(corner, "y") as number
        const targetX = targetCornerPositions[i].x - cursorX
        const targetY = targetCornerPositions[i].y - cursorY
        const finalX = currentX + (targetX - currentX) * strength
        const finalY = currentY + (targetY - currentY) * strength
        const duration = strength >= 0.99 ? (parallaxOn ? 0.15 : 0) : 0.05
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto",
        })
      })
    }

    tickerFnRef.current = tickerFn

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY)
    window.addEventListener("mousemove", moveHandler)

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return
      const { x: offsetX, y: offsetY } = getOffset()
      const mouseX =
        (gsap.getProperty(cursorRef.current, "x") as number) + offsetX
      const mouseY =
        (gsap.getProperty(cursorRef.current, "y") as number) + offsetY
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY)
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget ||
          elementUnderMouse.closest(targetSelector) === activeTarget)
      if (!isStillOverTarget) {
        currentLeaveHandler?.()
      }
    }
    window.addEventListener("scroll", scrollHandler, { passive: true })

    const mouseDownHandler = () => {
      if (!dotRef.current) return
      gsap.to(dotRef.current, { scale: 0.6, duration: 0.2 })
      gsap.to(cursorRef.current, { scale: 0.85, duration: 0.2 })
    }

    const mouseUpHandler = () => {
      if (!dotRef.current) return
      gsap.to(dotRef.current, { scale: 1, duration: 0.25 })
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 })
    }

    window.addEventListener("mousedown", mouseDownHandler)
    window.addEventListener("mouseup", mouseUpHandler)

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element
      const allTargets: Element[] = []
      let current: Element | null = directTarget
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current)
        }
        current = current.parentElement
      }
      const target = allTargets[0] || null
      if (!target || !cursorRef.current || !cornersRef.current) return
      if (activeTarget === target) return
      if (activeTarget) {
        cleanupTarget(activeTarget)
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTarget = target
      const corners = Array.from(cornersRef.current)
      corners.forEach((corner) => gsap.killTweensOf(corner, "x,y"))
      gsap.killTweensOf(cursorRef.current, "rotation")
      spinTl.current?.pause()
      gsap.set(cursorRef.current, { rotation: 0 })

      if (cursorColorOnTarget) {
        gsap.to(corners, {
          borderColor: cursorColorOnTarget,
          duration: 0.15,
          ease: "power2.out",
        })
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColorOnTarget,
            duration: 0.15,
            ease: "power2.out",
          })
        }
      }

      const rect = target.getBoundingClientRect()
      const { borderWidth, cornerSize } = constants
      const { x: offsetX, y: offsetY } = getOffset()
      const cursorX = gsap.getProperty(cursorRef.current, "x") as number
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number

      targetCornerPositionsRef.current = [
        {
          x: rect.left - borderWidth - offsetX,
          y: rect.top - borderWidth - offsetY,
        },
        {
          x: rect.right + borderWidth - cornerSize - offsetX,
          y: rect.top - borderWidth - offsetY,
        },
        {
          x: rect.right + borderWidth - cornerSize - offsetX,
          y: rect.bottom + borderWidth - cornerSize - offsetY,
        },
        {
          x: rect.left - borderWidth - offsetX,
          y: rect.bottom + borderWidth - cornerSize - offsetY,
        },
      ]

      isActiveRef.current = true
      gsap.ticker.add(tickerFnRef.current!)

      gsap.to(activeStrengthRef.current, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
      })

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current![i].x - cursorX,
          y: targetCornerPositionsRef.current![i].y - cursorY,
          duration: 0.2,
          ease: "power2.out",
        })
      })

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current!)
        isActiveRef.current = false
        targetCornerPositionsRef.current = null
        gsap.set(activeStrengthRef.current, { current: 0, overwrite: true })
        activeTarget = null

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), {
            borderColor: cursorColor,
            duration: 0.15,
            ease: "power2.out",
          })
          if (dotRef.current) {
            gsap.to(dotRef.current, {
              backgroundColor: cursorColor,
              duration: 0.15,
              ease: "power2.out",
            })
          }
        }

        if (cornersRef.current) {
          const innerCorners = Array.from(cornersRef.current)
          gsap.killTweensOf(innerCorners, "x,y")
          const { cornerSize } = constants
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ]
          const tl = gsap.timeline()
          innerCorners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            )
          })
        }
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            ) as number
            const normalizedRotation = currentRotation % 360
            spinTl.current.kill()
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, {
                rotation: "+=360",
                duration: spinDuration,
                ease: "none",
              })
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart()
              },
            })
          }
          resumeTimeout = null
        }, 50)
        cleanupTarget(target)
      }
      currentLeaveHandler = leaveHandler
      target.addEventListener("mouseleave", leaveHandler)
    }

    window.addEventListener("mouseover", enterHandler as EventListener)

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor)
    }
    window.addEventListener("resize", resizeHandler)

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current)
      }
      window.removeEventListener("mousemove", moveHandler)
      window.removeEventListener("mouseover", enterHandler as EventListener)
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("resize", resizeHandler)
      window.removeEventListener("mousedown", mouseDownHandler)
      window.removeEventListener("mouseup", mouseUpHandler)
      if (activeTarget) {
        cleanupTarget(activeTarget)
      }
      spinTl.current?.kill()
      document.body.style.cursor = originalCursor
      isActiveRef.current = false
      targetCornerPositionsRef.current = null
      activeStrength.current = 0
    }
  }, [
    mounted,
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    hideDefaultCursor,
    isTouchOrTablet,
    hoverDuration,
    parallaxOn,
    cursorColor,
    cursorColorOnTarget,
  ])

  useEffect(() => {
    if (isTouchOrTablet || !cursorRef.current || !spinTl.current) return
    if (spinTl.current.isActive()) {
      spinTl.current.kill()
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
        rotation: "+=360",
        duration: spinDuration,
        ease: "none",
      })
    }
  }, [spinDuration, isTouchOrTablet])

  if (!mounted || isTouchOrTablet || typeof document === "undefined") {
    return null
  }

  return createPortal(
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-99999 h-0 w-0 select-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_8px_currentColor]"
        style={{
          willChange: "transform",
          backgroundColor: cursorColor,
          color: cursorColor,
        }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 size-2.5 translate-x-[-150%] translate-y-[-150%] border-[2.5px] border-r-0 border-b-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 size-2.5 translate-x-1/2 translate-y-[-150%] border-[2.5px] border-b-0 border-l-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 size-2.5 translate-x-1/2 translate-y-1/2 border-[2.5px] border-t-0 border-l-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 size-2.5 translate-x-[-150%] translate-y-1/2 border-[2.5px] border-t-0 border-r-0"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
    </div>,
    document.body
  )
}

export default TargetCursor
