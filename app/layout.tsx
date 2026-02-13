import type { Metadata } from 'next'
import './globals.css'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { clientNoCdn, queries } from '@/lib/SanityClient'

export const metadata: Metadata = {
  title: 'Natuurlijk Prana | Bloesemremedies & Holistische Begeleiding',
  description: 'Natuurlijk Prana biedt bloesemremedies en holistische begeleiding voor vrouwen, moeders en kinderen. Ontdek natuurlijke ondersteuning voor innerlijke balans en persoonlijke groei. Praktijk in Hoofddorp.',
  metadataBase: new URL('https://natuurlijkprana.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Natuurlijk Prana | Bloesemremedies & Holistische Begeleiding',
    description: 'Natuurlijk Prana biedt bloesemremedies en holistische begeleiding voor vrouwen, moeders en kinderen. Ontdek natuurlijke ondersteuning voor innerlijke balans.',
    url: 'https://natuurlijkprana.nl',
    siteName: 'Natuurlijk Prana',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natuurlijk Prana | Bloesemremedies & Holistische Begeleiding',
    description: 'Bloesemremedies en holistische begeleiding voor innerlijke balans en persoonlijke groei.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

// Revalidate elke 60 seconden voor verse data
export const revalidate = 60

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Gebruik clientNoCdn zodat wijzigingen direct zichtbaar zijn
  const siteSettings = await clientNoCdn.fetch(queries.siteSettings).catch(() => null)

  return (
    <html lang="nl">
      <body className="flex flex-col min-h-screen">
        {/* Google Analytics / Tag Manager */}
        <GoogleAnalytics
          gaId={siteSettings?.googleAnalyticsId}
          gtmId={siteSettings?.googleTagManagerId}
        />
        <LayoutWrapper siteSettings={siteSettings}>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
