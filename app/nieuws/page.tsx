import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'
import Image from 'next/image'

// Revalidate elke 60 seconden voor Pagefind indexering
export const revalidate = 60

const PER_PAGE = 12

interface PageSettings {
  title?: string
  subtitle?: string
  ctaTitle?: string
  ctaText?: string
  ctaButton?: { text?: string; link?: string }
}

async function getBlogPosts(page: number) {
  const start = (page - 1) * PER_PAGE
  const end = start + PER_PAGE - 1
  const [posts, total] = await Promise.all([
    client.fetch(queries.blogPostsPaginated(start, end)),
    client.fetch(queries.blogPostsCount),
  ])
  return { posts, total }
}

async function getPageSettings(): Promise<PageSettings | null> {
  return client.fetch(queries.pageSettings('nieuws'))
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NieuwsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const pageNum = Math.max(1, parseInt(params.page || '1', 10))
  const [{ posts, total }, settings] = await Promise.all([
    getBlogPosts(pageNum),
    getPageSettings(),
  ])
  const totalPages = Math.ceil(total / PER_PAGE)

  // CMS waarden met fallbacks
  const pageTitle = settings?.title || 'Nieuws en inspiratie'
  const pageSubtitle = settings?.subtitle || 'Verhalen, inzichten en tips over bloesemremedies en innerlijke balans.'
  const ctaTitle = settings?.ctaTitle || 'Blijf op de hoogte'
  const ctaText = settings?.ctaText || 'Volg ons voor nieuwe verhalen en inzichten over bloesemremedies.'
  const ctaButton = settings?.ctaButton || { text: 'Neem contact op', link: '/contact' }

  return (
    <div className="min-h-[60vh]">
      {/* Hero header */}
      <section className="bg-gradient-to-br from-peach-100 via-cream to-sage-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            Blog
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">
            {pageTitle}
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto mt-6 italic">
            {pageSubtitle}
          </p>
        </div>
      </section>

      <div className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {posts.length === 0 ? (
          <div className="p-12 md:p-16 bg-white rounded-2xl text-center shadow-sm border border-peach-200">
            <p className="text-stone mb-4 text-lg">
              Er zijn nog geen nieuwsberichten.
            </p>
            <Link
              href="/studio"
              className="text-sage-600 font-medium underline hover:text-terracotta transition-colors"
            >
              Ga naar Studio om content toe te voegen
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: { _id: string; title: string | null; type: string | null; slug: string | null; publishedAt: string | null; excerpt: string | null; mainImageUrl: string | null }) => {
                const slug = post.slug || post._id
                return (
                  <article
                    key={post._id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-peach-200 hover:border-terracotta/30"
                  >
                    <Link href={`/nieuws/${slug}`} className="block">
                      {post.mainImageUrl ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-peach-100">
                          <Image
                            src={post.mainImageUrl}
                            alt={post.title || ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-peach-100 flex items-center justify-center">
                          <span className="text-terracotta text-4xl font-serif">
                            {post.title?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs text-sage-500 uppercase tracking-wider mb-2">
                          {formatDate(post.publishedAt)}
                          {post.type && ` · ${post.type}`}
                        </p>
                        <h2 className="font-serif text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
                          {post.title || 'Zonder titel'}
                        </h2>
                        {post.excerpt && (
                          <p className="text-stone text-sm mt-2 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2" aria-label="Paginatie nieuws">
                {pageNum > 1 && (
                  <Link
                    href={pageNum === 2 ? '/nieuws' : `/nieuws?page=${pageNum - 1}`}
                    className="px-4 py-2 rounded-lg border border-peach-200 text-sage-600 hover:bg-peach-100 hover:border-terracotta/30 transition-colors"
                  >
                    Vorige
                  </Link>
                )}
                <span className="px-4 py-2 text-stone">
                  Pagina {pageNum} van {totalPages}
                </span>
                {pageNum < totalPages && (
                  <Link
                    href={`/nieuws?page=${pageNum + 1}`}
                    className="px-4 py-2 rounded-lg border border-peach-200 text-sage-600 hover:bg-peach-100 hover:border-terracotta/30 transition-colors"
                  >
                    Volgende
                  </Link>
                )}
              </nav>
            )}
          </>
        )}

        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sage-100 via-sage-50 to-peach-50 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {ctaTitle}
          </h3>
          <p className="text-stone mb-8 max-w-xl mx-auto leading-relaxed">
            {ctaText}
          </p>
          <Link
            href={ctaButton.link || '/contact'}
            className="inline-block bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors shadow-md hover:shadow-lg"
          >
            {ctaButton.text || 'Neem contact op'}
          </Link>
        </div>
      </section>
    </div>
  )
}
