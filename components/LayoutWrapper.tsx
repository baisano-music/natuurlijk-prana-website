'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { NewsletterSection } from './NewsletterSection'
import { Footer } from './Footer'
import { GoogleAnalytics } from './GoogleAnalytics'
import { OrganizationSchema } from './StructuredData'

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
  googleAnalyticsId?: string | null
  googleTagManagerId?: string | null
} | null

export function LayoutWrapper({
  children,
  siteSettings,
}: {
  children: React.ReactNode
  siteSettings?: SiteSettings
}) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      {/* Schema.org Organization data voor GEO */}
      <OrganizationSchema
        name={siteSettings?.title || 'Natuurlijk Prana'}
        description={siteSettings?.description || 'Bloesemremedies voor innerlijke balans'}
        email={siteSettings?.contactInfo?.email}
        phone={siteSettings?.contactInfo?.phone}
        address={siteSettings?.contactInfo?.address}
        socialMedia={siteSettings?.socialMedia}
      />
      <GoogleAnalytics
        gaId={siteSettings?.googleAnalyticsId}
        gtmId={siteSettings?.googleTagManagerId}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <NewsletterSection />
      <Footer siteSettings={siteSettings} />
    </>
  )
}
