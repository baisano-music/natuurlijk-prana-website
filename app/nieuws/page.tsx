import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const PER_PAGE = 12

async function getBlogPosts(page: number) {
  const start = (page - 1) * PER_PAGE
  const end = start + PER_PAGE - 1
  const [posts, total] = await Promise.all([
    client.fetch(queries.blogPostsPaginated(start, end)),
    client.fetch(queries.blogPostsCount),
  ])
  return { posts, total }
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
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const { posts, total } = await getBlogPosts(page)
  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <header className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Nieuws en inspiratie
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto italic">
            Verhalen, inzichten en tips over bloesemremedies en innerlijke balans.
          </p>
        </header>

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
                {page > 1 && (
                  <Link
                    href={page === 2 ? '/nieuws' : `/nieuws?page=${page - 1}`}
                    className="px-4 py-2 rounded-lg border border-peach-200 text-sage-600 hover:bg-peach-100 hover:border-terracotta/30 transition-colors"
                  >
                    Vorige
                  </Link>
                )}
                <span className="px-4 py-2 text-stone">
                  Pagina {page} van {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/nieuws?page=${page + 1}`}
                    className="px-4 py-2 rounded-lg border border-peach-200 text-sage-600 hover:bg-peach-100 hover:border-terracotta/30 transition-colors"
                  >
                    Volgende
                  </Link>
                )}
              </nav>
            )}
          </>
        )}

        <section className="mt-20 p-10 md:p-14 bg-white rounded-2xl text-center shadow-sm border border-peach-200">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            Blijf op de hoogte
          </h3>
          <p className="text-stone mb-6 max-w-xl mx-auto leading-relaxed">
            Volg ons voor nieuwe verhalen en inzichten over bloesemremedies.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-coral text-white px-8 py-4 rounded-full font-medium hover:bg-coral-dark transition-colors shadow-md hover:shadow-lg"
          >
            Neem contact op
          </Link>
        </section>
      </div>
    </div>
  )
}
