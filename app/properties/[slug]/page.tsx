import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPropertyBySlug, getAllPropertySlugs } from "@/content/cre-data"
import { PropertyDetailClient } from "@/components/properties/PropertyDetailClient"

interface PropertyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    return {
      title: "Property Not Found | TAFAWOK CRE",
    }
  }

  return {
    title: `${property.name.en} — ${property.tagline.en}`,
    description: property.description.en,
    keywords: [
      property.name.en,
      property.name.ar,
      property.location.city.en,
      property.location.city.ar,
      "Commercial Real Estate Egypt",
      "TAFAWOK Leasing",
      "Office Space New Cairo",
      "Commercial Property",
    ],
    openGraph: {
      title: `${property.name.en} | TAFAWOK CRE`,
      description: property.description.en,
      images: [
        {
          url: property.mainImage,
          width: 1200,
          height: 630,
          alt: property.name.en,
        },
      ],
    },
  }
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetailClient property={property} />
}
