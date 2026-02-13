import Link from 'next/link'
import { client, queries } from '@/lib/SanityClient'
import type { Metadata } from 'next'

// Revalidate elke 60 seconden voor Pagefind indexering
export const revalidate = 60

interface Tarief {
  title: string
  price: string
  duration?: string
  description?: string
  featured?: boolean
  featuredLabel?: string
  includes?: string[]
  buttonText?: string
  buttonLink?: string
}

interface Pakket {
  title: string
  price: string
  originalPrice?: string
  savings?: string
  description?: string
  note?: string
  buttonText?: string
  buttonLink?: string
}

interface ExtraOptie {
  title: string
  price: string
  duration?: string
  description?: string
}

interface InfoItem {
  icon?: string
  text: string
}

interface TarievenPageData {
  heroSubtitle?: string
  heroTitle?: string
  heroDescription?: string
  tarieven?: Tarief[]
  pakkettenTitle?: string
  pakkettenHeading?: string
  pakketten?: Pakket[]
  extraTitle?: string
  extraOpties?: ExtraOptie[]
  infoTitle?: string
  infoItems?: InfoItem[]
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  seoTitle?: string
  seoDescription?: string
}

async function getTarievenPage(): Promise<TarievenPageData | null> {
  return client.fetch(queries.tarievenPage)
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTarievenPage()
  return {
    title: data?.seoTitle || 'Tarieven & Consult | Natuurlijk Prana',
    description:
      data?.seoDescription ||
      'Bekijk de tarieven voor bloesemtherapie consulten. Inclusief gratis kennismakingsgesprek, intake en vervolgconsulten.',
  }
}

// Icon component for info items
function InfoIcon({ type }: { type?: string }) {
  const iconClass = 'w-4 h-4 text-sage-600'

  switch (type) {
    case 'clock':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    case 'heart':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )
    case 'money':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    case 'check':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'warning':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )
    case 'info':
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
  }
}

export default async function TarievenPage() {
  const data = await getTarievenPage()

  // Fallback values if CMS is empty
  const heroSubtitle = data?.heroSubtitle || 'Tarieven'
  const heroTitle = data?.heroTitle || 'Investeer in jezelf'
  const heroDescription =
    data?.heroDescription ||
    'Persoonlijke begeleiding met bloesemremedies. Elke sessie is maatwerk, afgestemd op jouw situatie en behoeften.'

  const tarieven = data?.tarieven || []
  const pakkettenTitle = data?.pakkettenTitle || 'Voordeelpakket'
  const pakkettenHeading = data?.pakkettenHeading || 'Bespaar met een pakket'
  const pakketten = data?.pakketten || []
  const extraTitle = data?.extraTitle || 'Extra opties'
  const extraOpties = data?.extraOpties || []
  const infoTitle = data?.infoTitle || 'Goed om te weten'
  const infoItems = data?.infoItems || []
  const ctaTitle = data?.ctaTitle || 'Klaar om te beginnen?'
  const ctaDescription =
    data?.ctaDescription ||
    'Plan een gratis kennismakingsgesprek en ontdek of bloesemtherapie bij jou past.'
  const ctaButtonText = data?.ctaButtonText || 'Plan kennismakingsgesprek'
  const ctaButtonLink = data?.ctaButtonLink || '/contact'

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream to-peach-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            {heroSubtitle}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">{heroTitle}</h1>
          <p className="text-lg text-stone mt-6 max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Hoofdtarieven */}
      {tarieven.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-sage-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tarieven.map((tarief, index) => (
                <div
                  key={tarief.title}
                  className={`relative rounded-3xl p-8 ${
                    tarief.featured
                      ? 'bg-terracotta text-white shadow-xl scale-105 z-10'
                      : index === 0
                        ? 'bg-white border-2 border-sage-300 shadow-sm'
                        : 'bg-white border-2 border-peach-300 shadow-sm'
                  }`}
                >
                  {tarief.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-terracotta text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                        {tarief.featuredLabel || 'Meest gekozen'}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3
                      className={`font-serif text-xl ${tarief.featured ? 'text-white' : 'text-charcoal'}`}
                    >
                      {tarief.title}
                    </h3>
                    <div className="mt-4">
                      <span
                        className={`text-4xl font-bold ${tarief.featured ? 'text-white' : 'text-terracotta'}`}
                      >
                        {tarief.price}
                      </span>
                    </div>
                    {tarief.duration && (
                      <p className={`text-sm mt-2 ${tarief.featured ? 'text-sage-100' : 'text-stone'}`}>
                        {tarief.duration}
                      </p>
                    )}
                  </div>

                  {tarief.description && (
                    <p className={`text-center mb-6 ${tarief.featured ? 'text-sage-100' : 'text-stone'}`}>
                      {tarief.description}
                    </p>
                  )}

                  {tarief.includes && tarief.includes.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {tarief.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              tarief.featured ? 'text-peach-200' : 'text-sage-500'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className={tarief.featured ? 'text-sage-50' : 'text-charcoal'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={tarief.buttonLink || '/contact'}
                    className={`block w-full py-3 px-6 rounded-full font-medium text-center transition-all ${
                      tarief.featured
                        ? 'bg-white text-terracotta hover:bg-peach-100'
                        : 'bg-coral text-white hover:bg-coral-dark'
                    }`}
                  >
                    {tarief.buttonText || (tarief.price === 'Gratis' ? 'Plan gesprek' : 'Boek consult')}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pakket */}
      {pakketten.length > 0 && (
        <section className="py-16 md:py-24 px-4" style={{ backgroundColor: '#f5d5c8' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                {pakkettenTitle}
              </span>
              <h2 className="font-serif text-3xl text-charcoal mt-4">{pakkettenHeading}</h2>
            </div>

            {pakketten.map((pakket) => (
              <div
                key={pakket.title}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-terracotta/20"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal">{pakket.title}</h3>
                    {pakket.description && (
                      <p className="text-stone mt-2 max-w-lg">{pakket.description}</p>
                    )}
                    {pakket.note && (
                      <p className="text-sage-600 text-sm mt-2 font-medium">{pakket.note}</p>
                    )}
                  </div>
                  <div className="text-center md:text-right">
                    <div className="flex items-baseline gap-3 justify-center md:justify-end">
                      {pakket.originalPrice && (
                        <span className="text-stone line-through text-lg">
                          {pakket.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-terracotta">{pakket.price}</span>
                    </div>
                    {pakket.savings && <p className="text-sage-600 text-sm mt-1">{pakket.savings}</p>}
                    <Link
                      href={pakket.buttonLink || '/contact'}
                      className="inline-block mt-4 bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-coral-dark transition-colors"
                    >
                      {pakket.buttonText || 'Kies pakket'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Extra opties */}
      {extraOpties.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                Aanvullend
              </span>
              <h2 className="font-serif text-3xl text-charcoal mt-4">{extraTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extraOpties.map((optie) => (
                <div key={optie.title} className="bg-sage-50 rounded-2xl p-6 border border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-lg text-charcoal">{optie.title}</h3>
                    <span className="text-xl font-bold text-terracotta">{optie.price}</span>
                  </div>
                  {optie.duration && <p className="text-sm text-sage-600 mb-2">{optie.duration}</p>}
                  {optie.description && <p className="text-stone">{optie.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Belangrijke info */}
      {infoItems.length > 0 && (
        <section className="py-16 md:py-24 px-4" style={{ backgroundColor: '#e8efe9' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl text-charcoal text-center mb-8">{infoTitle}</h2>

            <div className="bg-white rounded-2xl p-8 border border-sage-300 space-y-4">
              {infoItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <InfoIcon type={item.icon} />
                  </div>
                  <p className="text-stone">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-terracotta via-terracotta-dark to-terracotta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{ctaTitle}</h2>
          <p className="text-sage-100 leading-relaxed mb-10 text-lg">{ctaDescription}</p>
          <Link
            href={ctaButtonLink}
            className="inline-flex items-center justify-center bg-coral text-white px-10 py-4 rounded-full font-medium hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {ctaButtonText}
          </Link>
        </div>
      </section>
    </div>
  )
}
