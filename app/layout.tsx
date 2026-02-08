import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { clientNoCdn, queries } from '@/lib/SanityClient'

export const metadata: Metadata = {
  title: 'Natuurlijk Prana',
  description: 'Bloesemremedies voor innerlijke balans',
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
        <LayoutWrapper siteSettings={siteSettings}>{children}</LayoutWrapper>
        {/* MailerLite Universal Script */}
        <Script
          id="mailerlite-universal"
          strategy="afterInteractive"
          src="https://assets.mailerlite.com/js/universal.js"
        />
        <Script
          id="mailerlite-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `ml('account', '1116466');`,
          }}
        />
      </body>
    </html>
  )
}
