import { client, queries } from '@/lib/SanityClient'
import { FAQSection } from '@/components/FAQSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Veelgestelde vragen | Natuurlijk Prana',
  description: 'Antwoorden op veelgestelde vragen over bloesemremedies, celzouten, aromatherapie en de diensten van Natuurlijk Prana.',
}

interface FAQItem {
  _id: string
  question: string
  answer?: unknown[]
  shortAnswer?: string
  category?: string
}

// Categorie labels
const categoryLabels: Record<string, string> = {
  algemeen: 'Algemeen',
  bloesemremedies: 'Bloesemremedies',
  celzouten: 'Celzouten',
  aromatherapie: 'Aromatherapie',
  'essentiele-olien': 'Essentiële oliën',
  consulten: 'Consulten & Sessies',
  bestellen: 'Bestellen & Verzenden',
  'over-ons': 'Over Natuurlijk Prana',
}

async function getAllFAQs(): Promise<FAQItem[]> {
  return client.fetch(queries.faqAll)
}

export default async function FAQPage() {
  const allFaqs = await getAllFAQs()

  // Groepeer FAQs per categorie
  const faqsByCategory = allFaqs.reduce((acc, faq) => {
    const category = faq.category || 'algemeen'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQItem[]>)

  // Sorteer categorieën op de volgorde zoals gedefinieerd in categoryLabels
  const categoryOrder = Object.keys(categoryLabels)
  const sortedCategories = Object.keys(faqsByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-gradient-to-br from-sage-100 via-cream to-peach-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            FAQ
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">
            Veelgestelde vragen
          </h1>
          <p className="text-stone mt-6 max-w-2xl mx-auto text-lg">
            Hier vind je antwoorden op de meest gestelde vragen over bloesemremedies,
            celzouten, aromatherapie en onze diensten.
          </p>
        </div>
      </section>

      {/* Quick navigation */}
      {sortedCategories.length > 1 && (
        <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-stone/10 py-4 z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {sortedCategories.map((category) => (
                <a
                  key={category}
                  href={`#${category}`}
                  className="px-4 py-2 text-sm rounded-full bg-sage-50 text-sage-700 hover:bg-terracotta hover:text-white transition-colors"
                >
                  {categoryLabels[category] || category}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* FAQ Sections per categorie */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {sortedCategories.map((category) => (
          <section key={category} id={category} className="mb-16 scroll-mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 pb-4 border-b border-stone/20">
              {categoryLabels[category] || category}
            </h2>
            <FAQSection
              items={faqsByCategory[category]}
              showSchema={category === sortedCategories[0]}
              className="py-0"
            />
          </section>
        ))}
      </div>

      {/* Contact CTA */}
      <section className="bg-sage-100 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            Staat jouw vraag er niet bij?
          </h2>
          <p className="text-stone mb-8">
            Neem gerust contact met me op. Ik help je graag verder met al je vragen
            over bloesemremedies en mijn diensten.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta transition-all shadow-md hover:shadow-lg"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </div>
  )
}
