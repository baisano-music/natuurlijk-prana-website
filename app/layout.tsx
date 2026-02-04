import type { Metadata } from 'next'
import './globals.css'
import { LayoutWrapper } from '@/components/LayoutWrapper'
import { client, queries } from '@/lib/SanityClient'

export const metadata: Metadata = {
  title: 'Natuurlijk Prana',
  description: 'Bloesemremedies voor innerlijke balans',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await client.fetch(queries.siteSettings).catch(() => null)

  return (
    <html lang="nl">
      <body className="flex flex-col min-h-screen">
        <LayoutWrapper siteSettings={siteSettings}>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
