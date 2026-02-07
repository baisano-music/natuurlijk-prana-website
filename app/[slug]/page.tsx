import { client, queries } from '@/lib/SanityClient'
import RichContent from '@/components/RichContent'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'

export const revalidate = 0

interface Page {
  _id: string
  title: string
  slug: string
  subtitle?: string
  mainImageUrl?: string
  content?: PortableTextBlock[]
  parentPage?: { title: string; slug: string }
  productCategory?: { title: string; slug: string }
  childPages?: { _id: string; title: string; slug: string }[]
  seo?: { title?: string; description?: string }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string): Promise<Page | null> {
  return client.fetch(queries.pageBySlugFull(slug))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return { title: 'Pagina niet gevonden' }
  }

  return {
    title: page.seo?.title || `${page.title} | Natuurlijk Prana`,
    description: page.seo?.description || page.subtitle || `${page.title} - Natuurlijk Prana`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream to-peach-50" />

        <div className="relative max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-stone flex-wrap">
              <li>
                <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
              </li>
              {page.productCategory && (
                <>
                  <li>/</li>
                  <li>
                    <Link href={`/producten/${page.productCategory.slug}`} className="hover:text-terracotta transition-colors">
                      {page.productCategory.title}
                    </Link>
                  </li>
                </>
              )}
              {page.parentPage && (
                <>
                  <li>/</li>
                  <li>
                    <Link href={`/${page.parentPage.slug}`} className="hover:text-terracotta transition-colors">
                      {page.parentPage.title}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-charcoal font-medium">{page.title}</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-xl text-stone mt-4 max-w-2xl mx-auto">
                {page.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main image */}
      {page.mainImageUrl && (
        <section className="px-4">
          <div className="max-w-4xl mx-auto -mt-4 mb-8">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={page.mainImageUrl}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <article className="bg-white rounded-2xl p-8 md:p-12 border border-peach-200 shadow-sm">
            {page.content && page.content.length > 0 ? (
              <RichContent content={page.content} />
            ) : (
              <p className="text-stone text-center py-8">
                Deze pagina heeft nog geen inhoud.
              </p>
            )}
          </article>
        </div>
      </section>

      {/* Child pages */}
      {page.childPages && page.childPages.length > 0 && (
        <section className="py-12 px-4 bg-sage-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-charcoal mb-8 text-center">
              Gerelateerde pagina's
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.childPages.map((child) => (
                <Link
                  key={child._id}
                  href={`/${child.slug}`}
                  className="bg-white rounded-xl p-6 border border-peach-200 hover:border-terracotta/30 hover:shadow-lg transition-all group"
                >
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-terracotta transition-colors">
                    {child.title}
                  </h3>
                  <span className="inline-flex items-center text-sm text-terracotta mt-2">
                    Lees meer
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-charcoal mb-4">
            Vragen of meer informatie?
          </h2>
          <p className="text-stone mb-8">
            Neem gerust contact op voor een vrijblijvend gesprek.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-coral-dark transition-colors"
          >
            Neem contact op
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
