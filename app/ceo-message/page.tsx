import type { Metadata } from "next"
import { CeoMessageClient } from "@/components/ceo/CeoMessageClient"

export const metadata: Metadata = {
  title: "CEO Message & Strategic Vision | Eng. Tarek Ahmed | TAFAWOK",
  description:
    "Read the official strategic address by Eng. Tarek Ahmed, CEO & Company Owner of TAFAWOK Real Estate Investment & Contracting. Direct executive accountability, engineering excellence, and enduring commercial partnerships.",
  keywords: [
    "Eng Tarek Ahmed",
    "CEO Message TAFAWOK",
    "TAFAWOK Real Estate Investment",
    "Direct Owner Reach",
    "Commercial Real Estate Egypt",
    "Building 360",
    "رسالة الرئيس التنفيذي",
    "المهندس طارق أحمد",
    "شركة تفوق للاستثمار العقاري والمقاولات",
  ],
  openGraph: {
    title: "CEO Message & Strategic Vision | Eng. Tarek Ahmed | TAFAWOK CRE",
    description:
      "Direct executive address by Eng. Tarek Ahmed on institutional CRE development, tangible asset value, and uncompromised engineering integrity.",
    type: "website",
    url: "https://tafawok.co/ceo-message",
  },
}

export default function CeoMessagePage() {
  return <CeoMessageClient />
}
