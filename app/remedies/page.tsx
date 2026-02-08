import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'
import Image from 'next/image'

// Revalidate elke 60 seconden voor Pagefind indexering
export const revalidate = 60

interface PageSettings {
  title?: string
  subtitle?: string
  ctaTitle?: string
  ctaText?: string
  ctaButton?: { text?: string; link?: string }
}

async function getRemedies() {
  return client.fetch<Array<{
    _id: string
    title: string | null
    slug: string | null
    kernkwaliteit: string | null
    werking: string | null
    imageUrl: string | null
  }>>(queries.remedies)
}

async function getPageSettings(): Promise<PageSettings | null> {
  return client.fetch(queries.pageSettings('remedies'))
}

export default async function RemediesPage() {
  const [remedies, settings] = await Promise.all([
    getRemedies(),
    getPageSettings(),
  ])

  // CMS waarden met fallbacks
  const pageTitle = settings?.title || 'Bloesemremedies'
  const pageSubtitle = settings?.subtitle || '"De remedies werken laag voor laag, op een manier die bij je past."'
  const ctaTitle = settings?.ctaTitle || 'Benieuwd welke remedie bij jou past?'
  const ctaText = settings?.ctaText || 'Ik bied een vrijblijvend en kosteloos kennismakingsgesprek aan.'
  const ctaButton = settings?.ctaButton || { text: 'Neem contact op', link: '/contact' }

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <header className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            {pageTitle}
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto italic">
            {pageSubtitle}
          </p>
        </header>

        {remedies.length === 0 ? (
          <div className="p-12 md:p-16 bg-white rounded-2xl text-center shadow-sm border border-peach-200">
            <p className="text-sage-700 mb-4 text-lg">
              Er zijn nog geen remedies toegevoegd.
            </p>
            <Link
              href="/studio"
              className="text-sage-600 font-medium underline hover:text-terracotta transition-colors"
            >
              Ga naar Studio om content toe te voegen →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remedies.map((remedie) => {
            const slug = remedie.slug || remedie._id
            return (
              <article
                key={remedie._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-peach-200 hover:border-terracotta/30"
              >
                <Link href={`/remedies/${slug}`} className="block p-8">
                  {remedie.imageUrl ? (
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-peach-100">
                      <Image
                        src={remedie.imageUrl}
                        alt={remedie.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-xl bg-peach-100 mb-6 flex items-center justify-center">
                      <span className="text-terracotta text-5xl font-serif">
                        {remedie.title?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <h2 className="font-serif text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                    {remedie.title || 'Zonder titel'}
                  </h2>
                  {remedie.kernkwaliteit && (
                    <p className="text-sm font-medium text-sage-600 mt-1 italic">
                      {remedie.kernkwaliteit}
                    </p>
                  )}
                  {remedie.werking && (
                    <p className="text-sage-700 line-clamp-3 mt-4 leading-relaxed">
                      {remedie.werking}
                    </p>
                  )}
                  <span className="inline-block mt-6 text-sage-600 font-medium text-sm group-hover:text-terracotta transition-colors">
                    Lees meer over deze remedie →
                  </span>
                </Link>
              </article>
            )
            })}
          </div>
        )}

        <section className="mt-20 p-10 md:p-14 bg-white rounded-2xl text-center shadow-sm border border-peach-200">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {ctaTitle}
          </h3>
          <p className="text-stone mb-6 max-w-xl mx-auto leading-relaxed">
            {ctaText}
          </p>
          <Link
            href={ctaButton.link || '/contact'}
            className="inline-block bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors shadow-md hover:shadow-lg"
          >
            {ctaButton.text || 'Neem contact op'}
          </Link>
        </section>
      </div>
    </div>
  )
}
