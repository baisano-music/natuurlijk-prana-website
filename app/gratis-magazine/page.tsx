import Link from 'next/link'
import { client, queries } from '@/lib/SanityClient'

export const revalidate = 60

export const metadata = {
  title: 'Gratis E-magazine | Natuurlijk Prana',
  description: 'Download het gratis PRANA e-magazine met tips over bloesemremedies, celzouten, interviews en recepten.',
}

type MagazinePage = {
  heroTitle?: string
  heroSubtitle?: string
  heroBadge?: string
  highlightsTitle?: string
  highlights?: {
    icon?: string
    title?: string
    description?: string
  }[]
  ctaTitle?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

// Icon mapping
function getIcon(iconName?: string) {
  const icons: Record<string, JSX.Element> = {
    lightbulb: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    chat: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    book: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gift: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    flower: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.5c-3.5 0-6.5-2-6.5-6.5S8.5 5.5 12 5.5s6.5 2 6.5 6.5-3 6.5-6.5 6.5zm0 0v3m-4-9.5c0 2.5 1.5 4 4 4s4-1.5 4-4" />
      </svg>
    ),
  }
  return icons[iconName || 'lightbulb'] || icons.lightbulb
}

// Default highlights als fallback
const defaultHighlights = [
  {
    icon: 'lightbulb',
    title: 'Praktische tips',
    description: 'Leuke en inspirerende tips over het gebruik van bloesemremedies en celzouten in het dagelijks leven.',
  },
  {
    icon: 'chat',
    title: 'Persoonlijk interview',
    description: 'Lees over mijn ervaringen met bloesemremedies en waarom ik hiermee werk.',
  },
  {
    icon: 'book',
    title: 'Recepten',
    description: 'Handige recepten en toepassingen die je direct kunt gebruiken.',
  },
  {
    icon: 'gift',
    title: 'Bonus voor kinderen',
    description: 'Speciale gratis download voor schoolgaande kinderen.',
  },
]

export default async function GratisMagazinePage() {
  const pageData: MagazinePage | null = await client.fetch(queries.magazinePage).catch(() => null)

  // Gebruik CMS data met fallbacks
  const heroTitle = pageData?.heroTitle || 'Gratis PRANA E-magazine'
  const heroSubtitle = pageData?.heroSubtitle || 'Ontvang inspiratie, praktische tips en persoonlijke verhalen over bloesemremedies en natuurlijke gezondheid — direct in je mailbox.'
  const heroBadge = pageData?.heroBadge || '100% Gratis'
  const highlightsTitle = pageData?.highlightsTitle || 'Wat zit er in het magazine?'
  const highlights = pageData?.highlights?.length ? pageData.highlights : defaultHighlights
  const ctaTitle = pageData?.ctaTitle || 'Liever persoonlijk advies?'
  const ctaText = pageData?.ctaText || 'Het e-magazine is een mooie eerste kennismaking. Wil je direct aan de slag met bloesemremedies die bij jouw situatie passen? Plan dan een gratis kennismakingsgesprek.'
  const ctaButtonText = pageData?.ctaButtonText || 'Plan een kennismakingsgesprek'
  const ctaButtonLink = pageData?.ctaButtonLink || '/contact'

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-peach-100 to-sage-100" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d28a58' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            {heroBadge}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            {heroTitle.includes(' ') ? (
              <>
                {heroTitle.split(' ').slice(0, -1).join(' ')}<br />
                {heroTitle.split(' ').slice(-1)}
              </>
            ) : heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-stone mt-6 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* MailerLite formulier - NU EERST */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-xl mx-auto">
          {/* MailerLite Embedded Form */}
          <div className="ml-embedded" data-form="WqWldg"></div>
        </div>
      </section>

      {/* Content highlights - NU ONDER HET FORMULIER */}
      <section className="py-16 md:py-24 px-4 bg-peach-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-charcoal">
              {highlightsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-peach-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600 mb-4">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-stone leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra info / CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-charcoal mb-6">
            {ctaTitle}
          </h2>
          <p className="text-stone mb-8 leading-relaxed">
            {ctaText}
          </p>
          <Link
            href={ctaButtonLink}
            className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
          >
            {ctaButtonText}
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
