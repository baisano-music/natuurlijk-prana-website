import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { FAQSection } from '@/components/FAQSection'

// Geen caching voor verse data
export const revalidate = 0

// Kleuren voor testimonial kaarten - meer uitgesproken
const testimonialColors = [
  'bg-gradient-to-br from-sage-100 to-sage-50 border-l-4 border-l-sage-500',
  'bg-gradient-to-br from-peach-100 to-peach-50 border-l-4 border-l-terracotta',
  'bg-gradient-to-br from-coral/15 to-peach-50 border-l-4 border-l-coral',
]

// PortableText configuratie voor simpele rich text
const simplePortableTextComponents = {
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => (
      <a href={value?.href} className="text-terracotta hover:text-terracotta-dark underline transition-colors">
        {children}
      </a>
    ),
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RichTextValue = string | any[] | undefined

// Helper om zowel string als PortableText te renderen
function RichTextOrString({ value, fallback, className }: { value: RichTextValue; fallback: string; className?: string }) {
  if (!value) {
    return <p className={className}>{fallback}</p>
  }

  // Als het een array is, gebruik PortableText
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        <PortableText value={value} components={simplePortableTextComponents} />
      </div>
    )
  }

  // Anders is het een string
  return <p className={className}>{value}</p>
}

interface HomepageData {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: RichTextValue
  heroImageUrl?: string
  heroVideoUrl?: string
  heroPrimaryButton?: { text?: string; link?: string }
  heroSecondaryButton?: { text?: string; link?: string }
  // E-magazine banner
  showMagazineBanner?: boolean
  magazineBannerTitle?: string
  magazineBannerSubtitle?: string
  magazineBannerButton?: { text?: string; link?: string }
  // Welkom
  welcomeLabel?: string
  welcomeTitle?: string
  welcomeText?: RichTextValue
  welcomeImageUrl?: string
  welcomeLink?: { text?: string; link?: string }
  // Remedies
  remediesLabel?: string
  remediesTitle?: string
  remediesSubtitle?: string
  remediesCount?: number
  remediesButton?: { text?: string; link?: string }
  // Testimonials
  testimonialsLabel?: string
  testimonialsTitle?: string
  testimonialsSubtitle?: string
  showTestimonials?: boolean
  testimonialsLink?: { text?: string; link?: string }
  // Nieuws
  newsLabel?: string
  newsTitle?: string
  newsSubtitle?: string
  showNews?: boolean
  newsCount?: number
  newsLink?: { text?: string; link?: string }
  // FAQ
  faqLabel?: string
  faqTitle?: string
  faqSubtitle?: string
  showFaq?: boolean
  faqLink?: { text?: string; link?: string }
  // CTA
  ctaTitle?: string
  ctaText?: RichTextValue
  ctaButton?: { text?: string; link?: string }
  ctaImageUrl?: string
}

interface Remedie {
  _id: string
  title: string | null
  slug: string | null
  kernkwaliteit: string | null
  werking: string | null
  imageUrl: string | null
}

interface Testimonial {
  _id: string
  name?: string
  initials?: string
  quote: string
  context?: string
}

interface BlogPost {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  mainImageUrl: string | null
  type: string | null
}

interface FAQItem {
  _id: string
  question: string
  answer?: unknown[]
  shortAnswer?: string
  category?: string
}

async function getHomepageData(): Promise<HomepageData | null> {
  return client.fetch(queries.homepage)
}

async function getFeaturedRemedies(count: number): Promise<Remedie[]> {
  return client.fetch(queries.remediesFeatured(count))
}

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(queries.testimonialsFeatured)
}

async function getFeaturedBlogPosts(count: number): Promise<BlogPost[]> {
  return client.fetch(queries.blogPostsFeatured(count))
}

async function getFeaturedFAQs(): Promise<FAQItem[]> {
  return client.fetch(queries.faqFeatured)
}

// Datum formatter
function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function HomePage() {
  const homepage = await getHomepageData()
  const remediesCount = homepage?.remediesCount || 3
  const newsCount = homepage?.newsCount || 3
  const [remedies, testimonials, blogPosts, faqs] = await Promise.all([
    getFeaturedRemedies(remediesCount),
    getFeaturedTestimonials(),
    getFeaturedBlogPosts(newsCount),
    getFeaturedFAQs(),
  ])

  // Default waarden als er nog geen content in Sanity staat
  const heroTitle = homepage?.heroTitle || 'Natuurlijk Prana'
  const heroSubtitle = homepage?.heroSubtitle || 'Bloesemremedies voor innerlijke balans'
  const heroDescription = homepage?.heroDescription
  const heroDescriptionFallback = 'Voor iedereen die op zoek is naar rust, warmte en ondersteuning — of je nu moeder bent, hoogsensitief of gewoon behoefte hebt aan een zachte steun in de rug.'
  const primaryButton = homepage?.heroPrimaryButton || { text: 'Bekijk bloesemremedies →', link: '/remedies' }
  const secondaryButton = homepage?.heroSecondaryButton || { text: 'Kennismakingsgesprek', link: '/contact' }

  // E-magazine banner
  const showMagazineBanner = homepage?.showMagazineBanner !== false
  const magazineBannerTitle = homepage?.magazineBannerTitle || 'Gratis PRANA E-magazine'
  const magazineBannerSubtitle = homepage?.magazineBannerSubtitle || 'Tips, recepten en inspiratie over bloesemremedies'
  const magazineBannerButton = homepage?.magazineBannerButton || { text: 'Download gratis', link: '/gratis-magazine' }

  // Welkom
  const welcomeLabel = homepage?.welcomeLabel || 'Welkom'
  const welcomeTitle = homepage?.welcomeTitle || 'Welkom'
  const welcomeText = homepage?.welcomeText
  const welcomeTextFallback = 'Op deze site vind je onze collectie bloesemremedies. Elke remedie ondersteunt een bepaalde innerlijke staat en helpt je in balans te komen. De remedies werken laag voor laag, op een manier die bij je past.'
  const welcomeLink = homepage?.welcomeLink || { text: 'Meer over mij', link: '/over-mij' }

  // Remedies
  const remediesLabel = homepage?.remediesLabel || 'Collectie'
  const remediesTitle = homepage?.remediesTitle || 'Ontdek onze remedies'
  const remediesSubtitle = homepage?.remediesSubtitle || 'Elke remedie heeft een unieke kernkwaliteit en werking.'
  const remediesButton = homepage?.remediesButton || { text: 'Bekijk alle remedies', link: '/remedies' }

  // Testimonials
  const testimonialsLabel = homepage?.testimonialsLabel || 'Ervaringen'
  const testimonialsTitle = homepage?.testimonialsTitle || 'Wat anderen zeggen'
  const testimonialsSubtitle = homepage?.testimonialsSubtitle || 'Ervaringen van ouders en kinderen'
  const showTestimonials = homepage?.showTestimonials !== false
  const testimonialsLink = homepage?.testimonialsLink || { text: 'Lees meer ervaringen', link: '/ervaringen' }

  // Nieuws
  const newsLabel = homepage?.newsLabel || 'Nieuws'
  const newsTitle = homepage?.newsTitle || 'Laatste nieuws'
  const newsSubtitle = homepage?.newsSubtitle || 'Verhalen, inzichten en tips over bloesemremedies'
  const showNews = homepage?.showNews !== false
  const newsLink = homepage?.newsLink || { text: 'Bekijk alle artikelen', link: '/nieuws' }

  // FAQ
  const faqTitle = homepage?.faqTitle || 'Veelgestelde vragen'
  const faqSubtitle = homepage?.faqSubtitle || 'Antwoorden op de meest gestelde vragen over bloesemremedies'
  const showFaq = homepage?.showFaq !== false
  const faqLink = homepage?.faqLink || { text: 'Bekijk alle vragen', link: '/faq' }

  // CTA
  const ctaTitle = homepage?.ctaTitle || 'Benieuwd welke remedie bij jou past?'
  const ctaText = homepage?.ctaText
  const ctaTextFallback = 'Ik bied een vrijblijvend en kosteloos kennismakingsgesprek aan. Samen kijken we wat je nodig hebt.'
  const ctaButton = homepage?.ctaButton || { text: 'Neem contact op', link: '/contact' }

  const heroImageUrl = homepage?.heroImageUrl
  const heroVideoUrl = homepage?.heroVideoUrl
  const welcomeImageUrl = homepage?.welcomeImageUrl
  const ctaImageUrl = homepage?.ctaImageUrl

  return (
    <div>
      {/* Hero - Fullscreen met video of afbeelding */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Achtergrond: Video heeft prioriteit, daarna afbeelding, dan gradient */}
        {heroVideoUrl ? (
          <>
            {/* Video achtergrond */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroImageUrl || undefined}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
            {/* Gradient overlay voor betere leesbaarheid */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
          </>
        ) : heroImageUrl ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImageUrl}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: 'center 30%' }}
                priority
              />
            </div>
            {/* Gradient overlay voor betere leesbaarheid */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-terracotta-dark to-terracotta" />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="mt-6 text-2xl md:text-3xl text-peach-100 font-medium drop-shadow-md">
            {heroSubtitle}
          </p>
          <div className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow [&_p]:mb-0">
            <RichTextOrString value={heroDescription} fallback={heroDescriptionFallback} />
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButton.link || '/remedies'}
              className="inline-flex items-center justify-center bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta hover:text-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {primaryButton.text || 'Bekijk bloesemremedies →'}
            </Link>
            <Link
              href={secondaryButton.link || '/contact'}
              className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-charcoal hover:border-white transition-all"
            >
              {secondaryButton.text || 'Kennismakingsgesprek'}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Actie banner - Gratis E-magazine */}
      {showMagazineBanner && (
        <section className="bg-terracotta py-6 md:py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/10 items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-lg">{magazineBannerTitle}</p>
                  <p className="text-white/80 text-sm">{magazineBannerSubtitle}</p>
                </div>
              </div>
              <Link
                href={magazineBannerButton.link || '/gratis-magazine'}
                className="inline-flex items-center bg-white text-terracotta-dark px-6 py-2.5 rounded-full font-medium hover:bg-cream hover:text-charcoal transition-colors shadow-sm whitespace-nowrap"
              >
                {magazineBannerButton.text || 'Download gratis'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Welkom - Split layout met ingekaderde afbeelding */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Afbeelding kant */}
          <div className="flex items-center justify-center order-2 lg:order-1 bg-sage-100 py-16 lg:py-24 px-8">
            {welcomeImageUrl ? (
              <div className="relative">
                {/* Decoratief kader achter de foto */}
                <div className="absolute -inset-4 bg-white/60 rounded-2xl shadow-lg" />
                <div className="absolute -inset-2 bg-gradient-to-br from-terracotta/20 to-peach-200/40 rounded-xl" />
                {/* Foto */}
                <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-xl overflow-hidden shadow-xl ring-4 ring-white">
                  <Image
                    src={welcomeImageUrl}
                    alt="Sandy Hof-Teeuwen"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-64 h-80 md:w-72 md:h-96 bg-gradient-to-br from-sage-200 via-sage-100 to-peach-100 rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-center text-sage-600 p-8">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-sm italic">Voeg een afbeelding toe</p>
                </div>
              </div>
            )}
          </div>

          {/* Tekst kant */}
          <div className="flex items-center order-1 lg:order-2 bg-cream">
            <div className="max-w-xl mx-auto px-8 py-16 lg:py-24 lg:px-16">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                {welcomeLabel}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4 mb-8">
                {welcomeTitle}
              </h2>
              <div className="text-stone leading-relaxed text-lg [&_p]:mb-4 [&_p:last-child]:mb-0">
                <RichTextOrString value={welcomeText} fallback={welcomeTextFallback} />
              </div>
              <Link
                href={welcomeLink.link || '/over-mij'}
                className="inline-flex items-center mt-8 text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                {welcomeLink.text || 'Meer over mij'}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Uitgelichte remedies */}
      {remedies.length > 0 && (
        <section className="py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                {remediesLabel}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4">
                {remediesTitle}
              </h2>
              <p className="text-stone max-w-2xl mx-auto mt-4">
                {remediesSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {remedies.map((remedie) => {
                const slug = remedie.slug || remedie._id
                return (
                  <Link
                    key={remedie._id}
                    href={`/remedies/${slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-sage-100">
                      {remedie.imageUrl ? (
                        <Image
                          src={remedie.imageUrl}
                          alt={remedie.title || ''}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage-100 to-peach-100">
                          <span className="text-terracotta text-6xl font-serif">
                            {remedie.title?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white font-medium">Bekijk remedie →</span>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors">
                      {remedie.title || 'Zonder titel'}
                    </h3>
                    {remedie.kernkwaliteit && (
                      <p className="text-sage-600 mt-1 italic">
                        {remedie.kernkwaliteit}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-16">
              <Link
                href={remediesButton.link || '/remedies'}
                className="inline-flex items-center justify-center bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                {remediesButton.text || 'Bekijk alle remedies'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ervaringen met achtergrondpatroon */}
      {showTestimonials && testimonials.length > 0 && (
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          {/* Decoratieve achtergrond */}
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream to-peach-50" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d28a58' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                {testimonialsLabel}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4">
                {testimonialsTitle}
              </h2>
              <p className="text-stone max-w-2xl mx-auto mt-4">
                {testimonialsSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className={`rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${testimonialColors[index % testimonialColors.length]}`}
                >
                  <div className="text-terracotta text-5xl font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-charcoal leading-relaxed mb-6 text-lg font-medium">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-charcoal/10 pt-4">
                    <p className="font-bold text-charcoal">
                      {testimonial.name || testimonial.initials || 'Anoniem'}
                    </p>
                    {testimonial.context && (
                      <p className="text-sm text-terracotta font-medium">{testimonial.context}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href={testimonialsLink.link || '/ervaringen'}
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                {testimonialsLink.text || 'Lees meer ervaringen'}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Laatste nieuws */}
      {showNews && blogPosts.length > 0 && (
        <section className="py-20 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
                {newsLabel}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4">
                {newsTitle}
              </h2>
              <p className="text-stone max-w-2xl mx-auto mt-4">
                {newsSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const slug = post.slug || post._id
                return (
                  <article
                    key={post._id}
                    className="group bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-peach-100 hover:border-terracotta/30"
                  >
                    <Link href={`/nieuws/${slug}`} className="block">
                      {post.mainImageUrl ? (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.mainImageUrl}
                            alt={post.title || ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-sage-100 to-peach-100 flex items-center justify-center">
                          <span className="text-terracotta text-4xl font-serif">
                            {post.title?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs text-sage-500 uppercase tracking-wider mb-2">
                          {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
                          {post.title || 'Zonder titel'}
                        </h3>
                        {post.excerpt && (
                          <p className="text-stone text-sm mt-3 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link
                href={newsLink.link || '/nieuws'}
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                {newsLink.text || 'Bekijk alle artikelen'}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Veelgestelde vragen */}
      {showFaq && faqs.length > 0 && (
        <div className="bg-cream">
          <FAQSection
            items={faqs}
            title={faqTitle}
            subtitle={faqSubtitle}
            showMoreLink={faqLink}
            className="py-20 md:py-28"
          />
        </div>
      )}

      {/* CTA met achtergrondafbeelding */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {ctaImageUrl ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={ctaImageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-sage-900/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-terracotta-dark to-terracotta" />
        )}

        <div className="relative z-10 max-w-2xl mx-auto text-center px-4 py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 drop-shadow-lg">
            {ctaTitle}
          </h2>
          <div className="text-white/90 leading-relaxed mb-10 text-lg drop-shadow [&_p]:mb-0">
            <RichTextOrString value={ctaText} fallback={ctaTextFallback} />
          </div>
          <Link
            href={ctaButton.link || '/contact'}
            className="inline-flex items-center justify-center bg-coral text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-terracotta transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {ctaButton.text || 'Neem contact op'}
          </Link>
        </div>
      </section>
    </div>
  )
}
