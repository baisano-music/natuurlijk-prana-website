'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { FAQSchema } from './StructuredData'

// Type voor FAQ items vanuit Sanity
interface FAQItem {
  _id: string
  question: string
  answer?: unknown[] // PortableText array
  shortAnswer?: string
  category?: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  subtitle?: string
  showSchema?: boolean
  showMoreLink?: { text?: string; link?: string }
  className?: string
  variant?: 'default' | 'compact'
}

// Categorie labels voor weergave
const categoryLabels: Record<string, string> = {
  algemeen: 'Algemeen',
  bloesemremedies: 'Bloesemremedies',
  celzouten: 'Celzouten',
  aromatherapie: 'Aromatherapie',
  'essentiele-olien': 'Essentiële oliën',
  consulten: 'Consulten & Sessies',
  bestellen: 'Bestellen & Verzenden',
  'over-ons': 'Over Natuurlijk Prana',
}

// Helper om plain text uit PortableText te halen
function portableTextToPlain(blocks: unknown[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block: unknown) => {
      if (typeof block === 'object' && block !== null && 'children' in block) {
        const typedBlock = block as { children?: Array<{ text?: string }> }
        return typedBlock.children?.map((child) => child?.text || '').join('') || ''
      }
      return ''
    })
    .join('\n')
}

export function FAQSection({
  items,
  title = 'Veelgestelde vragen',
  subtitle,
  showSchema = true,
  showMoreLink,
  className = '',
  variant = 'default',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  // Maak schema data voor SEO
  const schemaItems = items.map((item) => ({
    question: item.question,
    answer: item.shortAnswer || portableTextToPlain(item.answer || []),
  }))

  return (
    <>
      {showSchema && <FAQSchema items={schemaItems} />}

      <section className={`py-16 md:py-20 ${className}`}>
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {title}
            </h2>
            {subtitle && (
              <p className="text-stone mt-4 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={item._id}
                  className={`
                    border rounded-xl overflow-hidden transition-all duration-200
                    ${isOpen
                      ? 'border-terracotta/30 bg-cream/50 shadow-sm'
                      : 'border-stone/20 bg-white hover:border-stone/40'
                    }
                  `}
                >
                  {/* Question button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    {/* Icon */}
                    <span
                      className={`
                        flex-shrink-0 w-6 h-6 flex items-center justify-center
                        rounded-full transition-colors
                        ${isOpen
                          ? 'bg-terracotta text-white'
                          : 'bg-sage-100 text-sage-600'
                        }
                      `}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>

                    {/* Question text */}
                    <span className={`
                      flex-1 font-medium text-lg
                      ${isOpen ? 'text-terracotta' : 'text-charcoal'}
                    `}>
                      {item.question}
                    </span>

                    {/* Category badge */}
                    {variant === 'default' && item.category && (
                      <span className="hidden sm:inline-flex px-2 py-1 text-xs bg-sage-100 text-sage-600 rounded-full">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    )}
                  </button>

                  {/* Answer panel */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-200
                      ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="px-5 pb-5 pl-[52px]">
                      <div className="text-stone leading-relaxed prose prose-sm max-w-none">
                        {item.answer ? (
                          <PortableText value={item.answer as []} />
                        ) : item.shortAnswer ? (
                          <p>{item.shortAnswer}</p>
                        ) : (
                          <p className="italic text-stone/60">Geen antwoord beschikbaar.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* More link */}
          {showMoreLink && showMoreLink.link && showMoreLink.text && (
            <div className="text-center mt-10">
              <Link
                href={showMoreLink.link}
                className="inline-flex items-center text-terracotta font-medium hover:text-terracotta-dark transition-colors group"
              >
                {showMoreLink.text}
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

// Compact variant voor sidebar of kleinere ruimtes
export function FAQCompact({ items }: { items: FAQItem[] }) {
  return (
    <FAQSection
      items={items}
      variant="compact"
      showSchema={false}
      className="py-8"
    />
  )
}
