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
  return <PropertiesDirectoryClient properties={PROPERTIES} />
}
