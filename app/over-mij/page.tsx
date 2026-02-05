import { client, queries } from '@/lib/SanityClient'
import { urlFor } from '@/lib/sanity/image'
import RichContent from '@/components/RichContent'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Over mij | Natuurlijk Prana',
  description: 'Leer meer over Natuurlijk Prana en de persoon achter de bloesemremedies.',
}

interface Section {
  _key: string
  heading?: string
  body?: unknown[]
}

async function getOverMijPage() {
  return client.fetch(queries.pageBySlug('over-mij'))
}

export default async function OverMijPage() {
  const page = await getOverMijPage()

  const hasNewContent = page?.content && page.content.length > 0
  const hasLegacySections = page?.sections && page.sections.length > 0

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <article className="bg-white shadow-sm rounded-2xl py-12 md:py-16 px-6 md:px-12 border border-peach-200">
          <header className="mb-12">
            <div className="text-center mb-8">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                Welkom
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-2">
                {page?.title || 'Over mij'}
              </h1>
              {page?.subtitle && (
                <p className="text-xl text-sage-600 mt-4">
                  {page.subtitle}
                </p>
              )}
            </div>

            {page?.mainImage && (
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg bg-peach-100">
                <Image
                  src={urlFor(page.mainImage).width(600).height(600).url()}
                  alt={page.title || 'Over mij'}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          {/* Nieuw content formaat */}
          {hasNewContent && (
            <div className="mb-10">
              <RichContent content={page.content} />
            </div>
          )}

          {/* Legacy sections formaat */}
          {!hasNewContent && hasLegacySections && (
            <div className="mb-10 space-y-8">
              {page.sections.map((section: Section) => (
                <div key={section._key}>
                  {section.heading && (
                    <h2 className="font-serif text-2xl text-charcoal mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.body && (
                    <RichContent content={section.body} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Geen content */}
          {!hasNewContent && !hasLegacySections && (
            <div className="prose prose-lg max-w-none text-stone mb-10">
              <p className="text-lg leading-relaxed">
                Deze pagina wordt binnenkort gevuld met meer informatie.
              </p>
              <p className="leading-relaxed">
                Ga naar de <Link href="/studio" className="text-terracotta hover:text-terracotta-dark">Sanity Studio</Link> om
                de &quot;Over mij&quot; pagina aan te maken met slug &quot;over-mij&quot;.
              </p>
            </div>
          )}

          <footer className="border-t border-peach-200 pt-10 text-center">
            <Link
              href="/contact"
              className="inline-block bg-terracotta text-white px-8 py-3 rounded-full hover:bg-terracotta-dark transition-colors font-medium shadow-sm hover:shadow-md"
            >
              Neem contact op
            </Link>
          </footer>
        </article>
      </div>
    </div>
  )
}
