"use client"

import React, { useEffect } from "react"
import {
  LocaleContext,
  createLocaleStore,
  useLocaleStore,
  STORAGE_KEY,
} from "@/stores/useLocaleStore"
import type { Locale } from "@/types/cre"

interface LanguageProviderProps {
  children: React.ReactNode
  initialLocale?: Locale
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

export function LanguageProvider({
  children,
  initialLocale = "ar",
}: LanguageProviderProps) {
  const [store] = React.useState(() => createLocaleStore(initialLocale))

  // Check and migrate legacy localStorage to cookie if cookie was absent
  useEffect(() => {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(/tafawok_locale=(ar|en)/)
      if (!match) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
          if (stored === "ar" || stored === "en") {
            store.getState().setLocale(stored)
          }
        } catch {
          // ignore storage read errors
        }
      }
    }
  }, [store])

  return (
    <LocaleContext.Provider value={store}>
      <LanguageHotkey />
      {children}
    </LocaleContext.Provider>
  )
}
