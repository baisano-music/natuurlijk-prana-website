import { MetadataRoute } from 'next'
import { client } from '@/lib/SanityClient'

const baseUrl = 'https://natuurlijkprana.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische pagina's
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/over-mij`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ervaringen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tarieven`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gratis-magazine`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamische pagina's van Sanity
  try {
    // Remedies
    const remedies = await client.fetch<{ slug: string; _updatedAt: string }[]>(`
      *[_type == "remedie" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `)

    const remediePages: MetadataRoute.Sitemap = remedies.map((remedie) => ({
      url: `${baseUrl}/remedies/${remedie.slug}`,
      lastModified: new Date(remedie._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Nieuws/Blog posts
    const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(`
      *[_type == "post" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `)

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/nieuws/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Product categorieën
    const categories = await client.fetch<{ slug: string; _updatedAt: string }[]>(`
      *[_type == "category" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `)

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/producten/${category.slug}`,
      lastModified: new Date(category._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Diensten
    const diensten = await client.fetch<{ slug: string; _updatedAt: string }[]>(`
      *[_type == "dienst" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `)

    const dienstPages: MetadataRoute.Sitemap = diensten.map((dienst) => ({
      url: `${baseUrl}/diensten/${dienst.slug}`,
      lastModified: new Date(dienst._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [
      ...staticPages,
      ...remediePages,
      ...postPages,
      ...categoryPages,
      ...dienstPages,
    ]
  } catch (error) {
    console.error('Error fetching sitemap data:', error)
    return staticPages
  }
}
