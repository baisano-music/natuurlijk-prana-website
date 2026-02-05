'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/over-mij', label: 'Over mij' },
  { href: '/remedies', label: 'Remedies' },
  { href: '/nieuws', label: 'Nieuws' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-peach-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label="Natuurlijk Prana - naar home"
          >
            <Image
              src="/logo.png"
              alt="Natuurlijk Prana"
              width={140}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors ${
                  pathname === href || (href !== '/' && pathname.startsWith(href))
                    ? 'text-terracotta underline underline-offset-4 decoration-terracotta'
                    : 'text-sage-600 hover:text-terracotta'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors shadow-sm"
            >
              Kennismakingsgesprek
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-sage-700 hover:bg-peach-100 transition-colors"
            aria-expanded={mobileOpen}
            aria-label="Menu openen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-peach-200" aria-label="Mobiele navigatie">
            <ul className="flex flex-col gap-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      pathname === href || (href !== '/' && pathname.startsWith(href))
                        ? 'bg-peach-100 text-charcoal'
                        : 'text-sage-600 hover:bg-peach-100'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-lg bg-terracotta text-white font-medium text-center hover:bg-terracotta-dark transition-colors"
                >
                  Kennismakingsgesprek
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
