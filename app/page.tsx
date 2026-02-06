import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'
import Image from 'next/image'

interface HomepageData {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImageUrl?: string
  heroPrimaryButton?: { text?: string; link?: string }
  heroSecondaryButton?: { text?: string; link?: string }
  welcomeTitle?: string
  welcomeText?: string
  remediesTitle?: string
  remediesSubtitle?: string
  remediesCount?: number
  ctaTitle?: string
  ctaText?: string
  ctaButton?: { text?: string; link?: string }
}

interface Remedie {
  _id: string
  title: string | null
  slug: string | null
  kernkwaliteit: string | null
  werking: string | null
  imageUrl: string | null
}

async function getHomepageData(): Promise<HomepageData | null> {
  return client.fetch(queries.homepage)
}

async function getFeaturedRemedies(count: number): Promise<Remedie[]> {
  return client.fetch(queries.remediesFeatured(count))
}

export default async function HomePage() {
  const homepage = await getHomepageData()
  const remediesCount = homepage?.remediesCount || 4
  const remedies = await getFeaturedRemedies(remediesCount)

  // Default waarden als er nog geen content in Sanity staat
  const heroTitle = homepage?.heroTitle || 'Natuurlijk Prana'
  const heroSubtitle = homepage?.heroSubtitle || 'Bloesemremedies voor innerlijke balans'
  const heroDescription = homepage?.heroDescription || 'Voor iedereen die op zoek is naar rust, warmte en ondersteuning — of je nu moeder bent, hoogsensitief of gewoon behoefte hebt aan een zachte steun in de rug.'
  const primaryButton = homepage?.heroPrimaryButton || { text: 'Bekijk bloesemremedies →', link: '/remedies' }
  const secondaryButton = homepage?.heroSecondaryButton || { text: 'Kennismakingsgesprek', link: '/contact' }
  const welcomeTitle = homepage?.welcomeTitle || 'Welkom'
  const welcomeText = homepage?.welcomeText || 'Op deze site vind je onze collectie bloesemremedies. Elke remedie ondersteunt een bepaalde innerlijke staat en helpt je in balans te komen. De remedies werken laag voor laag, op een manier die bij je past.'
  const remediesTitle = homepage?.remediesTitle || 'Ontdek onze remedies'
  const remediesSubtitle = homepage?.remediesSubtitle || 'Elke remedie heeft een unieke kernkwaliteit en werking.'
  const ctaTitle = homepage?.ctaTitle || 'Benieuwd welke remedie bij jou past?'
  const ctaText = homepage?.ctaText || 'Ik bied een vrijblijvend en kosteloos kennismakingsgesprek aan. Samen kijken we wat je nodig hebt.'
  const ctaButton = homepage?.ctaButton || { text: 'Neem contact op', link: '/contact' }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-warm py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-terracotta font-medium">
            {heroSubtitle}
          </p>
          <p className="mt-4 text-stone max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButton.link || '/remedies'}
              className="inline-flex items-center justify-center bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-md hover:shadow-lg"
            >
              {primaryButton.text || 'Bekijk bloesemremedies →'}
            </Link>
            <Link
              href={secondaryButton.link || '/contact'}
              className="inline-flex items-center justify-center border-2 border-terracotta text-terracotta px-8 py-4 rounded-full font-medium hover:bg-peach-100 hover:border-terracotta-dark transition-colors"
            >
              {secondaryButton.text || 'Kennismakingsgesprek'}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
            {welcomeTitle}
          </h2>
          <p className="text-stone leading-relaxed text-lg">
            {welcomeText}
          </p>
        </div>
      </section>

      {/* Uitgelichte remedies */}
      {remedies.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-peach-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-4">
              {remediesTitle}
            </h2>
            <p className="text-stone text-center max-w-2xl mx-auto mb-12">
              {remediesSubtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {remedies.map((remedie) => {
                const slug = remedie.slug || remedie._id
                return (
                  <Link
                    key={remedie._id}
                    href={`/remedies/${slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-peach-200 hover:border-terracotta/30"
                  >
                    {remedie.imageUrl ? (
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-peach-100">
                        <Image
                          src={remedie.imageUrl}
                          alt={remedie.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square rounded-xl bg-peach-100 mb-4 flex items-center justify-center">
                        <span className="text-terracotta text-4xl font-serif">
                          {remedie.title?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-terracotta">
                      {remedie.title || 'Zonder titel'}
                    </h3>
                    {remedie.kernkwaliteit && (
                      <p className="text-sm text-sage-600 mt-1 italic">
                        {remedie.kernkwaliteit}
                      </p>
                    )}
                    {remedie.werking && (
                      <p className="text-stone text-sm mt-3 line-clamp-2 leading-relaxed">
                        {remedie.werking}
                      </p>
                    )}
                    <span className="inline-block mt-4 text-sage-600 font-medium text-sm group-hover:text-terracotta transition-colors">
                      Lees meer →
                    </span>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/remedies"
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors"
              >
                Bekijk alle remedies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-peach-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {ctaTitle}
          </h2>
          <p className="text-stone leading-relaxed mb-8">
            {ctaText}
          </p>
          <Link
            href={ctaButton.link || '/contact'}
            className="inline-flex items-center justify-center bg-terracotta text-white px-10 py-4 rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-md hover:shadow-lg"
          >
            {ctaButton.text || 'Neem contact op'}
          </Link>
        </div>
      </section>
    </div>
  )
}
