"use client"

import React, { useEffect } from "react"
import { useLocaleStore, initLocaleFromStorage } from "@/stores/useLocaleStore"

interface LanguageProviderProps {
  children: React.ReactNode
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function LanguageHotkey() {
  const toggleLocale = useLocaleStore((state) => state.toggleLocale)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      // Check for Ctrl + L (or Cmd + L on macOS)
      const isModifierPressed = event.ctrlKey || event.metaKey
      if (!isModifierPressed || event.altKey || event.shiftKey) {
        return
      }

      if (event.key.toLowerCase() !== "l") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      event.preventDefault()
      toggleLocale()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [toggleLocale])

  return null
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const locale = useLocaleStore((state) => state.locale)

  useEffect(() => {
    initLocaleFromStorage()
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    }
  }, [locale])

  return (
    <>
      <LanguageHotkey />
      {children}
    </>
  )
}
