import { client, queries } from '@/lib/SanityClient'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { urlFor } from '@/lib/sanity/image'

export const dynamic = 'force-dynamic'

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string } }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(800).height(600).url()
      return (
        <figure className="my-8">
          <div className="rounded-xl overflow-hidden bg-peach-100">
            <Image
              src={src}
              alt={value.alt || ''}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </figure>
      )
    },
  },
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function getDisclaimer(): Promise<string | null> {
  const settings = await client.fetch(queries.siteSettings)
  return settings?.blogDisclaimer || null
}

export default async function NieuwsArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, disclaimer] = await Promise.all([
    client.fetch(queries.blogPostBySlug(slug)),
    getDisclaimer(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link
          href="/nieuws"
          className="inline-block mb-8 text-sage-600 hover:text-terracotta font-medium transition-colors"
        >
          ← Terug naar nieuws
        </Link>

        <article className="bg-white shadow-sm rounded-2xl overflow-hidden border border-peach-200">
          {post.mainImageUrl && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.mainImageUrl}
                alt={post.title || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <p className="text-sm text-sage-500 uppercase tracking-wider mb-2">
              {formatDate(post.publishedAt)}
              {post.type && ` · ${post.type}`}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-stone italic">{post.excerpt}</p>
            )}

            {post.content && post.content.length > 0 && (
              <div className="mt-10 prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-stone prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline">
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>
            )}

            {/* Disclaimer */}
            {disclaimer && (
              <div className="mt-12 pt-8 border-t border-peach-200">
                <p className="text-[11px] text-stone/60 leading-relaxed whitespace-pre-line">
                  {disclaimer}
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
