"use client"

import { create } from "zustand"
import { Locale, LocalizedString } from "@/types/cre"

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (localized: LocalizedString | undefined) => string
}

const STORAGE_KEY = "tafawok_cre_locale"

function updateDocumentAttributes(locale: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
  }
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  // Default to Arabic as primary regional language, or English if stored
  locale: "ar",

  setLocale: (locale: Locale) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, locale)
      } catch {
        // Ignore storage write errors in restricted environments
      }
    }
    updateDocumentAttributes(locale)
    set({ locale })
  },

  toggleLocale: () => {
    const nextLocale: Locale = get().locale === "ar" ? "en" : "ar"
    get().setLocale(nextLocale)
  },

  t: (localized: LocalizedString | undefined): string => {
    if (!localized) return ""
    const currentLocale = get().locale
    return localized[currentLocale] || localized.en || ""
  },
}))

/**
 * Initialize locale from localStorage upon client hydration
 */
export function initLocaleFromStorage() {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored === "ar" || stored === "en") {
        useLocaleStore.getState().setLocale(stored)
      } else {
        // Default to Arabic for regional domestic primary audience
        useLocaleStore.getState().setLocale("ar")
      }
    } catch {
      useLocaleStore.getState().setLocale("ar")
    }
  }
}
