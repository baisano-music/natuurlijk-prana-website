'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface ImageBlock {
  _type: 'image'
  _key: string
  asset: { _ref: string }
  url?: string
  alt?: string
  caption?: string
  position?: 'left' | 'right' | 'full' | 'center'
}

interface ColoredSectionBlock {
  _type: 'coloredSection'
  _key: string
  backgroundColor?: string
  textColor?: 'dark' | 'light'
  rounded?: boolean
  title?: string
  content?: PortableTextBlock[]
}

interface CalloutBlock {
  _type: 'callout'
  _key: string
  type?: 'tip' | 'info' | 'warning' | 'highlight' | 'nature'
  title?: string
  content?: PortableTextBlock[]
}

interface RichContentProps {
  content: PortableTextBlock[]
}

// Helper: bepaal of een kleur donker is (voor automatische tekstkleur)
function isColorDark(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.6
}

const calloutStyles: Record<string, { bg: string; border: string; icon: string }> = {
  tip: { bg: 'bg-sage-50', border: 'border-sage-400', icon: '💡' },
  info: { bg: 'bg-peach-50', border: 'border-peach-300', icon: 'ℹ️' },
  warning: { bg: 'bg-orange/10', border: 'border-orange', icon: '⚠️' },
  highlight: { bg: 'bg-terracotta/10', border: 'border-terracotta', icon: '✨' },
  nature: { bg: 'bg-sage-100', border: 'border-sage-500', icon: '🌿' },
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      if (!value?.asset) return null

      const imageUrl = value.url || urlFor(value).width(800).url()
      const position = value.position || 'full'

      const positionClasses: Record<string, string> = {
        left: 'float-left mr-6 mb-4 w-full sm:w-1/2 md:w-2/5',
        right: 'float-right ml-6 mb-4 w-full sm:w-1/2 md:w-2/5',
        full: 'w-full my-8 clear-both',
        center: 'mx-auto my-8 clear-both max-w-2xl',
      }

      return (
        <figure className={positionClasses[position]}>
          <div className="rounded-xl overflow-hidden shadow-md bg-peach-100">
            <Image
              src={imageUrl}
              alt={value.alt || ''}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-sage-600 mt-2 italic text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    coloredSection: ({ value }: { value: ColoredSectionBlock }) => {
      const bgColor = value.backgroundColor || '#e8efe9'
      const isDark = value.textColor === 'light' || isColorDark(bgColor)
      const rounded = value.rounded !== false

      return (
        <div
          className={`my-8 p-6 md:p-8 clear-both ${rounded ? 'rounded-2xl' : ''}`}
          style={{ backgroundColor: bgColor }}
        >
          {value.title && (
            <h3
              className={`font-serif text-xl mb-4 ${isDark ? 'text-white' : 'text-charcoal'}`}
            >
              {value.title}
            </h3>
          )}
          {value.content && (
            <div className={`prose prose-lg max-w-none ${isDark ? 'text-white/90 prose-headings:text-white prose-strong:text-white' : 'text-charcoal prose-headings:text-charcoal'}`}>
              <PortableText value={value.content} />
            </div>
          )}
        </div>
      )
    },

    callout: ({ value }: { value: CalloutBlock }) => {
      const style = calloutStyles[value.type || 'tip']

      return (
        <div className={`my-8 p-6 ${style.bg} border-l-4 ${style.border} rounded-r-xl clear-both`}>
          {value.title && (
            <h4 className="font-medium text-charcoal mb-2">
              <span className="mr-2">{style.icon}</span>
              {value.title}
            </h4>
          )}
          {value.content && (
            <div className="prose prose-lg max-w-none text-stone">
              <PortableText value={value.content} />
            </div>
          )}
        </div>
      )
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl text-charcoal mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-charcoal mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-terracotta pl-6 my-6 italic text-sage-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-terracotta hover:text-terracotta-dark underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
}

export default function RichContent({ content }: RichContentProps) {
  if (!content || content.length === 0) return null

  return (
    <div className="prose prose-lg max-w-none text-stone clearfix">
      <PortableText value={content} components={components} />
    </div>
  )
}
