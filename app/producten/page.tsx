import { client, queries } from '@/lib/SanityClient'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0

export const metadata = {
  title: 'Producten | Natuurlijk Prana',
  description: 'Ontdek ons assortiment bloesemremedies, celzouten en essentiële oliën voor natuurlijke gezondheid en balans.',
}

interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  imageUrl?: string
  children?: Category[]
}

async function getCategories(): Promise<Category[]> {
  return client.fetch(queries.productCategoriesTree)
}

export default async function ProductenPage() {
  const categories = await getCategories()

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-peach-50 to-cream" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2375806b' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-sage-100 text-sage-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Ons Assortiment
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            Producten
          </h1>
          <p className="text-lg md:text-xl text-stone mt-6 max-w-2xl mx-auto leading-relaxed">
            Ontdek onze zorgvuldig geselecteerde collectie bloesemremedies, celzouten en
            essentiële oliën voor natuurlijke gezondheid en innerlijke balans.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/producten/${category.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-peach-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-sage-100">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-2xl text-charcoal group-hover:text-terracotta transition-colors">
                      {category.title}
                    </h2>
                    {category.description && (
                      <p className="text-stone mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    {category.children && category.children.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {category.children.map((child) => (
                          <span
                            key={child._id}
                            className="text-xs bg-sage-50 text-sage-700 px-2 py-1 rounded-full"
                          >
                            {child.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center text-terracotta font-medium group-hover:text-terracotta-dark transition-colors">
                      Bekijk producten
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-sage-100 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-charcoal mb-4">
                Categorieën worden binnenkort toegevoegd
              </h2>
              <p className="text-stone max-w-md mx-auto mb-8">
                Ga naar de Sanity Studio om productcategorieën aan te maken.
              </p>
              <Link
                href="/remedies"
                className="inline-flex items-center bg-terracotta text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors"
              >
                Bekijk alle producten
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-sage-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            Niet zeker welk product bij je past?
          </h2>
          <p className="text-stone mb-8 leading-relaxed">
            Plan een gratis kennismakingsgesprek en ontdek welke bloesemremedies
            het beste aansluiten bij jouw situatie.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-md hover:shadow-lg"
          >
            Plan een kennismakingsgesprek
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
