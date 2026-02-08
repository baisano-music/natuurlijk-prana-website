'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface NavItem {
  href?: string
  label: string
  children?: { href: string; label: string; description?: string }[]
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'Over mij',
    children: [
      { href: '/over-mij', label: 'Mijn verhaal', description: 'Leer mij beter kennen' },
      { href: '/ervaringen', label: 'Ervaringen', description: 'Wat anderen zeggen' },
    ],
  },
  {
    label: 'Producten',
    children: [
      { href: '/producten/bloesemremedies', label: 'Bloesemremedies', description: 'PRANA & Alaskan Essences' },
      { href: '/producten/celzouten', label: 'Celzouten', description: 'Schüssler celzouten' },
      { href: '/producten/essentiele-olien', label: 'Essentiële oliën', description: 'Natuurlijke geuroliën' },
      { href: '/remedies', label: 'Alle producten', description: 'Bekijk het complete assortiment' },
    ],
  },
  {
    label: 'Aanbod',
    children: [
      { href: '/tarieven', label: 'Tarieven & Consult', description: 'Prijzen en wat je kunt verwachten' },
      { href: '/gratis-magazine', label: 'Gratis E-magazine', description: 'Download het gratis PRANA magazine' },
    ],
  },
  { href: '/nieuws', label: 'Nieuws' },
]

function DropdownMenu({
  item,
  isOpen,
  onOpen,
  onClose,
  pathname
}: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  pathname: string
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    onOpen()
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose()
    }, 150)
  }

  const isChildActive = item.children?.some(
    child => pathname === child.href || pathname.startsWith(child.href + '/')
  )

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <button
        className={`flex items-center gap-1 font-medium transition-colors ${
          isChildActive
            ? 'text-terracotta'
            : 'text-sage-700 hover:text-terracotta'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-peach-200 p-2 min-w-[280px]">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-3 rounded-xl transition-colors ${
                pathname === child.href || pathname.startsWith(child.href + '/')
                  ? 'bg-peach-100 text-terracotta'
                  : 'hover:bg-sage-50 text-charcoal'
              }`}
            >
              <span className="font-medium block">{child.label}</span>
              {child.description && (
                <span className="text-sm text-stone block mt-0.5">{child.description}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMenu({
  isOpen,
  onClose,
  pathname
}: {
  isOpen: boolean
  onClose: () => void
  pathname: string
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl isolate">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-peach-200">
          <span className="font-serif text-xl text-charcoal">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-sage-700 hover:bg-peach-100 transition-colors"
            aria-label="Menu sluiten"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                // Accordion item
                <div>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors ${
                      item.children.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))
                        ? 'bg-peach-100 text-terracotta'
                        : 'text-charcoal hover:bg-sage-50'
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedItem === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Sub items */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedItem === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 py-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`block py-2.5 px-4 rounded-lg transition-colors ${
                            pathname === child.href || pathname.startsWith(child.href + '/')
                              ? 'bg-terracotta/10 text-terracotta font-medium'
                              : 'text-stone hover:text-charcoal hover:bg-sage-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular link
                <Link
                  href={item.href!}
                  onClick={onClose}
                  className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href!))
                      ? 'bg-peach-100 text-terracotta'
                      : 'text-charcoal hover:bg-sage-50'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-peach-200 bg-white">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full py-4 px-6 bg-coral text-white text-center rounded-full font-medium hover:bg-coral-dark transition-colors shadow-md"
          >
            Kennismakingsgesprek
          </Link>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-peach-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
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

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onOpen={() => setOpenDropdown(item.label)}
                  onClose={() => setOpenDropdown(null)}
                  pathname={pathname}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`font-medium transition-colors ${
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href!))
                      ? 'text-terracotta'
                      : 'text-sage-700 hover:text-terracotta'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="/contact"
              className="ml-4 bg-coral text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-coral-dark transition-colors shadow-sm hover:shadow-md"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-sage-700 hover:bg-peach-100 transition-colors"
            aria-label="Menu openen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
