import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import { cookies } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/layout/LanguageProvider"
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar"
import { TargetCursor } from "@/components/motion/TargetCursor"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types/cre"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | TAFAWOK Real Estate Investment & Contracting",
    default: "TAFAWOK — Commercial Real Estate Investment & Contracting Co.",
  },
  description:
    "Multilingual enterprise platform for TAFAWOK CRE — Developer and contractor of prime corporate office parks, destination retail centers, and integrated logistics assets in Egypt and the Middle East.",
  keywords: [
    "Commercial Real Estate",
    "TAFAWOK",
    "New Cairo Office Spaces",
    "Building 360",
    "Tafawok Mall",
    "Contracting Egypt",
    "Turnkey EPC",
    "Commercial Leasing",
    "استثمار عقاري تجاري",
    "مكاتب التجمع الخامس",
    "شركة تفوق للمقاولات",
  ],
  icons: {
    icon: [
      { url: "/Tafawok_Logo_NoWord.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: ["/Tafawok_Logo_NoWord.svg"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const rawLocale = cookieStore.get("tafawok_locale")?.value
  const locale: Locale =
    rawLocale === "en" || rawLocale === "ar" ? rawLocale : "ar"

  const rawTheme = cookieStore.get("tafawok_theme")?.value
  const theme =
    rawTheme === "light" || rawTheme === "dark" || rawTheme === "system"
      ? rawTheme
      : "system"

  const isRtl = locale === "ar"

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        cairo.variable,
        isRtl ? "font-arabic" : "font-sans",
        theme === "dark" ? "dark" : ""
      )}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider defaultTheme={theme}>
          <ScrollProgressBar />
          <TargetCursor />
          <LanguageProvider initialLocale={locale}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
