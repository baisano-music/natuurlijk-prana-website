'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

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
  } | null
  openingHours?: string | null
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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={siteSettings} />
    </>
  )
}
