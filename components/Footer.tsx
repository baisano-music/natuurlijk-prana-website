import Image from 'next/image'
import Link from 'next/link'

type FooterLink = {
  label?: string
  url?: string
}

type SiteSettings = {
  title?: string | null
  description?: string | null
  contactInfo?: {
    email?: string | null
    phone?: string | null
    address?: string | null
  } | null
  socialMedia?: {
    facebook?: string | null
    instagram?: string | null
    pinterest?: string | null
    linkedin?: string | null
    youtube?: string | null
    twitter?: string | null
    tiktok?: string | null
  } | null
  openingHours?: string | null
  parkingInfo?: string | null
  footerNavigation?: FooterLink[] | null
  footerBottomLinks?: FooterLink[] | null
} | null

// Social media iconen
const SocialIcons = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  pinterest: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
}

// Default navigatie als fallback
const defaultNavigation: FooterLink[] = [
  { label: 'Home', url: '/' },
  { label: 'Bloesemremedies', url: '/remedies' },
  { label: 'Nieuws', url: '/nieuws' },
  { label: 'Contact', url: '/contact' },
]

const defaultBottomLinks: FooterLink[] = [
  { label: 'Privacy & Disclaimer', url: '/privacy-en-disclaimer' },
]

export function Footer({ siteSettings }: { siteSettings?: SiteSettings }) {
  const contact = siteSettings?.contactInfo
  const social = siteSettings?.socialMedia
  const opening = siteSettings?.openingHours
  const parking = siteSettings?.parkingInfo

  // Navigatie van CMS of fallback
  const navigation = siteSettings?.footerNavigation?.length
    ? siteSettings.footerNavigation
    : defaultNavigation
  const bottomLinks = siteSettings?.footerBottomLinks?.length
    ? siteSettings.footerBottomLinks
    : defaultBottomLinks

  // Standaard contactgegevens
  const address = contact?.address || `Schenge 5
2134 WC Hoofddorp
Floriande Zuid, eiland 2`
  const phone = contact?.phone || '06-13587558'

  // Verzamel actieve social media links
  const activeSocials = Object.entries(social || {}).filter(
    ([, url]) => url && typeof url === 'string'
  ) as [keyof typeof SocialIcons, string][]

  return (
    <footer className="bg-sage-500 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Nieuwsbrief sectie */}
        <div className="mb-12 pb-12 border-b border-white/20">
          <div className="max-w-xl">
            <h3 className="font-serif text-xl text-cream mb-2">
              Blijf op de hoogte
            </h3>
            <p className="text-peach-200 text-sm mb-4">
              Schrijf je in voor de nieuwsbrief en ontvang tips, inspiratie en nieuws over bloesemremedies.
            </p>
            {/* MailerLite embed form */}
            <div className="ml-embedded" data-form="J6o7fS"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block hover:opacity-90 transition-opacity"
              aria-label="Natuurlijk Prana - naar home"
            >
              <Image
                src="/logo.png"
                alt="Natuurlijk Prana"
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert opacity-95"
              />
            </Link>
            <p className="mt-3 text-white/80 text-sm leading-relaxed max-w-xs">
              {siteSettings?.description || 'Bloesemremedies voor innerlijke balans'}
            </p>

            {/* Social Media Icons */}
            {activeSocials.length > 0 && (
              <div className="flex gap-3 mt-5">
                {activeSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-peach-200 hover:text-cream transition-all"
                    aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    {SocialIcons[platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigatie */}
          <div>
            <h3 className="font-medium text-cream text-sm uppercase tracking-wider mb-4">
              Navigatie
            </h3>
            <ul className="space-y-3">
              {navigation.map((link, index) => (
                <li key={index}>
                  {link.url?.startsWith('http') ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-peach-200 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.url || '/'}
                      className="text-peach-200 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/studio"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Content beheren
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & openingstijden */}
          <div>
            <h3 className="font-medium text-cream text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              {contact?.email && (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-peach-200 hover:text-cream transition-colors"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              <p>
                <a
                  href={`tel:${phone.replace(/[-\s]/g, '')}`}
                  className="text-peach-200 hover:text-cream transition-colors"
                >
                  {phone}
                </a>
              </p>
              <p className="text-peach-200 whitespace-pre-line">{address}</p>
              {(parking || parking === undefined) && (
                <p className="text-peach-300 text-xs mt-2">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {parking || 'Gratis parkeren voor de deur'}
                  </span>
                </p>
              )}
              {opening && (
                <div className="pt-2">
                  <p className="font-medium text-peach-100 mb-1">Openingstijden</p>
                  <p className="text-peach-200 whitespace-pre-line text-sm">{opening}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/70">© {new Date().getFullYear()} Natuurlijk Prana. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            {bottomLinks.map((link, index) => (
              <span key={index}>
                {link.url?.startsWith('http') ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-peach-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.url || '/'}
                    className="text-peach-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
