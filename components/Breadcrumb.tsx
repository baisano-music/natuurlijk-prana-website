import Link from 'next/link'
import { BreadcrumbSchema } from './StructuredData'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb component met automatische schema.org markup
 * Helpt zowel gebruikers als AI-zoekmachines de site-hiërarchie te begrijpen
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (!items || items.length === 0) return null

  // Voeg altijd Home toe als eerste item
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://natuurlijkprana.nl' },
    ...items.map((item) => ({
      ...item,
      url: item.url.startsWith('http')
        ? item.url
        : `https://natuurlijkprana.nl${item.url}`,
    })),
  ]

  return (
    <>
      <BreadcrumbSchema items={fullItems} />
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-stone ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1
            const displayUrl = item.url.replace('https://natuurlijkprana.nl', '')

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-stone/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-charcoal font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={displayUrl || '/'}
                    className="hover:text-terracotta transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * Helper functie om breadcrumb items te genereren
 */
export function generateBreadcrumbs(
  currentPage: { title: string; slug: string },
  parentPages?: Array<{ title: string; slug: string }>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = []

  // Voeg parent pages toe
  if (parentPages) {
    parentPages.forEach((page) => {
      items.push({
        name: page.title,
        url: `/${page.slug}`,
      })
    })
  }

  // Voeg huidige pagina toe
  items.push({
    name: currentPage.title,
    url: `/${currentPage.slug}`,
  })

  return items
}
