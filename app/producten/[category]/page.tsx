import { client, queries } from '@/lib/SanityClient'
import { urlFor } from '@/lib/sanity/image'
import RichContent from '@/components/RichContent'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/types'

export const revalidate = 0

interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  imageUrl?: string
  parent?: { _id: string; title: string; slug: string }
  content?: PortableTextBlock[]
}

interface Product {
  _id: string
  title: string
  slug: string
  kernkwaliteit?: string
  werking?: string
  imageUrl?: string
  shortDescription?: string
}

interface ShopProduct {
  _id: string
  title: string
  slug: string
  imageUrl?: string
  shortDescription?: string
  price?: string
  priceNote?: string
  shopUrl?: string
  shopButtonText?: string
  inStock?: boolean
}

interface RelatedPage {
  _id: string
  title: string
  slug: string
  subtitle?: string
  mainImageUrl?: string
}

interface PageProps {
  params: Promise<{ category: string }>
}

async function getCategory(slug: string): Promise<Category | null> {
  return client.fetch(queries.productCategoryBySlug(slug))
}

async function getProducts(slug: string): Promise<Product[]> {
  return client.fetch(queries.productsByCategorySlug(slug))
}

async function getShopProducts(slug: string): Promise<ShopProduct[]> {
  return client.fetch(queries.shopProductsByCategorySlug(slug))
}

async function getSubcategories(categoryId: string) {
  return client.fetch(`*[_type == "productCategory" && parent._ref == "${categoryId}"] | order(order asc) {
    _id, title, "slug": slug.current, description,
    "imageUrl": image.asset->url
  }`)
}

async function getRelatedPages(slug: string): Promise<RelatedPage[]> {
  return client.fetch(queries.pagesByCategory(slug))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = await getCategory(categorySlug)

  if (!category) {
    return { title: 'Categorie niet gevonden' }
  }

  return {
    title: `${category.title} | Producten | Natuurlijk Prana`,
    description: category.description || `Ontdek onze ${category.title} collectie bij Natuurlijk Prana.`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const category = await getCategory(categorySlug)

  if (!category) {
    notFound()
  }

  const [products, shopProducts, subcategories, relatedPages] = await Promise.all([
    getProducts(categorySlug),
    getShopProducts(categorySlug),
    getSubcategories(category._id),
    getRelatedPages(categorySlug),
  ])

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-peach-50 to-cream" />

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-stone">
              <li>
                <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/producten" className="hover:text-terracotta transition-colors">Producten</Link>
              </li>
              {category.parent && (
                <>
                  <li>/</li>
                  <li>
                    <Link href={`/producten/${category.parent.slug}`} className="hover:text-terracotta transition-colors">
                      {category.parent.title}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-charcoal font-medium">{category.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-sage-100 text-sage-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                {category.parent ? category.parent.title : 'Productcategorie'}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-lg text-stone mt-4 leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>

            {category.imageUrl && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content if available */}
      {category.content && category.content.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-peach-200 shadow-sm">
            <RichContent content={category.content} />
          </div>
        </section>
      )}

      {/* Subcategories */}
      {subcategories && subcategories.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 text-center">
              Subcategorieën
            </h2>
            <div className={`grid gap-8 ${
              subcategories.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : subcategories.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {subcategories.map((sub: Category) => (
                <Link
                  key={sub._id}
                  href={`/producten/${sub.slug}`}
                  className="group bg-white rounded-2xl p-8 border border-peach-200 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {sub.imageUrl ? (
                      <div className="w-28 h-28 rounded-2xl overflow-hidden mb-5 shadow-md group-hover:shadow-lg transition-shadow">
                        <Image
                          src={sub.imageUrl}
                          alt={sub.title}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center mb-5">
                        <svg className="w-12 h-12 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-terracotta transition-colors mb-2">
                      {sub.title}
                    </h3>
                    {sub.description && (
                      <p className="text-stone text-sm leading-relaxed line-clamp-3">
                        {sub.description}
                      </p>
                    )}
                    <span className="inline-flex items-center text-sm text-terracotta mt-4 font-medium group-hover:text-terracotta-dark">
                      Bekijk categorie
                      <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Pages / Info pagina's */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 text-center">
              Meer informatie
            </h2>
            <div className={`grid gap-6 ${
              relatedPages.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : relatedPages.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {relatedPages.map((page: RelatedPage) => (
                <Link
                  key={page._id}
                  href={`/${page.slug}`}
                  className="group bg-cream rounded-xl p-6 border border-peach-200 hover:border-terracotta/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    {page.mainImageUrl ? (
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <Image
                          src={page.mainImageUrl}
                          alt={page.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-10 h-10 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-charcoal group-hover:text-terracotta transition-colors">
                        {page.title}
                      </h3>
                      {page.subtitle && (
                        <p className="text-sm text-stone mt-1 line-clamp-2">
                          {page.subtitle}
                        </p>
                      )}
                      <span className="inline-flex items-center text-sm text-terracotta mt-3 font-medium group-hover:text-terracotta-dark">
                        Lees meer
                        <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid - Remedies */}
      {products.length > 0 && (
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              {category.title} remedies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/remedies/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-peach-200 hover:border-terracotta/30 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-sage-50">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-charcoal group-hover:text-terracotta transition-colors">
                      {product.title}
                    </h3>
                    {product.kernkwaliteit && (
                      <p className="text-sm text-terracotta mt-1">
                        {product.kernkwaliteit}
                      </p>
                    )}
                    {(product.shortDescription || product.werking) && (
                      <p className="text-sm text-stone mt-2 line-clamp-2">
                        {product.shortDescription || product.werking}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shop Products Grid */}
      {shopProducts.length > 0 && (
        <section className="py-12 md:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8 text-center">
              {category.title} producten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shopProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-cream rounded-2xl overflow-hidden border border-peach-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-sage-50">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-3 right-3 bg-stone/80 text-white text-xs px-2 py-1 rounded">
                        Uitverkocht
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-charcoal">
                      {product.title}
                    </h3>
                    {product.shortDescription && (
                      <p className="text-sm text-stone mt-2 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                    {product.price && (
                      <div className="mt-3">
                        <span className="text-lg font-semibold text-terracotta">{product.price}</span>
                        {product.priceNote && (
                          <span className="text-xs text-stone ml-1">{product.priceNote}</span>
                        )}
                      </div>
                    )}
                    {product.shopUrl && (
                      <a
                        href={product.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center w-full bg-coral text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-coral-dark transition-colors"
                      >
                        {product.shopButtonText || 'Bekijk in shop'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state when no products */}
      {products.length === 0 && shopProducts.length === 0 && subcategories.length === 0 && (
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12 bg-white rounded-2xl border border-peach-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-stone">
                Er zijn nog geen producten in deze categorie.
              </p>
              <Link
                href="/producten"
                className="inline-flex items-center text-terracotta font-medium mt-4 hover:text-terracotta-dark transition-colors"
              >
                Bekijk alle categorieën
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-charcoal mb-4">
            Hulp nodig bij je keuze?
          </h2>
          <p className="text-stone mb-8">
            Weet je niet zeker welk product het beste bij jou past?
            Plan een gratis kennismakingsgesprek.
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
