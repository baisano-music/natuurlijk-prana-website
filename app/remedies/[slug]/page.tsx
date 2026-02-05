import { client, queries } from '@/lib/SanityClient'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichContent from '@/components/RichContent'

export default async function RemedieDetail({
  params,
}: {
  params: { slug: string }
}) {
  const remedie = await client.fetch(queries.remedieBySlug(params.slug))

  if (!remedie) {
    notFound()
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const hasContent = remedie.content && remedie.content.length > 0

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link
          href="/remedies"
          className="inline-block mb-8 text-sage-600 hover:text-terracotta font-medium transition-colors"
        >
          ← Terug naar overzicht
        </Link>

        <article className="bg-white shadow-sm rounded-2xl py-12 md:py-16 px-6 md:px-12 border border-peach-200 overflow-hidden">
          {/* Header met afbeelding */}
          <header className="mb-12">
            <div className="text-center mb-8">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                Bloesemremedie
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-2">
                {remedie.title}
              </h1>
              {remedie.kernkwaliteit && (
                <p className="text-xl italic text-sage-600 mt-4">
                  &ldquo;{remedie.kernkwaliteit}&rdquo;
                </p>
              )}
            </div>

            {/* Hoofdafbeelding - altijd bovenaan en gecentreerd */}
            {remedie.image && (
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg bg-peach-100">
                <Image
                  src={urlFor(remedie.image).width(600).height(600).url()}
                  alt={remedie.title || ''}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          {/* Korte beschrijving (werking) */}
          {remedie.werking && (
            <div className="mb-10">
              <p className="text-lg text-stone leading-relaxed">
                {remedie.werking}
              </p>
            </div>
          )}

          {/* Mantra */}
          {remedie.mantra && (
            <div className="mb-10 p-6 bg-peach-100 border-l-4 border-terracotta italic text-lg rounded-r-xl text-charcoal">
              &ldquo;{remedie.mantra}&rdquo;
            </div>
          )}

          {/* Rich content met afbeeldingen in tekst */}
          {hasContent && (
            <div className="mb-10">
              <RichContent content={remedie.content} />
            </div>
          )}

          {/* Footer met ontstaan info */}
          <footer className="border-t border-peach-200 pt-10 flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-end">
            <div className="text-sm text-sage-600">
              {remedie.ontstaan && (
                <>
                  <p className="font-semibold text-charcoal mb-1">
                    Ontstaan op een bijzondere plek:
                  </p>
                  {remedie.ontstaan.krachtplek && (
                    <p>{remedie.ontstaan.krachtplek}</p>
                  )}
                  {remedie.ontstaan.datum && (
                    <p>{formatDate(remedie.ontstaan.datum)}</p>
                  )}
                </>
              )}
            </div>
            <Link
              href="/contact"
              className="bg-terracotta text-white px-6 py-3 rounded-full hover:bg-terracotta-dark transition-colors font-medium text-center shadow-sm hover:shadow-md"
            >
              Bestel deze remedie
            </Link>
          </footer>
        </article>
      </div>
    </div>
  )
}
