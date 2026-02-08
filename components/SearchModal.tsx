'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

interface PagefindResult {
  url: string
  meta?: {
    title?: string
  }
  excerpt?: string
}

interface PagefindSearchResult {
  id: string
  data: () => Promise<PagefindResult>
}

interface PagefindResponse {
  results: PagefindSearchResult[]
}

interface Pagefind {
  init: () => Promise<void>
  search: (query: string) => Promise<PagefindResponse>
}

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PagefindResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagefind, setPagefind] = useState<Pagefind | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Load pagefind on mount
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window !== 'undefined') {
        try {
          const pf = await import(
            // @ts-expect-error - pagefind is loaded from public folder
            /* webpackIgnore: true */ '/pagefind/pagefind.js'
          )
          await pf.init()
          setPagefind(pf)
        } catch (e) {
          console.error('Failed to load pagefind:', e)
        }
      }
    }
    loadPagefind()
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Search function
  const doSearch = useCallback(
    async (searchQuery: string) => {
      if (!pagefind || !searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const search = await pagefind.search(searchQuery)
        const data = await Promise.all(
          search.results.slice(0, 8).map((r) => r.data())
        )
        setResults(data)
      } catch (e) {
        console.error('Search error:', e)
        setResults([])
      }
      setIsLoading(false)
    },
    [pagefind]
  )

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      doSearch(query)
    }, 200)
    return () => clearTimeout(timer)
  }, [query, doSearch])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-peach-200">
          <svg
            className="w-5 h-5 text-stone"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoeken op de website..."
            className="flex-1 text-lg text-charcoal placeholder:text-stone/50 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone hover:bg-peach-100 transition-colors"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center text-stone">
              <div className="inline-block w-6 h-6 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="p-8 text-center text-stone">
              Geen resultaten gevonden voor &ldquo;{query}&rdquo;
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul className="divide-y divide-peach-100">
              {results.map((result, index) => (
                <li key={index}>
                  <Link
                    href={result.url.replace(/\.html$/, '').replace(/\/index$/, '') || '/'}
                    onClick={onClose}
                    className="block p-4 hover:bg-sage-50 transition-colors"
                  >
                    <h3 className="font-medium text-charcoal">
                      {result.meta?.title || 'Pagina'}
                    </h3>
                    {result.excerpt && (
                      <p
                        className="mt-1 text-sm text-stone line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="p-8 text-center text-stone">
              <p>Typ om te zoeken naar remedies, nieuws en meer...</p>
              <p className="mt-2 text-sm">
                <kbd className="px-2 py-1 bg-sage-100 rounded text-xs font-mono">ESC</kbd>
                {' '}om te sluiten
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
