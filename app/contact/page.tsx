import Link from 'next/link'
import Image from 'next/image'
import { ContactForm } from '@/components/ContactForm'
import { client, queries } from '@/lib/SanityClient'

export const revalidate = 0

type SiteSettings = {
  contactInfo?: {
    email?: string | null
    phone?: string | null
    address?: string | null
  } | null
  openingHours?: string | null
}

type OverMijPage = {
  mainImageUrl?: string | null
  title?: string | null
}

type PageSettings = {
  title?: string
  subtitle?: string
  formTitle?: string
  kennismakingTitle?: string
  kennismakingText?: string
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(queries.siteSettings)
}

async function getOverMijImage(): Promise<OverMijPage | null> {
  return client.fetch(`*[_type == "page" && slug.current == "over-mij"][0]{
    "mainImageUrl": mainImage.asset->url,
    title
  }`)
}

async function getPageSettings(): Promise<PageSettings | null> {
  return client.fetch(queries.pageSettings('contact'))
}

export default async function ContactPage() {
  const [settings, overMij, pageSettings] = await Promise.all([
    getSiteSettings(),
    getOverMijImage(),
    getPageSettings(),
  ])
  const contact = settings?.contactInfo
  const opening = settings?.openingHours
  const sandyImage = overMij?.mainImageUrl

  // CMS waarden met fallbacks
  const pageTitle = pageSettings?.title || 'Contact'
  const pageSubtitle = pageSettings?.subtitle || 'Benieuwd welke remedie bij jou past? Ik bied een vrijblijvend en kosteloos kennismakingsgesprek aan. Neem gerust contact op.'
  const formTitle = pageSettings?.formTitle || 'Stuur een bericht'
  const kennismakingTitle = pageSettings?.kennismakingTitle || 'Gratis kennismaking'
  const kennismakingText = pageSettings?.kennismakingText || 'Wil je eerst even kennismaken? Ik bied een vrijblijvend en kosteloos gesprek aan om te kijken of bloesemremedies iets voor jou kunnen betekenen.'

  return (
    <div className="min-h-[60vh]">
      {/* Hero header met gradient */}
      <section className="bg-gradient-to-br from-sage-100 via-cream to-peach-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            Neem contact op
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">
            {pageTitle}
          </h1>
          <p className="text-stone leading-relaxed max-w-2xl mx-auto text-lg mt-6">
            {pageSubtitle}
          </p>
        </div>
      </section>

      <div className="bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Contactformulier */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-peach-100">
              <h2 className="font-serif text-xl text-charcoal mb-6">
                {formTitle}
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contactgegevens */}
          <div className="md:col-span-2 space-y-6">
            {/* Direct contact */}
            <div className="bg-sage-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl text-charcoal mb-4">
                Direct contact
              </h2>
              <div className="space-y-4">
                {contact?.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-stone mb-1">E-mail</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-charcoal hover:text-terracotta transition-colors font-medium"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-stone mb-1">Telefoon</p>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-charcoal hover:text-terracotta transition-colors font-medium"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contact?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-stone mb-1">Adres</p>
                      <p className="text-charcoal whitespace-pre-line">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Foto Sandy */}
              {sandyImage && (
                <div className="mt-6 pt-6 border-t border-sage-200">
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 ring-3 ring-white shadow-lg">
                      <Image
                        src={sandyImage}
                        alt="Sandy Hof-Teeuwen"
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal text-lg">Sandy Hof-Teeuwen</p>
                      <p className="text-stone">Natuurlijk Prana</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Openingstijden */}
            {opening && (
              <div className="bg-peach-50 rounded-2xl p-6 md:p-8">
                <h2 className="font-serif text-xl text-charcoal mb-4">
                  Openingstijden
                </h2>
                <p className="text-stone whitespace-pre-line text-sm leading-relaxed">
                  {opening}
                </p>
              </div>
            )}

            {/* Kennismakingsgesprek */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-sage-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal">{kennismakingTitle}</h3>
              </div>
              <p className="text-stone text-sm leading-relaxed">
                {kennismakingText}
              </p>
            </div>
          </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sage-600 hover:text-terracotta font-medium transition-colors"
            >
              ← Terug naar home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
