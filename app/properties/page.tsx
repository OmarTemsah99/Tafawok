import type { Metadata } from "next"
import { PROPERTIES } from "@/content/cre-data"
import { PropertiesDirectoryClient } from "@/components/properties/PropertiesDirectoryClient"

export const metadata: Metadata = {
  title: "Commercial Properties & Real Estate Developments",
  description:
    "Explore TAFAWOK's premier commercial real estate developments in Egypt — Building 360 Business Park, Tafawok Retail Center, and Tafawok Logistics Park. Prime corporate office spaces, destination retail, and trade hubs.",
  keywords: [
    "Commercial Real Estate Egypt",
    "Building 360 Business Park",
    "Tafawok Mall",
    "Tafawok Logistics Park",
    "New Cairo Offices",
    "Commercial Leasing Cairo",
    "مكاتب التجمع الخامس",
    "مول تجاري",
    "مجمع لوجستي",
  ],
}

export default function PropertiesPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Directory Page Header */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Commercial Portfolio</span>
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Prime Commercial Real Estate Portfolio
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Discover TAFAWOK&apos;s institutional-grade commercial developments — Grade-A
              corporate headquarters, destination shopping malls, and integrated logistics parks
              engineered for regional scale.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertiesDirectoryClient properties={PROPERTIES} />
        </div>
      </section>
    </div>
  )
}
