/**
 * Structured Data Components voor GEO (Generative Engine Optimization)
 * Helpt AI-zoekmachines de content beter te begrijpen en te citeren.
 */

// Organization Schema - voor de hele site
export function OrganizationSchema({
  name = 'Natuurlijk Prana',
  description = 'Bloesemremedies voor innerlijke balans',
  url = 'https://natuurlijkprana.nl',
  logo = 'https://natuurlijkprana.nl/logo.png',
  email,
  phone,
  address,
  socialMedia,
}: {
  name?: string
  description?: string
  url?: string
  logo?: string
  email?: string | null
  phone?: string | null
  address?: string | null
  socialMedia?: {
    facebook?: string | null
    instagram?: string | null
    pinterest?: string | null
    linkedin?: string | null
    youtube?: string | null
  } | null
}) {
  const sameAs = Object.values(socialMedia || {}).filter(Boolean) as string[]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#organization`,
    name,
    description,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    ...(email && { email }),
    ...(phone && { telephone: phone }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Schenge 5',
        addressLocality: 'Hoofddorp',
        postalCode: '2134 WC',
        addressCountry: 'NL',
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article Schema - voor blog posts
export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  modifiedAt,
  authorName = 'Natuurlijk Prana',
}: {
  title: string
  description?: string | null
  url: string
  imageUrl?: string | null
  publishedAt?: string | null
  modifiedAt?: string | null
  authorName?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    ...(description && { description }),
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    url,
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Natuurlijk Prana',
      logo: {
        '@type': 'ImageObject',
        url: 'https://natuurlijkprana.nl/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Product Schema - voor remedies/producten
export function ProductSchema({
  name,
  description,
  url,
  imageUrl,
  sku,
}: {
  name: string
  description?: string | null
  url: string
  imageUrl?: string | null
  sku?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description && { description }),
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    url,
    ...(sku && { sku }),
    brand: {
      '@type': 'Brand',
      name: 'Natuurlijk Prana',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema - voor FAQ secties
export function FAQSchema({
  items,
}: {
  items: Array<{ question: string; answer: string }>
}) {
  if (!items || items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema - voor navigatie hiërarchie
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  if (!items || items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebPage Schema - algemene pagina info
export function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description?: string | null
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    ...(description && { description }),
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Natuurlijk Prana',
      url: 'https://natuurlijkprana.nl',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema - voor diensten
export function ServiceSchema({
  name,
  description,
  url,
  price,
  duration,
}: {
  name: string
  description?: string | null
  url: string
  price?: string | null
  duration?: string | null
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(description && { description }),
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Natuurlijk Prana',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price.replace(/[^0-9.,]/g, ''),
        priceCurrency: 'EUR',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
