import type { Metadata } from "next"
import { ContactPageClient } from "@/components/contact/ContactPageClient"

export const metadata: Metadata = {
  title: "Contact & Official RFQ | Executive Commercial Inquiries",
  description:
    "Direct engagement with TAFAWOK Real Estate Investment & Contracting Company. Connect with Eng. Tarek Ahmed (CEO), submit formal leasing RFQs, and coordinate meetings at our Cairo Executive Headquarters in Building 360, Fifth Settlement.",
  keywords: [
    "Contact TAFAWOK",
    "TAFAWOK RFQ",
    "Commercial Leasing Inquiry",
    "New Cairo Office Lease",
    "Eng Tarek Ahmed Phone",
    "Building 360 New Cairo",
    "Commercial Real Estate Developer Egypt",
    "اتصل بشركة تفوق",
    "تأجير مكاتب التجمع الخامس",
    "شركة تفوق للاستثمار العقاري والمقاولات",
    "مكتب التأجير التجاري",
  ],
  openGraph: {
    title: "Contact & Official RFQ | TAFAWOK Commercial Real Estate",
    description:
      "Direct engagement with TAFAWOK's executive ownership and commercial leasing desk. Submit inquiries for Building 360, Tafawok Mall, and Logistics Park.",
    type: "website",
    url: "https://tafawok.co/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
