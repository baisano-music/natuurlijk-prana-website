import { client, queries } from '@/lib/SanityClient'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link
          href="/remedies"
          className="inline-block mb-8 text-sage-600 hover:text-terracotta font-medium transition-colors"
        >
          ← Terug naar overzicht
        </Link>

        <article className="bg-white shadow-sm rounded-2xl py-16 px-6 md:px-12 border border-peach-200 overflow-hidden">
          <div className="text-center mb-12">
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

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-lg text-stone order-2 md:order-1 max-w-none">
              {remedie.werking && (
                <p className="leading-relaxed">{remedie.werking}</p>
              )}
              {remedie.mantra && (
                <div className="mt-8 p-6 bg-peach-100 border-l-4 border-terracotta italic text-lg rounded-r-xl">
                  &ldquo;{remedie.mantra}&rdquo;
                </div>
              )}
            </div>

            {remedie.image && (
              <div className="rounded-2xl overflow-hidden shadow-lg bg-peach-100 order-1 md:order-2">
                <Image
                  src={urlFor(remedie.image).width(600).height(600).url()}
                  alt={remedie.title || ''}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>

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
