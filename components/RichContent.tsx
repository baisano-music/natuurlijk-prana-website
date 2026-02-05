'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
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

interface RichContentProps {
  content: unknown[]
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
